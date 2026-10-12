import { Suspense, useEffect, useState } from "react"

import "./showcase.css"

import type { Page } from "./pages"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function Code({ load }: { load: () => Promise<string> }) {
  const [code, setCode] = useState<string>()
  useEffect(() => {
    load().then(setCode)
  }, [load])
  if (code === undefined) return <Skeleton className="h-64" />
  return (
    <pre className="max-h-[70vh] overflow-auto rounded-lg border bg-muted p-4 text-xs">
      <code>{code}</code>
    </pre>
  )
}

export function ComponentPage({ page }: { page: Page }) {
  const { Demo } = page

  return (
    <article className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold">{page.title}</h1>
        {page.description && (
          <p className="max-w-prose text-muted-foreground">{page.description}</p>
        )}
        {page.docs && (
          <a
            className="text-sm text-primary underline underline-offset-4"
            href={page.docs}
            target="_blank"
            rel="noreferrer"
          >
            shadcn/ui docs
          </a>
        )}
        {page.install && (
          <pre className="w-fit max-w-full overflow-x-auto rounded-md bg-muted px-3 py-2 text-sm">
            <code>{page.install}</code>
          </pre>
        )}
      </header>
      {Demo && page.source && (
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent
            value="preview"
            data-showcase-preview
            className="overflow-hidden rounded-lg border"
          >
            <Suspense fallback={<Skeleton className="h-64" />}>
              <Demo />
            </Suspense>
          </TabsContent>
          <TabsContent value="code">
            <Code load={page.source} />
          </TabsContent>
        </Tabs>
      )}
    </article>
  )
}
