import { useState } from "react"
import { toast } from "sonner"
import {
  Bell,
  Check,
  ChevronRight,
  Database,
  Info,
  MoreHorizontal,
  TriangleAlert,
} from "lucide-react"

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
import { ModeToggle } from "@/components/mode-toggle"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

const sources = [
  { name: "warehouse-prod", host: "db.internal:5432", status: "online" },
  { name: "lakehouse-stg", host: "lake.internal:443", status: "online" },
  { name: "legacy-ora", host: "ora.internal:1521", status: "degraded" },
  { name: "events-kafka", host: "kafka.internal:9092", status: "offline" },
]

function App() {
  const [progress, setProgress] = useState(62)
  const [volume, setVolume] = useState([40])

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-6 py-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="!text-4xl !leading-tight">
              DataServices Design System
            </h1>
            <p className="text-muted-foreground mt-2">
              Ocotillo / NM_WDI palette · Roboto Condensed + Open Sans
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary">v0.1.0</Badge>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Tabs defaultValue="foundations">
          <TabsList className="mb-6">
            <TabsTrigger value="foundations">Foundations</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="overlays">Overlays</TabsTrigger>
          </TabsList>

          <TabsContent value="foundations" className="space-y-10">
            <section className="space-y-4">
              <h2>Typography</h2>
              <Card>
                <CardContent className="space-y-3 pt-6">
                  <h1>Heading 1 — Roboto Condensed 700</h1>
                  <h2>Heading 2 — Roboto Condensed 600</h2>
                  <h3>Heading 3 — Roboto Condensed 500</h3>
                  <h4>Heading 4 — Roboto Condensed 500</h4>
                  <p>
                    Body — Open Sans 400. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit.
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
          </TabsContent>

          <TabsContent value="actions" className="space-y-10">
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
              <div className="flex flex-wrap gap-3">
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon" aria-label="more">
                  <MoreHorizontal />
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button disabled>Disabled</Button>
                <Button>
                  <Database /> With icon
                </Button>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2>Badges</h2>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2>Dropdown menu</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Open menu <ChevronRight />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem>Archive</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </section>
          </TabsContent>

          <TabsContent value="forms" className="space-y-10">
            <section className="grid gap-6 md:grid-cols-2">
              <Card>
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
                  <div className="space-y-2">
                    <Label htmlFor="kind">Kind</Label>
                    <Select>
                      <SelectTrigger id="kind">
                        <SelectValue placeholder="Select source type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="postgres">PostgreSQL</SelectItem>
                        <SelectItem value="oracle">Oracle</SelectItem>
                        <SelectItem value="kafka">Kafka</SelectItem>
                        <SelectItem value="s3">S3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" placeholder="Operational notes…" />
                  </div>
                </CardContent>
                <CardFooter className="justify-end gap-2">
                  <Button variant="ghost">Cancel</Button>
                  <Button>Connect</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Toggles & switches.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify">Email notifications</Label>
                    <Switch id="notify" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="beta">Beta features</Label>
                    <Switch id="beta" />
                  </div>
                  <Separator />
                  <div className="flex items-center gap-2">
                    <Checkbox id="tos" />
                    <Label htmlFor="tos">I accept the terms</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="newsletter" defaultChecked />
                    <Label htmlFor="newsletter">Subscribe to digest</Label>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Throughput limit: {volume[0]}%</Label>
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                    />
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-10">
            <section className="space-y-4">
              <h2>Alerts</h2>
              <Alert>
                <Info />
                <AlertTitle>Heads up</AlertTitle>
                <AlertDescription>
                  Scheduled maintenance window starts in 30 minutes.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <TriangleAlert />
                <AlertTitle>Connection failed</AlertTitle>
                <AlertDescription>
                  Could not reach <code>db.internal:5432</code>. Check
                  credentials and network policy.
                </AlertDescription>
              </Alert>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2>Toasts</h2>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={() =>
                    toast.success("Source connected", {
                      description: "warehouse-prod is online.",
                    })
                  }
                >
                  Success
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    toast.error("Sync failed", {
                      description: "Retrying in 30s.",
                    })
                  }
                >
                  Error
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast.info("New release available")}
                >
                  Info
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast.warning("API rate limit at 80%")}
                >
                  Warning
                </Button>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2>Progress</h2>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Indexing warehouse-prod</span>
                      <span className="text-muted-foreground">{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setProgress(Math.max(0, progress - 10))}
                    >
                      -10
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setProgress(Math.min(100, progress + 10))}
                    >
                      +10
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2>Skeleton</h2>
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="data" className="space-y-10">
            <section className="space-y-4">
              <h2>Table</h2>
              <Card>
                <Table>
                  <TableCaption>Connected data sources.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Host</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sources.map((s) => (
                      <TableRow key={s.name}>
                        <TableCell className="font-medium">{s.name}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {s.host}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              s.status === "online"
                                ? "default"
                                : s.status === "degraded"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {s.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2>Avatars</h2>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>JR</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    DS
                  </AvatarFallback>
                </Avatar>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2>Accordion</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="a">
                  <AccordionTrigger>
                    What is the DataServices Design System?
                  </AccordionTrigger>
                  <AccordionContent>
                    Shared UI primitives for all DataServices projects, derived
                    from the OcotilloUI NM_WDI theme.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="b">
                  <AccordionTrigger>
                    Which framework does it use?
                  </AccordionTrigger>
                  <AccordionContent>
                    Vite + React + TypeScript + Tailwind v4 + shadcn/ui.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="c">
                  <AccordionTrigger>How do I add components?</AccordionTrigger>
                  <AccordionContent>
                    Run <code>npx shadcn@latest add &lt;name&gt;</code>.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </TabsContent>

          <TabsContent value="overlays" className="space-y-10">
            <section className="space-y-4">
              <h2>Dialog</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete data source?</DialogTitle>
                    <DialogDescription>
                      This will disconnect <b>warehouse-prod</b> and remove
                      cached metadata. Cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="ghost">Cancel</Button>
                    <Button variant="destructive">Delete</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2>Popover</h2>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Bell /> Notifications
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="space-y-2">
                    <div className="font-semibold">3 unread</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>warehouse-prod resync complete</li>
                      <li>API key rotates in 7 days</li>
                      <li>New beta feature: lineage graph</li>
                    </ul>
                  </div>
                </PopoverContent>
              </Popover>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2>Tooltip</h2>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    <Check /> Hover me
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Connection healthy</TooltipContent>
              </Tooltip>
            </section>
          </TabsContent>
        </Tabs>
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
