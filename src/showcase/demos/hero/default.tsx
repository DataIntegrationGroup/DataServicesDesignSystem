import { ArrowRightIcon, SearchIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Hero } from "@/blocks/hero"

export default function HeroDemo() {
  return (
    <Hero
      eyebrow="Part of the New Mexico Water Data Initiative"
      title="Weaver"
      tagline="Weaving together New Mexico water data"
      description="Find groundwater levels, water quality and well records from agencies across the state, in one place."
    >
      <InputGroup size="lg" variant="prominent">
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search datasets…" aria-label="Search datasets" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="default">Search</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <div className="flex flex-wrap gap-2">
        <Badge variant="on-image" asChild>
          <a href="#/hero">Groundwater levels</a>
        </Badge>
        <Badge variant="on-image" asChild>
          <a href="#/hero">Water quality</a>
        </Badge>
        <Badge variant="on-image" asChild>
          <a href="#/hero">Wells</a>
        </Badge>
      </div>
      <Button variant="inverse" size="xl" asChild>
        <a href="#/hero">
          Explore the map <ArrowRightIcon data-icon="inline-end" />
        </a>
      </Button>
    </Hero>
  )
}
