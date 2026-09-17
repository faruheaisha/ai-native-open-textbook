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
pageSha256: "7c2db2811dd3b51ebbb47c7aa512d237f34983fde5e292bd505c07d2ebca75ac"
contentMode: "local-full"
zh: ""
---

## 训练 AI Coding Agent 的策略

### Q：如果训练一个 AI Coding Agent，是端到端训练还是分阶段训练？

> 来源：淘天 AI Agent 暑期实习一面

**新手答**：“端到端简单，直接训就行。”

**高手答**：

这是一个开放性设计题，没有标准答案，但需要展示清晰的决策框架。

**两种策略对比：**

| 维度 | 端到端训练 | 分阶段训练 |
|------|-----------|-----------|
| 思路 | 一次性学会“看需求→写代码→跑测试→修bug”的完整链路 | 先学理解代码，再学生成代码，最后学交互修复 |
| 数据需求 | 需要大量完整轨迹数据（从需求到最终通过 CI 的全过程） | 每阶段用针对性数据，总量可以更少 |
| 优点 | 模型学到的是整体协作模式，各步骤自然衔接 | 每阶段目标明确，调试容易，中间产物可复用 |
| 缺点 | 轨迹数据稀缺且昂贵，中间步骤出错难以定位 | 阶段衔接处可能有 gap，前阶段错误会级联 |

**我的选择：分阶段训练，理由：**

1. **阶段一：代码理解 SFT**——教模型读懂代码结构、定位依赖关系。用代码问答数据
2. **阶段二：代码生成 SFT**——教模型按规范生成代码。用 instruction → code 数据
3. **阶段三：交互修复 RL（GRPO）**——让模型学会根据测试反馈修正代码。用 Agent 轨迹数据 + 测试通过率作为 reward

**为什么不全端到端：**
- 完整的“需求→最终代码”轨迹数据极其稀缺（需要真实的 CI 环境 + 人工标注每步决策）
- 端到端训练中一个中间步骤的错误会“淹没”在整体 loss 里，定位困难
- 分阶段可以在每个阶段独立评测，快速定位瓶颈在“理解不行”还是“生成不行”还是“修复不行”

**什么时候适合端到端：**
- 有大量高质量的完整轨迹数据（如从 Claude Code 的使用日志中提取）
- 模型已经有了分阶段预训练的基础，端到端只做最后的 fine-tuning

**差距在哪**：开放题考的是决策框架而非固定答案。面试官想看你能否分析 trade-off、给出选择理由、并说出什么条件下会改变选择。
