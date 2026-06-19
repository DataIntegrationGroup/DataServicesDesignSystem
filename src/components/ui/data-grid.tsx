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
import { useTheme } from "@/components/theme-provider"

/**
 * Glide themes are concrete color strings (canvas-rendered — CSS vars don't
 * apply), so the OcotilloUI palette is mirrored here for light and dark.
 */
const lightTheme: Partial<GlideTheme> = {
  accentColor: "#1d4ed8",
  accentLight: "#dbeafe",
  textDark: "#0f172a",
  textMedium: "#475569",
  textLight: "#94a3b8",
  textBubble: "#0f172a",
  bgCell: "#ffffff",
  bgCellMedium: "#f5f5f4",
  bgHeader: "#f5f5f4",
  bgHeaderHasFocus: "#e7e5e4",
  bgHeaderHovered: "#e7e5e4",
  borderColor: "#d6d3d1",
  headerFontStyle: "600 13px",
  baseFontStyle: "13px",
  fontFamily: "'Public Sans Variable', system-ui, sans-serif",
}

const darkTheme: Partial<GlideTheme> = {
  accentColor: "#2563eb",
  accentLight: "#1e3a8a",
  textDark: "#f1f5f9",
  textMedium: "#cbd5e1",
  textLight: "#94a3b8",
  textBubble: "#f1f5f9",
  bgCell: "#3f3f46",
  bgCellMedium: "#27272a",
  bgHeader: "#27272a",
  bgHeaderHasFocus: "#3f3f46",
  bgHeaderHovered: "#3f3f46",
  borderColor: "#52525b",
  headerFontStyle: "600 13px",
  baseFontStyle: "13px",
  fontFamily: "'Public Sans Variable', system-ui, sans-serif",
}

function useSystemDark() {
  return React.useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-color-scheme: dark)")
      mq.addEventListener("change", cb)
      return () => mq.removeEventListener("change", cb)
    },
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
    () => false
  )
}

function useResolvedDark() {
  const { theme } = useTheme()
  const systemDark = useSystemDark()
  return theme === "dark" || (theme === "system" && systemDark)
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
  const dark = useResolvedDark()

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
        theme={dark ? darkTheme : lightTheme}
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
