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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-control-cancel-request-schema.md"
sourceRel: "system-prompts/data-sdk-control-cancel-request-schema.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-control-cancel-request-schema.md"
sourceSha256: "f2fecfb25ce6dcb7847f23bb5b76b423062e800068b21422da52631ac588821c"
pageSha256: "f2fecfb25ce6dcb7847f23bb5b76b423062e800068b21422da52631ac588821c"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Tells the other side that the sender no longer needs the answer to one of its own in-flight control_requests (for example a pending can_use_tool prompt after the turn was interrupted, or one that another client already answered). Either side may send it for a request it originated. The sender stops waiting at once and ignores any control_response that still arrives for that request_id; a receiver that can abort the work does so and may still reply (typically with an error), otherwise it simply completes the request. There is no reply to the cancel itself.
