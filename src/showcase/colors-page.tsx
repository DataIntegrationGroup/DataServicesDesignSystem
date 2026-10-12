import { THEMES } from "./theme-items"

// Every color token the themes define, in the order of theme-ocotillo.
const TOKENS = Object.keys(THEMES[0].cssVars.light).filter(
  (token) => token !== "radius"
)

export function ColorsPage() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-4">
      {TOKENS.map((token) => (
        <div key={token} className="flex flex-col gap-1.5">
          <div
            className="h-14 rounded-md border"
            style={{ background: `var(--${token})` }}
          />
          <code className="text-xs">--{token}</code>
        </div>
      ))}
    </div>
  )
}
