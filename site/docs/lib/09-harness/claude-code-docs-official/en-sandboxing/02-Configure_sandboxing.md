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
sourceRel: "en/sandboxing.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/sandboxing.md"
sourceSha256: "9173fa7bfc40900080b167be86897899912ce55ff61ad1072f71a5eab69e80ce"
pageSha256: "836d32912144de92a4f38baa693167338b421627922a96f45f8d52d881adef82"
contentMode: "local-full"
zh: ""
---

## Configure sandboxing

Customize sandbox behavior through your `settings.json` file. See [Settings](https://code.claude.com/docs/en/settings-reference#sandbox-settings) for the complete configuration reference.

By default, sandboxed commands can write to the current working directory, the session temp directory, and any [directories you've added](https://code.claude.com/docs/en/permissions#additional-directories-grant-file-access-not-configuration) with `--add-dir`, `/add-dir`, or `permissions.additionalDirectories`. If subprocess commands like `kubectl`, `terraform`, or `npm` need to write outside those directories, use `sandbox.filesystem.allowWrite` to grant access to specific paths:

```json theme={null}
{
  "sandbox": {
    "enabled": true,
    "filesystem": {
      "allowWrite": ["~/.kube", "/tmp/build"]
    }
  }
}
```

These paths are enforced at the OS level, so all commands running inside the sandbox, including their child processes, respect them. This is the recommended approach when a tool needs write access to a specific location, rather than excluding the tool from the sandbox entirely with `excludedCommands`.

When you define the same filesystem array in multiple [settings scopes](https://code.claude.com/docs/en/settings#settings-precedence), Claude Code merges them, combining paths from every scope rather than replacing one scope's array with another's.

If you exclude a source with [`--setting-sources`](https://code.claude.com/docs/en/cli-reference) on the CLI or [`settingSources`](https://code.claude.com/docs/en/agent-sdk/claude-code-features#control-filesystem-settings-with-settingsources) in the Agent SDK, Claude Code ignores its `sandbox.filesystem` entries, its `Edit` permission rules, and its `Read` deny rules when building the sandbox configuration. Requires Claude Code v2.1.246 or later.

When you edit these filesystem lists during a session, Claude Code [applies the change to the running session](https://code.claude.com/docs/en/settings#when-edits-take-effect), so the next sandboxed command runs under the new paths.

Path prefixes control how paths are resolved:

| Prefix            | Meaning                                                                                | Example                                                                   |
| :---------------- | :------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| `/`               | Absolute path from filesystem root                                                     | `/tmp/build` stays `/tmp/build`                                           |
| `~/`              | Relative to home directory                                                             | `~/.kube` becomes `$HOME/.kube`                                           |
