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
sourceRel: "en/errors.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/errors.md"
sourceSha256: "b8944f28bfea74456c2960ba67f375c1d39afd34fb474e956bea3d64744e6604"
pageSha256: "329888d9a1a70992acdeb382f7e261d86d8d5110245c9a6a69f7bcce33ee5fee"
contentMode: "local-full"
zh: ""
---

## Rewind warnings and errors

These messages come from a [`/rewind`](https://code.claude.com/docs/en/checkpointing) code restore. `Restored the code, but skipped N files` is a warning that Claude Code skipped some paths. `No files were restored` is an error that means it restored nothing.

<h3 id="restored-the-code-but-skipped-files">
  Restored the code, but skipped files
</h3>

A `/rewind` code restore skipped one or more tracked paths instead of writing or deleting through them. Claude Code skips a path when:

* it is, or became, a symlink, hard link, or other non-regular file
* its directory changed since the checkpoint
* its backup can't be safely read

Skipped paths keep their current contents. Before v2.1.216, `/rewind` wrote and deleted through links at tracked paths, and didn't report a partial restore.

```text theme={null}
Restored the code, but skipped 2 files: the tracked path is (or became) a link or other non-regular file, its directory changed since the checkpoint, or its backup could not be safely read. Skipped files were left untouched — run with --debug for the paths.
```

**What to do:**
