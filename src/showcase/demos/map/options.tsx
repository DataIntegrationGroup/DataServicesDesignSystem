import { Card } from "@/components/ui/card"
import { Map } from "@/components/ui/map"
import { Example } from "@/showcase/example"

export default function MapOptions() {
  return (
    <>
      <Example label='showScale={false} controlPosition="bottom-left"' className="items-stretch">
        <Card className="overflow-hidden p-0">
          <div className="h-[240px]">
            <Map showScale={false} controlPosition="bottom-left" />
          </div>
        </Card>
      </Example>
    </>
  )
}
