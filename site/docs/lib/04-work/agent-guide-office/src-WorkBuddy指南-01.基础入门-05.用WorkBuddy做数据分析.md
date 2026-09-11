---
title: "WorkBuddy 数据分析入门：目标、口径、提示词与验收"
sourceId: "04-work/agent-guide-office"
sourceTitle: "Agent 办公实战指南（社区）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/tangshiyegit/agent-guide"
entryUrl: "https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/README.md"
zh: ""
---

# WorkBuddy 数据分析入门：目标、口径、提示词与验收

分析型任务最常见的问题，是需求里只有一句「帮我分析一下」。

WorkBuddy 可以把表格读完，却不知道分析要给谁看，收入应该用销售额还是净销售额。

口径没有说清楚，同一张表就会得到不同结果，汇报时也经不起追问。

## 把六件事写进任务

发任务前，先检查六件事。目标是什么，使用哪些资料，要做哪些动作，不能违反哪些规则，最后生成什么，怎样才算完成。

可以直接按下面的写法提交。

```text
商品销售明细.xlsx 请根据当前工作空间里的数据表，制作一份汇报用的数据分析。
目标：生成一份可以直接用于汇报的分析文档。
资料：只使用当前文件夹中的指定表格。
做法：先通读数据，向我确认统计口径和时间范围。确认后找出波动最大的三项指标，每项用一两句话说明发生了什么，并列出有数据支持的可能原因。
规则：每条结论都要能回到原始数据。无法确认的数字留空，不得编造。
结果：生成一份文档。第一页放一屏能够讲完的结论摘要，后面附明细表，文末单列需要人工确认的项目。
验收：我会抽查两到三条结论并回到原表核对。摘要必须控制在一屏以内。
```

![image-20260805164206590](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122731Z-31bc32fc5c3f6947-f0727774.jpg)

对话框旁边还有优化提示词按钮。

一句话需求可以用它补充遗漏。

范围、规则和验收已经写清时，无需继续加长。

优化后仍要检查统计口径有没有变化。

![image-20260805164239684](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122729Z-4e4b5719bf9f1587-711ff0df.jpg)

## 查看 Todo 和中间结果

执行过程中，页面会显示 Todo 清单。

先看它是否读对文件，有没有按照要求汇总。

任务步骤偏了，可以及时纠正。

![image-20260805164617350](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122732Z-50c783c678ab4a93-d36f479a.jpg)

右侧可以预览当前进度和最终文件。

完成后，也可以直接打开文件所在目录。

![image-20260805165742679](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122730Z-4109c6be3d71d9c1-27c9d855.jpg)

![image-20260805165835638](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122730Z-036ce94e47676dc7-761864a5.jpg)

## 最后回到原表抽查

数据分析不能只检查文档写得顺不顺。

挑两三条最重要的结论，回到销售明细中重新筛选月份、商品或渠道，确认汇总数字能够对上。

## 相关阅读

- [WorkBuddy 分析 Excel 数据并生成图表](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/office-productivity/08-work-buddy-data-analysis-charts.html)
- [用 WorkBuddy 做高质量 PPT](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/office-productivity/01-work-buddy-ppt.html)
- [查看完整 WorkBuddy 教程目录](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/README.md)
