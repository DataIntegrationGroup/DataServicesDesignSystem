import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LabelDemo() {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <div className="grid w-64 gap-2">
        <Label htmlFor="label-demo-site">Site name</Label>
        <Input id="label-demo-site" placeholder="e.g. Rio Grande at Otowi" />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="label-demo-public" />
        <Label htmlFor="label-demo-public">Public dataset</Label>
      </div>
    </div>
  )
}
