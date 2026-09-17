---
title: "Streaming - PHP"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-streaming-reference-php.md"
sourceRel: "system-prompts/data-streaming-reference-php.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-streaming-reference-php.md"
sourceSha256: "f6c8bb2d4c2047b778dc74de5e9fc99567d1120be408870dcfd28f7b2045b6db"
pageSha256: "f6c8bb2d4c2047b778dc74de5e9fc99567d1120be408870dcfd28f7b2045b6db"
contentMode: "local-full"
zh: ""
---

# Streaming - PHP

## Streaming

> **Requires SDK v0.5.0+.** v0.4.0 and earlier used a single `$params` array; calling with named parameters throws `Unknown named parameter $model`. Upgrade: `composer require "anthropic-ai/sdk:^0.7"`

```php
use Anthropic\Messages\RawContentBlockDeltaEvent;
use Anthropic\Messages\TextDelta;

$stream = $client->messages->createStream(
    model: '{{OPUS_ID}}',
    maxTokens: 64000,
    messages: [
        ['role' => 'user', 'content' => 'Write a haiku'],
    ],
);

foreach ($stream as $event) {
    if ($event instanceof RawContentBlockDeltaEvent && $event->delta instanceof TextDelta) {
        echo $event->delta->text;
    }
}
```
