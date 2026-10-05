import * as React from "react"
import type { DateRange } from "react-day-picker"

import { DatePicker, DateRangePicker } from "@/components/ui/date-picker"
import { Example } from "@/showcase/example"

export default function DatePickers() {
  const [date, setDate] = React.useState<Date | undefined>()
  const [range, setRange] = React.useState<DateRange | undefined>()
  return (
    <>
      <Example label="DatePicker">
        <DatePicker value={date} onValueChange={setDate} />
      </Example>
      <Example label="DateRangePicker">
        <DateRangePicker value={range} onValueChange={setRange} />
      </Example>
      <Example label="DatePicker disabled">
        <DatePicker disabled />
      </Example>
    </>
  )
}
