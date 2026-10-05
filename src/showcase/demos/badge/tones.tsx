import { Badge } from "@/components/ui/badge"
import { Example } from "@/showcase/example"

export default function BadgeTones() {
  return (
    <>
      <Example label='variant="tone-1"'>
        <Badge variant="tone-1">Water levels</Badge>
      </Example>
      <Example label='variant="tone-2"'>
        <Badge variant="tone-2">Water quality</Badge>
      </Example>
      <Example label='variant="tone-3"'>
        <Badge variant="tone-3">Wells</Badge>
      </Example>
      <Example label='variant="tone-4"'>
        <Badge variant="tone-4">Springs</Badge>
      </Example>
      <Example label='variant="tone-5"'>
        <Badge variant="tone-5">Climate</Badge>
      </Example>
      <Example label='variant="tone-6"'>
        <Badge variant="tone-6">Geology</Badge>
      </Example>
    </>
  )
}
