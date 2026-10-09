import * as React from "react"

import registry from "../../registry.json"

/**
 * Where a component comes from:
 * - `ds`: written for the DS.
 * - `extended`: upstream shadcn with DS changes (see `additions`).
 * - `shadcn`: upstream shadcn, unchanged apart from theme tokens.
 */
export type Origin = "ds" | "extended" | "shadcn"

export type PageGroup = "Foundations" | "Custom" | "Core"

export type ShowcasePage = {
  slug: string
  title: string
  group: PageGroup
  origin?: Origin
  /** DS registry items this page documents; the first is the install target. */
  registry?: string[]
  /** Upstream shadcn component name, for the docs link. */
  upstream?: string
  /** For pages without a registry item (or to override its description). */
  description?: string
  /** For `extended` components: what the DS changes. */
  additions?: string[]
  component: React.LazyExoticComponent<React.ComponentType>
}

const page = (load: () => Promise<{ default: React.ComponentType }>) =>
  React.lazy(load)

export const PAGES: ShowcasePage[] = [
  // Foundations
  {
    slug: "introduction",
    title: "Introduction",
    group: "Foundations",
    description: "Shared themes and components for DataServices apps, published as a shadcn registry.",
    component: page(() => import("./pages/introduction")),
  },
  {
    slug: "colors",
    title: "Colors",
    group: "Foundations",
    description: "Every color token in the theme contract, for the active theme and mode. Switch themes with the dropdown in the top right, and light or dark mode with the button next to it. See THEMING.md.",
    component: page(() => import("./pages/colors")),
  },
  {
    slug: "typography",
    title: "Typography",
    group: "Foundations",
    description: "Base heading and body styles, the DS type steps, and Tailwind's scale, measured in the browser.",
    component: page(() => import("./pages/typography")),
  },

  // Custom: blocks, then components built for our apps, A–Z
  {
    slug: "app-shell",
    title: "App shell",
    group: "Custom",
    registry: ["app-shell"],
    component: page(() => import("./pages/app-shell")),
  },
  {
    slug: "top-nav",
    title: "Top nav",
    group: "Custom",
    registry: ["top-nav"],
    component: page(() => import("./pages/top-nav")),
  },
  {
    slug: "basemap-selector",
    title: "Basemap selector",
    group: "Custom",
    origin: "ds",
    registry: ["basemap-selector"],
    component: page(() => import("./pages/basemap-selector")),
  },
  {
    slug: "data-grid",
    title: "Data grid",
    group: "Custom",
    origin: "ds",
    registry: ["data-grid"],
    component: page(() => import("./pages/data-grid")),
  },
  {
    slug: "data-table",
    title: "Data table",
    group: "Custom",
    origin: "ds",
    registry: ["data-table"],
    component: page(() => import("./pages/data-table")),
  },
  {
    slug: "date-picker",
    title: "Date picker",
    group: "Custom",
    origin: "ds",
    registry: ["date-picker", "calendar"],
    component: page(() => import("./pages/date-picker")),
  },
  {
    slug: "echart",
    title: "EChart",
    group: "Custom",
    origin: "ds",
    registry: ["echart", "use-css-vars"],
    component: page(() => import("./pages/echart")),
  },
  {
    slug: "field-value",
    title: "Field value",
    group: "Custom",
    origin: "ds",
    registry: ["field-value"],
    component: page(() => import("./pages/field-value")),
  },
  {
    slug: "filter-controls",
    title: "Filter controls",
    group: "Custom",
    origin: "ds",
    registry: ["filter-controls"],
    component: page(() => import("./pages/filter-controls")),
  },
  {
    slug: "layer-selector",
    title: "Layer selector",
    group: "Custom",
    origin: "ds",
    registry: ["layer-selector"],
    component: page(() => import("./pages/layer-selector")),
  },
  {
    slug: "map",
    title: "Map",
    group: "Custom",
    origin: "ds",
    registry: ["map"],
    component: page(() => import("./pages/map")),
  },
  {
    slug: "mode-toggle",
    title: "Mode toggle",
    group: "Custom",
    origin: "ds",
    registry: ["mode-toggle", "theme-provider"],
    component: page(() => import("./pages/mode-toggle")),
  },

  // Core: the standard set, based on shadcn/ui (some with DS variants), A–Z
  {
    slug: "accordion",
    title: "Accordion",
    group: "Core",
    description: "Stacked headings that each expand to reveal a section of content.",
    origin: "shadcn",
    registry: ["accordion"],
    upstream: "accordion",
    component: page(() => import("./pages/accordion")),
  },
  {
    slug: "alert",
    title: "Alert",
    group: "Core",
    description: "A callout for a message that needs the user's attention.",
    origin: "extended",
    registry: ["alert"],
    upstream: "alert",
    additions: ['variant="success" | "warning" | "info" on the status tokens'],
    component: page(() => import("./pages/alert")),
  },
  {
    slug: "alert-dialog",
    title: "Alert dialog",
    group: "Core",
    origin: "shadcn",
    registry: ["alert-dialog"],
    upstream: "alert-dialog",
    component: page(() => import("./pages/alert-dialog")),
  },
  {
    slug: "avatar",
    title: "Avatar",
    group: "Core",
    origin: "shadcn",
    registry: ["avatar"],
    upstream: "avatar",
    description: "An image with a fallback for a user or organization, plus badges and groups.",
    component: page(() => import("./pages/avatar")),
  },
  {
    slug: "badge",
    title: "Badge",
    group: "Core",
    description: "A small label for a status, category or count.",
    origin: "extended",
    registry: ["badge"],
    upstream: "badge",
    additions: [
      'variant="success" | "warning" | "info" for status',
      'variant="tone-1" … "tone-6" for categories',
      'variant="on-image" for photos and dark bands',
    ],
    component: page(() => import("./pages/badge")),
  },
  {
    slug: "breadcrumb",
    title: "Breadcrumb",
    group: "Core",
    origin: "shadcn",
    registry: ["breadcrumb"],
    upstream: "breadcrumb",
    component: page(() => import("./pages/breadcrumb")),
  },
  {
    slug: "button",
    title: "Button",
    group: "Core",
    description: "A button, or a link styled as one.",
    origin: "extended",
    registry: ["button"],
    upstream: "button",
    additions: [
      'size="xl": a 48px call to action',
      'variant="inverse": a light button for dark bands and images',
    ],
    component: page(() => import("./pages/button")),
  },
  {
    slug: "card",
    title: "Card",
    group: "Core",
    description: "A surface that groups related content and actions.",
    origin: "shadcn",
    registry: ["card"],
    upstream: "card",
    component: page(() => import("./pages/card")),
  },
  {
    slug: "chart",
    title: "Chart",
    group: "Core",
    origin: "shadcn",
    registry: ["chart"],
    upstream: "chart",
    component: page(() => import("./pages/chart")),
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    group: "Core",
    origin: "shadcn",
    registry: ["checkbox"],
    upstream: "checkbox",
    description: "A control for toggling an option on and off.",
    component: page(() => import("./pages/checkbox")),
  },
  {
    slug: "collapsible",
    title: "Collapsible",
    group: "Core",
    origin: "shadcn",
    registry: ["collapsible"],
    upstream: "collapsible",
    description: "Show and hide a section with a trigger.",
    component: page(() => import("./pages/collapsible")),
  },
  {
    slug: "combobox",
    title: "Combobox",
    group: "Core",
    origin: "shadcn",
    registry: ["combobox"],
    upstream: "combobox",
    description: "A text input that filters a list of options, for picking from lists too long for a Select.",
    component: page(() => import("./pages/combobox")),
  },
  {
    slug: "command",
    title: "Command",
    group: "Core",
    origin: "shadcn",
    registry: ["command"],
    upstream: "command",
    component: page(() => import("./pages/command")),
  },
  {
    slug: "dialog",
    title: "Dialog",
    group: "Core",
    origin: "shadcn",
    registry: ["dialog"],
    upstream: "dialog",
    description: "A modal window over the page, for focused tasks like renaming or confirming.",
    component: page(() => import("./pages/dialog")),
  },
  {
    slug: "dropdown-menu",
    title: "Dropdown menu",
    group: "Core",
    origin: "shadcn",
    registry: ["dropdown-menu"],
    upstream: "dropdown-menu",
    description: "A menu of actions or options opened from a button.",
    component: page(() => import("./pages/dropdown-menu")),
  },
  {
    slug: "field",
    title: "Field",
    group: "Core",
    origin: "shadcn",
    registry: ["field"],
    upstream: "field",
    description: "Lays out a form control with its label, description and error, stacked or side by side.",
    component: page(() => import("./pages/field")),
  },
  {
    slug: "form",
    title: "Form",
    group: "Core",
    origin: "shadcn",
    registry: ["form"],
    upstream: "form",
    component: page(() => import("./pages/form")),
  },
  {
    slug: "input",
    title: "Input",
    group: "Core",
    origin: "shadcn",
    registry: ["input", "textarea"],
    upstream: "input",
    description: "A single-line text field, plus Textarea for longer text.",
    component: page(() => import("./pages/input")),
  },
  {
    slug: "input-group",
    title: "Input group",
    group: "Core",
    description: "An input or textarea with icons, text, buttons or key hints attached.",
    origin: "shadcn",
    registry: ["input-group"],
    upstream: "input-group",
    component: page(() => import("./pages/input-group")),
  },
  {
    slug: "kbd",
    title: "Kbd",
    group: "Core",
    origin: "shadcn",
    registry: ["kbd"],
    upstream: "kbd",
    component: page(() => import("./pages/kbd")),
  },
  {
    slug: "label",
    title: "Label",
    group: "Core",
    origin: "shadcn",
    registry: ["label"],
    upstream: "label",
    description: "A caption for a form control; clicking it focuses the control.",
    component: page(() => import("./pages/label")),
  },
  {
    slug: "navigation-menu",
    title: "Navigation menu",
    group: "Core",
    origin: "shadcn",
    registry: ["navigation-menu"],
    upstream: "navigation-menu",
    component: page(() => import("./pages/navigation-menu")),
  },
  {
    slug: "popover",
    title: "Popover",
    group: "Core",
    origin: "shadcn",
    registry: ["popover"],
    upstream: "popover",
    description: "Rich content in a floating panel, opened from a trigger.",
    component: page(() => import("./pages/popover")),
  },
  {
    slug: "progress",
    title: "Progress",
    group: "Core",
    origin: "shadcn",
    registry: ["progress"],
    upstream: "progress",
    description: "A bar showing how far a task has got.",
    component: page(() => import("./pages/progress")),
  },
  {
    slug: "radio-group",
    title: "Radio group",
    group: "Core",
    origin: "shadcn",
    registry: ["radio-group"],
    upstream: "radio-group",
    component: page(() => import("./pages/radio-group")),
  },
  {
    slug: "resizable",
    title: "Resizable",
    group: "Core",
    origin: "shadcn",
    registry: ["resizable"],
    upstream: "resizable",
    component: page(() => import("./pages/resizable")),
  },
  {
    slug: "select",
    title: "Select",
    group: "Core",
    origin: "shadcn",
    registry: ["select"],
    upstream: "select",
    description: "A list of options to pick one from, opened from a button.",
    component: page(() => import("./pages/select")),
  },
  {
    slug: "separator",
    title: "Separator",
    group: "Core",
    origin: "shadcn",
    registry: ["separator"],
    upstream: "separator",
    description: "A thin rule between content, horizontal or vertical.",
    component: page(() => import("./pages/separator")),
  },
  {
    slug: "sheet",
    title: "Sheet",
    group: "Core",
    origin: "extended",
    registry: ["sheet"],
    upstream: "sheet",
    additions: ["Borders under SheetHeader and above SheetFooter"],
    component: page(() => import("./pages/sheet")),
  },
  {
    slug: "sidebar",
    title: "Sidebar",
    group: "Core",
    origin: "extended",
    registry: ["sidebar", "use-mobile"],
    upstream: "sidebar",
    additions: [
      "useIsMobile reads the viewport with useSyncExternalStore, so the first render already has the right value",
    ],
    component: page(() => import("./pages/sidebar")),
  },
  {
    slug: "skeleton",
    title: "Skeleton",
    group: "Core",
    origin: "shadcn",
    registry: ["skeleton"],
    upstream: "skeleton",
    description: "A placeholder shape shown while content loads.",
    component: page(() => import("./pages/skeleton")),
  },
  {
    slug: "slider",
    title: "Slider",
    group: "Core",
    origin: "shadcn",
    registry: ["slider"],
    upstream: "slider",
    description: "Pick a value or range by dragging along a track.",
    component: page(() => import("./pages/slider")),
  },
  {
    slug: "spinner",
    title: "Spinner",
    group: "Core",
    origin: "shadcn",
    registry: ["spinner"],
    upstream: "spinner",
    description: "An animated indicator that something is loading.",
    component: page(() => import("./pages/spinner")),
  },
  {
    slug: "switch",
    title: "Switch",
    group: "Core",
    description: "An on/off control for a setting that applies immediately.",
    origin: "shadcn",
    registry: ["switch"],
    upstream: "switch",
    component: page(() => import("./pages/switch")),
  },
  {
    slug: "table",
    title: "Table",
    group: "Core",
    origin: "extended",
    registry: ["table"],
    upstream: "table",
    description: "A plain, static table for small sets of rows.",
    additions: [
      "containerClassName styles the scrolling wrapper",
    ],
    component: page(() => import("./pages/table")),
  },
  {
    slug: "tabs",
    title: "Tabs",
    group: "Core",
    description: "Switch between related panels of content in one place.",
    origin: "shadcn",
    registry: ["tabs"],
    upstream: "tabs",
    component: page(() => import("./pages/tabs")),
  },
  {
    slug: "toast",
    title: "Toast",
    group: "Core",
    origin: "extended",
    registry: ["sonner"],
    upstream: "sonner",
    description: "Brief notifications (Sonner). Mount <Toaster /> once, then call toast() anywhere.",
    additions: ["Reads light or dark from the DS ThemeProvider instead of next-themes"],
    component: page(() => import("./pages/toast")),
  },
  {
    slug: "toggle",
    title: "Toggle",
    group: "Core",
    origin: "shadcn",
    registry: ["toggle", "toggle-group"],
    upstream: "toggle",
    component: page(() => import("./pages/toggle")),
  },
  {
    slug: "tooltip",
    title: "Tooltip",
    group: "Core",
    origin: "shadcn",
    registry: ["tooltip"],
    upstream: "tooltip",
    description: "A short label shown on hover or focus.",
    component: page(() => import("./pages/tooltip")),
  },
]

export const PAGE_GROUPS: PageGroup[] = ["Foundations", "Custom", "Core"]

const REGISTRY_DESCRIPTIONS: Record<string, string> = Object.fromEntries(
  registry.items.map((item) => [item.name, item.description ?? ""])
)

/** The page's one-line description: its own, else its registry item's. */
export function pageDescription(page: ShowcasePage) {
  return page.description ?? (page.registry ? REGISTRY_DESCRIPTIONS[page.registry[0]] : "")
}

/** The install command for the page's component. Everything installs
 *  through @dataservices, unchanged upstream components included, so apps
 *  get the copies shown here (scripts/check-showcase.ts enforces it). */
export function installCommand(page: ShowcasePage) {
  if (page.registry) return `pnpm dlx shadcn@latest add @dataservices/${page.registry[0]}`
  return undefined
}

export const upstreamDocs = (name: string) =>
  `https://ui.shadcn.com/docs/components/radix/${name}`

export const findPage = (slug: string) => PAGES.find((p) => p.slug === slug)

/** The page being shown; PageContent reads it to render the header. */
export const CurrentPageContext = React.createContext<ShowcasePage | null>(null)
