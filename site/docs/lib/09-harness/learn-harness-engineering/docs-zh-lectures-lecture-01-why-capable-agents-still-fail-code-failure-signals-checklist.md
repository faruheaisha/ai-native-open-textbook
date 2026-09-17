---
title: "失败信号检查清单"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/docs/zh/lectures/lecture-01-why-capable-agents-still-fail/code/failure-signals-checklist.md"
sourceRel: "docs/zh/lectures/lecture-01-why-capable-agents-still-fail/code/failure-signals-checklist.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/docs/zh/lectures/lecture-01-why-capable-agents-still-fail/code/failure-signals-checklist.md"
sourceSha256: "fba592a85ea052637a8b140461c1701fb94e5b5ad36ebfe0a5471a98eda2ef1a"
pageSha256: "fba592a85ea052637a8b140461c1701fb94e5b5ad36ebfe0a5471a98eda2ef1a"
contentMode: "local-full"
zh: ""
---

# 失败信号检查清单

在审查一次弱 harness 运行结果时使用此清单。

- Agent 是否询问了如何启动应用，或者做出了错误的推断？
- 它是否创建了与预期产品不匹配的目录或抽象？
- 它是否在完成一个可见的 UI 外壳后就停止了，而没有完成完整的工作流？
- 它是否留下了有助于后续运行继续的笔记或产物？
- 一个全新的会话是否能在五分钟内理解之前发生了什么？
