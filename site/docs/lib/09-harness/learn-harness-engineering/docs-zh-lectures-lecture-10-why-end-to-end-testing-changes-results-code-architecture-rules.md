---
title: "Electron 架构规则"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/docs/zh/lectures/lecture-10-why-end-to-end-testing-changes-results/code/architecture-rules.md"
sourceRel: "docs/zh/lectures/lecture-10-why-end-to-end-testing-changes-results/code/architecture-rules.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/docs/zh/lectures/lecture-10-why-end-to-end-testing-changes-results/code/architecture-rules.md"
sourceSha256: "3d78f1970d3552be72c0687871b658fec32de1c2e4b2a1e36d89a786adaa0abd"
pageSha256: "3d78f1970d3552be72c0687871b658fec32de1c2e4b2a1e36d89a786adaa0abd"
contentMode: "local-full"
zh: ""
---

# Electron 架构规则

- 渲染器代码不能直接访问文件系统。
- 预加载是渲染器与 Electron 主进程之间的唯一桥梁。
- 检索和索引逻辑位于服务模块中，而非 UI 组件中。
- 日志应该是结构化的，并从服务边界发出。
