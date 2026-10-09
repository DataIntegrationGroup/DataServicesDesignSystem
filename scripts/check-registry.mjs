#!/usr/bin/env node
// Checks that what apps install from the registry matches the source.
//
// - registry.json's CSS is in sync with src/index.css and src/themes
//   (registry-css.mjs --check).
// - public/r matches a fresh `shadcn build` of registry.json, so a source
//   change can't ship without rebuilding.
// - Every package an item's files import is in its dependencies, and every
//   @/ import of another registry file is in its registryDependencies.
//
// Usage: node scripts/check-registry.mjs

import { execFileSync } from "node:child_process"
import { mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { basename, join } from "node:path"
import { fileURLToPath } from "node:url"
import ts from "typescript"

const root = fileURLToPath(new URL("..", import.meta.url))
const problems = []

try {
  execFileSync("node", [join(root, "scripts/registry-css.mjs"), "--check"], { cwd: root, stdio: "inherit" })
} catch {
  process.exit(1)
}

// public/r against a fresh build.
const built = mkdtempSync(join(tmpdir(), "dsds-registry-"))
try {
  execFileSync("pnpm", ["exec", "shadcn", "build", "-o", built], { cwd: root, stdio: "pipe" })
  const committed = join(root, "public/r")
  const names = new Set([...readdirSync(committed), ...readdirSync(built)])
  for (const name of [...names].sort()) {
    let a, b
    try { a = readFileSync(join(committed, name), "utf8") } catch { a = undefined }
    try { b = readFileSync(join(built, name), "utf8") } catch { b = undefined }
    if (a === undefined) problems.push(`public/r/${name} is missing`)
    else if (b === undefined) problems.push(`public/r/${name} is no longer in registry.json`)
    else if (a !== b) problems.push(`public/r/${name} is out of date`)
  }
} finally {
  rmSync(built, { recursive: true, force: true })
}
if (problems.length) problems.push("Run: pnpm registry:build")

// Imports against declared dependencies.
const registry = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"))
// What every app has already: React, and the cn() helper shadcn init writes.
const PROVIDED = new Set(["react", "react-dom", "@/lib/utils"])
const itemByPath = new Map()
for (const item of registry.items) {
  for (const file of item.files ?? []) itemByPath.set(file.path.replace(/^src\//, "@/").replace(/\.tsx?$/, ""), item.name)
}
const packageName = (spec) => spec.split("/").slice(0, spec.startsWith("@") ? 2 : 1).join("/")
const withoutVersion = (dep) => dep.replace(/(?<=.)@.*$/, "")

for (const item of registry.items) {
  const deps = new Set((item.dependencies ?? []).map(withoutVersion))
  const registryDeps = new Set(item.registryDependencies ?? [])
  for (const file of item.files ?? []) {
    const source = readFileSync(join(root, file.path), "utf8")
    const specs = ts.preProcessFile(source, true, true).importedFiles.map((f) => f.fileName)
    for (const spec of new Set(specs)) {
      if (PROVIDED.has(spec) || spec.startsWith(".")) continue
      if (spec.startsWith("@/")) {
        const dep = itemByPath.get(spec)
        if (!dep) problems.push(`${item.name}: imports ${spec}, which no registry item ships`)
        else if (dep !== item.name && !registryDeps.has(`@dataservices/${dep}`)) {
          problems.push(`${item.name}: imports ${spec} but doesn't list @dataservices/${dep} in registryDependencies`)
        }
      } else if (!deps.has(packageName(spec)) && !PROVIDED.has(packageName(spec))) {
        problems.push(`${item.name}: ${basename(file.path)} imports ${spec} but doesn't list ${packageName(spec)} in dependencies`)
      }
    }
  }
}

if (problems.length) {
  console.error(problems.join("\n"))
  process.exit(1)
}
console.log("public/r matches registry.json, and every item declares what it imports.")
