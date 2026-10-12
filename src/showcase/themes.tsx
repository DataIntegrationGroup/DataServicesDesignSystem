import { useEffect, useState } from "react"

import { applyTheme, THEME_STORAGE_KEY, THEMES } from "./theme-items"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ThemeSelect() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_STORAGE_KEY) ?? THEMES[0].name
  )

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
    applyTheme(theme)
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
