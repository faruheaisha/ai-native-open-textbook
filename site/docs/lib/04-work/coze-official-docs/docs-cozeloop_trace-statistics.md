---
title: "查看统计数据 {0e75e812}"
sourceId: "04-work/coze-official-docs"
sourceTitle: "扣子 Coze 官方文档"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: ""
entryUrl: null
sourceRel: "docs/cozeloop_trace-statistics.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/cozeloop_trace-statistics.md"
sourceSha256: "bf2f47218bf1b9d4d0122c8afdc0bdec6657e6f575b4c9856e15cfb771f4596e"
pageSha256: "bf2f47218bf1b9d4d0122c8afdc0bdec6657e6f575b4c9856e15cfb771f4596e"
contentMode: "local-full"
zh: ""
---

# 查看统计数据 \{#0e75e812\}
进入扣子罗盘的**观测 > 统计**页面，查看统计数据。
![Image=2918x1375](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/73e1d5cc719246c6af820fa971569b52~tplv-goo7wpa0wc-image.image)
# 统计指标说明 \{#4176b6be\}
下表列举了统计的数据指标和定义。

| | | \
|**指标** |**定义** |
|---|---|
| | | \
|使用次数 |统计上报的 Root Span 总数。 |
| | | \
|模型调用错误率 |大模型调用过程中，状态错误的 Model Span 总数，在所有 Model Span总数中所占的比例。 |
| | | \
|Span 错误率 |状态错误的 Span 总数，在所有 Span 总数中所占的比例。代表分布式追踪中失败 Span 的比例。 |
| | | \
|模型调用平均耗时 |大模型调用过程中，所有 Model Span 总耗时，除以 Model Span 总数，即平均耗时。 |
| | | \
|模型 Tokens 消耗 |大模型调用过程中，Model Span 数据中输入和输出的 token 总数。  |
| | | \
|Input Tokens 消耗 |大模型调用过程中，Model Span 数据里输入文本的 token 总数。 |
| | | \
|Output Tokens 消耗 |大模型调用过程中，Model Span 数据里输出文本 的 token 总数。 |
| | | \
|Prompt Hub Tokens 消耗 |平台调试 Prompt 过程中，Model Span 数据中输入和输出的 token 总数。 |
| | | \
|Prompt Hub Input Tokens 消耗 |平台调试 Prompt 过程中，Model Span 数据里输入文本的 token 总数。 |
| | | \
|Prompt Hub Output Tokens 消耗 |平台调试 Prompt 过程中，Model Span 数据里输出文本的 token 总数。 |
| | | \
|用户数 |所选时间范围内，各日用户数（按唯一 User ID 每日去重）的累加总和。 |\
| |例如：若选择 7 天时间范围，用户 A 在这 7 天内有 3 天被统计在内，用户 B 有 1 天被统计在内。系统会将每天的用户数直接相加，最终该指标结果为 4。 |
| | | \
|新增用户数 |所选时间范围内，各日新增用户数（按唯一 User ID 每日去重）的累加总和。 |\
| |例如：若选择 7 天时间范围，第一天有 10 个新增用户，第二天有 15 个，其余 5 天无新增。系统会将每天的新增用户数直接相加，最终该指标结果为 25。 |
| | | \
|消息数 |所选时间范围内，按唯一 Message ID 统计的消息总数。 |
| | | \
|服务 QPS |每秒接收的 Root Span 总量。 |
| | | \
|模型 QPS |每秒接收的 Model Span 总量。 |
| | | \
|链路整体耗时 |Root Span 的耗时。 |
| | | \
|模型调用总耗时 |大模型调用过程中，Model Span 的总耗时。 |
| | | \
|模型调用首 Token 耗时 |大模型调用过程中，模型生成第一个 Token 的耗时。 |
| | | \
|服务请求成功率 |状态成功的 Root Span 总数，在所有 Root Span 总数中所占的比例。 |
| | | \
|模型请求成功率 |大模型调用过程中，状态成功的 Model Span 总数，在所有 Model Span 总数中所占的比例。 |
| | | \
|模型 Token 速率 |大模型调用过程中，模型每秒调用消费的 Tokens 总量。 |

# 使用筛选器 \{#6d44ee8d\}
统计页支持过滤器筛选，可选维度包含上报时间、数据来源、Prompt Key，具体说明如下。

| | | \
|**维度** |**说明** |
|---|---|
| | | \
|上报时间 |支持上报时间进行筛选。 |\
| | |\
| |* 对于首次进入可视化仪表盘的用户，默认展示最近 3 天的 Trace 统计信息。 |\
| |* 对于非首次进入可视化仪表盘的用户，系统展示的时间维度与用户上一次筛选 Trace 仪表盘的时间维度保持一致。 |
| | | \
|数据来源 |支持筛选 SDK 上报、Prompt 开发等多种来源的 Trace 统计信息。 |\
| | |\
| |* SDK上报：通过集成扣子罗盘SDK后上报的 Trace 数据。 |\
| |* Prompt开发：在扣子罗盘创建并调试Prompt（提示词）后上报的 Trace 数据。 |\
| |* Coze 工作流：在扣子开发平台搭建的工作流每次运行产生的 Trace 数据。 |\
| |* Coze 智能体：在扣子开发平台搭建的智能体每次对话产生的 Trace 数据。 |\
| |* Coze 应用：在扣子开发平台搭建的扣子应用每次运行产生的 Trace 数据。 |
| | | \
|Prompt Key |仅在数据来源属于 Prompt 开发时，支持筛选 Prompt Key 为特定名称的 Trace 统计信息。 |
