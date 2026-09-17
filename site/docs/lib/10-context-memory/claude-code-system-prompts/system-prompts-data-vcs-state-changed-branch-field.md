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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-vcs-state-changed-branch-field.md"
sourceRel: "system-prompts/data-vcs-state-changed-branch-field.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-vcs-state-changed-branch-field.md"
sourceSha256: "c02391d1c1465829abd700ee608061fd861ea31d5b8f163731efee8162a8b192"
pageSha256: "c02391d1c1465829abd700ee608061fd861ea31d5b8f163731efee8162a8b192"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

The branch a commit landed on (from the commit summary line git prints per commit) or a push updated (from the ref-update line git prints per pushed ref, e.g. `HEAD -> other`). Commit and push events carry it; a command that pushed several branches emits one push event per branch. A best-effort hint: absent whenever attribution is uncertain (a push whose output was redirected still emits, with no branch; a push that also updated a ref whose name could not be carried emits a nameless event beside the named ones), and never a required key.
