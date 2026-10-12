# DataServices Design System

A [shadcn](https://ui.shadcn.com) registry for DataServices apps. It ships
two brand themes and the components we built ourselves. Everything else
comes straight from upstream shadcn (base-nova, on Base UI), so apps install
those by name and get upstream updates directly.

## Run the showcase

```bash
pnpm install
pnpm dev
```

Open http://localhost:5173. There's a page for every upstream component and
every item in this registry, each with its install command and source. The
theme menu in the header switches between Ocotillo and Weaver.

## Start a new app

```bash
pnpm dlx shadcn@latest init https://raw.githubusercontent.com/DataIntegrationGroup/DataServicesDesignSystem/main/public/r/base.json -t vite -n my-app
```

This sets up a base-nova Vite app with the Ocotillo theme, its fonts, the
mode toggle, and the `@dataservices` registry in `components.json`. Then add
what you need:

```bash
pnpm dlx shadcn@latest add button card          # upstream components
pnpm dlx shadcn@latest add @dataservices/app-shell   # ours
```

Wrap the app in next-themes' `ThemeProvider` with `attribute="class"` so
dark mode and the mode toggle work.

## Add it to an existing shadcn app

Register the namespace first. Items that depend on other `@dataservices`
items won't install without it.

```bash
pnpm dlx shadcn@latest registry add "@dataservices=https://raw.githubusercontent.com/DataIntegrationGroup/DataServicesDesignSystem/main/public/r/{name}.json"
pnpm dlx shadcn@latest add @dataservices/theme-ocotillo
```

Use `theme-weaver` for Weaver. A theme replaces the `:root` and `.dark`
values in your CSS file, so installing the other one switches brands. Run
any add with `--dry-run --diff` first to see what it changes.

## Items

| Item | What it is |
| --- | --- |
| `base` | Starts a new app (see above) |
| `theme-ocotillo`, `theme-weaver` | Brand themes. See [THEMING.md](THEMING.md) |
| `mode-toggle` | Light, dark and system menu on next-themes |
| `app-shell` | Frame for tool-style apps: collapsible sidebar, top bar, side panel |
| `top-nav` | Header for content sites, with a sheet menu on small screens |
| `map` | MapLibre map with a free CARTO basemap and a New Mexico view |
| `basemap-selector` | Basemap thumbnails on a radio group |
| `layer-selector` | Map layer list with legend swatches and per-layer settings |
| `echart` | Apache ECharts wrapper themed from the chart tokens |
| `data-grid` | Editable canvas grid (Glide Data Grid) |
| `data-table` | TanStack Table v9 table with sorting, filtering and paging |
| `date-picker` | Single date and date range pickers |
| `filter-controls` | Map-extent switch and debounced text filter |
| `field-value` | Formats a feature attribute (links, codes, approval status) |
| `use-css-vars` | Hook that reads token values for canvas renderers |

Two items need one-time setup, and the CLI prints it on install:

- `map`: maplibre-gl 6 needs its worker URL set once per app. The map page
  in the showcase shows the Vite version.
- `data-grid`: Glide Data Grid lists React 16 to 18 as peers. It works on
  React 19, but npm apps need an `overrides` entry.

## Change the registry

- Our sources live in `src/registry/base-nova/`, grouped by type (`ui`,
  `blocks`, `components`, `hooks`). Import other items through
  `@/registry/base-nova/...` and the CLI rewrites the paths on install.
- Each item is listed in `registry.json`. List upstream components it uses
  in `registryDependencies` by bare name (`"button"`), our own as
  `"@dataservices/<name>"`, and every npm import in `dependencies`.
- Each item needs a demo in `src/showcase/demos/<name>.tsx`, or
  `src/showcase/frames/<name>.tsx` for full-screen blocks.
- `src/components/ui/` and the `*-example.tsx` files are upstream CLI
  output. Don't edit them. Re-pull with `pnpm dlx shadcn@latest add <name> --overwrite`.

Then rebuild and check:

```bash
pnpm registry:build
pnpm lint
```

`pnpm lint` fails if `public/r` is stale, if `registry.json` doesn't
validate, or if a component or item has no demo. Commit `public/r`, since
that's what apps install from.
