---
title: "Pairwise Skill Revision Rubric"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/researcher/rubrics/pairwise-skill-revision.md"
sourceRel: "researcher/rubrics/pairwise-skill-revision.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/researcher/rubrics/pairwise-skill-revision.md"
sourceSha256: "d0d7bc13e18175558c09a09789065bcea9e34dea2e2d574777da0d1a5de075b1"
pageSha256: "d0d7bc13e18175558c09a09789065bcea9e34dea2e2d574777da0d1a5de075b1"
contentMode: "local-full"
zh: ""
---

# Pairwise Skill Revision Rubric

Use this rubric when comparing two candidate revisions of the same skill or two competing new-skill drafts.

## Preconditions

- Both candidates use the same source evidence.
- Both candidates target the same activation scenario.
- Both candidates pass deterministic structure checks.
- Neither candidate changes the rubric used to compare it.

## Dimensions

Score each candidate independently from 0 to 2, then compare.

| Dimension | Weight | Score 2 |
| --- | --- | --- |
| Behavioral Improvement | 35% | The candidate gives future agents clearer actions, decisions, or recovery paths |
| Evidence Fidelity | 20% | Claims are grounded in retrieved sources and do not overstate evidence |
| Activation Clarity | 15% | The description and When to Activate section route the skill cleanly |
| Corpus Fit | 15% | The candidate avoids duplication and respects related skill boundaries |
| Simplicity | 15% | The candidate achieves the improvement with fewer concepts, fewer lines, and less maintenance burden |

## Tie Breakers

If totals are within 0.1:

1. Prefer the simpler candidate.
2. Prefer the candidate with fewer volatile claims in `SKILL.md`.
3. Prefer the candidate that updates an existing skill over adding a new one.
4. Prefer the candidate with clearer gotchas.
5. Route to human review if the tie remains.

## Required Output

```yaml
candidate_a:
  path: ""
  weighted_total: 0.0
  strengths: []
  risks: []
candidate_b:
  path: ""
  weighted_total: 0.0
  strengths: []
  risks: []
winner: "A | B | tie | human_review"
tie_breaker_used: ""
decision_rationale: ""
```

## Failure Modes

1. **Verbose candidate wins by judge bias**: Penalize irrelevant detail under Simplicity.
2. **Evidence drift**: Reject claims that do not map back to retrieved sources.
3. **False novelty**: Compare against existing skills before scoring either candidate.
4. **Prompt-only comparison**: Run deterministic structure checks before rubric scoring.
