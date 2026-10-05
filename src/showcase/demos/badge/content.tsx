import { CheckIcon, ChevronRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Example } from "@/showcase/example"

export default function BadgeContent() {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
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
    </div>
  )
}
