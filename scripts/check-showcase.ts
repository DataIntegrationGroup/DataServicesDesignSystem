// Showcase coverage check, run by `pnpm lint`:
// - every registry item is documented by a showcase page (src/showcase/pages.ts),
// - every page file exists, component pages have demos, and every
//   <Demo name> they use exists,
// - every demo file is used by some page,
// - every demo's "Code" view can be generated (see scripts/demo-source.ts).
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join, relative } from "node:path"

import { toDisplaySource } from "./demo-source.ts"

const root = join(import.meta.dirname, "..")
const showcase = join(root, "src/showcase")
const demosDir = join(showcase, "demos")

// Registry items that are documented on the Foundations pages rather than a
// page of their own.
const FOUNDATION_ITEMS = new Set([
  "theme",
  "theme-base",
  "theme-ocotillo",
  "theme-nmwdi",
  "utils",
])

const problems: string[] = []

const registry = JSON.parse(readFileSync(join(root, "registry.json"), "utf8")) as {
  items: { name: string }[]
}
const pagesSource = readFileSync(join(showcase, "pages.ts"), "utf8")

const documented = new Set(
  [...pagesSource.matchAll(/registry: \[([^\]]*)\]/g)].flatMap((m) =>
    [...m[1].matchAll(/"([^"]+)"/g)].map((n) => n[1])
  )
)
for (const { name } of registry.items) {
  if (!documented.has(name) && !FOUNDATION_ITEMS.has(name)) {
    problems.push(`registry item "${name}" has no showcase page (add it to a page's registry in src/showcase/pages.ts)`)
  }
}

// Foundations and blocks pages render their own content; every other page
// shows its component through demos.
const PROSE_PAGES = new Set(["introduction", "colors", "typography", "blocks"])

const pageFiles = [...pagesSource.matchAll(/import\("\.\/pages\/([a-z0-9-]+)"\)/g)].map((m) => m[1])
const usedDemos = new Set<string>()
for (const slug of pageFiles) {
  const file = join(showcase, "pages", `${slug}.tsx`)
  if (!existsSync(file)) {
    problems.push(`page file src/showcase/pages/${slug}.tsx is missing`)
    continue
  }
  const demos = [...readFileSync(file, "utf8").matchAll(/<(?:Block)?Demo\s[^>]*name="([^"]+)"/g)]
  if (demos.length === 0 && !PROSE_PAGES.has(slug)) {
    problems.push(`src/showcase/pages/${slug}.tsx has no demos`)
  }
  for (const [, name] of demos) {
    usedDemos.add(name)
    if (!existsSync(join(demosDir, `${name}.tsx`))) {
      problems.push(`src/showcase/pages/${slug}.tsx uses missing demo "${name}"`)
    }
  }
}

const demoFiles = readdirSync(demosDir, { recursive: true, encoding: "utf8" })
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => f.replace(/\.tsx$/, ""))
for (const name of demoFiles) {
  const file = join(demosDir, `${name}.tsx`)
  if (!usedDemos.has(name)) problems.push(`demo ${relative(root, file)} isn't used by any page`)
  try {
    toDisplaySource(readFileSync(file, "utf8"), relative(root, file))
  } catch (error) {
    problems.push((error as Error).message)
  }
}

if (problems.length) {
  console.error(`Showcase check failed:\n${problems.map((p) => `  - ${p}`).join("\n")}`)
  process.exit(1)
}
console.log(
  `Showcase covers ${registry.items.length} registry items with ${pageFiles.length} pages and ${demoFiles.length} demos.`
)
