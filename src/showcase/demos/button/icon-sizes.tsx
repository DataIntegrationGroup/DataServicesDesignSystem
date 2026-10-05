import { MoreHorizontalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Example } from "@/showcase/example"

export default function ButtonIconSizes() {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label='size="icon-xs"'>
        <Button size="icon-xs" variant="outline" aria-label="More">
          <MoreHorizontalIcon />
        </Button>
      </Example>
      <Example label='size="icon-sm"'>
        <Button size="icon-sm" variant="outline" aria-label="More">
          <MoreHorizontalIcon />
        </Button>
      </Example>
      <Example label='size="icon"'>
        <Button size="icon" variant="outline" aria-label="More">
          <MoreHorizontalIcon />
        </Button>
      </Example>
      <Example label='size="icon-lg"'>
        <Button size="icon-lg" variant="outline" aria-label="More">
          <MoreHorizontalIcon />
        </Button>
      </Example>
    </div>
  )
}
