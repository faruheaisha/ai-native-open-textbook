---
title: "Experiment Patterns"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/jupyter-notebook/references/experiment-patterns.md"
sourceRel: "skills/.curated/jupyter-notebook/references/experiment-patterns.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/jupyter-notebook/references/experiment-patterns.md"
sourceSha256: "1ff9c04281c01e8e2209bde9f1fd910b8e4b620dd1f1f040e2101f1d88513a91"
pageSha256: "1ff9c04281c01e8e2209bde9f1fd910b8e4b620dd1f1f040e2101f1d88513a91"
contentMode: "local-full"
zh: ""
---

# Experiment Patterns

Use this structure for exploratory and experimental work:

- Title and objective: state the question and the success criteria.
- Setup and reproducibility: import only what you need, set a seed early, and keep configuration in one short cell.
- Plan: list hypotheses, sweeps, and metrics before running code.
- Minimal baseline: start with the smallest runnable example and confirm it runs end-to-end before adding complexity.
- Results and notes: summarize findings in markdown near the relevant code and record key metrics in a small dictionary or table-like structure.
- Next steps: decide whether to continue, pivot, or stop, and capture follow-up ideas as short bullets.
