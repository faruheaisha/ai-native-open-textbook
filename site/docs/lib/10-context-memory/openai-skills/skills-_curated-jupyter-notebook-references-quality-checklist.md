---
title: "Quality Checklist"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/jupyter-notebook/references/quality-checklist.md"
sourceRel: "skills/.curated/jupyter-notebook/references/quality-checklist.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/jupyter-notebook/references/quality-checklist.md"
sourceSha256: "ed01afe6ff47714d85935d11053b64c414772f02250fdc604e3fca65e5139136"
pageSha256: "ed01afe6ff47714d85935d11053b64c414772f02250fdc604e3fca65e5139136"
contentMode: "local-full"
zh: ""
---

# Quality Checklist

Before delivering a notebook:

- Run it top-to-bottom at least once (or as much as the environment allows).
- Ensure early cells set all required state; avoid hidden state from prior runs.
- Keep outputs tidy. Avoid giant outputs when a short summary works.
- Prefer small tables, key metrics, or short printouts.
- Keep the narrative skimmable. Use headings and short bullets, and avoid long paragraphs.
- Leave helpful TODOs only when necessary, and label them clearly.
- If execution is not possible, call out the risk and how to validate locally.
