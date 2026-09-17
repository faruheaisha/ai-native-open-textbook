---
title: "示例：将审查反馈转化为规则"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/docs/zh/lectures/lecture-10-why-end-to-end-testing-changes-results/code/review-feedback-to-rule.md"
sourceRel: "docs/zh/lectures/lecture-10-why-end-to-end-testing-changes-results/code/review-feedback-to-rule.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/docs/zh/lectures/lecture-10-why-end-to-end-testing-changes-results/code/review-feedback-to-rule.md"
sourceSha256: "63ebd8ecc9fa5beebc731bc32b0cd947750954cc2b5d81f65346911d3555d2f3"
pageSha256: "63ebd8ecc9fa5beebc731bc32b0cd947750954cc2b5d81f65346911d3555d2f3"
contentMode: "local-full"
zh: ""
---

# 示例：将审查反馈转化为规则

反复出现的审查意见：

> 不要从渲染器调用文件系统工具。使用预加载桥接。

提升为 harness 规则：

- 添加一个 lint 或 import 规则，阻止在渲染器代码中使用 `fs`
- 添加修复文本，解释预加载边界
