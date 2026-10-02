import { useMemo, useState } from "react"
import { toast } from "sonner"
import {
  Bell,
  Check,
  ChevronRight,
  Database,
  Info,
  MoreHorizontal,
  Search,
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
import { useTheme } from "@/components/theme-provider"
import { useCssVars } from "@/hooks/use-css-vars"
import { Example, ExampleGroup } from "@/showcase/example"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
import { Map, Marker, DEFAULT_MAP_STYLE } from "@/components/ui/map"
import { BasemapSelector, type BasemapOption } from "@/components/ui/basemap-selector"
import { LayerSelector, type LayerOption } from "@/components/ui/layer-selector"
import { FilterControls } from "@/components/ui/filter-controls"
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
import { FieldValue } from "@/components/ui/field-value"
import { TopLoadingBar } from "@/components/top-loading-bar"
import { OnboardingTour, type TourStep } from "@/components/onboarding-tour"
import {
  NavBar,
  NavBarActions,
  NavBarBrand,
  NavBarLink,
  NavBarNav,
} from "@/components/ui/navbar"
import { PageBody, PageShell } from "@/components/ui/page"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
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
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts"
import { EChart } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

/** The color tokens in the theme contract (THEMING.md), by group and row;
 *  a `-soft` row sits under its solid colors. A swatch
 *  previews its text color: `-foreground` on a fill, `-strong` on a `-soft`
 *  tint. */
const TOKEN_GROUPS = [
  { group: "Surfaces", rows: [["background", "card", "popover"]] },
  {
    group: "Brand",
    rows: [
      [
        "primary",
        "primary-light",
        "primary-dark",
        "secondary",
        "secondary-strong",
        "secondary-dark",
      ],
    ],
  },
  { group: "Neutral", rows: [["muted", "accent", "border", "input", "ring"]] },
  {
    group: "Status",
    rows: [
      ["destructive", "success", "warning", "info"],
      ["destructive-soft", "success-soft", "warning-soft", "info-soft"],
    ],
  },
  {
    group: "Category tones",
    rows: [
      ["tone-1", "tone-2", "tone-3", "tone-4", "tone-5", "tone-6"],
      [
        "tone-1-soft",
        "tone-2-soft",
        "tone-3-soft",
        "tone-4-soft",
        "tone-5-soft",
        "tone-6-soft",
      ],
    ],
  },
  {
    group: "Data",
    rows: [["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]],
  },
  {
    group: "Sidebar",
    rows: [["sidebar", "sidebar-primary", "sidebar-accent", "sidebar-border"]],
  },
] as const

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

const SWATCH_TOKENS = TOKEN_GROUPS.flatMap((g) => g.rows.flat())

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

const BASEMAPS: BasemapOption[] = [
  { id: DEFAULT_MAP_STYLE, title: "Positron" },
  {
    id: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
    title: "Voyager",
  },
  {
    id: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
    title: "Dark Matter",
  },
]

const LAYERS: LayerOption[] = [
  {
    id: "wells",
    title: "Groundwater wells",
    description: "Monitoring wells with water-level records",
    style: { color: "#0e7490" },
  },
  {
    id: "springs",
    title: "Springs",
    style: { color: "#047857", shape: "square" },
  },
  {
    id: "streams",
    title: "Stream gauges",
    style: { color: "#1d4ed8", shape: "line" },
  },
]

const TOUR_STORAGE_KEY = "dsds-showcase-tour"

const TOUR_STEPS: TourStep[] = [
  {
    title: "Pick a theme",
    body: "Every component follows the theme set on <html>. Switch it here.",
    target: "[data-tour=theme]",
    place: "bottom",
  },
  {
    title: "Light or dark",
    body: "Each theme defines both modes. Toggle them here.",
    target: "[data-tour=mode]",
    place: "left",
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

const throughput = [
  { day: "Mon", ingested: 1820, failed: 80 },
  { day: "Tue", ingested: 2150, failed: 40 },
  { day: "Wed", ingested: 1990, failed: 120 },
  { day: "Thu", ingested: 2480, failed: 60 },
  { day: "Fri", ingested: 2710, failed: 30 },
  { day: "Sat", ingested: 1240, failed: 20 },
  { day: "Sun", ingested: 980, failed: 10 },
]

const chartConfig = {
  ingested: { label: "Ingested", color: "var(--chart-1)" },
  failed: { label: "Failed", color: "var(--chart-5)" },
} satisfies ChartConfig

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

/** Themes in src/themes, for the showcase switcher. */
const PALETTES = [
  { value: "ocotillo", label: "Ocotillo" },
  { value: "nmwdi", label: "NMWDI" },
] as const

export const PALETTE_STORAGE_KEY = "dsds-palette"

function App() {
  const [progress, setProgress] = useState(62)
  const [loading, setLoading] = useState(false)
  const [basemap, setBasemap] = useState(DEFAULT_MAP_STYLE)
  const [visibleLayers, setVisibleLayers] = useState(["wells"])
  const [filterBbox, setFilterBbox] = useState(false)
  const [filterQuery, setFilterQuery] = useState("")
  const [tourRun, setTourRun] = useState(0)
  const [volume, setVolume] = useState([40])
  const [gridRows, setGridRows] = useState<Source[]>(sources)
  const [date, setDate] = useState<Date | undefined>()
  const [range, setRange] = useState<DateRange | undefined>()

  const echartOption = useMemo<EChartsOption>(() => {
    const days = Array.from({ length: 30 }, (_, i) => `D${i + 1}`)
    const ingested = days.map((_, i) =>
      Math.round(1800 + Math.sin(i / 3) * 600 + i * 25)
    )
    const failed = days.map((_, i) => Math.round(60 + Math.cos(i / 2) * 40 + 30))
    return {
      tooltip: { trigger: "axis" },
      legend: { data: ["Ingested", "Failed"], top: 0 },
      grid: { left: 48, right: 16, top: 36, bottom: 56 },
      xAxis: { type: "category", boundaryGap: false, data: days },
      yAxis: { type: "value" },
      dataZoom: [
        { type: "inside", start: 40, end: 100 },
        { type: "slider", start: 40, end: 100, height: 18, bottom: 12 },
      ],
      series: [
        {
          name: "Ingested",
          type: "line",
          smooth: true,
          showSymbol: false,
          areaStyle: { opacity: 0.15 },
          data: ingested,
        },
        { name: "Failed", type: "bar", data: failed },
      ],
    }
  }, [])

  const { palette: themePalette, setPalette } = useTheme()
  const activePalette =
    PALETTES.find((p) => p.value === themePalette) ?? PALETTES[0]

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-6 py-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="!text-4xl !leading-tight">
              DataServices Design System
            </h1>
            <p className="text-muted-foreground mt-2">
              {activePalette.label} theme · Outfit + Public Sans
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary">v0.1.0</Badge>
            <Select
              value={activePalette.value}
              onValueChange={(value) => {
                localStorage.setItem(PALETTE_STORAGE_KEY, value)
                setPalette(value)
              }}
            >
              <SelectTrigger aria-label="Theme" className="w-36" data-tour="theme">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PALETTES.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span data-tour="mode">
              <ModeToggle />
            </span>
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
              <h2>Tokens</h2>
              <TokenSwatches />
            </section>
          </TabsContent>

          <TabsContent value="actions" className="space-y-10">
            <section className="space-y-6">
              <h2>Buttons</h2>
              <ExampleGroup title="Variants">
                {(
                  [
                    "default",
                    "secondary",
                    "outline",
                    "ghost",
                    "destructive",
                    "link",
                  ] as const
                ).map((variant) => (
                  <Example key={variant} label={`variant="${variant}"`}>
                    <Button variant={variant}>Button</Button>
                  </Example>
                ))}
              </ExampleGroup>
              <ExampleGroup title="Sizes">
                {(["xs", "sm", "default", "lg"] as const).map((size) => (
                  <Example key={size} label={`size="${size}"`}>
                    <Button size={size}>Button</Button>
                  </Example>
                ))}
              </ExampleGroup>
              <ExampleGroup title="Icon sizes">
                {(["icon-xs", "icon-sm", "icon", "icon-lg"] as const).map(
                  (size) => (
                    <Example key={size} label={`size="${size}"`}>
                      <Button size={size} variant="outline" aria-label="More">
                        <MoreHorizontal />
                      </Button>
                    </Example>
                  )
                )}
              </ExampleGroup>
              <ExampleGroup title="Content and state">
                <Example label="icon start">
                  <Button>
                    <Database /> Connect
                  </Button>
                </Example>
                <Example label="icon end">
                  <Button variant="outline">
                    Next <ChevronRight />
                  </Button>
                </Example>
                <Example label="disabled">
                  <Button disabled>Button</Button>
                </Example>
                <Example label='variant="outline" disabled'>
                  <Button variant="outline" disabled>
                    Button
                  </Button>
                </Example>
                <Example label="asChild (link)">
                  <Button asChild variant="secondary">
                    <a href="#buttons">Anchor</a>
                  </Button>
                </Example>
              </ExampleGroup>
            </section>

            <Separator />

            <section className="space-y-6">
              <h2>Badges</h2>
              <ExampleGroup title="Variants">
                {(
                  [
                    "default",
                    "secondary",
                    "destructive",
                    "outline",
                    "ghost",
                    "link",
                  ] as const
                ).map((variant) => (
                  <Example key={variant} label={`variant="${variant}"`}>
                    <Badge variant={variant}>Badge</Badge>
                  </Example>
                ))}
              </ExampleGroup>
              <ExampleGroup title="Content">
                <Example label="icon start">
                  <Badge variant="secondary">
                    <Check data-icon="inline-start" /> Verified
                  </Badge>
                </Example>
                <Example label="icon end">
                  <Badge variant="outline">
                    Sources <ChevronRight data-icon="inline-end" />
                  </Badge>
                </Example>
                <Example label="asChild (link)">
                  <Badge asChild>
                    <a href="#badges">Linked</a>
                  </Badge>
                </Example>
              </ExampleGroup>
            </section>

            <Separator />

            <section className="space-y-6">
              <h2>Dropdown menu</h2>
              <ExampleGroup title="Item types">
                <Example label="items, shortcuts, destructive">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        Actions <ChevronRight />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuLabel>Source</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        Edit <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Duplicate <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled>Archive (disabled)</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Example>
                <Example label="checkbox and radio items">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">View</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuLabel>Columns</DropdownMenuLabel>
                      <DropdownMenuCheckboxItem checked>Name</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked>Host</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Owner</DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Sort</DropdownMenuLabel>
                      <DropdownMenuRadioGroup value="name">
                        <DropdownMenuRadioItem value="name">By name</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="status">By status</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Example>
                <Example label="submenu">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Export</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem>Copy link</DropdownMenuItem>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Download as</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>CSV</DropdownMenuItem>
                          <DropdownMenuItem>GeoJSON</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Example>
              </ExampleGroup>
            </section>
          </TabsContent>

          <TabsContent value="forms" className="space-y-10">
            <section className="space-y-6">
              <h2>Inputs</h2>
              <ExampleGroup title="Input" className="items-start">
                <Example label="default" className="w-56 items-stretch">
                  <Input placeholder="warehouse-prod" aria-label="Name" />
                </Example>
                <Example label="with Label" className="w-56 items-stretch">
                  <Label htmlFor="ex-host">Host</Label>
                  <Input id="ex-host" placeholder="db.internal:5432" />
                </Example>
                <Example label="disabled" className="w-56 items-stretch">
                  <Input disabled placeholder="Read only" aria-label="Disabled" />
                </Example>
                <Example label='aria-invalid="true"' className="w-56 items-stretch">
                  <Input
                    aria-invalid="true"
                    defaultValue="db internal"
                    aria-label="Invalid host"
                  />
                </Example>
              </ExampleGroup>
              <ExampleGroup title="Textarea" className="items-start">
                <Example label="default" className="w-72 items-stretch">
                  <Textarea placeholder="Operational notes…" aria-label="Notes" />
                </Example>
                <Example label="disabled" className="w-72 items-stretch">
                  <Textarea disabled placeholder="Read only" aria-label="Disabled notes" />
                </Example>
              </ExampleGroup>
              <ExampleGroup title="Select">
                {(
                  [
                    { label: 'size="default"', size: "default", disabled: false },
                    { label: 'size="sm"', size: "sm", disabled: false },
                    { label: "disabled", size: "default", disabled: true },
                  ] as const
                ).map((example) => (
                  <Example key={example.label} label={example.label}>
                    <Select disabled={example.disabled}>
                      <SelectTrigger
                        size={example.size}
                        className="w-48"
                        aria-label={`Source type (${example.label})`}
                      >
                        <SelectValue placeholder="Source type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="postgres">PostgreSQL</SelectItem>
                        <SelectItem value="oracle">Oracle</SelectItem>
                        <SelectItem value="kafka">Kafka</SelectItem>
                      </SelectContent>
                    </Select>
                  </Example>
                ))}
              </ExampleGroup>
            </section>

            <Separator />

            <section className="space-y-6">
              <h2>Input group</h2>
              <ExampleGroup title="Size and variant" className="flex-col items-stretch">
                {(
                  [
                    { label: "default", size: "default", variant: "default" },
                    { label: 'size="lg"', size: "lg", variant: "default" },
                    {
                      label: 'variant="prominent"',
                      size: "default",
                      variant: "prominent",
                    },
                    {
                      label: 'size="lg" variant="prominent"',
                      size: "lg",
                      variant: "prominent",
                    },
                  ] as const
                ).map((example) => (
                  <Example
                    key={example.label}
                    label={example.label}
                    className="items-stretch"
                  >
                    <InputGroup size={example.size} variant={example.variant}>
                      <InputGroupAddon>
                        <Search />
                      </InputGroupAddon>
                      <InputGroupInput
                        placeholder="Search sources…"
                        aria-label={`Search sources (${example.label})`}
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton variant="default" size="sm">
                          Search
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                  </Example>
                ))}
              </ExampleGroup>
              <ExampleGroup title="Addons" className="grid md:grid-cols-3 items-start">
                <Example label="Kbd hint" className="items-stretch">
                  <InputGroup>
                    <InputGroupAddon>
                      <Search />
                    </InputGroupAddon>
                    <InputGroupInput placeholder="Jump to…" aria-label="Jump to" />
                    <InputGroupAddon align="inline-end">
                      <KbdGroup>
                        <Kbd>⌘</Kbd>
                        <Kbd>K</Kbd>
                      </KbdGroup>
                    </InputGroupAddon>
                  </InputGroup>
                </Example>
                <Example label="text prefix + button" className="items-stretch">
                  <InputGroup>
                    <InputGroupAddon>
                      <InputGroupText>https://</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput placeholder="example.org" aria-label="URL" />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton>Check</InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                </Example>
                <Example label='textarea + align="block-end"' className="items-stretch">
                  <InputGroup>
                    <InputGroupTextarea placeholder="Notes…" aria-label="Notes" />
                    <InputGroupAddon align="block-end">
                      <InputGroupText>0 / 280</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Example>
              </ExampleGroup>
            </section>

            <Separator />

            <section className="space-y-6">
              <h2>Choice controls</h2>
              <ExampleGroup title="Checkbox">
                <Example label="unchecked">
                  <div className="flex items-center gap-2">
                    <Checkbox id="ex-cb-1" />
                    <Label htmlFor="ex-cb-1">Subscribe</Label>
                  </div>
                </Example>
                <Example label="checked">
                  <div className="flex items-center gap-2">
                    <Checkbox id="ex-cb-2" defaultChecked />
                    <Label htmlFor="ex-cb-2">Subscribe</Label>
                  </div>
                </Example>
                <Example label="disabled">
                  <div className="flex items-center gap-2">
                    <Checkbox id="ex-cb-3" disabled />
                    <Label htmlFor="ex-cb-3">Subscribe</Label>
                  </div>
                </Example>
                <Example label='aria-invalid="true"'>
                  <div className="flex items-center gap-2">
                    <Checkbox id="ex-cb-4" aria-invalid="true" />
                    <Label htmlFor="ex-cb-4">I accept the terms</Label>
                  </div>
                </Example>
              </ExampleGroup>
              <ExampleGroup title="Switch">
                <Example label="default">
                  <Switch defaultChecked aria-label="default" />
                </Example>
                <Example label='size="sm"'>
                  <Switch size="sm" defaultChecked aria-label="small" />
                </Example>
                <Example label='shape="square"'>
                  <Switch shape="square" defaultChecked aria-label="square" />
                </Example>
                <Example label='shape="square" size="sm"'>
                  <Switch shape="square" size="sm" defaultChecked aria-label="square small" />
                </Example>
                <Example label="unchecked">
                  <Switch aria-label="unchecked" />
                </Example>
                <Example label="disabled">
                  <Switch disabled aria-label="disabled" />
                </Example>
              </ExampleGroup>
              <ExampleGroup title="Radio group">
                <Example label='defaultValue="incremental", one item disabled'>
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
                      <RadioGroupItem value="manual" id="r-man" disabled />
                      <Label htmlFor="r-man">Manual only</Label>
                    </div>
                  </RadioGroup>
                </Example>
              </ExampleGroup>
              <ExampleGroup title="Slider" className="items-start">
                <Example label={`value={[${volume[0]}]}`} className="w-56 items-stretch">
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    aria-label="Throughput limit"
                  />
                </Example>
                <Example label="range (two thumbs)" className="w-56 items-stretch">
                  <Slider defaultValue={[20, 70]} max={100} aria-label="Range" />
                </Example>
                <Example label="disabled" className="w-56 items-stretch">
                  <Slider defaultValue={[50]} disabled aria-label="Disabled" />
                </Example>
              </ExampleGroup>
            </section>

            <Separator />

            <section className="space-y-6">
              <h2>Toggles</h2>
              <ExampleGroup title="Toggle">
                <Example label='variant="default"'>
                  <Toggle aria-label="Bold">
                    <Bold />
                  </Toggle>
                </Example>
                <Example label='variant="outline"'>
                  <Toggle variant="outline" aria-label="Italic">
                    <Italic />
                  </Toggle>
                </Example>
                {(["sm", "default", "lg"] as const).map((size) => (
                  <Example key={size} label={`size="${size}"`}>
                    <Toggle size={size} variant="outline" aria-label={`Underline ${size}`}>
                      <Underline />
                    </Toggle>
                  </Example>
                ))}
                <Example label="pressed, with text">
                  <Toggle defaultPressed aria-label="Underline">
                    <Underline /> Underline
                  </Toggle>
                </Example>
                <Example label="disabled">
                  <Toggle disabled aria-label="Bold disabled">
                    <Bold />
                  </Toggle>
                </Example>
              </ExampleGroup>
              <ExampleGroup title="Toggle group">
                <Example label='type="multiple" variant="outline"'>
                  <ToggleGroup type="multiple" variant="outline" defaultValue={["bold"]}>
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
                </Example>
                <Example label='type="single"'>
                  <ToggleGroup type="single" defaultValue="map">
                    <ToggleGroupItem value="map">Map</ToggleGroupItem>
                    <ToggleGroupItem value="table">Table</ToggleGroupItem>
                    <ToggleGroupItem value="chart">Chart</ToggleGroupItem>
                  </ToggleGroup>
                </Example>
                <Example label='type="single" variant="outline" size="sm"'>
                  <ToggleGroup type="single" variant="outline" size="sm" defaultValue="day">
                    <ToggleGroupItem value="day">Day</ToggleGroupItem>
                    <ToggleGroupItem value="week">Week</ToggleGroupItem>
                    <ToggleGroupItem value="month">Month</ToggleGroupItem>
                  </ToggleGroup>
                </Example>
              </ExampleGroup>
            </section>

            <Separator />

            <section className="space-y-6">
              <h2>Pickers</h2>
              <ExampleGroup title="Command">
                <Example label="Command (inline, searchable list)" className="w-72 items-stretch">
                  <Command className="rounded-lg border">
                    <CommandInput placeholder="Search sources…" />
                    <CommandList>
                      <CommandEmpty>No sources found.</CommandEmpty>
                      <CommandGroup heading="Sources">
                        {sources.map((s) => (
                          <CommandItem key={s.name} value={s.name}>
                            <DatabaseIcon /> {s.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </Example>
              </ExampleGroup>
              <ExampleGroup title="Date picker">
                <Example label="DatePicker">
                  <DatePicker value={date} onValueChange={setDate} />
                </Example>
                <Example label="DateRangePicker">
                  <DateRangePicker value={range} onValueChange={setRange} />
                </Example>
                <Example label="DatePicker disabled">
                  <DatePicker disabled />
                </Example>
              </ExampleGroup>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2>Validated form</h2>
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
          </TabsContent>

          <TabsContent value="feedback" className="space-y-10">
            <section className="space-y-6">
              <h2>Status</h2>
              <ExampleGroup title="StatusIndicator">
                {(
                  [
                    "online",
                    "degraded",
                    "offline",
                    "error",
                    "info",
                    "pending",
                  ] as const
                ).map((status) => (
                  <Example key={status} label={`status="${status}"`}>
                    <StatusIndicator status={status}>{status}</StatusIndicator>
                  </Example>
                ))}
                <Example label='status="degraded" pulse'>
                  <StatusIndicator status="degraded" pulse>
                    syncing
                  </StatusIndicator>
                </Example>
                <Example label="no label (bare dot)">
                  <StatusIndicator status="online" aria-label="online" />
                </Example>
              </ExampleGroup>
              <ExampleGroup title="FieldValue">
                <Example label='"Approved"'>
                  <FieldValue value="Approved" />
                </Example>
                <Example label='"Provisional"'>
                  <FieldValue value="Provisional" />
                </Example>
                <Example label='"CODE: Label"'>
                  <FieldValue value="ACT: Active" />
                </Example>
                <Example label="URL">
                  <FieldValue value="https://waterdata.usgs.gov/nm" />
                </Example>
                <Example label="plain text">
                  <FieldValue value="Sandia Basin" />
                </Example>
              </ExampleGroup>
            </section>

            <Separator />

            <section className="space-y-6">
              <h2>Alerts</h2>
              <Example label='variant="default"' className="items-stretch">
                <Alert>
                  <Info />
                  <AlertTitle>Heads up</AlertTitle>
                  <AlertDescription>
                    Scheduled maintenance window starts in 30 minutes.
                  </AlertDescription>
                </Alert>
              </Example>
              <Example label='variant="destructive"' className="items-stretch">
                <Alert variant="destructive">
                  <TriangleAlert />
                  <AlertTitle>Connection failed</AlertTitle>
                  <AlertDescription>
                    Could not reach <code>db.internal:5432</code>. Check
                    credentials and network policy.
                  </AlertDescription>
                </Alert>
              </Example>
              <Example label="title only, no icon" className="items-stretch">
                <Alert>
                  <AlertTitle>3 sources need attention.</AlertTitle>
                </Alert>
              </Example>
            </section>

            <Separator />

            <section className="space-y-6">
              <h2>Toasts</h2>
              <ExampleGroup title="Sonner">
                <Example label="toast()">
                  <Button variant="outline" onClick={() => toast("Settings saved")}>
                    Default
                  </Button>
                </Example>
                <Example label="toast.success()">
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
                </Example>
                <Example label="toast.error()">
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast.error("Sync failed", { description: "Retrying in 30s." })
                    }
                  >
                    Error
                  </Button>
                </Example>
                <Example label="toast.info()">
                  <Button variant="outline" onClick={() => toast.info("New release available")}>
                    Info
                  </Button>
                </Example>
                <Example label="toast.warning()">
                  <Button
                    variant="outline"
                    onClick={() => toast.warning("API rate limit at 80%")}
                  >
                    Warning
                  </Button>
                </Example>
                <Example label="with action">
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast("Source archived", {
                        action: { label: "Undo", onClick: () => toast("Restored") },
                      })
                    }
                  >
                    With action
                  </Button>
                </Example>
              </ExampleGroup>
            </section>

            <Separator />

            <section className="space-y-6">
              <h2>Progress</h2>
              <ExampleGroup title="Progress" className="items-start">
                {[0, 33, 100].map((value) => (
                  <Example key={value} label={`value={${value}}`} className="w-48 items-stretch">
                    <Progress value={value} aria-label={`${value}%`} />
                  </Example>
                ))}
                <Example label={`interactive: value={${progress}}`} className="w-72 items-stretch">
                  <Progress value={progress} aria-label="Indexing progress" />
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
                </Example>
              </ExampleGroup>
              <ExampleGroup title="TopLoadingBar">
                <Example label={`active={${loading}}`}>
                  <Button variant="outline" onClick={() => setLoading((v) => !v)}>
                    {loading ? "Stop" : "Start"} loading bar
                  </Button>
                  <TopLoadingBar active={loading} />
                </Example>
              </ExampleGroup>
            </section>

            <Separator />

            <section className="space-y-6">
              <h2>Skeleton</h2>
              <ExampleGroup title="Shapes" className="items-start">
                <Example label="avatar + text lines" className="w-72 items-stretch">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </Example>
                <Example label="card" className="w-72 items-stretch">
                  <div className="space-y-3">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </Example>
              </ExampleGroup>
            </section>
          </TabsContent>

          <TabsContent value="data" className="space-y-10">
            <section className="space-y-4">
              <h2>Charts</h2>
              <p className="text-muted-foreground">
                Recharts wrapper using the <code>--chart-1..5</code> theme
                tokens — themed tooltip and legend included.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Ingestion throughput</CardTitle>
                    <CardDescription>AreaChart · stacked · tooltip + legend</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[240px] w-full">
                      <AreaChart data={throughput} accessibilityLayer>
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="day"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Area
                          dataKey="ingested"
                          type="monotone"
                          fill="var(--color-ingested)"
                          fillOpacity={0.3}
                          stroke="var(--color-ingested)"
                          stackId="a"
                        />
                        <Area
                          dataKey="failed"
                          type="monotone"
                          fill="var(--color-failed)"
                          fillOpacity={0.3}
                          stroke="var(--color-failed)"
                          stackId="a"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Failures by day</CardTitle>
                    <CardDescription>BarChart · tooltip with hideLabel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[240px] w-full">
                      <BarChart data={throughput} accessibilityLayer>
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="day"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                        />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Bar
                          dataKey="failed"
                          fill="var(--color-failed)"
                          radius={4}
                        />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2>ECharts (advanced)</h2>
              <p className="text-muted-foreground">
                Apache ECharts wrapper for heavier, interactive charting — drag
                the zoom slider or scroll to zoom. Line + bar combo over 30
                days, themed from the active theme and mode.
              </p>
              <Card>
                <CardHeader>
                  <CardTitle>Ingestion vs failures</CardTitle>
                  <CardDescription>
                    Interactive dataZoom · 30-day window
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EChart option={echartOption} height={320} />
                </CardContent>
              </Card>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2>Table</h2>
              <p className="text-muted-foreground">
                Static <code>Table</code> with a caption and right-aligned
                actions column.
              </p>
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
                large datasets. Double-click a cell to edit; themed from the
                active theme and mode.
              </p>
              <DataGrid
                columns={gridColumns}
                rows={gridRows}
                onRowsChange={setGridRows}
                height={240}
              />
            </section>

            <Separator />

            <section className="space-y-6">
              <h2>Avatars</h2>
              <ExampleGroup title="Size">
                {(["sm", "default", "lg"] as const).map((size) => (
                  <Example key={size} label={`size="${size}"`}>
                    <Avatar size={size}>
                      <AvatarImage src="https://github.com/shadcn.png" alt="" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                  </Example>
                ))}
              </ExampleGroup>
              <ExampleGroup title="Content">
                <Example label="AvatarFallback (initials)">
                  <Avatar>
                    <AvatarFallback>JR</AvatarFallback>
                  </Avatar>
                </Example>
                <Example label="AvatarBadge">
                  <Avatar size="lg">
                    <AvatarFallback>DS</AvatarFallback>
                    <AvatarBadge />
                  </Avatar>
                </Example>
                <Example label="AvatarGroup + AvatarGroupCount">
                  <AvatarGroup>
                    <Avatar>
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>CD</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>EF</AvatarFallback>
                    </Avatar>
                    <AvatarGroupCount>+4</AvatarGroupCount>
                  </AvatarGroup>
                </Example>
              </ExampleGroup>
            </section>

            <Separator />

            <section className="space-y-6">
              <h2>Accordion</h2>
              <Example label='type="single" collapsible' className="items-stretch">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="a">
                    <AccordionTrigger>
                      What is the DataServices Design System?
                    </AccordionTrigger>
                    <AccordionContent>
                      Shared UI components for DataServices apps. Each app picks
                      a theme, and every component works in every theme.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="b">
                    <AccordionTrigger>Which framework does it use?</AccordionTrigger>
                    <AccordionContent>
                      Vite + React + TypeScript + Tailwind v4 + shadcn/ui.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Example>
              <Example label='type="multiple" defaultValue={["c"]}' className="items-stretch">
                <Accordion type="multiple" defaultValue={["c"]} className="w-full">
                  <AccordionItem value="c">
                    <AccordionTrigger>How do I add components?</AccordionTrigger>
                    <AccordionContent>
                      Run <code>npx shadcn add @dataservices/&lt;name&gt;</code>.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="d">
                    <AccordionTrigger>How do I pick a theme?</AccordionTrigger>
                    <AccordionContent>
                      Install a theme file and set <code>data-theme</code> on{" "}
                      <code>&lt;html&gt;</code>. See THEMING.md.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Example>
            </section>
          </TabsContent>

          <TabsContent value="overlays" className="space-y-10">
            <section className="space-y-6">
              <h2>Dialog</h2>
              <ExampleGroup title="Dialog">
                <Example label="default (close button)">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Open dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Rename data source</DialogTitle>
                        <DialogDescription>
                          The new name shows everywhere this source is used.
                        </DialogDescription>
                      </DialogHeader>
                      <Input defaultValue="warehouse-prod" aria-label="Source name" />
                      <DialogFooter>
                        <Button>Save</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </Example>
                <Example label="showCloseButton={false}">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Open dialog</Button>
                    </DialogTrigger>
                    <DialogContent showCloseButton={false}>
                      <DialogHeader>
                        <DialogTitle>Delete data source?</DialogTitle>
                        <DialogDescription>
                          This will disconnect <b>warehouse-prod</b> and remove
                          cached metadata. Cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="ghost">Cancel</Button>
                        </DialogClose>
                        <Button variant="destructive">Delete</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </Example>
              </ExampleGroup>
              <ExampleGroup title="Alert dialog">
                <Example label="confirm a destructive action">
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
                        <AlertDialogAction onClick={() => toast.error("Source deleted")}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </Example>
              </ExampleGroup>
            </section>

            <Separator />

            <section className="space-y-6">
              <h2>Sheet</h2>
              <ExampleGroup title="side">
                {(["right", "left", "top", "bottom"] as const).map((side) => (
                  <Example key={side} label={`side="${side}"`}>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline">Open {side}</Button>
                      </SheetTrigger>
                      <SheetContent side={side}>
                        <SheetHeader>
                          <SheetTitle>Filter sources</SheetTitle>
                          <SheetDescription>
                            Narrow the source list. Changes apply on close.
                          </SheetDescription>
                        </SheetHeader>
                        <div className="flex flex-col gap-4 p-4">
                          <div className="space-y-2">
                            <Label htmlFor={`f-name-${side}`}>Name contains</Label>
                            <Input id={`f-name-${side}`} placeholder="prod" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id={`f-online-${side}`} defaultChecked />
                            <Label htmlFor={`f-online-${side}`}>Online only</Label>
                          </div>
                        </div>
                        <SheetFooter>
                          <SheetClose asChild>
                            <Button>Apply</Button>
                          </SheetClose>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  </Example>
                ))}
              </ExampleGroup>
            </section>

            <Separator />

            <section className="space-y-6">
              <h2>Popover and tooltip</h2>
              <ExampleGroup title="Popover">
                {(["start", "center", "end"] as const).map((align) => (
                  <Example key={align} label={`align="${align}"`}>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">
                          <Bell /> Notifications
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align={align}>
                        <div className="space-y-2">
                          <div className="font-semibold">3 unread</div>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>warehouse-prod resync complete</li>
                            <li>API key rotates in 7 days</li>
                          </ul>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </Example>
                ))}
              </ExampleGroup>
              <ExampleGroup title="Tooltip">
                {(["top", "right", "bottom", "left"] as const).map((side) => (
                  <Example key={side} label={`side="${side}"`}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">
                          <Check /> Hover me
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side={side}>Connection healthy</TooltipContent>
                    </Tooltip>
                  </Example>
                ))}
                <Example label="with Kbd">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" aria-label="Search">
                        <Search />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Search <Kbd>⌘K</Kbd>
                    </TooltipContent>
                  </Tooltip>
                </Example>
              </ExampleGroup>
            </section>
          </TabsContent>

          <TabsContent value="map" className="space-y-10">
            <section className="space-y-4">
              <h2>Map</h2>
              <p className="text-muted-foreground">
                MapLibre primitive with a token-free CARTO basemap and a New
                Mexico default extent. Pick a basemap and toggle layers in the
                panel; the selectors are presentational, so the app owns the
                state.
              </p>
              <Example
                label='defaults: showNavigation showScale controlPosition="top-right"'
                className="items-stretch"
              >
                <Card className="overflow-hidden p-0">
                  <div className="grid h-[520px] md:grid-cols-[1fr_300px]">
                    <Map mapStyle={basemap}>
                      <Marker longitude={-106.65} latitude={35.08} />
                    </Map>
                    <div className="space-y-5 overflow-y-auto border-l bg-card p-4">
                      <Example label="BasemapSelector" className="items-stretch">
                        <BasemapSelector
                          options={BASEMAPS}
                          value={basemap}
                          onValueChange={setBasemap}
                        />
                      </Example>
                      <Example label="LayerSelector" className="items-stretch">
                        <LayerSelector
                          options={LAYERS}
                          value={visibleLayers}
                          onToggle={(id) =>
                            setVisibleLayers((v) =>
                              v.includes(id) ? v.filter((x) => x !== id) : [...v, id]
                            )
                          }
                        />
                      </Example>
                    </div>
                  </div>
                </Card>
              </Example>
              <Example label="FilterControls">
                <FilterControls
                  bbox={filterBbox}
                  q={filterQuery}
                  onBboxChange={setFilterBbox}
                  onQueryChange={setFilterQuery}
                />
              </Example>
              <Example
                label='showScale={false} controlPosition="bottom-left"'
                className="items-stretch"
              >
                <Card className="overflow-hidden p-0">
                  <div className="h-[240px]">
                    <Map showScale={false} controlPosition="bottom-left" />
                  </div>
                </Card>
              </Example>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2>Resizable split &amp; status</h2>
              <p className="text-muted-foreground">
                Drag the divider to resize the map against a source panel.
                Health uses <code>StatusIndicator</code>.
              </p>
              <Example
                label='ResizablePanelGroup orientation="horizontal", ResizableHandle withHandle'
                className="items-stretch"
              >
                <Card className="overflow-hidden p-0">
                  <ResizablePanelGroup orientation="horizontal" className="h-[360px]">
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
              </Example>
            </section>
          </TabsContent>

          <TabsContent value="layout" className="space-y-10">
            <section className="space-y-6">
              <h2>Page chrome</h2>
              <Example
                label="PageShell + NavBar (NavBarBrand, NavBarNav, NavBarLink active, NavBarActions) + PageBody"
                className="items-stretch"
              >
                <Card className="overflow-hidden p-0">
                  <PageShell className="h-[280px]">
                    <NavBar>
                      <NavBarBrand asChild>
                        <a href="#layout">Weaver</a>
                      </NavBarBrand>
                      <NavBarNav>
                        <NavBarLink href="#layout" active>
                          Datasets
                        </NavBarLink>
                        <NavBarLink href="#layout">Map</NavBarLink>
                        <NavBarLink href="#layout">About</NavBarLink>
                      </NavBarNav>
                      <NavBarActions>
                        <Button size="sm" variant="outline">
                          Sign in
                        </Button>
                      </NavBarActions>
                    </NavBar>
                    <PageBody>
                      <h3 className="!text-xl">Datasets</h3>
                      <p className="text-muted-foreground">
                        PageBody scrolls and centers its content column.
                      </p>
                    </PageBody>
                  </PageShell>
                </Card>
              </Example>
              <Example label="NavBar fluid" className="items-stretch">
                <Card className="overflow-hidden p-0">
                  <NavBar fluid>
                    <NavBarBrand>Map app</NavBarBrand>
                    <NavBarActions>
                      <ModeToggle />
                    </NavBarActions>
                  </NavBar>
                </Card>
              </Example>
            </section>

            <Separator />

            <section className="space-y-6">
              <h2>Card</h2>
              <ExampleGroup title="Composition" className="grid md:grid-cols-2 items-start">
                <Example
                  label="CardHeader + CardContent + CardFooter"
                  className="items-stretch"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Connect a data source</CardTitle>
                      <CardDescription>
                        Provide credentials to register a new source.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Label htmlFor="card-host">Host</Label>
                      <Input id="card-host" placeholder="db.internal:5432" />
                    </CardContent>
                    <CardFooter className="justify-end gap-2">
                      <Button variant="ghost">Cancel</Button>
                      <Button>Connect</Button>
                    </CardFooter>
                  </Card>
                </Example>
                <Example label="CardContent only" className="items-stretch">
                  <Card>
                    <CardContent className="pt-6 text-sm text-muted-foreground">
                      A plain surface for grouped content.
                    </CardContent>
                  </Card>
                </Example>
              </ExampleGroup>
            </section>

            <Separator />

            <section className="space-y-6">
              <h2>Navigation</h2>
              <Example label="Breadcrumb with BreadcrumbEllipsis and BreadcrumbPage">
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
              </Example>
              <Example label='Sidebar collapsible="none", SidebarMenuButton isActive, SidebarMenuBadge' className="items-stretch">
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
              </Example>
            </section>

            <Separator />

            <section className="space-y-6">
              <h2>Onboarding tour</h2>
              <p className="text-muted-foreground">
                Spotlights real UI one step at a time and remembers it was seen
                (per <code>storageKey</code>). This one points at the theme and
                mode controls in the header.
              </p>
              <Example label='OnboardingTour steps={…} storageKey="dsds-showcase-tour"'>
                <Button
                  variant="outline"
                  onClick={() => {
                    // The steps point at the header, so bring it into view.
                    window.scrollTo({ top: 0 })
                    localStorage.removeItem(TOUR_STORAGE_KEY)
                    setTourRun((n) => n + 1)
                  }}
                >
                  Start tour
                </Button>
              </Example>
              {tourRun > 0 && (
                <OnboardingTour
                  key={tourRun}
                  steps={TOUR_STEPS}
                  storageKey={TOUR_STORAGE_KEY}
                />
              )}
            </section>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t mt-12">
        <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-muted-foreground">
          DataServices design system · {activePalette.label} theme
        </div>
      </footer>
    </div>
  )
}

export default App
