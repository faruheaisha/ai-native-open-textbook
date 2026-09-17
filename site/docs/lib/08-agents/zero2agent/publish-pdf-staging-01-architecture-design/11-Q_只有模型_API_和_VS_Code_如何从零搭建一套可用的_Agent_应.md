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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/01-architecture-design.md"
sourceRel: "publish-pdf/staging/01-architecture-design.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/01-architecture-design.md"
sourceSha256: "5392c35240d8ade29e7a3bd3d16f639416d4d44c3540bc40d195968737985cc6"
pageSha256: "00b48ddc979469403b318634c3adcdbf92905bbac5cb8bbe1fd3126da3d2fb9b"
contentMode: "local-full"
zh: ""
---

## Q：只有模型 API 和 VS Code，如何从零搭建一套可用的 Agent 应用？

> 来源：百度大模型研发工程师二面（2026-08-21）

**新手答**：“写一个 while 循环调用模型，再把工具函数注册进去。”

**高手答**：

先做最小闭环，而不是先引入框架：定义 `messages` 和 Tool Schema，调用模型；若返回 Tool Call，则校验参数、执行工具、把 Tool Result 以正确角色写回上下文，再次调用模型，直到得到 Final Answer。VS Code 只是开发宿主，真正的 Agent 来自模型决策、工具执行和状态推进三者组成的循环。

从 Demo 到可用系统还要补四层：接入层负责鉴权、流式输出和请求 ID；Runtime 负责状态机、最大步骤、Timeout、取消和 Budget；Tool 层负责权限、幂等、Sandbox 和人工审批；数据与治理层负责 Session、Checkpoint、Trace、Eval 和成本。所有状态应持久化，Worker 不拥有唯一事实，工具副作用也不能依赖“模型不会重复调用”。

实现顺序建议是：先跑通一个只读工具闭环；再增加结构化校验和失败状态；随后加入持久化、恢复与观测；最后才抽象 Skill、Memory、多 Agent 和平台化能力。每一步都用固定任务集做回归，避免代码越来越多但任务成功率没有提升。

**差距在哪**：新手只会写 ReAct 循环，高手能从最小闭环推导出生产 Runtime，并知道框架只是这些责任的封装，不是 Agent 成立的前提。
