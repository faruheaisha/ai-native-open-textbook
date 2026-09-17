---
title: "Inbox 控制：为什么用户插话必须有自己的语义"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-deepseek-harness/08-inbox-control/index.md"
sourceRel: "learn-deepseek-harness/08-inbox-control/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-deepseek-harness/08-inbox-control/index.md"
sourceSha256: "602793ac7ff86fbc7bcb2e9de3d5a9815e23eaa0e970cf46b2b8df5d284b29e0"
pageSha256: "602793ac7ff86fbc7bcb2e9de3d5a9815e23eaa0e970cf46b2b8df5d284b29e0"
contentMode: "local-full"
zh: ""
---

# Inbox 控制：为什么用户插话必须有自己的语义

长任务运行时，用户可能追加目标、改变方向、要求立即停止，或者由外部系统注入状态。如果所有内容都伪装成普通用户消息，系统就失去了一个重要事实：这条信息是在下一轮生效，还是正在改变当前执行。

## 设计理念：控制输入是一等事件

Inbox 不是一个待处理字符串数组，而是运行时的控制通道。消息要有来源、时机、claim 状态和取消语义，才能在并发客户端、重启和审计中保留因果。

| 入口 | 设计语义 | 典型用途 |
| --- | --- | --- |
| `followup` | 当前 Turn 收束后再开启下一轮 | 追加问题或新目标 |
| `steer` | 请求当前执行路径改变方向 | 取消后续工具或收紧约束 |
| `inject` | 写入内部状态，不冒充用户轮次 | webhook、系统状态、测试事件 |

这三者的差异不是 API 命名风格，而是用户意图和系统因果的差异。下一轮消息可以排队；当前 Step 的 steer 必须触发取消检查；内部注入则不能污染用户可见的对话语义。

## 取消不是删除

已经开始的工具调用可能产生副作用，不能因为用户改变了方向就从日志中抹掉。正确做法是通过 `AbortSignal` 协作退出，记录取消或中断结果，再由下一步决定补偿、重试还是结束。

## 设计取舍

显式 Inbox 会增加状态机复杂度，但它换来了可解释的实时交互。官方的 `agent/inbox/inserted`、`claimed` 和 `discarded` 事件说明了这一点：系统记录消息如何进入、被谁领取以及为什么没有执行，而不是只保留最后一个字符串。

参考 [Core Subsystem](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.1.0-rc.8/docs/subsystems/core.zh.md)。

下一篇建议继续看：[Code Mode：上下文压缩不等于安全隔离](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-deepseek-harness/09-code-mode/index.html)
