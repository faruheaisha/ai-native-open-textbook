---
title: "制造与工业落地手册 (/docs/playbooks/industries/manufacturing)"
sourceId: "04-work/qwenwork-xiaolvshu"
sourceTitle: "qwenwork-xiaolvshu"
sourceKind: "其他材料"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.org"
entryUrl: "https://qwenwork.org"
sourceRel: "md/docs/playbooks/industries/manufacturing.md"
rawUrl: "/raw/04-work/qwenwork-xiaolvshu/md/docs/playbooks/industries/manufacturing.md"
sourceSha256: "b595f2e50487806539770e5d2a289109eccc78ab498f64047b3e333a110da694"
pageSha256: "b595f2e50487806539770e5d2a289109eccc78ab498f64047b3e333a110da694"
contentMode: "local-full"
zh: ""
---

# 制造与工业落地手册 (/docs/playbooks/industries/manufacturing)

## 推荐首个试点 [#推荐首个试点]

选择一种固定格式的质量周报。输入检验记录、不良描述、批次和已确认的处理结果，输出缺陷分类、批次影响、待确认原因和责任人清单。

&lt;Mermaid
  chart="flowchart LR
  A[检验与工单记录] --> B[字段和批次校验]
  B --> C[缺陷分类与时间线]
  C --> D[质量工程师复核]
  D --> E[质量周报]"
/>

## 三条可落地工作流 [#三条可落地工作流]

| 工作流     | 输入             | 交付物            |
| ------- | -------------- | -------------- |
| 质量问题归档  | 检验、不良、图片、批次    | 缺陷表、证据索引、待确认原因 |
| 工单与交接班  | 维修记录、停机时间、人员备注 | 设备状态、处理结果、遗留项  |
| 供应商质量沟通 | 来料记录、标准、历史问题   | 差异表、证据包、沟通草稿   |

## 可复制任务模板 [#可复制任务模板]

```text
请仅依据所附质量记录整理本周问题。按产品、批次、缺陷类型、发现时间、当前状态和负责人输出表格。无法从原记录确认的根因标记为“待确认”，不要推断。另生成高频问题、重复发生问题和逾期未关闭项清单。
```

## 验收与边界 [#验收与边界]

* 随机抽查批次、数量、设备编号与原始记录一致；
* 根因、责任与关闭状态必须有原文依据；
* 不修改工艺参数，不操作 MES、PLC 或安全联锁；
* 出现人身、环境或重大质量风险时立即转负责人。

下一步可将稳定周报接入[自动化任务定义](https://qwenwork.org/docs/automation/task-definition)，但发布前继续保留质量负责人确认。
