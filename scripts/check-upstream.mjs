#!/usr/bin/env node
// Lists the unchanged shadcn components (origin "shadcn" in
// src/showcase/pages.ts) whose upstream version now differs from the copy
// in this repo, using the shadcn CLI's dry-run diff in this project's style.
// Import-only differences (where cn() comes from, "use client") are ignored.
// Informational: it needs the network and isn't part of `pnpm lint`.
//
// To take an upstream change: `pnpm exec shadcn add <name> --overwrite`,
// restore the `@/lib/utils` import, check the showcase, and commit.
//
// Usage: node scripts/check-upstream.mjs

import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("..", import.meta.url))
const registry = JSON.parse(readFileSync(new URL("../registry.json", import.meta.url), "utf8"))
const pages = readFileSync(new URL("../src/showcase/pages.ts", import.meta.url), "utf8")

const names = [...pages.matchAll(/\{\s*slug: "[^"]+",([\s\S]*?)\n {2}\}/g)]
  .filter(([, body]) => body.includes('origin: "shadcn"'))
  .flatMap(([, body]) => {
    const list = body.match(/registry: \[([^\]]*)\]/)?.[1] ?? ""
    return [...list.matchAll(/"([^"]+)"/g)].map((m) => m[1])
  })

console.log(`Comparing ${names.length} unchanged components with shadcn upstream…`)

// The CLI diffs at most five files per run, and an item's dependencies can
// fill those five before its own file. So diff each of the item's files by
// path (taken from registry.json). Diff lines come out as
// "│ │ +…" / "│ │ -…".
const changed = new Map()
const missing = []
for (const name of names) {
  const item = registry.items.find((i) => i.name === name)
  for (const { path } of item?.files ?? []) {
    const output = execFileSync(
      "pnpm",
      ["exec", "shadcn", "add", name, "--dry-run", "--diff", path],
      { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
    )
    if (output.includes("No file matching")) {
      missing.push(`${name} (${path})`)
      continue
    }
    for (const line of output.split("\n")) {
      const diff = line.match(/^│ │ ([+-])(?![+-]{2} [ab]\/)(.*)$/)
      if (!diff) continue
      const text = diff[2].trim()
      if (!text || text.startsWith("import ") || text === '"use client"') continue
      if (!changed.has(name)) changed.set(name, [])
      changed.get(name).push(`${diff[1]} ${text}`)
    }
  }
  process.stdout.write(".")
}
console.log()

const same = names.filter(
  (name) => !changed.has(name) && !missing.some((m) => m.startsWith(`${name} `))
)
console.log(`\nSame as upstream (apart from imports): ${same.join(", ") || "none"}`)
if (missing.length) {
  console.log(`\nNo upstream file to compare (item removed or renamed upstream): ${missing.join(", ")}`)
}
if (changed.size === 0) process.exit(0)
console.log("\nDiffer from upstream (- this repo, + upstream):")
for (const [name, lines] of changed) {
  console.log(`\n  ${name}`)
  for (const line of lines.slice(0, 8)) console.log(`    ${line}`)
  if (lines.length > 8) console.log(`    … ${lines.length - 8} more lines`)
}
