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
//
// Only those fields of those items are rewritten; everything else in
// registry.json is left as is.
//
// Usage: node scripts/registry-css.mjs [--check]
//   --check  fail instead of writing if registry.json is out of date

import { readFileSync, readdirSync, writeFileSync } from "node:fs"
import { basename, join } from "node:path"
import postcss from "postcss"

const root = new URL("..", import.meta.url).pathname
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

function readBase() {
  const ast = postcss.parse(readFileSync(join(root, "src/index.css"), "utf8"))
  const css = {}
  let theme = {}
  for (const node of ast.nodes) {
    if (node.type !== "atrule") continue
    if (node.name === "import") {
      const path = node.params.replace(/^["']|["']$/g, "")
      if (path === "tailwindcss" || path.startsWith(".")) continue
      css[`@import ${node.params}`] = {}
    } else if (node.name === "theme" && node.params === "inline") {
      theme = toVars(node)
    } else {
      css[`@${node.name} ${node.params}`] = node.nodes ? toCssObject(node) : {}
    }
  }
  return { cssVars: { theme }, css }
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

const generated = { "theme-base": readBase() }
const themesDir = join(root, "src/themes")
for (const file of readdirSync(themesDir).filter((f) => f.endsWith(".css")).sort()) {
  generated[`theme-${basename(file, ".css")}`] = readTheme(join(themesDir, file))
}

const before = readFileSync(registryPath, "utf8")
let after = before
for (const [name, fields] of Object.entries(generated)) {
  // Items sit at four spaces: find the one with this name and replace it.
  const at = after.indexOf(`"name": ${JSON.stringify(name)}`)
  if (at === -1) throw new Error(`registry.json has no "${name}" item`)
  const start = after.lastIndexOf("\n    {", at) + 1
  const end = after.indexOf("\n    }", at) + "\n    }".length
  const item = JSON.parse(after.slice(start, end))
  delete item.cssVars
  delete item.css
  Object.assign(item, fields)
  after = after.slice(0, start) + "    " + format(item, 2) + after.slice(end)
}

if (after === before) {
  console.log("registry.json CSS is up to date.")
} else if (check) {
  console.error("registry.json CSS is out of date. Run: node scripts/registry-css.mjs")
  process.exit(1)
} else {
  writeFileSync(registryPath, after)
  console.log(`Updated ${Object.keys(generated).join(", ")} in registry.json.`)
}
