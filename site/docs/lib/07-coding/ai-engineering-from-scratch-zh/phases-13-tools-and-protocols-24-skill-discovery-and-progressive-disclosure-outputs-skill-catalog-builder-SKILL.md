---
title: "Skill 目录构建器"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/13-tools-and-protocols/24-skill-discovery-and-progressive-disclosure/outputs/skill-catalog-builder/SKILL.md"
sourceRel: "phases/13-tools-and-protocols/24-skill-discovery-and-progressive-disclosure/outputs/skill-catalog-builder/SKILL.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/13-tools-and-protocols/24-skill-discovery-and-progressive-disclosure/outputs/skill-catalog-builder/SKILL.md"
sourceSha256: "ad863d9e65fb8e4a0d676959b3872f8c3697f7ded046f97b5b2c9e41576ade6c"
pageSha256: "ad863d9e65fb8e4a0d676959b3872f8c3697f7ded046f97b5b2c9e41576ade6c"
contentMode: "local-full"
zh: ""
---

# Skill 目录构建器

当 agent 宿主需要跨多个 skill 目录进行确定性发现时使用此 skill。

1. 阅读 `references/discovery-contract.md`。
2. 查看 `assets/scope-policy.json` 中的宿主策略示例；不要假设其顺序具有通用性。
3. 以从最高到最低的优先级列出 scope，运行 `python3 scripts/build_catalog.py project=PATH user=PATH`。
4. 激活 skill 前检查 JSON 的 `collisions` 和 `omitted` 数组。
5. 只加载选中的 SKILL.md 正文；仅当正文点名时才加载直接引用。

发现期间绝不执行打包脚本；绝不按偶然的文件系统顺序选择同优先级重复项。

返回目录预算、选中条目、冲突解决结果和省略项。
