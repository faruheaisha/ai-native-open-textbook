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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-self-hosted-runner-deferred-shutdown-timing-notice.md"
sourceRel: "system-prompts/data-self-hosted-runner-deferred-shutdown-timing-notice.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-self-hosted-runner-deferred-shutdown-timing-notice.md"
sourceSha256: "be9a1de11b24ea40fa8b0bc9995886e36f3f916a84ebe44073d28834605fbb16"
pageSha256: "be9a1de11b24ea40fa8b0bc9995886e36f3f916a84ebe44073d28834605fbb16"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

, and the runner exits as soon as it holds no session; ${FORMAT_DURATION_FN(DEFER_SHUTDOWN_MAX_MS,{hideTrailingZeros:!0})} after the signal every remaining session is released at once and anything still attached ${FORMAT_DURATION_FN(POST_CEILING_GRACE_MS,\{hideTrailingZeros:!0\})\} later is drained. If your supervisor's stop timeout ends first, every still-attached session is killed WITHOUT its post-session hook or deregister and is requeued to another runner about a minute later. Size the stop timeout to at least $\{MATH_OBJECT.ceil((DEFER_SHUTDOWN_MAX_MS+POST_CEILING_GRACE_MS)/1000)+SHUTDOWN_BUDGET_SECONDS\}s (M + post-ceiling grace + the budget above). A second signal drains immediately.
