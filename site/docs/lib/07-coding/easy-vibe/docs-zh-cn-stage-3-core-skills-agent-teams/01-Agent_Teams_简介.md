---
title: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/stage-3/core-skills/agent-teams/index.md"
sourceRel: "docs/zh-cn/stage-3/core-skills/agent-teams/index.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/zh-cn/stage-3/core-skills/agent-teams/index.md"
sourceSha256: "16b04e2e2af06d66f37900dfc58ad2842159173876171d4d6c99ca4660423bef"
pageSha256: "a8ed89d75cdb819ef1a7287de366bc8d5844533deaae2bcae3b05b652ea7e8c2"
contentMode: "local-full"
zh: ""
---

## Agent Teams 简介

**Agent Teams** 是 Claude Code 的一个革命性功能，它让**多个独立的 AI 实例可以像真正的开发团队一样协同工作**。

想象一下，以前你使用 Claude Code，就像是一个项目经理带着一个超级能干的助手工作。无论任务多复杂，只有这一个助手在干活。现在有了 Agent Teams，你可以组建一支完整的 AI 开发团队——有的负责前端，有的负责后端，有的负责测试，它们可以**同时工作、互相交流、协同完成复杂任务**。

![](/mirror/2d/2d4dd83c9d5c3b5d2c77775af5fe7d8df2986063.svg)

### 从单助手到团队协作

在深入了解 Agent Teams 之前，让我们先理解它解决的问题。

**单 AI 模式的局限性**：

当你用单个 Claude 实例处理复杂项目时，会遇到这些瓶颈：

- **串行处理瓶颈**：AI 只能一次做一件事。比如要重构一个项目，它需要先分析认证模块，再分析数据库模块，最后分析 API 模块。这些步骤必须串行进行，即使它们之间没有依赖关系。

- **上下文拥挤问题**：所有信息都在一个对话窗口里。当对话变长，早期的关键细节容易被淹没，AI 可能忘记之前讨论的重要决策。

- **单一视角局限**：只有一个 AI 在思考，缺乏多角度的讨论和验证。当遇到复杂的设计决策时，没有"同事"可以辩论或提供不同观点。

- **效率天花板**：大型重构或多模块开发需要很长时间，无法通过并行加速来提升效率。

**Agent Teams 的解决方案**：

Agent Teams 通过**多实例并行协作**解决了这些问题：

- **真正的并行工作**：多个 AI 可以同时处理不同的任务。一个负责前端 UI，一个负责后端 API，一个负责数据库设计，三者互不干扰。

- **独立的上下文空间**：每个团队成员都有自己完整的 200K token 上下文窗口，不会因为对话过长而"忘记"重要信息。

- **团队协作能力**：成员之间可以直接通信，讨论设计决策，互相验证代码质量，就像真正的开发团队一样。

- **效率大幅提升**：根据 Anthropic 内部测试，大型项目重构的效率可以提升约 50%。
