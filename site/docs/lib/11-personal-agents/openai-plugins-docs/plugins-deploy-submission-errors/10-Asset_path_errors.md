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
pageSha256: "6435468908066590ef47dd931baffaa8be43c7ee0936a89805acb627045577d7"
contentMode: "local-full"
zh: ""
---

## Asset path errors

| Name                                        | Requirement                                                                                                                                     |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `declared_asset_path_wrong_type`            | The named asset field must be a file path string.                                                                                               |
| `declared_asset_path_empty`                 | The named asset field must not be empty.                                                                                                        |
| `declared_asset_path_has_outer_whitespace`  | The named asset field must not begin or end with whitespace.                                                                                    |
| `declared_asset_path_has_control_character` | The named asset field must not contain characters U+0000–U+001F or U+007F.                                                                      |
| `branding_asset_path_missing_root_prefix`   | The named asset field must start with `./`.                                                                                                     |
| `declared_asset_path_unsafe`                | The named asset field must be a relative path inside the plugin and must not contain an absolute path, drive prefix, or `..` traversal segment. |
| `declared_asset_path_outside_package`       | The named asset field must reference a file inside the plugin.                                                                                  |
| `declared_asset_file_missing`               | The named asset field references a file that does not exist.                                                                                    |
| `declared_asset_not_regular_file`           | The named asset field must reference a file, not a directory or special file.                                                                   |
