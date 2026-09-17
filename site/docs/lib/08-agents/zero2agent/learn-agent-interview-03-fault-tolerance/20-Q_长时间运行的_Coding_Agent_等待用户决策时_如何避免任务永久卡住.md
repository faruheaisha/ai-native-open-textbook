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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/03-fault-tolerance/index.md"
sourceRel: "learn-agent-interview/03-fault-tolerance/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/03-fault-tolerance/index.md"
sourceSha256: "ec931d48d76195508909df9d726fa4662052593581a0a4b80cae3e9b5dc97699"
pageSha256: "0ad813d53882ac279b7bb2dd6d74bc71c3ab8d757e192d0bb248b8974bb3e906"
contentMode: "local-full"
zh: ""
---

## Q：长时间运行的 Coding Agent 等待用户决策时，如何避免任务永久卡住？

> 来源：小红书 Agent 岗一面

**新手答**：“需要用户确认就一直等，用户回来后再继续。”

**高手答**：

“支持数小时运行”不等于一个进程连续占着资源，也不等于完全不需要人。Agent 应把长任务做成**可挂起、可恢复的持久化状态机**：每完成一个可重放步骤就写 checkpoint，保存 `task_id`、当前状态、已完成步骤、产物引用、待确认事项、预算和版本号。

遇到架构取舍、破坏性操作、需求歧义等必须由用户决策的节点时，执行器把任务从 `RUNNING` 转成 `WAITING_FOR_USER`，释放 worker 和模型连接，并生成结构化确认请求。等待策略应包含：

1. **超时和提醒**：设置业务 TTL，只在关键时间点提醒，不高频轮询。
2. **默认策略**：只有可逆、低风险且用户事先授权的动作才能按默认值继续。
3. **安全终止**：高风险动作超时后进入 `EXPIRED/CANCELLED`，绝不能擅自执行。
4. **恢复校验**：用户回复后重新获取租约，检查代码版本、外部资源和前置条件是否变化，再从 checkpoint 续跑；环境已漂移则重规划。

因此，Agent 可以连续工作几小时，但不会承诺“全程无人决策”。真正的工程能力是让等待不占资源、恢复不重复副作用、超时不越权。

**差距在哪**：新手把长任务理解成长连接。高手区分逻辑任务生命周期与物理进程生命周期，并说明状态持久化、超时、租约、幂等和恢复校验。
