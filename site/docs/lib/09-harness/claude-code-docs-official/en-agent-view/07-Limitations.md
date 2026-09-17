---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/agent-view.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-view.md"
sourceSha256: "b77a9b549bf450a86bfbd7947ccc8bdd95b574bc0e043fa6fd281fc792690b1f"
pageSha256: "461c0d34558130314e7a18a5d7c2c8bc3dff222f6de16f1ff7887efe2e34cae5"
contentMode: "local-full"
zh: ""
---

## Limitations

Agent view is in research preview with the following limitations:

* **Rate limits apply**: background sessions consume your subscription usage the same as interactive sessions, so running ten agents in parallel uses quota roughly ten times as fast as running one.
* **Sessions are local**: background sessions run on your machine. They are preserved across sleep but stop if the machine shuts down.
* **Claude-created worktrees are deleted with the session in agent view**: commit changes before deleting a session that edited files in its own worktree. [Some deletes keep the worktree instead](#what-deleting-a-session-removes).
