'use client'
import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

const STORAGE_KEY = 'nodeaxis-theme'

// Light is the default; dark only when the visitor explicitly chose it.
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'light',
  toggle: () => {},
})

function readStored(): Theme {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const initial = readStored()
    document.documentElement.classList.toggle('dark', initial === 'dark')
    // Sync React state with the class the anti-flash script already applied.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initial)
  }, [])

  const toggle = () => {
    setTheme(current => {
      const next = current === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* storage unavailable — theme still switches for this visit */
      }
      document.documentElement.classList.toggle('dark', next === 'dark')
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
