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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-partial-assistant-user-message-uuid-field.md"
sourceRel: "system-prompts/data-sdk-partial-assistant-user-message-uuid-field.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-partial-assistant-user-message-uuid-field.md"
sourceSha256: "152747f94904e4521a4d7aed5b43265abde3b436d24778388b85501a2cf804c3"
pageSha256: "152747f94904e4521a4d7aed5b43265abde3b436d24778388b85501a2cf804c3"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Client uuid of the user message this turn is answering (submitMessage options.uuid), stamped on a non-ping stream event each time that send changes: the turn's FIRST non-ping stream event (normally the frame that triggers the turn's initial ack), and, for a turn started by a synthetic (meta) prompt, the first non-ping stream event after each queued user message folded in mid-turn takes the echo over (see SDKAssistantMessage.user_message_uuid for the rule) — so a consumer can bind the reply stream to the send it answers without waiting for the result. A turn started by a typed prompt stamps its first non-ping stream event only. Absent on every other stream event of the turn, on turns that neither had a client uuid nor folded a user message in, and from older producers.
