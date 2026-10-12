// Upstream's message-scroller-example streams from the AI SDK; this fills
// the scroller with static messages so it runs without one.
import { Example, ExampleWrapper } from "@/components/example"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageContent } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"

const messages = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  align: i % 2 ? ("end" as const) : ("start" as const),
  text: i % 2
    ? `Reading ${i}: what changed since the last sample?`
    : `Sample ${i + 1}: water level 142.${i} ft below surface.`,
}))

export default function MessageScrollerExample() {
  return (
    <ExampleWrapper>
      <Example title="Scroll to end">
        <div className="h-80 rounded-xl border bg-background">
          <MessageScrollerProvider>
            <MessageScroller>
              <MessageScrollerViewport className="p-4">
                <MessageScrollerContent>
                  {messages.map((message) => (
                    <MessageScrollerItem key={message.id}>
                      <Message align={message.align}>
                        <MessageContent>
                          <Bubble align={message.align}>
                            <BubbleContent>{message.text}</BubbleContent>
                          </Bubble>
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  ))}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </MessageScrollerProvider>
        </div>
      </Example>
    </ExampleWrapper>
  )
}
