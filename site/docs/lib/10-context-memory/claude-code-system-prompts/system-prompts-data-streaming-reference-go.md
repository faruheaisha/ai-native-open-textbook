---
title: "Streaming - Go"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-streaming-reference-go.md"
sourceRel: "system-prompts/data-streaming-reference-go.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-streaming-reference-go.md"
sourceSha256: "a8d13523203cd1f0b1678d2e4d69a58299023586f0c3dd91f75d6876846848c0"
pageSha256: "a8d13523203cd1f0b1678d2e4d69a58299023586f0c3dd91f75d6876846848c0"
contentMode: "local-full"
zh: ""
---

# Streaming - Go

## Streaming

```go
stream := client.Messages.NewStreaming(context.Background(), anthropic.MessageNewParams{
    Model:     "{{OPUS_ID}}",
    MaxTokens: 64000,
    Messages: []anthropic.MessageParam{
        anthropic.NewUserMessage(anthropic.NewTextBlock("Write a haiku")),
    },
})

for stream.Next() {
    event := stream.Current()
    switch eventVariant := event.AsAny().(type) {
    case anthropic.ContentBlockDeltaEvent:
        switch deltaVariant := eventVariant.Delta.AsAny().(type) {
        case anthropic.TextDelta:
            fmt.Print(deltaVariant.Text)
        }
    }
}
if err := stream.Err(); err != nil {
    log.Fatal(err)
}
```

**Accumulating the final message** (there is no `GetFinalMessage()` on the stream):

```go
stream := client.Messages.NewStreaming(ctx, params)
message := anthropic.Message{}
for stream.Next() {
    message.Accumulate(stream.Current())
}
if err := stream.Err(); err != nil { log.Fatal(err) }
// message.Content now has the complete response
```
