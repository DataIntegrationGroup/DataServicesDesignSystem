import * as React from "react"
import {
  DataEditor,
  GridCellKind,
  type DataEditorProps,
  type EditableGridCell,
  type GridCell,
  type GridColumn,
  type Item,
  type Theme as GlideTheme,
} from "@glideapps/glide-data-grid"

import "@glideapps/glide-data-grid/dist/index.css"

import { cn } from "@/lib/utils"
import { useCssVars } from "@/hooks/use-css-vars"

const TOKENS = [
  "primary",
  "primary-foreground",
  "foreground",
  "muted",
  "muted-foreground",
  "card",
  "background",
  "border",
  "font-sans",
] as const

type Rgba = [number, number, number, number]

let colorCtx: CanvasRenderingContext2D | null | undefined

/** Resolve any CSS color (hex, rgb, oklch…) to sRGB via a 1px canvas. */
function toRgba(color: string): Rgba {
  colorCtx ??= document.createElement("canvas").getContext("2d", {
    willReadFrequently: true,
  })
  if (!colorCtx || !color) return [0, 0, 0, 0]
  colorCtx.clearRect(0, 0, 1, 1)
  colorCtx.fillStyle = color
  colorCtx.fillRect(0, 0, 1, 1)
  const [r, g, b, a] = colorCtx.getImageData(0, 0, 1, 1).data
  return [r, g, b, a / 255]
}

const css = ([r, g, b, a]: Rgba) => `rgba(${r}, ${g}, ${b}, ${+a.toFixed(3)})`

/** `amount` of `b` mixed into `a`. */
function mix(a: string, b: string, amount: number) {
  const x = toRgba(a)
  const y = toRgba(b)
  return css(x.map((v, i) => Math.round(v + (y[i] - v) * amount)) as Rgba)
}

function withAlpha(color: string, alpha: number) {
  const [r, g, b] = toRgba(color)
  return css([r, g, b, alpha])
}

/**
 * Glide renders on a canvas, so CSS variables don't apply. Build its theme
 * from the current token values instead; useCssVars re-reads them when the
 * mode or data-theme changes.
 */
function useGlideTheme(): Partial<GlideTheme> {
  const t = useCssVars(TOKENS)
  const dark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
  return React.useMemo(
    () => ({
      accentColor: t.primary,
      accentLight: withAlpha(t.primary, dark ? 0.35 : 0.15),
      textDark: t.foreground,
      textMedium: t["muted-foreground"],
      textLight: t["muted-foreground"],
      textBubble: t.foreground,
      textHeader: t.foreground,
      textHeaderSelected: t["primary-foreground"],
      textGroupHeader: t["muted-foreground"],
      bgIconHeader: t["muted-foreground"],
      fgIconHeader: t.card,
      linkColor: t.primary,
      bgCell: t.card,
      bgCellMedium: t.muted,
      bgHeader: t.muted,
      bgHeaderHasFocus: mix(t.muted, t.foreground, 0.08),
      bgHeaderHovered: mix(t.muted, t.foreground, 0.08),
      // Dark themes often set --border close to --card; lift grid lines a
      // step so cells stay separated.
      borderColor: dark ? mix(t.border, t.foreground, 0.12) : t.border,
      headerFontStyle: "600 13px",
      baseFontStyle: "13px",
      fontFamily: t["font-sans"] || "system-ui, sans-serif",
    }),
    [t, dark]
  )
}

/** Glide renders overlay editors into a portal element with id "portal". */
function useGridPortal() {
  React.useEffect(() => {
    if (document.getElementById("portal")) return
    const el = document.createElement("div")
    el.id = "portal"
    el.style.position = "fixed"
    el.style.left = "0"
    el.style.top = "0"
    el.style.zIndex = "9999"
    document.body.appendChild(el)
  }, [])
}

export interface DataGridColumn<T> {
  /** Key on the row object this column reads/writes. */
  id: Extract<keyof T, string>
  /** Header label. */
  title: string
  /** Pixel width (default: 150). */
  width?: number
}

export interface DataGridProps<T>
  extends Omit<
    Partial<DataEditorProps>,
    "getCellContent" | "columns" | "rows" | "onCellEdited"
  > {
  columns: DataGridColumn<T>[]
  rows: T[]
  /**
   * Called with the next rows array after an edit. Omit for a read-only grid.
   */
  onRowsChange?: (rows: T[]) => void
  /** Grid height (default: 400). */
  height?: number
  className?: string
}

/**
 * DataGrid — a canvas-based, editable spreadsheet grid (Glide Data Grid) with
 * a row-object API and OcotilloUI theming. Define `columns` keyed to fields on
 * your row type and pass `rows`; provide `onRowsChange` to make cells editable.
 *
 *   <DataGrid columns={cols} rows={rows} onRowsChange={setRows} />
 */
export function DataGrid<T extends Record<string, unknown>>({
  columns,
  rows,
  onRowsChange,
  height = 400,
  className,
  ...props
}: DataGridProps<T>) {
  useGridPortal()
  const theme = useGlideTheme()

  const gridColumns = React.useMemo<GridColumn[]>(
    () => columns.map((c) => ({ title: c.title, id: c.id, width: c.width ?? 150 })),
    [columns]
  )

  const getCellContent = React.useCallback(
    ([col, row]: Item): GridCell => {
      const column = columns[col]
      const value = rows[row]?.[column.id]
      const text = value == null ? "" : String(value)
      return {
        kind: GridCellKind.Text,
        data: text,
        displayData: text,
        allowOverlay: onRowsChange != null,
        readonly: onRowsChange == null,
      }
    },
    [columns, rows, onRowsChange]
  )

  const onCellEdited = React.useCallback(
    ([col, row]: Item, newValue: EditableGridCell) => {
      if (!onRowsChange || newValue.kind !== GridCellKind.Text) return
      const column = columns[col]
      const next = rows.map((r, i) =>
        i === row ? { ...r, [column.id]: newValue.data } : r
      )
      onRowsChange(next)
    },
    [columns, rows, onRowsChange]
  )

  return (
    <div
      data-slot="data-grid"
      className={cn("overflow-hidden rounded-lg border", className)}
      style={{ height }}
    >
      <DataEditor
        theme={theme}
        columns={gridColumns}
        rows={rows.length}
        getCellContent={getCellContent}
        onCellEdited={onRowsChange ? onCellEdited : undefined}
        width="100%"
        height={height}
        smoothScrollX
        smoothScrollY
        {...props}
      />
    </div>
  )
}
