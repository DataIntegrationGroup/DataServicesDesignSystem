import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/** A copyable code block. Highlights with Shiki once it loads, and shows
 *  plain text until then. */
export function CodeBlock({
  code,
  lang = "tsx",
  className,
  ...props
}: { code: string; lang?: "tsx" | "bash" } & React.ComponentProps<"div">) {
  const [html, setHtml] = React.useState<string>()
  React.useEffect(() => {
    let cancelled = false
    import("@/showcase/highlight")
      .then(({ highlight }) => highlight(code, lang))
      .then((result) => !cancelled && setHtml(result))
    return () => {
      cancelled = true
    }
  }, [code, lang])

  return (
    <div className={cn("relative rounded-lg border bg-muted/40 text-sm", className)} {...props}>
      <CopyButton value={code} className="absolute top-2 right-2" />
      {html ? (
        <div
          className="max-h-[32rem] overflow-auto p-4 font-mono [&_pre]:bg-transparent! [&_code]:text-[0.8125rem] [&_code]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="max-h-[32rem] overflow-auto p-4 font-mono text-[0.8125rem] leading-relaxed">
          <code>{code}</code>
        </pre>
      )}
    </div>
  )
}

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      className={cn("z-10 bg-background/80", className)}
      aria-label={copied ? "Copied" : "Copy code"}
      onClick={() => {
        navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  )
}
