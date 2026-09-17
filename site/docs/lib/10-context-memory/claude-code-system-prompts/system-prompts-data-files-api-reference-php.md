---
title: "Files API - PHP"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-files-api-reference-php.md"
sourceRel: "system-prompts/data-files-api-reference-php.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-files-api-reference-php.md"
sourceSha256: "9ed315121b0551fb8f94c50c81f72c6fda3da270d89a72355e29be4bf359bc34"
pageSha256: "9ed315121b0551fb8f94c50c81f72c6fda3da270d89a72355e29be4bf359bc34"
contentMode: "local-full"
zh: ""
---

# Files API - PHP

## Files API

> **Out of beta.** In current SDKs `$client->beta->files` has breaking shape changes from previous versions, matching the stable `$client->files` - migrate per the Files API row in `shared/live-sources.md`. Example below predates this.

```php
$file = $client->beta->files->upload(
    file: fopen('upload_me.txt', 'r'),
    betas: ['files-api-2025-04-14'],
);
// Reference $file->id as a file content block on ->beta->messages->create().
```
