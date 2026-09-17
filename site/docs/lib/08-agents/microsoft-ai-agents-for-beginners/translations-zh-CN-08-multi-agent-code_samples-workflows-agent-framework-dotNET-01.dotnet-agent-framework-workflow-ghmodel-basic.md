---
title: "🔄 使用 Azure OpenAI（Responses API）的基础代理工作流（.NET）"
sourceId: "08-agents/microsoft-ai-agents-for-beginners"
sourceTitle: "AI Agents for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/ai-agents-for-beginners"
entryUrl: "https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/translations/zh-CN/08-multi-agent/code_samples/workflows-agent-framework/dotNET/01.dotnet-agent-framework-workflow-ghmodel-basic.md"
sourceRel: "translations/zh-CN/08-multi-agent/code_samples/workflows-agent-framework/dotNET/01.dotnet-agent-framework-workflow-ghmodel-basic.md"
rawUrl: "/raw/08-agents/microsoft-ai-agents-for-beginners/translations/zh-CN/08-multi-agent/code_samples/workflows-agent-framework/dotNET/01.dotnet-agent-framework-workflow-ghmodel-basic.md"
sourceSha256: "619452dd93b1e80e0b8c74133057e14f1952266f4b76bd9ddc125c6e2b72d331"
pageSha256: "619452dd93b1e80e0b8c74133057e14f1952266f4b76bd9ddc125c6e2b72d331"
contentMode: "local-full"
zh: ""
---

# 🔄 使用 Azure OpenAI（Responses API）的基础代理工作流（.NET）

## 📋 工作流编排教程

本笔记本演示如何使用 Microsoft Agent Framework for .NET 和 Azure OpenAI（Responses API）构建复杂的<strong>代理工作流</strong>。您将学习创建多步骤业务流程，其中 AI 代理通过结构化的编排模式协作完成复杂任务。

## 🎯 学习目标

### 🏗️ <strong>工作流架构基础</strong>
- <strong>工作流构建器</strong>：设计和编排复杂的多步骤 AI 过程
- <strong>代理协调</strong>：在工作流中协调多个专门化代理
- **Azure OpenAI（Responses API）**：在工作流中利用 Azure OpenAI Responses API
- <strong>可视化工作流设计</strong>：创建和可视化工作流结构以便更好理解

### 🔄 <strong>流程编排模式</strong>
- <strong>顺序处理</strong>：按逻辑顺序串联多个代理任务
- <strong>状态管理</strong>：维护跨工作流阶段的上下文和数据流
- <strong>错误处理</strong>：实现强健的错误恢复和工作流弹性
- <strong>性能优化</strong>：设计高效的企业级工作流

### 🏢 <strong>企业工作流应用</strong>
- <strong>业务流程自动化</strong>：自动化复杂的组织工作流
- <strong>内容生产管线</strong>：包含审核和审批阶段的编辑工作流
- <strong>客户服务自动化</strong>：多步骤的客户咨询解决流程
- <strong>数据处理工作流</strong>：带 AI 驱动转换的 ETL 工作流

## ⚙️ 先决条件与设置

### 📦 **所需 NuGet 包**

此工作流演示使用了几个关键的 .NET 包：

```xml

```

### 🔑 **Azure OpenAI 配置**

**环境设置（.env 文件）：**
```env
