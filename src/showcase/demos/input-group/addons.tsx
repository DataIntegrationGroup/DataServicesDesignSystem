import { SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Example } from "@/showcase/example"

export default function InputGroupAddons() {
  return (
    <>
      <Example label="Kbd hint" className="items-stretch">
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="Jump to…" aria-label="Jump to" />
          <InputGroupAddon align="inline-end">
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </InputGroupAddon>
        </InputGroup>
      </Example>
      <Example label="text prefix + button" className="items-stretch">
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="example.org" aria-label="URL" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton>Check</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Example>
      <Example label='textarea + align="block-end"' className="items-stretch">
        <InputGroup>
          <InputGroupTextarea placeholder="Notes…" aria-label="Notes" />
          <InputGroupAddon align="block-end">
            <InputGroupText>0 / 280</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Example>
    </>
  )
}
