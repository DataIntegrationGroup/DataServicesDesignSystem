import { ModeToggle } from "@/components/mode-toggle"
import { Example } from "@/showcase/example"

export default function ModeToggleExample() {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label="<ModeToggle /> inside a ThemeProvider">
        <ModeToggle />
      </Example>
    </div>
  )
}
