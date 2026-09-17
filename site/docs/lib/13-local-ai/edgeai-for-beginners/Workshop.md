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
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/Readme.md"
sourceRel: "Workshop/Readme.md"
rawUrl: "/raw/13-local-ai/edgeai-for-beginners/Workshop/Readme.md"
sourceSha256: "f75d382f7e192151ae581744bae3efd160c39bc41902c4f2e0105112e422737c"
pageSha256: "f75d382f7e192151ae581744bae3efd160c39bc41902c4f2e0105112e422737c"
contentMode: "local-full"
zh: ""
---

# EdgeAI for Beginners - Workshop

> **Hands-On Learning Path for Building Production-Ready Edge AI Applications**
>
> Master local AI deployment with Microsoft Foundry Local, from first chat completion to multi-agent orchestration in 6 progressive sessions.

---

## 🎯 Introduction

Welcome to the **EdgeAI for Beginners Workshop** - your practical, hands-on guide to building intelligent applications that run entirely on local hardware. This workshop transforms theoretical Edge AI concepts into real-world skills through progressively challenging exercises using Microsoft Foundry Local and Small Language Models (SLMs).

### Why This Workshop?

**The Edge AI Revolution is Here**

Organizations worldwide are shifting from cloud-dependent AI to edge computing for three critical reasons:

1. **Privacy & Compliance** - Process sensitive data locally without cloud transmission (HIPAA, GDPR, financial regulations)
2. **Performance** - Eliminate network latency (50-500ms local vs 500-2000ms cloud round-trip)
3. **Cost Control** - Remove per-token API costs and scale without cloud expenses

**But Edge AI is Different**

Running AI on-premises requires new skills:
- Model selection and optimization for resource constraints
- Local service management and hardware acceleration
- Prompt engineering for smaller models
- Production deployment patterns for edge devices

**This Workshop Delivers Those Skills**

In 6 focused sessions (~3 hours total), you'll progress from "Hello World" to deploying production-ready multi-agent systems - all running locally on your machine.

---

## 📚 Learning Objectives

By completing this workshop, you will be able to:

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

3. **Create RAG (Retrieval Augmented Generation) Systems**
   - Build semantic search with embeddings
   - Ground LLM responses in domain-specific knowledge
   - Evaluate RAG quality with industry-standard metrics
   - Scale from prototype to production

4. **Optimize Model Performance**
   - Benchmark multiple models for your use case
   - Measure latency, throughput, and first-token time
   - Select optimal models based on speed/quality tradeoffs
   - Compare SLM vs LLM trade-offs in real scenarios

5. **Orchestrate Multi-Agent Systems**
   - Design specialized agents for different tasks
   - Implement agent memory and context management
   - Coordinate agents in complex workflows
   - Route requests intelligently across multiple models

6. **Deploy Production-Ready Solutions**
   - Implement error handling and retry logic
   - Monitor token usage and system resources
   - Build scalable architectures with model-as-tools patterns
   - Plan migration paths from edge to hybrid (edge + cloud)

---

## 🎓 Learning Outcomes

### What You'll Build

By the end of this workshop, you will have created:

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

✅ **Build Privacy-First Applications**
- Healthcare apps handling PHI/PII locally
- Financial services with compliance requirements
- Government systems with data sovereignty needs

✅ **Optimize for Edge Environments**
- IoT devices with limited resources
- Offline-first mobile applications
- Low-latency real-time systems

✅ **Design Intelligent Architectures**
- Multi-agent systems for complex workflows
- Hybrid edge-cloud deployments
- Cost-optimized AI infrastructure

✅ **Lead Edge AI Initiatives**
- Evaluate Edge AI feasibility for projects
- Select appropriate models and frameworks
- Architect scalable local AI solutions

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

**Software Requirements:**
- **Python 3.8+** ([Download](https://www.python.org/downloads/))
- **Microsoft Foundry Local** ([Installation Guide](#install-foundry-local))
- **Git** ([Download](https://git-scm.com/downloads))
- **Visual Studio Code** (recommended) ([Download](https://code.visualstudio.com/))

### Setup in 3 Steps

#### 1. Install Foundry Local

**Windows:**
```powershell
winget install Microsoft.FoundryLocal
```

**macOS:**
```bash
brew tap microsoft/foundrylocal
brew install foundrylocal
```

**Verify Installation:**
```bash
foundry --version
foundry service status
```

**Ensure Azure AI Foundry Local is running with a fixed port**

```bash
# Set FoundryLocal to use port 58123 (default)
foundry service set --port 58123 --show

# Or use a different port
foundry service set --port 58000 --show
```

**Verify it's working:**
```bash
# Check service status
foundry service status

# Test the endpoint
curl http://127.0.0.1:58123/v1/models
```
**Finding Available Models**
To see which models are available in your Foundry Local instance, you can query the models endpoint:

```bash
# cmd/bash/powershell
foundry model list
```

Using Web Endpoint 

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

---

## 📦 Workshop Resources

### Python Samples

Progressive hands-on examples demonstrating each concept:

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

| Session | Notebook | Description | Difficulty |
|---------|----------|-------------|------------|

### Documentation

Comprehensive guides and references:

| Document | Description | Use When |
|----------|-------------|----------|
| [QUICK_START.md](/lib/13-local-ai/edgeai-for-beginners/Workshop-QUICK_START) | Fast-track setup guide | Starting from scratch |
| [QUICK_REFERENCE.md](/lib/13-local-ai/edgeai-for-beginners/Workshop-QUICK_REFERENCE) | Command & API cheat sheet | Need quick answers |
| [FOUNDRY_SDK_QUICKREF.md](/lib/13-local-ai/edgeai-for-beginners/Workshop-FOUNDRY_SDK_QUICKREF) | SDK patterns & examples | Writing code |
| [ENV_CONFIGURATION.md](/lib/13-local-ai/edgeai-for-beginners/Workshop-ENV_CONFIGURATION) | Environment variable guide | Configuring samples |
| [notebooks/TROUBLESHOOTING.md](/lib/13-local-ai/edgeai-for-beginners/Workshop-notebooks-TROUBLESHOOTING) | Common issues & fixes | Debugging problems |

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

| Workshop Session | Guide | Core Focus |
|------------------|-------|------------|
| 1 | [Session01-GettingStartedFoundryLocal](/lib/13-local-ai/edgeai-for-beginners/Workshop-Session01-GettingStartedFoundryLocal) | Install, validate, run phi & GPT-OSS-20B, acceleration |
| 2 | [Session02-BuildAISolutionsRAG](/lib/13-local-ai/edgeai-for-beginners/Workshop-Session02-BuildAISolutionsRAG) | Prompt engineering, RAG patterns, CSV & document grounding, migration |
| 3 | [Session03-OpenSourceModels](/lib/13-local-ai/edgeai-for-beginners/Workshop-Session03-OpenSourceModels) | Hugging Face integration, benchmarking, model selection |
| 4 | [Session04-CuttingEdgeModels](/lib/13-local-ai/edgeai-for-beginners/Workshop-Session04-CuttingEdgeModels) | SLM vs LLM, WebGPU, Chainlit RAG, ONNX acceleration |
| 5 | [Session05-AIPoweredAgents](/lib/13-local-ai/edgeai-for-beginners/Workshop-Session05-AIPoweredAgents) | Agent roles, memory, tools, orchestration |
| 6 | [Session06-ModelsAsTools](/lib/13-local-ai/edgeai-for-beginners/Workshop-Session06-ModelsAsTools) | Routing, chaining, scaling path to Azure |

Each session file includes: abstract, learning objectives, 30‑minute demo flow, starter project, validation checklist, troubleshooting, and references to the official Foundry Local Python SDK.

### Sample Scripts

Install workshop dependencies (Windows):

```powershell
cd Workshop
py -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
```

macOS / Linux:

```bash
cd Workshop
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

If running the Foundry Local service on a different (Windows) machine or VM from macOS, export the endpoint:

```bash
