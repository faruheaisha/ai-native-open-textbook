---
title: "Streaming - Java"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-streaming-reference-java.md"
sourceRel: "system-prompts/data-streaming-reference-java.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-streaming-reference-java.md"
sourceSha256: "2faa2102ac9c597bcafe9a40fcb767ee358b264b59919a2a8905f951e77d6992"
pageSha256: "2faa2102ac9c597bcafe9a40fcb767ee358b264b59919a2a8905f951e77d6992"
contentMode: "local-full"
zh: ""
---

# Streaming - Java

## Streaming

```java
import com.anthropic.core.http.StreamResponse;
import com.anthropic.models.messages.RawMessageStreamEvent;

MessageCreateParams params = MessageCreateParams.builder()
    .model("{{OPUS_ID}}")
    .maxTokens(64000L)
    .addUserMessage("Write a haiku")
    .build();

try (StreamResponse<RawMessageStreamEvent> streamResponse = client.messages().createStreaming(params)) {
    streamResponse.stream()
        .flatMap(event -> event.contentBlockDelta().stream())
        .flatMap(deltaEvent -> deltaEvent.delta().text().stream())
        .forEach(textDelta -> System.out.print(textDelta.text()));
}
```
