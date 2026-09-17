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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-assistant-user-message-uuids-field.md"
sourceRel: "system-prompts/data-sdk-assistant-user-message-uuids-field.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-assistant-user-message-uuids-field.md"
sourceSha256: "a05cd43383110c7ef9d91b04041f4ef5a230b6fbefa68986aaca870ee52cfd56"
pageSha256: "a05cd43383110c7ef9d91b04041f4ef5a230b6fbefa68986aaca870ee52cfd56"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Client uuids of every user message whose prompt this turn has consumed so far, in consumption order — all members of a prompt batch the host merged into this one turn (several messages sent close together run as one turn whose user_message_uuid is the LAST member's), then any user message folded into the turn before this frame — so a consumer that sent any of them can bind this reply to its own send by finding its uuid anywhere in the list. Always contains user_message_uuid; at most 64 entries. Present exactly when user_message_uuid is, on the same frames; absent from older producers (fall back to user_message_uuid).
