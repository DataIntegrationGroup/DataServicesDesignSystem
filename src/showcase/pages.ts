import * as React from "react"

import registry from "../../registry.json"

/**
 * Where a component comes from:
 * - `ds`: written for the DS.
 * - `extended`: upstream shadcn with DS variants added (see `additions`).
 * - `shadcn`: upstream shadcn, unchanged apart from theme tokens.
 */
export type Origin = "ds" | "extended" | "shadcn"

export type PageGroup = "Foundations" | "Components" | "Data & maps" | "Blocks"

export type ShowcasePage = {
  slug: string
  title: string
  group: PageGroup
  origin?: Origin
  /** DS registry items this page documents; the first is the install target. */
  registry?: string[]
  /** Upstream shadcn component name, for the docs link and plain install. */
  upstream?: string
  /** For pages without a registry item (or to override its description). */
  description?: string
  /** For `extended` components: what the DS adds. */
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
    description: "Every color token in the theme contract, for the active theme and mode. See THEMING.md.",
    component: page(() => import("./pages/colors")),
  },
  {
    slug: "typography",
    title: "Typography",
    group: "Foundations",
    description: "Base heading and body styles, the DS type steps, and Tailwind's scale, measured in the browser.",
    component: page(() => import("./pages/typography")),
  },

  // Components, A–Z
  {
    slug: "accordion",
    title: "Accordion",
    group: "Components",
    description: "Stacked headings that each expand to reveal a section of content.",
    origin: "extended",
    registry: ["accordion"],
    upstream: "accordion",
    additions: ['AccordionTrigger variant="plain": no hover underline, centered chevron, for triggers that hold more than a label'],
    component: page(() => import("./pages/accordion")),
  },
  {
    slug: "alert",
    title: "Alert",
    group: "Components",
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
    group: "Components",
    origin: "shadcn",
    registry: ["alert-dialog"],
    upstream: "alert-dialog",
    component: page(() => import("./pages/alert-dialog")),
  },
  {
    slug: "avatar",
    title: "Avatar",
    group: "Components",
    origin: "shadcn",
    upstream: "avatar",
    description: "An image with a fallback for a user or organization, plus badges and groups.",
    component: page(() => import("./pages/avatar")),
  },
  {
    slug: "badge",
    title: "Badge",
    group: "Components",
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
    group: "Components",
    origin: "shadcn",
    registry: ["breadcrumb"],
    upstream: "breadcrumb",
    component: page(() => import("./pages/breadcrumb")),
  },
  {
    slug: "button",
    title: "Button",
    group: "Components",
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
    group: "Components",
    description: "A surface that groups related content and actions.",
    origin: "extended",
    registry: ["card"],
    upstream: "card",
    additions: ["asChild + interactive: a whole-card link with hover border, shadow and focus ring"],
    component: page(() => import("./pages/card")),
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    group: "Components",
    origin: "shadcn",
    upstream: "checkbox",
    description: "A control for toggling an option on and off.",
    component: page(() => import("./pages/checkbox")),
  },
  {
    slug: "combobox",
    title: "Combobox",
    group: "Components",
    origin: "ds",
    registry: ["combobox"],
    component: page(() => import("./pages/combobox")),
  },
  {
    slug: "command",
    title: "Command",
    group: "Components",
    origin: "shadcn",
    registry: ["command"],
    upstream: "command",
    component: page(() => import("./pages/command")),
  },
  {
    slug: "date-picker",
    title: "Date picker",
    group: "Components",
    origin: "ds",
    registry: ["date-picker", "calendar"],
    component: page(() => import("./pages/date-picker")),
  },
  {
    slug: "detail-list",
    title: "Detail list",
    group: "Components",
    origin: "ds",
    registry: ["detail-list"],
    component: page(() => import("./pages/detail-list")),
  },
  {
    slug: "dialog",
    title: "Dialog",
    group: "Components",
    origin: "shadcn",
    upstream: "dialog",
    description: "A modal window over the page, for focused tasks like renaming or confirming.",
    component: page(() => import("./pages/dialog")),
  },
  {
    slug: "dropdown-menu",
    title: "Dropdown menu",
    group: "Components",
    origin: "shadcn",
    upstream: "dropdown-menu",
    description: "A menu of actions or options opened from a button.",
    component: page(() => import("./pages/dropdown-menu")),
  },
  {
    slug: "facet-rail",
    title: "Facet rail",
    group: "Components",
    origin: "ds",
    registry: ["facet-rail"],
    component: page(() => import("./pages/facet-rail")),
  },
  {
    slug: "filter-chip",
    title: "Filter chip",
    group: "Components",
    origin: "ds",
    registry: ["filter-chip"],
    component: page(() => import("./pages/filter-chip")),
  },
  {
    slug: "form",
    title: "Form",
    group: "Components",
    origin: "shadcn",
    registry: ["form"],
    upstream: "form",
    component: page(() => import("./pages/form")),
  },
  {
    slug: "input",
    title: "Input",
    group: "Components",
    origin: "shadcn",
    upstream: "input",
    description: "A single-line text field, plus Textarea for longer text.",
    component: page(() => import("./pages/input")),
  },
  {
    slug: "input-group",
    title: "Input group",
    group: "Components",
    description: "An input or textarea with icons, text, buttons or key hints attached.",
    origin: "extended",
    registry: ["input-group"],
    upstream: "input-group",
    additions: [
      'size="lg": a taller row with 18px text, for hero and page search',
      'variant="prominent": primary border, card fill and a wider focus ring',
    ],
    component: page(() => import("./pages/input-group")),
  },
  {
    slug: "kbd",
    title: "Kbd",
    group: "Components",
    origin: "shadcn",
    registry: ["kbd"],
    upstream: "kbd",
    component: page(() => import("./pages/kbd")),
  },
  {
    slug: "mode-toggle",
    title: "Mode toggle",
    group: "Components",
    origin: "ds",
    registry: ["mode-toggle", "theme-provider"],
    component: page(() => import("./pages/mode-toggle")),
  },
  {
    slug: "navbar",
    title: "NavBar",
    group: "Components",
    origin: "ds",
    registry: ["navbar"],
    component: page(() => import("./pages/navbar")),
  },
  {
    slug: "onboarding-tour",
    title: "Onboarding tour",
    group: "Components",
    origin: "ds",
    registry: ["onboarding-tour"],
    component: page(() => import("./pages/onboarding-tour")),
  },
  {
    slug: "page",
    title: "Page and container",
    group: "Components",
    origin: "ds",
    registry: ["page"],
    component: page(() => import("./pages/page")),
  },
  {
    slug: "popover",
    title: "Popover",
    group: "Components",
    origin: "shadcn",
    upstream: "popover",
    description: "Rich content in a floating panel, opened from a trigger.",
    component: page(() => import("./pages/popover")),
  },
  {
    slug: "progress",
    title: "Progress",
    group: "Components",
    origin: "shadcn",
    upstream: "progress",
    description: "A bar showing how far a task has got.",
    component: page(() => import("./pages/progress")),
  },
  {
    slug: "radio-group",
    title: "Radio group",
    group: "Components",
    origin: "shadcn",
    registry: ["radio-group"],
    upstream: "radio-group",
    component: page(() => import("./pages/radio-group")),
  },
  {
    slug: "resizable",
    title: "Resizable",
    group: "Components",
    origin: "shadcn",
    registry: ["resizable"],
    upstream: "resizable",
    component: page(() => import("./pages/resizable")),
  },
  {
    slug: "select",
    title: "Select",
    group: "Components",
    origin: "shadcn",
    upstream: "select",
    description: "A list of options to pick one from, opened from a button.",
    component: page(() => import("./pages/select")),
  },
  {
    slug: "sheet",
    title: "Sheet",
    group: "Components",
    origin: "shadcn",
    registry: ["sheet"],
    upstream: "sheet",
    component: page(() => import("./pages/sheet")),
  },
  {
    slug: "sidebar",
    title: "Sidebar",
    group: "Components",
    origin: "shadcn",
    registry: ["sidebar", "use-mobile"],
    upstream: "sidebar",
    component: page(() => import("./pages/sidebar")),
  },
  {
    slug: "skeleton",
    title: "Skeleton",
    group: "Components",
    origin: "shadcn",
    upstream: "skeleton",
    description: "A placeholder shape shown while content loads.",
    component: page(() => import("./pages/skeleton")),
  },
  {
    slug: "slider",
    title: "Slider",
    group: "Components",
    origin: "shadcn",
    upstream: "slider",
    description: "Pick a value or range by dragging along a track.",
    component: page(() => import("./pages/slider")),
  },
  {
    slug: "stat-band",
    title: "Stat band",
    group: "Components",
    origin: "ds",
    registry: ["stat-band"],
    component: page(() => import("./pages/stat-band")),
  },
  {
    slug: "status-indicator",
    title: "Status indicator",
    group: "Components",
    origin: "ds",
    registry: ["status-indicator"],
    component: page(() => import("./pages/status-indicator")),
  },
  {
    slug: "switch",
    title: "Switch",
    group: "Components",
    description: "An on/off control for a setting that applies immediately.",
    origin: "extended",
    registry: ["switch"],
    upstream: "switch",
    additions: ['shape="square": a squared track and thumb, alongside the default pill'],
    component: page(() => import("./pages/switch")),
  },
  {
    slug: "tabs",
    title: "Tabs",
    group: "Components",
    description: "Switch between related panels of content in one place.",
    origin: "extended",
    registry: ["tabs"],
    upstream: "tabs",
    additions: ['TabsList variant="folder": tabs that join a card panel below, for images and dark bands'],
    component: page(() => import("./pages/tabs")),
  },
  {
    slug: "toast",
    title: "Toast",
    group: "Components",
    origin: "shadcn",
    upstream: "sonner",
    description: "Brief notifications (Sonner). Mount <Toaster /> once, then call toast() anywhere.",
    component: page(() => import("./pages/toast")),
  },
  {
    slug: "toggle",
    title: "Toggle",
    group: "Components",
    origin: "shadcn",
    registry: ["toggle", "toggle-group"],
    upstream: "toggle",
    component: page(() => import("./pages/toggle")),
  },
  {
    slug: "tooltip",
    title: "Tooltip",
    group: "Components",
    origin: "shadcn",
    upstream: "tooltip",
    description: "A short label shown on hover or focus.",
    component: page(() => import("./pages/tooltip")),
  },
  {
    slug: "top-loading-bar",
    title: "Top loading bar",
    group: "Components",
    origin: "ds",
    registry: ["top-loading-bar"],
    component: page(() => import("./pages/top-loading-bar")),
  },

  // Data & maps
  {
    slug: "chart",
    title: "Chart",
    group: "Data & maps",
    origin: "shadcn",
    registry: ["chart"],
    upstream: "chart",
    component: page(() => import("./pages/chart")),
  },
  {
    slug: "echart",
    title: "EChart",
    group: "Data & maps",
    origin: "ds",
    registry: ["echart", "use-css-vars"],
    component: page(() => import("./pages/echart")),
  },
  {
    slug: "table",
    title: "Table",
    group: "Data & maps",
    origin: "shadcn",
    upstream: "table",
    description: "A plain, static table for small sets of rows.",
    component: page(() => import("./pages/table")),
  },
  {
    slug: "data-table",
    title: "Data table",
    group: "Data & maps",
    origin: "ds",
    registry: ["data-table"],
    component: page(() => import("./pages/data-table")),
  },
  {
    slug: "data-grid",
    title: "Data grid",
    group: "Data & maps",
    origin: "ds",
    registry: ["data-grid"],
    component: page(() => import("./pages/data-grid")),
  },
  {
    slug: "field-value",
    title: "Field value",
    group: "Data & maps",
    origin: "ds",
    registry: ["field-value"],
    component: page(() => import("./pages/field-value")),
  },
  {
    slug: "map",
    title: "Map",
    group: "Data & maps",
    origin: "ds",
    registry: ["map"],
    component: page(() => import("./pages/map")),
  },
  {
    slug: "basemap-selector",
    title: "Basemap selector",
    group: "Data & maps",
    origin: "ds",
    registry: ["basemap-selector"],
    component: page(() => import("./pages/basemap-selector")),
  },
  {
    slug: "layer-selector",
    title: "Layer selector",
    group: "Data & maps",
    origin: "ds",
    registry: ["layer-selector"],
    component: page(() => import("./pages/layer-selector")),
  },
  {
    slug: "filter-controls",
    title: "Filter controls",
    group: "Data & maps",
    origin: "ds",
    registry: ["filter-controls"],
    component: page(() => import("./pages/filter-controls")),
  },

  // Blocks
  {
    slug: "site-header",
    title: "Site header",
    group: "Blocks",
    registry: ["site-header"],
    component: page(() => import("./pages/site-header")),
  },
  {
    slug: "hero",
    title: "Hero",
    group: "Blocks",
    registry: ["hero"],
    component: page(() => import("./pages/hero")),
  },
  {
    slug: "detail-card",
    title: "Detail card",
    group: "Blocks",
    registry: ["detail-card"],
    component: page(() => import("./pages/detail-card")),
  },
]

export const PAGE_GROUPS: PageGroup[] = ["Foundations", "Components", "Data & maps", "Blocks"]

const REGISTRY_DESCRIPTIONS: Record<string, string> = Object.fromEntries(
  registry.items.map((item) => [item.name, item.description ?? ""])
)

/** The page's one-line description: its own, else its registry item's. */
export function pageDescription(page: ShowcasePage) {
  return page.description ?? (page.registry ? REGISTRY_DESCRIPTIONS[page.registry[0]] : "")
}

/** The install command for the page's component. */
export function installCommand(page: ShowcasePage) {
  if (page.registry) return `pnpm dlx shadcn@latest add @dataservices/${page.registry[0]}`
  if (page.upstream) return `pnpm dlx shadcn@latest add ${page.upstream}`
  return undefined
}

export const upstreamDocs = (name: string) =>
  `https://ui.shadcn.com/docs/components/radix/${name}`

export const findPage = (slug: string) => PAGES.find((p) => p.slug === slug)

/** The page being shown; PageContent reads it to render the header. */
export const CurrentPageContext = React.createContext<ShowcasePage | null>(null)
