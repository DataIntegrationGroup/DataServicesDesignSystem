import { useEffect, useState } from "react"

import { THEMES } from "./theme-items"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Showcase only: previews each theme item by writing its cssVars over the
// installed theme. Apps pick one theme with `shadcn add` instead.
const STORAGE_KEY = "showcase-theme"

function block(selector: string, vars: Record<string, string> = {}) {
  const lines = Object.entries(vars).map(([k, v]) => `  --${k}: ${v};`)
  return `${selector} {\n${lines.join("\n")}\n}`
}

export function ThemeSelect() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(STORAGE_KEY) ?? THEMES[0].name
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme)
    const item = THEMES.find((t) => t.name === theme) ?? THEMES[0]
    let style = document.getElementById(STORAGE_KEY)
    if (!style) {
      style = document.createElement("style")
      style.id = STORAGE_KEY
      document.head.append(style)
    }
    style.textContent = [
      block(":root", item.cssVars?.light),
      block(".dark", item.cssVars?.dark),
    ].join("\n")
  }, [theme])

  return (
    <Select
      items={THEMES.map((t) => ({ value: t.name, label: t.title }))}
      value={theme}
      onValueChange={(value) => value && setTheme(value)}
    >
      <SelectTrigger size="sm" aria-label="Theme">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {THEMES.map((t) => (
          <SelectItem key={t.name} value={t.name}>
            {t.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
