import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Combobox } from "@/components/ui/combobox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Example } from "@/showcase/example"

const sourceKinds = [
  { value: "postgres", label: "PostgreSQL" },
  { value: "oracle", label: "Oracle" },
  { value: "kafka", label: "Kafka" },
  { value: "s3", label: "Amazon S3" },
  { value: "snowflake", label: "Snowflake" },
  { value: "bigquery", label: "BigQuery" },
]

const sourceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  host: z.string().min(1, "Host is required."),
  kind: z.string().min(1, "Pick a source type."),
})

function SourceForm() {
  const form = useForm<z.infer<typeof sourceSchema>>({
    resolver: zodResolver(sourceSchema),
    defaultValues: { name: "", host: "", kind: "" },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          toast.success("Source validated", {
            description: `${values.name} · ${values.kind}`,
          })
        )}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="warehouse-prod" {...field} />
              </FormControl>
              <FormDescription>Unique identifier for the source.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="host"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Host</FormLabel>
              <FormControl>
                <Input placeholder="db.internal:5432" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kind"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kind</FormLabel>
              <FormControl>
                <Combobox
                  options={sourceKinds}
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Select source type"
                  searchPlaceholder="Search types…"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Validate &amp; connect</Button>
      </form>
    </Form>
  )
}

export default function ValidatedForm() {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example
        label="react-hook-form + zod, with a Combobox field"
        className="w-full max-w-md items-stretch"
      >
        <Card>
          <CardHeader>
            <CardTitle>Connect a data source</CardTitle>
            <CardDescription>Submit empty to see validation.</CardDescription>
          </CardHeader>
          <CardContent>
            <SourceForm />
          </CardContent>
        </Card>
      </Example>
    </div>
  )
}
