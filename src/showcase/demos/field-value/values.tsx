import { FieldValue } from "@/components/ui/field-value"
import { Example } from "@/showcase/example"

export default function FieldValueValues() {
  return (
    <>
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
    </>
  )
}
