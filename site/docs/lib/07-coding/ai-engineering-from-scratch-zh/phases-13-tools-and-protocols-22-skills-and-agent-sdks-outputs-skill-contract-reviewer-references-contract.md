---
title: "可移植契约清单"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/13-tools-and-protocols/22-skills-and-agent-sdks/outputs/skill-contract-reviewer/references/contract.md"
sourceRel: "phases/13-tools-and-protocols/22-skills-and-agent-sdks/outputs/skill-contract-reviewer/references/contract.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/13-tools-and-protocols/22-skills-and-agent-sdks/outputs/skill-contract-reviewer/references/contract.md"
sourceSha256: "ba539d916ea75a779ffe7ce7afefbc468e6bbb5b0868f7b88924fb128482ac34"
pageSha256: "ba539d916ea75a779ffe7ce7afefbc468e6bbb5b0868f7b88924fb128482ac34"
contentMode: "local-full"
zh: ""
---

# 可移植契约清单

- Bundle 是包含普通 `SKILL.md` 文件的目录。
- Frontmatter 从第一行开始，并有结束分隔符。
- 存在 `name`，长度不超过 64 个字符，只使用小写字母、数字和单连字符。
- `name` 与 Bundle 目录匹配。
- 存在 `description`，长度不超过 1024 个字符，并说明 skill 何时有用。
- 可选 `compatibility` 存在时包含 1 至 500 个字符。
- 可选 `metadata` 将字符串键映射为字符串值。
- 可选实验性 `allowed-tools` 是非空、以空格分隔的字符串，其行为已在目标 host 中验证。
- 未知运行时字段与可移植包契约分开，并由显式适配器处理。
- Markdown 正文包含流程。
- 可选可移植元数据与 host 专属扩展仍可区分。

通过此清单只代表包在结构上可加载，并不授予文件系统、网络、密钥、子进程或工具权限。
