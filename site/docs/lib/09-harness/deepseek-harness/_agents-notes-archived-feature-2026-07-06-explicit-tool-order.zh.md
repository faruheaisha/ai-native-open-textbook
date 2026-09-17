---
title: "Agent Note: 显式的模型侧工具顺序"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/feature/2026-07-06-explicit-tool-order.zh.md"
sourceRel: ".agents/notes/archived/feature/2026-07-06-explicit-tool-order.zh.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/feature/2026-07-06-explicit-tool-order.zh.md"
sourceSha256: "37a1e54e9bfb21cafa7f664d0769d0c72c435ab4dda522c0cbff9c22be21f15c"
pageSha256: "37a1e54e9bfb21cafa7f664d0769d0c72c435ab4dda522c0cbff9c22be21f15c"
contentMode: "local-full"
zh: ""
---

# Agent Note: 显式的模型侧工具顺序

Status: implemented
Archived: 2026-09-04

[English](/lib/09-harness/deepseek-harness/_agents-notes-archived-feature-2026-07-06-explicit-tool-order) | 中文

## 问题

模型侧的工具顺序此前跟随插件注册顺序，而注册顺序取决于相互独立的插件的并发模块加载。这种竞态在 CI 和快照录制中产生了不同的请求头。由于顺序影响请求字节、缓存和持久化的请求头，因此需要一个显式的确定性策略。

## 决策

系统提示词组装逻辑负责权威定义模型侧工具顺序，正如它已经负责权威定义 section 顺序一样。`dsh-system-prompt` 上的 `toolOrder?: string[]` 是可选的显式策略：

- 列表中已注册的工具按列表位置排列。
- 列表中的名称没有对应的已注册工具，属于配置错误。形状错误（缺少 rest 条目或名称重复）在服务构造器中快速失败；未注册的名称则会导致每次 `assemble()` 调用被拒绝——这是已注册工具集存在并可供检查的最早时刻（工具插件在服务构造之后才注册），也是唯一的通用时刻（注册随时可能变化；Cordis 没有「所有插件已加载」事件）。在已交付的 agent loop（智能体循环）下，第一个轮次在发出任何模型请求之前就会失败——确切的影响范围见下文「后果」。
