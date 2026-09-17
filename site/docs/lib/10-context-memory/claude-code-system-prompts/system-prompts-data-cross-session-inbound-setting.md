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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-cross-session-inbound-setting.md"
sourceRel: "system-prompts/data-cross-session-inbound-setting.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-cross-session-inbound-setting.md"
sourceSha256: "fd0ece72c5fed5a5dc6e5cf08e499be19cad25cf8c10d8ba50068b55ef1b0692"
pageSha256: "fd0ece72c5fed5a5dc6e5cf08e499be19cad25cf8c10d8ba50068b55ef1b0692"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Inbound cross-session peer messages (SendMessage from your other sessions): 'accept' delivers them, 'hold' parks them for your review without letting Claude act, 'refuse' opts this session out. An explicit value always wins. Unset (mode parity): a message auto-delivers only when the sending session's permission-mode class matches yours (bypass↔bypass or prompting↔prompting); a mismatched sender's message is held for your approval; a sender that asserts no class is held only while this session bypasses permission prompts.
