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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/.claude/skills/classify-interview-questions/question-index.md"
sourceRel: ".claude/skills/classify-interview-questions/question-index.md"
rawUrl: "/raw/08-agents/zero2agent/.claude/skills/classify-interview-questions/question-index.md"
sourceSha256: "8c0501b7d449991c01fe556083296af4f2a174f68accc5bd27df904bb334a33d"
pageSha256: "6de391c54c4903c79b85eabb9604641408ef935cb8d2d3a03155a5924b84a966"
contentMode: "local-full"
zh: ""
---

## 16-agent-infra（23题）

1. 为什么需要 Checkpoint，恢复时从哪里继续？ — 长任务恢复与状态管理高频题 / [字节数据平台 Agent 一面](https://www.nowcoder.com/feed/main/detail/f5f840632a19417b91b8987762427a6a) / [MINISO Agent 开发实习一面](https://www.nowcoder.com/feed/main/detail/f844a4ac20be44bc9b3f756bd0ebb84c) / [哔哩哔哩秋招一面](https://www.nowcoder.com/feed/main/detail/87eadf9db3b14bb6912064ee79267c30)【阿里 Agent Infra 一面题库同题：状态管理、Checkpoint 与保存时机】【[拼多多 - Agent 开发岗（工程化 + 数据库）](https://www.nowcoder.com/discuss/926273867092430848)追问：断点恢复（服务重启后加载未完成状态）？】【[深圳tuitti视界之外实习一面](https://www.nowcoder.com/feed/main/detail/9b1329caf4b64389a0ab666585bda045)追问：这时候你是怎样恢复图的运行状态的？】
2. 如何支撑几十万并发 Agent Task，并把它观测清楚？ — 高并发调度与 Agent Observability 高频题 / [顺极 Agent 开发二面](https://www.nowcoder.com/feed/main/detail/93a26b84a6634558b7228bf350c709b5) / [中国电信风控 Agent 二面](https://www.nowcoder.com/feed/main/detail/22e18a3d20734429aec41b37744beadc)【阿里 Agent Infra 一面题库同题：MQ、背压、多租户、Scheduler 与 Worker 拆分】【[互联网金融 Agent 开发三面](https://www.nowcoder.com/feed/main/detail/88c55ee65af04ac98c218b9d17c47a71)】【[百度 Agent 一面](https://www.nowcoder.com/feed/main/detail/53542e2dcfd44b1d84b0ae55b4fc1b35)】【[拼多多 - Agent 开发岗（工程化 + 数据库）](https://www.nowcoder.com/discuss/926273867092430848)追问：长耗时 Agent 的资源占用及并发优化？】
3. 一次 Agent 请求的完整执行链路是什么？ — Agent Runtime 管线高频题【字节火山引擎 Managed Agent 一面同题】【阿里 Agent Infra 一面题库同题】【[阿里控股 Agent Infra 二面](https://www.nowcoder.com/feed/main/detail/627844d5923149b6ac46a631b2b41d5a)】【[深信服Agent开发实习生一面二面，长时间被吊着，最终被横向掉了](https://www.nowcoder.com/feed/main/detail/14b2c379ae434062a009aefea9fc5df9)追问：处理流程可以讲一下吗？整体链路是怎样的？】【[百度Agent一面](https://www.nowcoder.com/feed/main/detail/72858aade19d443facc870fea8bb134f)追问：如果问某上市公司去年毛利率下降，Agent 收到 Prompt 后的完整流程是什么？】
4. Kubernetes Pod/Deployment 从提交到就绪经历哪些控制链路？ — [百度 AI Infra 校招面经](https://www.nowcoder.com/feed/main/detail/436228d68ccb4ec78d08644bc9227dec) / [虾皮 AI Infra 实习一面](https://www.nowcoder.com/feed/main/detail/e610f57cfd3548cd96a27d92e2f8b25e) / [虾皮 AI Infra 实习二面](https://www.nowcoder.com/feed/main/detail/62b9123e4b7f497285e7d6f68844cdd6) / [字节社招一面](https://www.nowcoder.com/feed/main/detail/a385d6cc457d47c99c03cb8ea752ab89)【阿里 Agent Infra 一面题库追问：Kubernetes Scheduler 基本调度流程】
5. Tool 已成功但 Runtime 在写状态前宕机，如何避免重复副作用？ — 分布式幂等与部分失败高频题【[多益三面](https://www.nowcoder.com/discuss/922801355649974272)同题】【阿里 Agent Infra 一面题库同题：幂等、Exactly Once 与 Tool 部分成功】【[字节agent一面](https://www.nowcoder.com/feed/main/detail/612a1c20eea744a288b142f5b43f57e1)追问：Agent 超时重复下单是高风险问题，你们怎么实现幂等避免重复操作？】【[阿里边缘bu 秋招一面 （已过）](https://www.nowcoder.com/feed/main/detail/bdebbb6088b6405e9eb2bd2c345acb6e)追问：如果工具调用成功，但 Redis Checkpoint 写入失败，系统如何恢复并避免重复执行？】
6. 如果让你设计一个 Agent Runtime，你会怎么拆？ — Agent Infra 系统设计高频题【阿里 Agent Infra 一面题库追问：Runtime 定义、Framework 边界与无状态 Worker】【[字节中国交易与广告 AI 应用开发一面](https://www.nowcoder.com/feed/main/detail/b34f6902e8544fe2953696ed52e49dba)】【[百度 - Agent 研发岗（架构方向）](https://www.nowcoder.com/discuss/926273622006665216)追问：通用 Agent Runtime（兼容多种大模型）如何设计？】
7. Agent Sandbox 解决什么问题，为什么容器不一定够？ — 代码执行隔离高频题【阿里 Agent Infra 一面题库追问：隔离选型、资源约束与委托身份】【[互联网金融 Agent 开发三面](https://www.nowcoder.com/feed/main/detail/88c55ee65af04ac98c218b9d17c47a71)】
8. Agentic RL 采用同步还是异步 Rollout，如何权衡吞吐与稳定性？ — 美团/百度 AI Infra 面经（新增）
9. Agent Router 应以什么运行形态存在，请求数据流如何设计？ — 字节 AI Infra 实习一面（新增）【[月之暗面（Moonshot）- Agent 应用开发岗](https://www.nowcoder.com/discuss/926274239747952640)追问：如何设计路由机制，将请求交给合适的 Agent？】
10. 大量本地端 Agent 与云端 Agent 如何协同？身份、状态、离线和任务迁移边界怎么设计？ — [小红书 Agent 开发二面](https://www.nowcoder.com/feed/main/detail/9f7361c709f4413396988b4f334a0d6f)（新增）【[互联网金融 Agent 开发三面](https://www.nowcoder.com/feed/main/detail/88c55ee65af04ac98c218b9d17c47a71)】
11. Agent 平台或 Runtime 出现新框架时，如何评估迁移收益、兼容老旧服务并决定是否淘汰旧方案？ — [虾皮 Agent 二面](https://www.nowcoder.com/feed/main/detail/345b668e35a9451bb397a9189dfdc943) / [电商 Agent 三面](https://www.nowcoder.com/feed/main/detail/b6b453976c2d4e43a872054d695c2fe2)（新增）
12. Kubernetes 在 Agent Infra 中负责什么？ — Kubernetes/Controller 高频题【阿里 Agent Infra 一面题库同题：单 Agent 单 Pod、冷启动与 Reconcile 幂等】
13. Kubernetes 的 Request 与 Limit 分别怎样影响调度和资源隔离？ — 百度 AI Infra 面经（新增）
14. Kubernetes Scheduler 的三个队列如何流转？ — 虾皮 AI Infra 二面（新增）
15. Agent Worker 或 Sandbox 滚动发布时，如何逐步切流并保护长任务？ — 虾皮 AI Infra 面经（新增）
16. Ray 的核心调度链路是什么，节点 OOM 或上游故障后如何恢复？ — 虾皮 AI Infra 面经（新增）
17. Agentic RL 的 Rollout、Training 与推理引擎如何编排？ — AI Infra 小厂面经（新增）
18. Agent Infra 为什么能提升 Agent 的能力上限和任务成功率？ — 字节 Agent 后端终面（新增）
19. Agent 调用 Sandbox 的链路如何容错？Sandbox 运行中崩溃后怎么恢复？ — [字节 AML / 火山方舟 AI Infra 一面](https://www.nowcoder.com/discuss/921927475611869184)（2026-08-26）
20. Agent Task 适合建模为 Kubernetes CRD 吗？如何权衡声明式管理与高频任务吞吐？ — 阿里 Agent Infra 一面题库（新增）
21. verl AgentLoop 的运行模型、状态与扩展点是什么？ — [阿里云 AI Infer 一面](https://www.nowcoder.com/discuss/921086976030150656)（新增）
22. Agent 状态放在 Sandbox 内、用户状态放在 Sandbox 外时，边界如何设计？ — [顺极 Agent 开发二面](https://www.nowcoder.com/feed/main/detail/93a26b84a6634558b7228bf350c709b5)（新增）
23. 周期性 Agent 任务如何把 Schedule 与每次 Run 分离，并处理时区、漏跑、并发、幂等和失败通知？ — [淘宝闪购 AI 应用研发二面](https://www.nowcoder.com/feed/main/detail/09ec7c36a2774223a93044a02b2c3ec0)（新增）
