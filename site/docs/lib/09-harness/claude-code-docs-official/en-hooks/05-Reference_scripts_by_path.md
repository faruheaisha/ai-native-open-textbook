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
pageSha256: "eae5dac41854fceab228deee333986537186f87038ea738781fe38546f788bb8"
contentMode: "local-full"
zh: ""
---

### Reference scripts by path

Use these placeholders to reference hook scripts relative to the project or plugin root, regardless of the working directory when the hook runs:

* `${CLAUDE_PROJECT_DIR}`: the project root where the session started. Claude Code also sets this variable in the environment of [stdio MCP servers](https://code.claude.com/docs/en/mcp#option-3-add-a-local-stdio-server) and plugin LSP servers.
* `${CLAUDE_PLUGIN_ROOT\}`: the plugin's installation directory, for scripts bundled with a [plugin](https://code.claude.com/docs/en/plugins). Changes on each plugin update.
* `${CLAUDE_PLUGIN_DATA}`: the plugin's [persistent data directory](https://code.claude.com/docs/en/plugins-reference#persistent-data-directory), for dependencies and state that should survive plugin updates.

  **Worktrees are different.** If Claude enters a [worktree](https://code.claude.com/docs/en/worktrees) during the session, Claude Code keeps `${CLAUDE_PROJECT_DIR\}` where it was and passes the worktree path to your hooks a different way:

  * **`${CLAUDE_PROJECT_DIR}` stays put**: it still points at the project root where the session started, so a command such as `${CLAUDE_PROJECT_DIR\}/.claude/hooks/check-style.sh` still runs the script in the main checkout.
  * **`cwd` follows Claude**: the `cwd` field in the hook's [input JSON](#common-input-fields) is the worktree root after Claude enters a worktree, and the new directory after Claude runs `cd`. Read it when a hook needs to know which directory Claude is working in.

Prefer [exec form](#exec-form-and-shell-form) for any hook that references a path placeholder. In shell form, wrap each placeholder in double quotes.

    This example uses `${CLAUDE_PROJECT_DIR}` to run a style checker from the project's `.claude/hooks/` directory after any `Write` or `Edit` tool call:

    ```json theme={null}
    {
      "hooks": {
        "PostToolUse": [
          {
            "matcher": "Write|Edit",
            "hooks": [
              {
                "type": "command",
                "command": "${CLAUDE_PROJECT_DIR\}/.claude/hooks/check-style.sh",
                "args": []
              \}
            ]
          \}
        ]
      \}
    \}
    ```

    Define plugin hooks in `hooks/hooks.json` with an optional top-level `description` field. When a plugin is enabled, its hooks merge with your user and project hooks.

    This example runs a formatting script bundled with the plugin:

    ```json theme=\{null\}
    \{
      "description": "Automatic code formatting",
      "hooks": \{
        "PostToolUse": [
          \{
            "matcher": "Write|Edit",
            "hooks": [
              \{
                "type": "command",
                "command": "$\{CLAUDE_PLUGIN_ROOT\}/scripts/format.sh",
                "args": [],
                "timeout": 30
              \}
            ]
          \}
        ]
      \}
    \}
    ```

    See the [plugin components reference](https://code.claude.com/docs/en/plugins-reference#hooks) for details on creating plugin hooks.
