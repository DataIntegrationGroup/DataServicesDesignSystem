import { Textarea } from "@/components/ui/textarea"
import { Example } from "@/showcase/example"

export default function TextareaExamples() {
  return (
    <>
      <Example label="default" className="w-72 items-stretch">
        <Textarea placeholder="Operational notes…" aria-label="Notes" />
      </Example>
      <Example label="disabled" className="w-72 items-stretch">
        <Textarea disabled placeholder="Read only" aria-label="Disabled notes" />
      </Example>
    </>
  )
}
