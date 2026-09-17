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
pageSha256: "0466e9e9dfb3d181b55c24665eafdf577df76521fd0dfa8dfb5f87666b60f84b"
contentMode: "local-full"
zh: ""
---

### WorktreeRemove

Runs when a worktree is being removed. This is the cleanup counterpart to [WorktreeCreate](#worktreecreate). The event fires when:

* you exit a `--worktree` session and choose to remove it
* a subagent with `isolation: "worktree"` finishes
* you delete a [background session](https://code.claude.com/docs/en/agent-view#what-deleting-a-session-removes) whose worktree the hook created

For git-based worktrees, Claude Code handles cleanup automatically with `git worktree remove`. If you configured a WorktreeCreate hook for a non-git version control system, pair it with a WorktreeRemove hook to handle cleanup. Without one, the worktree directory is left on disk.

Claude Code discards a WorktreeRemove hook's [JSON output fields](#json-output), such as `systemMessage` and `continue`.

For a background-session delete, Claude Code verifies the stored worktree path before running the hook and refuses a path that is a symlink or passes through one below the repository root. The hook runs for a worktree that still contains files only when you confirm the delete in [agent view](https://code.claude.com/docs/en/agent-view#what-deleting-a-session-removes); for such a worktree, [`claude rm`](https://code.claude.com/docs/en/agent-view#manage-sessions-from-the-shell) keeps the session and worktree instead. Before v2.1.216, the hook ran on the stored path without these checks.

Claude Code passes the path returned by WorktreeCreate as `worktree_path` in the hook input. This example reads that path and removes the directory:

```json theme={null}
{
  "hooks": {
    "WorktreeRemove": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'jq -r .worktree_path | xargs rm -rf'"
          }
        ]
      }
    ]
  }
}
```

#### WorktreeRemove input

In addition to the [common input fields](#common-input-fields), WorktreeRemove hooks receive the `worktree_path` field, which is the absolute path to the worktree being removed.

```json theme={null}
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "WorktreeRemove",
  "worktree_path": "/Users/.../my-project/.claude/worktrees/feature-auth"
}
```

A WorktreeRemove hook's exit code decides the outcome. When a hook exits non-zero and the directory at `worktree_path` still exists afterward, the removal fails:

* The worktree stays on disk, and the hook's command and stderr go to the [debug log](#debug-hooks).
* If you were deleting a background session, the session stays too. The refusal message in [agent view](https://code.claude.com/docs/en/agent-view#what-deleting-a-session-removes) reports how the hook ended, such as `exited 1`, quotes the start of its stderr, and says whether deleting the session again removes the directory anyway.
