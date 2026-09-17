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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/system-prompt-artifact-comment-result-guidance.md"
sourceRel: "system-prompts/system-prompt-artifact-comment-result-guidance.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/system-prompt-artifact-comment-result-guidance.md"
sourceSha256: "7a2e33abeda5543a3fed2334c0b3bb1b497ea67ce0c9e0838ece7a9d49caef72"
pageSha256: "7a2e33abeda5543a3fed2334c0b3bb1b497ea67ce0c9e0838ece7a9d49caef72"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Only activated threads accept replies; replies appear to viewers as "Claude · via the user". When you have finished acting on a thread, call action "resolve" with the same url and its thread_id — resolve only threads you actually addressed, and only threads that are open: a thread already marked resolved stays resolved (reply there if needed; never re-resolve it). Resolve, like reply, works only on threads activated for Claude: never call resolve on a thread marked NOT activated, even one you addressed — it stays open; tell the user which threads remain open because they are not sent to Claude, and that a writer can send one to Claude (reply on it with Send to Claude) or resolve it in the artifact view. To read one thread on its own (up to the size cap), call action "comments" with the same url and its thread_id.
