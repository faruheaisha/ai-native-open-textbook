---
title: "🔍 探索 Microsoft Agent Framework - 基础代理 (.NET)"
sourceId: "08-agents/microsoft-ai-agents-for-beginners"
sourceTitle: "AI Agents for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/ai-agents-for-beginners"
entryUrl: "https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/translations/zh-CN/README.md"
zh: ""
---

# 🔍 探索 Microsoft Agent Framework - 基础代理 (.NET)

## 📋 学习目标

本示例通过在 .NET 中实现基础代理，探索 Microsoft Agent Framework 的基本概念。您将学习核心代理模式，并通过 C# 和 .NET 生态系统了解智能代理的运行原理。

### 您将发现

- 🏗️ <strong>代理架构</strong>：理解 .NET 中人工智能代理的基本结构
- 🛠️ <strong>工具集成</strong>：代理如何使用外部函数扩展功能  
- 💬 <strong>对话流程</strong>：通过线程管理管理多轮对话与上下文
- 🔧 <strong>配置模式</strong>：.NET 中代理设置和管理的最佳实践

## 🎯 涉及的关键概念

### 代理框架原则

- <strong>自治性</strong>：代理如何使用 .NET AI 抽象独立决策
- <strong>响应性</strong>：响应环境变化和用户输入
- <strong>主动性</strong>：基于目标和上下文主动采取行动
- <strong>社交能力</strong>：通过自然语言和对话线程进行交互

### 技术组件

- **AIAgent**：核心代理协调和对话管理 (.NET)
- <strong>工具函数</strong>：通过 C# 方法和特性扩展代理功能
- **Azure OpenAI 集成**：利用 Azure OpenAI Responses API 调用语言模型
- <strong>安全配置</strong>：基于环境的端点管理

## 🔧 技术栈

### 核心技术

- Microsoft Agent Framework (.NET)
- Azure OpenAI（Responses API）集成
- Azure.AI.OpenAI 客户端模式
- 使用 DotNetEnv 进行基于环境的配置

### 代理能力

- 自然语言理解与生成
- 使用 C# 特性进行函数调用和工具使用
- 具备上下文感知的对话会话响应
- 通过依赖注入模式实现可扩展架构

## 📚 框架比较

本示例演示 Microsoft Agent Framework 方法与其他代理框架的对比：

| 特性 | Microsoft Agent Framework | 其他框架 |
|---------|-------------------------|------------------|
| <strong>集成</strong> | 原生微软生态系统 | 兼容性多样 |
| <strong>简洁性</strong> | 清晰直观的 API | 通常设置复杂 |
| <strong>可扩展性</strong> | 轻松集成工具 | 依赖于框架 |
| <strong>企业级</strong> | 面向生产环境构建 | 取决于框架 |

## 🚀 入门

### 前置条件

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) 或更高版本
- 拥有 Azure OpenAI 资源和模型部署的 [Azure 订阅](https://azure.microsoft.com/free/)
- 安装 [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) 并使用 `az login` 登录

### 所需环境变量

```bash
# zsh/bash
