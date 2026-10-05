# DataServices Design System

Shared UI primitives for DataServices projects, themed to match the OcotilloUI
(NMBGMRDataManager) production theme. Built on Vite + React + TypeScript +
Tailwind v4 + shadcn/ui.

The repo is **both** a live showcase (`pnpm dev`) and a **shadcn registry** —
other projects install components straight from it with `npx shadcn add`, no npm
publish required.

## Consume in another project

The consuming app must already be a shadcn/ui project (`npx shadcn init`).

1. Register the `@dataservices` namespace in the app's `components.json`:

   ```jsonc
   {
     "registries": {
       "@dataservices": "https://raw.githubusercontent.com/DataIntegrationGroup/DataServicesDesignSystem/main/public/r/{name}.json"
     }
   }
   ```

2. Add one theme. It pulls in `theme-base`, the shared CSS structure:

   ```bash
   npx shadcn add @dataservices/theme-ocotillo   # or @dataservices/theme-nmwdi
   ```

   This writes `src/styles/ds-base.css` and `src/styles/themes/<name>.css`,
   and replaces `src/lib/utils.ts` with the DS `cn()`, which knows the type
   steps. Accept the overwrite unless you've customized that file.
   Point your CSS entry at them, replacing the `@import "tailwindcss"`,
   `@theme inline` and `:root` / `.dark` blocks that `shadcn init` created:

   ```css
   /* src/index.css */
   @import "./styles/ds-base.css";
   @import "./styles/themes/nmwdi.css";
   /* app styles below */
   ```

   Then select the theme on `<html>`. Ocotillo is the default, so it works
   without the attribute:

   ```html
   <html lang="en" data-theme="nmwdi">
   ```

   To update later, re-run the same `add` with `--overwrite`. It refreshes
   `ds-base.css` and the theme file and never touches your CSS entry, so keep
   app styles out of those two files. See [THEMING.md](THEMING.md) for the
   token contract.

3. Add the components you need:

   ```bash
   npx shadcn add @dataservices/navbar @dataservices/page @dataservices/map
   npx shadcn add @dataservices/mode-toggle   # pulls theme-provider + button
   ```

Each item carries its own npm dependencies (e.g. `map` → `react-map-gl`,
`maplibre-gl`) and registry dependencies, which the CLI installs automatically.

### Published items

| Item             | Type      | What                                                          |
| ---------------- | --------- | ------------------------------------------------------------- |
| `theme-base`     | file      | Shared CSS: imports, token mappings, radius, type, keyframes  |
| `utils`          | lib       | `cn()` configured for the DS type steps (replaces lib/utils)  |
| `theme-ocotillo` | file      | OcotilloUI palette, light + dark (default theme)              |
| `theme-nmwdi`    | file      | NMWDI palette (teal/terracotta/sand), light + dark            |
| `theme`          | theme     | Legacy: OcotilloUI palette as cssVars merged into app CSS     |
| `theme-provider` | component | Light/dark/system context, plus an optional `palette` prop    |
| `mode-toggle`    | component | Light/dark toggle button                                      |
| `map`            | ui        | MapLibre map, token-free CARTO basemap, NM default extent     |
| `navbar`         | ui        | Router-agnostic top nav chrome (`asChild` link slots)         |
| `page`           | ui        | `PageShell` + `PageBody` (`bleed`) + `Container` (`wide`)     |
| `filter-chip`    | ui        | `FilterChip` + `ActiveFilterBar` for applied filters          |
| `facet-rail`     | ui        | `FacetCheckboxes` + `FacetRail` filter facets with counts     |
| `stat-band`      | ui        | `StatBand` + `Stat` big-number KPI row                        |
| `detail-list`    | ui        | `DetailSection` + `DetailList` / `DetailItem` label/value rows |
| `site-header`    | block     | NavBar on the wide column, with a menu sheet on phones        |
| `hero`           | block     | Landing hero: eyebrow, display title, tagline, actions        |
| `detail-card`    | block     | Record detail card (well, dataset) with a loading state       |
| `button`         | ui        | Upstream button + `size="xl"`, `variant="inverse"`            |
| `badge`          | ui        | Upstream badge + status, `tone-1`…`tone-6`, `on-image`        |
| `alert`          | ui        | Upstream alert + `success`, `warning`, `info`                 |
| `tabs`           | ui        | Upstream tabs + `TabsList variant="folder"`                   |
| `card`           | ui        | Upstream card + `asChild` and `interactive` (whole-card link) |
| `accordion`      | ui        | Upstream accordion + `AccordionTrigger variant="plain"`       |

Where the DS publishes an upstream primitive with added variants (button,
badge, alert, tabs, card, accordion, input-group, …), install it from
`@dataservices` so you get the variants; DS items depend on those versions.
Other shadcn primitives (dialog, table, …) come from the upstream registry —
install those the normal way.

## Develop

```bash
pnpm install
pnpm dev            # showcase at localhost:5173
pnpm build          # typecheck + production build
pnpm lint
pnpm registry:build # regenerate public/r/*.json from registry.json
```

After editing any registered component or `registry.json`, run
`pnpm registry:build` and commit the regenerated `public/r/` JSON — that is what
consumers fetch.

### Showcase

Each component has a page in the showcase (`#/button`), listed in
`src/showcase/pages.ts` with its group, origin and registry item. A page is a
list of demos: small files in `src/showcase/demos/<page>/`, each rendering a
few labeled `<Example>`s. The **Code** toggle shows the demo file itself, with
the `Example` wrappers turned into comments, so write demos as code someone
would copy: spell out each variant rather than mapping over a list, and set
the layout on the demo's root element rather than on the page. Each demo's
title is a section heading that can be linked (`#/button/sizes`). Blocks
(`src/blocks/`) preview in an iframe at desktop, tablet and phone widths.

`pnpm lint` runs `check:showcase`, which fails if a registry item has no page,
a page's demos are missing or unused, or two demos on a page share a title.

### React 19 note

`pnpm install` logs unmet-peer warnings for a few libraries whose peer ranges
predate React 19 — `@glideapps/glide-data-grid` (data-grid), `cmdk`
(command/combobox), `react-resizable-panels` (resizable),
`react-day-picker` (calendar/date-picker), and `recharts` (chart). All are
verified working on React 19; the warnings are safe to ignore. (`echart` uses
Apache ECharts, which is framework-agnostic and has no React peer.)
