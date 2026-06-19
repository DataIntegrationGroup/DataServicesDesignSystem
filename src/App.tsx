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
import { Map, Marker } from "@/components/ui/map"
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { DataGrid, type DataGridColumn } from "@/components/ui/data-grid"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Bold, Italic, Underline } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Combobox } from "@/components/ui/combobox"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import { StatusIndicator } from "@/components/ui/status-indicator"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { DatePicker, DateRangePicker } from "@/components/ui/date-picker"
import { Database as DatabaseIcon, Map as MapIcon, Settings, Activity } from "lucide-react"
import type { DateRange } from "react-day-picker"

type Swatch = { name: string; hex: string; fg?: string }

// OcotilloUI (NMBGMRDataManager) production palette — tailwind color scales.
const palette: { group: string; swatches: Swatch[] }[] = [
  {
    group: "Primary — Blue",
    swatches: [
      { name: "blue-300", hex: "#93c5fd", fg: "#1e3a8a" },
      { name: "blue-700", hex: "#1d4ed8", fg: "#ffffff" },
      { name: "blue-900", hex: "#1e3a8a", fg: "#ffffff" },
    ],
  },
  {
    group: "Secondary — Amber",
    swatches: [
      { name: "amber-300", hex: "#fcd34d", fg: "#78350f" },
      { name: "amber-600", hex: "#d97706", fg: "#ffffff" },
      { name: "amber-800", hex: "#92400e", fg: "#fcd34d" },
    ],
  },
  {
    group: "Error — Red",
    swatches: [
      { name: "red-300", hex: "#fca5a5", fg: "#7f1d1d" },
      { name: "red-600", hex: "#dc2626", fg: "#ffffff" },
      { name: "red-800", hex: "#991b1b", fg: "#fca5a5" },
    ],
  },
  {
    group: "Status",
    swatches: [
      { name: "warning · orange-500", hex: "#f97316", fg: "#ffffff" },
      { name: "success · emerald-700", hex: "#047857", fg: "#ffffff" },
      { name: "info · cyan-600", hex: "#0891b2", fg: "#ffffff" },
    ],
  },
]

const sources = [
  { name: "warehouse-prod", host: "db.internal:5432", status: "online" },
  { name: "lakehouse-stg", host: "lake.internal:443", status: "online" },
  { name: "legacy-ora", host: "ora.internal:1521", status: "degraded" },
  { name: "events-kafka", host: "kafka.internal:9092", status: "offline" },
]

type Source = (typeof sources)[number]

const sourceColumns: ColumnDef<Source>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "host",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Host" />,
    cell: ({ row }) => (
      <span className="font-mono text-sm">{row.getValue("host")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue<string>("status")
      return (
        <Badge
          variant={
            status === "online"
              ? "default"
              : status === "degraded"
              ? "secondary"
              : "destructive"
          }
        >
          {status}
        </Badge>
      )
    },
  },
]

const gridColumns: DataGridColumn<Source>[] = [
  { id: "name", title: "Name", width: 200 },
  { id: "host", title: "Host", width: 240 },
  { id: "status", title: "Status", width: 140 },
]

const sourceKinds = [
  { value: "postgres", label: "PostgreSQL" },
  { value: "oracle", label: "Oracle" },
  { value: "kafka", label: "Kafka" },
  { value: "s3", label: "Amazon S3" },
  { value: "snowflake", label: "Snowflake" },
  { value: "bigquery", label: "BigQuery" },
]

const sourceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  host: z.string().min(1, "Host is required."),
  kind: z.string().min(1, "Pick a source type."),
})

function SourceForm() {
  const form = useForm<z.infer<typeof sourceSchema>>({
    resolver: zodResolver(sourceSchema),
    defaultValues: { name: "", host: "", kind: "" },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          toast.success("Source validated", {
            description: `${values.name} · ${values.kind}`,
          })
        )}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="warehouse-prod" {...field} />
              </FormControl>
              <FormDescription>Unique identifier for the source.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="host"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Host</FormLabel>
              <FormControl>
                <Input placeholder="db.internal:5432" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kind"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kind</FormLabel>
              <FormControl>
                <Combobox
                  options={sourceKinds}
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Select source type"
                  searchPlaceholder="Search types…"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Validate &amp; connect</Button>
      </form>
    </Form>
  )
}

function App() {
  const [progress, setProgress] = useState(62)
  const [volume, setVolume] = useState([40])
  const [gridRows, setGridRows] = useState<Source[]>(sources)
  const [date, setDate] = useState<Date | undefined>()
  const [range, setRange] = useState<DateRange | undefined>()

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-6 py-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="!text-4xl !leading-tight">
              DataServices Design System
            </h1>
            <p className="text-muted-foreground mt-2">
              OcotilloUI production palette · Outfit + Public Sans
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
            <TabsTrigger value="map">Map</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>

          <TabsContent value="foundations" className="space-y-10">
            <section className="space-y-4">
              <h2>Typography</h2>
              <Card>
                <CardContent className="space-y-3 pt-6">
                  <h1>Heading 1 — Outfit 700</h1>
                  <h2>Heading 2 — Outfit 600</h2>
                  <h3>Heading 3 — Outfit 500</h3>
                  <h4>Heading 4 — Outfit 500</h4>
                  <p>
                    Body — Public Sans 400. Lorem ipsum dolor sit amet,
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

            <Separator />

            <section className="space-y-6">
              <h2>Toggles &amp; selection</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Switches</CardTitle>
                    <CardDescription>Sizes & state.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Default</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Small</Label>
                      <Switch size="sm" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-muted-foreground">Disabled</Label>
                      <Switch disabled />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <Label>Square</Label>
                      <Switch shape="square" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Square · small</Label>
                      <Switch shape="square" size="sm" defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Toggles</CardTitle>
                    <CardDescription>
                      Single toggle + segmented group.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Toggle aria-label="Bold">
                        <Bold />
                      </Toggle>
                      <Toggle variant="outline" aria-label="Italic">
                        <Italic />
                      </Toggle>
                      <Toggle defaultPressed aria-label="Underline">
                        <Underline /> Pressed
                      </Toggle>
                    </div>
                    <div className="space-y-2">
                      <Label>Text style</Label>
                      <ToggleGroup
                        type="multiple"
                        variant="outline"
                        defaultValue={["bold"]}
                      >
                        <ToggleGroupItem value="bold" aria-label="Bold">
                          <Bold />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="italic" aria-label="Italic">
                          <Italic />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="underline" aria-label="Underline">
                          <Underline />
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Radio group</CardTitle>
                    <CardDescription>Pick one sync mode.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup defaultValue="incremental">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="full" id="r-full" />
                        <Label htmlFor="r-full">Full resync</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="incremental" id="r-inc" />
                        <Label htmlFor="r-inc">Incremental</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="manual" id="r-man" />
                        <Label htmlFor="r-man">Manual only</Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2>Validated form &amp; combobox</h2>
              <p className="text-muted-foreground">
                react-hook-form + zod with accessible error messages, and a
                searchable <code>Combobox</code> for the source type.
              </p>
              <Card className="max-w-md">
                <CardHeader>
                  <CardTitle>Connect a data source</CardTitle>
                  <CardDescription>
                    Submit empty to see validation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SourceForm />
                </CardContent>
              </Card>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2>Date picker</h2>
              <p className="text-muted-foreground">
                Single date and start/end range, built on Popover + Calendar.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="space-y-2">
                  <Label>Snapshot date</Label>
                  <DatePicker value={date} onValueChange={setDate} />
                </div>
                <div className="space-y-2">
                  <Label>Reporting period</Label>
                  <DateRangePicker value={range} onValueChange={setRange} />
                </div>
              </div>
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
              <h2>Data table</h2>
              <p className="text-muted-foreground">
                TanStack-powered <code>DataTable</code> — sortable headers,
                column filter, column visibility, and pagination.
              </p>
              <Card className="p-4">
                <DataTable
                  columns={sourceColumns}
                  data={sources}
                  filterColumn="name"
                  filterPlaceholder="Filter by name…"
                  pageSize={5}
                />
              </Card>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2>Data grid (editable)</h2>
              <p className="text-muted-foreground">
                Glide Data Grid — canvas-rendered, editable spreadsheet for
                large datasets. Double-click a cell to edit; themed to
                OcotilloUI.
              </p>
              <DataGrid
                columns={gridColumns}
                rows={gridRows}
                onRowsChange={setGridRows}
                height={240}
              />
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
                    Shared UI primitives for all DataServices projects, themed
                    to match the OcotilloUI (NMBGMRDataManager) production theme.
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

            <Separator />

            <section className="space-y-4">
              <h2>Sheet</h2>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open filters</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter sources</SheetTitle>
                    <SheetDescription>
                      Narrow the source list. Changes apply on close.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 p-4">
                    <div className="space-y-2">
                      <Label htmlFor="f-name">Name contains</Label>
                      <Input id="f-name" placeholder="prod" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="f-online" defaultChecked />
                      <Label htmlFor="f-online">Online only</Label>
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button>Apply</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2>Alert dialog</h2>
              <p className="text-muted-foreground">
                Accessible confirm for destructive actions.
              </p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete source</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete data source?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This disconnects <b>warehouse-prod</b> and removes cached
                      metadata. This cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => toast.error("Source deleted")}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </section>
          </TabsContent>

          <TabsContent value="map" className="space-y-10">
            <section className="space-y-4">
              <h2>Map</h2>
              <p className="text-muted-foreground">
                MapLibre primitive with a token-free CARTO basemap, New Mexico
                default extent, and nav/scale controls.
              </p>
              <Card className="overflow-hidden p-0">
                <div className="h-[480px]">
                  <Map>
                    <Marker longitude={-106.65} latitude={35.08} />
                  </Map>
                </div>
              </Card>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2>Resizable split &amp; status</h2>
              <p className="text-muted-foreground">
                Drag the divider to resize the map against a source panel.
                Health uses <code>StatusIndicator</code>.
              </p>
              <Card className="overflow-hidden p-0">
                <ResizablePanelGroup
                  orientation="horizontal"
                  className="h-[360px]"
                >
                  <ResizablePanel defaultSize={65} minSize={30}>
                    <Map>
                      <Marker longitude={-106.65} latitude={35.08} />
                    </Map>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={35} minSize={20}>
                    <div className="flex h-full flex-col gap-3 overflow-y-auto bg-card p-4">
                      <h4 className="!text-sm !font-semibold text-muted-foreground uppercase tracking-wide">
                        Sources
                      </h4>
                      {sources.map((s) => (
                        <div
                          key={s.name}
                          className="flex items-center justify-between gap-2 text-sm"
                        >
                          <span className="font-medium">{s.name}</span>
                          <StatusIndicator
                            status={
                              s.status === "online"
                                ? "online"
                                : s.status === "degraded"
                                ? "degraded"
                                : "offline"
                            }
                            pulse={s.status === "degraded"}
                          >
                            {s.status}
                          </StatusIndicator>
                        </div>
                      ))}
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="layout" className="space-y-10">
            <section className="space-y-4">
              <h2>Breadcrumb</h2>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbEllipsis />
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Sources</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>warehouse-prod</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2>Sidebar</h2>
              <p className="text-muted-foreground">
                App sidebar with grouped menu, active state, and badges. Full
                component is collapsible with a Cmd/Ctrl+B shortcut in a real
                app shell.
              </p>
              <Card className="h-[360px] overflow-hidden p-0">
                <SidebarProvider className="min-h-0! h-full">
                  <Sidebar collapsible="none" className="border-r">
                    <SidebarHeader>
                      <div className="flex items-center gap-2 px-2 py-1 font-heading text-lg font-bold text-sidebar-primary">
                        <DatabaseIcon className="size-5" /> DataServices
                      </div>
                    </SidebarHeader>
                    <SidebarContent>
                      <SidebarGroup>
                        <SidebarGroupLabel>Platform</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <SidebarMenu>
                            <SidebarMenuItem>
                              <SidebarMenuButton isActive>
                                <DatabaseIcon /> Sources
                              </SidebarMenuButton>
                              <SidebarMenuBadge>4</SidebarMenuBadge>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton>
                                <MapIcon /> Map
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton>
                                <Activity /> Monitoring
                              </SidebarMenuButton>
                              <SidebarMenuBadge>2</SidebarMenuBadge>
                            </SidebarMenuItem>
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </SidebarGroup>
                      <SidebarGroup>
                        <SidebarGroupLabel>System</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <SidebarMenu>
                            <SidebarMenuItem>
                              <SidebarMenuButton>
                                <Settings /> Settings
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </SidebarGroup>
                    </SidebarContent>
                  </Sidebar>
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <h3 className="!text-xl">Sources</h3>
                    <p className="text-muted-foreground">
                      Main content area beside the sidebar.
                    </p>
                  </div>
                </SidebarProvider>
              </Card>
            </section>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t mt-12">
        <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-muted-foreground">
          DataServices · themed to match OcotilloUI:production (NMBGMRDataManager)
        </div>
      </footer>
    </div>
  )
}

export default App
