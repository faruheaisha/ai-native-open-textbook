---
title: "Resource Evaluation: \"How I use Claude Code\": Boris Tane"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/docs/resource-evaluations/boris-tane-how-i-use-claude-code.md"
sourceRel: "docs/resource-evaluations/boris-tane-how-i-use-claude-code.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/docs/resource-evaluations/boris-tane-how-i-use-claude-code.md"
sourceSha256: "8e321959c795816a995d33f13bafbba29b044b488eebaf956111dcd989c9a1e2"
pageSha256: "8e321959c795816a995d33f13bafbba29b044b488eebaf956111dcd989c9a1e2"
contentMode: "local-full"
zh: ""
---

# Resource Evaluation: "How I use Claude Code": Boris Tane

**URL**: https://boristane.com/blog/how-i-use-claude-code/
**Author**: Boris Tane, Engineering Lead @ Cloudflare
**Date published**: February 2026
**Evaluation date**: 2026-02-22
**Score**: 4/5

---

## Summary

9-month practitioner account of using Claude Code in production at Cloudflare. Describes a structured plan-driven workflow with an original pattern — the **Annotation Cycle**: where human and agent iterate on a markdown plan file before any implementation begins.

---

## Scoring Grid

| Criterion | Score | Notes |
|-----------|-------|-------|
| **Novelty** | 4/5 | Annotation Cycle not documented elsewhere in the guide |
| **Author credibility** | 5/5 | Engineering Lead at Cloudflare, 9 months usage |
| **Actionability** | 4/5 | Concrete prompts, phases, examples |
| **Accuracy** | 4/5 | Consistent with Claude Code behavior (verified) |
| **Depth** | 4/5 | Practitioner insights, not surface-level tips |

**Overall: 4/5**: High value. Integrate within 1 week.

---

## Key Insights

### 1. Emphatic Research Language
Without strong signal, Claude skims. Words like "deeply", "in great detail", "intricacies" shift behavior from surface scan to thorough investigation. Output must be written to a file — verbal summaries disappear on context compaction.

### 2. The Annotation Cycle
Core innovation: iterate on `plan.md` with human annotations before any code is written. Human adds comments directly to the plan file, agent revises, repeat until no open questions remain. Typical: 1-6 iterations.

The guard prompt "do NOT implement anything yet" is critical — without it, Claude will start coding during planning.

### 3. Markdown as Shared Mutable State
Quote: "The markdown file acts as shared mutable state between you and the agent." This is the key insight — the plan file isn't just documentation, it's the coordination artifact.

### 4. Terse Feedback in Implementation Phase
Once plan is approved, implementation is mechanical. Short feedback ("that looks right", screenshots) is more effective than paragraphs — decisions are already made.

### 5. Complementary Techniques
- Cherry-picking: implement a subset of the plan
- Scope trimming: remove items before implementing
- Reference-based guidance: "do it like auth.ts"
- Revert & re-scope: `git revert` + restart with narrower plan

---

## Fact-Check

| Claim | Verified | Notes |
|-------|----------|-------|
| Emphatic language changes research depth | ✓ Plausible | Consistent with prompt engineering principles |
| Plan files survive context compaction | ✓ Accurate | Files are external to conversation |
| "Guard prompt" prevents premature implementation | ✓ Accurate | Explicit constraints work as documented |
| 1-6 annotation iterations typical | ○ Unverified | Author's personal experience, no sample size |

---

## Integration Decision

**Decision**: Integrate (Score 4) — Added as new section in `guide/workflows/plan-driven.md`.

**What was integrated**:
- Section "Advanced: Custom Markdown Plans (Boris Tane Pattern)"
- Three-phase workflow diagram (Research → Annotation Cycle → Implementation)
- Emphatic research prompts with rationale
- Annotation Cycle diagram with exit criteria
- Guard prompt example
- Phase 3 mechanical implementation guidance
- Complementary techniques table
- Decision table: `/plan` vs custom `.md`

**Cross-references added**:
- `guide/core/methodologies.md` — callout after Plan-First section
- `machine-readable/reference.yaml` — 4 entries (pattern, source, author)

---

## What Was Not Integrated

- Specific cost figures (not verifiable for general users)
- Cloudflare-specific tooling references (not generalizable)
- Exact iteration counts (too anecdotal without sample size)

---

## Attribution

> Boris Tane, Engineering Lead @ Cloudflare. Source: ["How I use Claude Code"](https://boristane.com/blog/how-i-use-claude-code/) (Feb 2026).
