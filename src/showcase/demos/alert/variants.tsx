import { CircleCheckIcon, InfoIcon, TriangleAlertIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Example } from "@/showcase/example"

export default function AlertVariants() {
  return (
    <>
      <Example label='variant="default"' className="items-stretch">
        <Alert>
          <InfoIcon />
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>
            Scheduled maintenance window starts in 30 minutes.
          </AlertDescription>
        </Alert>
      </Example>
      <Example label='variant="destructive"' className="items-stretch">
        <Alert variant="destructive">
          <TriangleAlertIcon />
          <AlertTitle>Connection failed</AlertTitle>
          <AlertDescription>
            Could not reach <code>db.internal:5432</code>. Check credentials
            and network policy.
          </AlertDescription>
        </Alert>
      </Example>
      <Example label='variant="success"' className="items-stretch">
        <Alert variant="success">
          <CircleCheckIcon />
          <AlertTitle>Upload complete</AlertTitle>
          <AlertDescription>
            1,204 records were added to the dataset.
          </AlertDescription>
        </Alert>
      </Example>
      <Example label='variant="warning"' className="items-stretch">
        <Alert variant="warning">
          <TriangleAlertIcon />
          <AlertTitle>Very large download</AlertTitle>
          <AlertDescription>
            This file can take minutes to prepare. For most uses, connect through the API instead.
          </AlertDescription>
        </Alert>
      </Example>
      <Example label='variant="info"' className="items-stretch">
        <Alert variant="info">
          <InfoIcon />
          <AlertTitle>New data source</AlertTitle>
          <AlertDescription>
            Bureau of Geology well records are now included.
          </AlertDescription>
        </Alert>
      </Example>
    </>
  )
}
