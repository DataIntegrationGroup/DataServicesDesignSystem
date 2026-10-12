import { Example, ExampleWrapper } from "@/components/example"
import { FieldValue } from "@/registry/base-nova/ui/field-value"

const VALUES = [
  ["Approval status", "Approved"],
  ["Approval status", "Provisional"],
  ["Coded value", "ACT: Active"],
  ["URL", "https://waterdata.usgs.gov/nm"],
  ["Plain text", "Sandia Basin"],
]

export default function FieldValueDemo() {
  return (
    <ExampleWrapper>
      <Example title="Values">
        <dl className="grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-3 text-sm">
          {VALUES.map(([label, value]) => (
            <div key={value} className="contents">
              <dt className="text-muted-foreground">{label}</dt>
              <dd>
                <FieldValue value={value} />
              </dd>
            </div>
          ))}
        </dl>
      </Example>
    </ExampleWrapper>
  )
}
