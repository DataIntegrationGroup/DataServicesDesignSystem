// Upstream's message-example streams from the AI SDK; this shows the same
// parts with static content so it runs without one.
import { Example, ExampleWrapper } from "@/components/example"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message"

export default function MessageExample() {
  return (
    <ExampleWrapper>
      <Example title="Conversation">
        <MessageGroup>
          <Message>
            <MessageAvatar className="size-8 text-xs">AI</MessageAvatar>
            <MessageContent>
              <MessageHeader>Assistant</MessageHeader>
              <Bubble>
                <BubbleContent>
                  Which wells should I include in the report?
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <Message align="end">
            <MessageContent>
              <Bubble align="end">
                <BubbleContent>
                  Everything sampled in Socorro County since January.
                </BubbleContent>
              </Bubble>
              <MessageFooter>Sent 2:14 PM</MessageFooter>
            </MessageContent>
          </Message>
        </MessageGroup>
      </Example>
      <Example title="Ghost">
        <Message>
          <MessageContent>
            <Bubble variant="ghost">
              <BubbleContent>
                Found 42 wells. The three with missing depth readings are
                listed at the end.
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      </Example>
    </ExampleWrapper>
  )
}
