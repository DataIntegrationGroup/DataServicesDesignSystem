import type { ReactNode } from "react"

// Class recipes from shadcn's Typography docs, with font-heading added to
// the headings so they use the theme's heading font.
const STYLES: { name: string; className: string; sample: ReactNode }[] = [
  {
    name: "h1",
    className: "scroll-m-20 font-heading text-4xl font-extrabold tracking-tight text-balance",
    sample: "Groundwater levels",
  },
  {
    name: "h2",
    className: "scroll-m-20 border-b pb-2 font-heading text-3xl font-semibold tracking-tight",
    sample: "Monitoring wells",
  },
  {
    name: "h3",
    className: "scroll-m-20 font-heading text-2xl font-semibold tracking-tight",
    sample: "Socorro County",
  },
  {
    name: "h4",
    className: "scroll-m-20 font-heading text-xl font-semibold tracking-tight",
    sample: "Last sampled",
  },
  {
    name: "p",
    className: "leading-7",
    sample:
      "Water levels are measured monthly at each well and published once a hydrologist approves them.",
  },
  {
    name: "Lead",
    className: "text-xl text-muted-foreground",
    sample: "A summary of every well sampled this year.",
  },
  { name: "Large", className: "text-lg font-semibold", sample: "Are you absolutely sure?" },
  { name: "Small", className: "text-sm leading-none font-medium", sample: "Well depth" },
  { name: "Muted", className: "text-sm text-muted-foreground", sample: "Updated 2 hours ago." },
  {
    name: "Blockquote",
    className: "border-l-2 pl-6 italic",
    sample: "Approved readings are final; provisional ones may change.",
  },
  {
    name: "Inline code",
    className:
      "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
    sample: "NM-0042",
  },
]

const FONTS = [
  {
    family: "Outfit",
    role: "Headings, plus the titles in upstream card, dialog, alert-dialog, sheet, drawer and empty, and the brand in app-shell and top-nav.",
    className: "font-heading",
    variable: "--font-heading",
    item: "font-heading-outfit",
    pkg: "@fontsource-variable/outfit",
    note: "Upright only.",
  },
  {
    family: "Public Sans",
    role: "Everything else. The theme sets it on <html>, so text uses it by default.",
    className: "font-sans",
    variable: "--font-sans",
    item: "font-public-sans",
    pkg: "@fontsource-variable/public-sans",
    note: "The package has an italic, but the theme loads only the upright file, so the browser slants italic text.",
  },
]

const WEIGHTS = [300, 400, 500, 600, 700, 800]

export function TypographyPage() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl font-semibold">Fonts</h2>
        <p className="max-w-prose text-sm text-muted-foreground">
          Both are variable fonts (weights 100 to 900), self-hosted from npm, so
          apps make no requests to Google. Each theme installs them through
          upstream's registry:font items, which add the package, its CSS
          import, and the font variable.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {FONTS.map((font) => (
            <div key={font.family} className="flex flex-col gap-4 rounded-lg border bg-card p-6">
              <div className="flex flex-col gap-1">
                <span className={`${font.className} text-4xl`}>{font.family}</span>
                <span className="text-sm">{font.role}</span>
              </div>
              <div className={`${font.className} flex flex-col gap-1 text-xl`}>
                {WEIGHTS.map((weight) => (
                  <span key={weight} style={{ fontWeight: weight }}>
                    {weight} Water levels, 1,234.5 ft
                  </span>
                ))}
              </div>
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs">
                <dt className="text-muted-foreground">Class</dt>
                <dd><code>{font.className}</code></dd>
                <dt className="text-muted-foreground">Variable</dt>
                <dd><code>{font.variable}</code></dd>
                <dt className="text-muted-foreground">Registry item</dt>
                <dd><code>{font.item}</code></dd>
                <dt className="text-muted-foreground">Package</dt>
                <dd><code>{font.pkg}</code></dd>
              </dl>
              <p className="text-xs text-muted-foreground">{font.note}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl font-semibold">Styles</h2>
        <div className="divide-y rounded-lg border bg-card">
          {STYLES.map((style) => (
            <div
              key={style.name}
              className="grid gap-2 p-6 md:grid-cols-[8rem_1fr] md:items-baseline"
            >
              <span className="text-sm text-muted-foreground">{style.name}</span>
              <div className="flex min-w-0 flex-col gap-2">
                <div>
                  {style.name === "Inline code" ? (
                    <code className={style.className}>{style.sample}</code>
                  ) : (
                    <div className={style.className}>{style.sample}</div>
                  )}
                </div>
                <code className="text-xs break-words text-muted-foreground">
                  {style.className}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
