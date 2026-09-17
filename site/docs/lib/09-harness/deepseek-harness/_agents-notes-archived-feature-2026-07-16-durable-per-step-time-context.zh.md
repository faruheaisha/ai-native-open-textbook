---
title: "Agent Note: 持久的逐步骤时间上下文"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/feature/2026-07-16-durable-per-step-time-context.zh.md"
sourceRel: ".agents/notes/archived/feature/2026-07-16-durable-per-step-time-context.zh.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/feature/2026-07-16-durable-per-step-time-context.zh.md"
sourceSha256: "2c383c738f42e786a3d97398dc44dad91596a317eb44078243f1e5ac372ad512"
pageSha256: "2c383c738f42e786a3d97398dc44dad91596a317eb44078243f1e5ac372ad512"
contentMode: "local-full"
zh: ""
---

# Agent Note: 持久的逐步骤时间上下文

Status: implemented
Archived: 2026-09-04

[English](/lib/09-harness/deepseek-harness/_agents-notes-archived-feature-2026-07-16-durable-per-step-time-context) | 中文

## 问题

仅存在于请求中的时钟可以告诉模型当前时间，但在系统提示词中替换这个值会移除先前对时间敏感的推理所依据的证据。在包含多个步骤的轮次中，请求需要保留先前步骤使用的读数。系统必须能在重启后重建请求，自动压缩（compaction）也必须将模型实际收到的同一份时间上下文纳入考量。

进程本地刷新缓存会使显示时间依赖于无法在恢复后保留的状态。来自浏览器的自然语言也需要归属于请求的时区：服务端进程时区无法推断用户所在地，而可变的会话或连接默认值会让旅行或并发标签页重新解释另一条提示词。

## 决策

`@deepseek-ai/dsh-time-context` 是位于 `packages/context/time-context/`、需要显式启用的函数插件。默认组合不启用其披露内容与 token 成本；Schedule Web overlay 会挂载它，使模型能够按附加到当前请求的浏览器时区解释未明确限定时区的日期和时间。

该插件会前置一个 `agent/pre-step` 监听器，并先行委托下游。当下游决策进入步骤且需要生成读数时，插件会把该决策的最终消息与开放轮次中已有的持久用户消息合并，从确切的 user-rpc 来源派生浏览器时区来源信息，并向该决策追加一条读数。决策被拒绝、监听器失败或信号已经中止时，不会记录任何内容。在当前批次之后被认领的 steering（中途引导）仍归属于普通的下一步骤，并在该步骤进入时获得新读数。

每条 Web 提示词都会采样浏览器的 IANA 时区。Host 校验并规范化该值，再将其绑定到确切的持久用户消息来源。开放轮次中唯一一个时区可解析请求；多个时区会产生排序后的 `mixed` 结果；没有时区则为 `unavailable`。解析成功的请求会告诉模型，把未限定时区的日期和时间解释为该时区。来源信息混杂或不可用时，模型会收到要求用户澄清的指令。

这种与消息绑定的来源信息不会复制到 `SessionHeader`、连接默认值或 Schedule 状态。Time-context 只负责模型指导。接受本地日历字段的工具仍必须自行定义显式边界；因此 Schedule 要求 `time_zone`，而不是导入该插件的读数（[决策](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/simplification/2026-08-09-explicit-schedule-time-zone.zh.md)）。

解析后的浏览器时区也用于格式化读数中的时间戳。请求来源信息混杂或不可用时，使用配置的 `timeZone` 回退值；如果省略该配置，则使用插件加载时解析一次的 Node 进程时区，同时仍保留要求澄清的策略。每个回退值都经 `Intl.DateTimeFormat` 校验。

每个读数都使用确切的快照来源 `\{ kind: 'plugin', plugin: 'time-context', form: 'snapshot', sections: [\{ name: 'time-context', text: <same text> \}] \}`。不变式配套模块会校验快照形状，从原始 user-rpc 消息重新派生当前轮次的浏览器来源信息，并校验渲染的时间戳时区与经过时长基线。

可选配置 `refreshIntervalMs` 必须是非负安全整数。省略或设为 `0` 时，每个符合条件且已进入的步骤都会注入。设为正数时，插件会扫描原始会话事件，查找最新的插件读数；不存在读数、挂钟时间倒退或事件已达到相应时长时执行注入。事件时间戳在压缩和恢复后仍是判断依据，无需进程本地缓存。Schedule Web overlay 会省略该间隔，使每个请求步骤都获得当前浏览器时区指导。

### 文本与时长基线

已解析的第一步读数为：

```text
