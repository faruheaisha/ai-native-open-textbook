---
title: "SDD Fix-Loop Redesign Implementation Plan"
sourceId: "10-context-memory/superpowers"
sourceTitle: "Superpowers（Claude Code 技能库）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/obra/superpowers"
entryUrl: "https://github.com/obra/superpowers/blob/b36e0829c6d0140e93cfef2ca599b1b07d4a7797/README.md"
zh: ""
---

# SDD Fix-Loop Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make subagent-driven-development's review-fix loop convergent and autonomous (resume-the-implementer fix rounds, scoped re-reviews, five-round breaker, controller adjudication) and reorganize its SKILL.md by lifecycle — with quorum eval evidence.

**Architecture:** Two repos. The `superpowers` repo (branch `sdd-fix-loop-redesign`, already created; spec committed) gets the skill restructure: one new prompt template, two template edits, one reference edit, and the SKILL.md rewrite whose full text is in Task 3. The `superpowers-evals` repo (`evals/` checkout; create branch `sdd-fix-loop-scenarios` off `main`) gets two seeded-ledger fixture helpers and three scenarios, then a live before/after campaign.

**Tech Stack:** Markdown skill content; Bash scenario DSL (`story.md`/`setup.sh`/`checks.sh`); TypeScript setup-helpers on Bun (`bun test`); quorum live runs.

**Design spec:** `docs/superpowers/specs/2026-07-15-sdd-fix-loop-redesign-design.md`. Read it before starting any task.

## Global Constraints

- **Verbatim-move rule:** eval-tuned sentences from the current SKILL.md move unchanged. Only fix-policy language may be reworded, and every rewording appears in Task 3's move map. Do not "improve" moved prose.
- **Round cap:** 5 fix rounds per task. Rounds 1–3 resume the original implementer; rounds 4–5 dispatch a fresh implementer on a more capable model. Adjudication happens only at the cap; the one earlier exit is a finding that conflicts with plan text (human decides, existing behavior).
- **Ledger line formats** (exact — scenarios grep for these; `<sha7>` = 7-char short SHA):
  - `Task <N>: complete (commits <base7>..<head7>, review clean)`
  - `Task <N>: complete (commits <base7>..<head7>, <K> parked)`
  - `Task <N>: fix round <R>/5 (<X> addressed, <Y> open — <finding one-liner>[; <finding one-liner>…]; commits <a7>..<b7>)`
