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
pageSha256: "6032a7b57396e4f6a1ec905cf5cbeae955f2c093363240be9c4c2f5323ae0efc"
contentMode: "local-full"
zh: ""
---

### WorktreeCreate

Runs when a worktree is being created, whether from `claude --worktree`, from a [subagent using `isolation: "worktree"`](https://code.claude.com/docs/en/sub-agents#choose-the-subagent-scope), or for a [background session](https://code.claude.com/docs/en/agent-view#how-file-edits-are-isolated) that Claude Code isolates in its own worktree. By default Claude Code creates the isolated working copy with `git worktree`. Configuring a WorktreeCreate hook replaces that default git behavior, letting you use a different version control system like SVN, Perforce, or Mercurial.

Because the hook replaces the default behavior entirely, [`.worktreeinclude`](https://code.claude.com/docs/en/worktrees#copy-gitignored-files-into-worktrees) is not processed. If you need to copy local configuration files like `.env` into the new worktree, do it inside your hook script.

The hook must return the path to the created worktree directory. Claude Code uses this path as the working directory for the isolated session. See [WorktreeCreate output](#worktreecreate-output) for how each hook type returns the path.

Claude Code acts on the hook's success and the returned path, and discards `systemMessage` and `continue`.

This example creates an SVN working copy and prints the path for Claude Code to use. Replace the repository URL with your own:

```json theme={null}
{
  "hooks": {
    "WorktreeCreate": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'NAME=$(jq -r .name); DIR=\"$HOME/.claude/worktrees/$NAME\"; svn checkout https://svn.example.com/repo/trunk \"$DIR\" >&2 && echo \"$DIR\"'"
          }
        ]
      }
    ]
  }
}
```

The hook reads the worktree `name` from the JSON input on stdin, checks out a fresh copy into a new directory, and prints the directory path. The `echo` on the last line is what Claude Code reads as the worktree path. Redirect any other output to stderr so it doesn't interfere with the path.

#### WorktreeCreate input

In addition to the [common input fields](#common-input-fields), WorktreeCreate hooks receive the `name` field. This is a slug identifier for the new worktree, either specified by the user or auto-generated, for example `bold-oak-a3f2`.

```json theme={null}
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "WorktreeCreate",
  "name": "feature-auth"
}
```

#### WorktreeCreate output

WorktreeCreate hooks don't use the standard allow/block decision model. Instead, the hook's success or failure determines the outcome. The hook must return the path to the created worktree directory:

* **Command hooks** (`type: "command"`): print the path as the last non-empty line of stdout. Claude Code strips ANSI escape codes before reading that line, so shell startup banners printed before your `echo` are ignored. Redirect any other hook output to stderr.
* **HTTP hooks** (`type: "http"`): return `\{ "hookSpecificOutput": \{ "hookEventName": "WorktreeCreate", "worktreePath": "/absolute/path" \} \}` in the response body.

If the hook fails or produces no path, worktree creation fails with an error.

Claude Code resolves a relative path against the directory the hook ran in, collapsing any `.` or `..` segments in it. If the resulting path isn't a directory Claude Code can enter, the session prints an error naming the path and exits with code 1.

Claude Code refuses an absolute path that contains `.` or `..` segments, and any path that passes through a symlink below the repository root, because a symlink committed to the repository could redirect the worktree outside it. The error names the rejected component. Return a normalized path that doesn't pass through a symlink inside the repository. Before v2.1.216, worktree creation followed the hook's path without this screening.
