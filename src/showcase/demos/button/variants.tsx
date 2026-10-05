import { Button } from "@/components/ui/button"
import { Example } from "@/showcase/example"

export default function ButtonVariants() {
  return (
    <>
      <Example label='variant="default"'>
        <Button>Button</Button>
      </Example>
      <Example label='variant="secondary"'>
        <Button variant="secondary">Button</Button>
      </Example>
      <Example label='variant="outline"'>
        <Button variant="outline">Button</Button>
      </Example>
      <Example label='variant="ghost"'>
        <Button variant="ghost">Button</Button>
      </Example>
      <Example label='variant="destructive"'>
        <Button variant="destructive">Button</Button>
      </Example>
      <Example label='variant="link"'>
        <Button variant="link">Button</Button>
      </Example>
    </>
  )
}
