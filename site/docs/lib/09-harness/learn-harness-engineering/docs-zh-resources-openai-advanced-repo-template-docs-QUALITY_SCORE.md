---
title: "QUALITYSCORE.md"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/docs/zh/resources/openai-advanced/repo-template/docs/QUALITY_SCORE.md"
sourceRel: "docs/zh/resources/openai-advanced/repo-template/docs/QUALITY_SCORE.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/docs/zh/resources/openai-advanced/repo-template/docs/QUALITY_SCORE.md"
sourceSha256: "3ae2a049d1d932ec8ce44f92a7b7fb781a7bdf11c772b521794f381e6d5233fb"
pageSha256: "3ae2a049d1d932ec8ce44f92a7b7fb781a7bdf11c772b521794f381e6d5233fb"
contentMode: "local-full"
zh: ""
---

# QUALITY_SCORE.md

这份文档用来跟踪仓库是在变强还是变弱。

## 评级标准

- `A`：验证通过、可读、稳定、边界执行到位
- `B`：可用，只有少量缺口
- `C`：部分可用，存在明显混乱或不稳定
- `D`：损坏、不安全，或结构上说不清楚

## 产品领域

| 领域 | 评级 | 验证状态 | Agent 可读性 | 测试稳定性 | 关键缺口 | 上次更新 |
|------|------|---------|-------------|-----------|---------|---------|
| `[domain-a]` | - | - | - | - | - | - |
| `[domain-b]` | - | - | - | - | - | - |
| `[domain-c]` | - | - | - | - | - | - |

## 架构层

| 层级 | 评级 | 边界执行 | Agent 可读性 | 关键缺口 | 上次更新 |
|------|------|---------|-------------|---------|---------|
| Types | - | - | - | - | - |
| Services | - | - | - | - | - |
| Runtime | - | - | - | - | - |
| UI | - | - | - | - | - |

## Benchmark 快照

| 日期 | Harness 变体 | 完成率 | 重试次数 | Review 前缺陷数 | 备注 |
|------|-------------|-------|---------|----------------|------|
| YYYY-MM-DD | `[baseline / improved / simplified]` | - | - | - | - |

## 简化实验日志

| 日期 | 移除的组件 | 结果 | 决策 |
|------|-----------|------|------|
| YYYY-MM-DD | `[component]` | `[degraded / unchanged]` | `[restore / keep removed]` |
