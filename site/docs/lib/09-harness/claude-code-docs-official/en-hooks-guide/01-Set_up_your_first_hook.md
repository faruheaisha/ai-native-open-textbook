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
sourceRel: "en/hooks-guide.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/hooks-guide.md"
sourceSha256: "b5632cf6b8c78f04797a91ed590ed7718f6af17cc923a856cbad3b3a2f7138a8"
pageSha256: "5ecefb002f7eed8a0ef36211903fc440b87b5acd8886fb1f34558eb8c34546b8"
contentMode: "local-full"
zh: ""
---

## Set up your first hook

To create a hook, add a `hooks` block to a [settings file](#configure-hook-location). This walkthrough creates a desktop notification hook, so you get alerted whenever Claude is waiting for your input instead of watching the terminal.

    Open `~/.claude/settings.json` and add a `Notification` hook. If the file doesn't exist, create it. The example below uses `osascript` for macOS; see [Get notified when Claude needs input](#get-notified-when-claude-needs-input) for Linux and Windows commands.

    ```json theme=\{null\}
    \{
      "hooks": \{
        "Notification": [
          \{
            "matcher": "",
            "hooks": [
              \{
                "type": "command",
                "command": "osascript -e 'display notification \"Claude Code needs your attention\" with title \"Claude Code\"'"
              \}
            ]
          \}
        ]
      \}
    \}
    ```

    If your settings file already has a `hooks` key, add `Notification` as a sibling of the existing event keys rather than replacing the whole object. Each event name is a key inside the single `hooks` object:

    ```json theme=\{null\}
    \{
      "hooks": \{
        "PostToolUse": [
          \{
            "matcher": "Edit|Write",
            "hooks": [\{ "type": "command", "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write" \}]
          \}
        ],
        "Notification": [
          \{
            "matcher": "",
            "hooks": [\{ "type": "command", "command": "osascript -e 'display notification \"Claude Code needs your attention\" with title \"Claude Code\"'" \}]
          \}
        ]
      \}
    \}
    ```

    You can also ask Claude to write the hook for you by describing what you want in the CLI.

    Type `/hooks` to open the hooks browser. You'll see a list of all available hook events, with a count next to each event that has hooks configured. Select `Notification` to confirm your new hook appears in the list. Selecting the hook shows its details: the event, matcher, type, source file, and command.

    Press `Esc` to return to the CLI. Press `Shift+Tab` until the status bar shows `⏸ manual mode on`, ask Claude to do something that requires permission, then switch away from the terminal. You should receive a desktop notification.

  The `/hooks` menu is read-only. To add, modify, or remove hooks, edit your settings JSON directly or ask Claude to make the change.
