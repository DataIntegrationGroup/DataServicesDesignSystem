import { toast } from "sonner"

import { FilterChip } from "@/components/ui/filter-chip"
import { Example } from "@/showcase/example"

export default function FilterChipExamples() {
  return (
    <>
      <Example label='kind="Topic" value="Water levels"'>
        <FilterChip
          kind="Topic"
          value="Water levels"
          onRemove={() => toast("Removed Topic: Water levels")}
        />
      </Example>
      <Example label='value only (no kind)'>
        <FilterChip value="“arsenic”" onRemove={() => toast("Removed “arsenic”")} />
      </Example>
    </>
  )
}
