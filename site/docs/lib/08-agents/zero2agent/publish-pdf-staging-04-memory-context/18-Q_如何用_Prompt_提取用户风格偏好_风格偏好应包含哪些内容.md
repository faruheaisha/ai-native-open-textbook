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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/04-memory-context.md"
sourceRel: "publish-pdf/staging/04-memory-context.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/04-memory-context.md"
sourceSha256: "43858ca210726142490f09bdab387095f1a915a8149dd7f6cf17164ff2f7e735"
pageSha256: "55d2b4152869b32fac7ebcf21bad21a15bd0f46408e1fbed00071ff97d9fb801"
contentMode: "local-full"
zh: ""
---

## Q：如何用 Prompt 提取用户风格偏好？风格偏好应包含哪些内容？

> 来源：小红书 Agent 岗一面

**新手答**：“让模型总结用户喜欢什么风格。”

**高手答**：

风格偏好应描述**稳定、可执行且不越权的交互约束**，例如：语言、称呼、结论与解释顺序、详略程度、语气、格式、代码风格、文件交付方式，以及用户明确反感的表达。它不应包含人格臆测、情绪诊断或从一次对话推断出的永久标签。

提取 Prompt 可以约束为：

```text
你是用户偏好提取器。仅提取用户明确表达，或在多次交互中稳定出现的沟通与交付偏好。
不要提取临时任务要求、敏感信息、人格推断或模型自己的猜测。
每条输出：category、preference、evidence、confidence、scope、ttl。
如果证据不足，返回空数组；不得为了完整而补全。
```

工程上还应增加三道门：单次隐含行为只形成低置信度候选；用户的明确纠正优先级最高；新偏好与旧偏好冲突时按作用域和时间处理，而不是无条件覆盖。注入上下文时改写成简短声明，例如“用户偏好结论优先、少解释”，不要回放原始私密对话。

**差距在哪**：面试官在看你是否能把“风格”变成带证据、置信度、作用域和生命周期的数据，而不只是写一句宽泛 Prompt。
