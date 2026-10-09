import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Example } from "@/showcase/example"

export default function SpinnerDemo() {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label="default">
        <Spinner />
      </Example>
      <Example label='className="size-6"'>
        <Spinner className="size-6" />
      </Example>
      <Example label="in a button">
        <Button disabled>
          <Spinner data-icon="inline-start" />
          Loading
        </Button>
      </Example>
    </div>
  )
}
