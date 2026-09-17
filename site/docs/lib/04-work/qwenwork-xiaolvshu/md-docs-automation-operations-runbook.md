---
title: "自动化运行与故障手册 (/docs/automation/operations-runbook)"
sourceId: "04-work/qwenwork-xiaolvshu"
sourceTitle: "qwenwork-xiaolvshu"
sourceKind: "其他材料"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.org"
entryUrl: "https://qwenwork.org"
sourceRel: "md/docs/automation/operations-runbook.md"
rawUrl: "/raw/04-work/qwenwork-xiaolvshu/md/docs/automation/operations-runbook.md"
sourceSha256: "4b23c35826d6aadd926fddc0692d48e810af6429760d415fd1254eb9ffe1ffaa"
pageSha256: "4b23c35826d6aadd926fddc0692d48e810af6429760d415fd1254eb9ffe1ffaa"
contentMode: "local-full"
zh: ""
---

# 自动化运行与故障手册 (/docs/automation/operations-runbook)

运行手册解决的是“任务出问题时谁能立刻做什么”。它应与任务配置一起维护，而不是出故障后临时回忆。

## 每次运行记录 [#每次运行记录]

* 批次 ID、触发方式和计划时间；
* 输入时间范围、数据版本和来源状态；
* 每一步的开始、结束、耗时和结果；
* 质量门禁状态与过滤前后数量；
* 输出位置、消息或记录标识；
* 积分、Token、调用次数和总耗时；
* 错误类型、重试次数和最终处理。

日志不保存不必要的正文、密钥或个人数据。

## 可行动告警 [#可行动告警]

```text
任务：[名称]
批次：[批次 ID]
状态：[Warning / Blocked]
触发时间：[时间]
失败步骤：[步骤]
原因：[具体错误]
已完成：[步骤与产物]
影响：[未交付、部分交付或重复风险]
建议处理：[1、2、3]
负责人：[姓名或岗位]
恢复方式：[从哪个步骤继续]
```

“任务失败，请查看”不是可行动告警。

## 故障处理顺序 [#故障处理顺序]

    \### 控制影响
    暂停后续触发，确认是否已经发送、覆盖或产生重复记录。

    \### 保留现场
    保存批次状态、错误、输入版本和已生成产物，不先删除任务。

    \### 分类问题
    判断是数据、权限、配置、模型质量、写入目标还是资源上限。

    \### 小样本修复
    在副本或新批次中复现并修正，不直接在正式任务上试错。

    \### 补跑与核验
    使用原批次或补跑标识避免重复写入，完成后人工检查。

    \### 复盘更新
    更新任务定义、测试样本、告警和运行手册。

## 运行指标 [#运行指标]

| 指标     | 说明                       |
| ------ | ------------------------ |
| 按时触发率  | 计划时间内启动的比例               |
| 一次成功率  | 无需重试或人工介入的比例             |
| 数据源可用率 | 每个来源单独的成功比例              |
| 质量通过率  | Pass、Warning、Blocked 的分布 |
| 推送成功率  | 结果成功写入或送达的比例             |
| 单次运行成本 | 积分、Token、调用和耗时趋势         |
| 人工采用率  | 结果被实际采用的比例               |

指标持续下降时，应暂停扩展范围，优先修正来源、规则或输出。

## 变更流程 [#变更流程]

修改提示词、数据源、输出字段、权限或推送位置都属于配置变更。先手动运行三次，记录差异和验证结果，再更新定时任务；保留上一版本和回退方法。
