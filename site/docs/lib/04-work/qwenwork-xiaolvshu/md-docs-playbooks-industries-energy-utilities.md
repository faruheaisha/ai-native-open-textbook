---
title: "能源与公用事业落地手册 (/docs/playbooks/industries/energy-utilities)"
sourceId: "04-work/qwenwork-xiaolvshu"
sourceTitle: "qwenwork-xiaolvshu"
sourceKind: "其他材料"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.org"
entryUrl: "https://qwenwork.org"
sourceRel: "md/docs/playbooks/industries/energy-utilities.md"
rawUrl: "/raw/04-work/qwenwork-xiaolvshu/md/docs/playbooks/industries/energy-utilities.md"
sourceSha256: "726367dcc02e6e0ddb04a6cd041182146980cfa7e10c2d0302c1f8f21d2ed693"
pageSha256: "726367dcc02e6e0ddb04a6cd041182146980cfa7e10c2d0302c1f8f21d2ed693"
contentMode: "local-full"
zh: ""
---

# 能源与公用事业落地手册 (/docs/playbooks/industries/energy-utilities)

## 推荐首个试点 [#推荐首个试点]

整理一种既有巡检记录，提取位置、设备、时间、现象、证据、处理状态和负责人。任何安全、停运、环境或计量异常立即进入人工升级队列。

&lt;Mermaid
  chart="flowchart TD
  A[巡检与工单] --> B[字段完整性检查]
  B --> C\{高风险关键词或状态\}
  C -->|是| D[立即升级]
  C -->|否| E[整理日报]
  E --> F[负责人复核]"
/>

| 场景   | 交付物          | 停止条件         |
| ---- | ------------ | ------------ |
| 巡检记录 | 异常、位置、证据和待办  | 安全、停运或环境风险   |
| 规程检索 | 原文、版本和摘要     | 找不到有效版本      |
| 客服工单 | 分类、影响和回复草稿   | 停供、费用争议或人身风险 |
| 检修周报 | 进度、资源、风险与下一步 | 工作许可或计划变更    |
| 能耗排放 | 口径、趋势和待核验异常  | 计量缺失或口径变化    |

千问办公只处理信息，不接管电力、燃气、供水、矿山等系统的调度、停送、许可和实时控制。无人值守报告必须设置数据过期检测和异常告警。
