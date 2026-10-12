import { useCallback, useState } from "react"

import registry from "../../registry.json"

type ThemeItem = {
  name: string
  title: string
  cssVars: { light: Record<string, string>; dark: Record<string, string> }
}

export const THEMES = registry.items.filter(
  (item) => item.type === "registry:theme"
) as ThemeItem[]

export const THEME_STORAGE_KEY = "showcase-theme"

function block(selector: string, vars: Record<string, string> = {}) {
  const lines = Object.entries(vars).map(([k, v]) => `  --${k}: ${v};`)
  return `${selector} {\n${lines.join("\n")}\n}`
}

// Showcase only: previews a theme item by writing its cssVars over the
// installed theme. Apps pick one theme with `shadcn add` instead.
export function applyTheme(name: string | null) {
  const item = THEMES.find((t) => t.name === name) ?? THEMES[0]
  let style = document.getElementById(THEME_STORAGE_KEY)
  if (!style) {
    style = document.createElement("style")
    style.id = THEME_STORAGE_KEY
    document.head.append(style)
  }
  style.textContent = [
    block(":root", item.cssVars.light),
    block(".dark", item.cssVars.dark),
  ].join("\n")
}

/** The previewed theme, kept in localStorage. It's applied before React
 *  renders with it, so canvas demos read the new values when they remount. */
export function useShowcaseTheme() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) ?? THEMES[0].name
    applyTheme(stored)
    return stored
  })
  const choose = useCallback((next: string) => {
    localStorage.setItem(THEME_STORAGE_KEY, next)
    applyTheme(next)
    setTheme(next)
  }, [])
  return [theme, choose] as const
}
