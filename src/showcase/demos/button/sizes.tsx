import { Button } from "@/components/ui/button"
import { Example } from "@/showcase/example"

export default function ButtonSizes() {
  return (
    <>
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
    </>
  )
}
