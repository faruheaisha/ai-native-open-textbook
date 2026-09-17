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
sourceRel: "en/agent-sdk/typescript.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-sdk/typescript.md"
sourceSha256: "305f751e4d47db29303c15a79aa95777deff6625785b12533072bc0548010547"
pageSha256: "7fb73afec62aaa8f9f6571de3c0bb977c6d968094611efee6defd8c54d7ba364"
contentMode: "local-full"
zh: ""
---

#### Parameters

| Parameter     | Type             | Default     | Description                                                            |
| :------------ | :--------------- | :---------- | :--------------------------------------------------------------------- |
| `sessionId`   | `string`         | required    | UUID of the session to tag                                             |
| `tag`         | `string \| null` | required    | Tag string, or `null` to clear                                         |
| `options.dir` | `string`         | `undefined` | Project directory path. When omitted, searches all project directories |

### `resolveSettings()`

Resolves the effective Claude Code settings for a given directory using the same merge engine as the CLI, without spawning the Claude CLI. Use it to inspect what configuration a `query()` call would see before invoking one.

  This function is alpha and its API may change before stabilization.

The snapshot differs from what a live `query()` session applies:

* **`policyHelper`**: `resolveSettings()` reads MDM sources, including macOS plist and Windows HKLM/HKCU, but doesn't execute the admin-configured `policyHelper` subprocess.
* **Server-managed settings**: `resolveSettings()` doesn't fetch [server-managed settings](https://code.claude.com/docs/en/server-managed-settings#fetch-and-caching-behavior). Pass them as `options.serverManagedSettings` to include them.
* **`defaultMode`**: the snapshot returns `permissions.defaultMode` as-is from every tier, so it can include the `'auto'` and `'bypassPermissions'` values from project and local settings, which [a live session ignores](https://code.claude.com/docs/en/permission-modes#which-mode-a-session-starts-in).

```typescript theme={null}
function resolveSettings(
  options?: ResolveSettingsOptions
): Promise<ResolvedSettings>;
```
