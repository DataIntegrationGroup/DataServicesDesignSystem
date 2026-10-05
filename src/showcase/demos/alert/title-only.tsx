import { Alert, AlertTitle } from "@/components/ui/alert"
import { Example } from "@/showcase/example"

export default function AlertTitleOnly() {
  return (
    <div className="flex flex-col gap-4">
      <Example label="title only, no icon" className="items-stretch">
        <Alert>
          <AlertTitle>3 sources need attention.</AlertTitle>
        </Alert>
      </Example>
    </div>
  )
}
