import { ChevronRightIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Example } from "@/showcase/example"

export default function CardInteractive() {
  return (
    <div className="grid gap-x-6 gap-y-4 md:grid-cols-2">
      <Example label="asChild interactive (whole-card link)" className="items-stretch">
        <Card asChild interactive className="h-full">
          <a href="#/card">
            <CardHeader>
              <CardTitle>Browse datasets</CardTitle>
              <CardDescription>
                Groundwater levels, water quality and well records.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto flex items-center gap-1 font-semibold text-primary">
              View datasets <ChevronRightIcon className="size-4" />
            </CardContent>
          </a>
        </Card>
      </Example>
    </div>
  )
}
