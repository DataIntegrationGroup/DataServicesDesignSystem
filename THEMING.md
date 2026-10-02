# Theming

Components are shared; themes are per app. A component uses only the semantic
tokens below (`bg-primary`, `text-muted-foreground`, `border-border`…), never a
brand or raw palette color, so every component works under every theme.

## Files

| File | What it holds |
| --- | --- |
| `src/styles/base.css` | Structure shared by every app: imports, the `dark` variant, the `@theme inline` token-to-utility mappings, the radius scale, base type styles and DS keyframes. Sets no colors. |
| `src/themes/<name>.css` | One theme: token values only, light and dark. |
| `src/index.css` | Showcase entry: base plus every theme. |

Themes today:

| Theme | `data-theme` | Used by |
| --- | --- | --- |
| Ocotillo | `ocotillo`, or no attribute (default) | OcotilloUI |
| NMWDI | `nmwdi` | Weaver |

## Selecting a theme

Set the theme on `<html>`; light/dark stays the `.dark` class on the same element.

```html
<html data-theme="nmwdi">
```

Each theme scopes its values like this:

```css
:root[data-theme="nmwdi"] { /* light */ }
:root[data-theme="nmwdi"].dark { /* dark */ }
```

- `[data-theme]` selectors are more specific than a plain `:root` / `.dark`, so
  the theme wins regardless of load order. That includes the `:root` / `.dark`
  blocks `shadcn init` or `shadcn add` write into an app's CSS.
- The light block also applies in dark mode, and the dark block overrides it.
  A token missing from the dark block falls back to the same theme's light
  value, never to another theme.
- Ocotillo also matches `:root:not([data-theme])`, so an app that never sets
  the attribute keeps today's look.

## Token contract

Every theme defines every token below. Color tokens are required in both the
light and dark blocks, even when the value is the same. Shape and type tokens
don't vary by mode, so they're required in the light block only.

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

### Status

| Token | Purpose |
| --- | --- |
| `destructive` | Errors and destructive actions |
| `warning-light` / `warning-dark` | Warning fill and warning text |

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

### Shape and type (light block only)

| Token | Purpose |
| --- | --- |
| `radius` | Base corner radius; `rounded-sm` … `rounded-4xl` scale from it |
| `font-heading` | Headings (`h1`–`h6`, `font-heading`) |
| `font-sans` | Body and UI text |

Fonts listed in a theme must be loaded by the app. Base imports Outfit and
Public Sans, which both current themes use.

## Adding a theme

1. Copy `src/themes/ocotillo.css` to `src/themes/<name>.css`.
2. Change the selectors to `:root[data-theme="<name>"]` and
   `:root[data-theme="<name>"].dark`.
3. Set every token in the contract.
4. Import it in `src/index.css` so it appears in the showcase.
