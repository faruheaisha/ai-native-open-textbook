---
title: "Refusal Evaluation"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/19-capstone-projects/84-refusal-evaluation/outputs/skill-refusal-evaluation.md"
sourceRel: "phases/19-capstone-projects/84-refusal-evaluation/outputs/skill-refusal-evaluation.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/19-capstone-projects/84-refusal-evaluation/outputs/skill-refusal-evaluation.md"
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
