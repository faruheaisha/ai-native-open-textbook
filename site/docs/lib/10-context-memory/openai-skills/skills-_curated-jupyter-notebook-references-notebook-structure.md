---
title: "Notebook Structure"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/jupyter-notebook/references/notebook-structure.md"
sourceRel: "skills/.curated/jupyter-notebook/references/notebook-structure.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/jupyter-notebook/references/notebook-structure.md"
sourceSha256: "a85051a2e88fd3424bbed2636e952ec5f858e7efa4e076c28d62a8cc2cc9dc06"
pageSha256: "a85051a2e88fd3424bbed2636e952ec5f858e7efa4e076c28d62a8cc2cc9dc06"
contentMode: "local-full"
zh: ""
---

# Notebook Structure

Jupyter notebooks are JSON documents with this high-level shape:

- `nbformat` and `nbformat_minor`
- `metadata`
- `cells` (a list of markdown and code cells)

When editing `.ipynb` files programmatically:

- Preserve `nbformat` and `nbformat_minor` from the template.
- Keep `cells` as an ordered list; do not reorder unless intentional.
- For code cells, set `execution_count` to `null` when unknown.
- For code cells, set `outputs` to an empty list when scaffolding.
- For markdown cells, keep `cell_type="markdown"` and `metadata=\{\}`.

Prefer scaffolding from the bundled templates or `new_notebook.py` (for example, `$CODEX_HOME/skills/jupyter-notebook/scripts/new_notebook.py`) instead of hand-authoring raw notebook JSON.
