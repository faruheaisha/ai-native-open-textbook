---
title: "study-stats Specification"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/specs/study-stats/spec.md"
sourceRel: "Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/specs/study-stats/spec.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/specs/study-stats/spec.md"
sourceSha256: "aa9cca5cd4699be90920a2ab428886e629dd04c9f0ba0be7dde7ff8dafafab36"
pageSha256: "aa9cca5cd4699be90920a2ab428886e629dd04c9f0ba0be7dde7ff8dafafab36"
contentMode: "local-full"
zh: ""
---

# study-stats Specification

## Purpose
TBD - created by archiving change study-dashboard. Update Purpose after archive.
## Requirements
### Requirement: 展示学习概览统计卡片
Dashboard SHALL 在顶部展示统计卡片，数据从后端 API 实时获取。

#### Scenario: 正常渲染真实统计数据
- **WHEN** Dashboard 页面加载且用户已认证
- **THEN** 统计卡片调用 `GET /api/analytics/stats` 获取真实数据并展示

#### Scenario: API 请求失败时降级
- **WHEN** 统计 API 返回错误
- **THEN** 卡片显示"加载失败"提示，不显示错误的数值

#### Scenario: 统计卡片响应式布局
- **WHEN** 视口宽度 ≥ 768px
- **THEN** 卡片在一行内等宽排列
- **WHEN** 视口宽度 < 768px
- **THEN** 卡片以 2×2 网格排列
