import { ActivityIcon, ArrowRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DetailItem, DetailList, DetailSection } from "@/components/ui/detail-list"
import { DetailCard } from "@/blocks/detail-card"

export default function WellDetailCard() {
  return (
    <div className="mx-auto max-w-xl p-6">
      <DetailCard
        icon={ActivityIcon}
        title="Monitoring"
        description="NM-0042 · Bernalillo County"
        badge="Groundwater"
        action={
          <Button variant="outline" className="w-full">
            Open hydrograph <ArrowRightIcon data-icon="inline-end" />
          </Button>
        }
      >
        <DetailSection title="Status">
          <DetailList>
            <DetailItem label="Well status">
              <Badge variant="success">Active</Badge>
            </DetailItem>
            <DetailItem label="Monitoring frequency">Monthly</DetailItem>
            <DetailItem label="Last visit">
              <span className="tabular-nums">2026-09-14</span>
            </DetailItem>
          </DetailList>
        </DetailSection>
        <DetailSection title="Construction">
          <DetailList className="tabular-nums">
            <DetailItem label="Well depth">312.5 ft</DetailItem>
            <DetailItem label="Casing diameter">6 in</DetailItem>
            <DetailItem label="Completed">1987</DetailItem>
          </DetailList>
        </DetailSection>
        <DetailSection title="Sources">
          <DetailList>
            <DetailItem label="USGS site">
              <a href="#/detail-card" className="text-primary underline underline-offset-4">
                350412106390001
              </a>
            </DetailItem>
          </DetailList>
        </DetailSection>
      </DetailCard>
    </div>
  )
}
