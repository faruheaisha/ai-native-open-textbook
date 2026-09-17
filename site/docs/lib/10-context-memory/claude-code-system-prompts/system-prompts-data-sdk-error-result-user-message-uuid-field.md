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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-error-result-user-message-uuid-field.md"
sourceRel: "system-prompts/data-sdk-error-result-user-message-uuid-field.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-error-result-user-message-uuid-field.md"
sourceSha256: "588dbc87e3656219dafc196b607f0229f39219f4e9a1687f8cbedcb01c804c1e"
pageSha256: "588dbc87e3656219dafc196b607f0229f39219f4e9a1687f8cbedcb01c804c1e"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Client uuid of the user message that triggered this turn (submitMessage options.uuid), echoed back so a consumer can link this error result to the send it answers — the same join key the success variant echoes, carried alone (error turns have no request_sent_wall_ms to report). A delivery-failure result from the remote-session client echoes the failed send's queue key, which is client-minted when the host sent no uuid of its own. A synthetic/scheduled (meta) turn's own uuid is echoed only when the host vouches it is the client event's own (delivered content such as a Slack owner ping or a Slack-bot observation); a meta turn that folded queued user messages in mid-turn, vouched or not, echoes the LAST of them. Absent on turns that neither had a client uuid nor folded a user message in, on session-scoped failures with no single triggering send (a crashed worker's zeroed result), and from older producers.
