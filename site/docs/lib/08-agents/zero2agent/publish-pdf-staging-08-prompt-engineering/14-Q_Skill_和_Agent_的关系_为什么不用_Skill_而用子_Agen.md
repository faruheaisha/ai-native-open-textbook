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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/08-prompt-engineering.md"
sourceRel: "publish-pdf/staging/08-prompt-engineering.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/08-prompt-engineering.md"
sourceSha256: "d712b57348415001dc95647a70207bec02aaff7ce2fa002468a87ac72874651a"
pageSha256: "2dbddcb643f83dbaafa177b18c4f7277484507067d26f0b22d362873cca2c4c8"
contentMode: "local-full"
zh: ""
---

## Q：Skill 和 Agent 的关系，为什么不用 Skill 而用子 Agent？

> 来源：AI应用开发进阶面

**新手答**：“Skill 比较简单，Agent 比较复杂。”

**高手答**：

“简单 vs 复杂”只是表象。本质区别在于**执行时是否需要自主决策循环**：

| 维度 | Skill | 子 Agent |
|------|-------|---------|
| 本质 | 确定性能力单元（输入→固定流程→输出） | 自主决策单元（有推理循环、可多步执行） |
| 决策权 | 无自主决策，按预定义步骤执行 | 有自己的推理循环，自主判断下一步 |
| 工具调用 | 可能调用工具，但调用逻辑是预定义的 | 自主决定何时调用什么工具 |
| 延迟 | 通常 <1s（规则执行或单次 API 调用） | 5-30s（需要多轮 LLM 推理） |
| 成本 | 低（不调 LLM 或只调一次） | 高（每次调用消耗数千 token） |

**选择标准**：

| 用 Skill | 用子 Agent |
|----------|-----------|
| 流程固定、步骤可枚举 | 需要自主规划、步骤不确定 |
| 无需推理、纯执行 | 需要理解上下文做判断 |
| 延迟敏感（<1s） | 可接受较高延迟（5-30s） |
| 成本敏感（不调LLM） | 质量优先（需要LLM推理） |
| 输入输出格式固定 | 需要灵活处理多种输入 |

**具体举例**：

```text
"查天气" → Skill
  原因：API 调用，固定流程，无需推理

"帮我规划明天的行程" → 子 Agent
  原因：需要综合天气、日历、偏好做规划，步骤不确定

"翻译这段话" → Skill
  原因：单步执行，格式固定

"帮我写一篇调研报告" → 子 Agent
  原因：需要多轮搜索、阅读、总结，自主决定何时搜索够了
```

**工程考量——成本陷阱**：

子 Agent 每次调用消耗数千 token（规划 + 多次工具调用 + 总结），Skill 可能只需几十 ms 的规则执行。滥用子 Agent 是最常见的成本陷阱：

```text
反例：用子 Agent 做"格式化日期"
  成本：~2000 token × ¥0.03/千token = ¥0.06/次
  正确做法：用 Skill（一行代码规则），成本 ≈ 0

正例：用子 Agent 做"分析用户反馈并生成改进方案"
  原因：需要阅读多条反馈、分类问题、综合分析、生成方案
  Skill 做不到：步骤数不确定，每步都需要推理
```

**混合架构**：

生产系统中通常是 Skill 和子 Agent 混合使用——主 Agent 编排全局流程，简单步骤调 Skill（快+便宜），复杂步骤调子 Agent（慢但质量高）。

**差距在哪**：新手只能说“简单 vs 复杂”——这不是可操作的判断标准。高手从决策权、延迟、成本三个维度给出了明确的选择标准，并用具体例子说明边界。面试官考的是对“能力粒度”的设计判断——什么时候该用轻量 Skill，什么时候值得付出子 Agent 的成本，这直接影响系统的成本和性能。
