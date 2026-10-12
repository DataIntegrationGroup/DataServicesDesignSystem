import { useCssVars } from "@/registry/base-nova/hooks/use-css-vars"

// A swatch is a token, plus the -foreground drawn on it when there is one.
type Swatch = { token: string; foreground?: string }

const pair = (token: string): Swatch => ({ token, foreground: `${token}-foreground` })
const solo = (token: string): Swatch => ({ token })

const GROUPS: { title: string; swatches: Swatch[] }[] = [
  {
    title: "Surfaces",
    swatches: [
      { token: "background", foreground: "foreground" },
      pair("card"),
      pair("popover"),
    ],
  },
  {
    title: "Brand",
    swatches: [pair("primary"), pair("secondary"), pair("accent"), pair("muted")],
  },
  {
    title: "Status",
    swatches: [solo("destructive"), pair("success"), pair("warning"), pair("info")],
  },
  { title: "Lines", swatches: [solo("border"), solo("input"), solo("ring")] },
  {
    title: "Charts",
    swatches: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"].map(solo),
  },
  {
    title: "Sidebar",
    swatches: [
      pair("sidebar"),
      pair("sidebar-primary"),
      pair("sidebar-accent"),
      solo("sidebar-border"),
      solo("sidebar-ring"),
    ],
  },
]

const TOKENS = GROUPS.flatMap((group) =>
  group.swatches.flatMap((s) => (s.foreground ? [s.token, s.foreground] : [s.token]))
)

export function ColorsPage() {
  const values = useCssVars(TOKENS)
  return (
    <div className="flex flex-col gap-10">
      {GROUPS.map((group) => (
        <section key={group.title} className="flex flex-col gap-3">
          <h2 className="font-heading text-xl font-semibold">{group.title}</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-4">
            {group.swatches.map(({ token, foreground }) => (
              <div key={token} className="flex flex-col gap-1.5">
                <div
                  className="flex h-16 items-center justify-center rounded-lg border text-lg font-semibold"
                  style={{
                    background: `var(--${token})`,
                    color: foreground ? `var(--${foreground})` : undefined,
                  }}
                >
                  {foreground && "Aa"}
                </div>
                <code className="text-xs">--{token}</code>
                {foreground && (
                  <code className="text-xs text-muted-foreground">--{foreground}</code>
                )}
                <code className="text-xs text-muted-foreground">
                  {values[token]}
                  {foreground && ` / ${values[foreground]}`}
                </code>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
