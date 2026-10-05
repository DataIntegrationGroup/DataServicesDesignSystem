import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"
import { Example } from "@/showcase/example"

export default function ToggleDemo() {
  return (
    <>
      <Example label='variant="default"'>
        <Toggle aria-label="Bold">
          <BoldIcon />
        </Toggle>
      </Example>
      <Example label='variant="outline"'>
        <Toggle variant="outline" aria-label="Italic">
          <ItalicIcon />
        </Toggle>
      </Example>
      <Example label='size="sm"'>
        <Toggle size="sm" variant="outline" aria-label="Underline sm">
          <UnderlineIcon />
        </Toggle>
      </Example>
      <Example label='size="default"'>
        <Toggle size="default" variant="outline" aria-label="Underline default">
          <UnderlineIcon />
        </Toggle>
      </Example>
      <Example label='size="lg"'>
        <Toggle size="lg" variant="outline" aria-label="Underline lg">
          <UnderlineIcon />
        </Toggle>
      </Example>
      <Example label="pressed, with text">
        <Toggle defaultPressed aria-label="Underline">
          <UnderlineIcon /> Underline
        </Toggle>
      </Example>
      <Example label="disabled">
        <Toggle disabled aria-label="Bold disabled">
          <BoldIcon />
        </Toggle>
      </Example>
    </>
  )
}
