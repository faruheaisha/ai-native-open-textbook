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
pageSha256: "e9d4f2b5aca53ba289e8ba4bb460ca449c3b7878d586927385a2b14a0c112e0a"
contentMode: "local-full"
zh: ""
---

## MCP server reference errors

The shared package checks validate `.app.json` when a plugin references
registered MCP servers. The submission portal doesn't publish references to
existing integrations. A **Skills only** upload removes `.app.json`. Use
**With MCP** to submit the MCP server directly.

For local or workspace packages, the top-level `apps` object maps each MCP
server alias to a registered server entry. These configuration names and error
codes retain their literal `app` spelling.

| Name                            | Requirement                                                                                                                                                         |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app_manifest_unreadable`       | `.app.json` must be readable UTF-8 text.                                                                                                                            |
| `app_manifest_json_malformed`   | `.app.json` contains malformed JSON near the reported line.                                                                                                         |
| `app_manifest_wrong_type`       | `.app.json` must contain a JSON object at the top level.                                                                                                            |
| `app_entries_missing`           | `apps` is required.                                                                                                                                                 |
| `app_entries_wrong_type`        | `apps` must be an object.                                                                                                                                           |
| `app_entry_wrong_type`          | Each server entry must be an object.                                                                                                                                |
| `app_id_missing`                | Each server entry's `id` is required.                                                                                                                               |
| `app_id_wrong_type`             | Each server entry's `id` must be a string.                                                                                                                          |
| `app_id_format`                 | Each server entry's `id` must begin with `asdk_app_`, `connector_`, or `templated_apps_`, followed by a letter or digit and then only letters, digits, `_`, or `-`. |
| `app_entry_optional_wrong_type` | Each server entry's `optional` value must be `true` or `false` when provided.                                                                                       |
| `app_entry_required_wrong_type` | Each server entry's `required` value must be `true` or `false` when provided.                                                                                       |
| `app_not_eligible`              | A local or workspace package must reference an eligible, available MCP server. Directory submissions must use **With MCP** and submit the MCP server directly.      |
