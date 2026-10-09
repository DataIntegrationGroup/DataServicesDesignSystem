#!/usr/bin/env node
// Checks every theme in src/themes against the token contract (THEMING.md).
//
// - Fails if a theme is missing a contract token in its light or dark block.
// - Fails if the legacy `theme` registry item has drifted from ocotillo.css.
// - Reports WCAG contrast for the key text/background pairs and warns on any
//   pair below AA (4.5:1). With --strict, those warnings fail too.
//
// Usage: node scripts/check-themes.mjs [--strict]

import { readFileSync, readdirSync } from "node:fs"
import { join, basename } from "node:path"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("..", import.meta.url))
const themesDir = join(root, "src/themes")

// Keep in sync with THEMING.md.
const COLOR_TOKENS = [
  // Surfaces
  "background", "foreground", "card", "card-foreground", "popover", "popover-foreground",
  // Brand
  "primary", "primary-foreground", "primary-light", "primary-dark",
  "secondary", "secondary-foreground", "secondary-strong", "secondary-dark",
  // Neutral
  "muted", "muted-foreground", "accent", "accent-foreground", "border", "input", "ring",
  // Status
  "destructive", "destructive-foreground", "destructive-soft", "destructive-strong",
  "success", "success-foreground", "success-soft", "success-strong",
  "warning", "warning-foreground", "warning-soft", "warning-strong",
  "info", "info-foreground", "info-soft", "info-strong",
  // Category tones
  ...[1, 2, 3, 4, 5, 6].flatMap((n) =>
    ["", "-foreground", "-soft", "-strong"].map((s) => `tone-${n}${s}`)
  ),
  // Data
  "chart-1", "chart-2", "chart-3", "chart-4", "chart-5",
  // Sidebar
  "sidebar", "sidebar-foreground", "sidebar-primary", "sidebar-primary-foreground",
  "sidebar-accent", "sidebar-accent-foreground", "sidebar-border", "sidebar-ring",
]
// Shape and on-image tokens don't vary by mode: required in the light block
// only. Fonts are shared by every theme, in src/index.css.
const LIGHT_ONLY_TOKENS = [
  "radius",
  "on-image", "on-image-muted", "on-image-surface", "on-image-border",
  "on-image-ring", "accent-on-dark",
]

// [text, background] pairs that must meet AA for normal text.
const CONTRAST_PAIRS = [
  ["foreground", "background"],
  ["card-foreground", "card"],
  ["popover-foreground", "popover"],
  ["primary-foreground", "primary"],
  ["secondary-foreground", "secondary"],
  ["muted-foreground", "muted"],
  ["muted-foreground", "card"],
  ["accent-foreground", "accent"],
  ["destructive", "card"],
  ...["destructive", "success", "warning", "info"].flatMap((s) => [
    [`${s}-foreground`, s],
    [`${s}-strong`, `${s}-soft`],
    [`${s}-strong`, "card"],
  ]),
  ...[1, 2, 3, 4, 5, 6].flatMap((n) => [
    [`tone-${n}-foreground`, `tone-${n}`],
    [`tone-${n}-strong`, `tone-${n}-soft`],
  ]),
  // Dark brand bands
  ["on-image", "primary-dark"],
  ["on-image-muted", "primary-dark"],
  ["accent-on-dark", "primary-dark"],
  ["sidebar-foreground", "sidebar"],
  ["sidebar-primary-foreground", "sidebar-primary"],
  ["sidebar-accent-foreground", "sidebar-accent"],
]
const AA = 4.5
const strict = process.argv.includes("--strict")

/** Top-level rules of a flat CSS file: [{ selector, vars }]. */
function parseRules(css) {
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, "")
  const rules = []
  for (const m of noComments.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const vars = {}
    for (const d of m[2].matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) {
      vars[d[1]] = d[2].trim()
    }
    rules.push({ selector: m[1].trim(), vars })
  }
  return rules
}

/** Split a theme file into its light and dark token maps. */
function readTheme(file) {
  const light = {}
  const dark = {}
  for (const { selector, vars } of parseRules(readFileSync(file, "utf8"))) {
    Object.assign(/\.dark\b/.test(selector) ? dark : light, vars)
  }
  return { light, dark }
}

function parseColor(value) {
  let m = value.match(/^#([0-9a-f]{3,8})$/i)
  if (m) {
    let h = m[1]
    if (h.length <= 4) h = [...h].map((c) => c + c).join("")
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
  }
  m = value.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/i)
  if (m) return m.slice(1, 4).map(Number)
  return null
}

function luminance([r, g, b]) {
  const lin = (c) => {
    c /= 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const errors = []
const warnings = []
const files = readdirSync(themesDir).filter((f) => f.endsWith(".css")).sort()

for (const f of files) {
  const name = basename(f, ".css")
  const { light, dark } = readTheme(join(themesDir, f))
  // The light block also applies in dark mode, so dark resolves through it.
  const modes = { light, dark: { ...light, ...dark } }

  for (const t of [...COLOR_TOKENS, ...LIGHT_ONLY_TOKENS]) {
    if (!(t in light)) errors.push(`${name}: --${t} missing in light`)
  }
  for (const t of COLOR_TOKENS) {
    if (!(t in dark)) errors.push(`${name}: --${t} missing in dark`)
  }

  console.log(`\n${name}`)
  for (const [mode, vars] of Object.entries(modes)) {
    for (const [fg, bg] of CONTRAST_PAIRS) {
      if (!vars[fg] || !vars[bg]) continue
      const a = parseColor(vars[fg])
      const b = parseColor(vars[bg])
      if (!a || !b) {
        errors.push(
          `${name} ${mode}: can't parse ${!a ? vars[fg] : vars[bg]} ` +
            `(use hex or rgb() so contrast can be checked)`
        )
        continue
      }
      const ratio = contrast(a, b)
      const ok = ratio >= AA
      console.log(
        `  ${ok ? "ok  " : "FAIL"} ${mode.padEnd(5)} ${`${fg} on ${bg}`.padEnd(54)} ${ratio.toFixed(2)}:1`
      )
      if (!ok) {
        warnings.push(`${name} ${mode}: ${fg} on ${bg} is ${ratio.toFixed(2)}:1 (AA needs ${AA}:1)`)
      }
    }
  }
}

// The legacy `theme` item ships Ocotillo as cssVars; it must match the file.
const registry = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"))
const legacy = registry.items.find((i) => i.name === "theme")
if (legacy) {
  const ocotillo = readTheme(join(themesDir, "ocotillo.css"))
  for (const mode of ["light", "dark"]) {
    for (const [k, v] of Object.entries(legacy.cssVars?.[mode] ?? {})) {
      const want = ocotillo[mode][k]
      if (want !== undefined && want !== v) {
        errors.push(`registry theme item: ${mode} --${k} is ${v}, ocotillo.css has ${want}`)
      }
    }
  }
}

if (strict) errors.push(...warnings)
else if (warnings.length) {
  console.warn(`\n${warnings.length} contrast warning(s):`)
  for (const w of warnings) console.warn(`  - ${w}`)
}

if (errors.length) {
  console.error(`\n${errors.length} problem(s):`)
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}
console.log(`\nAll ${files.length} themes meet the contract.`)
