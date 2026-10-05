import { FieldValue } from "@/components/ui/field-value"
import { Example } from "@/showcase/example"

export default function FieldValueValues() {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label='"Approved"'>
        <FieldValue value="Approved" />
      </Example>
      <Example label='"Provisional"'>
        <FieldValue value="Provisional" />
      </Example>
      <Example label='"CODE: Label"'>
        <FieldValue value="ACT: Active" />
      </Example>
      <Example label="URL">
        <FieldValue value="https://waterdata.usgs.gov/nm" />
      </Example>
      <Example label="plain text">
        <FieldValue value="Sandia Basin" />
      </Example>
    </div>
  )
}
