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
sourceRel: "docs/coze_pro_bot_request_fee.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/coze_pro_bot_request_fee.md"
sourceSha256: "4ad1cf09b78000ea0c49471fdba6dc8af8b110060f2de10739a94e7b2102fb8c"
pageSha256: "4ad1cf09b78000ea0c49471fdba6dc8af8b110060f2de10739a94e7b2102fb8c"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

:::notice 注意
* 个人版（免费版、进阶版、高阶版、旗舰版、尊享版）、团队版（高阶版、旗舰版、尊享版）、企业版（标准版、旗舰版）、旧版订阅套餐均不收取智能体调用费。
* 专业版用户将继续收取智能体调用费。推荐升级到企业版。
:::
包括智能体开发者在内的任意用户向智能体发送的一次有效对话请求计为一次智能体调用。其中，多 Agent 模式、工作流模式的智能体仅统计一次调用，不考虑该智能体中包含的 Agent 或大模型节点的数量。 
以下行为会产生智能体调用次数： 

* 在扣子编程的编排页面调试智能体。 
* 调用[发起对话](https://docs.coze.cn/developer_guides/chat_v3)、[执行工作流](https://docs.coze.cn/developer_guides/workflow_run)或[执行工作流（流式响应）](https://docs.coze.cn/developer_guides/workflow_stream_run)API。 
* 通过 Chat SDK、智能体商店、豆包等各个发布渠道和智能体对话。 

## 计费公式 \{#ab28c169\}
智能体调用计费项的费用计算公式为：
**智能体调用费用 = 智能体调用次数 ✖️单价**
## 单价 \{#0c898f13\}
在扣子中，所有扣子计费资源的消耗默认通过积分进行抵扣。当账户或资源包内的积分余额不足时，系统将自动从你的现金账户中扣除对应的金额。智能体调用费的具体价格如下： 

| | || \
|**计费项** |**单价** | |
|^^| | | \
| |**积分结算（积分/次）** |**现金结算（元/次）** |
|---|---|---|
| | | | \
|智能体调用费  |2  |0.002 |

##  \{#7e6d6767\}
