---
title: "🤝 Enterprise Multi-Agent Workflow Systems (.NET)"
sourceId: "08-agents/microsoft-ai-agents-for-beginners"
sourceTitle: "AI Agents for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/ai-agents-for-beginners"
entryUrl: "https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/08-multi-agent/code_samples/08-dotnet-agent-framework.md"
sourceRel: "08-multi-agent/code_samples/08-dotnet-agent-framework.md"
rawUrl: "/raw/08-agents/microsoft-ai-agents-for-beginners/08-multi-agent/code_samples/08-dotnet-agent-framework.md"
sourceSha256: "99c292723aeb6e3c0157fecbec168d4f09808295d092b19067b357c0e589aadc"
pageSha256: "99c292723aeb6e3c0157fecbec168d4f09808295d092b19067b357c0e589aadc"
contentMode: "local-full"
zh: ""
---

# 🤝 Enterprise Multi-Agent Workflow Systems (.NET)

## 📋 Learning Objectives

This notebook demonstrates how to build sophisticated enterprise-grade multi-agent systems using the Microsoft Agent Framework in .NET with Azure OpenAI (Responses API). You'll learn to orchestrate multiple specialized agents working together through structured workflows, leveraging .NET's enterprise features for production-ready solutions.

**Enterprise Multi-Agent Capabilities You'll Build:**
- 👥 **Agent Collaboration**: Type-safe agent coordination with compile-time validation
- 🔄 **Workflow Orchestration**: Declarative workflow definition with .NET's async patterns
- 🎭 **Role Specialization**: Strongly-typed agent personalities and expertise domains
- 🏢 **Enterprise Integration**: Production-ready patterns with monitoring and error handling

## ⚙️ Prerequisites & Setup

**Development Environment:**
- .NET 9.0 SDK or higher
- Visual Studio 2022 or VS Code with C# extension
- Azure subscription (for persistent agents)

**Required NuGet Packages:**
```xml
```

## Code Sample

The complete working code for this lesson is available in the accompanying C# file: [`08-dotnet-agent-framework.cs`](https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/08-multi-agent/code_samples/08-dotnet-agent-framework.cs)

To run the sample:

```bash
# Make the file executable (Linux/macOS)
chmod +x 08-dotnet-agent-framework.cs

# Run the sample
./08-dotnet-agent-framework.cs
```

Or using the .NET CLI:

```bash
dotnet run 08-dotnet-agent-framework.cs
```

## What This Sample Demonstrates

This multi-agent workflow system creates a hotel travel recommendation service with two specialized agents:

1. **FrontDesk Agent**: A travel agent that provides activity and location recommendations
2. **Concierge Agent**: Reviews recommendations to ensure authentic, non-touristy experiences

The agents work together in a workflow where:
- The FrontDesk agent receives the initial travel request
- The Concierge agent reviews and refines the recommendation
- The workflow streams responses in real-time

## Key Concepts

### Agent Coordination
The sample demonstrates type-safe agent coordination using the Microsoft Agent Framework with compile-time validation.

### Workflow Orchestration
Uses declarative workflow definition with .NET's async patterns to connect multiple agents in a pipeline.

### Streaming Responses
Implements real-time streaming of agent responses using async enumerables and event-driven architecture.

### Enterprise Integration
Shows production-ready patterns including:
- Environment variable configuration
- Secure credential management
- Error handling
- Asynchronous event processing
