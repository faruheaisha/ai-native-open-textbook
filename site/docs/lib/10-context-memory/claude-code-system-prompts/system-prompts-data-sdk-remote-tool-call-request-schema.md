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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-remote-tool-call-request-schema.md"
sourceRel: "system-prompts/data-sdk-remote-tool-call-request-schema.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-remote-tool-call-request-schema.md"
sourceSha256: "3b06804f84194b4e6edaee218570aaef7183f6321354eb0c43c5ba8247d12ed9"
pageSha256: "3b06804f84194b4e6edaee218570aaef7183f6321354eb0c43c5ba8247d12ed9"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

@internal One leg of a tool call this session forwards to the attached machine that announced it serves the tool: the first leg, the approval leg (envelope.approval), a detached decline, or an outcome query (envelope.op = 'outcome_of'). Answered with a control_response whose success payload is the served CallToolResult; cancelled with control_cancel_request. An error-shaped control_response is not an answer (an older attached client error-replies subtypes it does not know); the worker keeps waiting.
