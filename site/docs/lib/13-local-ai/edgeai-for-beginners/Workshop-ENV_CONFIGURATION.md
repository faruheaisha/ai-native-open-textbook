---
title: "Environment Configuration Guide"
sourceId: "13-local-ai/edgeai-for-beginners"
sourceTitle: "EdgeAI for Beginners"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "13-local-ai"
sourceUrl: "https://github.com/microsoft/edgeai-for-beginners"
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/ENV_CONFIGURATION.md"
sourceRel: "Workshop/ENV_CONFIGURATION.md"
rawUrl: "/raw/13-local-ai/edgeai-for-beginners/Workshop/ENV_CONFIGURATION.md"
sourceSha256: "91203cbe6a5fb36f71fc0f402a7fad2e3ab83f4b794b496b745f664601ce7e77"
pageSha256: "91203cbe6a5fb36f71fc0f402a7fad2e3ab83f4b794b496b745f664601ce7e77"
contentMode: "local-full"
zh: ""
---

# Environment Configuration Guide

## Overview

The Workshop samples use environment variables for configuration, centralized in the `.env` file at the repository root. This allows easy customization without modifying code.

## Quick Start

### 1. Verify Prerequisites

```bash
# Check Foundry Local is installed
foundry --version

# Check service is running
foundry service status

# Load a model
foundry model run phi-4-mini
```

### 2. Configure Environment

The `.env` file is already configured with sensible defaults. Most users won't need to change anything.

**Optional**: Review and customize settings:
```bash
# Edit .env file
notepad .env  # Windows
nano .env     # macOS/Linux
```

### 3. Apply Configuration

**For Python Scripts:**
```bash
cd Workshop/samples
python -m session01.chat_bootstrap "Your question here"
# Environment variables automatically loaded
```

**For Notebooks:**
```python
# Restart kernel after .env changes
# Variables are loaded when cells execute
```

## Environment Variables Reference

### Core Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `FOUNDRY_LOCAL_ALIAS` | `phi-4-mini` | Default model for samples |
| `FOUNDRY_LOCAL_ENDPOINT` | (empty) | Override service endpoint |
| `PYTHONPATH` | Workshop paths | Python module search path |

**When to set FOUNDRY_LOCAL_ENDPOINT:**
- Remote Foundry Local instance
- Custom port configuration
- Development/production separation

**Example:**
```bash
# Local custom port
FOUNDRY_LOCAL_ENDPOINT=http://localhost:8000

# Remote instance
FOUNDRY_LOCAL_ENDPOINT=http://192.168.1.50:5273/v1
```

### Session-Specific Variables

#### Session 02: RAG Pipeline
| Variable | Default | Purpose |
|----------|---------|---------|
| `EMBED_MODEL` | `sentence-transformers/all-MiniLM-L6-v2` | Embedding model |
| `RAG_QUESTION` | Pre-configured | Test question |

#### Session 03: Benchmarking
| Variable | Default | Purpose |
|----------|---------|---------|
| `BENCH_MODELS` | `phi-4-mini,qwen2.5-0.5b` | Models to benchmark |
| `BENCH_ROUNDS` | `3` | Iterations per model |
| `BENCH_PROMPT` | Pre-configured | Test prompt |
| `BENCH_STREAM` | `0` | Measure first-token latency |

#### Session 04: Model Comparison
| Variable | Default | Purpose |
|----------|---------|---------|
| `SLM_ALIAS` | `phi-4-mini` | Small language model |
| `LLM_ALIAS` | `qwen2.5-7b` | Large language model |
| `COMPARE_PROMPT` | Pre-configured | Comparison prompt |
| `COMPARE_RETRIES` | `2` | Retry attempts |

#### Session 05: Multi-Agent Orchestration
| Variable | Default | Purpose |
|----------|---------|---------|
| `AGENT_MODEL_PRIMARY` | `phi-4-mini` | Researcher agent model |
| `AGENT_MODEL_EDITOR` | `phi-4-mini` | Editor agent model |
| `AGENT_QUESTION` | Pre-configured | Test question |

### Reliability Configuration

| Variable | Default | Purpose |
|----------|---------|---------|
| `SHOW_USAGE` | `1` | Print token usage |
| `RETRY_ON_FAIL` | `1` | Enable retry logic |
| `RETRY_BACKOFF` | `1.0` | Retry delay (seconds) |

## Common Configurations

### Development Setup (Fast Iteration)
```bash
FOUNDRY_LOCAL_ALIAS=phi-4-mini
SLM_ALIAS=phi-4-mini
LLM_ALIAS=phi-4-mini
BENCH_MODELS=phi-4-mini
SHOW_USAGE=1
```

### Production Setup (Quality Focus)
```bash
FOUNDRY_LOCAL_ALIAS=phi-4-mini
SLM_ALIAS=phi-4-mini
LLM_ALIAS=qwen2.5-7b
AGENT_MODEL_PRIMARY=phi-4-mini
AGENT_MODEL_EDITOR=qwen2.5-7b
SHOW_USAGE=0
```

### Benchmarking Setup
```bash
BENCH_MODELS=phi-4-mini,qwen2.5-0.5b,qwen2.5-7b
BENCH_ROUNDS=5
BENCH_STREAM=1
```

### Multi-Agent Specialization
```bash
AGENT_MODEL_PRIMARY=phi-4-mini        # Fast for research
AGENT_MODEL_EDITOR=qwen2.5-7b         # Quality for editing
```

### Remote Development
```bash
FOUNDRY_LOCAL_ENDPOINT=http://dev-server.local:5273/v1
FOUNDRY_LOCAL_ALIAS=phi-4-mini
```

## Recommended Models

### By Use Case

**General Purpose:**
- `phi-4-mini` - Balanced quality and speed

**Fast Responses:**
- `qwen2.5-0.5b` - Very fast, good for classification
- `phi-4-mini` - Fast with good quality

**High Quality:**
- `qwen2.5-7b` - Best quality, higher resource usage
- `phi-4-mini` - Good quality, lower resources

**Code Generation:**
- `deepseek-coder-1.3b` - Specialized for code
- `phi-4-mini` - General purpose coding

### By Resource Availability

**Low Resources (< 8GB RAM):**
```bash
FOUNDRY_LOCAL_ALIAS=qwen2.5-0.5b
SLM_ALIAS=qwen2.5-0.5b
LLM_ALIAS=phi-4-mini
```

**Medium Resources (8-16GB RAM):**
```bash
FOUNDRY_LOCAL_ALIAS=phi-4-mini
SLM_ALIAS=phi-4-mini
LLM_ALIAS=qwen2.5-7b
```

**High Resources (16GB+ RAM):**
```bash
FOUNDRY_LOCAL_ALIAS=qwen2.5-7b
SLM_ALIAS=phi-4-mini
LLM_ALIAS=qwen2.5-14b
```

## Advanced Configuration

### Custom Endpoints

```bash
# Development environment
FOUNDRY_LOCAL_ENDPOINT=http://localhost:8000

# Staging environment
FOUNDRY_LOCAL_ENDPOINT=http://staging.internal:5273/v1

# Production environment
FOUNDRY_LOCAL_ENDPOINT=http://prod.internal:5273/v1
```

### Temperature & Sampling (Override in Code)

```python
# In your scripts/notebooks
os.environ['TEMPERATURE'] = '0.7'
os.environ['TOP_P'] = '0.9'
```

### Azure OpenAI Hybrid Setup

```bash
# Use local for development
FOUNDRY_LOCAL_ALIAS=phi-4-mini

# Configure Azure for production fallback
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
AZURE_OPENAI_API_KEY=your-key-here
AZURE_OPENAI_API_VERSION=2024-08-01-preview
```

## Troubleshooting

### Environment Variables Not Loaded

**Symptoms:**
- Scripts use wrong models
- Connection errors
- Variables not recognized

**Solutions:**
```bash
# 1. Verify .env exists in repository root
ls -la .env  # macOS/Linux
dir .env     # Windows

# 2. Check file is not .env.txt (Windows)
# Ensure no hidden extension

# 3. For notebooks: Restart kernel
# Kernel > Restart

# 4. For scripts: Check working directory
pwd  # Should be in Workshop or repository root
```

### Service Connection Issues

**Symptoms:**
- "Connection refused" errors
- "Service not available"
- Timeout errors

**Solutions:**
```bash
# 1. Check service status
foundry service status

# 2. Start if not running
foundry service start

# 3. Verify endpoint
# Check port in status output
foundry service status | grep "Port"

# 4. Update .env if needed
FOUNDRY_LOCAL_ENDPOINT=http://localhost:<port>
```

### Model Not Found

**Symptoms:**
- "Model not found" errors
- "Alias not recognized"

**Solutions:**
```bash
# 1. List available models
foundry model list

# 2. Load required model
foundry model run phi-4-mini

# 3. Update .env with available model
