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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/02-tool-management/index.md"
sourceRel: "learn-agent-interview/02-tool-management/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/02-tool-management/index.md"
sourceSha256: "aa8ef11d87c2122215c82572365a04968e18ba073c2f852c7624cc42745ca7d2"
pageSha256: "234b8e000c09daa61aa26e270fc28a033a757152bc7ca529959a0d797f39e33d"
contentMode: "local-full"
zh: ""
---

## Q：CLI、Skill 和 sub-agent 应该如何划分职责？CLI 直接调用 LLM 与 Skill 拉起 sub-agent 有什么差异？

> 来源：小得盈满 / AI 相关岗位 / 一面

**新手答**：“CLI 负责执行命令，Skill 写提示词，复杂任务就多拉几个 sub-agent。”

**高手答**：

先区分三者的职责，而不是把它们都当成“调用模型的入口”：

| 组件 | 核心职责 | 不应该承担的职责 |
|------|---------|----------------|
| CLI / Host | 接收确定参数、鉴权、调用模型或外部程序、校验结果、重试与记录 trace | 不把密钥交给模型，也不让自然语言直接绕过参数和权限校验 |
| Skill | 固化可复用的任务规范，包括步骤、输入输出契约、工具选择规则和质量门禁 | 不持有凭证，不充当长期运行的调度器，也不因为步骤多就默认拆 Agent |
| sub-agent | 在独立上下文中完成可独立验收的推理子任务，并返回结构化结果 | 不共享无限权限，不自行扩大任务范围，也不直接提交不可逆副作用 |

CLI 直接调用 LLM 和 Skill 拉起 sub-agent 的取舍，要从五个维度判断：

| 维度 | CLI 直接调用 LLM | Skill 拉起 sub-agent |
|------|------------------|---------------------|
| 确定性 | 调用链短，参数、模型、提示词、超时和输出 schema 都能固定，结果更容易复现 | 多一次任务转述和自主规划，路由、上下文裁剪及工具选择都会引入随机性 |
| 稳定性 | 失败面少，适合门禁、格式转换、单次评测等固定流程 | 适合探索性强、上下文需隔离的任务，但要处理子 Agent 超时、跑偏、重试和部分失败 |
| 安全与密钥隔离 | CLI 进程持有短期凭证，在模型调用或传输层注入授权；模型上下文、参数、日志和返回值都不出现密钥 | 每个 sub-agent 只拿任务所需工具和最小权限，不能继承父 Agent 的全部凭证；有副作用的操作仍回到受控执行层审批 |
| 可观测性 | 一条 trace 就能关联输入、模型版本、工具调用、退出码和产物 | 必须传播 `trace_id`、`task_id` 和父子关系，并记录委派理由、上下文版本、工具调用与合并结果 |
| 成本 | 少一次规划和上下文复制，token、延迟与失败重试成本更低 | 并行可以缩短墙钟时间，但会增加提示词复制、协调、汇总和冲突处理成本 |

我的默认决策是：**固定步骤、强约束、需要凭证或会产生副作用的流程放在 CLI / Host；可复用的方法论写进 Skill；只有子任务能独立验收、确实受益于上下文隔离或并行、且值得额外成本时才启动 sub-agent。** 即使由 Skill 发起 sub-agent，也要让 CLI / Host 保留权限校验、预算、超时、审计和最终提交权。

**差距在哪**：新手按“命令、提示词、多个模型”给组件贴标签。高手按控制面、知识规范和推理执行单元划边界，并能从确定性、稳定性、安全、可观测性和成本解释为什么门禁类任务通常偏向 CLI 直调，而开放式评审才可能值得委派给 sub-agent。
