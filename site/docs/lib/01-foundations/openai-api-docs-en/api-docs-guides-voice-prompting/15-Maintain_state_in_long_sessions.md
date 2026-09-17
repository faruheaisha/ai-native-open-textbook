---
title: "OpenAI API 文档（英文）"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/voice-prompting.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/voice-prompting.md"
sourceSha256: "5f08b8a5661181c66582baad274d7700e4aba37b4fd02cc2e4b41265a24ea075"
pageSha256: "3384257973616fb9e14b2fa033894aca70d79fbe8cca0cbda71b47c971fc2d13"
contentMode: "local-full"
zh: ""
---

## Maintain state in long sessions

`gpt-realtime-2` expands the realtime context window from 32k to 128k tokens, making it better suited for long sessions. For dense two-way conversations, 128k tokens is best thought of as roughly 1-2 hours of dense raw audio context. This will vary depending on tool use, internal reasoning, injected records, and other session details.

For long-context use cases, `gpt-realtime-2` performs best when it can tell what information is current, what is background, and what should be ignored if sources conflict. Do not rely on the model to infer source priority from a raw transcript or large context dump. Use structure.

Use a structured pattern when starting a session with a large amount of context, such as retrieved records, prior conversation history, policies, summaries, account notes, or background documents.

### Example long-session context template

```text
## Context

### Current State

- **Current task:** [current task]
- **Latest known state:** [current value]
- **Next safe step:** [what the assistant should do next]

### Authoritative Sources

- **Fact or record:** [fact or record]
- **Source:** [tool result / active policy / verified record]
- **Status:** current
- **Retrieved:** [date/time or this turn]

### Historical or Background Sources

- **Older fact or record:** [older fact or record]
- **Source:** [prior conversation / older record / summary]
- **Status:** stale or background
- **Note:** Do not use for current decisions if it conflicts with a current source.

### Relevant Policy or Rules

- [decision rule or constraint]

### Other Context

- [potentially useful but non-authoritative background]
```
