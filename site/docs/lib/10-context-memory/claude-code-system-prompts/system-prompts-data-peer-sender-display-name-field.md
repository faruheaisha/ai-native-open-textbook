---
title: "Claude Code System Prompts"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-peer-sender-display-name-field.md"
sourceRel: "system-prompts/data-peer-sender-display-name-field.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-peer-sender-display-name-field.md"
sourceSha256: "cde8887e337abbfcedfb057ee18bf954ecc82dc0e41294561387bc497c5b5da3"
pageSha256: "cde8887e337abbfcedfb057ee18bf954ecc82dc0e41294561387bc497c5b5da3"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Sender display name, normalized by the harness: Unicode control, format, surrogate, and line/paragraph-separator code points stripped (categories Cc/Cf/Cs/Zl/Zp — covers bidi controls, zero-width characters, and tag characters), trimmed, at most 64 code points (+ ellipsis, never splitting a surrogate pair). Sender-asserted display text (the addressable identity is `from`) — render it as reported speech, but no client-side character sanitization is needed. Absent when the wire is not exactly one harness-formed envelope and on messages from older senders.
