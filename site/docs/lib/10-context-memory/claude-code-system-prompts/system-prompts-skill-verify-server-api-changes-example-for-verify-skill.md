---
title: "Verifying a server/API change"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-verify-server-api-changes-example-for-verify-skill.md"
sourceRel: "system-prompts/skill-verify-server-api-changes-example-for-verify-skill.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-verify-server-api-changes-example-for-verify-skill.md"
sourceSha256: "003ce383a9f1a5f53d01cd6f0d6a4f0573f0a627d3dd6592acd9d884dec78e9d"
pageSha256: "003ce383a9f1a5f53d01cd6f0d6a4f0573f0a627d3dd6592acd9d884dec78e9d"
contentMode: "local-full"
zh: ""
---

# Verifying a server/API change

The handle is `curl` (or equivalent). The evidence is the response.

## Pattern

1. Start the server (background, with a readiness poll - see below)
2. `curl` the route the diff touches, with inputs that hit the changed branch
3. Capture the full response (status + headers + body)
4. Compare to expected

## Lifecycle

If there's a run-skill it handles this. If not:

```bash
