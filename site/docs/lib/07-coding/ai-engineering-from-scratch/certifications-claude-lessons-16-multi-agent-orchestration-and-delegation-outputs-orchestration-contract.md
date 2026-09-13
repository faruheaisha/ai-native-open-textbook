---
title: "Orchestration Contract: Runtime Migration Decision"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/README.md"
zh: ""
---

# Orchestration Contract: Runtime Migration Decision

## Goal and Scope

Compare three migration approaches and deliver a decision brief. Research is
read-only. No agent may edit repositories, contact vendors, or select the final
architecture.

## Tasks and Dependencies

The coordinator assigns source, runtime, and risk research with non-overlapping
claim IDs. All have read-only allowed tools. Synthesis waits for every required
result to be complete or explicitly partial. Independent review waits for the
validated synthesis.

## Result States

Complete satisfies every claim field. Partial preserves valid claims and names
missing sources. Blocked names the policy, authority, or external state needed.

## Budgets

Each researcher has a budget of five sources, six tool calls, and 12 minutes.
The coordinator may re-delegate only a named gap once.

## Merge Rules

Claims merge by claim ID and provenance. Duplicate sources are collapsed;
conflict remains visible with both source versions and an escalation owner.

## Independent Review

The reviewer receives the brief, claims, evidence, and rubric in an isolated
context. It returns stable finding IDs and cannot edit the candidate brief.
