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
pageSha256: "bdee4021bda74f1cf65b691adf89ba8cd3593715e9e92c20a89d76437ff36140"
contentMode: "local-full"
zh: ""
---

## Edit tool behavior

The Edit tool performs exact string replacement. It takes an `old_string` and a `new_string` and replaces the first with the second. It doesn't use regex or fuzzy matching.

Three checks must pass for an edit to apply. Before any of them, a path matched by a [`Read` deny rule](https://code.claude.com/docs/en/permissions#tool-specific-permission-rules) is refused, including creating a new file there. The refusal requires Claude Code v2.1.208 or later.

* **Read-before-edit**: Claude reads the file in the current conversation before editing it, and a read cut short with a [`PARTIAL view` notice](#read-tool-behavior) doesn't count. Claude Opus 4.6, Claude Haiku 4.5, and older models always require the read. Newer models can edit an unread file when reading it wouldn't need a permission prompt and the Read tool is available.
* **Match**: `old_string` must appear in the file exactly as written. A single character of whitespace or indentation difference is enough to miss.
* **Uniqueness**: `old_string` must appear exactly once. When it appears more than once, Claude either supplies a longer string with enough surrounding context to pin down one occurrence, or sets `replace_all: true` to replace them all.

A file that changed on disk after Claude last read it can still be edited when `old_string` matches the current content exactly and unambiguously and Claude Code can read the file without prompting. Matching against the file's current content keeps this safe, and the result notes that the file carries other changes so Claude re-reads it before edits that depend on surrounding content. In any other case, such as a stale `old_string` or one that matches more than once without `replace_all`, Claude reads the file again before editing. The relaxed handling of unread and changed files requires Claude Code v2.1.208 or later; before that, Claude Code refused any edit to a file it hadn't read in the conversation or that changed on disk after the read.

Viewing a file with Bash also satisfies the read-before-edit requirement when the command is `cat`, `nl`, `bat`, `batcat`, `head`, `tail`, `sed -n 'X,Yp'`, `grep`, `egrep`, `fgrep`, or `rg` on a single file with no pipes or redirects. Piped output and other Bash commands don't count toward the read-before-edit check.

Viewing a file with Bash affects edit eligibility only, not permissions. See [Read and Edit permission rules](https://code.claude.com/docs/en/permissions#read-and-edit) for which Bash commands your `Read` and `Edit` deny rules cover.
