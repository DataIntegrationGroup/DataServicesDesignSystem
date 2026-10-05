import * as React from "react"

import { TopLoadingBar } from "@/components/top-loading-bar"
import { Button } from "@/components/ui/button"
import { Example } from "@/showcase/example"

export default function TopLoadingBarToggle() {
  const [loading, setLoading] = React.useState(false)
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label="active (controlled)">
        <Button variant="outline" onClick={() => setLoading((v) => !v)}>
          {loading ? "Stop" : "Start"} loading bar
        </Button>
        <TopLoadingBar active={loading} />
      </Example>
    </div>
  )
}
