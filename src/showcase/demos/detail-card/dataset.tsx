import { ArrowRightIcon, WavesIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DetailItem, DetailList, DetailSection } from "@/components/ui/detail-list"
import { DetailCard } from "@/blocks/detail-card"

export default function DatasetDetailCard() {
  return (
    <div className="mx-auto max-w-xl p-6">
      <DetailCard
        icon={WavesIcon}
        title="Groundwater levels"
        description="Depth to water measured at monitoring wells across the state, from USGS, NMBGMR and partner agencies."
        badge="Time series"
        action={
          <Button className="w-full">
            View and filter on the map <ArrowRightIcon data-icon="inline-end" />
          </Button>
        }
      >
        <DetailSection title="How it's calculated">
          <p className="text-sm text-muted-foreground">
            Each record is one manual or continuous measurement, reported in
            feet below land surface.
          </p>
        </DetailSection>
        <DetailSection title="Coverage">
          <DetailList className="tabular-nums">
            <DetailItem label="Updated on">Sep 30, 2026</DetailItem>
            <DetailItem label="Records">1,284,032</DetailItem>
            <DetailItem label="Monitoring wells">4,107</DetailItem>
          </DetailList>
        </DetailSection>
        <DetailSection title="Sources">
          <DetailList>
            <DetailItem label="Federal">USGS National Water Information System</DetailItem>
            <DetailItem label="State">NM Bureau of Geology and Mineral Resources</DetailItem>
          </DetailList>
        </DetailSection>
      </DetailCard>
    </div>
  )
}
