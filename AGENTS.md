# AGENTS.md

shadcn registry (base-nova / Base UI) + a Vite showcase. Read README.md first.

## Rules
- Never edit `src/components/ui/*`, `src/components/*-example.tsx`,
  `src/components/example.tsx` or `src/hooks/use-mobile.ts`. They're shadcn
  CLI output. Re-pull with `pnpm dlx shadcn@latest add <name> --overwrite`.
- Only our own work goes in `registry.json`. Don't register or fork upstream
  components; to change one, wrap it in a new item.
- Item sources live in `src/registry/base-nova/{ui,blocks,components,hooks}/`.
  Import between items via `@/registry/base-nova/...` (the CLI rewrites it).
- `registryDependencies`: upstream by bare name (`"button"`), ours as
  `"@dataservices/<name>"`. List every npm import in `dependencies`.
- Every item needs a demo: `src/showcase/demos/<name>.tsx`, or
  `src/showcase/frames/<name>.tsx` for full-screen blocks.
- Themes are `registry:theme` items with `cssVars.light`/`dark` only.

## Before committing
`pnpm registry:build && pnpm lint && pnpm build`. Commit `public/r`.
Conventional commits: `type(scope): subject`.

## Gotchas
- `shadcn add` stops at an overwrite prompt when a dependency differs;
  pass `--overwrite` in scripts.
- The CLI adds or drops `"use client"` between runs. Ignore it.
- Don't add a dependency version released in the last ~2 weeks; pin the
  previous line with `~`.
