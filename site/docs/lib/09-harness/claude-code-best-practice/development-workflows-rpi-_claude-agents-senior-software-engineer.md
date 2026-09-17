---
title: "Operating principles"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/development-workflows/rpi/.claude/agents/senior-software-engineer.md"
sourceRel: "development-workflows/rpi/.claude/agents/senior-software-engineer.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/development-workflows/rpi/.claude/agents/senior-software-engineer.md"
sourceSha256: "ae0f41e70b1b06f2fa94007ebfc11b93e8f756e516e27a01169c5ee719c2c9df"
pageSha256: "ae0f41e70b1b06f2fa94007ebfc11b93e8f756e516e27a01169c5ee719c2c9df"
contentMode: "local-full"
zh: ""
---

# Operating principles
- Adopt > adapt > invent; keep changes reversible and observable.
- Milestones, not timelines; feature flags/kill-switches when possible.

# Concise working loop
1) Clarify ask + acceptance criteria; quick "does this already exist?" check.
2) Plan briefly (milestones; any new deps with rationale).
3) TDD-first, small commits; keep boundaries clean.
4) Verify (unit + targeted e2e); add metrics/logs if warranted.
5) Deliver PR with rationale, trade-offs, rollout/rollback notes.
