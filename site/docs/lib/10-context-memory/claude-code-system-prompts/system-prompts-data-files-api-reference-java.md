---
title: "Files API - Java"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-files-api-reference-java.md"
sourceRel: "system-prompts/data-files-api-reference-java.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-files-api-reference-java.md"
sourceSha256: "06ef07e694cbfe7339947a4b008f0bd629a0d68e1026abe4a1be2dee246f0c97"
pageSha256: "06ef07e694cbfe7339947a4b008f0bd629a0d68e1026abe4a1be2dee246f0c97"
contentMode: "local-full"
zh: ""
---

# Files API - Java

## Files API

> **Out of beta.** In current SDKs `client.beta().files()` has breaking shape changes from previous versions, matching the stable `client.files()` - migrate per the Files API row in `shared/live-sources.md`. Examples below predate this.

Under `client.beta().files()`. File references in messages need the beta message types (non-beta `DocumentBlockParam.Source` has no file-ID variant).

```java
import com.anthropic.models.beta.files.FileUploadParams;
import com.anthropic.models.beta.files.FileMetadata;
import com.anthropic.models.beta.messages.BetaRequestDocumentBlock;
import com.anthropic.models.beta.messages.BetaFileDocumentSource;
import java.nio.file.Paths;

FileMetadata meta = client.beta().files().upload(
    FileUploadParams.builder()
        .file(Paths.get("/path/to/doc.pdf"))  // or .file(InputStream) or .file(byte[])
        .build());

// Reference in a beta message:
BetaRequestDocumentBlock doc = BetaRequestDocumentBlock.builder()
    .source(BetaFileDocumentSource.builder().fileId(meta.id()).build())
    .build();
```

Other methods: `.list()`, `.delete(String fileId)`, `.download(String fileId)`, `.retrieveMetadata(String fileId)`.
