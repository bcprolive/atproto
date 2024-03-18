import { useCallback, useEffect, useMemo, useState } from 'react'

import { FieldDefinition } from '../backend-data'
import { AccountPicker } from '../components/account-picker'
import { LayoutTitlePage } from '../components/layout-title-page'
import { SignInForm, SignInFormOutput } from '../components/sign-in-form'
import { Session } from '../types'

export type SignInViewProps = {
  sessions: readonly Session[]
  setSession: (sub: string | null) => void
  loginHint?: string

  fields?: {
    username?: FieldDefinition
    password?: FieldDefinition
    remember?: FieldDefinition
  }

  onSignIn: (credentials: SignInFormOutput) => void | PromiseLike<void>
  onBack?: () => void
}

export function SignInView({
  loginHint,
  sessions,
  setSession,
  fields,

  onSignIn,
  onBack,
}: SignInViewProps) {
  const session = useMemo(() => sessions.find((s) => s.selected), [sessions])
  const clearSession = useCallback(() => setSession(null), [setSession])
  const accounts = useMemo(() => sessions.map((s) => s.account), [sessions])
  const [showSignInForm, setShowSignInForm] = useState(sessions.length === 0)

  useEffect(() => {
    // Make sure the "back" action shows the account picker instead of the
    // sign-in form (since the account was added to the list of current
    // sessions).
    if (session) setShowSignInForm(false)
  }, [session])

  if (session) {
    // All set (parent view will handle the redirect)
    if (!session.loginRequired) return null

    return (
      <LayoutTitlePage
        title="Sign in"
        subtitle="Confirm your password to continue"
      >
        <SignInForm
          className="max-w-lg w-full"
          onSubmit={onSignIn}
          onCancel={clearSession}
          cancelLabel="Back" // to account picker
          usernameDefault={session.account.preferred_username}
          usernameReadonly={true}
          usernameLabel={fields?.username?.label}
          usernamePlaceholder={fields?.username?.placeholder}
          usernamePattern={fields?.username?.pattern}
          usernameTitle={fields?.username?.title}
          passwordLabel={fields?.password?.label}
          passwordPlaceholder={fields?.password?.placeholder}
          passwordPattern={fields?.password?.pattern}
          passwordTitle={fields?.password?.title}
          rememberDefault={true}
          rememberLabel={fields?.remember?.label}
        />
      </LayoutTitlePage>
    )
  }

  if (loginHint) {
    return (
      <LayoutTitlePage title="Sign in" subtitle="Enter your password">
        <SignInForm
          className="max-w-lg w-full"
          onSubmit={onSignIn}
          onCancel={onBack}
          cancelLabel="Back"
          usernameDefault={loginHint}
          usernameReadonly={true}
          usernameLabel={fields?.username?.label}
          usernamePlaceholder={fields?.username?.placeholder}
          usernamePattern={fields?.username?.pattern}
          usernameTitle={fields?.username?.title}
          passwordLabel={fields?.password?.label}
          passwordPlaceholder={fields?.password?.placeholder}
          passwordPattern={fields?.password?.pattern}
          passwordTitle={fields?.password?.title}
          rememberLabel={fields?.remember?.label}
        />
      </LayoutTitlePage>
    )
  }

  if (sessions.length === 0) {
    return (
      <LayoutTitlePage
        title="Sign in"
        subtitle="Enter your username and password"
      >
        <SignInForm
          className="max-w-lg w-full"
          onSubmit={onSignIn}
          onCancel={onBack}
          cancelLabel="Back"
          usernameLabel={fields?.username?.label}
          usernamePlaceholder={fields?.username?.placeholder}
          usernamePattern={fields?.username?.pattern}
          usernameTitle={fields?.username?.title}
          passwordLabel={fields?.password?.label}
          passwordPlaceholder={fields?.password?.placeholder}
          passwordPattern={fields?.password?.pattern}
          passwordTitle={fields?.password?.title}
          rememberLabel={fields?.remember?.label}
        />
      </LayoutTitlePage>
    )
  }

  if (showSignInForm) {
    return (
      <LayoutTitlePage
        title="Sign in"
        subtitle="Enter your username and password"
      >
        <SignInForm
          className="max-w-lg w-full"
          onSubmit={onSignIn}
          onCancel={() => setShowSignInForm(false)}
          cancelLabel="Back" // to account picker
          usernameLabel={fields?.username?.label}
          usernamePlaceholder={fields?.username?.placeholder}
          usernamePattern={fields?.username?.pattern}
          usernameTitle={fields?.username?.title}
          passwordLabel={fields?.password?.label}
          passwordPlaceholder={fields?.password?.placeholder}
          passwordPattern={fields?.password?.pattern}
          passwordTitle={fields?.password?.title}
          rememberLabel={fields?.remember?.label}
        />
      </LayoutTitlePage>
    )
  }

  return (
    <LayoutTitlePage
      title="Sign in as..."
      subtitle="Select an account to continue."
    >
      <AccountPicker
        className="max-w-lg w-full"
        accounts={accounts}
        onAccount={(a) => setSession(a.sub)}
        onOther={() => setShowSignInForm(true)}
        onBack={onBack}
        backLabel="Back" // to previous view
      />
    </LayoutTitlePage>
  )
}
