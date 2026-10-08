# DataServices Design System

Shared themes and components for DataServices apps, published as a
[shadcn](https://ui.shadcn.com) registry.

## Run the showcase

```bash
pnpm install
pnpm dev
```

Open http://localhost:5173 to browse every component and block.

## Use it in an app

Start a new Vite app on the design system, then add the components you need:

```bash
pnpm dlx shadcn@latest init -t vite -n my-app https://raw.githubusercontent.com/DataIntegrationGroup/DataServicesDesignSystem/main/public/r/base.json
cd my-app
pnpm dlx shadcn@latest add @dataservices/app-shell
```

In an existing shadcn app, add the registry and a theme instead:

```bash
pnpm dlx shadcn@latest registry add "@dataservices=https://raw.githubusercontent.com/DataIntegrationGroup/DataServicesDesignSystem/main/public/r/{name}.json"
pnpm dlx shadcn@latest add @dataservices/theme-ocotillo
```

Then replace everything in `src/index.css` with:

```css
@import "./styles/ds-base.css";
@import "./styles/themes/ocotillo.css";
```

Each showcase page has the install command for its component.
[THEMING.md](THEMING.md) covers themes and tokens.

### Adopting it in an existing app (OcotilloUI)

OcotilloUI is already a shadcn project in the same style (`radix-nova`), but
it's mid-migration from MUI, so move over a piece at a time:

- **CSS:** don't replace `src/index.css`. Swap its token blocks (`@theme
  inline`, `:root`, `.dark`) for the two imports above, and keep its plugins
  and app styles below them. Keep `src/theme.ts` in step with the theme until
  MUI is gone.
- **Components it already has** (18 in `src/components/ui`): replace one at a
  time. Run `add @dataservices/<name> --dry-run --diff` first, so you can keep
  any local changes.
- **App shell:** the `app-shell` block is modeled on OcotilloUI's
  `AppShell.tsx`. Pass React Router's location as `pathname` and its `Link`
  through `renderLink`.
- **React 18:** OcotilloUI is on React 18 and this repo on React 19, so check
  each component in the app (or upgrade React first).

## Change the registry

After editing a component or `registry.json`:

```bash
pnpm lint
pnpm registry:build
```

Commit the regenerated `public/r/` files; they're what apps install.
Showcase pages are listed in `src/showcase/pages.ts`, with their examples in
`src/showcase/demos/`.
