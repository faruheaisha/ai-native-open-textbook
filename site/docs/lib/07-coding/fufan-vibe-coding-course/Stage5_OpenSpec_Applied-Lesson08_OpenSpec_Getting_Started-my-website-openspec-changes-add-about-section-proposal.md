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
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage5_OpenSpec_Applied/Lesson08_OpenSpec_Getting_Started/my-website/openspec/changes/add-about-section/proposal.md"
sourceRel: "Stage5_OpenSpec_Applied/Lesson08_OpenSpec_Getting_Started/my-website/openspec/changes/add-about-section/proposal.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage5_OpenSpec_Applied/Lesson08_OpenSpec_Getting_Started/my-website/openspec/changes/add-about-section/proposal.md"
sourceSha256: "049fb85f73e3f575695d4beca51b8d58cb7ca0b161d61674f1d04eb918138998"
pageSha256: "049fb85f73e3f575695d4beca51b8d58cb7ca0b161d61674f1d04eb918138998"
contentMode: "local-full"
zh: ""
---

# Vibe Coding：AI 编程实战课

## Why

个人品牌站目前有 Hero、项目展示和导航栏，但缺少个人介绍区域。Navbar 的「首页」链接（`#home`）可对应 Hero，「项目」已有 Section，但用户无法在站内了解站主的背景和理念。需要一个"关于我"区域来补全个人品牌的叙事。

## What Changes

- 新增"关于我" Section，位于项目展示区下方
- 左侧展示个人照片（响应式，移动端居中上方）
- 右侧展示个人简介（3 段文字）
- 下方展示品牌标签「赋范空间」
- 照片使用 lazy loading
- 支持亮色/暗色模式

## Out-of-Scope

- **不做联系我的表单**

## Capabilities

### New Capabilities

- `about-section`：关于我区域，包含个人照片、简介文字、品牌标签展示

### Modified Capabilities

（无现有 spec 需要修改）

## Impact

- **代码**：新增 `src/components/AboutSection.tsx`，修改 `src/App.tsx` 引入新 Section
- **资源**：需要添加个人照片到 `src/assets/`（或使用占位）
- **依赖**：无新增依赖
