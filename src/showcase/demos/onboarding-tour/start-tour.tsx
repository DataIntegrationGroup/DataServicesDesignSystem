import * as React from "react"

import { Button } from "@/components/ui/button"
import { OnboardingTour, type TourStep } from "@/components/onboarding-tour"
import { Example } from "@/showcase/example"

const TOUR_STORAGE_KEY = "dsds-showcase-tour"

const TOUR_STEPS: TourStep[] = [
  {
    title: "Pick a theme",
    body: "Every component follows the theme set on <html>. Switch it here.",
    target: "[data-tour=theme]",
    place: "bottom",
  },
  {
    title: "Light or dark",
    body: "Each theme defines both modes. Toggle them here.",
    target: "[data-tour=mode]",
    place: "left",
  },
]

export default function OnboardingTourExample() {
  const [run, setRun] = React.useState(0)
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label='OnboardingTour steps={…} storageKey="dsds-showcase-tour"'>
        <Button
          variant="outline"
          onClick={() => {
            // The steps point at the header, so bring it into view.
            window.scrollTo({ top: 0 })
            localStorage.removeItem(TOUR_STORAGE_KEY)
            setRun((n) => n + 1)
          }}
        >
          Start tour
        </Button>
      </Example>
      {run > 0 && (
        <OnboardingTour key={run} steps={TOUR_STEPS} storageKey={TOUR_STORAGE_KEY} />
      )}
    </div>
  )
}
