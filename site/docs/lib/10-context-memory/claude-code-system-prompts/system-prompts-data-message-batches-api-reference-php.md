---
title: "Message Batches - PHP"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-message-batches-api-reference-php.md"
sourceRel: "system-prompts/data-message-batches-api-reference-php.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-message-batches-api-reference-php.md"
sourceSha256: "86d682e7ee6f00a68ce18b2adb4eeec96d2a9eaa0efb5c59e8fb1a248fa5f8f5"
pageSha256: "86d682e7ee6f00a68ce18b2adb4eeec96d2a9eaa0efb5c59e8fb1a248fa5f8f5"
contentMode: "local-full"
zh: ""
---

# Message Batches - PHP

## Message Batches API

```php
$batch = $client->messages->batches->create(requests: [
    ['customId' => 'req-1', 'params' => ['model' => '{{OPUS_ID}}', 'maxTokens' => 1024, 'messages' => [...]]],
    ['customId' => 'req-2', 'params' => [...]],
]);
// Poll $client->messages->batches->retrieve($batch->id) until processingStatus === 'ended',
// then iterate $client->messages->batches->results($batch->id).
```
