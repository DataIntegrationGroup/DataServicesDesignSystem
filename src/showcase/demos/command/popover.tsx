import { DatabaseIcon, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Example } from "@/showcase/example"

const sources = ["warehouse-prod", "lakehouse-stg", "legacy-ora", "events-kafka"]

// Mounted only when open: cmdk scrolls its first item into view on mount,
// which would jump the page if it sat inline.
export default function CommandPopover() {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label="Command in a Popover (searchable list)">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <SearchIcon /> Find a source
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-72 p-0">
            <Command>
              <CommandInput placeholder="Search sources…" />
              <CommandList>
                <CommandEmpty>No sources found.</CommandEmpty>
                <CommandGroup heading="Sources">
                  {sources.map((name) => (
                    <CommandItem key={name} value={name}>
                      <DatabaseIcon /> {name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </Example>
    </div>
  )
}
