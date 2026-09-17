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
pageSha256: "3a1c41a3f3c9b7e943d261fd51c0f1cb16ff0ade7a4e2fd6875f3638d7d8f4f4"
contentMode: "local-full"
zh: ""
---

## Q：Agent 做上下文压缩后，如何验证没有破坏当前任务？

> 来源：Coding Agent 面经/本地 Coding Agent

**新手答**：“压缩后让模型检查一下摘要是否完整。”

**高手答**：

不能用同一个模型凭感觉评价自己的摘要，而要先定义任务不变量：用户硬约束、当前计划与完成状态、文件和符号引用、工具调用结果、未解决错误、权限边界。压缩前后分别抽取这些结构化字段并做一致性校验。

验证分三层：

1. **结构校验**：必填约束、待办项、文件版本和 checkpoint 是否齐全。
2. **语义校验**：用 NLI 或独立 Judge 检查摘要是否遗漏、矛盾或新增事实。
3. **行为回放**：在隔离环境用压缩上下文执行下一步，比较工具选择、参数和测试结果。

原始历史不能立即删除，应保留可寻址的冷存储和 evidence id。校验失败时回退到上一版摘要，按缺失字段增量重压缩；高风险任务则宁可减少压缩比例，也不丢弃原始证据。

**差距在哪**：新手只做主观摘要检查，高手把“没破坏任务”定义为可验证的不变量，并用结构、语义、行为三层验证。面试官考的是上下文压缩能否安全进入生产链路。
