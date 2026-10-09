import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react"

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
  /** The mode actually applied: `theme`, with "system" resolved from the OS. */
  resolvedTheme: "dark" | "light"
  palette: Palette | undefined
  setPalette: (palette: Palette) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "light",
  palette: undefined,
  setPalette: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

const DARK_QUERY = "(prefers-color-scheme: dark)"

function subscribeSystemDark(cb: () => void) {
  const query = window.matchMedia(DARK_QUERY)
  query.addEventListener("change", cb)
  return () => query.removeEventListener("change", cb)
}

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

  // Follow the OS setting, including changes while the page is open.
  const systemDark = useSyncExternalStore(
    subscribeSystemDark,
    () => window.matchMedia(DARK_QUERY).matches,
    () => false
  )
  const resolvedTheme =
    theme === "system" ? (systemDark ? "dark" : "light") : theme

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(resolvedTheme)
  }, [resolvedTheme])

  const value = {
    theme,
    resolvedTheme,
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
