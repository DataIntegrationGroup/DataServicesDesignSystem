import { Stat, StatBand } from "@/components/ui/stat-band"
import { Example } from "@/showcase/example"

export default function StatBandFewer() {
  return (
    <div className="grid items-start gap-x-6 gap-y-4 md:grid-cols-2">
      <Example label="3 Stats in a half-width column (stacks)" className="items-stretch">
        <StatBand>
          <Stat value="42" label="Water levels" />
          <Stat value="31" label="Water quality" />
          <Stat value="18" label="Wells" />
        </StatBand>
      </Example>
      <Example label="2 Stats" className="items-stretch">
        <StatBand>
          <Stat value="98%" label="Uptime" />
          <Stat value="3 min" label="Median refresh" />
        </StatBand>
      </Example>
    </div>
  )
}
