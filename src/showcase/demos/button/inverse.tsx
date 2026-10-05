import { ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Example } from "@/showcase/example"

export default function ButtonInverse() {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label='variant="inverse"' className="items-stretch">
        <div className="flex items-center gap-4 rounded-xl bg-primary-dark p-6">
          <Button variant="inverse">Button</Button>
          <Button variant="inverse" size="xl">
            Join on Slack <ChevronRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </Example>
    </div>
  )
}
