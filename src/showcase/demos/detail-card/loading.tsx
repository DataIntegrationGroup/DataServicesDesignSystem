import { ActivityIcon } from "lucide-react"

import { DetailCard } from "@/blocks/detail-card"

export default function LoadingDetailCard() {
  return (
    <div className="mx-auto max-w-xl p-6">
      <DetailCard
        icon={ActivityIcon}
        title="Monitoring"
        description="NM-0042 · Bernalillo County"
        loading
      />
    </div>
  )
}
