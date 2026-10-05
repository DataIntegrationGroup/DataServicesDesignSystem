import { CheckIcon, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Example } from "@/showcase/example"

export default function TooltipSides() {
  return (
    <>
      <Example label='side="top"'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">
              <CheckIcon /> Hover me
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Connection healthy</TooltipContent>
        </Tooltip>
      </Example>
      <Example label='side="right"'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">
              <CheckIcon /> Hover me
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Connection healthy</TooltipContent>
        </Tooltip>
      </Example>
      <Example label='side="bottom"'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">
              <CheckIcon /> Hover me
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Connection healthy</TooltipContent>
        </Tooltip>
      </Example>
      <Example label='side="left"'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">
              <CheckIcon /> Hover me
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Connection healthy</TooltipContent>
        </Tooltip>
      </Example>
      <Example label="with Kbd">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Search">
              <SearchIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Search <Kbd>⌘K</Kbd>
          </TooltipContent>
        </Tooltip>
      </Example>
    </>
  )
}
