#!/usr/bin/env node
// Copies the design system's CSS into registry.json, where the shadcn CLI
// expects it: as `cssVars` and `css` on registry items, which `shadcn add`
// merges into an app's CSS entry.
//
// - src/index.css -> theme-base: @import and @custom-variant lines, the
//   @theme inline block (cssVars.theme) and @layer base. Its relative
//   imports (./themes/*) and tailwindcss itself are left out.
// - src/themes/<name>.css -> theme-<name>: plain :root and .dark blocks
//   become cssVars.light / cssVars.dark; any other selector (data-theme
//   scopes) goes into css as written.
// - Every other item that ships files -> its own cssVars: the DS-only tokens
//   (ones stock shadcn doesn't define) its files use, as @theme inline
//   mappings plus light/dark values from the Ocotillo theme. `shadcn add`
//   only fills in variables an app doesn't have yet, so a component works
//   in a plain shadcn app without overriding a DS theme. Components never
//   depend on theme-base: that's a registry:style, and the CLI merges a
//   style's css (base styles, @custom-variant) again on every add.
//
// Only those fields of those items are rewritten; everything else in
// registry.json is left as is.
//
// Usage: node scripts/registry-css.mjs [--check]
//   --check  fail instead of writing if registry.json is out of date

import { readFileSync, readdirSync, writeFileSync } from "node:fs"
import { basename, join } from "node:path"
import { fileURLToPath } from "node:url"
import postcss from "postcss"

const root = fileURLToPath(new URL("..", import.meta.url))
const registryPath = join(root, "registry.json")
const check = process.argv.includes("--check")

/** A rule or at-rule's children as a `css` object. */
function toCssObject(node) {
  const out = {}
  for (const child of node.nodes ?? []) {
    if (child.type === "decl") out[child.prop] = child.value
    else if (child.type === "rule") out[child.selector] = toCssObject(child)
    else if (child.type === "atrule") {
      out[`@${child.name} ${child.params}`] = child.nodes ? toCssObject(child) : {}
    }
  }
  return out
}

/** Custom properties of a block, without the leading --. */
function toVars(node) {
  const out = {}
  node.walkDecls((decl) => {
    if (decl.prop.startsWith("--")) out[decl.prop.slice(2)] = decl.value
  })
  return out
}

/** Merges b into a, so a repeated block (a second @layer base) adds to the first. */
function mergeCss(a, b) {
  for (const [key, value] of Object.entries(b)) {
    if (typeof value === "object" && typeof a[key] === "object") mergeCss(a[key], value)
    else a[key] = value
  }
  return a
}

function readBase() {
  const ast = postcss.parse(readFileSync(join(root, "src/index.css"), "utf8"))
  const css = {}
  let theme = {}
  for (const node of ast.nodes) {
    if (node.type === "rule") {
      mergeCss(css, { [node.selector]: toCssObject(node) })
    } else if (node.type !== "atrule") {
      continue
    } else if (node.name === "import") {
      const path = node.params.replace(/^["']|["']$/g, "")
      if (path === "tailwindcss" || path.startsWith(".")) continue
      css[`@import ${node.params}`] = {}
    } else if (node.name === "theme" && node.params === "inline") {
      Object.assign(theme, toVars(node))
    } else {
      mergeCss(css, { [`@${node.name} ${node.params}`]: node.nodes ? toCssObject(node) : {} })
    }
  }
  return { cssVars: { theme }, css }
}

// Color tokens a stock shadcn app already defines (radix-nova's index.css).
const STOCK_COLORS = new Set([
  "background", "foreground", "card", "card-foreground", "popover", "popover-foreground",
  "primary", "primary-foreground", "secondary", "secondary-foreground",
  "muted", "muted-foreground", "accent", "accent-foreground", "destructive",
  "border", "input", "ring",
  "chart-1", "chart-2", "chart-3", "chart-4", "chart-5",
  "sidebar", "sidebar-foreground", "sidebar-primary", "sidebar-primary-foreground",
  "sidebar-accent", "sidebar-accent-foreground", "sidebar-border", "sidebar-ring",
])

// Utility prefixes that take a color, e.g. bg-success-soft or ring-on-image-ring/50.
const COLOR_UTILITY = "(?:bg|text|border(?:-[xytrblse])?|ring|ring-offset|inset-ring|outline|fill|stroke|from|via|to|decoration|divide|caret|accent|shadow|placeholder)"
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
const used = (source, utility, token) =>
  new RegExp(`(?<![\\w-])${utility}-${escape(token)}(?:/[\\w.]+)?(?![\\w-])`).test(source) ||
  source.includes(`var(--${token})`)

/**
 * The DS-only tokens an item's files use, as cssVars: color mappings and
 * light/dark values from the default theme, and the type steps it uses.
 */
function readItemTokens(item, base, defaults) {
  const source = (item.files ?? []).map((f) => readFileSync(join(root, f.path), "utf8")).join("\n")
  const theme = {}
  const light = {}
  const dark = {}
  for (const [key, value] of Object.entries(base.cssVars.theme)) {
    const color = key.match(/^color-(.+)$/)?.[1]
    if (color && !STOCK_COLORS.has(color) && used(source, COLOR_UTILITY, color)) {
      theme[key] = value
      // .dark only lists what changes from :root.
      if (color in defaults.light) light[color] = defaults.light[color]
      if (color in defaults.dark) dark[color] = defaults.dark[color]
    }
    const step = key.match(/^text-([a-z]+)(?:--|$)/)?.[1]
    if (step && used(source, "text", step)) theme[key] = value
  }
  if (Object.keys(theme).length === 0) return { cssVars: undefined }
  const cssVars = { theme, light, dark }
  for (const key of ["light", "dark"]) if (!Object.keys(cssVars[key]).length) delete cssVars[key]
  return { cssVars }
}

function readTheme(file) {
  const ast = postcss.parse(readFileSync(file, "utf8"))
  const cssVars = {}
  const css = {}
  for (const node of ast.nodes) {
    if (node.type !== "rule") continue
    if (node.selector === ":root") cssVars.light = toVars(node)
    else if (node.selector === ".dark") cssVars.dark = toVars(node)
    else css[node.selector] = toCssObject(node)
  }
  return {
    cssVars: Object.keys(cssVars).length ? cssVars : undefined,
    css: Object.keys(css).length ? css : undefined,
  }
}

// registry.json keeps short arrays and small objects on one line.
const isPrimitive = (v) => v === null || typeof v !== "object"
function format(value, depth) {
  const pad = "  ".repeat(depth)
  if (isPrimitive(value)) return JSON.stringify(value)
  if (Array.isArray(value)) {
    if (value.every(isPrimitive)) return `[${value.map((v) => JSON.stringify(v)).join(", ")}]`
    return `[\n${value.map((v) => `${pad}  ${format(v, depth + 1)}`).join(",\n")}\n${pad}]`
  }
  const entries = Object.entries(value).filter(([, v]) => v !== undefined)
  if (entries.length === 0) return "{}"
  if (entries.length <= 3 && entries.every(([, v]) => isPrimitive(v))) {
    return `{ ${entries.map(([k, v]) => `${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(", ")} }`
  }
  return `{\n${entries
    .map(([k, v]) => `${pad}  ${JSON.stringify(k)}: ${format(v, depth + 1)}`)
    .join(",\n")}\n${pad}}`
}

const base = readBase()
const generated = { "theme-base": base }
const themesDir = join(root, "src/themes")
for (const file of readdirSync(themesDir).filter((f) => f.endsWith(".css")).sort()) {
  generated[`theme-${basename(file, ".css")}`] = readTheme(join(themesDir, file))
}

const before = readFileSync(registryPath, "utf8")
const defaults = generated["theme-ocotillo"].cssVars
for (const item of JSON.parse(before).items) {
  // The legacy `theme` item is checked against ocotillo.css by check-themes.
  if (item.name in generated || item.name === "theme" || !item.files) continue
  if (item.type === "registry:lib" || item.type === "registry:hook") continue
  const fields = readItemTokens(item, base, defaults)
  if (fields.cssVars || item.cssVars) generated[item.name] = fields
}

let after = before
for (const [name, fields] of Object.entries(generated)) {
  // Items sit at four spaces: find the one with this name and replace it.
  const at = after.indexOf(`"name": ${JSON.stringify(name)}`)
  if (at === -1) throw new Error(`registry.json has no "${name}" item`)
  const start = after.lastIndexOf("\n    {", at) + 1
  const end = after.indexOf("\n    }", at) + "\n    }".length
  const old = JSON.parse(after.slice(start, end))
  // Keep the item's key order; a new field goes in before files.
  const item = {}
  for (const [key, value] of Object.entries(old)) {
    if (key === "files") Object.assign(item, fields)
    if (!(key in fields)) item[key] = value
  }
  Object.assign(item, fields)
  after = after.slice(0, start) + "    " + format(item, 2) + after.slice(end)
}

if (after === before) {
  console.log("registry.json CSS is up to date.")
} else if (check) {
  console.error("registry.json CSS is out of date. Run: pnpm registry:build")
  process.exit(1)
} else {
  writeFileSync(registryPath, after)
  console.log("Updated the CSS in registry.json.")
}
