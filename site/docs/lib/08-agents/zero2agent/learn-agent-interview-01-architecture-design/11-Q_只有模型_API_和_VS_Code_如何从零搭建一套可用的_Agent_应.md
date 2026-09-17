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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/01-architecture-design/index.md"
sourceRel: "learn-agent-interview/01-architecture-design/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/01-architecture-design/index.md"
sourceSha256: "27323a2663d0a83175728db159268a6a57cdca2097344c6d6c8c0210cc6da232"
pageSha256: "4b7ceacd110e6931eb310395fd7f13b2c933c76e523690fc6ee1b1d998620fc0"
contentMode: "local-full"
zh: ""
---

## Q：只有模型 API 和 VS Code，如何从零搭建一套可用的 Agent 应用？

> 来源：百度大模型研发工程师二面（2026-08-21）【[月之暗面（Moonshot）- Agent 应用开发岗](https://www.nowcoder.com/discuss/926274239747952640)追问：从零开始设计一个 Agent 应用时，整体规划如何制定？】

**新手答**：“写一个 while 循环调用模型，再把工具函数注册进去。”

**高手答**：

先做最小闭环，而不是先引入框架：定义 `messages` 和 Tool Schema，调用模型；若返回 Tool Call，则校验参数、执行工具、把 Tool Result 以正确角色写回上下文，再次调用模型，直到得到 Final Answer。VS Code 只是开发宿主，真正的 Agent 来自模型决策、工具执行和状态推进三者组成的循环。

从 Demo 到可用系统还要补四层：接入层负责鉴权、流式输出和请求 ID；Runtime 负责状态机、最大步骤、Timeout、取消和 Budget；Tool 层负责权限、幂等、Sandbox 和人工审批；数据与治理层负责 Session、Checkpoint、Trace、Eval 和成本。所有状态应持久化，Worker 不拥有唯一事实，工具副作用也不能依赖“模型不会重复调用”。

实现顺序建议是：先跑通一个只读工具闭环；再增加结构化校验和失败状态；随后加入持久化、恢复与观测；最后才抽象 Skill、Memory、多 Agent 和平台化能力。每一步都用固定任务集做回归，避免代码越来越多但任务成功率没有提升。

**差距在哪**：新手只会写 ReAct 循环，高手能从最小闭环推导出生产 Runtime，并知道框架只是这些责任的封装，不是 Agent 成立的前提。
