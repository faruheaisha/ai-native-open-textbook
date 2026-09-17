---
title: "Lesson 05: Claude Code Architecture — Industrial-Grade Practice"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/README.md"
sourceRel: "Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/README.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/README.md"
sourceSha256: "7a112029f43b167308d0586a9cc2e1df810d40bcd70cc60689f971ccb3c6ef8d"
pageSha256: "7a112029f43b167308d0586a9cc2e1df810d40bcd70cc60689f971ccb3c6ef8d"
contentMode: "local-full"
zh: ""
---

# Lesson 05: Claude Code Architecture — Industrial-Grade Practice

English | [中文](/lib/07-coding/fufan-vibe-coding-course/Stage3_Claude_Code_Engineering-Lesson05_Claude_Code_Architecture-README_CN)

This lesson covers Claude Code architecture and engineering workflows, and now includes a GraphRAG-oriented practice project and supporting research materials.

## Topics

- Claude Code architecture overview and CLI deep dive
- Context engineering and prompt strategies
- Industrial-grade development workflows and project organization
- GraphRAG pipeline prototyping (extraction, assembly, and serving)

## Course Materials

- **01_课件/**
  - [04_ClaudeCode工业级实战.pdf](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/Courseware/01_课件/04_ClaudeCode工业级实战.pdf)
  - [04_ClaudeCode工业级实战.excalidraw](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/Courseware/01_课件/04_ClaudeCode工业级实战.excalidraw)
  - [20260304-直播协作链接.excalidraw](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/Courseware/01_课件/20260304-直播协作链接.excalidraw)
- **02_课件资料/**
  - [paper.pdf](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/Courseware/02_课件资料/paper.pdf)
  - [short_paper.pdf](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/Courseware/02_课件资料/short_paper.pdf)
  - [sample_graphrag_overview.pdf](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/Courseware/02_课件资料/sample_graphrag_overview.pdf)
  - [settings.json](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/Courseware/02_课件资料/settings.json)

## Project Assets

- **[GraphRAGAgent](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/GraphRAGAgent/README.md)**: lesson practice workspace
- Key modules:
  - [graphrag_pipeline](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/GraphRAGAgent/graphrag_pipeline/README.md) (entry: [web_server.py](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/GraphRAGAgent/graphrag_pipeline/web_server.py))
  - [mineru_mvp](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/GraphRAGAgent/mineru_mvp/README.md) (entry: [pipeline.py](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/GraphRAGAgent/mineru_mvp/pipeline.py))
  - [langextract_src](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/GraphRAGAgent/langextract_src/README.md) (entry: [README.md](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/Lesson05_Claude_Code_Architecture/GraphRAGAgent/langextract_src/README.md))
- Specs and design docs:
  - [bridge_pipeline_specification-v1.0.md](/lib/07-coding/fufan-vibe-coding-course/Stage3_Claude_Code_Engineering-Lesson05_Claude_Code_Architecture-GraphRAGAgent-docs-bridge_pipeline_specification-v1.0)
  - [langextract_specification-v1.0.md](/lib/07-coding/fufan-vibe-coding-course/Stage3_Claude_Code_Engineering-Lesson05_Claude_Code_Architecture-GraphRAGAgent-docs-langextract_specification-v1.0)
  - [mineru_specification-v1.0.md](/lib/07-coding/fufan-vibe-coding-course/Stage3_Claude_Code_Engineering-Lesson05_Claude_Code_Architecture-GraphRAGAgent-docs-mineru_specification-v1.0)

## About `.excalidraw` Files

The `.excalidraw` files are the **original editable courseware**. You can modify and customize them as needed.

**How to Open:**

1. Visit [https://excalidraw.com/](https://excalidraw.com/) (VPN required)
2. Click the menu icon (☰) → **Open** (Ctrl+O)
3. Select the `.excalidraw` file from your local drive

## Related

- [← Back to Stage 3](/lib/07-coding/fufan-vibe-coding-course/Stage3_Claude_Code_Engineering)
