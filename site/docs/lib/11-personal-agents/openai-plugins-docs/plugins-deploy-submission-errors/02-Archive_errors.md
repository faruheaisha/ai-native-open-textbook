---
title: "openai-plugins-docs"
sourceId: "11-personal-agents/openai-plugins-docs"
sourceTitle: "openai-plugins-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "11-personal-agents"
sourceUrl: "https://developers.openai.com/plugins"
entryUrl: "https://developers.openai.com/plugins"
sourceRel: "plugins/deploy/submission-errors.md"
rawUrl: "/raw/11-personal-agents/openai-plugins-docs/plugins/deploy/submission-errors.md"
sourceSha256: "c475dca167f14136260f331f35c506f730e1c93d226a3ec5ebe9ce1e385f2380"
pageSha256: "408d42efb41b31286290112915f5334c7279309312c6bf6a8b06ea78406c8e6e"
contentMode: "local-full"
zh: ""
---

## Archive errors

### ZIP upload errors and warnings

The portal's **Skills only** path accepts skill ZIP packages. Errors block the
upload; warnings require confirmation.

| Name                                | Requirement                                                                                                                                               |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugin_name_mismatch`              | The package name in an update must match the existing plugin name.                                                                                        |
| `plugin_version_unchanged`          | A new release must use a different manifest `version`; reusing the published version requires confirmation.                                               |
| `mcp_configuration_excluded`        | Skills-only uploads exclude `mcpServers`, `mcp.json`, and `.mcp.json`. Submit a remote MCP server through **With MCP**.                                   |
| `app_configuration_excluded`        | Skills-only ZIP uploads must not include `apps` or `.app.json`; plugins with MCP servers must use **With MCP**.                                           |
| `screenshot_configuration_excluded` | Skills-only ZIP uploads must not include `interface.screenshots`; screenshots require **With MCP** and custom UI.                                         |
| `claude_format_normalized`          | `.claude-plugin/plugin.json` is converted to `.codex-plugin/plugin.json`, with missing interface defaults and normalized text fields added by the portal. |
| `manifest_normalized`               | The portal saves the normalized manifest as `.codex-plugin/plugin.json`; changed fields require confirmation.                                             |
| `developer_name_defaulted`          | `author.name` and `interface.developerName` must match, or the selected verified identity is used for both after confirmation.                            |

### ZIP structure and limit errors

| Name                                          | Requirement                                                                                      |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `archive_empty`                               | Archive must not be empty.                                                                       |
| `archive_too_large`                           | Compressed ZIP must be 100 MB or less.                                                           |
| `archive_format_not_zip`                      | Archive must be a valid, uncorrupted ZIP file.                                                   |
| `archive_member_path_empty`                   | Archive entry path must not be empty.                                                            |
| `archive_member_path_has_outer_whitespace`    | Archive entry path must not begin or end with whitespace.                                        |
| `archive_member_path_has_backslash`           | Archive entry path must use `/`, not backslashes.                                                |
| `archive_member_path_absolute`                | Archive entry path must be relative to the archive root.                                         |
| `archive_member_path_has_empty_segment`       | Archive entry path must not contain empty segments.                                              |
| `archive_member_path_has_parent_segment`      | Archive entry path must not contain `..` segments.                                               |
| `archive_member_path_too_deep`                | Archive entry path must contain at most 20 segments, including the filename.                     |
| `archive_member_path_too_long`                | Archive entry path must be within the supported path-length limit.                               |
| `archive_member_path_normalization_collision` | Archive entry paths must remain unique after case and Unicode normalization.                     |
| `archive_member_type_unsupported`             | Archive entries must be regular files or directories.                                            |
| `archive_member_too_large`                    | Archive entry must not exceed 100 MiB.                                                           |
| `archive_member_path_duplicate`               | Archive entry path must be unique.                                                               |
| `archive_member_path_type_conflict`           | A file path cannot also be a directory or contain another archive entry.                         |
| `archive_too_many_entries`                    | Archive must not contain more than 5,000 entries.                                                |
| `archive_uncompressed_too_large`              | Extracted archive must not exceed 512 MiB.                                                       |
| `archive_member_unreadable`                   | Every archive entry must be readable, must not be encrypted, and must use supported compression. |
