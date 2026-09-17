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
pageSha256: "c522026e9defa96ab421e4ddaab1a34390ecd30982fafa835ae980b614fd84b4"
contentMode: "local-full"
zh: ""
---

## Grep tool behavior

The Grep tool searches file contents for patterns. Where [Glob](#glob-tool-behavior) finds files by name, Grep finds lines inside them.

Grep is built on [ripgrep](https://github.com/BurntSushi/ripgrep) and uses ripgrep's regex syntax, not POSIX grep. Patterns that include regex metacharacters need escaping. For example, finding `interface\{\}` in Go code takes the pattern `interface\\{\\}`.

A pattern, glob, or file type that ripgrep rejects returns an error that includes ripgrep's diagnostic, so Claude can correct the input and search again. Before v2.1.208, Claude Code reported a rejected input as `No files found` instead of an error, even when the searched-for text existed in the target files.

Three output modes control what comes back:

* `files_with_matches`: file paths only, no line content. This is the default.
* `content`: matching lines with file and line number. When the tool's `offset` parameter points past the last match for a pattern that has matches, Grep returns `No entries at this offset`, so Claude widens or resets the offset instead of concluding the pattern doesn't match.
* `count`: match count per file, followed by a total across all matching files. The total covers every match even when the tool's `head_limit` or `offset` parameters truncate the listed per-file entries. Before v2.1.208, the total only summed the listed entries.

Claude can scope results by file with the `glob` parameter, such as `**/*.tsx`, or by language with the `type` parameter, such as `py` or `rust`. By default, patterns match within a single line. Claude can set `multiline: true` to match across line boundaries.

Grep respects `.gitignore`, so gitignored files are skipped. To search a gitignored file, Claude passes its path directly.

Claude Code decides permission for a Grep call before it checks whether the search `path` exists. It still runs the read-permission check for a missing `path` outside the [working directories](https://code.claude.com/docs/en/permissions#working-directories), so a permission prompt for a path doesn't mean the path exists.
