import * as React from "react"

import { Slider } from "@/components/ui/slider"
import { Example } from "@/showcase/example"

export default function SliderDefault() {
  const [volume, setVolume] = React.useState([40])
  return (
    <>
      <Example label="controlled value" className="w-56 items-stretch">
        <Slider
          value={volume}
          onValueChange={setVolume}
          max={100}
          step={1}
          aria-label="Throughput limit"
        />
      </Example>
      <Example label="range (two thumbs)" className="w-56 items-stretch">
        <Slider defaultValue={[20, 70]} max={100} aria-label="Range" />
      </Example>
      <Example label="disabled" className="w-56 items-stretch">
        <Slider defaultValue={[50]} disabled aria-label="Disabled" />
      </Example>
    </>
  )
}
