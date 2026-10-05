import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Example } from "@/showcase/example"

export default function SheetSides() {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label='side="right"'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open right</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Filter sources</SheetTitle>
              <SheetDescription>
                Narrow the source list. Changes apply on close.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 p-4">
              <div className="space-y-2">
                <Label htmlFor="f-name-right">Name contains</Label>
                <Input id="f-name-right" placeholder="prod" />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="f-online-right" defaultChecked />
                <Label htmlFor="f-online-right">Online only</Label>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button>Apply</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </Example>
      <Example label='side="left"'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open left</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filter sources</SheetTitle>
              <SheetDescription>
                Narrow the source list. Changes apply on close.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 p-4">
              <div className="space-y-2">
                <Label htmlFor="f-name-left">Name contains</Label>
                <Input id="f-name-left" placeholder="prod" />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="f-online-left" defaultChecked />
                <Label htmlFor="f-online-left">Online only</Label>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button>Apply</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </Example>
      <Example label='side="top"'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open top</Button>
          </SheetTrigger>
          <SheetContent side="top">
            <SheetHeader>
              <SheetTitle>Filter sources</SheetTitle>
              <SheetDescription>
                Narrow the source list. Changes apply on close.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 p-4">
              <div className="space-y-2">
                <Label htmlFor="f-name-top">Name contains</Label>
                <Input id="f-name-top" placeholder="prod" />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="f-online-top" defaultChecked />
                <Label htmlFor="f-online-top">Online only</Label>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button>Apply</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </Example>
      <Example label='side="bottom"'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open bottom</Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>Filter sources</SheetTitle>
              <SheetDescription>
                Narrow the source list. Changes apply on close.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 p-4">
              <div className="space-y-2">
                <Label htmlFor="f-name-bottom">Name contains</Label>
                <Input id="f-name-bottom" placeholder="prod" />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="f-online-bottom" defaultChecked />
                <Label htmlFor="f-online-bottom">Online only</Label>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button>Apply</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </Example>
    </div>
  )
}
