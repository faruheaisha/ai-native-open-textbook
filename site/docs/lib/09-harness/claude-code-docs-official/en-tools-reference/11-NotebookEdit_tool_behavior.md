---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/tools-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/tools-reference.md"
sourceSha256: "f928a98a3f2e69421eeadeb064439c827340f4b19a28c7ad920c2a0e60b142f9"
pageSha256: "b7ead44f231450a13e4e85574553387f2ef5e95a475e125202a18390fde84361"
contentMode: "local-full"
zh: ""
---

## NotebookEdit tool behavior

NotebookEdit modifies a Jupyter notebook one cell at a time, targeting cells by their `cell_id`. It doesn't perform string replacement across the notebook the way [Edit](#edit-tool-behavior) does on plain files.

Three edit modes control what happens to the target cell:

* `replace`: overwrite the cell's source. This is the default.
* `insert`: add a new cell after the target. With no `cell_id`, the new cell goes at the start of the notebook. Requires `cell_type` set to `code` or `markdown`.
* `delete`: remove the target cell.

Permission rules use the `Edit(...)` path format. A rule like `Edit(notebooks/**)` covers NotebookEdit calls on files in that directory.
