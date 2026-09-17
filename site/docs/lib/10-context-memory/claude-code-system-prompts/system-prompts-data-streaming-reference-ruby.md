---
title: "Streaming - Ruby"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-streaming-reference-ruby.md"
sourceRel: "system-prompts/data-streaming-reference-ruby.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-streaming-reference-ruby.md"
sourceSha256: "219874b9e9546ddc6ad0f5eeea7bcb74ad1c160b2ddf2b7521d41d5a2750d370"
pageSha256: "219874b9e9546ddc6ad0f5eeea7bcb74ad1c160b2ddf2b7521d41d5a2750d370"
contentMode: "local-full"
zh: ""
---

# Streaming - Ruby

## Streaming

```ruby
stream = client.messages.stream(
  model: :"{{OPUS_ID}}",
  max_tokens: 64000,
  messages: [{ role: "user", content: "Write a haiku" }]
)

stream.text.each { |text| print(text) }
```
