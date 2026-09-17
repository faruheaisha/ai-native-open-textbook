---
title: "⚡ 使用 Azure OpenAI (Responses API) 的并发代理工作流 (.NET)"
sourceId: "08-agents/microsoft-ai-agents-for-beginners"
sourceTitle: "AI Agents for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/ai-agents-for-beginners"
entryUrl: "https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/translations/zh-CN/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md"
sourceRel: "translations/zh-CN/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md"
rawUrl: "/raw/08-agents/microsoft-ai-agents-for-beginners/translations/zh-CN/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md"
sourceSha256: "0ca4fc286fb23af9a7530eabd034d8f12cb9bb1472bbb33ac8cae375c1151cd4"
pageSha256: "0ca4fc286fb23af9a7530eabd034d8f12cb9bb1472bbb33ac8cae375c1151cd4"
contentMode: "local-full"
zh: ""
---

# ⚡ 使用 Azure OpenAI (Responses API) 的并发代理工作流 (.NET)

## 📋 高性能并行处理教程

本笔记本展示了使用 .NET 的 Microsoft Agent Framework 和 Azure OpenAI (Responses API) 的<strong>并发工作流模式</strong>。您将学习如何构建高性能的并行处理工作流，通过同时执行多个 AI 代理来最大化吞吐量，同时保持协调和数据一致性。

## 🎯 学习目标

### 🚀 <strong>并发处理基础</strong>
- <strong>并行代理执行</strong>：同时运行多个 AI 代理以实现最大性能
- **Async/Await 模式**：利用 .NET 的异步编程模型实现高效并发
- **Azure OpenAI (Responses API)**：协调对 Azure OpenAI Responses API 的多次并发调用
- <strong>资源管理</strong>：高效管理并发操作中的 AI 模型资源

### 🏗️ <strong>高级并发架构</strong>
- <strong>基于任务的并行处理</strong>：使用 .NET 任务并行库实现最优并发执行
- <strong>同步模式</strong>：协调并发代理，避免竞态条件
- <strong>负载均衡</strong>：有效分配工作以利用可用并发处理能力
- <strong>容错能力</strong>：处理单个代理失败而不影响整个工作流

### 🏢 <strong>企业级并发应用</strong>
- <strong>高容量文档处理</strong>：同时处理多个文档
- <strong>实时内容分析</strong>：并发分析传入的数据流
- <strong>批量处理优化</strong>：最大化大规模数据处理操作的吞吐量
- <strong>多模态分析</strong>：并行处理不同内容类型和格式

## ⚙️ 先决条件与设置

### 📦 **必需的 NuGet 包**

高性能并发工作流所需的核心包：

```xml

```

### 🔑 **Azure OpenAI 配置**

**环境配置 (.env 文件)：**
```env
