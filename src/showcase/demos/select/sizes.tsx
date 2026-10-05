import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Example } from "@/showcase/example"

export default function SelectSizes() {
  return (
    <>
      <Example label='size="default"'>
        <Select>
          <SelectTrigger className="w-48" aria-label="Source type">
            <SelectValue placeholder="Source type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="postgres">PostgreSQL</SelectItem>
            <SelectItem value="oracle">Oracle</SelectItem>
            <SelectItem value="kafka">Kafka</SelectItem>
          </SelectContent>
        </Select>
      </Example>
      <Example label='size="sm"'>
        <Select>
          <SelectTrigger size="sm" className="w-48" aria-label="Source type (small)">
            <SelectValue placeholder="Source type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="postgres">PostgreSQL</SelectItem>
            <SelectItem value="oracle">Oracle</SelectItem>
            <SelectItem value="kafka">Kafka</SelectItem>
          </SelectContent>
        </Select>
      </Example>
      <Example label='disabled'>
        <Select disabled>
          <SelectTrigger className="w-48" aria-label="Source type (disabled)">
            <SelectValue placeholder="Source type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="postgres">PostgreSQL</SelectItem>
            <SelectItem value="oracle">Oracle</SelectItem>
            <SelectItem value="kafka">Kafka</SelectItem>
          </SelectContent>
        </Select>
      </Example>
    </>
  )
}
