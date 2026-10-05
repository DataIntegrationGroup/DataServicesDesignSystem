import { Badge } from "@/components/ui/badge"
import { Example } from "@/showcase/example"

export default function BadgeVariants() {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label='variant="default"'>
        <Badge>Badge</Badge>
      </Example>
      <Example label='variant="secondary"'>
        <Badge variant="secondary">Badge</Badge>
      </Example>
      <Example label='variant="destructive"'>
        <Badge variant="destructive">Badge</Badge>
      </Example>
      <Example label='variant="outline"'>
        <Badge variant="outline">Badge</Badge>
      </Example>
      <Example label='variant="ghost"'>
        <Badge variant="ghost">Badge</Badge>
      </Example>
      <Example label='variant="link"'>
        <Badge variant="link">Badge</Badge>
      </Example>
    </div>
  )
}
