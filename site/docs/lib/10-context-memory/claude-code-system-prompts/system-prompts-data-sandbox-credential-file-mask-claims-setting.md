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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sandbox-credential-file-mask-claims-setting.md"
sourceRel: "system-prompts/data-sandbox-credential-file-mask-claims-setting.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sandbox-credential-file-mask-claims-setting.md"
sourceSha256: "da7fe0d1d896d2e9c92a59cc5a9fc8bec4823fcc713c6416cca52bb5081b4e86"
pageSha256: "da7fe0d1d896d2e9c92a59cc5a9fc8bec4823fcc713c6416cca52bb5081b4e86"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Names of top-level payload claims to mask inside each decoded value, instead of replacing the whole token. Each named claim present with a string value gets its own sentinel and the token is rebuilt around the modified payload; all other claims are preserved so a tool that decodes the token and reads a non-secret claim keeps working. Requires `decode`. If no named claim matches in any verified token, behavior is governed by `onExtractNoMatch` (default `warn`). Only meaningful when mode is `mask`; accepted but ignored for `deny`.
