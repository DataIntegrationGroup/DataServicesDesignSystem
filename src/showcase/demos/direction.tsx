// Upstream ships no direction example. DirectionProvider tells Base UI
// components which way text runs; here a slider fills from the right.
import { Example, ExampleWrapper } from "@/components/example"
import { DirectionProvider } from "@/components/ui/direction"
import { Slider } from "@/components/ui/slider"

export default function DirectionDemo() {
  return (
    <ExampleWrapper>
      <Example title="Left to right">
        <Slider defaultValue={[30]} />
      </Example>
      <Example title="Right to left">
        <DirectionProvider direction="rtl">
          <div dir="rtl">
            <Slider defaultValue={[30]} />
          </div>
        </DirectionProvider>
      </Example>
    </ExampleWrapper>
  )
}
