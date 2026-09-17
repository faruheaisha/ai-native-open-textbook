---
title: "Agent Skills（Addy Osmani）"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/.claude/commands/review.md"
sourceRel: ".claude/commands/review.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/.claude/commands/review.md"
sourceSha256: "8ad7da75873b430b737328d1bdd95fc8d2de4a4866737087feb4d218abe4e88f"
pageSha256: "8ad7da75873b430b737328d1bdd95fc8d2de4a4866737087feb4d218abe4e88f"
contentMode: "local-full"
zh: ""
---

# Agent Skills（Addy Osmani）

Invoke the agent-skills:code-review-and-quality skill.

Review the current changes (staged or recent commits) across all five axes:

1. **Correctness** — Does it match the spec? Edge cases handled? Tests adequate?
2. **Readability** — Clear names? Straightforward logic? Well-organized?
3. **Architecture** — Follows existing patterns? Clean boundaries? Right abstraction level?
4. **Security** — Input validated? Secrets safe? Auth checked? (Use security-and-hardening skill)
5. **Performance** — No N+1 queries? No unbounded ops? (Use performance-optimization skill)

Categorize findings as Critical, Important, or Suggestion.
Output a structured review with specific file:line references and fix recommendations.
