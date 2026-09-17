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
pageSha256: "8816f493345e402f94cd6ae9403cb6cc0bd87177ef81d4b7f779aa59dd2d09b7"
contentMode: "local-full"
zh: ""
---

## Plugin root errors

| Name                           | Requirement                                                                                         |
| ------------------------------ | --------------------------------------------------------------------------------------------------- |
| `plugin_root_missing`          | The selected path must exist and be a directory containing a plugin.                                |
| `archive_plugin_files_missing` | A skills-only ZIP must contain a supported plugin manifest and at least one valid skill.            |
| `plugin_root_ambiguous`        | ZIP must contain exactly one plugin root, either at the archive root or in one top-level directory. |
| `plugin_root_has_siblings`     | A ZIP with a top-level plugin directory must not contain sibling files.                             |
