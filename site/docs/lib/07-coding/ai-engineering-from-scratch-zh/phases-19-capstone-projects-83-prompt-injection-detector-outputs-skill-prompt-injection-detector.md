---
title: "Prompt Injection Detector"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/19-capstone-projects/83-prompt-injection-detector/outputs/skill-prompt-injection-detector.md"
sourceRel: "phases/19-capstone-projects/83-prompt-injection-detector/outputs/skill-prompt-injection-detector.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/19-capstone-projects/83-prompt-injection-detector/outputs/skill-prompt-injection-detector.md"
sourceSha256: "ff7b5aa10953a614eff31efa45e5dd81fd54f971c7b119e8fd41260a679be2ec"
pageSha256: "ff7b5aa10953a614eff31efa45e5dd81fd54f971c7b119e8fd41260a679be2ec"
contentMode: "local-full"
zh: ""
---

# Prompt Injection Detector

A detector here is a function from prompt to verdict. A verdict carries a category from the lesson 82 taxonomy and a confidence in [0, 1].

## Pipeline

1. Normalize - strip zero-width characters, undo homoglyphs, decode base64/hex, fold leet-speak digits, attempt rot13 with a common-words sanity check.
2. Substring rules - hand-written needles such as `ignore previous`, `from now on you are`, `decode this base64`.
3. Regex rules - token-level patterns such as `\bignor\w*\s+(all|prior|previous|earlier)\b`.

Aggregation keeps the maximum score per category and returns the category with the largest score, or `benign` if nothing fires.

## Adding a rule

Edit `code/rules.py`. A rule is a dictionary with `name`, `category` (one of the six taxonomy categories), `score` (float 0 to 1), and one of `substring` or `regex`. Re-run `main.py` to see the impact on per-category precision and recall.

## Artifact

`outputs/detector_report.json` is the per-category metrics file. The end to end gate in lesson 87 reads it to threshold confidence.
