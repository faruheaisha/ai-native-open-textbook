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
pageSha256: "1c1f7c1299de420c7ec0570fb04a0b8dfa4cd03e57ee682957cbf8599c4b6f21"
contentMode: "local-full"
zh: ""
---

## Q：DAG 与含循环图在 Agent 编排中的区别和适用场景

> 来源：猎豹移动Agent全栈开发

**新手答**：“DAG 就是不能有环的图，有环就是循环图。”

**高手答**：

这涉及 Agent 编排的底层拓扑选择：

**DAG（有向无环图）**：
- 特点：每个节点只执行一次，执行路径确定，可以拓扑排序
- 适合场景：确定性工作流（数据 ETL、文档处理管线、审批流程）
- 优势：可预测执行时间和成本、容易做并行优化、调试简单
- LangGraph 中：用条件边但无回边，本质是分支-汇聚结构

**含循环图（如循环 RAG、ReAct Loop）**：
- 特点：允许回边，节点可能多次执行，需要终止条件
- 适合场景：需要迭代精化的任务（多轮检索、自我修正、Plan-Execute-Reflect）
- 优势：能处理不确定性任务，支持 self-reflection 和渐进式解决
- 风险：死循环、成本不可控，需要 max_iterations + 循环检测

**混合架构**：实际生产中常见——外层 DAG 控制大流程（如：理解→规划→执行→验证），内层节点允许循环（如执行节点内的 ReAct loop）。

**差距在哪**：面试官要看你是否理解“确定性和灵活性的 trade-off”——DAG 省钱可控但傻，循环图聪明但贵且危险，工程上常常混合使用。
