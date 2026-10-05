import { SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Example } from "@/showcase/example"

export default function InputGroupSizeAndVariant() {
  return (
    <div className="flex flex-col gap-4">
      <Example label='default' className="items-stretch">
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search sources…"
            aria-label="Search sources (default)"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="default" size="sm">
              Search
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Example>
      <Example label='size="lg"' className="items-stretch">
        <InputGroup size="lg">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search sources…"
            aria-label="Search sources (lg)"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="default" size="sm">
              Search
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Example>
      <Example label='variant="prominent"' className="items-stretch">
        <InputGroup variant="prominent">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search sources…"
            aria-label="Search sources (prominent)"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="default" size="sm">
              Search
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Example>
      <Example label='size="lg" variant="prominent"' className="items-stretch">
        <InputGroup size="lg" variant="prominent">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search sources…"
            aria-label="Search sources (lg prominent)"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="default" size="sm">
              Search
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Example>
    </div>
  )
}
