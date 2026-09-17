---
title: "发现契约"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/13-tools-and-protocols/24-skill-discovery-and-progressive-disclosure/outputs/skill-catalog-builder/references/discovery-contract.md"
sourceRel: "phases/13-tools-and-protocols/24-skill-discovery-and-progressive-disclosure/outputs/skill-catalog-builder/references/discovery-contract.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/13-tools-and-protocols/24-skill-discovery-and-progressive-disclosure/outputs/skill-catalog-builder/references/discovery-contract.md"
sourceSha256: "3fb5bcc2a395aa9e077e3db9f3464346f31c6ed04cd4550aea14090439c21c20"
pageSha256: "3fb5bcc2a395aa9e077e3db9f3464346f31c6ed04cd4550aea14090439c21c20"
contentMode: "local-full"
zh: ""
---

# 发现契约

发现包含三个披露层级：

1. 目录：读取路由所需的 `name`、`description`、scope 和路径。
2. 激活：在显式大小预算内加载选中的 SKILL.md 正文。
3. 执行支持：仅在需要时加载直接点名的文件，例如 `references/schema.md`。

宿主负责 scope 位置、优先级、冲突行为和预算；目录构建器必须在输出中让这些选择可见。

可移植的一级引用应是 skill 目录或其一个直接子目录内的普通文件。拒绝绝对路径、`..`、反斜杠、符号链接和更深的引用链。
