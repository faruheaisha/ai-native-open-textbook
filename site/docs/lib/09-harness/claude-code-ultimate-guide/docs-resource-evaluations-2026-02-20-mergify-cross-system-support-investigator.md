---
title: "Resource Evaluation: Mergify: Cross-System Support Investigator"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/docs/resource-evaluations/2026-02-20-mergify-cross-system-support-investigator.md"
sourceRel: "docs/resource-evaluations/2026-02-20-mergify-cross-system-support-investigator.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/docs/resource-evaluations/2026-02-20-mergify-cross-system-support-investigator.md"
sourceSha256: "b1efe807b84f5a9b32ab42773cc788ad1571d0d2eccb1bce3cd43e0eb4105f57"
pageSha256: "b1efe807b84f5a9b32ab42773cc788ad1571d0d2eccb1bce3cd43e0eb4105f57"
contentMode: "local-full"
zh: ""
---

# Resource Evaluation: Mergify: Cross-System Support Investigator

**Date**: 2026-02-20
**Evaluator**: Claude (eval-resource skill)
**Score**: 4/5
**Action**: Integrated

---

## Source

- **URL**: https://mergify.com/blog/how-we-turned-claude-into-a-cross-system-support-investigator
- **Author**: Julian Maurin (Mergify)
- **Date**: November 2025
- **Type**: Engineering blog post / production case study

---

## Summary

Mergify built a support ticket investigation system combining Claude Code as orchestrator with 5 custom MCP servers (Datadog, Sentry, PostgreSQL, Linear, GitHub). The system executes parallel queries across all systems and produces a structured report for human review.

Key results (self-reported): triage time reduced from ~15 min → <5 min; 75% first-pass accuracy.

---

## Scoring

| Criterion | Assessment |
|-----------|-----------|
| Relevance to guide | High — fills gap on MCP operational orchestration |
| Novelty vs. existing content | High — "Claude Code as ops runtime" not covered |
| Production evidence | Medium — self-reported metrics, no public repo |
| Technical depth | Medium — architecture clear, code not published |
| Source reliability | Medium — company blog (potential marketing bias) |

**Final score: 4/5**

---

## Integration

- **Where**: `guide/ultimate-guide.md` — §8.4 Server Selection Guide → "Combining Servers" → new subsection "Production Case Study: Multi-System Support Investigator"
- **Angle**: Claude Code as operational orchestrator (ops/support use case, not dev tool)
- **Key addition**: Architecture diagram, parallel fan-out pattern, design decisions, results with caveat

---

## Fact-Check

| Claim | Status | Notes |
|-------|--------|-------|
| Author: Julian Maurin | ✅ | Confirmed via Perplexity deep research |
| Date: November 2025 | ✅ | Confirmed |
| 5 systems: Datadog, Sentry, PostgreSQL, Linear, GitHub | ✅ | Confirmed |
| Triage: 15 min → <5 min | ⚠️ | Self-reported, not independently verified |
| First-pass accuracy: 75% | ⚠️ | Self-reported, same caveat |
| Architecture: MCP + parallel execution | ✅ | Consistent with MCP ecosystem |

Metrics are presented in the guide with "self-reported" caveat.

---

## Challenge Notes (technical-writer agent)

- Score 4/5 confirmed
- 75% accuracy = 25% still need human follow-up → presented as "assistance", not "automation"
- Source bias noted (Mergify sells CI/CD automation, article serves their brand)
- Real value: "orchestrateur stateful avec MCP adaptateurs" pattern, distinct from all existing guide cases
- Risk of non-integration: moderate — guide will lag on ops/support angle as similar cases multiply
