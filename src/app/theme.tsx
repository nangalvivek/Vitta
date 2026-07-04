/* oxlint-disable react/only-export-components */
import {createContext, useContext, useEffect, useMemo, useState, type ReactNode} from 'react'
import {Provider, defaultTheme} from '@adobe/react-spectrum'

export type ColorScheme = 'light' | 'dark'

export interface AppThemeContextValue {
  colorScheme: ColorScheme
  setColorScheme: (colorScheme: ColorScheme) => void
  toggleColorScheme: () => void
}

const storageKey = 'portfolio-tracker.colorScheme'

const isColorScheme = (value: string | null): value is ColorScheme => value === 'light' || value === 'dark'

const getInitialColorScheme = (): ColorScheme => {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(storageKey)
  if (isColorScheme(stored)) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const AppThemeContext = createContext<AppThemeContextValue | null>(null)

export const useAppTheme = (): AppThemeContextValue => {
  const context = useContext(AppThemeContext)
  if (!context) throw new Error('useAppTheme must be used within AppThemeProvider')
  return context
}

export const AppThemeProvider = ({children}: {children: ReactNode}) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(getInitialColorScheme)

  useEffect(() => {
    window.localStorage.setItem(storageKey, colorScheme)
  }, [colorScheme])

  const value = useMemo<AppThemeContextValue>(
    () => ({
      colorScheme,
      setColorScheme,
      toggleColorScheme: () => setColorScheme((current) => (current === 'light' ? 'dark' : 'light')),
    }),
    [colorScheme],
  )

  return (
    <AppThemeContext.Provider value={value}>
      <Provider theme={defaultTheme} colorScheme={colorScheme}>
        {children}
      </Provider>
    </AppThemeContext.Provider>
  )
}
