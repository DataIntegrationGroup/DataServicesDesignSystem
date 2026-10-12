// Fails when a component or registry item has no showcase demo. Upstream
// components use their installed <name>-example; everything else needs
// src/showcase/demos/<name>.tsx, or frames/<name>.tsx for full-screen ones.
import { existsSync, readdirSync, readFileSync } from "node:fs"

const registry = JSON.parse(readFileSync("registry.json", "utf8"))
const demo = (name) =>
  existsSync(`src/showcase/demos/${name}.tsx`) ||
  existsSync(`src/showcase/frames/${name}.tsx`) ||
  existsSync(`src/components/${name}-example.tsx`)

const missing = [
  ...readdirSync("src/components/ui").map((file) => file.replace(/\.tsx$/, "")),
  ...registry.items
    .filter((item) => !["registry:theme", "registry:base"].includes(item.type))
    .map((item) => item.name),
].filter((name) => !demo(name))

if (missing.length) {
  console.error(`No showcase demo for: ${missing.join(", ")}`)
  process.exit(1)
}
