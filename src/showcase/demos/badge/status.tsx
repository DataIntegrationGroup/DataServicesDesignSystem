import { Badge } from "@/components/ui/badge"
import { Example } from "@/showcase/example"

export default function BadgeStatus() {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label='variant="success"'>
        <Badge variant="success">Success</Badge>
      </Example>
      <Example label='variant="warning"'>
        <Badge variant="warning">Warning</Badge>
      </Example>
      <Example label='variant="info"'>
        <Badge variant="info">Info</Badge>
      </Example>
      <Example label='variant="destructive"'>
        <Badge variant="destructive">Destructive</Badge>
      </Example>
    </div>
  )
}
