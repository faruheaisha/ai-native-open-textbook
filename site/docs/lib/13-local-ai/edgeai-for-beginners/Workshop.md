---
title: "EdgeAI for Beginners - Workshop"
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

# EdgeAI for Beginners - Workshop

> **Hands-On Learning Path for Building Production-Ready Edge AI Applications**
>
> Master local AI deployment with Microsoft Foundry Local, from first chat completion to multi-agent orchestration in 6 progressive sessions.

<div class="tb-zh"><p>面向生产级边缘 AI 应用构建的动手学习路径。用 Microsoft Foundry Local 掌握本地 AI 部署：在 6 个递进的学习单元里，从第一次对话补全一直走到多 agent 编排。</p></div>

---

## 🎯 Introduction

Welcome to the **EdgeAI for Beginners Workshop** - your practical, hands-on guide to building intelligent applications that run entirely on local hardware. This workshop transforms theoretical Edge AI concepts into real-world skills through progressively challenging exercises using Microsoft Foundry Local and Small Language Models (SLMs).

<div class="tb-zh"><p>欢迎来到《EdgeAI for Beginners 工作坊》——一份实用、动手的指南，教你构建完全跑在本地硬件上的智能应用。这场工作坊把 Edge AI 的理论概念转化为真实技能，用 Microsoft Foundry Local 与小语言模型（SLM）做一整套难度递进的练习。</p></div>

### Why This Workshop?

**The Edge AI Revolution is Here**

<div class="tb-zh"><p>边缘 AI 革命已经到来</p></div>

Organizations worldwide are shifting from cloud-dependent AI to edge computing for three critical reasons:

<div class="tb-zh"><p>世界各地的组织正出于三个关键原因，从依赖云端的 AI 转向边缘计算：</p></div>

1. **Privacy & Compliance** - Process sensitive data locally without cloud transmission (HIPAA, GDPR, financial regulations)
2. **Performance** - Eliminate network latency (50-500ms local vs 500-2000ms cloud round-trip)
3. **Cost Control** - Remove per-token API costs and scale without cloud expenses

<div class="tb-zh"><p>1）隐私与合规——在本地处理敏感数据，不向云端传输（HIPAA、GDPR、金融监管）；2）性能——消除网络延迟（本地 50–500 毫秒 vs 云端往返 500–2000 毫秒）；3）成本控制——去掉按 token 计费的 API 成本，扩展时不增加云开支。</p></div>

**But Edge AI is Different**

<div class="tb-zh"><p>但边缘 AI 是另一回事</p></div>

Running AI on-premises requires new skills:
- Model selection and optimization for resource constraints
- Local service management and hardware acceleration
- Prompt engineering for smaller models
- Production deployment patterns for edge devices

<div class="tb-zh"><p>在本地运行 AI 需要新的技能：针对资源约束做模型选型与优化；本地服务管理与硬件加速；面向更小模型的提示词工程；面向边缘设备的生产部署模式。</p></div>

**This Workshop Delivers Those Skills**

<div class="tb-zh"><p>这场工作坊教的正是这些技能</p></div>

In 6 focused sessions (~3 hours total), you'll progress from "Hello World" to deploying production-ready multi-agent systems - all running locally on your machine.

<div class="tb-zh"><p>在 6 个聚焦的学习单元里（总共约 3 小时），你会从「Hello World」一路走到部署生产就绪的多 agent 系统——全部都在你自己的机器上本地运行。</p></div>

---

## 📚 Learning Objectives

By completing this workshop, you will be able to:

<div class="tb-zh"><p>完成这场工作坊后，你将能够：</p></div>

### Core Competencies
1. **Deploy and Manage Local AI Services**
   - Install and configure Microsoft Foundry Local
   - Select appropriate models for edge deployment
   - Manage model lifecycle (download, load, cache)
   - Monitor resource usage and optimize performance

2. **Build AI-Powered Applications**
   - Implement OpenAI-compatible chat completions locally
   - Design effective prompts for Small Language Models
   - Handle streaming responses for better UX
   - Integrate local models into existing applications

<div class="tb-zh"><p>2）构建 AI 驱动的应用：在本地实现与 OpenAI 兼容的对话补全；为小语言模型设计有效的提示词；处理流式响应以改善体验；把本地模型集成进现有应用。</p></div>

3. **Create RAG (Retrieval Augmented Generation) Systems**
   - Build semantic search with embeddings
   - Ground LLM responses in domain-specific knowledge
   - Evaluate RAG quality with industry-standard metrics
   - Scale from prototype to production

<div class="tb-zh"><p>3）构建 RAG（检索增强生成）系统：用嵌入做语义搜索；让 LLM 的回答扎根于领域知识；用行业标准指标评估 RAG 质量；从原型扩展到生产。</p></div>

4. **Optimize Model Performance**
   - Benchmark multiple models for your use case
   - Measure latency, throughput, and first-token time
   - Select optimal models based on speed/quality tradeoffs
   - Compare SLM vs LLM trade-offs in real scenarios

<div class="tb-zh"><p>4）优化模型性能：针对你的用例对多个模型做基准测试；测量延迟、吞吐和首 token 时间；基于速度与质量的取舍选出最优模型；在真实场景中对比 SLM 与 LLM 的取舍。</p></div>

5. **Orchestrate Multi-Agent Systems**
   - Design specialized agents for different tasks
   - Implement agent memory and context management
   - Coordinate agents in complex workflows
   - Route requests intelligently across multiple models

<div class="tb-zh"><p>5）编排多 agent 系统：为不同任务设计专职 agent；实现 agent 的记忆与上下文管理；在复杂工作流中协调多个 agent；在多个模型之间智能路由请求。</p></div>

6. **Deploy Production-Ready Solutions**
   - Implement error handling and retry logic
   - Monitor token usage and system resources
   - Build scalable architectures with model-as-tools patterns
   - Plan migration paths from edge to hybrid (edge + cloud)

<div class="tb-zh"><p>6）交付生产就绪的方案：实现错误处理与重试逻辑；监控 token 用量与系统资源；用「模型即工具」模式构建可扩展架构；规划从边缘到混合（边缘 + 云端）的迁移路径。</p></div>

---

## 🎓 Learning Outcomes

### What You'll Build

By the end of this workshop, you will have created:

<div class="tb-zh"><p>到这场工作坊结束时，你将亲手做出：</p></div>

| Session | Deliverable | Skills Demonstrated |
|---------|-------------|---------------------|
| **1** | Chat application with streaming | Service setup, basic completions, streaming UX |
| **2** | RAG system with evaluation | Embeddings, semantic search, quality metrics |
| **3** | Multi-model benchmark suite | Performance measurement, model comparison |
| **4** | SLM vs LLM comparator | Trade-off analysis, optimization strategies |
| **5** | Multi-agent orchestrator | Agent design, memory management, coordination |
| **6** | Intelligent routing system | Intent detection, model selection, scalability |

### Competency Matrix

| Skill Level | Session 1-2 | Session 3-4 | Session 5-6 |
|-------------|-------------|-------------|-------------|
| **Beginner** | ✅ Setup & basics | ⚠️ Challenging | ❌ Too advanced |
| **Intermediate** | ✅ Quick review | ✅ Core learning | ⚠️ Stretch goals |
| **Advanced** | ✅ Breeze through | ✅ Refinement | ✅ Production patterns |

### Career-Ready Skills

**After this workshop, you'll be prepared to:**

<div class="tb-zh"><p>这场工作坊之后，你将具备以下能力：</p></div>

✅ **Build Privacy-First Applications**
- Healthcare apps handling PHI/PII locally
- Financial services with compliance requirements
- Government systems with data sovereignty needs

<div class="tb-zh"><p>✅ 构建隐私优先的应用：在本地处理 PHI/PII 的医疗健康应用；有合规要求的金融服务；有数据主权需求的政府系统。</p></div>

✅ **Optimize for Edge Environments**
- IoT devices with limited resources
- Offline-first mobile applications
- Low-latency real-time systems

<div class="tb-zh"><p>✅ 为边缘环境做优化：资源有限的 IoT 设备；离线优先的移动应用；低延迟的实时系统。</p></div>

✅ **Design Intelligent Architectures**
- Multi-agent systems for complex workflows
- Hybrid edge-cloud deployments
- Cost-optimized AI infrastructure

<div class="tb-zh"><p>✅ 设计智能架构：面向复杂工作流的多 agent 系统；边缘-云端混合部署；成本优化的 AI 基础设施。</p></div>

✅ **Lead Edge AI Initiatives**
- Evaluate Edge AI feasibility for projects
- Select appropriate models and frameworks
- Architect scalable local AI solutions

<div class="tb-zh"><p>✅ 主导边缘 AI 项目：评估项目做 Edge AI 的可行性；选择合适的模型与框架；设计可扩展的本地 AI 方案。</p></div>

---

## 🗺️ Workshop Structure

### Session Overview (6 Sessions × 30 Minutes = 3 Hours)

| Session | Topic | Focus | Duration |
|---------|-------|-------|----------|
| **1** | Getting Started with Foundry Local | Install, validate, first completions | 30 min |
| **2** | Building AI Solutions with RAG | Prompt engineering, embeddings, evaluation | 30 min |
| **3** | Open Source Models | Model discovery, benchmarking, selection | 30 min |
| **4** | Cutting Edge Models | SLM vs LLM, optimization, frameworks | 30 min |
| **5** | AI-Powered Agents | Agent design, orchestration, memory | 30 min |
| **6** | Models as Tools | Routing, chaining, scaling strategies | 30 min |

---

## 🚀 Quick Start

### Prerequisites

**System Requirements:**
- **OS**: Windows 10/11, macOS 11+, or Linux (Ubuntu 20.04+)
- **RAM**: 8GB minimum, 16GB+ recommended
- **Storage**: 10GB+ free space for models
- **CPU**: Modern processor with AVX2 support
- **GPU** (optional): CUDA-compatible or Qualcomm NPU for acceleration

<div class="tb-zh"><p>系统要求：操作系统——Windows 10/11、macOS 11+ 或 Linux（Ubuntu 20.04+）；内存——最低 8GB，建议 16GB 以上；存储——为模型留出 10GB 以上可用空间；CPU——支持 AVX2 的现代处理器；GPU（可选）——兼容 CUDA 的 GPU 或高通 NPU 用于加速。</p></div>

**Software Requirements:**
- **Python 3.8+** ([Download](https://www.python.org/downloads/))
- **Microsoft Foundry Local** ([Installation Guide](#install-foundry-local))
- **Git** ([Download](https://git-scm.com/downloads))
- **Visual Studio Code** (recommended) ([Download](https://code.visualstudio.com/))

<div class="tb-zh"><p>软件要求：Python 3.8+（下载）；Microsoft Foundry Local（安装指南）；Git（下载）；Visual Studio Code（推荐）（下载）。</p></div>

### Setup in 3 Steps

#### 1. Install Foundry Local

**Windows:**

<div class="tb-zh"><p>Windows：</p></div>

```powershell
winget install Microsoft.FoundryLocal
```

**macOS:**

<div class="tb-zh"><p>macOS：</p></div>

```bash
brew tap microsoft/foundrylocal
brew install foundrylocal
```

**Verify Installation:**

<div class="tb-zh"><p>验证安装：</p></div>

```bash
foundry --version
foundry service status
```

**Ensure Azure AI Foundry Local is running with a fixed port**

<div class="tb-zh"><p>确保 Azure AI Foundry Local 以固定端口运行</p></div>

```bash
# Set FoundryLocal to use port 58123 (default)
foundry service set --port 58123 --show

# Or use a different port
foundry service set --port 58000 --show
```

**Verify it's working:**

<div class="tb-zh"><p>验证它是否正常工作：</p></div>

```bash
# Check service status
foundry service status

# Test the endpoint
curl http://127.0.0.1:58123/v1/models
```

**Finding Available Models**
To see which models are available in your Foundry Local instance, you can query the models endpoint:

<div class="tb-zh"><p>查找可用模型。要查看你的 Foundry Local 实例里有哪些可用模型，可以查询模型端点：</p></div>

```bash
# cmd/bash/powershell
foundry model list
```

Using Web Endpoint 

<div class="tb-zh"><p>使用 Web 端点</p></div>

```bash
# Windows PowerShell
powershell -Command "Invoke-RestMethod -Uri 'http://127.0.0.1:58123/v1/models' -Method Get"

# Or using curl (if available)
curl http://127.0.0.1:58123/v1/models
```

#### 2. Clone Repository & Install Dependencies

```bash
# Clone repository
git clone https://github.com/microsoft/edgeai-for-beginners.git
cd edgeai-for-beginners/Workshop

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.\.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### 3. Run Your First Sample

```bash
# Start Foundry Local and load a model
foundry model run phi-4-mini

# Run the chat bootstrap sample
cd samples
python -m session01.chat_bootstrap "What is edge AI?"
```

**✅ Success!** You should see a streaming response about edge AI.

<div class="tb-zh"><p>✅ 成功！你应该会看到一段关于边缘 AI 的流式响应。</p></div>

---

## 📦 Workshop Resources

### Python Samples

Progressive hands-on examples demonstrating each concept:

<div class="tb-zh"><p>逐个概念演示的递进式动手示例：</p></div>

| Session | Sample | Description | Run Time |
|---------|--------|-------------|----------|
| 1 | [`chat_bootstrap.py`](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/samples/session01/chat_bootstrap.py) | Basic & streaming chat | ~30s |
| 2 | [`rag_pipeline.py`](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/samples/session02/rag_pipeline.py) | RAG with embeddings | ~45s |
| 2 | [`rag_eval_ragas.py`](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/samples/session02/rag_eval_ragas.py) | RAG quality evaluation | ~60s |
| 3 | [`benchmark_oss_models.py`](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/samples/session03/benchmark_oss_models.py) | Multi-model benchmarking | ~2-3m |
| 4 | [`model_compare.py`](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/samples/session04/model_compare.py) | SLM vs LLM comparison | ~45s |
| 5 | [`agents_orchestrator.py`](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/samples/session05/agents_orchestrator.py) | Multi-agent system | ~60s |
| 6 | [`models_router.py`](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/samples/session06/models_router.py) | Intent-based routing | ~45s |
| 6 | [`models_pipeline.py`](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/samples/session06/models_pipeline.py) | Multi-step pipeline | ~60s |

### Jupyter Notebooks

Interactive exploration with explanations and visualizations:

<div class="tb-zh"><p>带讲解与可视化的交互式探索：</p></div>

| Session | Notebook | Description | Difficulty |
|---------|----------|-------------|------------|

### Documentation

Comprehensive guides and references:

<div class="tb-zh"><p>综合指南与参考资料：</p></div>

| Document | Description | Use When |
|----------|-------------|----------|
| [QUICK_START.md](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/QUICK_START.md) | Fast-track setup guide | Starting from scratch |
| [QUICK_REFERENCE.md](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/QUICK_REFERENCE.md) | Command & API cheat sheet | Need quick answers |
| [FOUNDRY_SDK_QUICKREF.md](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/FOUNDRY_SDK_QUICKREF.md) | SDK patterns & examples | Writing code |
| [ENV_CONFIGURATION.md](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/ENV_CONFIGURATION.md) | Environment variable guide | Configuring samples |
| [notebooks/TROUBLESHOOTING.md](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/notebooks/TROUBLESHOOTING.md) | Common issues & fixes | Debugging problems |

---

## 🎓 Learning Path Recommendations

### For Beginners (3-4 hours)
1. ✅ Session 1: Getting Started (focus on setup and basic chat)
2. ✅ Session 2: RAG Basics (skip evaluation initially)
3. ✅ Session 3: Simple Benchmarking (2 models only)
4. ⏭️ Skip Sessions 4-6 for now
5. 🔄 Return to Sessions 4-6 after building first application

### For Intermediate Developers (3 hours)
1. ⚡ Session 1: Quick setup validation
2. ✅ Session 2: Complete RAG pipeline with evaluation
3. ✅ Session 3: Full benchmarking suite
4. ✅ Session 4: Model optimization
5. ✅ Sessions 5-6: Focus on architecture patterns

### For Advanced Practitioners (2-3 hours)
1. ⚡ Sessions 1-3: Quick review and validation
2. ✅ Session 4: Optimization deep-dive
3. ✅ Session 5: Multi-agent architecture
4. ✅ Session 6: Production patterns and scaling
5. 🚀 Extend: Build custom routing logic and hybrid deployments

---

## Workshop Session Pack (Focused 30‑Minute Labs)

If you're following the condensed 6-session workshop format, use these dedicated guides (each maps to and complements the broader module docs above):

<div class="tb-zh"><p>如果你跟的是浓缩版的 6 单元工作坊，请使用这些专门的指南（每一份都与上面更完整的模块文档对应并互为补充）：</p></div>

| Workshop Session | Guide | Core Focus |
|------------------|-------|------------|
| 1 | [Session01-GettingStartedFoundryLocal](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/Session01-GettingStartedFoundryLocal.md) | Install, validate, run phi & GPT-OSS-20B, acceleration |
| 2 | [Session02-BuildAISolutionsRAG](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/Session02-BuildAISolutionsRAG.md) | Prompt engineering, RAG patterns, CSV & document grounding, migration |
| 3 | [Session03-OpenSourceModels](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/Session03-OpenSourceModels.md) | Hugging Face integration, benchmarking, model selection |
| 4 | [Session04-CuttingEdgeModels](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/Session04-CuttingEdgeModels.md) | SLM vs LLM, WebGPU, Chainlit RAG, ONNX acceleration |
| 5 | [Session05-AIPoweredAgents](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/Session05-AIPoweredAgents.md) | Agent roles, memory, tools, orchestration |
| 6 | [Session06-ModelsAsTools](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/Session06-ModelsAsTools.md) | Routing, chaining, scaling path to Azure |

Each session file includes: abstract, learning objectives, 30‑minute demo flow, starter project, validation checklist, troubleshooting, and references to the official Foundry Local Python SDK.

<div class="tb-zh"><p>每个单元文件都包含：摘要、学习目标、30 分钟的演示流程、起步项目、验收清单、问题排查，以及指向官方 Foundry Local Python SDK 的参考链接。</p></div>

### Sample Scripts

Install workshop dependencies (Windows):

<div class="tb-zh"><p>安装工作坊依赖（Windows）：</p></div>

```powershell
cd Workshop
py -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
```

macOS / Linux:

<div class="tb-zh"><p>macOS / Linux：</p></div>

```bash
cd Workshop
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

If running the Foundry Local service on a different (Windows) machine or VM from macOS, export the endpoint:

<div class="tb-zh"><p>如果在 macOS 上连接的是另一台（Windows）机器或虚拟机上的 Foundry Local 服务，请导出端点：</p></div>

```bash
