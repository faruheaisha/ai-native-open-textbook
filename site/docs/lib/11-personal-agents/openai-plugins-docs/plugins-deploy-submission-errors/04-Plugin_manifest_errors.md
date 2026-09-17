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
pageSha256: "223379d269e0a28fc198e239c6e8ae2d1b47890c1cbfcb086fd6bb5483269d6c"
contentMode: "local-full"
zh: ""
---

## Plugin manifest errors

| Name                                        | Requirement                                                                                                                                                                                                            |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugin_manifest_missing`                   | ZIP must contain root `plugin.json` with a supported Agent Plugins schema, `.codex-plugin/plugin.json`, `.agent-plugin/plugin.json`, or `.claude-plugin/plugin.json` at the root or in its single top-level directory. |
| `plugin_manifest_not_file`                  | Plugin manifest must be a regular JSON file.                                                                                                                                                                           |
| `plugin_manifest_unreadable`                | Plugin manifest must be readable UTF-8 text.                                                                                                                                                                           |
| `plugin_manifest_json_malformed`            | Plugin manifest must contain valid JSON; malformed syntax is reported with a line number.                                                                                                                              |
| `plugin_manifest_root_not_object`           | Plugin manifest must contain a JSON object at the top level.                                                                                                                                                           |
| `codex_manifest_parent_not_directory`       | `.codex-plugin` must be a directory.                                                                                                                                                                                   |
| `codex_manifest_path_not_file`              | `.codex-plugin/plugin.json` must be a regular JSON file.                                                                                                                                                               |
| `plugin_id_wrong_type`                      | `id` must be a string when provided.                                                                                                                                                                                   |
| `plugin_id_empty`                           | `id` must be non-empty when provided.                                                                                                                                                                                  |
| `plugin_name_missing`                       | `name` is required.                                                                                                                                                                                                    |
| `plugin_name_wrong_type`                    | `name` must be a string.                                                                                                                                                                                               |
| `plugin_name_empty`                         | `name` must be non-empty.                                                                                                                                                                                              |
| `plugin_name_too_long`                      | `name` must be 64 characters or fewer.                                                                                                                                                                                 |
| `plugin_name_format`                        | `name` must start with an ASCII letter or digit and contain only ASCII letters, digits, `_`, or `-`.                                                                                                                   |
| `plugin_version_missing`                    | `version` is required.                                                                                                                                                                                                 |
| `plugin_version_wrong_type`                 | `version` must be a string.                                                                                                                                                                                            |
| `plugin_version_empty`                      | `version` must be a non-empty semantic-version string, such as `1.0.0`.                                                                                                                                                |
| `plugin_version_not_semver`                 | `version` must use semantic versioning, such as `1.0.0`.                                                                                                                                                               |
| `plugin_version_too_long`                   | `version` must be 64 characters or fewer.                                                                                                                                                                              |
| `plugin_description_missing`                | `description` is required.                                                                                                                                                                                             |
| `plugin_description_wrong_type`             | `description` must be a string.                                                                                                                                                                                        |
| `plugin_description_empty`                  | `description` must be non-empty.                                                                                                                                                                                       |
| `plugin_description_too_long`               | `description` must be 1,024 characters or fewer.                                                                                                                                                                       |
| `plugin_description_character_unsupported`  | `description` must use supported text. Line breaks are allowed.                                                                                                                                                        |
| `plugin_developer_missing`                  | `author.name` is required. `interface.developerName` is also required and is reported separately.                                                                                                                      |
| `plugin_author_wrong_type`                  | `author` must be an object.                                                                                                                                                                                            |
| `plugin_author_name_wrong_type`             | `author.name` must be a string.                                                                                                                                                                                        |
| `plugin_author_name_empty`                  | `author.name` must be non-empty.                                                                                                                                                                                       |
| `plugin_author_name_too_long`               | `author.name` must be 120 characters or fewer.                                                                                                                                                                         |
| `plugin_author_name_character_unsupported`  | `author.name` must use supported text.                                                                                                                                                                                 |
| `plugin_author_email_wrong_type`            | `author.email` must be a string when provided.                                                                                                                                                                         |
| `plugin_author_email_empty`                 | `author.email` must be non-empty when provided.                                                                                                                                                                        |
| `plugin_author_email_too_long`              | `author.email` must be 320 characters or fewer.                                                                                                                                                                        |
| `plugin_author_email_character_unsupported` | `author.email` must use supported text.                                                                                                                                                                                |
| `plugin_author_url_wrong_type`              | `author.url` must be a string when provided.                                                                                                                                                                           |
| `plugin_author_url_empty`                   | `author.url` must be non-empty when provided.                                                                                                                                                                          |
| `plugin_author_url_not_https`               | `author.url` must be an HTTPS URL.                                                                                                                                                                                     |
| `plugin_author_url_has_credentials`         | `author.url` must not contain credentials.                                                                                                                                                                             |
| `plugin_author_url_too_long`                | `author.url` must be 2,048 characters or fewer.                                                                                                                                                                        |
| `plugin_author_url_character_unsupported`   | `author.url` must use supported text.                                                                                                                                                                                  |
