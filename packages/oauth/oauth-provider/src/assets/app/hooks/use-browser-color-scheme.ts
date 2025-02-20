import { useEffect, useState } from 'react'

const query =
  typeof window === 'undefined'
    ? null
    : window.matchMedia('(prefers-color-scheme: dark)')

export function useBrowserColorScheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    query?.matches ? 'dark' : 'light',
  )

  useEffect(() => {
    if (!query) return

    const listener = () => {
      setTheme(query.matches ? 'dark' : 'light')
    }

    query.addEventListener('change', listener)

    return () => {
      query.removeEventListener('change', listener)
    }
  }, [query])

  return theme
}
