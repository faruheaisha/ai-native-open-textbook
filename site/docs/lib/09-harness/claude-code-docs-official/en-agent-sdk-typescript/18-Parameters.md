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
pageSha256: "5f8814f191c37907929b18d855dc905c3f8471328c30a8b2436b2e1258ce9c37"
contentMode: "local-full"
zh: ""
---

#### Parameters

`resolveSettings()` accepts a single options object. All fields are optional.

| Parameter                       | Type                                  | Default         | Description                                                                                                                                                                                                                                                                                                   |
| :------------------------------ | :------------------------------------ | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `options.cwd`                   | `string`                              | `process.cwd()` | Directory to resolve project and local settings relative to                                                                                                                                                                                                                                                   |
| `options.settingSources`        | [`SettingSource`](#settingsource)`[]` | All sources     | Which filesystem sources to load. Pass `[]` to skip user, project, and local settings. [Endpoint-managed policy](https://code.claude.com/docs/en/managed-settings#delivery-mechanisms) loads in all cases. `resolveSettings()` includes server-managed settings only when you pass `options.serverManagedSettings`                        |
| `options.managedSettings`       | `Settings`                            | `undefined`     | Policy-tier settings supplied by the embedding host. Follows the same rules as [`managedSettings` in `Options`](#options), except that `resolveSettings()` doesn't execute a configured [`policyHelper`](https://code.claude.com/docs/en/settings-reference#policyhelper), so the snapshot can include settings that a live session drops |
| `options.serverManagedSettings` | `Settings`                            | `undefined`     | Server-managed settings payload from `/api/claude_code/settings`. Non-restrictive keys pass through unfiltered                                                                                                                                                                                                |
