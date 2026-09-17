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
sourceRel: "en/hooks.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/hooks.md"
sourceSha256: "a6f4f82aca2e63d64ba787c2dc8d735ff95ae86fd3a53471b87eb089133cbdca"
pageSha256: "39928a3bec2bf7408c601f0ad02304559d8e31a06efa9ad345acffd21979f464"
contentMode: "local-full"
zh: ""
---

### InstructionsLoaded

Fires when a `CLAUDE.md` or `.claude/rules/*.md` file is loaded into context. This event fires at session start for eagerly-loaded files and again later when files are lazily loaded, for example when Claude accesses a subdirectory that contains a nested `CLAUDE.md` or when conditional rules with `paths:` frontmatter match. The hook doesn't support blocking or decision control. It runs asynchronously for observability purposes.

The matcher runs against `load_reason`. For example, use `"matcher": "session_start"` to fire only for files loaded at session start, or `"matcher": "path_glob_match|nested_traversal"` to fire only for lazy loads.

#### InstructionsLoaded input

In addition to the [common input fields](#common-input-fields), InstructionsLoaded hooks receive these fields:

| Field               | Description                                                                                                                                                                                                   |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `file_path`         | Absolute path to the instruction file that was loaded                                                                                                                                                         |
| `memory_type`       | Scope of the file: `"User"`, `"Project"`, `"Local"`, or `"Managed"`                                                                                                                                           |
| `load_reason`       | Why the file was loaded: `"session_start"`, `"nested_traversal"`, `"path_glob_match"`, `"include"`, or `"compact"`. The `"compact"` value fires when instruction files are re-loaded after a compaction event |
| `globs`             | Path glob patterns from the file's `paths:` frontmatter, if any. Present only for `path_glob_match` loads                                                                                                     |
| `trigger_file_path` | Path to the file whose access triggered this load, for lazy loads                                                                                                                                             |
| `parent_file_path`  | Path to the parent instruction file that included this one, for `include` loads                                                                                                                               |

```json theme={null}
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../transcript.jsonl",
  "cwd": "/Users/my-project",
  "hook_event_name": "InstructionsLoaded",
  "file_path": "/Users/my-project/CLAUDE.md",
  "memory_type": "Project",
  "load_reason": "session_start"
}
```

#### InstructionsLoaded decision control

InstructionsLoaded hooks have no decision control. They can't block or modify instruction loading. Claude Code discards their [JSON output fields](#json-output), such as `systemMessage` and `continue`. Use this event for audit logging, compliance tracking, or observability.
