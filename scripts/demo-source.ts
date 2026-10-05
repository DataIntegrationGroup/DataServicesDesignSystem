import { readFile } from "node:fs/promises"
import ts from "typescript"
import type { Plugin } from "vite"

/**
 * Showcase demos are small files under src/showcase/demos. Importing one with
 * `?demo-source` returns its source as a string, for the "Code" view, with the
 * showcase scaffolding taken out so the code is ready to copy:
 *
 * - `@/showcase/…` imports are dropped.
 * - `<Example label="x">…</Example>` becomes a `{/* x *\/}` comment above its
 *   children, which are outdented to match.
 *
 * Example tags must sit on their own lines (Prettier's default for any
 * element with children), so the rewrite can work line by line.
 */
export function demoSource(): Plugin {
  return {
    name: "showcase-demo-source",
    enforce: "pre",
    async load(id) {
      const [file, query] = id.split("?")
      if (query !== "demo-source") return
      this.addWatchFile(file)
      const source = await readFile(file, "utf8")
      return `export default ${JSON.stringify(toDisplaySource(source, file))}`
    },
  }
}

export function toDisplaySource(source: string, file = "demo.tsx") {
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const lines = source.split("\n")
  const lineOf = (pos: number) => sf.getLineAndCharacterOfPosition(pos).line
  const indentOf = (line: number) => lines[line].match(/^\s*/)![0]

  const replace = new Map<number, string>() // line -> new text
  const remove = new Set<number>()
  const dedent = new Array<number>(lines.length).fill(0)

  for (const statement of sf.statements) {
    if (
      ts.isImportDeclaration(statement) &&
      ts.isStringLiteral(statement.moduleSpecifier) &&
      statement.moduleSpecifier.text.startsWith("@/showcase/")
    ) {
      for (let l = lineOf(statement.getStart()); l <= lineOf(statement.getEnd()); l++) {
        remove.add(l)
      }
    }
  }

  const visit = (node: ts.Node) => {
    if (ts.isJsxElement(node) && node.openingElement.tagName.getText() === "Example") {
      const open = node.openingElement
      const close = node.closingElement
      const openStart = lineOf(open.getStart())
      const openEnd = lineOf(open.getEnd())
      const closeLine = lineOf(close.getStart())
      const ownLine = (line: number, text: string) => lines[line].trim() === text.trim()
      if (
        lines[openStart].trimStart().startsWith("<Example") === false ||
        lines[openEnd].trimEnd().endsWith(">") === false ||
        !ownLine(closeLine, close.getText()) ||
        openEnd === closeLine
      ) {
        throw new Error(
          `${file}:${openStart + 1}: put <Example> and </Example> on their own lines`
        )
      }
      const label = labelText(open.attributes)
      replace.set(openStart, label ? `${indentOf(openStart)}{/* ${label} */}` : "")
      if (!label) remove.add(openStart)
      for (let l = openStart + 1; l <= openEnd; l++) remove.add(l)
      remove.add(closeLine)
      // Children move out one level. A nested Example's own lines are inside
      // this range, so they're outdented by both.
      for (let l = openEnd + 1; l < closeLine; l++) dedent[l] += 2
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)

  const out: string[] = []
  lines.forEach((line, i) => {
    if (remove.has(i)) return
    const text = replace.get(i) ?? line
    out.push(text.replace(new RegExp(`^ {0,${dedent[i]}}`), ""))
  })
  return out
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim() + "\n"
}

function labelText(attributes: ts.JsxAttributes) {
  for (const attr of attributes.properties) {
    if (!ts.isJsxAttribute(attr) || attr.name.getText() !== "label") continue
    const init = attr.initializer
    if (!init) return undefined
    if (ts.isStringLiteral(init)) return init.text
    if (
      ts.isJsxExpression(init) &&
      init.expression &&
      (ts.isStringLiteral(init.expression) ||
        ts.isNoSubstitutionTemplateLiteral(init.expression))
    ) {
      return init.expression.text
    }
  }
  return undefined
}
