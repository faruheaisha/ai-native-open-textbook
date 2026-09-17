---
title: "Model Routing Policy"
sourceId: "09-harness/claude-code-harness-chachamaru"
sourceTitle: "Claude Code Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/Chachamaru127/claude-code-harness"
entryUrl: "https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/docs/model-routing-policy.md"
sourceRel: "docs/model-routing-policy.md"
rawUrl: "/raw/09-harness/claude-code-harness-chachamaru/docs/model-routing-policy.md"
sourceSha256: "0be6fd315eb5e21385b6c8ccbe26f2f94fa5c6e0d3be2ed17324780beb459359"
pageSha256: "0be6fd315eb5e21385b6c8ccbe26f2f94fa5c6e0d3be2ed17324780beb459359"
contentMode: "local-full"
zh: ""
---

# Model Routing Policy

Status: adopted
Last updated: 2026-09-05

This document defines the default model and reasoning-effort routing for
Claude Code, Codex, Cursor, and Grok in Harness workflows.

## Decision

Use explicit role tiers, not prompt-text inference.

Harness must route model and effort from the workflow role:

- `lite`: cheap, read-heavy, low-risk work
- `standard`: ordinary implementation and setup
- `worker`: Breezing implementation and retry work
- `deep`: architecture, security, cross-repo, migration, and failure recovery
- `review`: quality gates and adversarial checks
- `release`: procedural release and public-surface checks
- `long-context`: large repository or long-session context work

Do not infer effort from free-text markers such as "think harder". A caller may
still ask for one-off deeper reasoning, but durable routing belongs in config,
agent frontmatter, or wrapper arguments.

## Official Evidence

Claude Code supports model aliases and explicit model IDs. The legacy `opusplan`
alias uses Opus in plan mode and Sonnet in execution mode; the September routes
below select Fable 5.1 explicitly. Claude Code settings can pin `model`, restrict `availableModels`, and set
default alias targets through `ANTHROPIC_DEFAULT_*_MODEL` environment variables.
Official docs: https://code.claude.com/docs/en/model-config

Claude Code effort is configurable through `/effort`, `/model`, `--effort`,
`CLAUDE_CODE_EFFORT_LEVEL`, `effortLevel`, and skill/subagent frontmatter.
Frontmatter overrides the session level, while `CLAUDE_CODE_EFFORT_LEVEL`
overrides both. Official docs: https://code.claude.com/docs/en/model-config

On the verified Claude Code 2.1.261 runtime, a saved
