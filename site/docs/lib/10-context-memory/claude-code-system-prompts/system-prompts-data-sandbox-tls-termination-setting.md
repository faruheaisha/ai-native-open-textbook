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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sandbox-tls-termination-setting.md"
sourceRel: "system-prompts/data-sandbox-tls-termination-setting.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sandbox-tls-termination-setting.md"
sourceSha256: "3fa0dfbf16f87bf65cfdda02b66fa4a612f33c70e4e80bbfb83eb7bd91040a3f"
pageSha256: "3fa0dfbf16f87bf65cfdda02b66fa4a612f33c70e4e80bbfb83eb7bd91040a3f"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

[EXPERIMENTAL] Enable in-process TLS termination so the per-request filter can see HTTPS request bodies. Provide a CA cert+key, or omit both to have sandbox-runtime generate an ephemeral one for the session. On native Windows an ephemeral CA cannot pass the sandbox trust check, so omitting the paths uses a persistent CA managed by the sandbox runtime (set up and trusted via /sandbox install); configured paths are passed to the sandbox runtime verbatim, which rejects a bad or incomplete pair at sandbox initialization.
