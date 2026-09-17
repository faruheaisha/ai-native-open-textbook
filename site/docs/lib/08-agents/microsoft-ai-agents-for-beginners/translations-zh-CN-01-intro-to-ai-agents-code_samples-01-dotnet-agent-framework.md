---
title: "🌍 使用 Microsoft Agent Framework (.NET) 的 AI 旅游代理"
sourceId: "08-agents/microsoft-ai-agents-for-beginners"
sourceTitle: "AI Agents for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/ai-agents-for-beginners"
entryUrl: "https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/translations/zh-CN/01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.md"
sourceRel: "translations/zh-CN/01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.md"
rawUrl: "/raw/08-agents/microsoft-ai-agents-for-beginners/translations/zh-CN/01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.md"
sourceSha256: "0aebe579710a9445f95ac1bb4822bce0685e1827d6fa09339eedbaf7f3b3fd2d"
pageSha256: "0aebe579710a9445f95ac1bb4822bce0685e1827d6fa09339eedbaf7f3b3fd2d"
contentMode: "local-full"
zh: ""
---

# 🌍 使用 Microsoft Agent Framework (.NET) 的 AI 旅游代理

## 📋 场景概述

本示例演示如何使用适用于 .NET 的 Microsoft Agent Framework 构建智能旅行规划代理。该代理可以自动生成面向全球随机目的地的个性化一日游行程。

### 主要功能：

- 🎲 <strong>随机目的地选择</strong>：使用自定义工具选择度假地点
- 🗺️ <strong>智能旅行规划</strong>：创建详细的每日行程安排
- 🔄 <strong>实时流式传输</strong>：支持即时和流式响应
- 🛠️ <strong>自定义工具集成</strong>：演示如何扩展代理功能

## 🔧 技术架构

### 核心技术

- **Microsoft Agent Framework**：用于 AI 代理开发的最新 .NET 实现
- **Azure OpenAI（响应 API）**：使用 Azure OpenAI 响应 API 执行模型推理
- **Azure 身份验证**：通过 `AzureCliCredential`（`az login`）实现安全登录
- <strong>安全配置</strong>：基于环境的端点管理

### 关键组件

1. **AIAgent**：管理对话流程的主要代理协调器
2. <strong>自定义工具</strong>：代理可调用的 `GetRandomDestination()` 函数
3. <strong>响应客户端</strong>：基于 Azure OpenAI 响应的对话接口
4. <strong>流式支持</strong>：实时响应生成能力

### 集成模式

```mermaid
graph LR
    A[用户请求] --> B[人工智能代理]
    B --> C[Azure OpenAI（响应 API）]
    B --> D[获取随机目的地工具]
    C --> E[旅行行程]
    D --> E
```

## 🚀 快速开始

### 前置条件

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) 或更高版本
- 拥有 Azure OpenAI 资源和模型部署的 [Azure 订阅](https://azure.microsoft.com/free/)
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — 使用 `az login` 登录

### 必需的环境变量

```bash
# zsh/bash
