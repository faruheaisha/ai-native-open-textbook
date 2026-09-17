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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-error-result-user-message-uuids-field.md"
sourceRel: "system-prompts/data-sdk-error-result-user-message-uuids-field.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-error-result-user-message-uuids-field.md"
sourceSha256: "aa6a88a4adb6c370d7f0e5c6213d5cf8725062ca61ea6ca972370c0b016fc588"
pageSha256: "aa6a88a4adb6c370d7f0e5c6213d5cf8725062ca61ea6ca972370c0b016fc588"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Client uuids of every user message whose prompt this turn consumed, in consumption order — all members of a prompt batch the host merged into this one turn (several messages sent close together run as one turn whose user_message_uuid is the LAST member's), then any queued user message folded into the running turn between tool rounds, once taken off the queue — so a consumer that sent any of them can bind this result to its own send by finding its uuid anywhere in the list. Always contains user_message_uuid; at most 64 entries; can be longer than the list on the turn's first reply frame. Present when a headless turn that ran echoes user_message_uuid; absent on delivery-failure and zeroed results and from older producers (fall back to user_message_uuid).
