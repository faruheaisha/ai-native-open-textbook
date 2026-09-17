---
title: "Zero2Agent：从零实现 Agent"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/08-prompt-engineering.md"
sourceRel: "publish-pdf/staging/08-prompt-engineering.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/08-prompt-engineering.md"
sourceSha256: "d712b57348415001dc95647a70207bec02aaff7ce2fa002468a87ac72874651a"
pageSha256: "030162c376bf24479ba70b80ac8cb22b7db61dc62fccb9470f9f29c51835f3d7"
contentMode: "local-full"
zh: ""
---

## Q：为什么一个很短的 Skill 也可能有效？如何验证效果来自哪里？

> 来源：OPPO AI 全栈一面（2026-08-23）

**新手答**：“模型本身能力强，Skill 只需要提醒关键步骤。”

**高手答**：短 Skill 可能贡献触发语义、关键顺序、禁止项或对外部工具/上下文的索引，而不是承载全部知识。用消融实验分别移除描述、步骤、示例、工具和项目上下文，固定模型与任务集，比较路由、成功率、Token 和副作用；再用无关任务检查误触发。若效果来自仓库已有上下文，应明确依赖，不能把收益都归功于短文本。

**差距在哪**：新手凭感觉解释，高手通过组件消融识别真实因果贡献。
