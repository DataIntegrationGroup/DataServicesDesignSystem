import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Example } from "@/showcase/example"

export default function RadioGroupDefault() {
  return (
    <>
      <Example label='defaultValue="incremental", one item disabled'>
        <RadioGroup defaultValue="incremental">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="full" id="r-full" />
            <Label htmlFor="r-full">Full resync</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="incremental" id="r-inc" />
            <Label htmlFor="r-inc">Incremental</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="manual" id="r-man" disabled />
            <Label htmlFor="r-man">Manual only</Label>
          </div>
        </RadioGroup>
      </Example>
    </>
  )
}
