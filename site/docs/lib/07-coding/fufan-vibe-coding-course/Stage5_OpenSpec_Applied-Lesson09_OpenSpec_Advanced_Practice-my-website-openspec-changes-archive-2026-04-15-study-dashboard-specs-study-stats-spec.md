---
title: "Vibe Coding：AI 编程实战课"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-study-dashboard/specs/study-stats/spec.md"
sourceRel: "Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-study-dashboard/specs/study-stats/spec.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-study-dashboard/specs/study-stats/spec.md"
sourceSha256: "f750e3c50a84917a11761430cb200dac4f07e9b922d4d1133273239fbdd10a47"
pageSha256: "f750e3c50a84917a11761430cb200dac4f07e9b922d4d1133273239fbdd10a47"
contentMode: "local-full"
zh: ""
---

# Vibe Coding：AI 编程实战课

## ADDED Requirements

### Requirement: 展示学习概览统计卡片
Dashboard SHALL 在顶部展示 4 张统计卡片，分别显示：今日学习时长、完成任务数、连续打卡天数、学习效率。

#### Scenario: 正常渲染统计数据
- **WHEN** Dashboard 页面加载
- **THEN** 显示 4 张卡片，每张包含：指标图标、指标名称、数值、与昨日对比的变化趋势（↑/↓/—）

#### Scenario: 统计卡片响应式布局
- **WHEN** 视口宽度 ≥ 768px
- **THEN** 4 张卡片在一行内等宽排列
- **WHEN** 视口宽度 < 768px
- **THEN** 4 张卡片以 2×2 网格排列

#### Scenario: 数据为零时的展示
- **WHEN** 某项统计指标值为 0
- **THEN** 卡片正常渲染，显示 "0" 而非空白或错误状态
