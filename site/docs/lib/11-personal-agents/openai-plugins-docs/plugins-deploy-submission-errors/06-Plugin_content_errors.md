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
pageSha256: "354f5469281d8e3c92dc14ba1bf774289fed1735deccc8754e77eeaf3b4df9ed"
contentMode: "local-full"
zh: ""
---

## Plugin content errors

| Name                               | Requirement                                                                                                                      |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `plugin_skills_path_wrong_type`    | `skills` must be a string path for the root `skills/` directory.                                                                 |
| `plugin_skills_path_empty`         | `skills` must be a non-empty path to the root `skills/` directory when provided.                                                 |
| `plugin_skills_path_unsupported`   | `skills` must resolve to the root `skills/` directory.                                                                           |
| `plugin_skills_directory_missing`  | A declared root `skills/` directory must exist.                                                                                  |
| `plugin_skills_path_not_directory` | Root `skills/` must be a directory when declared.                                                                                |
| `plugin_apps_path_wrong_type`      | `apps` must be a string path for the root `.app.json`.                                                                           |
| `plugin_apps_path_empty`           | `apps` must be a non-empty path to the root `.app.json` when provided.                                                           |
| `plugin_apps_path_unsupported`     | `apps` must resolve to the root `.app.json`.                                                                                     |
| `plugin_apps_file_missing`         | A declared root `.app.json` file must exist.                                                                                     |
| `plugin_apps_path_not_file`        | Root `.app.json` must be a regular file when declared.                                                                           |
| `plugin_mcp_path_wrong_type`       | `mcpServers` must be a string path for the root `.mcp.json`.                                                                     |
| `plugin_mcp_path_empty`            | `mcpServers` must be a nonempty path. Set it to `./.mcp.json` or remove the field.                                               |
| `plugin_mcp_path_unsupported`      | `mcpServers` must resolve to the root `.mcp.json`.                                                                               |
| `plugin_mcp_file_missing`          | `mcpServers` declares the root `.mcp.json`, but that file doesn't exist.                                                         |
| `plugin_mcp_path_not_file`         | Root `.mcp.json` must be a regular file.                                                                                         |
| `plugin_runtime_surface_missing`   | A skills-only ZIP must contain at least one valid skill. Local and workspace packages can also reference an eligible MCP server. |
