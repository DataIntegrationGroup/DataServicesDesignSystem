import { Progress } from "@/components/ui/progress"
import { Example } from "@/showcase/example"

export default function ProgressValues() {
  return (
    <>
      <Example label="value={0}" className="w-48 items-stretch">
        <Progress value={0} aria-label="0%" />
      </Example>
      <Example label="value={33}" className="w-48 items-stretch">
        <Progress value={33} aria-label="33%" />
      </Example>
      <Example label="value={100}" className="w-48 items-stretch">
        <Progress value={100} aria-label="100%" />
      </Example>
    </>
  )
}
