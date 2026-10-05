import { Stat, StatBand } from "@/components/ui/stat-band"
import { Example } from "@/showcase/example"

export default function StatBandFour() {
  return (
    <>
      <Example
        label="StatBand with 4 Stats (4 columns, 2×2 or 1 by its own width)"
        className="items-stretch"
      >
        <StatBand>
          <Stat value="5,213" label="Monitoring wells" />
          <Stat value="1.2M" label="Water level measurements" />
          <Stat value="64" label="Datasets" />
          <Stat value="12" label="Partner agencies" />
        </StatBand>
      </Example>
    </>
  )
}
