# Theming

Each brand is a `registry:theme` item in `registry.json`. Installing one
writes its values into the app's CSS file, the same way any shadcn theme
does:

- `cssVars.light` goes into `:root`, `cssVars.dark` into `.dark`.
- `cssVars.theme` goes into `@theme inline`, which is how Tailwind gets
  utilities like `bg-success`.
- `registryDependencies` pulls in upstream's `font-public-sans` (body) and
  `font-heading-outfit` (headings).

Apps run one theme. To switch brands, install the other theme. The
showcase's theme menu only previews; it writes the chosen theme's values
over the installed ones and isn't published.

## Tokens

A theme sets every stock base-nova token in light and dark, plus three
status colors:

| Group | Tokens |
| --- | --- |
| Surfaces | `background`, `foreground`, `card`, `popover` (each with `-foreground`) |
| Brand | `primary`, `secondary`, `accent`, `muted` (each with `-foreground`) |
| Status | `destructive`, `success`, `warning`, `info` (the last three with `-foreground`) |
| Lines | `border`, `input`, `ring` |
| Charts | `chart-1` to `chart-5` |
| Sidebar | `sidebar` and its `-foreground`, `-primary`, `-accent`, `-border`, `-ring` set |
| Shape | `radius` (light only) |

Each status color pairs with its `-foreground`, so `bg-warning
text-warning-foreground` always has readable text. Upstream components don't
use the status tokens. They're for our components (`field-value` uses
`success` and `warning`) and for app code.

Canvas components (`echart`, `data-grid`) can't use CSS variables, so they
read the values through `use-css-vars` and re-read them when the `.dark`
class changes.

## Add a theme

1. Copy `theme-ocotillo` in `registry.json` and rename it `theme-<brand>`.
2. Change the values. Keep every token, in both light and dark.
3. Run `pnpm registry:build`.

The showcase reads its theme menu from `registry.json`, so the new theme
shows up there with no other changes.
