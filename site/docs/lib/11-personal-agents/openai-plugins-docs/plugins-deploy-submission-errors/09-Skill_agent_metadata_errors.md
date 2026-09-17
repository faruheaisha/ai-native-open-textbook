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
pageSha256: "2f6755e4a527b094da4f59f5300242bc3a2e8c731c3a4fe1ada145b36af08890"
contentMode: "local-full"
zh: ""
---

## Skill agent metadata errors

A bundled skill can define its own `interface` in
`skills/<skill>/agents/openai.yaml`. This controls how the skill appears to
users and is separate from the plugin manifest's `interface`. Skill interface
fields use snake_case:

```yaml
interface:
  display_name: "Summarize documents"
  short_description: "Summarize a document"
  icon_small: "./assets/icon.png"
  default_prompt: "Summarize the selected document."
```

| Name                                               | Requirement                                                                                                                                                                        |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `skill_agent_not_regular_file`                     | `agents/openai.yaml` must be a regular file.                                                                                                                                       |
| `skill_agent_unreadable`                           | `agents/openai.yaml` must be readable.                                                                                                                                             |
| `skill_agent_invalid_utf8`                         | `agents/openai.yaml` must contain valid UTF-8.                                                                                                                                     |
| `skill_agent_yaml_malformed`                       | `agents/openai.yaml` must contain valid YAML.                                                                                                                                      |
| `skill_agent_top_level_wrong_type`                 | `agents/openai.yaml` must contain a YAML mapping at the top level.                                                                                                                 |
| `skill_agent_interface_missing`                    | `interface` is required in `agents/openai.yaml` when that file is included.                                                                                                        |
| `skill_agent_interface_wrong_type`                 | `interface` in `agents/openai.yaml` must be a YAML mapping.                                                                                                                        |
| `skill_agent_display_name_missing`                 | `interface.display_name` is required and must not be empty.                                                                                                                        |
| `skill_agent_display_name_wrong_type`              | `interface.display_name` must be a string.                                                                                                                                         |
| `skill_agent_display_name_empty`                   | `interface.display_name` must not be empty.                                                                                                                                        |
| `skill_agent_short_description_missing`            | `interface.short_description` is required and must not be empty.                                                                                                                   |
| `skill_agent_short_description_wrong_type`         | `interface.short_description` must be a string.                                                                                                                                    |
| `skill_agent_short_description_empty`              | `interface.short_description` must not be empty.                                                                                                                                   |
| `skill_agent_icon_small_wrong_type`                | `interface.icon_small` must be a non-empty relative file path when provided.                                                                                                       |
| `skill_agent_icon_small_empty`                     | `interface.icon_small` must be a non-empty relative file path when provided, such as `assets/icon.png`.                                                                            |
| `skill_agent_icon_large_wrong_type`                | `interface.icon_large` must be a non-empty relative file path when provided.                                                                                                       |
| `skill_agent_icon_large_empty`                     | `interface.icon_large` must be a non-empty relative file path when provided, such as `assets/icon.png`.                                                                            |
| `skill_agent_brand_color_wrong_type`               | `interface.brand_color` must be a string when provided.                                                                                                                            |
| `skill_agent_brand_color_empty`                    | `interface.brand_color` must be a non-empty six-digit hex color when provided, such as `#1ABCFE`.                                                                                  |
| `skill_agent_brand_color_format`                   | `interface.brand_color` must be a six-digit hex color, such as `#1ABCFE`.                                                                                                          |
| `skill_agent_default_prompt_wrong_type`            | `interface.default_prompt` must be a string when provided.                                                                                                                         |
| `skill_agent_default_prompt_empty`                 | `interface.default_prompt` must be non-empty when provided.                                                                                                                        |
| `skill_agent_policy_wrong_type`                    | `policy` must be a YAML mapping when provided.                                                                                                                                     |
| `skill_agent_allow_implicit_invocation_wrong_type` | `policy` may contain only `products` and `allow_implicit_invocation`. `products` must contain `CHAT`, `CODEX`, or both, and `allow_implicit_invocation` must be `true` or `false`. |
| `skill_agent_dependencies_wrong_type`              | `dependencies` must be a YAML mapping; only `tools` is supported.                                                                                                                  |
| `skill_agent_dependency_unsupported`               | Only `dependencies.tools` is supported in `agents/openai.yaml`.                                                                                                                    |
