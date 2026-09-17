---
title: "通过门控策略"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/docs/zh/lectures/lecture-08-why-feature-lists-are-harness-primitives/code/pass-gate-policy.md"
sourceRel: "docs/zh/lectures/lecture-08-why-feature-lists-are-harness-primitives/code/pass-gate-policy.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/docs/zh/lectures/lecture-08-why-feature-lists-are-harness-primitives/code/pass-gate-policy.md"
sourceSha256: "8fa3dda604b09cacccadde05285ffc932a0bd7b043d0f37a93abceffd60bbeb6"
pageSha256: "8fa3dda604b09cacccadde05285ffc932a0bd7b043d0f37a93abceffd60bbeb6"
contentMode: "local-full"
zh: ""
---

# 通过门控策略

一个功能只有在满足以下条件时，才能从 `passes: false` 变为 `passes: true`：

- 预期的工作流已被执行
- 成功的证据已被记录
- 被测试的路径中不存在阻塞性错误
- 实现不会使应用处于损坏或模糊的状态
