---
title: "Model Route Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.opencode/commands/model-route.md"
sourceRel: ".opencode/commands/model-route.md"
rawUrl: "/raw/09-harness/ecc/.opencode/commands/model-route.md"
sourceSha256: "9ad52439f152dd7c94c935f827bb8ef366f87c1848aefa4f054e34bd9365c500"
pageSha256: "9ad52439f152dd7c94c935f827bb8ef366f87c1848aefa4f054e34bd9365c500"
contentMode: "local-full"
zh: ""
---

# Model Route Command

Recommend the best model tier for the current task by complexity and budget.

## Usage

`/model-route [task-description] [--budget low|med|high]`

## Routing Heuristic

- `haiku`: deterministic, low-risk mechanical changes
- `sonnet`: default for implementation and refactors
- `opus`: architecture, deep review, ambiguous requirements

## Required Output

- recommended model
- confidence level
- why this model fits
- fallback model if first attempt fails

## Arguments

$ARGUMENTS:
- `[task-description]` optional free-text
- `--budget low|med|high` optional
