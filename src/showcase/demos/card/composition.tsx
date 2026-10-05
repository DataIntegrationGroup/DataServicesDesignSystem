import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Example } from "@/showcase/example"

export default function CardComposition() {
  return (
    <div className="grid items-start gap-x-6 gap-y-4 md:grid-cols-2">
      <Example
        label="CardHeader + CardContent + CardFooter"
        className="items-stretch"
      >
        <Card>
          <CardHeader>
            <CardTitle>Connect a data source</CardTitle>
            <CardDescription>
              Provide credentials to register a new source.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="card-host">Host</Label>
            <Input id="card-host" placeholder="db.internal:5432" />
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button variant="ghost">Cancel</Button>
            <Button>Connect</Button>
          </CardFooter>
        </Card>
      </Example>
      <Example label="CardContent only" className="items-stretch">
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">
            A plain surface for grouped content.
          </CardContent>
        </Card>
      </Example>
    </div>
  )
}
