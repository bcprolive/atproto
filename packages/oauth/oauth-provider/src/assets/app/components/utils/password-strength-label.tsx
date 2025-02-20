import { Trans } from '@lingui/react/macro'
import { JSX } from 'react'
import { PasswordStrength, getPasswordStrength } from '../../lib/password.ts'
import { Override } from '../../lib/util.ts'

export type PasswordStrengthLabelProps = Override<
  Omit<JSX.IntrinsicElements['span'], 'children' | 'aria-label'>,
  {
    password: string
  }
>

export function PasswordStrengthLabel({
  password,

  // span
  ...props
}: PasswordStrengthLabelProps) {
  const strength = getPasswordStrength(password)

  return (
    <span {...props} aria-label="Password strength">
      {strength === undefined ? (
        <Trans>Too short</Trans>
      ) : strength === PasswordStrength.strong ? (
        <Trans>Strong</Trans>
      ) : strength === PasswordStrength.moderate ? (
        <Trans>Moderate</Trans>
      ) : (
        <Trans>Weak</Trans>
      )}
    </span>
  )
}
