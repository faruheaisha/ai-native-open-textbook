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
sourceRel: "docs/coze_pro_memory_fee.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/coze_pro_memory_fee.md"
sourceSha256: "12f243cd7db0288e702f60f785f5415988092c4b28f9512bc7f3fff93597863c"
pageSha256: "12f243cd7db0288e702f60f785f5415988092c4b28f9512bc7f3fff93597863c"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

你可以将长期记忆写入并存储在记忆库中。在与智能体对话时，智能体会召回并结合长期记忆生成最终回复。写入、存储、更新以及检索长期记忆均将按照实际用量进行计费。关于记忆库的详细介绍，请参考[记忆库](https://docs.coze.cn/guides/long_term_memory)。
在扣子中，所有扣子计费资源的消耗默认通过积分进行抵扣。当账户或资源包内的积分余额不足时，系统将自动从你的现金账户中扣除对应的金额。记忆库的价格如下： 
:::notice 注意
当你的账号**欠费超过 15 天**或订阅套餐**到期、退订超过15天**，该账号下所有记忆库数据将被自动删除，不支持找回。
:::

| | | | || \
|**计费项** |**计费说明** |**计费方式** |**单价** | |
|^^|^^|^^| | | \
| | | |**积分结算** |**现金结算** |
|---|---|---|---|---|
| | | | | | \
|记忆写入 |通过智能体或工作流的长期记忆写入节点向记忆库写入长期记忆，会产生对应费用。具体操作，请参考[记录长期记忆](https://docs.coze.cn/guides/long_term_memory#922f7349)。 |按写入次数计费 |30 积分/次 |0.03 元/次 |
| | | | | | \
|记忆检索与更新 |* 通过智能体或工作流的长期记忆检索节点从记忆库中检索长期记忆，会产生对应费用。具体操作，请参考[召回长期记忆](https://docs.coze.cn/guides/long_term_memory#6fc995b5)。 |\
| |* 在记忆库中手动更新长期记忆，会产生对应费用。具体操作，请参考[更新长期记忆](https://docs.coze.cn/guides/long_term_memory#35492963)。 |按检索或更新次数计费 |10 积分/次 |0.01 元/次 |
| | | | | | \
|记忆存储 |在记忆库中存储长期记忆的费用。 |按长期记忆条数和存储时长计费 |20  积分/万条/小时 |0.02 元/万条/小时 |
