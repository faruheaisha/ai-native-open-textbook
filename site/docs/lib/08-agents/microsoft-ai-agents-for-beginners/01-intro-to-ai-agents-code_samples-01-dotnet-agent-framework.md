---
title: "🌍 AI Travel Agent with Microsoft Agent Framework (.NET)"
sourceId: "08-agents/microsoft-ai-agents-for-beginners"
sourceTitle: "AI Agents for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/ai-agents-for-beginners"
entryUrl: "https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.md"
sourceRel: "01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.md"
rawUrl: "/raw/08-agents/microsoft-ai-agents-for-beginners/01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.md"
sourceSha256: "aac38508fe0b9deae75c6c84372d15826db5a53fdead829e39b4b240c7977661"
pageSha256: "aac38508fe0b9deae75c6c84372d15826db5a53fdead829e39b4b240c7977661"
contentMode: "local-full"
zh: ""
---

# 🌍 AI Travel Agent with Microsoft Agent Framework (.NET)

## 📋 Scenario Overview

This example demonstrates how to build an intelligent travel planning agent using the Microsoft Agent Framework for .NET. The agent can automatically generate personalized day-trip itineraries for random destinations around the world.

### Key Capabilities:

- 🎲 **Random Destination Selection**: Uses a custom tool to pick vacation spots
- 🗺️ **Intelligent Trip Planning**: Creates detailed day-by-day itineraries
- 🔄 **Real-time Streaming**: Supports both immediate and streaming responses
- 🛠️ **Custom Tool Integration**: Demonstrates how to extend agent capabilities

## 🔧 Technical Architecture

### Core Technologies

- **Microsoft Agent Framework**: Latest .NET implementation for AI agent development
- **Azure OpenAI (Responses API)**: Uses the Azure OpenAI Responses API for model inference
- **Azure Identity**: Secure sign-in via `AzureCliCredential` (`az login`)
- **Secure Configuration**: Environment-based endpoint management

### Key Components

1. **AIAgent**: The main agent orchestrator that handles conversation flow
2. **Custom Tools**: `GetRandomDestination()` function available to the agent
3. **Responses Client**: Azure OpenAI Responses-based conversation interface
4. **Streaming Support**: Real-time response generation capabilities

### Integration Pattern

```mermaid
graph LR
    A[User Request] --> B[AI Agent]
    B --> C[Azure OpenAI (Responses API)]
    B --> D[GetRandomDestination Tool]
    C --> E[Travel Itinerary]
    D --> E
```

## 🚀 Getting Started

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) or higher
- An [Azure subscription](https://azure.microsoft.com/free/) with an Azure OpenAI resource and a model deployment
- The [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — sign in with `az login`

### Required Environment Variables

```bash
# zsh/bash
