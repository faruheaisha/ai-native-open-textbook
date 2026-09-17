---
title: "Message Batches - C"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-message-batches-api-reference-c.md"
sourceRel: "system-prompts/data-message-batches-api-reference-c.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-message-batches-api-reference-c.md"
sourceSha256: "39b57e8d6fb763b74133979cc5dd1702c96b3fc98b2fddc87b30b6f046f00bf3"
pageSha256: "39b57e8d6fb763b74133979cc5dd1702c96b3fc98b2fddc87b30b6f046f00bf3"
contentMode: "local-full"
zh: ""
---

# Message Batches - C#

## Message Batches API

```csharp
var batch = await client.Messages.Batches.Create(new() {
    Requests = [
        new() { CustomID = "req-1", Params = new() { Model = "{{OPUS_ID}}", MaxTokens = 1024, Messages = [...] } },
    ],
});
// Poll client.Messages.Batches.Retrieve(batch.ID) until ProcessingStatus == "ended",
// then iterate client.Messages.Batches.Results(batch.ID).
```
