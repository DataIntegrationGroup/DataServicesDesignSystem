import { StatusIndicator } from "@/components/ui/status-indicator"
import { Example } from "@/showcase/example"

export default function StatusIndicatorStatuses() {
  return (
    <>
      <Example label='status="online"'>
        <StatusIndicator status="online">online</StatusIndicator>
      </Example>
      <Example label='status="degraded"'>
        <StatusIndicator status="degraded">degraded</StatusIndicator>
      </Example>
      <Example label='status="offline"'>
        <StatusIndicator status="offline">offline</StatusIndicator>
      </Example>
      <Example label='status="error"'>
        <StatusIndicator status="error">error</StatusIndicator>
      </Example>
      <Example label='status="info"'>
        <StatusIndicator status="info">info</StatusIndicator>
      </Example>
      <Example label='status="pending"'>
        <StatusIndicator status="pending">pending</StatusIndicator>
      </Example>
      <Example label='status="degraded" pulse'>
        <StatusIndicator status="degraded" pulse>
          syncing
        </StatusIndicator>
      </Example>
      <Example label="no label (bare dot)">
        <StatusIndicator status="online" aria-label="online" />
      </Example>
    </>
  )
}
