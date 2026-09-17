---
title: "Files API - C"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-files-api-reference-c.md"
sourceRel: "system-prompts/data-files-api-reference-c.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-files-api-reference-c.md"
sourceSha256: "7f0b152eb17eab828d0dc8cdc8ba5933f4c27da85c666c941d26e3126eb9f076"
pageSha256: "7f0b152eb17eab828d0dc8cdc8ba5933f4c27da85c666c941d26e3126eb9f076"
contentMode: "local-full"
zh: ""
---

# Files API - C#

## Files API

> **Out of beta.** In current SDKs `client.Beta.Files` has breaking shape changes from previous versions, matching the stable `client.Files` - migrate per the Files API row in `shared/live-sources.md`. Examples below predate this.

Files live under `client.Beta.Files` (namespace `Anthropic.Models.Beta.Files`). `BinaryContent` implicit-converts from `Stream` and `byte[]`.

```csharp
using Anthropic.Models.Beta.Files;
using Anthropic.Models.Beta.Messages;

FileMetadata meta = await client.Beta.Files.Upload(
    new FileUploadParams { File = File.OpenRead("doc.pdf") });

// Referencing the uploaded file requires Beta message types:
new BetaRequestDocumentBlock {
    Source = new BetaFileDocumentSource { FileID = meta.ID },
}
```

The non-beta `DocumentBlockParamSource` union has no file-ID variant - file references need `client.Beta.Messages.Create()`.
