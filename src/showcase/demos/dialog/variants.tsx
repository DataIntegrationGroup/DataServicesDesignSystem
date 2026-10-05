import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Example } from "@/showcase/example"

export default function DialogVariants() {
  return (
    <>
      <Example label="default (close button)">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rename data source</DialogTitle>
              <DialogDescription>
                The new name shows everywhere this source is used.
              </DialogDescription>
            </DialogHeader>
            <Input defaultValue="warehouse-prod" aria-label="Source name" />
            <DialogFooter>
              <Button>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Example>
      <Example label="showCloseButton={false}">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open dialog</Button>
          </DialogTrigger>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Delete data source?</DialogTitle>
              <DialogDescription>
                This will disconnect <b>warehouse-prod</b> and remove cached
                metadata. Cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button variant="destructive">Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Example>
    </>
  )
}
