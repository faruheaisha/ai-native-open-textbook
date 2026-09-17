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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/index.md"
sourceRel: "learn-agent-interview/10-training-and-data/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/10-training-and-data/index.md"
sourceSha256: "60b85a3adcd582f7bde8a1650b86f319915c75ffe2c989d6ec17686177cb35ee"
pageSha256: "66804d2ffb49d514ef40e18cdbf300883bfe8ee82647ae852c703e222973e214"
contentMode: "local-full"
zh: ""
---

## Q：Agent 交互轨迹与普通语言模型语料有什么区别？如何仿真高质量轨迹？

> 来源：字节/Agent 算法实习一面

**新手答**：“Agent 数据多了工具调用和多轮对话，可以让强模型生成。”

**高手答**：

普通语料主要学习下一个 token；Agent 轨迹还包含环境状态、计划、动作、工具参数、observation、奖励和终止原因。质量不仅看文本自然度，还看动作是否合法、状态是否连续、工具结果是否真实、失败恢复是否合理。

仿真流程应基于可执行环境：先从真实任务分布采样目标和约束，再让用户模拟器产生澄清、改口和中断；Agent 在沙箱中调用真实或高保真工具，记录成功与失败轨迹；验证器检查最终结果和每一步状态转移。数据集同时保留最优轨迹、可恢复失败轨迹和不可恢复负例，并按任务难度、工具依赖深度和异常类型分层采样。

强模型自举只能生成候选，不能把虚构 observation 当真值。工具结果、权限和最终状态必须由环境或规则验证，抽样再由人工审计。

**差距在哪**：新手把轨迹当“带工具标签的对话”，高手理解它是状态转移数据，并用可执行环境、用户模拟器和验证器保证真实性。
