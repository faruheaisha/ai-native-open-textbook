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
pageSha256: "ba1419237730a5d679aaad87ced0d68555c8d06563d16aea2f0f85c50739f7ab"
contentMode: "local-full"
zh: ""
---

## Skill errors

| Name                                      | Requirement                                                                                   |
| ----------------------------------------- | --------------------------------------------------------------------------------------------- |
| `skill_manifest_missing`                  | Skill must contain a `SKILL.md` file.                                                         |
| `skill_bundle_too_large`                  | Each compressed skill bundle must be within the MiB limit reported in the error.              |
| `skill_directory_hidden`                  | Skill directory names must not begin with `.`.                                                |
| `skill_manifest_nested`                   | Each skill directory must be an immediate child of `skills/`.                                 |
| `skill_manifest_not_regular_file`         | `SKILL.md` must be a regular file.                                                            |
| `skill_manifest_unreadable`               | `SKILL.md` must be readable.                                                                  |
| `skill_manifest_invalid_utf8`             | `SKILL.md` must contain valid UTF-8.                                                          |
| `skill_frontmatter_missing`               | `SKILL.md` must start with YAML front matter between `---` lines.                             |
| `skill_frontmatter_unclosed`              | `SKILL.md` YAML front matter must end with `---`.                                             |
| `skill_frontmatter_yaml_malformed`        | `SKILL.md` front matter must contain valid YAML.                                              |
| `skill_frontmatter_wrong_type`            | `SKILL.md` front matter must contain a YAML mapping.                                          |
| `skill_name_missing`                      | `name` is required and must not be empty.                                                     |
| `skill_name_wrong_type`                   | `name` must be a string.                                                                      |
| `skill_name_empty`                        | `name` must be non-empty.                                                                     |
| `skill_name_character_unsupported`        | Skill front matter `name` must use supported text.                                            |
| `skill_description_missing`               | `description` is required and must not be empty.                                              |
| `skill_description_wrong_type`            | `description` must be a string.                                                               |
| `skill_description_empty`                 | `description` must be non-empty.                                                              |
| `skill_description_too_long`              | `description` must be 1,024 characters or fewer.                                              |
| `skill_description_character_unsupported` | Skill front matter `description` must use supported text.                                     |
| `skill_body_empty`                        | Skill instructions must not be empty.                                                         |
| `skill_identity_too_long`                 | The combined plugin and skill name (`plugin-name:skill-name`) must be 64 characters or fewer. |
| `skill_identity_duplicate`                | Each skill `name` must be unique within the plugin.                                           |
