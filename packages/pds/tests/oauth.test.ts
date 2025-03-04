import assert from 'node:assert'
import { once } from 'node:events'
import {
  IncomingMessage,
  Server,
  ServerResponse,
  createServer,
} from 'node:http'
import { AddressInfo } from 'node:net'
import { type Browser, type Page, launch } from 'puppeteer'
import { TestNetworkNoAppView } from '@atproto/dev-env'
// @ts-expect-error (json file)
import files from '@atproto/oauth-client-browser-example'

class PageHelper implements AsyncDisposable {
  constructor(protected readonly page: Page) {}

  async goto(url: string) {
    await this.page.goto(url)
  }

  async waitForNetworkIdle() {
    await this.page.waitForNetworkIdle()
  }

  async navigationAction(run: () => Promise<unknown>): Promise<void> {
    const promise = this.page.waitForNavigation()
    await run()
    await promise
    await this.waitForNetworkIdle()
  }

  async checkTitle(expected: string) {
    await this.waitForNetworkIdle()
    await expect(this.page.title()).resolves.toBe(expected)
  }

  async clickOn(selector: string) {
    const elementHandle = await this.getVisibleElement(selector)
    await elementHandle.click()
    return elementHandle
  }

  async clickOnButton(text: string) {
    return this.clickOn(`button::-p-text(${text})`)
  }

  async typeIn(selector: string, text: string) {
    const elementHandle = await this.getVisibleElement(selector)
    elementHandle.focus()
    await elementHandle.type(text)
    return elementHandle
  }

  async typeInInput(name: string, text: string) {
    return this.typeIn(`input[name="${name}"]`, text)
  }

  async ensureTextVisibility(text: string, tag = 'p') {
    await this.page.waitForSelector(`${tag}::-p-text(${text})`)
  }

  protected async getVisibleElement(selector: string) {
    const elementHandle = await this.page.waitForSelector(selector)

    expect(elementHandle).not.toBeNull()
    assert(elementHandle)

    await expect(elementHandle.isVisible()).resolves.toBe(true)

    return elementHandle
  }

  async [Symbol.asyncDispose]() {
    return this.page.close()
  }

  static async from(browser: Browser) {
    const page = await browser.newPage()
    return new PageHelper(page)
  }
}

describe('oauth', () => {
  let browser: Browser
  let network: TestNetworkNoAppView
  let client: Server

  let appUrl: string

  beforeAll(async () => {
    browser = await launch({
      browser: 'chrome',
      // @NOTE We are using another language than "en" as default language to
      // test the language negotiation.
      args: ['--accept-lang=fr-BE,en-GB,en'],

      // For debugging:
      // headless: false,
      // devtools: true,
      // slowMo: 250,
    })

    network = await TestNetworkNoAppView.create({
      dbPostgresSchema: 'oauth',
    })

    const sc = network.getSeedClient()

    await sc.createAccount('alice', {
      email: 'alice@test.com',
      handle: 'alice.test',
      password: 'alice-pass',
    })

    client = createServer(clientHandler)
    client.listen(0)
    await once(client, 'listening')

    const { port } = client.address() as AddressInfo

    appUrl = `http://127.0.0.1:${port}?${new URLSearchParams({
      plc_directory_url: network.plc.url,
      handle_resolver: network.pds.url,
      sign_up_url: network.pds.url,
      env: 'test',
    })}`
  })

  afterAll(async () => {
    await client?.close()
    await network?.close()
    await browser?.close()
  })

  it('Allows to sign-up trough OAuth', async () => {
    const page = await PageHelper.from(browser)

    await page.goto(appUrl)

    await page.checkTitle('OAuth Client Example')

    await page.navigationAction(async () => {
      await page.clickOnButton('Sign up')
    })

    await page.checkTitle('Authentification')

    await page.clickOnButton('Créer un nouveau compte')

    await page.typeInInput('handle', 'bob')

    await page.clickOnButton('Suivant')

    await page.typeInInput('email', 'bob@test.com')
    await page.typeInInput('password', 'bob-pass')

    await page.clickOnButton("S'inscrire")

    // Make sure the new account is propagated to the PLC directory, allowing
    // the client to resolve the account's did
    await network.processAll()

    await page.navigationAction(async () => {
      await page.clickOnButton("Authoriser l'accès")
    })

    await page.checkTitle('OAuth Client Example')

    await page.ensureTextVisibility('Logged in!')

    await page.clickOnButton('Sign-out')

    await page.waitForNetworkIdle()

    // TODO: Find out why we can't use "using" here
    await page[Symbol.asyncDispose]()
  })

  it('Allows to sign-in trough OAuth', async () => {
    const page = await PageHelper.from(browser)

    await page.goto(appUrl)

    await page.checkTitle('OAuth Client Example')

    await page.navigationAction(async () => {
      const input = await page.typeIn(
        'input[placeholder="@handle, DID or PDS url"]',
        'alice.test',
      )

      await input.press('Enter')
    })

    await page.checkTitle('Se connecter')

    await page.typeIn('input[type="password"]', 'alice-pass')

    // Make sure the warning is visible
    await page.ensureTextVisibility('Avertissement')

    await page.clickOn(
      'label::-p-text(Se souvenir de ce compte sur cet appareil)',
    )

    await page.clickOnButton('Se connecter')

    await page.navigationAction(async () => {
      await page.clickOnButton("Authoriser l'accès")
    })

    await page.checkTitle('OAuth Client Example')

    await page.ensureTextVisibility('Logged in!')

    await page.clickOnButton('Sign-out')

    await page.waitForNetworkIdle()

    // TODO: Find out why we can't use "using" here
    await page[Symbol.asyncDispose]()
  })
})

function clientHandler(
  req: IncomingMessage,
  res: ServerResponse,
  next?: (err?: unknown) => void,
): void {
  const path = req.url?.split('?')[0].slice(1) || 'index.html'
  const file = Object.hasOwn(files, path) ? files[path] : null

  if (file) {
    res
      .writeHead(200, 'OK', { 'content-type': file.type })
      .end(Buffer.from(file.data, 'base64'))
  } else if (next) {
    next()
  } else {
    res
      .writeHead(404, 'Not Found', { 'content-type': 'text/plain' })
      .end('Page not found')
  }
}
