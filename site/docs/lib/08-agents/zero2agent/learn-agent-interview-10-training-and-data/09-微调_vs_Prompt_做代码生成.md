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
pageSha256: "72f8fa04aafaffe479d159fcdfed2088e8d9d315188ce8daf976bc0b74a385fa"
contentMode: "local-full"
zh: ""
---

## 微调 vs Prompt 做代码生成

### Q：为什么要通过微调模型来做代码生成？为什么不用纯 Prompt 或 Spec Coding？

> 来源：小米 AI Agent 一面（暑期）【字节Agent开发实习生一面追问：“spec coding/SDD 也能拆 task，为什么达不到你项目里的效果？”】

**新手答**：“微调效果更好呗。”

**高手答**：

Prompt 和 Spec Coding 解决的是**推理时约束**——告诉模型“这次按什么规则做”。微调解决的是**行为分布**——让模型的默认行为就符合你的工程规范。

**为什么 Prompt 不够：**

| 场景 | Prompt 的局限 |
|------|--------------|
| 代码风格 | 每次都要在 Prompt 里塞完整的 style guide，占大量 token |
| 内部框架 API | 模型不认识私有 API，Prompt 描述容易被长上下文稀释 |
| 工程动作序列 | “先读测试→定位调用链→改最小范围→补回归测试”这种习惯，Prompt 能说但模型不一定遵循 |
| 长任务持续性 | 多步任务中 Prompt 的约束力随上下文增长而衰减 |

**为什么 Spec Coding / SDD 不够：**

Spec Coding 本质是“把需求写清楚让模型按规格实现”——适合需求边界明确、上下文稳定的场景。但真实缺陷修复中：
1. 需求本身不完整（只有一个报错日志）
2. 修复路径不可预知（需要动态探索依赖关系）
3. 需要根据测试反馈持续修正（静态 spec 覆盖不了动态反馈循环）

**微调的真正价值：**

不是让模型“记住业务代码”，而是让它学会稳定的**工程动作模式**：
- 看到 bug 描述 → 先定位而不是直接改
- 改完代码 → 自动补测试而不是只提交 patch
- 遇到不确定 → 用工具验证而不是猜测

微调让这些行为变成模型的默认倾向，不需要每次在 Prompt 里强调。

**差距在哪**：面试官考的是你对“Prompt vs 微调”边界的理解。不是“哪个好”的问题，而是它们解决不同层面——Prompt 管单次任务约束，微调管行为分布塑造。能说清 Spec Coding 的适用边界（静态任务 OK，动态反馈循环不行），说明你做过真实的代码生成系统。
