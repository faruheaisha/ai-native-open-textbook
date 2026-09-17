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
pageSha256: "378259c8a91dd80cb2db5ff2051908a8dc2620fe1f61c2f1a79307ddf5abd064"
contentMode: "local-full"
zh: ""
---

## Package warnings

These warnings identify package content that validation ignores or normalizes.
They don't block submission. Review them to confirm the submitted plugin
contains the expected files and settings.

| Name                              | Requirement                                                                                                                                  |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `duplicate_app_reference`         | Each server ID in `.app.json` must be referenced once; duplicate references are treated as one server.                                       |
| `undeclared_app_manifest_ignored` | A root `.app.json` is imported only when the plugin-manifest `apps` field is set to `./.app.json`.                                           |
| `undeclared_mcp_manifest_ignored` | A root `.mcp.json` is imported only when the plugin-manifest `mcpServers` field is set to `./.mcp.json`.                                     |
| `skill_file_ignored`              | Files directly under `skills/` aren't imported as skills; each skill must be in a directory containing `SKILL.md`.                           |
| `skill_symlink_ignored`           | Symbolic links directly under `skills/` aren't imported as skills; each skill must be a real directory containing `SKILL.md`.                |
| `skill_frontmatter_adjusted`      | Skill `name` and `description` are normalized during import by trimming outer whitespace and collapsing internal whitespace.                 |
| `skill_metadata_ignored`          | Skill interface settings must use the `interface` mapping in `agents/openai.yaml`; `metadata` in `SKILL.md` doesn't configure the interface. |
