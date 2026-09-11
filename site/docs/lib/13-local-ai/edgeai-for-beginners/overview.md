---
title: "EdgeAI for Beginners"
sourceId: "13-local-ai/edgeai-for-beginners"
sourceTitle: "EdgeAI for Beginners"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "13-local-ai"
sourceUrl: "https://github.com/microsoft/edgeai-for-beginners"
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/README.md"
zh: ""
---

# EdgeAI for Beginners 

![Course cover image](https://raw.githubusercontent.com/microsoft/edgeai-for-beginners/e88f123a4bb5796594919db3a13257c429d1288c/imgs/cover.png)

## Introduction

Welcome to **EdgeAI for Beginners** – your comprehensive journey into the transformative world of Edge Artificial Intelligence. This course bridges the gap between powerful AI capabilities and practical, real-world deployment on edge devices, empowering you to harness AI's potential directly where data is generated and decisions need to be made.

### What You'll Master

This course takes you from fundamental concepts to production-ready implementations, covering:
- **Small Language Models (SLMs)** optimized for edge deployment
- **Hardware-aware optimization** across diverse platforms
- **Real-time inference** with privacy-preserving capabilities
- **Production deployment** strategies for enterprise applications

### Why EdgeAI Matters

Edge AI represents a paradigm shift that addresses critical modern challenges:
- **Privacy & Security**: Process sensitive data locally without cloud exposure
- **Real-time Performance**: Eliminate network latency for time-critical applications
- **Cost Efficiency**: Reduce bandwidth and cloud computing expenses
- **Resilient Operations**: Maintain functionality during network outages
- **Regulatory Compliance**: Meet data sovereignty requirements

### Edge AI

Edge AI refers to running AI algorithms and language models locally on hardware, close to where data is generated without relying on cloud resources for inference. It reduces latency, enhances privacy, and enables real-time decision-making.

### Core Principles:
- **On-device inference**: AI models run on edge devices (phones, routers, microcontrollers, industrial PCs)
- **Offline capability**: Functions without persistent internet connectivity
- **Low latency**: Immediate responses suited for real-time systems
- **Data sovereignty**: Keeps sensitive data local, improving security and compliance

### Small Language Models (SLMs)

SLMs like Phi-4, Mistral-7B, and Gemma are optimized versions of larger LLMs—trained or distilled for:
- **Reduced memory footprint**: Efficient use of limited edge device memory
- **Lower compute demand**: Optimized for CPU and edge GPU performance
- **Faster startup times**: Quick initialization for responsive applications

They unlock powerful NLP capabilities while meeting the constraints of:
- **Embedded systems**: IoT devices and industrial controllers
- **Mobile devices**: Smartphones and tablets with offline capabilities
- **IoT Devices**: Sensors and smart devices with limited resources
- **Edge servers**: Local processing units with limited GPU resources
- **Personal Computers**: Desktop and laptop deployment scenarios

## Course Modules & Navigation

| Module | Topic | Focus Area | Key Content | Level | Duration |
|--------|-------|------------|-------------|--------|----------|
| [📖 00 ](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/introduction.md) | [Introduction to EdgeAI](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/introduction.md) | Foundation & Context | EdgeAI Overview • Industry Applications • SLM Introduction • Learning Objectives | Beginner | 1-2 hrs |
| [📚 01](/lib/13-local-ai/edgeai-for-beginners/Module01) | [EdgeAI Fundamentals](/lib/13-local-ai/edgeai-for-beginners/Module01) | Cloud vs Edge AI comparison | EdgeAI Fundamentals • Real World Case Studies • Implementation Guide • Edge Deployment | Beginner | 3-4 hrs |
| [🧠 02](/lib/13-local-ai/edgeai-for-beginners/Module02) | [SLM Model Foundations](/lib/13-local-ai/edgeai-for-beginners/Module02) | Model families & architecture | Phi Family • Qwen Family • Gemma Family • BitNET • μModel • Phi-Silica | Beginner | 4-5 hrs |
| [🚀 03](/lib/13-local-ai/edgeai-for-beginners/Module03) | [SLM Deployment Practice](/lib/13-local-ai/edgeai-for-beginners/Module03) | Local & cloud deployment | Advanced Learning • Local Environment • Cloud Deployment | Intermediate | 4-5 hrs |
| [⚙️ 04](/lib/13-local-ai/edgeai-for-beginners/Module04) | [Model Optimization Toolkit](/lib/13-local-ai/edgeai-for-beginners/Module04) | Cross-platform optimization | Introduction • Llama.cpp • Microsoft Olive • OpenVINO • Apple MLX • Workflow Synthesis | Intermediate | 5-6 hrs |
| [🔧 05](/lib/13-local-ai/edgeai-for-beginners/Module05) | [SLMOps Production](/lib/13-local-ai/edgeai-for-beginners/Module05) | Production operations | SLMOps Introduction • Model Distillation • Fine-tuning • Production Deployment | Advanced | 5-6 hrs |
| [🤖 06](/lib/13-local-ai/edgeai-for-beginners/Module06) | [AI Agents & Function Calling](/lib/13-local-ai/edgeai-for-beginners/Module06) | Agent frameworks & MCP | Agent Introduction • Function Calling • Model Context Protocol | Advanced | 4-5 hrs |
| [💻 07](/lib/13-local-ai/edgeai-for-beginners/Module07) | [Platform Implementation](/lib/13-local-ai/edgeai-for-beginners/Module07) | Cross-platform samples | AI Toolkit • Foundry Local • Windows Development | Advanced | 3-4 hrs |
| [🏭 08](/lib/13-local-ai/edgeai-for-beginners/Module08) | [Foundry Local Toolkit](/lib/13-local-ai/edgeai-for-beginners/Module08) | Production-ready samples | Sample applications (see details below) | Expert | 8-10 hrs |

### 🏭 **Module 08: Sample Applications**

- [01: REST Chat Quickstart](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module08/samples/01/README.md)
- [02: OpenAI SDK Integration](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module08/samples/02/README.md)
- [03: Model Discovery & Benchmarking](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module08/samples/03/README.md)
- [04: Chainlit RAG Application](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module08/samples/04/README.md)
- [05: Multi-Agent Orchestration](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module08/samples/05/README.md)
- [06: Models-as-Tools Router](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module08/samples/06/README.md)
- [07: Direct API Client](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module08/samples/07/README.md)
- [08: Windows 11 Chat App](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module08/samples/08/README.md)
- [09: Advanced Multi-Agent System](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module08/samples/09/README.md)
- [10: Foundry Tools Framework](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module08/samples/10/README.md)

### 🎓 **Workshop: Hands-On Learning Path**

Comprehensive hands-on workshop materials with production-ready implementations:

- **[Workshop Guide](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/Readme.md)** - Complete learning objectives, outcomes, and resource navigation
- **Python Samples** (6 sessions) - Updated with best practices, error handling, and comprehensive documentation
- **Jupyter Notebooks** (8 interactive) - Step-by-step tutorials with benchmarks and performance monitoring
- **Session Guides** - Detailed markdown guides for each workshop session
- **Validation Tools** - Scripts to verify code quality and run smoke tests

**What You'll Build:**
- Local AI chat applications with streaming support
- RAG pipelines with quality evaluation (RAGAS)
- Multi-model benchmarking and comparison tools
- Multi-agent orchestration systems
- Intelligent model routing with task-based selection

### 🎙️ **Workshop For Agentic: Hands-On - The AI Podcast Studio**

Build an AI-powered podcast production pipeline from scratch! This immersive workshop teaches you to create a complete multi-agent system that transforms ideas into professional podcast episodes.

**[🎬 Start The AI Podcast Studio Workshop](/lib/13-local-ai/edgeai-for-beginners/WorkshopForAgentic)**

**Your Mission**: Launch "Future Bytes" — a tech podcast powered entirely by AI agents you'll build yourself. No cloud dependencies, no API costs — everything runs locally on your machine.

**What Makes This Unique:**
- **🤖 Real Multi-Agent Orchestration** - Build specialized AI agents that research, write, and produce audio
- **🎯 Complete Production Pipeline** - From topic selection to final podcast audio output
- **💻 100% Local Deployment** - Uses Ollama and local models (Qwen-3-8B) for full privacy and control
- **🎤 Text-to-Speech Integration** - Transform scripts into natural-sounding multi-speaker conversations
- **✋ Human-in-the-Loop Workflows** - Approval gates ensure quality while maintaining automation

**Three-Act Learning Journey:**

| Act | Focus | Key Skills | Duration |
|-----|-------|------------|----------|
| **[Act 1: Meet Your AI Assistants](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/WorkshopForAgentic/md/01.BuildAIAgentWithSLM.md)** | Build your first AI agent | Tool integration • Web search • Problem-solving • Agentic reasoning | 2-3 hrs |
| **[Act 2: Assemble Your Production Team](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/WorkshopForAgentic/md/02.AIAgentOrchestrationAndWorkflows.md)** | Orchestrate multiple agents | Team coordination • Approval workflows • DevUI interface • Human oversight | 3-4 hrs |
| **[Act 3: Bring Your Podcast to Life](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/WorkshopForAgentic/md/03.Multi-SpeakerPodcastGenerationWithVibeVoice.md)** | Generate podcast audio | Text-to-speech • Multi-speaker synthesis • Long-form audio • Full automation | 2-3 hrs |

**Technologies Used:**
- **Microsoft Agent Framework** - Multi-agent orchestration and coordination
- **Ollama** - Local AI model runtime (no cloud required)
- **Qwen-3-8B** - Open-source language model optimized for agentic tasks
- **Text-to-Speech APIs** - Natural voice synthesis for podcast generation

**Hardware Support:**
- ✅ **CPU Mode** - Works on any modern computer (8GB+ RAM recommended)
- 🚀 **GPU Acceleration** - Significantly faster inference with NVIDIA/AMD GPUs
- ⚡ **NPU Support** - Next-generation neural processing unit acceleration

**Perfect For:**
- Developers learning multi-agent AI systems
- Anyone interested in AI automation and workflows
- Content creators exploring AI-assisted production
- Students studying practical AI orchestration patterns

**Start Building**: [🎙️ The AI Podcast Studio Workshop →](/lib/13-local-ai/edgeai-for-beginners/WorkshopForAgentic)

### 📊 **Learning Path Summary**
- **Total Duration**: 36-45 hours
- **Beginner Path**: Modules 01-02 (7-9 hours)  
- **Intermediate Path**: Modules 03-04 (9-11 hours)
- **Advanced Path**: Modules 05-07 (12-15 hours)
- **Expert Path**: Module 08 (8-10 hours)

## What You'll Build

### 🎯 Core Competencies
- **Edge AI Architecture**: Design local-first AI systems with cloud integration
- **Model Optimization**: Quantize and compress models for edge deployment (85% speed boost, 75% size reduction)
- **Multi-Platform Deployment**: Windows, mobile, embedded, and cloud-edge hybrid systems
- **Production Operations**: Monitoring, scaling, and maintaining edge AI in production

### 🏗️ Practical Projects
- **Foundry Local Chat Apps**: Windows 11 native application with model switching
- **Multi-Agent Systems**: Coordinator with specialist agents for complex workflows  
- **RAG Applications**: Local document processing with vector search
- **Model Routers**: Intelligent selection between models based on task analysis
- **API Frameworks**: Production-ready clients with streaming and health monitoring
- **Cross-Platform Tools**: LangChain/Semantic Kernel integration patterns

### 🏢 Industry Applications
**Manufacturing** • **Healthcare** • **Autonomous Vehicles** • **Smart Cities** • **Mobile Apps**

## Quick Start

**Recommended Learning Path** (20-30 hours total):

0. **📖 Introduction** ([Introduction.md](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/introduction.md)): EdgeAI foundation + industry context + learning framework
1. **📚 Foundation** (Modules 01-02): EdgeAI concepts + SLM model families
2. **⚙️ Optimization** (Modules 03-04): Deployment + quantization frameworks  
3. **🚀 Production** (Modules 05-06): SLMOps + AI agents + function calling
4. **💻 Implementation** (Modules 07-08): Platform samples + Foundry Local toolkit

Each module includes theory, hands-on exercises, and production-ready code samples.

## Career Impact

**Technical Roles**: EdgeAI Solutions Architect • ML Engineer (Edge) • IoT AI Developer • Mobile AI Developer

**Industry Sectors**: Manufacturing 4.0 • Healthcare Tech • Autonomous Systems • FinTech • Consumer Electronics

**Portfolio Projects**: Multi-agent systems • Production RAG apps • Cross-platform deployment • Performance optimization

## Repository Structure

```
edgeai-for-beginners/
├── 📖 introduction.md  # Foundation: EdgeAI Overview & Learning Framework
├── 📚 Module01-04/     # Fundamentals → SLMs → Deployment → Optimization  
├── 🔧 Module05-06/     # SLMOps → AI Agents → Function Calling
├── 💻 Module07/        # Platform Samples (VS Code, Windows, Jetson, Mobile)
├── 🏭 Module08/        # Foundry Local Toolkit + 10 Comprehensive Samples
│   ├── samples/01-06/  # Foundation: REST, SDK, RAG, Agents, Routing
│   └── samples/07-10/  # Advanced: API Client, Windows App, Enterprise Agents, Tools
├── 🌐 translations/    # Multi-language support (8+ languages)
└── 📋 STUDY_GUIDE.md   # Structured learning paths & time allocation
```

## Course Highlights

✅ **Progressive Learning**: Theory → Practice → Production deployment  
✅ **Real Case Studies**: Microsoft, Japan Airlines, enterprise implementations  
✅ **Hands-on Samples**: 50+ examples, 10 comprehensive Foundry Local demos  
✅ **Performance Focus**: 85% speed improvements, 75% size reductions  
✅ **Multi-Platform**: Windows, mobile, embedded, cloud-edge hybrid  
✅ **Production Ready**: Monitoring, scaling, security, compliance frameworks

📖 **[Study Guide Available](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/STUDY_GUIDE.md)**: Structured 20-hour learning path with time allocation guidance and self-assessment tools.

---

**EdgeAI represents the future of AI deployment**: local-first, privacy-preserving, and efficient. Master these skills to build the next generation of intelligent applications.
