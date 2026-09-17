---
title: "表格清洗与分析 (/docs/workflows/spreadsheets)"
sourceId: "04-work/qwenwork-xiaolvshu"
sourceTitle: "qwenwork-xiaolvshu"
sourceKind: "其他材料"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.org"
entryUrl: "https://qwenwork.org"
sourceRel: "md/docs/workflows/spreadsheets.md"
rawUrl: "/raw/04-work/qwenwork-xiaolvshu/md/docs/workflows/spreadsheets.md"
sourceSha256: "905d6f26e2de05e225feb3835da9e26fba0034ee9997538cb3f507f476201e3d"
pageSha256: "905d6f26e2de05e225feb3835da9e26fba0034ee9997538cb3f507f476201e3d"
contentMode: "local-full"
zh: ""
---

# 表格清洗与分析 (/docs/workflows/spreadsheets)

Excel 任务应把“计算正确”放在“图表好看”之前。开始前保留原始文件，只在副本上修改。

## 与最新任务入口的对应 [#与最新任务入口的对应]

数据任务可以分成四种：分析本地文件、分析钉钉云盘内在线文件、生成可视化报告、监控经营数据与异常。四种任务使用同一数据治理规则，但权限和交付不同：

| 入口    | 额外约束                                      |
| ----- | ----------------------------------------- |
| 本地文件  | 只授权指定目录，保留原文件与处理清单                        |
| 在线文件  | 确认连接器已开启、目标文件和读取或写入权限                     |
| 可视化报告 | 图表必须回到指标口径和可复算数据                          |
| 异常监控  | 典型形态是多门店经营数据监控看板加异常警告；写明阈值、检查频率、通知对象和误报处理 |

## 示例：销售数据复盘 [#示例销售数据复盘]

```text
分析附件中的销售明细，输出一个新的 Excel 工作簿和一页中文结论摘要。

请先检查：列名、日期格式、币种、空值、重复行和异常值。
不要修改原始数据 Sheet；新增 Cleaned、Summary、Exceptions 三个 Sheet。
Summary 至少包含月度销售额、订单数、客单价、区域和产品 Top 5。
Exceptions 列出所有清洗规则、受影响行号和处理方式。
所有指标使用公式或可追溯计算，不要手填最终数字。
完成后随机抽查 10 行，并说明核对结果。
```

## 关键检查 [#关键检查]

| 风险       | 检查方法          |
| -------- | ------------- |
| 日期被识别成文本 | 抽查排序与月份汇总边界   |
| 金额混用币种   | 检查币种列和换算规则    |
| 重复订单     | 明确唯一键，不只按整行去重 |
| 空值被当作 0  | 区分未知、无发生和真实零值 |
| 百分比口径不一致 | 写明分子、分母和时间范围  |
| 图表误导     | 检查坐标轴、截断和样本量  |

## 写回源文件 [#写回源文件]

上传 Excel 后，如果当前端提供写回源文件的能力，使用前应先复制备份，并明确允许修改的 Sheet 和单元格范围。涉及生产报表时，优先让千问办公输出新文件而不是直接覆盖。

  至少手工重算一个汇总指标、一个边界日期和一个异常样本。重要财务数据还应由业务负责人复核。
