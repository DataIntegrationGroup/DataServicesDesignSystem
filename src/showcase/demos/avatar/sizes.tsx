import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Example } from "@/showcase/example"

export default function AvatarSizes() {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label='size="sm"'>
        <Avatar size="sm">
          <AvatarImage src="https://github.com/shadcn.png" alt="" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </Example>
      <Example label='size="default"'>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </Example>
      <Example label='size="lg"'>
        <Avatar size="lg">
          <AvatarImage src="https://github.com/shadcn.png" alt="" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </Example>
    </div>
  )
}
