"use client"

import * as React from "react"
import * as echarts from "echarts"
import type { EChartsOption, ECharts, SetOptionOpts } from "echarts"

import { cn } from "@/lib/utils"
import { useCssVars } from "@/hooks/use-css-vars"

const TOKENS = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "foreground",
  "muted-foreground",
  "border",
  "popover",
  "popover-foreground",
  "font-sans",
] as const

/** Shape the current token values for buildTheme. */
function toThemeTokens(v: Record<(typeof TOKENS)[number], string>) {
  return {
    palette: [
      v["chart-1"],
      v["chart-2"],
      v["chart-3"],
      v["chart-4"],
      v["chart-5"],
    ].filter(Boolean),
    foreground: v.foreground,
    muted: v["muted-foreground"],
    border: v.border,
    popover: v.popover,
    popoverForeground: v["popover-foreground"],
    fontFamily: v["font-sans"] || "system-ui, sans-serif",
  }
}

/** Build an ECharts theme object from the theme's tokens. */
function buildTheme(t: ReturnType<typeof toThemeTokens>) {
  const axisCommon = {
    axisLine: { lineStyle: { color: t.border } },
    axisTick: { lineStyle: { color: t.border } },
    axisLabel: { color: t.muted },
    splitLine: { lineStyle: { color: t.border, opacity: 0.5 } },
    splitArea: { areaStyle: { color: ["transparent"] } },
  }
  return {
    color: t.palette,
    backgroundColor: "transparent",
    textStyle: { fontFamily: t.fontFamily, color: t.foreground },
    title: { textStyle: { color: t.foreground } },
    legend: { textStyle: { color: t.muted } },
    categoryAxis: axisCommon,
    valueAxis: axisCommon,
    logAxis: axisCommon,
    timeAxis: axisCommon,
    tooltip: {
      backgroundColor: t.popover,
      borderColor: t.border,
      textStyle: { color: t.popoverForeground, fontFamily: t.fontFamily },
    },
    line: { itemStyle: { borderWidth: 2 }, lineStyle: { width: 2 } },
  }
}

let themeSeq = 0

export interface EChartProps {
  /** ECharts option object. */
  option: EChartsOption
  /** Chart height in px (default: 360). */
  height?: number
  /** Options forwarded to setOption (default: { notMerge: true }). */
  setOptionOpts?: SetOptionOpts
  /** Show the built-in loading spinner. */
  loading?: boolean
  /** Map of ECharts event name → handler, e.g. { click: (p) => ... }. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEvents?: Record<string, (params: any) => void>
  className?: string
  /** Called with the chart instance after init. */
  onInit?: (chart: ECharts) => void
}

/**
 * EChart — Apache ECharts wrapper for serious/interactive charting (large
 * series, zoom, brushing, geo/heatmap, etc.). Themed from the --chart-1..5
 * and surface tokens, and re-themed when the mode or data-theme changes. Pass a raw ECharts
 * `option`; everything else (resize, dispose) is handled.
 */
export function EChart({
  option,
  height = 360,
  setOptionOpts = { notMerge: true },
  loading = false,
  onEvents,
  className,
  onInit,
}: EChartProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const chartRef = React.useRef<ECharts | null>(null)
  const tokens = useCssVars(TOKENS)

  // Init / dispose. Re-init when the tokens change so the registered theme
  // updates.
  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const themeName = `dataservices-${themeSeq++}`
    echarts.registerTheme(themeName, buildTheme(toThemeTokens(tokens)))
    const chart = echarts.init(el, themeName, { renderer: "canvas" })
    chartRef.current = chart
    onInit?.(chart)

    const ro = new ResizeObserver(() => chart.resize())
    ro.observe(el)

    return () => {
      ro.disconnect()
      chart.dispose()
      chartRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens])

  // Apply option.
  React.useEffect(() => {
    chartRef.current?.setOption(option, setOptionOpts)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option, tokens])

  // Loading state.
  React.useEffect(() => {
    const chart = chartRef.current
    if (!chart) return
    if (loading) chart.showLoading()
    else chart.hideLoading()
  }, [loading])

  // Events.
  React.useEffect(() => {
    const chart = chartRef.current
    if (!chart || !onEvents) return
    for (const [name, handler] of Object.entries(onEvents)) {
      chart.on(name, handler)
    }
    return () => {
      for (const name of Object.keys(onEvents)) chart.off(name)
    }
  }, [onEvents])

  return (
    <div
      ref={containerRef}
      data-slot="echart"
      style={{ height }}
      className={cn("w-full", className)}
    />
  )
}
