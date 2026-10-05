import { DetailItem, DetailList, DetailSection } from "@/components/ui/detail-list"
import { Example } from "@/showcase/example"

export default function DetailListDemo() {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label="DetailSection + DetailList + DetailItem" className="w-full max-w-lg items-stretch">
        <div className="space-y-5">
          <DetailSection title="Construction">
            <DetailList className="tabular-nums">
              <DetailItem label="Well depth">312.5 ft</DetailItem>
              <DetailItem label="Casing diameter">6 in</DetailItem>
              <DetailItem label="Completed">1987</DetailItem>
            </DetailList>
          </DetailSection>
          <DetailSection title="Sources">
            <DetailList>
              <DetailItem label="Federal">USGS National Water Information System</DetailItem>
              <DetailItem label="State">NM Bureau of Geology and Mineral Resources</DetailItem>
            </DetailList>
          </DetailSection>
        </div>
      </Example>
    </div>
  )
}
