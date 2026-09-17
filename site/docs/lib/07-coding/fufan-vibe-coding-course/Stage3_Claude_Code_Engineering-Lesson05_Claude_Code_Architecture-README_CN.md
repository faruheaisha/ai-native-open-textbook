---
title: "Lesson 05: Claude Code 架构拆解 · 工业级实战"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/README_CN.md"
sourceRel: "Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/README_CN.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/README_CN.md"
sourceSha256: "baef448a4ebb20460776c97ddf17cd0730f9cb729623c2d5ad264dbee98eff8b"
pageSha256: "baef448a4ebb20460776c97ddf17cd0730f9cb729623c2d5ad264dbee98eff8b"
contentMode: "local-full"
zh: ""
---

# Lesson 05: Claude Code 架构拆解 · 工业级实战

[English](/lib/07-coding/fufan-vibe-coding-course/Stage3_Claude_Code_Engineering-Lesson05_Claude_Code_Architecture) | 中文

本课聚焦 Claude Code 的架构与核心能力，覆盖工业级工程实践，并新增 GraphRAG 方向的实战项目与配套资料。

## 主题

- Claude Code 架构概览与 CLI 深入讲解
- 上下文工程与提示词策略
- 工业级开发流程与项目组织方式
- GraphRAG 流水线原型实践（抽取、组装与服务）

## 课程资料

- **01_课件/**
  - [04_ClaudeCode工业级实战.pdf](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/Courseware/01_课件/04_ClaudeCode工业级实战.pdf)
  - [04_ClaudeCode工业级实战.excalidraw](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/Courseware/01_课件/04_ClaudeCode工业级实战.excalidraw)
  - [20260304-直播协作链接.excalidraw](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/Courseware/01_课件/20260304-直播协作链接.excalidraw)
- **02_课件资料/**
  - [paper.pdf](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/Courseware/02_课件资料/paper.pdf)
  - [short_paper.pdf](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/Courseware/02_课件资料/short_paper.pdf)
  - [sample_graphrag_overview.pdf](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/Courseware/02_课件资料/sample_graphrag_overview.pdf)
  - [settings.json](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/Courseware/02_课件资料/settings.json)

## 实战项目

- **[GraphRAGAgent](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/GraphRAGAgent/README.md)**：本课配套实战工作区
- 核心模块：
  - [graphrag_pipeline](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/GraphRAGAgent/graphrag_pipeline/README.md)（入口：[web_server.py](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/GraphRAGAgent/graphrag_pipeline/web_server.py)）
  - [mineru_mvp](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/GraphRAGAgent/mineru_mvp/README.md)（入口：[pipeline.py](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/GraphRAGAgent/mineru_mvp/pipeline.py)）
  - [langextract_src](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/GraphRAGAgent/langextract_src/README.md)（入口：[README.md](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/GraphRAGAgent/langextract_src/README.md)）
- 规范与设计文档：
  - [bridge_pipeline_specification-v1.0.md](/lib/07-coding/fufan-vibe-coding-course/Stage3_Claude_Code_Engineering-Lesson05_Claude_Code_Architecture-GraphRAGAgent-docs-bridge_pipeline_specification-v1.0)
  - [langextract_specification-v1.0.md](/lib/07-coding/fufan-vibe-coding-course/Stage3_Claude_Code_Engineering-Lesson05_Claude_Code_Architecture-GraphRAGAgent-docs-langextract_specification-v1.0)
  - [mineru_specification-v1.0.md](/lib/07-coding/fufan-vibe-coding-course/Stage3_Claude_Code_Engineering-Lesson05_Claude_Code_Architecture-GraphRAGAgent-docs-mineru_specification-v1.0)

## 关于 `.excalidraw` 文件

`.excalidraw` 文件是**原始可编辑课件**，你可以根据需要进行修改和定制。

**打开方式：**

1. 访问 [https://excalidraw.com/](https://excalidraw.com/)（需要梯子）
2. 点击菜单图标 (☰) → **打开** (Ctrl+O)
3. 选择本地的 `.excalidraw` 文件

## 相关

- [← 返回阶段三目录](/lib/07-coding/fufan-vibe-coding-course/Stage3_Claude_Code_Engineering-README_CN)
