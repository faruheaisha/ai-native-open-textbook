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
sourceRel: "docs/cozespace_skills_store.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/cozespace_skills_store.md"
sourceSha256: "912f25d754d54aef8cc83ef6392127b90c5afb5c8556141f2e0e7b651d55801e"
pageSha256: "912f25d754d54aef8cc83ef6392127b90c5afb5c8556141f2e0e7b651d55801e"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

本文介绍技能商店的基本概念以及购买技能等相关操作。

## 商店介绍 \{#d1735bd0\}

技能是扩展扣子 AI 功能的模块化功能。每个技能都集成了特定的指令、元数据和可选资源（脚本、模板），添加技能后，扣子 AI 会自行判断使用场景并使用这些技能。

扣子通过技能商店，协同开发者打造技能生态。技能开发者可将自研的技能上架到商店，实现技术成果的分享与变现。技能使用者可在商店中挑选与使用符合自身需求的技能，还可以一键复制感兴趣的开源技能，并在此基础上进行定制化改造。

:::tip 说明
* 技能商店仅供扣子 Agent 和云端 Agent 使用；本地 Agent 可前往[虾评社区](https://xiaping.coze.com/)探索海量技能。
* 在团队版和企业版中，企业超级管理员可以通过**功能访问控制**和**空间资源可见性**，控制成员可见的功能入口和空间资源范围。如果你未看到预期的功能和资源，请联系企业超级管理员确认。更多信息，请参考功能访问控制和空间资源访问控制。
:::

## 技能包和数据集 \{#6e668dbd\}

在扣子商店中，除了单个技能，你还可以使用技能包和数据集，为 Agent 补充更完整的行业能力或更专业的数据能力。

* **技能包**：是面向行业场景的扣子官方严选技能组合。它将多个相关技能打包成一套可一键添加、统一使用的行业解决方案，帮助 Agent 快速具备特定场景下的专业能力。例如，A 股投资分析技能包会组合板块热度分析、量化股票分析、实时股票数据查询等技能，帮助 Agent 完成数据查询、市场分析和风险研判。
* **数据集**：是带有数据查询或数据 API 能力的特殊技能，帮助 Agent 获取和使用特定数据。数据集通常会展示可查询的数据内容、核心数据表和字段。例如，实时股票数据查询数据集可以提供即时行情、K 线数据、资金流向等数据能力，支持 Agent 进行金融分析和市场动态追踪。

## 套餐权益 \{#hrMmefWKN\}

技能商店里有些精品数据集支持按调用次数付费。扣子为部分付费订阅套餐提供每日免费调用额度，符合条件的用户可在额度内免费使用带有「旗舰版权益」标识的精品数据集。不同数据集的调用额度不同，具体以实际调用为准。

| **套餐版本**  | **免费版**  | **个人进阶版**  | **个人高阶版**  | **个人旗舰版**  | **个人尊享版**  | **团队高阶版**  | **团队旗舰版**  | **团队尊享版**  | **企业标准版**  | **企业旗舰版**  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 「旗舰版权益技能」每日限额免费  | ➖  | ➖  | ➖  | ✔️  | ✔️  | ➖  | ✔️  | ✔️  | ➖  | ➖  |

> ✔️ 表示支持，➖ 表示不支持。

## 浏览并添加技能 \{#da2a3b89\}

在[扣子](https://www.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)首页的左侧导航栏中，单击**技能商店**图标即可浏览技能列表。你也可以直接[单击此处](https://www.coze.cn/skills?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)进入技能商店。

1. 浏览技能。
   你可以在技能商店中探索各类实用的技能、行业技能包或数据集，支持根据技能类型、行业领域查看指定技能类目，或者通过关键词搜索快速定位目标技能。
   单击技能名称进入技能详情页，也可以可查看技能的基本介绍以及基于该技能开发的精选案例。
   ::::cols
   @col 35
   ![Image=468x272](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/bd7df1625a9e4a84903d76a6f952c33f~tplv-goo7wpa0wc-topic.webp)
   
      <div style="text-align: center">网页端、桌面端   </div>
   
   @col 64
   ![Image=86x159](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/0aef22fc090843648b12290d34571f1f~tplv-goo7wpa0wc-topic.webp)
   
   移动端
   ::::
2. 添加技能。
   对于免费的技能，在技能详情页单击**添加**即可。扣子会提示你要添加此技能的 Agent 列表。
   ::::cols
   @col 34
   ![Image=260x338](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/ff7c570c1dac428da4b8a68c4984c540~tplv-goo7wpa0wc-topic.webp)
   
      <div style="text-align: center">网页端、桌面端   </div>
   
   @col 65
   ![Image=170x326](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/6ea46b2a8fac4a1ca63579c242a357c7~tplv-goo7wpa0wc-topic.webp)
   
   移动端
   ::::
3. 使用技能。
   想快速体验此技能，可以在技能详情页单击**使用**，并输入你的指令即可。接下来就可以等待查看 Agent 使用技能后的惊艳表现。
   ::::cols
   @col 34
   ![Image=250x325](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/cf8b7b12034d49cf9a4ac5fe726f51d8~tplv-goo7wpa0wc-topic.webp)
   
   <div style="text-align: center">网页端、桌面端</div>
   
   @col 65
   ![Image=162x318](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/9aebe3cfc35048c38200c66436defbb1~tplv-goo7wpa0wc-topic.webp)
   
   移动端
   ::::   

## 购买技能 \{#44be14ec\}

技能商店提供了丰富的免费与付费技能。针对付费技能，你需要先购买再添加与使用。计费规则，请参考[付费技能费用](https://docs.coze.cn/skill-fee)。

1. 在技能商店中，找到要购买的付费技能。
2. 在技能详情页面，单击**购买**或**订阅**。
   购买完成后，你可以添加和使用技能。具体操作，请参考安装技能。
   ::::cols
   @col 38
   ![Image=283x362](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/81b3b1249575406da2281fde219fdbca~tplv-goo7wpa0wc-topic.webp)
   
   <div style="text-align: center">网页端、桌面端</div>
   
   @col 61
   ![Image=216x353](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/a07b50a019ef47de9ef581492865e993~tplv-goo7wpa0wc-topic.webp)
   
   移动端
   ::::   

## 管理已购技能 \{#bd29362b\}

购买技能后，你可以在**订阅记录**中查看已购买的技能、续费技能。

> 扣子移动端暂不支持该操作，请在网页端或桌面端体验。

::::tabs
@tab 查看已购技能
1. 在**技能商店**页面的右上角，单击**订阅记录**。
2. 在**我添加的**区域，查看已购买的技能。
   你可以在订阅记录中查看价格、订阅时长、购买时间等信息。

@tab 续费
付费技能需按月购买，你可以在到期前进行续费。

1. 在**技能商店**页面的右上角，单击**订阅记录**。
2. 找到待续费的技能，单击**续费**，并根据页面提示完成支付。
::::

## 常见问题 \{#39ecb27a\}

* 购买的技能支持退订吗？
* 我开发的技能可以上架到技能商店吗？
