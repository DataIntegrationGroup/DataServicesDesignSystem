import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

type Swatch = { name: string; hex: string; fg?: string }

const palette: { group: string; swatches: Swatch[] }[] = [
  {
    group: "Primary",
    swatches: [
      { name: "Soft Aqua", hex: "#A6CCD6", fg: "#004153" },
      { name: "Deep Cyan", hex: "#006E7B", fg: "#ffffff" },
      { name: "Deep Teal", hex: "#004153", fg: "#ffffff" },
    ],
  },
  {
    group: "Secondary",
    swatches: [
      { name: "Beige Sand", hex: "#E1E4C6", fg: "#3C410C" },
      { name: "Citron Green", hex: "#86911A", fg: "#ffffff" },
      { name: "Olive Green", hex: "#3C410C", fg: "#E1E4C6" },
    ],
  },
  {
    group: "Warning",
    swatches: [
      { name: "Muted Rose", hex: "#F5B9B4", fg: "#5B1610" },
      { name: "Burnt Sienna", hex: "#C04034", fg: "#ffffff" },
      { name: "Crimson Red", hex: "#5B1610", fg: "#F5B9B4" },
    ],
  },
]

function App() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-6 py-8 flex items-center justify-between">
          <div>
            <h1 className="!text-4xl !leading-tight">
              DataServices Design System
            </h1>
            <p className="text-muted-foreground mt-2">
              Ocotillo / NM_WDI palette · Roboto Condensed + Open Sans
            </p>
          </div>
          <Badge variant="secondary">v0.1.0</Badge>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 space-y-12">
        <section className="space-y-4">
          <h2>Typography</h2>
          <Card>
            <CardContent className="space-y-3 pt-6">
              <h1>Heading 1 — Roboto Condensed 700</h1>
              <h2>Heading 2 — Roboto Condensed 600</h2>
              <h3>Heading 3 — Roboto Condensed 500</h3>
              <h4>Heading 4 — Roboto Condensed 500</h4>
              <p>
                Body — Open Sans 400. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2>Palette</h2>
          <div className="space-y-6">
            {palette.map((group) => (
              <div key={group.group} className="space-y-2">
                <h4 className="!text-base !font-semibold text-muted-foreground uppercase tracking-wide">
                  {group.group}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {group.swatches.map((s) => (
                    <div
                      key={s.hex}
                      className="rounded-lg p-4 border shadow-sm"
                      style={{ background: s.hex, color: s.fg }}
                    >
                      <div className="font-semibold">{s.name}</div>
                      <div className="text-sm opacity-80 font-mono">
                        {s.hex}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2>Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2>Form</h2>
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Connect a data source</CardTitle>
              <CardDescription>
                Provide credentials to register a new source.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="warehouse-prod" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="host">Host</Label>
                <Input id="host" placeholder="db.internal:5432" />
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="ghost">Cancel</Button>
              <Button>Connect</Button>
            </CardFooter>
          </Card>
        </section>
      </main>

      <footer className="border-t mt-12">
        <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-muted-foreground">
          DataServices · derived from OcotilloUI:production NM_WDI theme
        </div>
      </footer>
    </div>
  )
}

export default App
