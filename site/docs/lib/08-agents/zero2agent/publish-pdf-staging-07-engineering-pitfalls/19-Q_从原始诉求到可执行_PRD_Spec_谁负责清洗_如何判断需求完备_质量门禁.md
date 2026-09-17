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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/07-engineering-pitfalls.md"
sourceRel: "publish-pdf/staging/07-engineering-pitfalls.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/07-engineering-pitfalls.md"
sourceSha256: "7be5d79d7f9b134845ed49bebe8aa81acea85d81cc9c8aa99f6133ad085da81e"
pageSha256: "91b72b85300cc7d8cf0c3ab71c4f803c4dcf94df5e4bb5f2a1840797725ef795"
contentMode: "local-full"
zh: ""
---

## Q：从原始诉求到可执行 PRD/Spec，谁负责清洗？如何判断需求完备，质量门禁放在哪层？

> 来源：电商库存一面 / 小得盈满一面

**新手答**：“产品经理把需求写清楚，研发发现缺信息再问，最后让 Agent 按 PRD 开发。”

**高手答**：

需求清洗不是把一段口语润色成文档，而是把**业务意图变成可验证的执行契约**。业务 Owner/产品经理对目标和语义负责，需求接入层可以用 Agent 做抽取、归一化和缺口提示，架构或研发 Owner 判断技术可执行性；模型只能辅助整理，不能替人确认业务事实与风险。

**结构化输入契约**至少包含：目标与成功指标、目标用户和场景、范围内/范围外、业务事实与数据来源、前置条件、权限与依赖、接口和数据约束、明确的验收案例、性能/可用性/安全/隐私等非功能要求、风险与回滚方案，以及负责人和时间约束。每个关键结论要能回指原始诉求、会议记录或确认人。

判断完备可用 Definition of Ready：关键字段齐全；同一术语、优先级和约束之间没有未解决冲突；关键假设已标注；异常、边界和失败路径有处理方式；验收标准能写成测试或人工检查项；高风险操作有权限、审批和回滚。缺信息时输出“已知、未知、冲突、需谁确认”，而不是让 Agent 自行补全。

质量门禁应分层放置：

1. **接入层**：schema、必填项、术语和来源校验，拦截结构性缺失。
2. **规划前**：做冲突、依赖、可行性、风险和非功能要求检查；未达到 Ready 状态不进入执行计划。
3. **执行前**：对写库、发版、付费、外发信息等不可逆或高风险动作设置人工批准，并绑定批准范围。
4. **交付前**：按验收案例、非功能指标和回滚演练做发布门禁。

PRD/Spec 必须版本化和可追溯：记录需求 ID、版本、变更原因、来源、Owner、审批人、验收用例及关联任务；每次规划和执行都绑定具体 Spec 版本。需求变化后生成 diff 并重新评估受影响的计划与测试，不能静默覆盖旧文档后继续跑。

**差距在哪**：新手把需求质量寄托在“有人写清楚”。高手明确语义责任人、结构化契约、完备性判据、分层门禁和版本追溯，让不完整需求在执行前暴露，并把高风险决策留给人。
