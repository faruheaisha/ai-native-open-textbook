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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/05-eval-and-vision/index.md"
sourceRel: "learn-agent-interview/05-eval-and-vision/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/05-eval-and-vision/index.md"
sourceSha256: "17c863430bb6ecbc29d9475eb7480d07c54a45774e643f928d23fd755ef5d444"
pageSha256: "1b30938316c760afb8da4031a96710f83e5a5e67c18dfed7c5812c6d9b2397b9"
contentMode: "local-full"
zh: ""
---

## Q：AI 写代码越来越强，算法工程师的角色会怎么变？

> 来源：字节TikTok AI应用开发一面 / [虾皮一面](https://www.nowcoder.com/feed/main/detail/e133c2610bde4adc812bba66c62e1641)

**新手答**：“AI 会替代一部分简单工作，工程师要学更多东西。”

**高手答**：
这道题考的是你对行业趋势的独立判断，没有标准答案，但要有结构化的分析框架。

**AI 在侵蚀哪些工作**：
- 样板代码生成、单元测试编写、文档注释——这些占初级工程师大量时间的工作已经被 AI 大幅提效
- 简单的功能实现、API 封装、数据处理脚本——Vibe Coding 场景下 AI 可以直接完成

**工程师价值的迁移方向**：

1. **问题定义能力**：AI 最擅长“给定问题写解法”，但“识别真正的问题是什么”依然是人的核心价值。需求不清晰时，工程师要做 Problem Framing
2. **系统设计与架构**：多模块协同、性能与成本取舍、技术债管理——AI 生成的代码在局部上可能很好，但跨模块的一致性和长期可维护性需要人来把控
3. **质量与信任边界**：AI 代码需要审查——工程师的核心技能从“写代码”迁移到“评估和验证 AI 产出”。懂得在哪里信任 AI、在哪里必须亲自把关
4. **AI 系统的开发者**：构建 Agent、调优 Prompt、设计评测体系——这是增量的新工种，而非替代
5. **领域知识护城河**：AI 缺乏特定业务/行业的深度上下文。工程师的领域专长（广告算法、推荐系统、量化交易）构成差异化竞争力

底层能力没有因为 AI 生成代码而失去价值：性能回归需要理解运行时和数据结构，线上故障要判断线程、内存、网络和存储，安全审查要识别权限与供应链边界。AI 可以生成候选实现，但验证不变量、解释资源代价和处理跨层故障仍依赖工程师理解底层机制。

**个人判断**：未来 3-5 年，算法工程师的数量不会大幅减少，但人均产出会大幅提升——团队会变小，对单人能力的要求会更高，尤其是系统化思维和跨层能力。

**差距在哪**：面试官考的是你有没有独立思考这个问题，而不是说正确答案。避免“AI 不会替代工程师”的防御性回答，也避免“AI 会替代一切”的焦虑式回答。展示结构化分析 + 具体场景举例 + 自己的定位思考，才是高手答法。
