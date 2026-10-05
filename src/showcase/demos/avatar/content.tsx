import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import { Example } from "@/showcase/example"

export default function AvatarContent() {
  return (
    <>
      <Example label="AvatarFallback (initials)">
        <Avatar>
          <AvatarFallback>JR</AvatarFallback>
        </Avatar>
      </Example>
      <Example label="AvatarBadge">
        <Avatar size="lg">
          <AvatarFallback>DS</AvatarFallback>
          <AvatarBadge />
        </Avatar>
      </Example>
      <Example label="AvatarGroup + AvatarGroupCount">
        <AvatarGroup>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>CD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>EF</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+4</AvatarGroupCount>
        </AvatarGroup>
      </Example>
    </>
  )
}
