import type * as React from "react"

// Every demo file, keyed "button/variants" for src/showcase/demos/button/variants.tsx.
// Components load with the page; their source loads when "Code" is opened.
const components = import.meta.glob<React.ComponentType>("./demos/**/*.tsx", {
  eager: true,
  import: "default",
})
const sources = import.meta.glob<string>("./demos/**/*.tsx", {
  query: "?demo-source",
  import: "default",
})

const key = (path: string) => path.replace(/^\.\/demos\//, "").replace(/\.tsx$/, "")

export const demoComponents = Object.fromEntries(
  Object.entries(components).map(([path, component]) => [key(path), component])
)

export const demoSources = Object.fromEntries(
  Object.entries(sources).map(([path, load]) => [key(path), load])
)

// Block files (src/blocks/<name>.tsx), for the "Block source" view.
const blocks = import.meta.glob<string>("../blocks/*.tsx", {
  query: "?demo-source",
  import: "default",
})

export const blockSources = Object.fromEntries(
  Object.entries(blocks).map(([path, load]) => [
    path.replace(/^\.\.\/blocks\//, "").replace(/\.tsx$/, ""),
    load,
  ])
)
