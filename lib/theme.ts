'use client'
import { createContext, useContext, useEffect, useState, createElement } from 'react'
import type { ReactNode } from 'react'

type Theme = 'dark' | 'light'

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'dark',
  toggle: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const stored = localStorage.getItem('nodeaxis-theme') as Theme | null
    const initial = stored ?? 'dark'
    setTheme(initial)
    document.documentElement.classList.toggle('dark', initial === 'dark')
  }, [])

  const toggle = () => {
    setTheme(current => {
      const next = current === 'dark' ? 'light' : 'dark'
      localStorage.setItem('nodeaxis-theme', next)
      document.documentElement.classList.toggle('dark', next === 'dark')
      return next
    })
  }

  return createElement(ThemeContext.Provider, { value: { theme, toggle } }, children)
}

export const useTheme = () => useContext(ThemeContext)
