import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

/** A DS color theme, set as data-theme on <html>. See THEMING.md. */
type Palette = "ocotillo" | "nmwdi" | (string & {})

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  /** Color theme to set as data-theme on <html>. Omit it to leave the
   *  attribute alone, e.g. when index.html already sets it. */
  palette?: Palette
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  palette: Palette | undefined
  setPalette: (palette: Palette) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  palette: undefined,
  setPalette: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "dsds-theme",
  palette: initialPalette,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )
  const [palette, setPalette] = useState<Palette | undefined>(
    () => initialPalette ?? document.documentElement.dataset.theme
  )

  useEffect(() => {
    if (palette) document.documentElement.setAttribute("data-theme", palette)
  }, [palette])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    palette,
    setPalette,
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
