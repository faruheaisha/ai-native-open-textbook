---
title: "CSV Workbench"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/tools/skills/csv-workbench/SKILL.md"
sourceRel: "examples/tools/skills/csv-workbench/SKILL.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/tools/skills/csv-workbench/SKILL.md"
sourceSha256: "96bbebd83d3468312bc25729100d4b05d7e8eadf0b9d46339dc329a4e1a6c374"
pageSha256: "96bbebd83d3468312bc25729100d4b05d7e8eadf0b9d46339dc329a4e1a6c374"
contentMode: "local-full"
zh: ""
---

# CSV Workbench

Use this skill when the user asks for quick analysis of tabular data.

## Workflow

1. Inspect the CSV schema first (`head`, `python csv.DictReader`, or both).
2. Compute requested aggregates with a short Python script.
3. Return concise results with concrete numbers and units when available.

## Constraints

- Prefer Python stdlib for portability.
- If data is missing or malformed, state assumptions clearly.
- Keep the final answer short and actionable.
