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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-protocol-capabilities-field.md"
sourceRel: "system-prompts/data-sdk-protocol-capabilities-field.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-protocol-capabilities-field.md"
sourceSha256: "5d2bbe8058eb460761b6978c1c9c9054c1df7c23182d7be7b2ef69e5f84f7ac0"
pageSha256: "5d2bbe8058eb460761b6978c1c9c9054c1df7c23182d7be7b2ef69e5f84f7ac0"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Protocol capabilities this CLI supports, so SDK consumers can feature-detect instead of version-sniffing. Open set — ignore unknown values; check each capability for exactly the behavior you use. 'interrupt_receipt_v1' = the interrupt control_response success payload carries still_queued (uuids of async user messages that survive the interrupt). 'interrupt_cancel_queued_v1' = the interrupt control_request honors cancel_queued:true (queued and pending-dispatch commands are cancelled alongside the abort, listed on the response's cancelled field; still_queued is then empty — including any uuid that was mid-fold at the interrupt instant, since this request also aborts and the fold never delivers it — except that a client driving a hosted session lists there what it can no longer recall: a send already in flight to that session, or the first prompt the session was created with). 'queued_notifications' = the CLI accepts inbound queued_notification stream messages and drains them via ReadNotifications (the cloud session backend reads this from the persisted init event to decide whether it may send them). Absent on older CLIs.
