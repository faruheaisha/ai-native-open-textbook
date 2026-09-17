---
title: "Refusal Evaluation"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/19-capstone-projects/84-refusal-evaluation/outputs/skill-refusal-evaluation.md"
sourceRel: "phases/19-capstone-projects/84-refusal-evaluation/outputs/skill-refusal-evaluation.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/19-capstone-projects/84-refusal-evaluation/outputs/skill-refusal-evaluation.md"
sourceSha256: "ade10dcdd03c838a21772f29c9e4218a200e85fdbfda899a8152e9ab405625bc"
pageSha256: "ade10dcdd03c838a21772f29c9e4218a200e85fdbfda899a8152e9ab405625bc"
contentMode: "local-full"
zh: ""
---

# Refusal Evaluation

A labeled corpus of safe and unsafe prompts goes through one or more model policies. Outputs are classified as refusals or answers. The framework returns:

- under-refusal: answered prompts labeled unsafe / total unsafe
- over-refusal: refused prompts labeled safe / total safe
- accuracy: (correct refusals + correct answers) / total
- ECE: expected calibration error binned by stated confidence
- per-category under-refusal: joined against the lesson 82 taxonomy

## Plugging in a real model

The mock LLM is a callable `(prompt: str) -> str`. Replace it with an HTTP wrapper that returns the model output and embeds a confidence tag (or modify `parse_confidence` to read whatever your provider exposes). Everything else stays the same.

## Artifact

`outputs/refusal_eval_report.json` contains the per-policy metrics. Lesson 87 reads this report to set thresholds.
