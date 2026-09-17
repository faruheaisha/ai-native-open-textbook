---
title: "Prompt 校准"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/docs/zh/resources/reference/prompt-calibration.md"
sourceRel: "docs/zh/resources/reference/prompt-calibration.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/docs/zh/resources/reference/prompt-calibration.md"
sourceSha256: "656d3432e3bda364abd176aa525528dcbf50c6ef178e72f056f2d468928db4b4"
pageSha256: "656d3432e3bda364abd176aa525528dcbf50c6ef178e72f056f2d468928db4b4"
contentMode: "local-full"
zh: ""
---

# Prompt 校准

根指令文件应该定义工作框架，而不是把所有动作写死。

## 应该留在根文件里的内容

- 仓库用途和范围
- 启动路径
- 验证路径
- 不可违反的约束
- 必需的状态工件
- 会话结束规则

## 应该移出根文件的内容

- 过长的历史边角案例
- 只属于某个子系统的细节实现说明
- 更适合贴在代码附近的局部架构笔记
- 只对单一模块成立的示例

## 工作原则

根文件的职责是让新会话快速建立方向感。如果它开始变成“过去每次失败都往里加一句”的堆叠场，就应该把细节拆到更小、更明确的文档里，再从根文件跳转过去。
