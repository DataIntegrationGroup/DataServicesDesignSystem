import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Example } from "@/showcase/example"

export default function AccordionMultiple() {
  return (
    <>
      <Example label='type="multiple" defaultValue={["c"]}' className="items-stretch">
        <Accordion type="multiple" defaultValue={["c"]} className="w-full">
          <AccordionItem value="c">
            <AccordionTrigger>How do I add components?</AccordionTrigger>
            <AccordionContent>
              Run <code>npx shadcn add @dataservices/&lt;name&gt;</code>.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="d">
            <AccordionTrigger>How do I pick a theme?</AccordionTrigger>
            <AccordionContent>
              Install a theme file and set <code>data-theme</code> on{" "}
              <code>&lt;html&gt;</code>. See THEMING.md.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Example>
    </>
  )
}
