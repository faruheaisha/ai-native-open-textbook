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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-footer-indicator-schema.md"
sourceRel: "system-prompts/data-sdk-footer-indicator-schema.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-footer-indicator-schema.md"
sourceSha256: "e68b7990e5a0d4a6b51468e608b08564a63ac9e46c761a4586e5103d12313793"
pageSha256: "e68b7990e5a0d4a6b51468e608b08564a63ac9e46c761a4586e5103d12313793"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

@internal The server-configured session indicator (bootstrap client_data.footer_indicator) that the terminal renders as a "◆ &lt;text>" pill in the prompt footer — an opaque status note operators set per cohort (e.g. to prove a test config reached the session). Carried on `system/init` and the `initialize` response so a host UI (Claude Desktop, IDE webviews) can render the same pill. Absent when nothing is configured; hosts should then render nothing. Read from the CLI's cached bootstrap data, so a label configured after that cache was last written first appears on a later `system/init`.
