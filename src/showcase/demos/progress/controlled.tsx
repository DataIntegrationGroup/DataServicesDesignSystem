import * as React from "react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Example } from "@/showcase/example"

export default function ProgressControlled() {
  const [progress, setProgress] = React.useState(62)
  return (
    <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
      <Example label="controlled value" className="w-72 items-stretch">
        <Progress value={progress} aria-label="Indexing progress" />
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setProgress((value) => Math.max(0, value - 10))}
          >
            -10
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setProgress((value) => Math.min(100, value + 10))}
          >
            +10
          </Button>
        </div>
      </Example>
    </div>
  )
}
