import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Example } from "@/showcase/example"

export default function TabsVariants() {
  return (
    <>
      <Example label='TabsList variant="default"'>
        <Tabs defaultValue="levels">
          <TabsList variant="default">
            <TabsTrigger value="levels">Levels</TabsTrigger>
            <TabsTrigger value="quality">Quality</TabsTrigger>
            <TabsTrigger value="wells">Wells</TabsTrigger>
          </TabsList>
        </Tabs>
      </Example>
      <Example label='TabsList variant="line"'>
        <Tabs defaultValue="levels">
          <TabsList variant="line">
            <TabsTrigger value="levels">Levels</TabsTrigger>
            <TabsTrigger value="quality">Quality</TabsTrigger>
            <TabsTrigger value="wells">Wells</TabsTrigger>
          </TabsList>
        </Tabs>
      </Example>
    </>
  )
}
