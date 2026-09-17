---
title: "Evaluation Pipeline Diagram"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/skills/advanced-evaluation/references/evaluation-pipeline.md"
sourceRel: "skills/advanced-evaluation/references/evaluation-pipeline.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/skills/advanced-evaluation/references/evaluation-pipeline.md"
sourceSha256: "72e95259a14db1da9ddb3b979c71e821e75aa80d729da956eaaedc94a8e9b3d2"
pageSha256: "72e95259a14db1da9ddb3b979c71e821e75aa80d729da956eaaedc94a8e9b3d2"
contentMode: "local-full"
zh: ""
---

# Evaluation Pipeline Diagram

Visual layout of a production evaluation pipeline.

```
┌─────────────────────────────────────────────────┐
│                 Evaluation Pipeline              │
├─────────────────────────────────────────────────┤
│                                                   │
│  Input: Response + Prompt + Context               │
│           │                                       │
│           ▼                                       │
│  ┌─────────────────────┐                         │
│  │   Criteria Loader   │ ◄── Rubrics, weights    │
│  └──────────┬──────────┘                         │
│             │                                     │
│             ▼                                     │
│  ┌─────────────────────┐                         │
│  │   Primary Scorer    │ ◄── Direct or Pairwise  │
│  └──────────┬──────────┘                         │
│             │                                     │
│             ▼                                     │
│  ┌─────────────────────┐                         │
│  │   Bias Mitigation   │ ◄── Position swap, etc. │
│  └──────────┬──────────┘                         │
│             │                                     │
│             ▼                                     │
│  ┌─────────────────────┐                         │
│  │ Confidence Scoring  │ ◄── Calibration         │
│  └──────────┬──────────┘                         │
│             │                                     │
│             ▼                                     │
│  Output: Scores + Justifications + Confidence     │
│                                                   │
└─────────────────────────────────────────────────┘
```

## Pipeline Stages

1. **Criteria Loader**: Loads rubrics and criterion weights from configuration
2. **Primary Scorer**: Applies direct scoring or pairwise comparison
3. **Bias Mitigation**: Runs position swaps, length normalization, and other debiasing
4. **Confidence Scoring**: Calibrates confidence based on position consistency and evidence strength
