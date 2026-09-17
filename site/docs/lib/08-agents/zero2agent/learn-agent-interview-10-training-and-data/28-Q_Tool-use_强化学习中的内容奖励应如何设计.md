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
pageSha256: "f862b2e4896d9f7fb0519a49d1e632a538e61d1d004517333b2fe62f0cf4ccf7"
contentMode: "local-full"
zh: ""
---

## Q：Tool-use 强化学习中的内容奖励应如何设计？

> 来源：唯品会/大模型算法实习（ToolRL 追问）

**新手答**：“用另一个大模型判断最终回答好不好。”

**高手答**：

内容奖励衡量的不是“调用格式正确”，而是工具结果是否被正确理解并用于完成任务。应拆成可归因的多个信号：

1. **事实一致性**：回答中的关键事实能否在工具 observation 中找到依据。
2. **任务完成度**：用户要求的约束和字段是否全部满足。
3. **答案相关性**：是否直接回答问题，避免堆砌无关工具输出。
4. **引用与计算正确性**：来源绑定是否正确，基于工具结果的计算是否可复验。
5. **安全与拒答**：工具无结果或权限不足时，不编造内容。

可验证任务优先用规则、单元测试或执行器奖励；开放问答再用校准过的 LLM-as-Judge。总奖励可写成 `R = w_f R_format + w_t R_tool + w_c R_content + w_s R_safety`，并单独监控各分量，防止模型靠冗长回答骗取内容分。

**差距在哪**：新手把内容奖励当一个主观总分，高手会把它拆成可验证、可归因的信号，并处理奖励投机。面试官考的是 reward 能否真正驱动目标行为。
