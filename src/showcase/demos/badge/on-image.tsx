import { Badge } from "@/components/ui/badge"
import { Example } from "@/showcase/example"

export default function BadgeOnImage() {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label='variant="on-image"' className="items-stretch">
        <div className="flex items-center gap-2 rounded-xl bg-primary-dark p-6">
          <Badge variant="on-image">Groundwater</Badge>
          <Badge variant="on-image" asChild>
            <a href="#/badge">Linked</a>
          </Badge>
        </div>
      </Example>
    </div>
  )
}
