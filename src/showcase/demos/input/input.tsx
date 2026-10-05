import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Example } from "@/showcase/example"

export default function InputExamples() {
  return (
    <>
      <Example label="default" className="w-56 items-stretch">
        <Input placeholder="warehouse-prod" aria-label="Name" />
      </Example>
      <Example label="with Label" className="w-56 items-stretch">
        <Label htmlFor="ex-host">Host</Label>
        <Input id="ex-host" placeholder="db.internal:5432" />
      </Example>
      <Example label="disabled" className="w-56 items-stretch">
        <Input disabled placeholder="Read only" aria-label="Disabled" />
      </Example>
      <Example label='aria-invalid="true"' className="w-56 items-stretch">
        <Input
          aria-invalid="true"
          defaultValue="db internal"
          aria-label="Invalid host"
        />
      </Example>
    </>
  )
}
