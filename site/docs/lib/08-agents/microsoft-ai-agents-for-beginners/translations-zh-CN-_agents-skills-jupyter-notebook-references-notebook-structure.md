---
title: "笔记本结构"
sourceId: "08-agents/microsoft-ai-agents-for-beginners"
sourceTitle: "AI Agents for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/ai-agents-for-beginners"
entryUrl: "https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/translations/zh-CN/.agents/skills/jupyter-notebook/references/notebook-structure.md"
sourceRel: "translations/zh-CN/.agents/skills/jupyter-notebook/references/notebook-structure.md"
rawUrl: "/raw/08-agents/microsoft-ai-agents-for-beginners/translations/zh-CN/.agents/skills/jupyter-notebook/references/notebook-structure.md"
sourceSha256: "9eb2f8b491c5674df4cae3da05d576aca22e2506ae52f66bde1faa94e400c616"
pageSha256: "9eb2f8b491c5674df4cae3da05d576aca22e2506ae52f66bde1faa94e400c616"
contentMode: "local-full"
zh: ""
---

# 笔记本结构

Jupyter 笔记本是具有以下高层结构的 JSON 文档:

- `nbformat` 和 `nbformat_minor`
- `metadata`
- `cells` (一个由 Markdown 和代码单元组成的列表)

在以编程方式编辑 `.ipynb` 文件时:

- 保持模板中的 `nbformat` 和 `nbformat_minor`.
- 将 `cells` 保持为有序列表；除非有意，否则不要重新排序.
- 对于代码单元，当未知时将 `execution_count` 设置为 `null`.
- 对于代码单元，在搭建脚手架时将 `outputs` 设置为空列表.
- 对于 Markdown 单元，保持 `cell_type="markdown"` 和 `metadata=\{\}`.

优先从捆绑的模板或 `new_notebook.py` (例如 `$CODEX_HOME/skills/jupyter-notebook/scripts/new_notebook.py`) 进行脚手架搭建，而不是手工编写原始笔记本 JSON.
