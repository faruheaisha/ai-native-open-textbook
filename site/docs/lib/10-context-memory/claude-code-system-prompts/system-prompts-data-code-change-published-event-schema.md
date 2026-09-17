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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-code-change-published-event-schema.md"
sourceRel: "system-prompts/data-code-change-published-event-schema.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-code-change-published-event-schema.md"
sourceSha256: "7285dcf7772de7198242b64b7b76f42f5a5d3fbf51fe92a5c11929761f4c4043"
pageSha256: "7285dcf7772de7198242b64b7b76f42f5a5d3fbf51fe92a5c11929761f4c4043"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

@internal A code change from this session went out for review (a pull/merge request, or another provider's change in internal builds). Fires when the harness sees the change published or links the session to a PR — on creation, and also when the session contributes to an existing one (gh pr edit/close/ready, gh pr checkout, a push to a branch that has an open PR) — so bind on every event, not just the first; re-emission for the same URL is possible and idempotent. Provenance: values are scraped from the command's captured output (the last PR-shaped URL printed) or a gh pr view lookup. Captured output is not only the forge CLI's own text — hook output or files printed by the same command can contribute — so treat the fields as a binding hint: display them, but verify against the forge with your own credential-scoped lookup before routing authenticated requests or trusting the host. Best-effort, not exhaustive: a crash before the link, gh printing no URL to a piped capture (gh pr merge), or an unrecognized forge means no event — keep your provider-API lookup as the source of truth and treat this as the trigger.
