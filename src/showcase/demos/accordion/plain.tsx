import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Example } from "@/showcase/example"

export default function AccordionPlain() {
  return (
    <>
      <Example
        label='AccordionTrigger variant="plain" (filter rail)'
        className="items-stretch"
      >
        <Accordion
          type="multiple"
          defaultValue={["topic"]}
          className="w-full max-w-xs rounded-xl border px-3"
        >
          <AccordionItem value="topic">
            <AccordionTrigger variant="plain">
              <span className="flex flex-1 items-baseline justify-between gap-3 pr-3">
                Topic
                <span className="text-xs font-normal text-muted-foreground">
                  2 selected
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-2">
              <Label className="font-normal">
                <Checkbox defaultChecked /> Water levels
              </Label>
              <Label className="font-normal">
                <Checkbox defaultChecked /> Water quality
              </Label>
              <Label className="font-normal">
                <Checkbox /> Wells
              </Label>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="agency">
            <AccordionTrigger variant="plain">
              <span className="flex flex-1 items-baseline justify-between gap-3 pr-3">
                Agency
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-2">
              <Label className="font-normal">
                <Checkbox /> NMBGMR
              </Label>
              <Label className="font-normal">
                <Checkbox /> USGS
              </Label>
              <Label className="font-normal">
                <Checkbox /> NMED
              </Label>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Example>
    </>
  )
}
