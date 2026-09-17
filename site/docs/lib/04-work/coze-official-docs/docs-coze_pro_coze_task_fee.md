---
title: "扣子 Coze 官方文档"
sourceId: "04-work/coze-official-docs"
sourceTitle: "扣子 Coze 官方文档"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: ""
entryUrl: null
sourceRel: "docs/coze_pro_coze_task_fee.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/coze_pro_coze_task_fee.md"
sourceSha256: "e17e96759abbc5973175dfb96e2d696ed6e0a283f327ef872adc827d871f84b1"
pageSha256: "e17e96759abbc5973175dfb96e2d696ed6e0a283f327ef872adc827d871f84b1"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

在扣子中，你与扣子每一轮任务交互，无论是聊天、创作，还是通过飞书等其他应用下达指令，其本质都是在执行一个 AI 任务，都会消耗你账号中的积分。本文介绍扣子任务计费项的计费规则。

## 计费方式 \{#c7f9057b\}

与扣子进行的每一轮任务交互，都会占用平台算力、消耗模型 Tokens 等资源，从而消耗你账号中的积分。例如：

* 与 Agent 聊天，例如提问、咨询、让 Agent 分析或总结内容。
* 让 Agent 制作多媒体内容，例如生成图片、制作 PPT、生成视频等。
* 在飞书、微信等其他应用中与扣子 Agent 交互，向 Agent 下达任务指令。
* 让 Agent 操作云手机，例如打开应用、执行签到、查询信息等。

## 计费规则 \{#bfc1d706\}

* **计费触发**：向扣子 AI 发起指令，任务开始执行即触发计费。
* **计费单位**：每完成一轮指令的执行，会扣减相应积分。
   一轮指令指的是从你提交指令，到扣子完成任务并返回结果的完整过程。以日程任务为例，创建日程和每一次执行日程，都将分别作为独立任务进行计费。   

:::tip 说明
* 因为扣子平台技术问题而失败的任务，平台将自动进行周期性补偿。更多信息，请参考失败任务补偿积分。
* 存储、查看产物均不会产生扣子任务费用，即你无需删除产物以节省费用。
:::

## 影响因素 \{#c0e7038a\}

每轮对话的积分消耗量取决于其调用的资源与复杂度。主要影响因素如下：

* **大语言模型**：解析需求、逻辑规划与决策以及生成最终产物。
   扣子会不定期提供部分大模型的限时折扣，具体折扣和生效时间以产品实际界面展示为准。
* **虚拟机**：执行代码、处理文件、进行浏览器自动化等操作。
* **第三方 API**：调用搜索工具、生成图片、生成视频、生成播客等第三方 API 服务。

## 常见问题 \{#ad86b309\}

* 任务开发失败，如何抵扣积分？
