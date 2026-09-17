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
pageSha256: "e0cf83eccf560c7c17f41cc467dd8c265b92ca37f3ba1b7ac9112de62b36275f"
contentMode: "local-full"
zh: ""
---

## Prompt 模板方法

### Q：提示词模板是怎么构建的？

> 来源：抖音基础架构 Agent 一面

**新手答**：“把任务描述和代码拼成一个 Prompt 发给模型。”

**高手答**：

提示词模板不是字符串拼接，是一个**分层组装系统**：

1. **System Prompt 层**：定义角色（“你是一个资深测试工程师”）、输出格式约束（“只输出可执行的测试代码，不要解释”）、语言和框架约束（“使用 pytest”）
2. **上下文注入层**：把待测函数的源码、函数签名、依赖的类型定义、已有的测试用例作为参考注入。这里有个关键决策——**注入多少上下文**。太少模型不理解代码，太多撑爆窗口且干扰生成
3. **任务指令层**：具体要生成什么——单元测试、边界测试、异常路径测试。不同测试目标对应不同的指令模板
4. **Few-shot 示例层**：给 1-2 个同项目风格的测试用例作为示范，让模型对齐代码风格和断言习惯

模板不是静态的，会根据**待测代码的特征动态调整**——比如纯函数用轻量模板，有外部依赖的函数自动加上 mock 引导指令。模板还需要版本管理和 A/B 测试，不同模板对不同类型代码的效果差异很大。

**差距在哪**：新手把 Prompt 当成一次性的字符串拼接。高手的回答展示了一个四层分离的模板系统——角色、上下文、指令、示例各司其职，且能根据输入特征动态调整。面试官想看的是你有没有把 Prompt 当成一个需要版本管理和测试的工程产物。
