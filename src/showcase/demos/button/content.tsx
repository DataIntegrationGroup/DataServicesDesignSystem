import { ChevronRightIcon, DatabaseIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Example } from "@/showcase/example"

export default function ButtonContent() {
  return (
    <>
      <Example label="icon start">
        <Button>
          <DatabaseIcon data-icon="inline-start" /> Connect
        </Button>
      </Example>
      <Example label="icon end">
        <Button variant="outline">
          Next <ChevronRightIcon data-icon="inline-end" />
        </Button>
      </Example>
      <Example label="disabled">
        <Button disabled>Button</Button>
      </Example>
      <Example label='variant="outline" disabled'>
        <Button variant="outline" disabled>
          Button
        </Button>
      </Example>
      <Example label="asChild (link)">
        <Button asChild variant="secondary">
          <a href="#/button">Anchor</a>
        </Button>
      </Example>
    </>
  )
}
