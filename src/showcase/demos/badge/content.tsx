import { CheckIcon, ChevronRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Example } from "@/showcase/example"

export default function BadgeContent() {
  return (
    <>
      <Example label="icon start">
        <Badge variant="secondary">
          <CheckIcon data-icon="inline-start" /> Verified
        </Badge>
      </Example>
      <Example label="icon end">
        <Badge variant="outline">
          Sources <ChevronRightIcon data-icon="inline-end" />
        </Badge>
      </Example>
      <Example label="asChild (link)">
        <Badge asChild>
          <a href="#/badge">Linked</a>
        </Badge>
      </Example>
    </>
  )
}
