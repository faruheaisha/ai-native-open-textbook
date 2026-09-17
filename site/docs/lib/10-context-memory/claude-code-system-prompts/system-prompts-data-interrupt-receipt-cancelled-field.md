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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-interrupt-receipt-cancelled-field.md"
sourceRel: "system-prompts/data-interrupt-receipt-cancelled-field.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-interrupt-receipt-cancelled-field.md"
sourceSha256: "051e8958bbc7334a4f8199ff9191e80aeb70c431931231d6b11b7fd661e354b6"
pageSha256: "051e8958bbc7334a4f8199ff9191e80aeb70c431931231d6b11b7fd661e354b6"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Present only when the request set cancel_queued:true — uuids of main-thread commands cancelled by this interrupt: every survivor that would otherwise have appeared under `still_queued`, including any uuid that was mid-fold at the interrupt instant (this request also aborts, so the fold never delivers it). Each listed uuid has been removed (queue-resident) or marked cancel-pending (the first-command prewait window, closed by the drain loop's backstop) and emits a terminal 'cancelled' lifecycle synchronously at the first such interrupt (a repeat interrupt over the same parked batch re-lists the uuid idempotently without re-emitting); none will run. Same coverage caveats as `still_queued` (uuid-stamped main-thread only; internally-enqueued uuids may appear). Advertised by the `interrupt_cancel_queued_v1` capability.
