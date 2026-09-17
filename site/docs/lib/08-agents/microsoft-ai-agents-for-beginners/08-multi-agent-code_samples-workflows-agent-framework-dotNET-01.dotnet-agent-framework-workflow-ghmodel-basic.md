---
title: "🔄 Basic Agent Workflows with Azure OpenAI (Responses API) (.NET)"
sourceId: "08-agents/microsoft-ai-agents-for-beginners"
sourceTitle: "AI Agents for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/ai-agents-for-beginners"
entryUrl: "https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/08-multi-agent/code_samples/workflows-agent-framework/dotNET/01.dotnet-agent-framework-workflow-ghmodel-basic.md"
sourceRel: "08-multi-agent/code_samples/workflows-agent-framework/dotNET/01.dotnet-agent-framework-workflow-ghmodel-basic.md"
rawUrl: "/raw/08-agents/microsoft-ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/01.dotnet-agent-framework-workflow-ghmodel-basic.md"
sourceSha256: "bb3e811df172b01b080da7c476fa8aa8a0c0585e333438631331d4b8d985576b"
pageSha256: "bb3e811df172b01b080da7c476fa8aa8a0c0585e333438631331d4b8d985576b"
contentMode: "local-full"
zh: ""
---

# 🔄 Basic Agent Workflows with Azure OpenAI (Responses API) (.NET)

## 📋 Workflow Orchestration Tutorial

This notebook demonstrates how to build sophisticated **agent workflows** using the Microsoft Agent Framework for .NET and Azure OpenAI (Responses API). You'll learn to create multi-step business processes where AI agents collaborate to accomplish complex tasks through structured orchestration patterns.

## 🎯 Learning Objectives

### 🏗️ **Workflow Architecture Fundamentals**
- **Workflow Builder**: Design and orchestrate complex multi-step AI processes
- **Agent Coordination**: Coordinate multiple specialized agents within workflows
- **Azure OpenAI (Responses API)**: Leverage the Azure OpenAI Responses API in workflows
- **Visual Workflow Design**: Create and visualize workflow structures for better understanding

### 🔄 **Process Orchestration Patterns**
- **Sequential Processing**: Chain multiple agent tasks in logical order
- **State Management**: Maintain context and data flow across workflow stages
- **Error Handling**: Implement robust error recovery and workflow resilience
- **Performance Optimization**: Design efficient workflows for enterprise-scale operations

### 🏢 **Enterprise Workflow Applications**
- **Business Process Automation**: Automate complex organizational workflows
- **Content Production Pipeline**: Editorial workflows with review and approval stages
- **Customer Service Automation**: Multi-step customer inquiry resolution
- **Data Processing Workflows**: ETL workflows with AI-powered transformation

## ⚙️ Prerequisites & Setup

### 📦 **Required NuGet Packages**

This workflow demonstration uses several key .NET packages:

```xml

```

### 🔑 **Azure OpenAI Configuration**

**Environment Setup (.env file):**
```env
