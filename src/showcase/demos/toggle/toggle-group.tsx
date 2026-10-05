import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Example } from "@/showcase/example"

export default function ToggleGroupDemo() {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label='type="multiple" variant="outline"'>
        <ToggleGroup type="multiple" variant="outline" defaultValue={["bold"]}>
          <ToggleGroupItem value="bold" aria-label="Bold">
            <BoldIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            <ItalicIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline">
            <UnderlineIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </Example>
      <Example label='type="single"'>
        <ToggleGroup type="single" defaultValue="map">
          <ToggleGroupItem value="map">Map</ToggleGroupItem>
          <ToggleGroupItem value="table">Table</ToggleGroupItem>
          <ToggleGroupItem value="chart">Chart</ToggleGroupItem>
        </ToggleGroup>
      </Example>
      <Example label='type="single" variant="outline" size="sm"'>
        <ToggleGroup type="single" variant="outline" size="sm" defaultValue="day">
          <ToggleGroupItem value="day">Day</ToggleGroupItem>
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
        </ToggleGroup>
      </Example>
    </div>
  )
}
