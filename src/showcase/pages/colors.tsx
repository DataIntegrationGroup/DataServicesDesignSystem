import { useCssVars } from "@/hooks/use-css-vars"
import { PageContent } from "@/showcase/page-header"
import { SWATCH_TOKENS, TOKEN_GROUPS } from "@/showcase/tokens"

const FOREGROUND_PAIRS = new Set<string>([
  "background",
  "card",
  "popover",
  "primary",
  "secondary",
  "muted",
  "accent",
  "sidebar",
  "sidebar-primary",
  "sidebar-accent",
  "destructive",
  "success",
  "warning",
  "info",
  ...[1, 2, 3, 4, 5, 6].map((n) => `tone-${n}`),
])

/** The text color a swatch previews, if any. */
function swatchText(token: string) {
  if (token.endsWith("-soft")) return `var(--${token.slice(0, -5)}-strong)`
  if (FOREGROUND_PAIRS.has(token)) return `var(--${token}-foreground)`
  return undefined
}

function TokenSwatches() {
  const values = useCssVars(SWATCH_TOKENS)
  return (
    <div className="space-y-6">
      {TOKEN_GROUPS.map((group) => (
        <div key={group.group} className="space-y-2">
          <h4 className="!text-base !font-semibold text-muted-foreground uppercase tracking-wide">
            {group.group}
          </h4>
          {group.rows.map((row) => (
            <div
              key={row[0]}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
            >
              {row.map((token) => (
                <div key={token} className="space-y-1.5">
                  <div
                    className="flex h-14 items-center justify-center rounded-lg border text-lg font-semibold"
                    style={{
                      background: `var(--${token})`,
                      color: swatchText(token),
                    }}
                  >
                    {swatchText(token) ? "Aa" : null}
                  </div>
                  <div className="text-sm font-medium">{token}</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {values[token]}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <div className="space-y-2">
        <h4 className="!text-base !font-semibold text-muted-foreground uppercase tracking-wide">
          On image
        </h4>
        <div className="rounded-lg bg-primary-dark p-6 space-y-3">
          <div className="font-heading text-2xl font-semibold text-accent-on-dark">
            accent-on-dark heading
          </div>
          <p className="text-on-image">on-image text on a dark brand band</p>
          <p className="text-on-image-muted">on-image-muted secondary text</p>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-full border border-on-image-border bg-on-image-surface px-3 py-1 text-sm text-on-image outline-none focus-visible:ring-2 focus-visible:ring-on-image-ring"
            >
              on-image-surface chip
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ColorsPage() {
  return (
    <PageContent>
      <TokenSwatches />
    </PageContent>
  )
}
