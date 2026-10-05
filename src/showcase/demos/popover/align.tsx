import { BellIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Example } from "@/showcase/example"

export default function PopoverAlign() {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label='align="start"'>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <BellIcon /> Notifications
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <div className="space-y-2">
              <div className="font-semibold">3 unread</div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>warehouse-prod resync complete</li>
                <li>API key rotates in 7 days</li>
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      </Example>
      <Example label='align="center"'>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <BellIcon /> Notifications
            </Button>
          </PopoverTrigger>
          <PopoverContent align="center">
            <div className="space-y-2">
              <div className="font-semibold">3 unread</div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>warehouse-prod resync complete</li>
                <li>API key rotates in 7 days</li>
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      </Example>
      <Example label='align="end"'>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <BellIcon /> Notifications
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <div className="space-y-2">
              <div className="font-semibold">3 unread</div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>warehouse-prod resync complete</li>
                <li>API key rotates in 7 days</li>
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      </Example>
    </div>
  )
}
