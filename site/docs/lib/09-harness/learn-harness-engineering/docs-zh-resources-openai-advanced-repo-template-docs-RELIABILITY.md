---
title: "RELIABILITY.md"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/docs/zh/resources/openai-advanced/repo-template/docs/RELIABILITY.md"
sourceRel: "docs/zh/resources/openai-advanced/repo-template/docs/RELIABILITY.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/docs/zh/resources/openai-advanced/repo-template/docs/RELIABILITY.md"
sourceSha256: "3b839a5cd0bb2135330a1769d8d69a92ebce3dc30dd75d5e693529d7462db0b3"
pageSha256: "3b839a5cd0bb2135330a1769d8d69a92ebce3dc30dd75d5e693529d7462db0b3"
contentMode: "local-full"
zh: ""
---

# RELIABILITY.md

这份文件定义系统如何证明自己健康、可诊断、可重启。

## 标准路径

- Bootstrap：`[command]`
- Verification：`[command]`
- 启动应用或服务：`[command]`
- 调试或查看运行态：`[command]`

## 必需运行信号

- 启动与关键流程的结构化日志
- 关键服务的 health check
- 条件允许时为慢路径提供 trace 或 timing 数据
- 对可恢复失败提供用户可见的错误状态

## 黄金旅程

- `[journey 1]`
- `[journey 2]`
- `[journey 3]`

每条黄金旅程都应该有可重复的验证路径和清晰的失败信号。

## 可靠性规则

- 只要系统不能干净重启，功能就不能算完成。
- 运行失败必须能从 repo-local 信号里定位。
- 某类失败模式一旦反复出现，就给它补 benchmark 或 guardrail。
- cleanup 属于可靠性的一部分，不是另外一件事。
