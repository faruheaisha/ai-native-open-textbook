---
title: "第十四章 自动化深度研究智能体"
sourceId: "08-agents/hello-agents"
sourceTitle: "Hello Agents（Datawhale 智能体教程）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/hello-agents"
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter14/第十四章%20自动化深度研究智能体.md"
sourceRel: "docs/chapter14/第十四章 自动化深度研究智能体.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter14/第十四章 自动化深度研究智能体.md"
sourceSha256: "5912f30490d930e5e434a4c69784f218ed9b19bd9b4e41743efb981cb25f6704"
pageSha256: "b22ee859d5e383d6a42cef3fe48df4e312a8e94de539bb3b61dd2285371d461b"
contentMode: "local-full"
zh: ""
---

# 第十四章 自动化深度研究智能体

在第十三章的旅行助手项目中，我们体验了如何将 HelloAgents 应用于一个多智能体产品。本章我们继续向前，聚焦「知识密集型应用」：<strong>构建一个能够自动化执行深度研究任务的智能体助手。</strong>

相比旅行规划，深度研究的难点在于信息的不断发散、事实的快速更新以及用户对引用来源的高要求。为了交付可信的研究报告，我们需要让智能体具备三个核心能力：

<strong>（1）问题剖析</strong>：将用户的开放主题拆解为可检索的查询语句。

<strong>（2）多轮信息采集</strong>：结合不同搜索 API 持续挖掘资料，并去重整合。

<strong>（3）反思与总结</strong>：依据阶段结果识别知识空白，决定是否继续检索，并生成结构化总结。

## 本篇目录

- [14.1 项目概述与架构设计](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter14/01-14.1_项目概述与架构设计.md)
- [14.2 TODO 驱动的研究范式](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter14/02-14.2_TODO_驱动的研究范式.md)
- [14.3 智能体系统设计](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter14/03-14.3_智能体系统设计.md)
- [14.4 工具系统集成](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter14/04-14.4_工具系统集成.md)
- [14.5 服务层实现](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter14/05-14.5_服务层实现.md)
- [14.6 前端交互设计](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter14/06-14.6_前端交互设计.md)
- [14.7 本章小结](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter14/07-14.7_本章小结.md)
