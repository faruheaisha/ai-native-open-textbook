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
pageSha256: "e66ae5bbec0411fa2dc66d61236eb0c5eeac1879d873d8ea1be98490902c0e9e"
contentMode: "local-full"
zh: ""
---

## Q：Tool-use SFT 的训练目标是什么？基座模型已经具备工具调用能力时，SFT 还需要学习什么？

> 来源：唯品会/NLP算法实习一面

**新手答**：“让模型学会调用工具。”

**高手答**：

**训练目标的精确定义**：

Tool-use SFT 的训练目标不是笼统的“学会调工具”，而是让模型学会在**正确时机**输出**正确格式**的工具调用指令——包括三个子能力：

1. **选对工具**：从候选工具集中选择最匹配当前意图的工具
2. **填对参数**：从用户自然语言中精确提取参数并转换为目标格式
3. **判断时机**：知道什么时候该调工具、什么时候不该调（直接回答更好）

**基座已有 FC 能力时，SFT 还要学什么**：

“能调工具”和“调好工具”是两回事。基座模型的 FC 能力是通用的，SFT 要学的是**业务特化**：

| 学习目标 | 基座模型的现状 | SFT 需要补的 |
|---------|-------------|-------------|
| 领域适配 | 认识通用工具名（search、get） | 学习你的业务工具语义（`get_order_status` 不是 `search`） |
| 调用策略 | 倾向于逐个串行调用 | 学习何时该并行调用、何时不调用直接回答 |
| 参数推理 | 用户说“查昨天的单”可能不会转换日期 | 从模糊表述中精确提取参数（date=2026-07-21） |
| 格式对齐 | 训练时学的是 OpenAI 格式 | 对齐你的系统要求的 JSON Schema 格式 |
| 错误处理 | 工具报错时可能重复调用 | 学习错误时的应对模式（重试、换工具、问用户） |
| 拒绝调用 | 对所有 query 都倾向调工具 | 学习“这个问题不需要工具，直接回答” |

**SFT 数据构造的关键**：

```text
训练数据必须覆盖四类场景：
  1. 正常调用：用户意图明确 → 选对工具 + 填对参数
  2. 拒绝调用：用户问题不需要工具 → 直接回答
  3. 多工具串联：复杂任务 → 正确的调用顺序和依赖关系
  4. 错误恢复：工具返回错误 → 修正参数重试 or 换工具 or 告知用户
```

**差距在哪**：新手把 SFT 目标简化为“学会调工具”——这只对完全没有 FC 能力的模型成立。高手理解当基座已有通用 FC 能力时，SFT 的真正价值在于领域适配、策略优化和边界学习。面试官考的是对 SFT 和 base model 能力边界的理解——“能调工具”和“调好工具”是两回事。
