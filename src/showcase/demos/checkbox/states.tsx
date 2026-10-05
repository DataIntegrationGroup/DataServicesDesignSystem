import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Example } from "@/showcase/example"

export default function CheckboxStates() {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label='unchecked'>
        <div className="flex items-center gap-2">
          <Checkbox id="ex-cb-1" />
          <Label htmlFor="ex-cb-1">Subscribe</Label>
        </div>
      </Example>
      <Example label='checked'>
        <div className="flex items-center gap-2">
          <Checkbox id="ex-cb-2" defaultChecked />
          <Label htmlFor="ex-cb-2">Subscribe</Label>
        </div>
      </Example>
      <Example label='disabled'>
        <div className="flex items-center gap-2">
          <Checkbox id="ex-cb-3" disabled />
          <Label htmlFor="ex-cb-3">Subscribe</Label>
        </div>
      </Example>
      <Example label='aria-invalid="true"'>
        <div className="flex items-center gap-2">
          <Checkbox id="ex-cb-4" aria-invalid="true" />
          <Label htmlFor="ex-cb-4">I accept the terms</Label>
        </div>
      </Example>
    </div>
  )
}
