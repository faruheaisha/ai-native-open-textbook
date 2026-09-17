---
title: "规格不足的任务示例"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/docs/zh/lectures/lecture-01-why-capable-agents-still-fail/code/underspecified-task.md"
sourceRel: "docs/zh/lectures/lecture-01-why-capable-agents-still-fail/code/underspecified-task.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/docs/zh/lectures/lecture-01-why-capable-agents-still-fail/code/underspecified-task.md"
sourceSha256: "3e4f907f74b543a519dc6b33e821eb296697fd391191d37b285a9144bd22c9dc"
pageSha256: "3e4f907f74b543a519dc6b33e821eb296697fd391191d37b285a9144bd22c9dc"
contentMode: "local-full"
zh: ""
---

# 规格不足的任务示例

构建一个带有 AI 问答功能的桌面知识库应用。

约束条件：

- 未指定任何约束
- 未给出启动命令
- 未提供文件夹结构指引
- 未定义数据模型
- 未明确完成标准

这类提示的典型结果：

- Agent 临时编造一个结构
- 应用可能编译通过但无法一致地启动
- UI 可能在没有任何可用的导入/查询路径之前就出现了
- Agent 通常在表面成功后就停止了
