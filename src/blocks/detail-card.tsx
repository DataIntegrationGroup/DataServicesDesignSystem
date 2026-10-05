import * as React from "react"
import type { LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * DetailCard block — the shared anatomy for record detail panels (a well, a
 * dataset, a station): an icon title, description and badge in the header,
 * DetailSections in the body, one action in the footer. `loading` shows
 * skeleton rows in place of the content.
 *
 *   <DetailCard icon={ActivityIcon} title="Monitoring" description="NM-0042">
 *     <DetailSection title="Status">
 *       <DetailList>…</DetailList>
 *     </DetailSection>
 *   </DetailCard>
 */
export function DetailCard({
  icon: Icon,
  title,
  description,
  badge,
  action,
  loading = false,
  className,
  children,
}: {
  icon?: LucideIcon
  title: React.ReactNode
  description?: React.ReactNode
  badge?: React.ReactNode
  action?: React.ReactNode
  loading?: boolean
  className?: string
  children?: React.ReactNode
}) {
  return (
    <Card className={className} aria-busy={loading || undefined}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {Icon && <Icon className="size-4 text-primary" aria-hidden />}
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        {badge && !loading && (
          <CardAction>
            <Badge variant="outline">{badge}</Badge>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="space-y-5">
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
        ) : (
          children
        )}
      </CardContent>
      {action && !loading && <CardFooter>{action}</CardFooter>}
    </Card>
  )
}
