import { Switch } from "@/components/ui/switch"
import { Example } from "@/showcase/example"

export default function SwitchVariants() {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label="default">
        <Switch defaultChecked aria-label="default" />
      </Example>
      <Example label='size="sm"'>
        <Switch size="sm" defaultChecked aria-label="small" />
      </Example>
      <Example label='shape="square"'>
        <Switch shape="square" defaultChecked aria-label="square" />
      </Example>
      <Example label='shape="square" size="sm"'>
        <Switch shape="square" size="sm" defaultChecked aria-label="square small" />
      </Example>
      <Example label="unchecked">
        <Switch aria-label="unchecked" />
      </Example>
      <Example label="disabled">
        <Switch disabled aria-label="disabled" />
      </Example>
    </div>
  )
}
