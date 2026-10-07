import { Separator } from "@/components/ui/separator"
import { Example } from "@/showcase/example"

export default function SeparatorDemo() {
  return (
    <div className="flex flex-wrap items-start gap-x-10 gap-y-6">
      <Example label='orientation="horizontal"' className="w-64 items-stretch">
        <div>
          <div className="text-sm font-medium">Well RG-0012</div>
          <div className="text-sm text-muted-foreground">Sandoval County</div>
          <Separator className="my-3" />
          <div className="text-sm">Depth to water: 42.1 ft</div>
        </div>
      </Example>
      <Example label='orientation="vertical"'>
        <div className="flex h-5 items-center gap-3 text-sm">
          <span>Datasets</span>
          <Separator orientation="vertical" />
          <span>Map</span>
          <Separator orientation="vertical" />
          <span>About</span>
        </div>
      </Example>
    </div>
  )
}
