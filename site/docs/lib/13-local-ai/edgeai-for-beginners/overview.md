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
zh: "on"
---

# EdgeAI for Beginners 

![Course cover image](/mirror/b0/b0e31b10e23dc3e87d20c8e696d84ff1daca4dce.webp)

## Introduction

Welcome to **EdgeAI for Beginners** – your comprehensive journey into the transformative world of Edge Artificial Intelligence. This course bridges the gap between powerful AI capabilities and practical, real-world deployment on edge devices, empowering you to harness AI's potential directly where data is generated and decisions need to be made.

<div class="tb-zh"><p>欢迎来到《EdgeAI for Beginners》——一段带你全面走进边缘人工智能这一变革性世界的旅程。这门课程弥合了强大的 AI 能力与边缘设备上实际部署之间的差距，让你能直接在数据产生、决策需要做出的地方发挥 AI 的潜力。</p></div>

### What You'll Master

This course takes you from fundamental concepts to production-ready implementations, covering:
- **Small Language Models (SLMs)** optimized for edge deployment
- **Hardware-aware optimization** across diverse platforms
- **Real-time inference** with privacy-preserving capabilities
- **Production deployment** strategies for enterprise applications

<div class="tb-zh"><p>这门课程带你从基本概念走到生产就绪的实现，涵盖：为边缘部署优化的小语言模型（SLM）；跨多种平台的硬件感知优化；具备隐私保护能力的实时推理；面向企业应用的生产部署策略。</p></div>

### Why EdgeAI Matters

Edge AI represents a paradigm shift that addresses critical modern challenges:
- **Privacy & Security**: Process sensitive data locally without cloud exposure
- **Real-time Performance**: Eliminate network latency for time-critical applications
- **Cost Efficiency**: Reduce bandwidth and cloud computing expenses
- **Resilient Operations**: Maintain functionality during network outages
- **Regulatory Compliance**: Meet data sovereignty requirements

<div class="tb-zh"><p>边缘 AI 代表一次范式转变，回应了当今的几个关键挑战：隐私与安全——在本地处理敏感数据，不暴露给云端；实时性能——为时间敏感的应用消除网络延迟；成本效率——降低带宽与云计算开支；韧性运行——在网络中断时仍保持可用；法规合规——满足数据主权要求。</p></div>

### Edge AI

Edge AI refers to running AI algorithms and language models locally on hardware, close to where data is generated without relying on cloud resources for inference. It reduces latency, enhances privacy, and enables real-time decision-making.

<div class="tb-zh"><p>边缘 AI 指的是在本地硬件上运行 AI 算法与语言模型，靠近数据产生的地方，推理时不依赖云端资源。它降低延迟、增强隐私，并支持实时决策。</p></div>

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

<div class="tb-zh"><p>Phi-4、Mistral-7B、Gemma 这类 SLM 是更大 LLM 的优化版本——为以下目标做训练或蒸馏：更小的内存占用——高效利用边缘设备有限的内存；更低的算力需求——针对 CPU 与边缘 GPU 的性能做优化；更快的启动速度——应用响应更迅速。</p></div>

They unlock powerful NLP capabilities while meeting the constraints of:
- **Embedded systems**: IoT devices and industrial controllers
- **Mobile devices**: Smartphones and tablets with offline capabilities
- **IoT Devices**: Sensors and smart devices with limited resources
- **Edge servers**: Local processing units with limited GPU resources
- **Personal Computers**: Desktop and laptop deployment scenarios

<div class="tb-zh"><p>它们在解锁强大 NLP 能力的同时，满足这些环境的约束：嵌入式系统——IoT 设备与工业控制器；移动设备——具备离线能力的智能手机与平板；IoT 设备——资源受限的传感器与智能设备；边缘服务器——GPU 资源有限的本地处理单元；个人电脑——台式机与笔记本部署场景。</p></div>

## Course Modules & Navigation

| Module | Topic | Focus Area | Key Content | Level | Duration |
|--------|-------|------------|-------------|--------|----------|
| [📖 00 ](/lib/13-local-ai/edgeai-for-beginners/introduction) | [Introduction to EdgeAI](/lib/13-local-ai/edgeai-for-beginners/introduction) | Foundation & Context | EdgeAI Overview • Industry Applications • SLM Introduction • Learning Objectives | Beginner | 1-2 hrs |
| [📚 01](/lib/13-local-ai/edgeai-for-beginners/Module01) | [EdgeAI Fundamentals](/lib/13-local-ai/edgeai-for-beginners/Module01) | Cloud vs Edge AI comparison | EdgeAI Fundamentals • Real World Case Studies • Implementation Guide • Edge Deployment | Beginner | 3-4 hrs |
| [🧠 02](/lib/13-local-ai/edgeai-for-beginners/Module02) | [SLM Model Foundations](/lib/13-local-ai/edgeai-for-beginners/Module02) | Model families & architecture | Phi Family • Qwen Family • Gemma Family • BitNET • μModel • Phi-Silica | Beginner | 4-5 hrs |
| [🚀 03](/lib/13-local-ai/edgeai-for-beginners/Module03) | [SLM Deployment Practice](/lib/13-local-ai/edgeai-for-beginners/Module03) | Local & cloud deployment | Advanced Learning • Local Environment • Cloud Deployment | Intermediate | 4-5 hrs |
| [⚙️ 04](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module04/README.md) | [Model Optimization Toolkit](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module04/README.md) | Cross-platform optimization | Introduction • Llama.cpp • Microsoft Olive • OpenVINO • Apple MLX • Workflow Synthesis | Intermediate | 5-6 hrs |
| [🔧 05](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module05/README.md) | [SLMOps Production](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module05/README.md) | Production operations | SLMOps Introduction • Model Distillation • Fine-tuning • Production Deployment | Advanced | 5-6 hrs |
| [🤖 06](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module06/README.md) | [AI Agents & Function Calling](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module06/README.md) | Agent frameworks & MCP | Agent Introduction • Function Calling • Model Context Protocol | Advanced | 4-5 hrs |
| [💻 07](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module07/README.md) | [Platform Implementation](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module07/README.md) | Cross-platform samples | AI Toolkit • Foundry Local • Windows Development | Advanced | 3-4 hrs |
| [🏭 08](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module08/README.md) | [Foundry Local Toolkit](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module08/README.md) | Production-ready samples | Sample applications (see details below) | Expert | 8-10 hrs |

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

<div class="tb-zh"><p>示例 01：REST 聊天快速上手；02：OpenAI SDK 集成；03：模型发现与基准测试；04：Chainlit RAG 应用；05：多 agent 编排；06：模型即工具的路由器；07：直接调用 API 的客户端；08：Windows 11 聊天应用；09：进阶多 agent 系统；10：Foundry Tools 框架。</p></div>

### 🎓 **Workshop: Hands-On Learning Path**

Comprehensive hands-on workshop materials with production-ready implementations:

<div class="tb-zh"><p>配套动手工作坊材料，均为生产就绪的实现：</p></div>

- **[Workshop Guide](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/Readme.md)** - Complete learning objectives, outcomes, and resource navigation
- **Python Samples** (6 sessions) - Updated with best practices, error handling, and comprehensive documentation
- **Jupyter Notebooks** (8 interactive) - Step-by-step tutorials with benchmarks and performance monitoring
- **Session Guides** - Detailed markdown guides for each workshop session
- **Validation Tools** - Scripts to verify code quality and run smoke tests

<div class="tb-zh"><p>工作坊指南——完整的学习目标、成果与资源导航；Python 示例（6 节）——已按最佳实践、错误处理与完整文档更新；Jupyter notebook（8 个交互式）——带基准测试与性能监控的分步教程；各节指南——每场工作坊的详细 markdown 指南；校验工具——用于检查代码质量并运行冒烟测试的脚本。</p></div>

**What You'll Build:**
- Local AI chat applications with streaming support
- RAG pipelines with quality evaluation (RAGAS)
- Multi-model benchmarking and comparison tools
- Multi-agent orchestration systems
- Intelligent model routing with task-based selection

<div class="tb-zh"><p>你将构建：支持流式输出的本地 AI 聊天应用；带质量评估（RAGAS）的 RAG 流水线；多模型基准测试与对比工具；多 agent 编排系统；按任务选择模型的智能路由。</p></div>

### 🎙️ **Workshop For Agentic: Hands-On - The AI Podcast Studio**

Build an AI-powered podcast production pipeline from scratch! This immersive workshop teaches you to create a complete multi-agent system that transforms ideas into professional podcast episodes.

<div class="tb-zh"><p>从零搭建一条 AI 驱动的播客生产流水线！这场沉浸式工作坊教你构建一个完整的多 agent 系统，把想法变成专业的播客节目。</p></div>

**[🎬 Start The AI Podcast Studio Workshop](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/WorkshopForAgentic/README.md)**

<div class="tb-zh"><p>开始《AI 播客工作室》工作坊。</p></div>

**Your Mission**: Launch "Future Bytes" — a tech podcast powered entirely by AI agents you'll build yourself. No cloud dependencies, no API costs — everything runs locally on your machine.

<div class="tb-zh"><p>你的任务：创办《Future Bytes》——一档完全由你亲手构建的 AI agent 驱动的科技播客。不依赖云端、没有 API 费用——一切都在你自己的机器上本地运行。</p></div>

**What Makes This Unique:**
- **🤖 Real Multi-Agent Orchestration** - Build specialized AI agents that research, write, and produce audio
- **🎯 Complete Production Pipeline** - From topic selection to final podcast audio output
- **💻 100% Local Deployment** - Uses Ollama and local models (Qwen-3-8B) for full privacy and control
- **🎤 Text-to-Speech Integration** - Transform scripts into natural-sounding multi-speaker conversations
- **✋ Human-in-the-Loop Workflows** - Approval gates ensure quality while maintaining automation

<div class="tb-zh"><p>它的独特之处：真正的多 agent 编排——构建分别负责调研、写作和音频制作的专职 AI agent；完整的生产流水线——从选题一直到最终的播客音频输出；100% 本地部署——使用 Ollama 与本地模型（Qwen-3-8B），完全私密、完全可控；文本转语音集成——把脚本变成听起来自然的多说话人对话；人在环工作流——用审批关卡在保持自动化的同时确保质量。</p></div>

**Three-Act Learning Journey:**

<div class="tb-zh"><p>三幕式学习旅程：</p></div>

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

<div class="tb-zh"><p>使用的技术：Microsoft Agent Framework——多 agent 编排与协调；Ollama——本地 AI 模型运行时（不需要云端）；Qwen-3-8B——为 agentic 任务优化的开源语言模型；文本转语音 API——为播客生成自然的语音合成。</p></div>

**Hardware Support:**
- ✅ **CPU Mode** - Works on any modern computer (8GB+ RAM recommended)
- 🚀 **GPU Acceleration** - Significantly faster inference with NVIDIA/AMD GPUs
- ⚡ **NPU Support** - Next-generation neural processing unit acceleration

<div class="tb-zh"><p>硬件支持：✅ CPU 模式——任何现代电脑都能跑（建议 8GB 以上内存）；🚀 GPU 加速——用 NVIDIA/AMD GPU 显著加快推理；⚡ NPU 支持——下一代神经处理单元加速。</p></div>

**Perfect For:**
- Developers learning multi-agent AI systems
- Anyone interested in AI automation and workflows
- Content creators exploring AI-assisted production
- Students studying practical AI orchestration patterns

<div class="tb-zh"><p>非常适合：学习多 agent AI 系统的开发者；对 AI 自动化与工作流感兴趣的任何人；探索 AI 辅助生产的内容创作者；学习实用 AI 编排模式的学生。</p></div>

**Start Building**: [🎙️ The AI Podcast Studio Workshop →](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/WorkshopForAgentic/README.md)

<div class="tb-zh"><p>开始动手：《AI 播客工作室》工作坊。</p></div>

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

<div class="tb-zh"><p>推荐学习路径（总计 20 到 30 小时）：</p></div>

0. **📖 Introduction** ([Introduction.md](/lib/13-local-ai/edgeai-for-beginners/introduction)): EdgeAI foundation + industry context + learning framework
1. **📚 Foundation** (Modules 01-02): EdgeAI concepts + SLM model families
2. **⚙️ Optimization** (Modules 03-04): Deployment + quantization frameworks  
3. **🚀 Production** (Modules 05-06): SLMOps + AI agents + function calling
4. **💻 Implementation** (Modules 07-08): Platform samples + Foundry Local toolkit

<div class="tb-zh"><p>0. 引言（Introduction.md）：EdgeAI 基础 + 行业背景 + 学习框架；1. 基础（模块 01–02）：EdgeAI 概念 + SLM 模型家族；2. 优化（模块 03–04）：部署 + 量化框架；3. 生产（模块 05–06）：SLMOps + AI agent + 函数调用；4. 实现（模块 07–08）：平台示例 + Foundry Local 工具包。</p></div>

Each module includes theory, hands-on exercises, and production-ready code samples.

<div class="tb-zh"><p>每个模块都包含理论、动手练习和生产就绪的代码示例。</p></div>

## Career Impact

**Technical Roles**: EdgeAI Solutions Architect • ML Engineer (Edge) • IoT AI Developer • Mobile AI Developer

<div class="tb-zh"><p>技术岗位：EdgeAI 解决方案架构师 · 边缘机器学习工程师 · IoT AI 开发者 · 移动 AI 开发者。</p></div>

**Industry Sectors**: Manufacturing 4.0 • Healthcare Tech • Autonomous Systems • FinTech • Consumer Electronics

<div class="tb-zh"><p>行业领域：制造业 4.0 · 医疗科技 · 自主系统 · 金融科技 · 消费电子。</p></div>

**Portfolio Projects**: Multi-agent systems • Production RAG apps • Cross-platform deployment • Performance optimization

<div class="tb-zh"><p>作品集项目：多 agent 系统 · 生产级 RAG 应用 · 跨平台部署 · 性能优化。</p></div>

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

<div class="tb-zh"><p>✅ 循序渐进：理论 → 实践 → 生产部署；✅ 真实案例：微软、日本航空、企业级落地；✅ 动手示例：50 多个示例、10 个完整的 Foundry Local 演示；✅ 关注性能：速度提升 85%、体积缩小 75%；✅ 多平台：Windows、移动端、嵌入式、云边混合；✅ 生产就绪：监控、扩缩容、安全与合规框架。</p></div>

📖 **[Study Guide Available](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/STUDY_GUIDE.md)**: Structured 20-hour learning path with time allocation guidance and self-assessment tools.

<div class="tb-zh"><p>📖 提供学习指南：结构化的 20 小时学习路径，含时间分配指引与自评工具。</p></div>

---

**EdgeAI represents the future of AI deployment**: local-first, privacy-preserving, and efficient. Master these skills to build the next generation of intelligent applications.

<div class="tb-zh"><p>EdgeAI 代表着 AI 部署的未来：本地优先、保护隐私、高效。掌握这些技能，去构建下一代智能应用。</p></div>
