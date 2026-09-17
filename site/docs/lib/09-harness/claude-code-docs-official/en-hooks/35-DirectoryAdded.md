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
pageSha256: "01b054ccdcf0cfe42ba35eb7805ad872ed65fe3f7acc4ad889774dc0b4bc92ee"
contentMode: "local-full"
zh: ""
---

### DirectoryAdded

Runs after you add a working directory mid-session with the `/add-dir` command, or after an SDK client adds one with the `register_repo_root` control request. Use this to prepare a newly added repository, for example by installing its dependencies.

Claude Code doesn't fire this event when:

* You pass a directory with the `--add-dir` startup flag; [SessionStart](#sessionstart) covers those directories
* You add a directory on the `/permissions` Workspace tab
* You add a directory that is already a working directory or inside one

Claude Code fires DirectoryAdded after refreshing sandbox and permission state, so sandboxed tools already see the new directory when your hook runs. Hook commands themselves run unsandboxed.

Claude Code doesn't wait for the hook: the add completes immediately, and the hook runs in the background with the 600-second default timeout.

The matcher filters on how the directory was added:

| Matcher              | When it fires                                                                |
| :------------------- | :--------------------------------------------------------------------------- |
| `slash_command`      | You add a directory with `/add-dir`                                          |
| `register_repo_root` | An SDK client adds a directory with the `register_repo_root` control request |

#### DirectoryAdded input

In addition to the [common input fields](#common-input-fields), DirectoryAdded hooks receive `directory` and `source`.

| Field       | Description                                                                                                         |
| :---------- | :------------------------------------------------------------------------------------------------------------------ |
| `directory` | Absolute path of the directory that was added                                                                       |
| `source`    | How the directory was added, `"slash_command"` for `/add-dir` or `"register_repo_root"` for the SDK control request |

```json theme={null}
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../transcript.jsonl",
  "cwd": "/Users/my-project",
  "hook_event_name": "DirectoryAdded",
  "directory": "/Users/my-other-repo",
  "source": "slash_command"
}
```

DirectoryAdded hooks have no decision control. They can't block the add, which has already completed when the hook runs. Claude Code discards the `continue` field from their JSON output and surfaces the rest differently per source:

* `slash_command`: Claude Code delivers the hook's `systemMessage` to Claude as context on the next conversation turn, rather than showing it to you. A count of failed hooks appears in the transcript. Full failure output goes to the debug log
* `register_repo_root`: Claude Code writes `systemMessage` output and failure output to the debug log only
