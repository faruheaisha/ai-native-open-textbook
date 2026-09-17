---
title: "CCAR-F Exact Mechanics Review"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/certifications/claude/references/ccar-f-exact-mechanics.md"
sourceRel: "certifications/claude/references/ccar-f-exact-mechanics.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/certifications/claude/references/ccar-f-exact-mechanics.md"
sourceSha256: "a5f55ed5227b8a71f6d1c7ddb47ec46d8e2c65690ad8862072e3fe5c3bf6bf38"
pageSha256: "a5f55ed5227b8a71f6d1c7ddb47ec46d8e2c65690ad8862072e3fe5c3bf6bf38"
contentMode: "local-full"
zh: ""
---

# CCAR-F Exact Mechanics Review

> Use this as a dated lookup drill after you understand the architecture. It is not a substitute for building the workflows.

**Guide:** Claude Certified Architect - Foundations, version 1.0
**Guide effective:** July 2026
**Verified:** 2026-08-09

The public CCAR-F guide tests durable judgment and exact operating mechanics.
This review collects the guide's named interfaces so you can distinguish a
correct design from a plausible-looking command, path, or field. Recheck every
item against the current official guide and documentation before release.

## Agent Loop and Session State

| Mechanic | What to recall | Decision boundary |
|---|---|---|
| `stop_reason: "tool_use"` | Execute the requested tool, append the matching result, and continue | Do not infer loop state from natural-language phrases |
| `stop_reason: "end_turn"` | The model has reached the normal terminal turn | Also handle errors, limits, cancellation, and other terminal states in production |
| Tool result identity | Return each result against the originating tool-use identifier | Never join concurrent results by array position |
| Conversation state | Preserve the content blocks required for the next request | Extract durable facts outside lossy summaries |
