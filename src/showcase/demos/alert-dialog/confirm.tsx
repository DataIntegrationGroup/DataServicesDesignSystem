import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Example } from "@/showcase/example"

export default function AlertDialogConfirm() {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label="confirm a destructive action">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete source</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete data source?</AlertDialogTitle>
              <AlertDialogDescription>
                This disconnects <b>warehouse-prod</b> and removes cached
                metadata. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => toast.error("Source deleted")}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Example>
    </div>
  )
}
