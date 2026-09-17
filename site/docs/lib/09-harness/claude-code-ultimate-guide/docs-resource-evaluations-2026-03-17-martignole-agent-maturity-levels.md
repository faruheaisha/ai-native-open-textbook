---
title: "Resource Evaluation: Martignole Agent Adoption Maturity Levels"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/docs/resource-evaluations/2026-03-17-martignole-agent-maturity-levels.md"
sourceRel: "docs/resource-evaluations/2026-03-17-martignole-agent-maturity-levels.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/docs/resource-evaluations/2026-03-17-martignole-agent-maturity-levels.md"
sourceSha256: "0d34687e32fc24fc4a0f1dbab31f76def958c923f4853ec52c39107b9d5c4929"
pageSha256: "0d34687e32fc24fc4a0f1dbab31f76def958c923f4853ec52c39107b9d5c4929"
contentMode: "local-full"
zh: ""
---

# Resource Evaluation: Martignole Agent Adoption Maturity Levels

**Date**: 2026-03-17
**Evaluator**: Claude Code Ultimate Guide team
**Score**: 3/5 — Integrated

---

## Resource

- **URL**: https://www.touilleur-express.fr/2026/03/17/decouvrir-les-niveaux-de-maturite-de-ladoption-des-coding-agents
- **Author**: Nicolas Martignole, Principal Engineer at Back Market, Le Touilleur Express blog
- **Type**: Practitioner framework / blog post
- **Language**: French

## Summary

6-level maturity framework (0-5 in the original, extended to 6 here) for individual developers adopting coding agents. The real contribution is the Level 3-5 arc: basic user → stage delegator → context engineer → orchestrator. Maps cleanly onto Claude Code concepts (Plan mode, sub-agents, MCP servers, context engineering).

## Score Justification

**3/5 — Pertinent complement**

- Fills a real gap: no individual self-placement scale existed in the guide
- Practitioner source (production engineering context), not a blogger opinion piece
- Zero empirical data behind the levels — one engineer's taxonomy
- Levels 0-2 are noise for the guide's audience (already using Claude Code)
- ThoughtWorks occupies the "maturity model" reference slot; Martignole's upper levels are more Claude Code-specific

## Integration

Adapted into `guide/roles/learning-with-ai.md` as a "Where Are You on the Agent Adoption Curve?" section (inserted before the 30-Day Progression Plan). The level descriptions were extended (6 levels vs 5 in the original) and diagnostic questions added. Attribution and source link included.

## Fact-Check Notes

- Author identity and role: confirmed via LinkedIn
- "~5% manual coding at Level 3+": practitioner estimate, not empirical — used as illustrative signal
- "Free Claude Code Architect certification by Anthropic": not verifiable, not reproduced in the guide
- Article date 2026-03-17: confirmed from URL

## Decision

**Integrated**: adapted content added to `learning-with-ai.md`. Not a verbatim reproduction; the framework was restructured and extended for the guide's English-speaking, already-technical audience.
