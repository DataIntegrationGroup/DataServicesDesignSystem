import { Example, ExampleWrapper } from "@/components/example"
import { ModeToggle } from "@/registry/base-nova/mode-toggle/mode-toggle"

export default function ModeToggleDemo() {
  return (
    <ExampleWrapper>
      <Example title="Light, dark and system">
        <ModeToggle />
      </Example>
    </ExampleWrapper>
  )
}
