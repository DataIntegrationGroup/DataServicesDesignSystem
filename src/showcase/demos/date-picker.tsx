import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Example, ExampleWrapper } from "@/components/example"
import { DatePicker, DateRangePicker } from "@/registry/base-nova/ui/date-picker"

export default function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>()
  const [range, setRange] = React.useState<DateRange | undefined>()
  return (
    <ExampleWrapper>
      <Example title="DatePicker">
        <DatePicker value={date} onValueChange={setDate} />
      </Example>
      <Example title="DateRangePicker">
        <DateRangePicker value={range} onValueChange={setRange} />
      </Example>
      <Example title="Disabled">
        <DatePicker disabled />
      </Example>
    </ExampleWrapper>
  )
}
