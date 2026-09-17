---
title: "Analysis — 经验可观测性标准"
sourceId: "09-harness/agentic-harness-engineering"
sourceTitle: "Agentic Harness Engineering（论文与实现）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/china-qijizhifeng/agentic-harness-engineering"
entryUrl: "https://github.com/china-qijizhifeng/agentic-harness-engineering/blob/8b2a55d97590363fe50c3cc6b5e833b020a4bb4c/skills/agentic-harness-engineering/references/analysis/README.md"
sourceRel: "skills/agentic-harness-engineering/references/analysis/README.md"
rawUrl: "/raw/09-harness/agentic-harness-engineering/skills/agentic-harness-engineering/references/analysis/README.md"
sourceSha256: "e96c9fc7cedc719dd838bbcdee0e5a1501d94ccd8fa8bb426fec243c0fab4a64"
pageSha256: "e96c9fc7cedc719dd838bbcdee0e5a1501d94ccd8fa8bb426fec243c0fab4a64"
contentMode: "local-full"
zh: ""
---

# Analysis — 经验可观测性标准

> 对应 AHE 论文第二层：Experience Observability。

## 目标

将大量原始 trajectory / trace 蒸馏成可消费的分析报告，让演化 Agent 能知道失败模式在哪里。

## 报告结构

analysis/
├── README.md              # 本文件
├── overview-template.md   # 概览报告模板
└── detail/
    └── task_xxx.md        # 逐任务详细分析

## Overview 报告内容
- 本轮评估摘要（pass/fail 数量、成功率）
- 失败模式聚类
- 根因分布
- 推荐优先修复的组件

## Detail 报告内容
- 任务描述
- 轨迹摘录
- 失败原因分析
- 根因定位到具体组件
- 修复建议
