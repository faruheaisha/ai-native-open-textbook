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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/08-prompt-engineering/index.md"
sourceRel: "learn-agent-interview/08-prompt-engineering/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/08-prompt-engineering/index.md"
sourceSha256: "d742947505870bddb5c387683d51215ba6095898b0fc5efb77e32ec65ffd84c1"
pageSha256: "071070de822a48153d25e29df2e790d6583c76f3d8ea1bcc4fec8bc85d3e700e"
contentMode: "local-full"
zh: ""
---

## Q：OpenSpec/Spec 驱动开发与普通开发流程有什么区别？如何治理 Spec 过期？

> 来源：浦金科一面、电商库存一面（2026-08-12 至 2026-08-15）；[蚂蚁 Agent 开发一面](https://www.nowcoder.com/feed/main/detail/39451cad5d2245b491d16778f2a9ca01)；[OPPO IT 开发一面](https://www.nowcoder.com/discuss/923561467092160512)；[字节 AI 应用开发二面](https://www.nowcoder.com/feed/main/detail/7e8a821479a649fd914e449d312eeb95)

**新手答**：“先写清楚需求和验收标准，再让 Agent 按 Spec 开发。”

**高手答**：Spec 是版本化执行契约，至少包含目标、范围、接口、约束、非目标、验收和决策记录，并与代码提交、测试和产物双向关联。变更先更新 Spec 或生成显式偏差记录；快速修复是否走完整流程由风险、影响面和可回滚性决定。CI 检查接口/测试与 Spec 的映射，运行数据和业务变更触发过期提醒；废弃 Spec 保留历史但停止路由，不能让 Agent 自动用旧规则覆盖新事实。

两个月后需求变化时，先基于旧 Spec、当前代码和新需求生成影响分析，明确哪些约束被替换、哪些仍有效，再更新 Spec 版本并同步修改实现、测试和迁移说明。每次 Agent Run 固定读取一个已批准的 Spec 版本；AI 可以提出 diff 和补测试，但不能自行把自然语言新需求覆盖成事实。合并门禁检查“新验收项有测试、被删除约束有决策记录、代码行为与 Spec 一致”，否则需求、代码和测试会各自演进成三套真相。

**差距在哪**：新手把 Spec 当 Prompt，高手把它当可演进、可审计的工程契约。
