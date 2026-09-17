---
title: "工具管理：参数校验、工具路由与百级工具库"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/02-tool-management.md"
sourceRel: "publish-pdf/staging/02-tool-management.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/02-tool-management.md"
sourceSha256: "ff29c62f7add4777020864a28d5f388f5a1eb17b853650aa8e6eba538c7c00c1"
pageSha256: "ae4bd4a49a8b64c10e3b1fa53bab32453a244a012b3da4173ac0860053870b64"
contentMode: "local-full"
zh: ""
---

# 工具管理：参数校验、工具路由与百级工具库

工具调用是 Agent 区别于普通对话模型的核心能力。面试官在这个维度考的不是“你知不知道 function calling”，而是**“模型不听话怎么办”和“工具多了怎么管”**——这两个问题决定了你的 Agent 能不能上生产。

---

## 本篇目录

- [参数校验与工具路由](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/01-参数校验与工具路由.md)
- [工具返回与中间层](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/02-工具返回与中间层.md)
- [MCP 与 Function Calling](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/03-MCP_与_Function_Calling.md)
- [工具设计与实现](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/04-工具设计与实现.md)
- [高级工具调度](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/05-高级工具调度.md)
- [Q：开源模型的 Function Calling 能力较弱，如何通过微调或 Prompt Engineering 提升？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/06-Q_开源模型的_Function_Calling_能力较弱_如何通过微调或_Pr.md)
- [Skill 边界模糊时的工具披露](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/07-Skill_边界模糊时的工具披露.md)
- [多 Skill 串行嵌套的容错设计](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/08-多_Skill_串行嵌套的容错设计.md)
- [Q：没有 MCP 之前大模型调用工具走的是什么流程？MCP 本身有什么缺点或者挑战？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/09-Q_没有_MCP_之前大模型调用工具走的是什么流程_MCP_本身有什么缺点或者挑.md)
- [Q：Tool Result 回写模型时，消息契约应该包含哪些字段？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/10-Q_Tool_Result_回写模型时_消息契约应该包含哪些字段.md)
- [Q：MCP 返回结果支不支持流式？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/11-Q_MCP_返回结果支不支持流式.md)
- [Q：Tool-use SFT 的训练目标是什么？基座模型已经具备工具调用能力时，SFT 还需要学习什么？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/12-Q_Tool-use_SFT_的训练目标是什么_基座模型已经具备工具调用能力时_.md)
- [Q：如何不用多智能体方案让 1000 个 Tools 正常工作？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/13-Q_如何不用多智能体方案让_1000_个_Tools_正常工作.md)
- [Q：一个 Agent 如何同时连接多个 MCP Server，并保证用户与会话隔离？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/14-Q_一个_Agent_如何同时连接多个_MCP_Server_并保证用户与会话隔.md)
- [Q：CLI、Skill 和 sub-agent 应该如何划分职责？CLI 直接调用 LLM 与 Skill 拉起 sub-agent 有什么差异？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/15-Q_CLI_Skill_和_sub-agent_应该如何划分职责_CLI_直接调.md)
- [Q：Agent 调用启动较慢的外部工具时，如何设计异步任务和结果回调？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/16-Q_Agent_调用启动较慢的外部工具时_如何设计异步任务和结果回调.md)
- [Q：跨平台工具授权即将过期时，Agent 如何调整调用顺序并安全续权？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/17-Q_跨平台工具授权即将过期时_Agent_如何调整调用顺序并安全续权.md)
- [Q：MCP 工具治理为什么需要审计？应该审计哪些证据？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/18-Q_MCP_工具治理为什么需要审计_应该审计哪些证据.md)
- [Q：如何评测 MCP Server / Tool 自身的契约、可用性和效果，并用轨迹 Badcase 持续迭代？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/19-Q_如何评测_MCP_Server_Tool_自身的契约_可用性和效果_并用轨迹.md)
- [这类题的答题模式](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/20-这类题的答题模式.md)
