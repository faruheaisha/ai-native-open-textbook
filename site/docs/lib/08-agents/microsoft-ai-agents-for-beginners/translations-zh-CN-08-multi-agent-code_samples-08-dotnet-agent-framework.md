---
title: "🤝 企业多智能体工作流系统（.NET）"
sourceId: "08-agents/microsoft-ai-agents-for-beginners"
sourceTitle: "AI Agents for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/ai-agents-for-beginners"
entryUrl: "https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/translations/zh-CN/08-multi-agent/code_samples/08-dotnet-agent-framework.md"
sourceRel: "translations/zh-CN/08-multi-agent/code_samples/08-dotnet-agent-framework.md"
rawUrl: "/raw/08-agents/microsoft-ai-agents-for-beginners/translations/zh-CN/08-multi-agent/code_samples/08-dotnet-agent-framework.md"
sourceSha256: "4af38669d913089a6c6d7b25cb90c90c145c60bd11d9e0b114d024ee6a7965fa"
pageSha256: "4af38669d913089a6c6d7b25cb90c90c145c60bd11d9e0b114d024ee6a7965fa"
contentMode: "local-full"
zh: ""
---

# 🤝 企业多智能体工作流系统（.NET）

## 📋 学习目标

本笔记本展示了如何使用.NET中的Microsoft Agent框架和Azure OpenAI（Responses API）构建复杂的企业级多智能体系统。您将学习如何通过结构化工作流协调多个专业化智能体协同工作，利用.NET的企业功能实现生产就绪的解决方案。

**您将构建的企业多智能体能力：**
- 👥 <strong>智能体协作</strong>：使用编译时验证的类型安全智能体协调
- 🔄 <strong>工作流编排</strong>：使用.NET异步模式的声明式工作流定义
- 🎭 <strong>角色专业化</strong>：强类型智能体角色和专业领域
- 🏢 <strong>企业集成</strong>：具备监控和错误处理的生产就绪模式

## ⚙️ 前提条件与设置

**开发环境：**
- .NET 9.0 SDK 或更高版本
- Visual Studio 2022 或带有 C# 扩展的 VS Code
- Azure 订阅（用于持久化智能体）

**必需的 NuGet 包：**
```xml
```

## 代码示例

本课的完整工作代码可在附带的 C# 文件中获取：[ `08-dotnet-agent-framework.cs`](https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/08-multi-agent/code_samples/08-dotnet-agent-framework.cs)

运行示例：

```bash
# 使文件可执行（Linux/macOS）
chmod +x 08-dotnet-agent-framework.cs

# 运行示例
./08-dotnet-agent-framework.cs
```

或使用 .NET CLI：

```bash
dotnet run 08-dotnet-agent-framework.cs
```

## 本示例演示内容

该多智能体工作流系统创建了一个酒店旅行推荐服务，包含两个专业智能体：

1. **FrontDesk Agent**：提供活动和地点推荐的旅行智能体
2. **Concierge Agent**：审核推荐以确保真实、非旅游化的体验

智能体共同在一个工作流中协作：
- FrontDesk智能体接收初始旅行请求
- Concierge智能体审核并优化推荐
- 工作流实时流式传输响应

## 关键概念

### 智能体协调
本示例展示了使用Microsoft Agent框架进行类型安全的智能体协调，具备编译时验证。

### 工作流编排
使用.NET异步模式的声明式工作流定义，将多个智能体连接成管道。

### 流式响应
实现使用异步可枚举和事件驱动架构的智能体响应实时流式传输。

### 企业集成
展示生产就绪模式，包括：
- 环境变量配置
- 安全凭据管理
- 错误处理
- 异步事件处理
