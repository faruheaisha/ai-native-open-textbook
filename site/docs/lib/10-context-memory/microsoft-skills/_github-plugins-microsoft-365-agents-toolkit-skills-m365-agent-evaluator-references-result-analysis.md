---
title: "Result analysis"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/references/result-analysis.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/references/result-analysis.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/references/result-analysis.md"
sourceSha256: "5bcf4a35fb605080fab9b6c0e9313f8e461ea1281980b4c02fb228dc45ee45c4"
pageSha256: "5bcf4a35fb605080fab9b6c0e9313f8e461ea1281980b4c02fb228dc45ee45c4"
contentMode: "local-full"
zh: ""
---

# Result analysis

Use this reference after an evaluation run has produced JSON, CSV, or HTML output.

## Current output shape

JSON output is an eval-document-style object:

```json
{
  "schemaVersion": "1.2.0",
  "metadata": {
    "evaluatedAt": "2025-01-01T00:00:00Z",
