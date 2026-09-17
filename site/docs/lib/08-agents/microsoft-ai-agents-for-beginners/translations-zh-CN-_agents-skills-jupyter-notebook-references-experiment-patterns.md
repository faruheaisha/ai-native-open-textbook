---
title: "实验模式"
sourceId: "08-agents/microsoft-ai-agents-for-beginners"
sourceTitle: "AI Agents for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/ai-agents-for-beginners"
entryUrl: "https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/translations/zh-CN/.agents/skills/jupyter-notebook/references/experiment-patterns.md"
sourceRel: "translations/zh-CN/.agents/skills/jupyter-notebook/references/experiment-patterns.md"
rawUrl: "/raw/08-agents/microsoft-ai-agents-for-beginners/translations/zh-CN/.agents/skills/jupyter-notebook/references/experiment-patterns.md"
sourceSha256: "fa360803562d64d3892615ad5fa8299bf8d73d096ad28e3b292bb6f52864a371"
pageSha256: "fa360803562d64d3892615ad5fa8299bf8d73d096ad28e3b292bb6f52864a371"
contentMode: "local-full"
zh: ""
---

# 实验模式

将此结构用于探索性和试验性工作：

- 标题与目标：说明问题和成功标准。
- 设置与可复现性：只导入所需内容，尽早设置随机种子，并将配置保存在一个简短的单元中。
- 计划：在运行代码之前列出假设、参数搜索（sweeps）和评估指标。
- 最小基线：从最小的可运行示例开始，并在增加复杂性之前确认其端到端运行。
- 结果与备注：在相关代码附近用 markdown 概述发现，并以小的字典或类似表格的结构记录关键指标。
- 下一步：决定是继续、转向还是停止，并以简短要点记录后续想法。
