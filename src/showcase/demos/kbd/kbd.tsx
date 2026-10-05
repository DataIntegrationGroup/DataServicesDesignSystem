import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Example } from "@/showcase/example"

export default function KbdExamples() {
  return (
    <>
      <Example label="Kbd">
        <Kbd>Esc</Kbd>
      </Example>
      <Example label="KbdGroup">
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Example>
      <Example label="in text">
        <p className="text-sm text-muted-foreground">
          Press{" "}
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>B</Kbd>
          </KbdGroup>{" "}
          to toggle the sidebar.
        </p>
      </Example>
    </>
  )
}
