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
pageSha256: "76d1f4244a284fd1e8cfa8dfcbba7f730d8ad9fac0fa7a4f2d12d68d5e07e3a7"
contentMode: "local-full"
zh: ""
---

### Disable or remove hooks

To remove a hook, delete its entry from the settings JSON file.

To temporarily disable all hooks without removing them, set `"disableAllHooks": true` in your settings file. Claude Code reads the value left after [settings precedence](https://code.claude.com/docs/en/settings#settings-precedence) applies, so a `"disableAllHooks": false` in a project's `.claude/settings.json` overrides a `true` in your user settings. To turn hooks off for one run whatever the project's settings say, pass `--settings '\{"disableAllHooks": true\}'`, which takes precedence over project and local settings. There is no way to disable an individual hook while keeping it in the configuration.

The `disableAllHooks` setting respects the managed settings hierarchy. If an administrator has configured hooks through managed policy settings, `disableAllHooks` set in user, project, or local settings can't disable those managed hooks. Only `disableAllHooks` set at the managed settings level can disable managed hooks. For the full reach of each level, see [`disableAllHooks`](https://code.claude.com/docs/en/settings-reference#disableallhooks).

Direct edits to hooks in settings files are normally picked up automatically by the file watcher.

## Hook input and output

Command hooks receive JSON data via stdin and communicate results through exit codes, stdout, and stderr. HTTP hooks receive the same JSON as the POST request body and communicate results through the HTTP response body. This section covers fields and behavior common to all events. Each event's section under [Hook events](#hook-events) includes its specific input schema and decision control options.

On macOS and Linux, command hooks run in their own session without a controlling terminal. The hook process and any child processes can't open `/dev/tty` or send escape sequences directly to the Claude Code interface. Windows has no `/dev/tty`.

To surface a message to the user on any platform, return [`systemMessage`](#json-output) in JSON output. Some events discard it or deliver it elsewhere, and each [event's section](#hook-events) says so. To trigger a desktop notification, set a window title, or ring the bell, return [`terminalSequence`](#emit-terminal-notifications) instead.
