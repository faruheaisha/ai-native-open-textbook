---
title: "ai-suggestions Specification"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/specs/ai-suggestions/spec.md"
sourceRel: "Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/specs/ai-suggestions/spec.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/specs/ai-suggestions/spec.md"
sourceSha256: "0975f363891082a755b4d37a116f86cf7aba18225096c9a2adef2078576a1ee1"
pageSha256: "0975f363891082a755b4d37a116f86cf7aba18225096c9a2adef2078576a1ee1"
contentMode: "local-full"
zh: ""
---

# ai-suggestions Specification

## Purpose
TBD - created by archiving change study-dashboard. Update Purpose after archive.
## Requirements
### Requirement: 展示 AI 学习建议面板
Dashboard SHALL 展示一个 AI 学习建议面板，显示 mock 的学习建议卡片列表。

#### Scenario: 渲染建议列表
- **WHEN** Dashboard 页面加载
- **THEN** 显示"AI 学习建议"面板，包含若干建议卡片，每张含标题、描述文字和分类标签

#### Scenario: 建议卡片分类标签
- **WHEN** 建议卡片渲染
- **THEN** 每张卡片 SHALL 展示一个彩色分类标签（如"复习"、"新课"、"练习"），不同分类使用不同颜色

#### Scenario: 空建议列表
- **WHEN** mock 数据返回空建议列表
- **THEN** 显示空状态提示文案（如"暂无学习建议"）
