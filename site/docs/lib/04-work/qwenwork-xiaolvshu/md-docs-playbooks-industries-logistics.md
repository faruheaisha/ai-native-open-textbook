---
title: "物流与供应链落地手册 (/docs/playbooks/industries/logistics)"
sourceId: "04-work/qwenwork-xiaolvshu"
sourceTitle: "qwenwork-xiaolvshu"
sourceKind: "其他材料"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.org"
entryUrl: "https://qwenwork.org"
sourceRel: "md/docs/playbooks/industries/logistics.md"
rawUrl: "/raw/04-work/qwenwork-xiaolvshu/md/docs/playbooks/industries/logistics.md"
sourceSha256: "957eeab0ef0b6cf2ae725ecb818193ac44d4a22012b45aebfe1dd76ab2a1f8cb"
pageSha256: "957eeab0ef0b6cf2ae725ecb818193ac44d4a22012b45aebfe1dd76ab2a1f8cb"
contentMode: "local-full"
zh: ""
---

# 物流与供应链落地手册 (/docs/playbooks/industries/logistics)

## 推荐首个试点 [#推荐首个试点]

先选择一种固定格式的运单或装箱单，提取单号、主体、数量、单位、起讫地和日期。低置信度、版式异常或字段冲突的记录进入人工队列。

&lt;Mermaid
  chart="flowchart LR
  A[运输单证] --> B[字段提取]
  B --> C\{规则校验\}
  C -->|异常| D[人工队列]
  C -->|通过| E[运输台账]
  E --> F[异常日报]"
/>

## 场景卡 [#场景卡]

| 场景     | 输出             | 人工确认点       |
| ------ | -------------- | ----------- |
| 单证整理   | 提单、运单、装箱单字段表   | 单号、数量、单位和主体 |
| 在途异常日报 | 延误、破损、拒收与缺件清单  | 状态时间和责任人    |
| 风险简报   | 供应商、地区、交期和公开动态 | 日期、证据和影响范围  |
| 客户通知   | 延误说明与补充材料请求草稿  | 时间、赔偿和责任承诺  |

```text
按运输单号汇总今日异常。每条记录必须包含最后更新时间、信息来源、当前影响、下一步、负责人和待客户确认事项。没有来源的状态不得补写。
```

## 停止条件 [#停止条件]

涉及放货、改线、报关、费用确认、赔偿或危险品异常时停止自动处理。若数据源超过约定时间未更新，也不发送“正常”结论。

长期运行前参考[可靠自动化设计](https://qwenwork.org/docs/automation/reliable-automation)设置唯一键、重复写入保护和失败告警。
