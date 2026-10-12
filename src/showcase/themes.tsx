import { THEMES } from "./theme-items"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ThemeSelect({
  value,
  onValueChange,
}: {
  value: string
  onValueChange: (theme: string) => void
}) {
  return (
    <Select
      items={THEMES.map((t) => ({ value: t.name, label: t.title }))}
      value={value}
      onValueChange={(next) => next && onValueChange(next)}
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
