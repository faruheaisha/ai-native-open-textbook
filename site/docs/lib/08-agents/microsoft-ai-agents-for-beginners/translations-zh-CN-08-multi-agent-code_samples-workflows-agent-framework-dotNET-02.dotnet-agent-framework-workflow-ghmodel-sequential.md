---
title: "⏩ 使用 Azure OpenAI （Responses API）进行顺序代理工作流（.NET）"
sourceId: "08-agents/microsoft-ai-agents-for-beginners"
sourceTitle: "AI Agents for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/ai-agents-for-beginners"
entryUrl: "https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/translations/zh-CN/08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md"
sourceRel: "translations/zh-CN/08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md"
rawUrl: "/raw/08-agents/microsoft-ai-agents-for-beginners/translations/zh-CN/08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md"
sourceSha256: "10ff486394a642301808d15014146ccdaf869a7ee1a3bb5372fc2e42b1a86d53"
pageSha256: "10ff486394a642301808d15014146ccdaf869a7ee1a3bb5372fc2e42b1a86d53"
contentMode: "local-full"
zh: ""
---

# ⏩ 使用 Azure OpenAI （Responses API）进行顺序代理工作流（.NET）

## 📋 高级顺序处理教程

本笔记本演示了如何使用 .NET 的 Microsoft Agent Framework 和 Azure OpenAI（Responses API）实现<strong>顺序工作流模式</strong>。您将学习如何构建复杂的逐步处理流水线，代理按特定顺序执行，每个阶段基于前一阶段的结果展开。

## 🎯 学习目标

### 🔄 <strong>顺序处理架构</strong>
- <strong>线性工作流设计</strong>：创建具有清晰依赖关系的逐步处理流水线
- <strong>状态管理</strong>：维护跨顺序工作流阶段的上下文和数据流
- **Azure OpenAI（Responses API）**：在多阶段 .NET 工作流中利用 Azure OpenAI 模型
- <strong>企业流水线模式</strong>：构建可用于生产的顺序处理系统

### 🏗️ <strong>高级顺序模式</strong>
- <strong>阶段门控处理</strong>：在工作流阶段间实现验证检查点
- <strong>上下文保留</strong>：维护所有阶段的状态和累积知识
- <strong>错误传播</strong>：优雅地处理顺序处理链中的失败
- <strong>性能优化</strong>：高效的顺序执行，开销最小化

### 🏢 <strong>企业顺序应用</strong>
- <strong>文档处理流水线</strong>：多阶段文档分析、转换和验证
- <strong>质量保证工作流</strong>：顺序审核、验证和审批流程
- <strong>内容生产流水线</strong>：调研 → 写作 → 编辑 → 审核 → 发布
- <strong>业务流程自动化</strong>：具有明确阶段依赖关系的多步骤业务工作流

## ⚙️ 前置条件与设置

### 📦 **必备 NuGet 包**

.NET 顺序工作流所需的核心包：

```xml

```

### 🔑 **Azure OpenAI 配置**

**环境设置（.env 文件）：**
```env
