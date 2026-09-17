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
pageSha256: "c4355369b955e2360b451bc788d9f874afe5d978e20906434c1f533e1023ecb0"
contentMode: "local-full"
zh: ""
---

## Write tool behavior

The Write tool creates a new file or overwrites an existing one with the full content provided. It doesn't append or merge.

Whether Claude must read an existing file in the current conversation before overwriting it depends on the model and the file:

* Claude Opus 4.6, Claude Haiku 4.5, and older models always require the read, so a Write to an unread existing file fails with an error.
* Newer models can overwrite a file they never read this session under the same conditions as [read-before-edit](#edit-tool-behavior): reading it wouldn't need a permission prompt and the Read tool is available.
* Jupyter notebooks, and files Claude has read only partially with a [`PARTIAL view` notice](#read-tool-behavior), require the read on every model.

This constraint doesn't apply to new files. Before v2.1.228, every model required the read before overwriting an existing file.

Viewing the file with Bash also satisfies this requirement under the same rules described in [Edit tool behavior](#edit-tool-behavior).

For partial changes to an existing file, Claude uses Edit instead of Write.
