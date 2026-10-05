import { Button } from "@/components/ui/button"
import { Example } from "@/showcase/example"

export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label='size="xs"'>
        <Button size="xs">Button</Button>
      </Example>
      <Example label='size="sm"'>
        <Button size="sm">Button</Button>
      </Example>
      <Example label='size="default"'>
        <Button>Button</Button>
      </Example>
      <Example label='size="lg"'>
        <Button size="lg">Button</Button>
      </Example>
      <Example label='size="xl"'>
        <Button size="xl">Button</Button>
      </Example>
    </div>
  )
}
