import { createHighlighterCore, type HighlighterCore } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"

let highlighter: Promise<HighlighterCore> | undefined

/** TSX and shell highlighting with light and dark themes. Loaded on first use, so it
 *  stays out of the initial bundle. The dark colors apply under `.dark`
 *  (see index.css). */
export type CodeLang = "tsx" | "bash"

export async function highlight(code: string, lang: CodeLang = "tsx") {
  highlighter ??= createHighlighterCore({
    themes: [
      import("@shikijs/themes/github-light"),
      import("@shikijs/themes/github-dark"),
    ],
    langs: [import("@shikijs/langs/tsx"), import("@shikijs/langs/shellscript")],
    engine: createJavaScriptRegexEngine(),
  })
  return (await highlighter).codeToHtml(code, {
    lang: lang === "bash" ? "shellscript" : lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: "light",
  })
}
