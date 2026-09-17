---
title: "架构选型：ReAct、Plan-and-Execute 与 ToT 怎么选"
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
pageSha256: "2dabafbf6e1b8a61e0005d4e6117568277f6071567874a6382884c501dbef2c0"
contentMode: "local-full"
zh: ""
---

# 架构选型：ReAct、Plan-and-Execute 与 ToT 怎么选

架构选型是 Agent 面试的第一类高频题。面试官不关心你能不能背出 ReAct 的定义——他关心的是：**给你一个真实场景，你怎么选、为什么选、选完怎么落地。**

---

## 本篇目录

- [推理范式与架构选型](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/01-推理范式与架构选型.md)
- [Agent 组成与设计边界](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/02-Agent_组成与设计边界.md)
- [系统设计原则与模式](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/03-系统设计原则与模式.md)
- [系统集成与规划保障](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/04-系统集成与规划保障.md)
- [场景设计与可靠性](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/05-场景设计与可靠性.md)
- [Q：Skill 和 Workflow 的区别是什么？什么场景该用 Skill 而不是 Workflow？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/06-Q_Skill_和_Workflow_的区别是什么_什么场景该用_Skill_而.md)
- [Q：DAG 与含循环图在 Agent 编排中的区别和适用场景](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/07-Q_DAG_与含循环图在_Agent_编排中的区别和适用场景.md)
- [Q：基于强化学习的 Agent 与传统基于 Prompt 的 Agent 有何区别？各自的适用场景？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/08-Q_基于强化学习的_Agent_与传统基于_Prompt_的_Agent_有何区.md)
- [Agent 中间件（Middleware）](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/09-Agent_中间件_Middleware.md)
- [Q：Coding Agent 的完整链路是怎么运转的？从用户输入到代码产出的全流程](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/10-Q_Coding_Agent_的完整链路是怎么运转的_从用户输入到代码产出的全流.md)
- [Q：只有模型 API 和 VS Code，如何从零搭建一套可用的 Agent 应用？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/11-Q_只有模型_API_和_VS_Code_如何从零搭建一套可用的_Agent_应.md)
- [Q：用拓扑排序（规则式）管理任务依赖 vs 让大模型自己推理决策执行顺序，各有什么问题？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/12-Q_用拓扑排序_规则式_管理任务依赖_vs_让大模型自己推理决策执行顺序_各有什.md)
- [Q：设计一个内部的多源文档问答 AI，架构设计是什么？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/13-Q_设计一个内部的多源文档问答_AI_架构设计是什么.md)
- [Q：ReAct 在工程实现中，消息和状态协议应该怎么设计？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/14-Q_ReAct_在工程实现中_消息和状态协议应该怎么设计.md)
- [Q：设计一个预订机票的 Agent，如何处理澄清、支付确认和失败补偿？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/15-Q_设计一个预订机票的_Agent_如何处理澄清_支付确认和失败补偿.md)
- [Q：Agent 如何持续推进 Goal，并避免行为漂移和目标漂移？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/16-Q_Agent_如何持续推进_Goal_并避免行为漂移和目标漂移.md)
- [Q：在 AI/Agent 辅助编码时代，为什么 DDD 和清晰的领域边界反而更重要？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/17-Q_在_AI_Agent_辅助编码时代_为什么_DDD_和清晰的领域边界反而更重.md)
- [Q：Agent 组件拆解为什么适合责任链模式？与状态机、DAG 的边界是什么？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/18-Q_Agent_组件拆解为什么适合责任链模式_与状态机_DAG_的边界是什么.md)
- [这类题的答题模式](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/19-这类题的答题模式.md)
