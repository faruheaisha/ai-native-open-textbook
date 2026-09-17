---
title: "第十三章 智能旅行助手"
sourceId: "08-agents/hello-agents"
sourceTitle: "Hello Agents（Datawhale 智能体教程）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/hello-agents"
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter13/第十三章%20智能旅行助手.md"
sourceRel: "docs/chapter13/第十三章 智能旅行助手.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter13/第十三章 智能旅行助手.md"
sourceSha256: "3a3611e5716d3372a73fd1bf8092bc2cb6038c5b6d1fb83f8f46df2b1f8b71a4"
pageSha256: "e10b6599e61b087aea76aed1a37f3d63f3b082d79c609b1ee83ee1b02ab05560"
contentMode: "local-full"
zh: ""
---

# 第十三章 智能旅行助手

在前面的章节中，我们从零开始构建了 HelloAgents 框架，实现了多种智能体范式、工具系统、记忆机制、协议通信和性能评估等核心功能。从本章开始，我们将进入一个全新的阶段：<strong>将所学知识融会贯通，构建完整的实用应用。</strong>

还记得在第一章中，我们构建的第一个智能体吗？那是一个简单的智能旅行助手，展示了`Thought-Action-Observation`循环的基本原理。本章的智能旅行助手将是一个完整的项目，包含以下核心功能：

<strong>（1）智能行程规划</strong>：用户输入目的地、日期、偏好等信息，系统自动生成包含景点、餐饮、酒店的完整行程计划。

<strong>（2）地图可视化</strong>：在地图上标注景点位置、绘制游览路线，让行程一目了然。

<strong>（3）预算计算</strong>：自动计算门票、酒店、餐饮、交通费用，显示预算明细。

<strong>（4）行程编辑</strong>：支持添加、删除、调整景点，实时更新地图。

<strong>（5）导出功能</strong>：支持导出为 PDF 或图片，方便保存和分享。

## 本篇目录

- [13.1 项目概述与架构设计](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter13/01-13.1_项目概述与架构设计.md)
- [13.2 数据模型设计](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter13/02-13.2_数据模型设计.md)
- [13.3 多智能体协作设计](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter13/03-13.3_多智能体协作设计.md)
- [13.4 MCP 工具集成详解](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter13/04-13.4_MCP_工具集成详解.md)
- [13.5 前端开发详解](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter13/05-13.5_前端开发详解.md)
- [13.6 功能实现详解](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter13/06-13.6_功能实现详解.md)
- [13.7 结语](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter13/07-13.7_结语.md)
