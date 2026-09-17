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
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-analytics-deploy/study-calendar/spec.md"
sourceRel: "Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-analytics-deploy/study-calendar/spec.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-analytics-deploy/study-calendar/spec.md"
sourceSha256: "43f26e272f6e84c466fb47130f3b52ede3faa4b6d1174e477ab947a2cd86ef44"
pageSha256: "43f26e272f6e84c466fb47130f3b52ede3faa4b6d1174e477ab947a2cd86ef44"
contentMode: "local-full"
zh: ""
---

# Vibe Coding：AI 编程实战课

## ADDED Requirements

### Requirement: 学习日历热力图展示
前端 SHALL 在 Dashboard 展示一个类 GitHub contribution graph 的学习日历热力图。

#### Scenario: 渲染热力图
- **WHEN** Dashboard 页面加载
- **THEN** 显示当前年份的热力图，颜色深浅表示当日学习时长（无记录为灰色，时长越长颜色越深）

#### Scenario: 悬浮显示详情
- **WHEN** 用户将鼠标悬浮在某日格子上
- **THEN** 显示 tooltip 包含日期和学习时长（如"2026-04-15: 120 分钟"）

#### Scenario: 无数据时的展示
- **WHEN** 当前年份无任何学习记录
- **THEN** 热力图全部显示为空白灰色格子
