import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Example } from "@/showcase/example"

export default function FieldOrientation() {
  return (
    <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
      <Example label='orientation="vertical"' className="w-72 items-stretch">
        <Field>
          <FieldLabel htmlFor="field-demo-host">Host</FieldLabel>
          <Input id="field-demo-host" placeholder="db.internal:5432" />
          <FieldDescription>Hostname and port of the source database.</FieldDescription>
        </Field>
      </Example>
      <Example label='orientation="horizontal"' className="w-72 items-stretch">
        <FieldGroup>
          <Field orientation="horizontal">
            <FieldLabel htmlFor="field-demo-cluster">Cluster points</FieldLabel>
            <Switch id="field-demo-cluster" />
          </Field>
          <Field orientation="horizontal">
            <FieldLabel htmlFor="field-demo-bbox">Filter to map view</FieldLabel>
            <Switch id="field-demo-bbox" defaultChecked />
          </Field>
        </FieldGroup>
      </Example>
    </div>
  )
}
