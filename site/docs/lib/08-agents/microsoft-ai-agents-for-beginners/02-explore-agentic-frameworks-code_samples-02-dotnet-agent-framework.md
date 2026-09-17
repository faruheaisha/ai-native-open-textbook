---
title: "🔍 Exploring Microsoft Agent Framework - Basic Agent (.NET)"
sourceId: "08-agents/microsoft-ai-agents-for-beginners"
sourceTitle: "AI Agents for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/ai-agents-for-beginners"
entryUrl: "https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.md"
sourceRel: "02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.md"
rawUrl: "/raw/08-agents/microsoft-ai-agents-for-beginners/02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.md"
sourceSha256: "352cba17e8322e255e180878b52806338ec8319a9b6cd236e729095262dc731c"
pageSha256: "352cba17e8322e255e180878b52806338ec8319a9b6cd236e729095262dc731c"
contentMode: "local-full"
zh: ""
---

# 🔍 Exploring Microsoft Agent Framework - Basic Agent (.NET)

## 📋 Learning Objectives

This example explores the fundamental concepts of the Microsoft Agent Framework through a basic agent implementation in .NET. You'll learn core agentic patterns and understand how intelligent agents work under the hood using C# and the .NET ecosystem.

### What You'll Discover

- 🏗️ **Agent Architecture**: Understanding the basic structure of AI agents in .NET
- 🛠️ **Tool Integration**: How agents use external functions to extend capabilities  
- 💬 **Conversation Flow**: Managing multi-turn conversations and context with thread management
- 🔧 **Configuration Patterns**: Best practices for agent setup and management in .NET

## 🎯 Key Concepts Covered

### Agentic Framework Principles

- **Autonomy**: How agents make independent decisions using .NET AI abstractions
- **Reactivity**: Responding to environmental changes and user inputs
- **Proactivity**: Taking initiative based on goals and context
- **Social Ability**: Interacting through natural language with conversation threads

### Technical Components

- **AIAgent**: Core agent orchestration and conversation management (.NET)
- **Tool Functions**: Extending agent capabilities with C# methods and attributes
- **Azure OpenAI Integration**: Leveraging language models through the Azure OpenAI Responses API
- **Secure Configuration**: Environment-based endpoint management

## 🔧 Technical Stack

### Core Technologies

- Microsoft Agent Framework (.NET)
- Azure OpenAI (Responses API) integration
- Azure.AI.OpenAI client patterns
- Environment-based configuration with DotNetEnv

### Agent Capabilities

- Natural language understanding and generation
- Function calling and tool usage with C# attributes
- Context-aware responses with conversation sessions
- Extensible architecture with dependency injection patterns

## 📚 Framework Comparison

This example demonstrates the Microsoft Agent Framework approach compared to other agentic frameworks:

| Feature | Microsoft Agent Framework | Other Frameworks |
|---------|-------------------------|------------------|
| **Integration** | Native Microsoft ecosystem | Varied compatibility |
| **Simplicity** | Clean, intuitive API | Often complex setup |
| **Extensibility** | Easy tool integration | Framework-dependent |
| **Enterprise Ready** | Built for production | Varies by framework |

## 🚀 Getting Started

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) or higher
- An [Azure subscription](https://azure.microsoft.com/free/) with an Azure OpenAI resource and a model deployment
- The [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — sign in with `az login`

### Required Environment Variables

```bash
# zsh/bash
