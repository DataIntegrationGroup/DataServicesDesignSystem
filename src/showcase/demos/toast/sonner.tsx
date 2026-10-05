import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Example } from "@/showcase/example"

export default function ToastSonner() {
  return (
    <>
      <Example label="toast()">
        <Button variant="outline" onClick={() => toast("Settings saved")}>
          Default
        </Button>
      </Example>
      <Example label="toast.success()">
        <Button
          variant="outline"
          onClick={() =>
            toast.success("Source connected", {
              description: "warehouse-prod is online.",
            })
          }
        >
          Success
        </Button>
      </Example>
      <Example label="toast.error()">
        <Button
          variant="outline"
          onClick={() =>
            toast.error("Sync failed", { description: "Retrying in 30s." })
          }
        >
          Error
        </Button>
      </Example>
      <Example label="toast.info()">
        <Button variant="outline" onClick={() => toast.info("New release available")}>
          Info
        </Button>
      </Example>
      <Example label="toast.warning()">
        <Button
          variant="outline"
          onClick={() => toast.warning("API rate limit at 80%")}
        >
          Warning
        </Button>
      </Example>
      <Example label="with action">
        <Button
          variant="outline"
          onClick={() =>
            toast("Source archived", {
              action: { label: "Undo", onClick: () => toast("Restored") },
            })
          }
        >
          With action
        </Button>
      </Example>
    </>
  )
}
