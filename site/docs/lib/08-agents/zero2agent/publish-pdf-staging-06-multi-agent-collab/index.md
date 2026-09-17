---
title: "多智能体协作：角色分工、通信机制与冲突仲裁"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/06-multi-agent-collab.md"
sourceRel: "publish-pdf/staging/06-multi-agent-collab.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/06-multi-agent-collab.md"
sourceSha256: "45cd341f24a023f5affe2db1b6c5c8527844255ad74a8e55796c4ce86d984b7e"
pageSha256: "0c1ccf5e8f5aa74d7bc4d18072d483414841941daae32717fcf1f188549d9426"
contentMode: "local-full"
zh: ""
---

# 多智能体协作：角色分工、通信机制与冲突仲裁

多智能体协作是 Agent 面试中越来越高频的方向。随着单 Agent 能力趋近天花板，面试官开始考察：**你能不能设计一个多 Agent 系统，让它们分工明确、协作高效、出了分歧还能收敛。**

---

## 本篇目录

- [多 Agent 协作基础](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/01-多_Agent_协作基础.md)
- [单多 Agent 决策与模式](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/02-单多_Agent_决策与模式.md)
- [通信协议与 Handoff](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/03-通信协议与_Handoff.md)
- [SubAgent 设计](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/04-SubAgent_设计.md)
- [编排与路由](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/05-编排与路由.md)
- [Q：如果让两个不同的 Agent 产品进行对话（比如 Claude Code 和 Cursor），在协议层面应该怎么做？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/06-Q_如果让两个不同的_Agent_产品进行对话_比如_Claude_Code_和.md)
- [Q：智能体可信通信怎么实现？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/07-Q_智能体可信通信怎么实现.md)
- [Q：大规模 Multi-Agent 如何做调度、背压和资源隔离？调度器崩溃或 Leader 派错任务时怎么恢复？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/08-Q_大规模_Multi-Agent_如何做调度_背压和资源隔离_调度器崩溃或_L.md)
- [Q：多个 Agent 并行跑的时候状态竞争怎么避免？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/09-Q_多个_Agent_并行跑的时候状态竞争怎么避免.md)
- [Q：如果拆成感知/推理/校验 Agent，哪些能并行哪些要顺序，什么时候需要反向通信？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/10-Q_如果拆成感知_推理_校验_Agent_哪些能并行哪些要顺序_什么时候需要反向.md)
- [Q：校验 Agent 和推理 Agent 结论冲突时怎么处理？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/11-Q_校验_Agent_和推理_Agent_结论冲突时怎么处理.md)
- [Q：在 A2A 场景下，如何防止两个 Agent 陷入递归对话？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/12-Q_在_A2A_场景下_如何防止两个_Agent_陷入递归对话.md)
- [Q：业务模块增删时，如何治理 Multi-Agent 能力拓扑，避免 Agent 增殖和路由配置失控？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/13-Q_业务模块增删时_如何治理_Multi-Agent_能力拓扑_避免_Agent.md)
- [Q：如何按租户、任务和 Agent 层级设置分层并发预算？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/14-Q_如何按租户_任务和_Agent_层级设置分层并发预算.md)
- [Q：如何保证多 Agent 通信结果明确、可验证，而不是自然语言互相猜？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/15-Q_如何保证多_Agent_通信结果明确_可验证_而不是自然语言互相猜.md)
- [Q：复杂 Agent 为什么拆成 LangGraph 子图而不是单条 Pipeline？子图的状态与 IO 契约如何设计？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/16-Q_复杂_Agent_为什么拆成_LangGraph_子图而不是单条_Pipel.md)
- [Q：多 Agent 执行策略如何根据任务动态选择，并在运行中安全切换？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/17-Q_多_Agent_执行策略如何根据任务动态选择_并在运行中安全切换.md)
- [这类题的答题模式](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/18-这类题的答题模式.md)
