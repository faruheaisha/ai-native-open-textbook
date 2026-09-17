---
title: "Content Classifier Integration"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/19-capstone-projects/85-content-classifier-integration/outputs/skill-content-classifier-integration.md"
sourceRel: "phases/19-capstone-projects/85-content-classifier-integration/outputs/skill-content-classifier-integration.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/19-capstone-projects/85-content-classifier-integration/outputs/skill-content-classifier-integration.md"
sourceSha256: "87310f7674065195a28e6b1f1e3b8fe0fb42ac43c07d640e563729fcbd4466b9"
pageSha256: "87310f7674065195a28e6b1f1e3b8fe0fb42ac43c07d640e563729fcbd4466b9"
contentMode: "local-full"
zh: ""
---

# Content Classifier Integration

Three classifiers, one router, four actions.

## Verdict structure

```text
ClassifierVerdict
  name: str
  severity: none | low | medium | high
  score: float in [0, 1]
  findings: list[str]
```

## Action table

| Severity | Action | Effect |
|---|---|---|
| high | block | output replaced by a policy refusal |
| medium | redact | per-classifier redactors applied in order |
| low | warn | output shipped with a soft notice appended |
| none | log | output shipped unchanged, verdict logged |

## Per-classifier behavior

- toxicity - harassment terms with whitespace boundary and a small left-window negation check; redacts to `[redacted-language]`
- pii - email, phone, SSN, Luhn-validated card, IPv4; severity escalates for SSN and card; redacts each shape to a tag
- instruction-leakage - trigram cosine vs a known system prompt; severity scales with overlap; redacts the first system-prompt line

## Artifact

`outputs/classifier_report.json` carries action verb, severity, redacted output, and full verdict list per case.
