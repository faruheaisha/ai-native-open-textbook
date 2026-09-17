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
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-study-dashboard/specs/daily-goals/spec.md"
sourceRel: "Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-study-dashboard/specs/daily-goals/spec.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-study-dashboard/specs/daily-goals/spec.md"
sourceSha256: "01aebcf9f08b4fba022aba54d84c436a25ca4ba5f815d7235e2ad854d5ee137f"
pageSha256: "01aebcf9f08b4fba022aba54d84c436a25ca4ba5f815d7235e2ad854d5ee137f"
contentMode: "local-full"
zh: ""
---

# Vibe Coding：AI 编程实战课

## ADDED Requirements

### Requirement: 展示每日目标清单
Dashboard SHALL 展示一个可交互的每日目标清单面板，用户可以勾选完成状态。

#### Scenario: 渲染目标列表
- **WHEN** Dashboard 页面加载
- **THEN** 显示目标清单面板，包含标题"每日目标"和若干目标项，每项含勾选框和目标文字

#### Scenario: 勾选完成目标
- **WHEN** 用户点击某目标项的勾选框
- **THEN** 该目标标记为已完成（勾选框填充，文字添加删除线样式）

#### Scenario: 取消完成状态
- **WHEN** 用户点击已完成目标的勾选框
- **THEN** 该目标恢复为未完成状态（勾选框清空，删除线移除）

#### Scenario: 显示完成进度
- **WHEN** 目标清单中有 N 项已完成、共 M 项
- **THEN** 面板顶部显示进度指示（如 "N/M 已完成"）

#### Scenario: 空目标列表
- **WHEN** mock 数据返回空目标列表
- **THEN** 显示空状态提示文案（如"今天还没有学习目标"）
