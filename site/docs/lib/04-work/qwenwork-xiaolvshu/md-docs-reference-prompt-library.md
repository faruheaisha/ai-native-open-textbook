---
title: "提示词模板库 (/docs/reference/prompt-library)"
sourceId: "04-work/qwenwork-xiaolvshu"
sourceTitle: "qwenwork-xiaolvshu"
sourceKind: "其他材料"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.org"
entryUrl: "https://qwenwork.org"
sourceRel: "md/docs/reference/prompt-library.md"
rawUrl: "/raw/04-work/qwenwork-xiaolvshu/md/docs/reference/prompt-library.md"
sourceSha256: "7a2b5deb28cf3e03ad4f76658c58e1019ba4bcd0f437d335a18f1b199f7a5416"
pageSha256: "7a2b5deb28cf3e03ad4f76658c58e1019ba4bcd0f437d335a18f1b199f7a5416"
contentMode: "local-full"
zh: ""
---

# 提示词模板库 (/docs/reference/prompt-library)

以下模板是起点，不是万能指令。使用时删除不适用内容，并补充真实业务背景。

## 通用任务 [#通用任务]

```text
目标：请完成【具体任务】，结果将用于【读者/场景】。

输入：只使用我提供的【文件/链接/数据】。
必须包含：【结构、指标或交付内容】。
不得执行：【不允许的动作或禁止猜测的内容】。
交付格式：【Word/Excel/PPT/Markdown/网页】，文件名为【名称】。

事实规则：无法从输入验证的信息标记“待确认”，不要补写。
安全规则：发送、发布、删除或修改外部系统前必须先让我确认。
验收标准：【3—7 条可检查条件】。

开始前先复述目标和缺失信息；完成后进行自检并报告结果。
```

## 修改已有文件 [#修改已有文件]

```text
请修改附件【文件名】的副本，不要覆盖原文件。

允许修改：【Sheet/页面/章节/样式范围】。
必须保留：【公式、页眉、模板、列结构等】。
修改要求：【逐条列出】。
信息冲突时停止并列出冲突，不自行选择。
输出新文件，并提供修改清单和未解决问题。
```

## 调研任务 [#调研任务]

```text
研究问题：【一句话问题】。
时间范围：【起止日期】；地区：【范围】。
优先来源：官方文档、原始数据、监管文件、可信研究机构。
每项时效事实附直接链接与日期。
区分“确认事实、推断、待验证假设”。
输出：摘要、证据表、分析、结论、限制和下一步。
```

## 定时任务 [#定时任务]

```text
每【周期与时区】检查【数据来源】。
只处理【明确范围】；没有新数据时报告“本期无更新”，不要重复发送旧内容。
输出包含：执行时间、数据范围、结果、异常和来源链接。
如果数据量超过【阈值】、来源不可用或需要登录，停止并发送异常说明。
结果发送到【已验证目标】；不得修改其他外部系统。
```
