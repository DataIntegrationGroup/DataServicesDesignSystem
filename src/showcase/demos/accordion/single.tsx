import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Example } from "@/showcase/example"

export default function AccordionSingle() {
  return (
    <>
      <Example label='type="single" collapsible' className="items-stretch">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="a">
            <AccordionTrigger>
              What is the DataServices Design System?
            </AccordionTrigger>
            <AccordionContent>
              Shared UI components for DataServices apps. Each app picks a
              theme, and every component works in every theme.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Which framework does it use?</AccordionTrigger>
            <AccordionContent>
              Vite + React + TypeScript + Tailwind v4 + shadcn/ui.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Example>
    </>
  )
}
