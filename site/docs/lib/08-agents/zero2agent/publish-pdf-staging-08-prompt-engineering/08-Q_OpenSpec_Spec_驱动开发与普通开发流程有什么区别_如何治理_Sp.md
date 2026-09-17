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
pageSha256: "f5c62a74522922dc67babe82ae348c97913b75fb003cbe7c640fac0ee7e1f961"
contentMode: "local-full"
zh: ""
---

## Q：OpenSpec/Spec 驱动开发与普通开发流程有什么区别？如何治理 Spec 过期？

> 来源：浦金科一面、电商库存一面（2026-08-12 至 2026-08-15）

**新手答**：“先写清楚需求和验收标准，再让 Agent 按 Spec 开发。”

**高手答**：Spec 是版本化执行契约，至少包含目标、范围、接口、约束、非目标、验收和决策记录，并与代码提交、测试和产物双向关联。变更先更新 Spec 或生成显式偏差记录；快速修复是否走完整流程由风险、影响面和可回滚性决定。CI 检查接口/测试与 Spec 的映射，运行数据和业务变更触发过期提醒；废弃 Spec 保留历史但停止路由，不能让 Agent 自动用旧规则覆盖新事实。

**差距在哪**：新手把 Spec 当 Prompt，高手把它当可演进、可审计的工程契约。
