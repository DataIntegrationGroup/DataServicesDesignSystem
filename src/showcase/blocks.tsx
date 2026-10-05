import * as React from "react"
import { Activity, ArrowRight, Waves } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { StatusIndicator } from "@/components/ui/status-indicator"
import { Example } from "@/showcase/example"

type DetailRow = [label: string, value: React.ReactNode]

/** A label/value list: muted labels, regular-weight values, side by side
 *  on wider screens. Shared by every detail card. */
function DetailList({ rows }: { rows: DetailRow[] }) {
  return (
    <dl className="grid grid-cols-1 gap-x-4 gap-y-1.5 text-sm sm:grid-cols-[minmax(9rem,0.8fr)_1.2fr]">
      {rows.map(([label, value]) => (
        <React.Fragment key={label}>
          <dt className="text-muted-foreground">{label}</dt>
          <dd>{value}</dd>
        </React.Fragment>
      ))}
    </dl>
  )
}

/** A section inside a detail card: an eyebrow label over its content. */
function DetailSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-1.5">
      {/* A real heading for screen readers; font-sans overrides the base
          heading font so it matches other eyebrows. */}
      <h3 className="font-sans text-eyebrow uppercase text-muted-foreground">
        {title}
      </h3>
      {children}
    </section>
  )
}

/** The shared detail-card anatomy: CardHeader with icon title, description
 *  and a badge, eyebrow sections in CardContent, an action in CardFooter. */
function DetailCard({
  icon: Icon,
  title,
  description,
  badge,
  action,
  loading = false,
  children,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  title: string
  description: string
  badge?: string
  action?: React.ReactNode
  loading?: boolean
  children?: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="size-4 text-primary" aria-hidden />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
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
            {[0, 1, 2, 3].map((row) => (
              <Skeleton key={row} className="h-5 w-full" />
            ))}
          </div>
        ) : (
          children
        )}
      </CardContent>
      {action && !loading && <CardFooter>{action}</CardFooter>}
    </Card>
  )
}

const num = (value: string) => <span className="tabular-nums">{value}</span>

export function BlocksShowcase() {
  return (
    <section className="space-y-6">
      <h2>Blocks</h2>
      <p className="text-muted-foreground">
        Page sections composed from DS components, taken from the apps and
        rebuilt with standard sizes. Showcase only for now; candidates to
        publish as <code>registry:block</code> items.
      </p>

      <Example
        label="Hero (Weaver homepage): text-eyebrow · text-display · tagline, on-image tokens on a dark band"
        className="items-stretch"
      >
        <div className="rounded-xl bg-primary-dark px-8 py-12 md:px-12">
          <div className="flex max-w-3xl flex-col gap-5">
            <p className="text-eyebrow uppercase text-on-image-muted">
              Part of the New Mexico Water Data Initiative
            </p>
            <h1 className="text-display font-heading text-on-image">Weaver</h1>
            <p className="font-heading text-2xl font-semibold text-accent-on-dark md:text-3xl">
              Weaving together New Mexico water data
            </p>
          </div>
        </div>
      </Example>

      <p className="text-sm text-muted-foreground">
        Detail cards share one anatomy: <code>CardHeader</code> (icon title,
        description, badge) · eyebrow sections over label/value lists ·
        action in <code>CardFooter</code>. Only the content differs.
      </p>
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <Example label="Well detail (OcotilloUI well page)" className="items-stretch">
            <DetailCard
              icon={Activity}
              title="Monitoring"
              description="NM-0042 · Bernalillo County"
              badge="Groundwater"
              action={
                <Button variant="outline" className="w-full">
                  Open hydrograph <ArrowRight data-icon="inline-end" />
                </Button>
              }
            >
              <DetailSection title="Status">
                <DetailList
                  rows={[
                    ["Well status", <StatusIndicator status="online">Active</StatusIndicator>],
                    ["Monitoring frequency", "Monthly"],
                    ["Last visit", num("2026-09-14")],
                  ]}
                />
              </DetailSection>
              <DetailSection title="Construction">
                <DetailList
                  rows={[
                    ["Well depth", num("312.5 ft")],
                    ["Casing diameter", num("6 in")],
                    ["Completed", num("1987")],
                  ]}
                />
              </DetailSection>
              <DetailSection title="Sources">
                <DetailList
                  rows={[
                    [
                      "USGS site",
                      <a href="#blocks" className="text-primary underline underline-offset-4">
                        350412106390001
                      </a>,
                    ],
                  ]}
                />
              </DetailSection>
            </DetailCard>
          </Example>
          <Example label="Detail card, loading={true}" className="items-stretch">
            <DetailCard
              icon={Activity}
              title="Monitoring"
              description="NM-0042 · Bernalillo County"
              loading
            />
          </Example>
        </div>

        <Example label="Dataset detail (Weaver datasets page)" className="items-stretch">
          <DetailCard
            icon={Waves}
            title="Groundwater levels"
            description="Depth to water measured at monitoring wells across the state, from USGS, NMBGMR and partner agencies."
            badge="Time series"
            action={
              <Button className="w-full">
                View and filter on the map <ArrowRight data-icon="inline-end" />
              </Button>
            }
          >
            <DetailSection title="How it's calculated">
              <p className="text-sm text-muted-foreground">
                Each record is one manual or continuous measurement, reported
                in feet below land surface.
              </p>
            </DetailSection>
            <DetailSection title="Coverage">
              <DetailList
                rows={[
                  ["Updated on", num("Sep 30, 2026")],
                  ["Records", num("1,284,032")],
                  ["Monitoring wells", num("4,107")],
                ]}
              />
            </DetailSection>
            <DetailSection title="Sources">
              <DetailList
                rows={[
                  ["Federal", "USGS National Water Information System"],
                  ["State", "NM Bureau of Geology and Mineral Resources"],
                ]}
              />
            </DetailSection>
          </DetailCard>
        </Example>
      </div>
    </section>
  )
}
