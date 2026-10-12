import { createElement, lazy, type ComponentType } from "react"

import registry from "../../registry.json"
import { Frame } from "./frame"

type Module = { default: ComponentType }

export type Page = {
  slug: string
  title: string
  group: "Foundations" | "Data Services Registry" | "shadcn/ui Registry"
  description?: string
  install?: string
  docs?: string
  Demo?: ComponentType
  source?: () => Promise<string>
}

// Upstream ui files and their examples, as the CLI installed them.
const upstream = import.meta.glob("/src/components/ui/*.tsx")
const examples = import.meta.glob<Module>("/src/components/*-example.tsx")
const exampleSources = import.meta.glob<string>(
  "/src/components/*-example.tsx",
  { query: "?raw", import: "default" }
)
// Our own demos: Vite-safe stand-ins for upstream examples that need
// Next.js or the AI SDK, and one demo per Data Services item.
const demos = import.meta.glob<Module>("./demos/*.tsx")
const demoSources = import.meta.glob<string>("./demos/*.tsx", {
  query: "?raw",
  import: "default",
})
// Full-screen demos, shown in an iframe.
const frameSources = import.meta.glob<string>("./frames/*.tsx", {
  query: "?raw",
  import: "default",
})

const ACRONYMS: Record<string, string> = { otp: "OTP" }

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((word) => ACRONYMS[word] ?? word[0].toUpperCase() + word.slice(1))
    .join(" ")
}

function fileName(path: string) {
  return path.split("/").pop()!.replace(/(-example)?\.tsx$/, "")
}

function demoFor(name: string) {
  const frame = `./frames/${name}.tsx`
  if (frameSources[frame])
    return {
      Demo: () => createElement(Frame, { name }),
      source: frameSources[frame],
    }
  const own = `./demos/${name}.tsx`
  if (demos[own]) return { Demo: lazy(demos[own]), source: demoSources[own] }
  const example = `/src/components/${name}-example.tsx`
  if (examples[example])
    return { Demo: lazy(examples[example]), source: exampleSources[example] }
  return {}
}

const dataServices: Page[] = registry.items
  .filter((item) => item.type !== "registry:theme" && item.type !== "registry:base")
  .map((item) => ({
    slug: item.name,
    title: item.title,
    group: "Data Services Registry",
    description: item.description,
    install: `pnpm dlx shadcn@latest add @dataservices/${item.name}`,
    ...demoFor(item.name),
  }))

const components: Page[] = Object.keys(upstream)
  .map(fileName)
  .map((name) => ({
    slug: name,
    title: titleCase(name),
    group: "shadcn/ui Registry",
    install: `pnpm dlx shadcn@latest add ${name}`,
    docs: `https://ui.shadcn.com/docs/components/base/${name}`,
    ...demoFor(name),
  }))

export const PAGES: Page[] = [
  {
    slug: "introduction",
    title: "Introduction",
    group: "Foundations",
    description:
      "A shadcn registry for DataServices apps, and a showcase of everything an app can install from it.",
  },
  {
    slug: "colors",
    title: "Colors",
    group: "Foundations",
    description:
      "The theme's tokens. Use the theme menu in the header to compare Ocotillo and Weaver.",
  },
  {
    slug: "typography",
    title: "Typography",
    group: "Foundations",
    description:
      "The theme's fonts, and the class recipes from shadcn's Typography docs.",
  },
  ...dataServices.sort((a, b) => a.title.localeCompare(b.title)),
  ...components.sort((a, b) => a.title.localeCompare(b.title)),
]

export const GROUPS = ["Foundations", "Data Services Registry", "shadcn/ui Registry"] as const
