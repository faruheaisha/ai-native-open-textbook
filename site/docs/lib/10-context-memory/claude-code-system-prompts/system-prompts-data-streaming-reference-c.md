---
title: "Streaming - C"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-streaming-reference-c.md"
sourceRel: "system-prompts/data-streaming-reference-c.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-streaming-reference-c.md"
sourceSha256: "a5b72d8e1d67d7d2fb83340eab7db3d43fbc9760bf7cf11eb97f341facd3ff79"
pageSha256: "a5b72d8e1d67d7d2fb83340eab7db3d43fbc9760bf7cf11eb97f341facd3ff79"
contentMode: "local-full"
zh: ""
---

# Streaming - C#

## Streaming

```csharp
using Anthropic.Models.Messages;

var parameters = new MessageCreateParams
{
    Model = "{{OPUS_ID}}",
    MaxTokens = 64000,
    Messages = [new() { Role = Role.User, Content = "Write a haiku" }]
};

await foreach (RawMessageStreamEvent streamEvent in client.Messages.CreateStreaming(parameters))
{
    if (streamEvent.TryPickContentBlockDelta(out var delta) &&
        delta.Delta.TryPickText(out var text))
    {
        Console.Write(text.Text);
    }
}
```

**`RawMessageStreamEvent` TryPick methods** (naming drops the `Message`/`Raw` prefix): `TryPickStart`, `TryPickDelta`, `TryPickStop`, `TryPickContentBlockStart`, `TryPickContentBlockDelta`, `TryPickContentBlockStop`. There is no `TryPickMessageStop` - use `TryPickStop`.
