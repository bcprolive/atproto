import type { FunctionComponent, JSX } from 'react'
import { Override } from '../../lib/util.ts'

export type IconProps = Override<
  Omit<JSX.IntrinsicElements['svg'], 'viewBox' | 'children' | 'xmlns'>,
  {
    /**
     * The title of the icon, used for accessibility.
     */
    title?: string
  }
>

function makeSvgComponent(path: string, displayName: string) {
  const SvgComponent: FunctionComponent<IconProps> = ({ title, ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
      aria-hidden={!title}
    >
      {title && <title>{title}</title>}
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d={path}
      ></path>
    </svg>
  )
  SvgComponent.displayName = displayName
  return SvgComponent
}

export const AccountIcon = makeSvgComponent(
  'M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z',
  'AccountIcon',
)

export const AlertIcon = makeSvgComponent(
  'M11.14 4.494a.995.995 0 0 1 1.72 0l7.001 12.008a.996.996 0 0 1-.86 1.498H4.999a.996.996 0 0 1-.86-1.498L11.14 4.494Zm3.447-1.007c-1.155-1.983-4.019-1.983-5.174 0L2.41 15.494C1.247 17.491 2.686 20 4.998 20h14.004c2.312 0 3.751-2.509 2.587-4.506L14.587 3.487ZM13 9.019a1 1 0 1 0-2 0v2.994a1 1 0 1 0 2 0V9.02Zm-1 4.731a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z',
  'AlertIcon',
)

export const AtSymbolIcon = makeSvgComponent(
  'M12 4a8 8 0 1 0 4.21 14.804 1 1 0 0 1 1.054 1.7A9.958 9.958 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 1.104-.27 2.31-.949 3.243-.716.984-1.849 1.6-3.331 1.465a4.207 4.207 0 0 1-2.93-1.585c-.94 1.21-2.388 1.94-3.985 1.715-2.53-.356-4.04-2.91-3.682-5.458.358-2.547 2.514-4.586 5.044-4.23.905.127 1.68.536 2.286 1.126a1 1 0 0 1 1.964.368l-.515 3.545v.002a2.222 2.222 0 0 0 1.999 2.526c.75.068 1.212-.21 1.533-.65.358-.493.566-1.245.566-2.067a8 8 0 0 0-8-8Zm-.112 5.13c-1.195-.168-2.544.819-2.784 2.529-.24 1.71.784 3.03 1.98 3.198 1.195.168 2.543-.819 2.784-2.529.24-1.71-.784-3.03-1.98-3.198Z',
  'AtSymbolIcon',
)

export const CalendarIcon = makeSvgComponent(
  'M4 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Zm1 16V9h14v10H5ZM5 7h14V5H5v2Zm3 10.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM17.25 12a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM12 13.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM9.25 12a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM12 17.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z',
  'CalendarIcon',
)

export const CaretRightIcon = makeSvgComponent(
  'M8.293 3.293a1 1 0 0 1 1.414 0l8 8a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414-1.414L15.586 12 8.293 4.707a1 1 0 0 1 0-1.414Z',
  'CaretRightIcon',
)

export const CheckMarkIcon = makeSvgComponent(
  'M21.59 3.193a1 1 0 0 1 .217 1.397l-11.706 16a1 1 0 0 1-1.429.193l-6.294-5a1 1 0 1 1 1.244-1.566l5.48 4.353 11.09-15.16a1 1 0 0 1 1.398-.217Z',
  'CheckMarkIcon',
)

export const EmailIcon = makeSvgComponent(
  'M4.568 4h14.864c.252 0 .498 0 .706.017.229.019.499.063.77.201a2 2 0 0 1 .874.874c.138.271.182.541.201.77.017.208.017.454.017.706v10.864c0 .252 0 .498-.017.706a2.022 2.022 0 0 1-.201.77 2 2 0 0 1-.874.874 2.022 2.022 0 0 1-.77.201c-.208.017-.454.017-.706.017H4.568c-.252 0-.498 0-.706-.017a2.022 2.022 0 0 1-.77-.201 2 2 0 0 1-.874-.874 2.022 2.022 0 0 1-.201-.77C2 17.93 2 17.684 2 17.432V6.568c0-.252 0-.498.017-.706.019-.229.063-.499.201-.77a2 2 0 0 1 .874-.874c.271-.138.541-.182.77-.201C4.07 4 4.316 4 4.568 4Zm.456 2L12 11.708 18.976 6H5.024ZM20 7.747l-6.733 5.509a2 2 0 0 1-2.534 0L4 7.746V17.4a8.187 8.187 0 0 0 .011.589h.014c.116.01.278.011.575.011h14.8a8.207 8.207 0 0 0 .589-.012v-.013c.01-.116.011-.279.011-.575V7.747Z',
  'EmailIcon',
)

export const EyeIcon = makeSvgComponent(
  'M12 6.5c3.79 0 7.17 2.13 8.82 5.5-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5m0 5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5',
  'EyeIcon',
)

export const EyeSlashIcon = makeSvgComponent(
  'M12 6c3.79 0 7.17 2.13 8.82 5.5-.59 1.22-1.42 2.27-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l1.65 1.65C10.66 6.09 11.32 6 12 6m-1.07 1.14L13 9.21c.57.25 1.03.71 1.28 1.28l2.07 2.07c.08-.34.14-.7.14-1.07C16.5 9.01 14.48 7 12 7c-.37 0-.72.05-1.07.14M2.01 3.87l2.68 2.68C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.98-.29 4.32-.82l3.42 3.42 1.41-1.41L3.42 2.45zm7.5 7.5 2.61 2.61c-.04.01-.08.02-.12.02-1.38 0-2.5-1.12-2.5-2.5 0-.05.01-.08.01-.13m-3.4-3.4 1.75 1.75c-.23.55-.36 1.15-.36 1.78 0 2.48 2.02 4.5 4.5 4.5.63 0 1.23-.13 1.77-.36l.98.98c-.88.24-1.8.38-2.75.38-3.79 0-7.17-2.13-8.82-5.5.7-1.43 1.72-2.61 2.93-3.53',
  'EyeSlashIcon',
)

export const LockIcon = makeSvgComponent(
  'M7 7a5 5 0 0 1 10 0v2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h1V7Zm-1 4v9h12v-9H6Zm9-2H9V7a3 3 0 1 1 6 0v2Zm-3 4a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z',
  'LockIcon',
)

export const TokenIcon = makeSvgComponent(
  'M4 5.5a.5.5 0 0 0-.5.5v2.535a.5.5 0 0 0 .25.433A3.498 3.498 0 0 1 5.5 12a3.498 3.498 0 0 1-1.75 3.032.5.5 0 0 0-.25.433V18a.5.5 0 0 0 .5.5h16a.5.5 0 0 0 .5-.5v-2.535a.5.5 0 0 0-.25-.433A3.498 3.498 0 0 1 18.5 12a3.5 3.5 0 0 1 1.75-3.032.5.5 0 0 0 .25-.433V6a.5.5 0 0 0-.5-.5H4ZM2.5 6A1.5 1.5 0 0 1 4 4.5h16A1.5 1.5 0 0 1 21.5 6v3.17a.5.5 0 0 1-.333.472 2.501 2.501 0 0 0 0 4.716.5.5 0 0 1 .333.471V18a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 18v-3.17a.5.5 0 0 1 .333-.472 2.501 2.501 0 0 0 0-4.716.5.5 0 0 1-.333-.471V6Zm12 2a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm0 4a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm0 4a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Z',
  'TokenIcon',
)

export const XMarkIcon = makeSvgComponent(
  'M4.293 4.293a1 1 0 0 1 1.414 0L12 10.586l6.293-6.293a1 1 0 1 1 1.414 1.414L13.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L10.586 12 4.293 5.707a1 1 0 0 1 0-1.414Z',
  'XMarkIcon',
)
