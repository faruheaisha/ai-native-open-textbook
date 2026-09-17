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
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage5_OpenSpec_Applied/Lesson08_OpenSpec_Getting_Started/my-website/openspec/changes/add-about-section/tasks.md"
sourceRel: "Stage5_OpenSpec_Applied/Lesson08_OpenSpec_Getting_Started/my-website/openspec/changes/add-about-section/tasks.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage5_OpenSpec_Applied/Lesson08_OpenSpec_Getting_Started/my-website/openspec/changes/add-about-section/tasks.md"
sourceSha256: "90e440e809d145e24b4e4e8de77d4bc2f8dc0dc68c074ff47b26dfa69a0884fc"
pageSha256: "90e440e809d145e24b4e4e8de77d4bc2f8dc0dc68c074ff47b26dfa69a0884fc"
contentMode: "local-full"
zh: ""
---

# Vibe Coding：AI 编程实战课

## Phase 1. AboutSection 组件

- [x] 1.1 创建 `src/components/AboutSection.tsx`：Section 容器，`id="about"`，`flex flex-col md:flex-row` 左右分栏布局
- [x] 1.2 实现左侧照片区域：`aspect-square object-cover rounded-2xl loading="lazy"`，灰色占位背景，`onError` 降级处理
- [x] 1.3 实现右侧简介区域：3 段文字，响应式间距，暗色模式适配
- [x] 1.4 实现底部品牌标签：「赋范空间」居中展示，突出字号 + 特殊色调，暗色模式适配

## Phase 2. 整合与验收

- [x] 2.1 在 `App.tsx` 中引入 AboutSection，放在 ProjectSection 下方
- [x] 2.2 运行 `npm run build`，确认构建无报错
