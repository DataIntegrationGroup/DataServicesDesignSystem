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

2. Add the theme first (palette + fonts), then the components you need:

   ```bash
   npx shadcn add @dataservices/theme
   npx shadcn add @dataservices/navbar @dataservices/page @dataservices/map
   npx shadcn add @dataservices/mode-toggle   # pulls theme-provider + button
   ```

Each item carries its own npm dependencies (e.g. `map` → `react-map-gl`,
`maplibre-gl`) and registry dependencies, which the CLI installs automatically.

### Published items

| Item             | Type      | What                                                          |
| ---------------- | --------- | ------------------------------------------------------------- |
| `theme`          | theme     | OcotilloUI palette + Outfit/Public Sans tokens (light + dark) |
| `theme-provider` | component | Light/dark/system context, localStorage-persisted             |
| `mode-toggle`    | component | Light/dark toggle button                                      |
| `map`            | ui        | MapLibre map, token-free CARTO basemap, NM default extent     |
| `navbar`         | ui        | Router-agnostic top nav chrome (`asChild` link slots)         |
| `page`           | ui        | `PageShell` + `PageBody` full-viewport layout                 |

Standard shadcn primitives (button, card, dialog, table, …) come from the
upstream shadcn registry — install those the normal way.

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

### React 19 note

`pnpm install` logs unmet-peer warnings for a few libraries whose peer ranges
predate React 19 — `@glideapps/glide-data-grid` (data-grid), `cmdk`
(command/combobox), `react-resizable-panels` (resizable), and
`react-day-picker` (calendar/date-picker). All are verified working on
React 19; the warnings are safe to ignore.
