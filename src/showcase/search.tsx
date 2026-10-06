import * as React from "react"
import { PaletteIcon, TypeIcon } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { AppShellSearch } from "@/blocks/app-shell"
import { OriginBadge } from "@/showcase/page-header"
import { PAGE_GROUPS, PAGES, pageDescription } from "@/showcase/pages"
import { href } from "@/showcase/router"
import { SWATCH_TOKENS } from "@/showcase/tokens"

const TYPE_STEPS = ["text-display", "text-eyebrow"]

/** Every typed word must appear somewhere in the item; items whose name
 *  (value or first keyword) contains the first word rank higher. cmdk's
 *  default fuzzy match is too loose for long descriptions. */
function matchWords(value: string, search: string, keywords: string[] = []) {
  const words = search.toLowerCase().split(/\s+/).filter(Boolean)
  const text = [value, ...keywords].join(" ").toLowerCase()
  if (!words.every((word) => text.includes(word))) return 0
  const name = `${value} ${keywords[0] ?? ""}`.toLowerCase()
  return name.includes(words[0] ?? "") ? 1 : 0.5
}

/** ⌘K / Ctrl+K search over every page, color token and type step. */
export function ShowcaseSearch() {
  const [open, setOpen] = React.useState(false)

  const openSearch = React.useCallback(() => setOpen(true), [])

  const go = (slug: string) => {
    window.location.assign(href(slug))
    setOpen(false)
  }

  return (
    <>
      <AppShellSearch onClick={openSearch} size="lg" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0" showCloseButton={false}>
          <DialogTitle className="sr-only">Search the design system</DialogTitle>
          <DialogDescription className="sr-only">
            Find a component, block, color token or type step.
          </DialogDescription>
          <Command filter={matchWords}>
            <CommandInput placeholder="Search components, blocks and tokens…" />
            <CommandList className="max-h-[min(24rem,60vh)]">
              <CommandEmpty>No results.</CommandEmpty>
              {PAGE_GROUPS.map((group) => (
                <CommandGroup key={group} heading={group}>
                  {PAGES.filter((page) => page.group === group).map((page) => (
                    <CommandItem
                      key={page.slug}
                      value={page.slug}
                      keywords={[
                        page.title,
                        pageDescription(page),
                        ...(page.registry ?? []),
                        ...(page.additions ?? []),
                      ]}
                      onSelect={() => go(page.slug)}
                    >
                      {page.title}
                      {page.origin && page.origin !== "shadcn" && (
                        <span className="ml-auto">
                          <OriginBadge origin={page.origin} />
                        </span>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
              <CommandGroup heading="Color tokens">
                {SWATCH_TOKENS.map((token) => (
                  <CommandItem
                    key={token}
                    value={`token ${token}`}
                    keywords={[`--${token}`, `bg-${token}`, `text-${token}`]}
                    onSelect={() => go("colors")}
                  >
                    <PaletteIcon />
                    <span
                      className="size-3 rounded-sm border"
                      style={{ background: `var(--${token})` }}
                      aria-hidden
                    />
                    {token}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup heading="Type steps">
                {TYPE_STEPS.map((step) => (
                  <CommandItem
                    key={step}
                    value={`type ${step}`}
                    onSelect={() => go("typography")}
                  >
                    <TypeIcon /> {step}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}
