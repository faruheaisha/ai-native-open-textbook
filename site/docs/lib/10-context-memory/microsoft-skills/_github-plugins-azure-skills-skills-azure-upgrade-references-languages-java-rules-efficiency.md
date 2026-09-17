---
title: "Efficiency"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/rules/efficiency.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/rules/efficiency.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/rules/efficiency.md"
sourceSha256: "b902dba50d85fe286f1b57f7203e9c01fca311a7ac704f5fe7e4ca566f83db7c"
pageSha256: "b902dba50d85fe286f1b57f7203e9c01fca311a7ac704f5fe7e4ca566f83db7c"
contentMode: "local-full"
zh: ""
---

# Efficiency

- **Targeted reads**: Use `grep` over full file reads; read sections, not entire files.
- **Quiet commands**: Use `-q`, `--quiet` for build/test when appropriate.
- **Progressive writes**: Update `plan.md` and `progress.md` incrementally, not at end.
