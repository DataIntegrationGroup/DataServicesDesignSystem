import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Example } from "@/showcase/example"

export default function TabsFolder() {
  return (
    <div className="flex flex-col gap-4">
      <Example
        label='TabsList variant="folder" (joins a bg-card panel, on a dark band)'
        className="items-stretch"
      >
        <div className="rounded-xl bg-primary-dark p-6">
          <Tabs defaultValue="search">
            <TabsList variant="folder">
              <TabsTrigger value="search">Search data</TabsTrigger>
              <TabsTrigger value="map">Browse the map</TabsTrigger>
            </TabsList>
            <TabsContent
              value="search"
              className="rounded-tr-xl rounded-b-xl bg-card p-4 text-muted-foreground"
            >
              Search panel. The active tab merges into it.
            </TabsContent>
            <TabsContent
              value="map"
              className="rounded-tr-xl rounded-b-xl bg-card p-4 text-muted-foreground"
            >
              Map panel.
            </TabsContent>
          </Tabs>
        </div>
      </Example>
    </div>
  )
}
