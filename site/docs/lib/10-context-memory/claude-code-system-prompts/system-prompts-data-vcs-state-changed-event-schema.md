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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-vcs-state-changed-event-schema.md"
sourceRel: "system-prompts/data-vcs-state-changed-event-schema.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-vcs-state-changed-event-schema.md"
sourceSha256: "af7ae227ec0e01fca7fa86431ccba574ed5a969f93ce7df9c88b420f0f3f244e"
pageSha256: "af7ae227ec0e01fca7fa86431ccba574ed5a969f93ce7df9c88b420f0f3f244e"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

@internal A harness-observed shell command mutated repository state (git commit/cherry-pick, push, merge, rebase — dry runs excluded). A cache-invalidation signal with a deliberately minimal payload: beyond classification it carries the branch acted on and the directory the shell finished in, both hints about where to look, so consumers still re-read state (head, PR status) from the repository instead of decoding the event. Derived from the same detection as the tool result's structured gitOperation data, so the two agree on what happened; only a push's `branch` is attributed more strictly here (from the push's own output section) than in that data. A compound command can emit more than one kind (a merge and a rebase in one command collapse to the latter), and a push of several branches emits one push event per branch; coalesce freely. Best-effort, not exhaustive: only foreground mutations run through the Bash/PowerShell tools are observed — a backgrounded command whose confirming output had not printed at capture time emits nothing. A foreground push whose ref lines were redirected or silenced still emits, on the invoking command's zero exit code alone (so a compound that swallows a failed push's code also emits; the event is a prompt to look, never a claim).
