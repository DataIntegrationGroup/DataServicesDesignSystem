# Theming

Components are shared; themes are per app. A component uses only the semantic
tokens below (`bg-primary`, `text-muted-foreground`, `border-border`…), never a
brand or raw palette color, so every component works under every theme.

## Files

| File | What it holds |
| --- | --- |
| `src/index.css` | The CSS entry `components.json` points to. Structure shared by every app: imports, the `dark` variant, fonts, type steps, the `@theme inline` token-to-utility mappings, the radius scale and base type styles. Sets no colors. Also imports every theme, for the showcase switcher. |
| `src/themes/<name>.css` | One theme: token values only, light and dark. |

Apps don't copy these files. `scripts/registry-css.mjs` (run by `pnpm
registry:build`) copies them into `registry.json` as `cssVars` and `css` on
the `theme-base` and `theme-<name>` items, and `shadcn add` merges those
into the app's own CSS entry, as it does for any shadcn theme. `pnpm lint`
fails if `registry.json` is out of date.

Themes today:

| Theme | `data-theme` | Used by |
| --- | --- | --- |
| Ocotillo | `ocotillo`, or no attribute (default) | OcotilloUI |
| NMWDI | `nmwdi` | Weaver |

## Selecting a theme

Ocotillo is the default theme. It fills the plain `:root` and `.dark` blocks,
exactly like a stock shadcn theme, so it needs no attribute. Every other theme
is scoped to a `data-theme` value on `<html>`; light/dark stays the `.dark`
class on the same element.

```html
<html data-theme="nmwdi">
```

```css
:root[data-theme="nmwdi"] { /* light */ }
:root[data-theme="nmwdi"].dark { /* dark */ }
```

- `[data-theme]` selectors are more specific than `:root` / `.dark`, so the
  theme wins over Ocotillo regardless of load order.
- The light block also applies in dark mode, and the dark block overrides it.
  A theme must set every color token in both blocks (see below), so nothing
  falls through to Ocotillo.
- With no `data-theme`, or one no theme defines, the page shows Ocotillo.
- `ThemeProvider` sets the attribute from its `palette` prop.

## Token contract

Every theme defines every token below. Color tokens are required in both the
light and dark blocks, even when the value is the same. Shape and
on-image tokens don't vary by mode, so they're required in the light block
only.

Each theme is self-contained rather than a list of differences from Ocotillo:
it's easier to read, and a theme never silently depends on another file.

### Surfaces

| Token | Purpose |
| --- | --- |
| `background` / `foreground` | Page background and default text |
| `card` / `card-foreground` | Raised panels: cards, tables, dialogs |
| `popover` / `popover-foreground` | Floating panels: menus, popovers, tooltips |

### Brand

| Token | Purpose |
| --- | --- |
| `primary` / `primary-foreground` | Main actions, links, selection |
| `primary-light` | Light tint of primary (fills, highlights) |
| `primary-dark` | Deep shade of primary (bands, pressed states) |
| `secondary` / `secondary-foreground` | Secondary brand color and text on it |
| `secondary-strong` | Stronger secondary (hover, text on light fills) |
| `secondary-dark` | Deepest secondary shade |

### Neutral

| Token | Purpose |
| --- | --- |
| `muted` / `muted-foreground` | Subdued fills and secondary text |
| `accent` / `accent-foreground` | Hover and active fills for menu items, ghost buttons |
| `border` | Dividers and component borders |
| `input` | Form control borders |
| `ring` | Focus ring |

### Status and tones: one pattern

Status colors and category tones use the same four tokens:

| Suffix | Use | Example |
| --- | --- | --- |
| (none) | Solid fill: dots, icons, solid badges | `bg-success` |
| `-foreground` | Text on the solid fill | `text-success-foreground` |
| `-soft` | Tinted background: soft badges, alerts | `bg-success-soft` |
| `-strong` | Text, icons and strokes on the tint or on a card | `text-success-strong` |

`-foreground` on the solid and `-strong` on `-soft` must meet WCAG AA
(4.5:1), and `pnpm check:themes` checks both.

### Status

| Token | Purpose |
| --- | --- |
| `destructive` (+ `-foreground`, `-soft`, `-strong`) | Errors and destructive actions. shadcn's name, kept instead of a separate `danger`. |
| `success` (+ `-foreground`, `-soft`, `-strong`) | Success, healthy, approved |
| `warning` (+ `-foreground`, `-soft`, `-strong`) | Warnings, degraded, provisional |
| `info` (+ `-foreground`, `-soft`, `-strong`) | Neutral information |

### Category tones

| Token | Purpose |
| --- | --- |
| `tone-1` … `tone-6` (+ `-foreground`, `-soft`, `-strong`) | Categories such as dataset topics or layer groups. Not status: a tone says "which kind", never "good or bad". |

Tone order is stable within a theme, so an app can map its categories to
numbers once. Tones 1 and 2 follow the theme's primary and secondary hues.

### Data

| Token | Purpose |
| --- | --- |
| `chart-1` … `chart-5` | Series colors for `chart` and `echart` |

### Sidebar

| Token | Purpose |
| --- | --- |
| `sidebar` / `sidebar-foreground` | Sidebar surface and text |
| `sidebar-primary` / `sidebar-primary-foreground` | Active item |
| `sidebar-accent` / `sidebar-accent-foreground` | Hovered item |
| `sidebar-border` / `sidebar-ring` | Sidebar border and focus ring |

### Shape (light block only)

| Token | Purpose |
| --- | --- |
| `radius` | Base corner radius; `rounded-sm` … `rounded-4xl` scale from it |

### On image (light block only)

For content on photos and dark brand bands. These don't change with the
mode, because a photo looks the same in light and dark.

| Token | Purpose |
| --- | --- |
| `on-image` | Text on images and dark bands |
| `on-image-muted` | Secondary text |
| `on-image-surface` | Translucent chip and tab fill |
| `on-image-border` | Outline |
| `on-image-ring` | Focus ring |
| `accent-on-dark` | Highlight color for headings on dark bands |

## Fonts

Fonts are shared by every theme: `--font-heading` (Outfit, for `h1`–`h6`
and `font-heading`) and `--font-sans` (Public Sans, for body and UI text),
in the `@theme inline` block of `src/index.css`. They stay in the CSS entry
because the shadcn CLI reads `--font-heading` there when it installs a
component. Without it, the CLI strips `font-heading` from upstream
components such as `CardTitle`.

## Type steps

Named steps for sizes the default Tailwind scale doesn't cover, shared by
every app. They're `--text-*` tokens in `src/index.css`, so each one is a normal
`text-*` utility that sets size, line height, tracking and weight together.
They don't depend on the theme.

| Class | Size | Use | Pair with |
| --- | --- | --- | --- |
| `text-display` | 64–104px, fluid | Hero heading | `font-heading` |
| `text-eyebrow` | 12px, tracked | Small label above a heading | `uppercase` |

Everything else uses the built-in scale. Large section headings use the
`h1` styles or `text-5xl` (48px); big KPI numbers use `text-5xl font-bold
tabular-nums`; intro paragraphs use `text-lg` (18px). For UI text at 13
or 15px, use the nearest standard step (`text-xs`, `text-sm`, `text-base`)
rather than an arbitrary size.

**Use the DS `cn()`.** Stock tailwind-merge treats an unknown `text-*` class
as a color, so `cn("text-display text-primary")` silently drops
`text-display`. `@dataservices/utils` (a dependency of `theme-base`) lists
the steps so `cn()` merges them as font sizes. To add a step, add its
`--text-*` tokens to `src/index.css` and its name to `TYPE_STEPS` in
`src/lib/utils.ts`.

Upstream shadcn components installed from now on import `cn` from the `cn`
npm package rather than `lib/utils`, so they don't see this configuration.
Avoid passing a type step to them alongside a text color.

## Choosing a chip

Two components cover every pill-shaped control. Pick by what the chip does,
not how it looks:

| Need | Use | Example |
| --- | --- | --- |
| A static label | `Badge` (`tone-*` for categories, `success`/`warning`/`info` for status, `on-image` over photos) | A dataset's topic |
| An on/off choice | `Toggle` or `ToggleGroup` | Quick filters above a list |

Don't build other chip styles in apps. If one of these doesn't fit, add a
variant to it in the DS.

## Canvas components

`data-grid` (Glide) and `echart` draw on a canvas, where CSS variables don't
apply. They read token values with the `useCssVars` hook, which re-reads
them when the `class` or `data-theme` attribute on `<html>` changes. They
work with any provider that sets those attributes, not only the DS
ThemeProvider. `chart` (Recharts) uses `var(--chart-N)` directly and needs
nothing extra.

## Known exceptions

Raw colors still in components, and why:

| Where | Colors | Status |
| --- | --- | --- |
| `dialog`, `sheet`, `alert-dialog` | `bg-black/10`, `bg-black/50` scrims | Kept: same as upstream shadcn |
| `basemap-selector` | `from-black/65` scrim behind thumbnail captions | Kept: a scrim, like the overlay ones |
| `slider` | `bg-white` thumb | Kept: same as upstream shadcn |
| `layer-selector` | `#ffffff` marker stroke, `#6b7280` color-input fallback | Kept: map data colors, not UI; `<input type="color">` needs hex |

## Adding a theme

1. Copy `src/themes/nmwdi.css` to `src/themes/<name>.css`.
2. Change the selectors to `:root[data-theme="<name>"]` and
   `:root[data-theme="<name>"].dark`.
3. Set every token in the contract.
4. Import it in `src/index.css`, and add it to `PALETTES` in
   `src/showcase/palettes.ts` so it appears in the showcase switcher.
5. Add a `theme-<name>` item to `registry.json`, copying `theme-nmwdi`
   without its `css`, then run `pnpm registry:build` to fill it in.
6. Run `pnpm check:themes`. It fails on a missing token and warns on any
   key text/background pair below WCAG AA (4.5:1). `--strict` makes those
   warnings fail too.

If you add a token to the contract, update this file, the lists at the top
of `scripts/check-themes.mjs`, the `@theme inline` block in
`src/index.css`, and every theme, then run `pnpm registry:build`.
