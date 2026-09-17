---
title: "Evaluation Reference: Metrics and Implementation"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/skills/evaluation/references/metrics.md"
sourceRel: "skills/evaluation/references/metrics.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/skills/evaluation/references/metrics.md"
sourceSha256: "342db4111af7a627ea1ce90ac17a637d553ee3b8bcbcc3017b4cbc0c7695a4a8"
pageSha256: "342db4111af7a627ea1ce90ac17a637d553ee3b8bcbcc3017b4cbc0c7695a4a8"
contentMode: "local-full"
zh: ""
---

# Evaluation Reference: Metrics and Implementation

This document provides implementation details for evaluation metrics and evaluation systems.

## Core Metric Definitions

### Factual Accuracy

Factual accuracy measures whether claims in agent output match ground truth.

```
Excellent (1.0): All claims verified against ground truth, no errors
Good (0.8): Minor errors that do not affect main conclusions
Acceptable (0.6): Major claims correct, minor inaccuracies present
Poor (0.3): Significant factual errors in key claims
Failed (0.0): Fundamental factual errors that invalidate output
```

Calculation approach:
- Extract claims from output
- Verify each claim against ground truth
- Weight claims by importance (major claims more weight)
- Calculate weighted average of claim accuracy

### Completeness

Completeness measures whether output covers all requested aspects.

```
Excellent (1.0): All requested aspects thoroughly covered
Good (0.8): Most aspects covered with minor gaps
Acceptable (0.6): Key aspects covered, some gaps
Poor (0.3): Major aspects missing from output
Failed (0.0): Fundamental aspects not addressed
```
