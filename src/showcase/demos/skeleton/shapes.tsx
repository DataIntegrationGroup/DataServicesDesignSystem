import { Skeleton } from "@/components/ui/skeleton"
import { Example } from "@/showcase/example"

export default function SkeletonShapes() {
  return (
    <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
      <Example label="avatar + text lines" className="w-72 items-stretch">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </Example>
      <Example label="card" className="w-72 items-stretch">
        <div className="space-y-3">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </Example>
    </div>
  )
}
