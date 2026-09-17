---
title: "⏩ Sequential Agent Workflows with Azure OpenAI (Responses API) (.NET)"
sourceId: "08-agents/microsoft-ai-agents-for-beginners"
sourceTitle: "AI Agents for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/ai-agents-for-beginners"
entryUrl: "https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md"
sourceRel: "08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md"
rawUrl: "/raw/08-agents/microsoft-ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md"
sourceSha256: "6954d62d42f26b0a74b52ed45329d45d7adf2bf19e8e8f3bc015cad4fbcd515f"
pageSha256: "6954d62d42f26b0a74b52ed45329d45d7adf2bf19e8e8f3bc015cad4fbcd515f"
contentMode: "local-full"
zh: ""
---

# ⏩ Sequential Agent Workflows with Azure OpenAI (Responses API) (.NET)

## 📋 Advanced Sequential Processing Tutorial

This notebook demonstrates **sequential workflow patterns** using the Microsoft Agent Framework for .NET and Azure OpenAI (Responses API). You'll learn how to build sophisticated, step-by-step processing pipelines where agents execute in a specific order, with each stage building upon the results of the previous stage.

## 🎯 Learning Objectives

### 🔄 **Sequential Processing Architecture**
- **Linear Workflow Design**: Create step-by-step processing pipelines with clear dependencies
- **State Management**: Maintain context and data flow across sequential workflow stages
- **Azure OpenAI (Responses API)**: Leverage Azure OpenAI models in multi-stage .NET workflows
- **Enterprise Pipeline Patterns**: Build production-ready sequential processing systems

### 🏗️ **Advanced Sequential Patterns**
- **Stage-Gate Processing**: Implement validation checkpoints between workflow stages
- **Context Preservation**: Maintain state and accumulated knowledge across all stages
- **Error Propagation**: Handle failures gracefully in sequential processing chains
- **Performance Optimization**: Efficient sequential execution with minimal overhead

### 🏢 **Enterprise Sequential Applications**
- **Document Processing Pipeline**: Multi-stage document analysis, transformation, and validation
- **Quality Assurance Workflows**: Sequential review, validation, and approval processes
- **Content Production Pipeline**: Research → Writing → Editing → Review → Publishing
- **Business Process Automation**: Multi-step business workflows with clear stage dependencies

## ⚙️ Prerequisites & Setup

### 📦 **Required NuGet Packages**

Essential packages for .NET sequential workflows:

```xml

```

### 🔑 **Azure OpenAI Configuration**

**Environment Setup (.env file):**
```env
