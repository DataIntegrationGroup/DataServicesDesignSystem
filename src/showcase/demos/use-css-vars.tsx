import { Example, ExampleWrapper } from "@/components/example"
import { useCssVars } from "@/registry/base-nova/hooks/use-css-vars"

const TOKENS = ["primary", "secondary", "success", "warning", "info"] as const

export default function UseCssVarsDemo() {
  const values = useCssVars(TOKENS)
  return (
    <ExampleWrapper>
      <Example title="Token values, re-read when the mode changes">
        <ul className="flex flex-col gap-2 text-sm">
          {TOKENS.map((token) => (
            <li key={token} className="flex items-center gap-3">
              <span
                className="size-5 rounded border"
                style={{ background: values[token] }}
              />
              <code>--{token}</code>
              <code className="text-muted-foreground">{values[token]}</code>
            </li>
          ))}
        </ul>
      </Example>
    </ExampleWrapper>
  )
}
