---
title: "Workshop Samples - Quick Reference Card"
sourceId: "13-local-ai/edgeai-for-beginners"
sourceTitle: "EdgeAI for Beginners"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "13-local-ai"
sourceUrl: "https://github.com/microsoft/edgeai-for-beginners"
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/QUICK_REFERENCE.md"
sourceRel: "Workshop/QUICK_REFERENCE.md"
rawUrl: "/raw/13-local-ai/edgeai-for-beginners/Workshop/QUICK_REFERENCE.md"
sourceSha256: "650802c549238a44dc2d407f61c66e91e973a11baae41641e215c07301f0315d"
pageSha256: "650802c549238a44dc2d407f61c66e91e973a11baae41641e215c07301f0315d"
contentMode: "local-full"
zh: ""
---

# Workshop Samples - Quick Reference Card

**Last Updated**: October 8, 2025

---

## 🚀 Quick Start

```bash
# 1. Ensure Foundry Local is running
foundry service status
foundry model run phi-4-mini

# 2. Install dependencies
pip install -r Workshop/requirements.txt

# 3. Run a sample
cd Workshop/samples
python -m session01.chat_bootstrap "What is edge AI?"
```

---

## 📂 Sample Overview

| Session | Sample | Purpose | Time |
|---------|--------|---------|------|
| 01 | `chat_bootstrap.py` | Basic chat + streaming | ~30s |
| 02 | `rag_pipeline.py` | RAG with embeddings | ~45s |
| 02 | `rag_eval_ragas.py` | RAG evaluation | ~60s |
| 03 | `benchmark_oss_models.py` | Model benchmarking | ~2m |
| 04 | `model_compare.py` | SLM vs LLM | ~45s |
| 05 | `agents_orchestrator.py` | Multi-agent system | ~60s |
| 06 | `models_router.py` | Intent routing | ~45s |
| 06 | `models_pipeline.py` | Multi-step pipeline | ~60s |

---

## 🛠️ Environment Variables

### Essential
```bash
# Choose model
set FOUNDRY_LOCAL_ALIAS=phi-4-mini

# Override endpoint (optional)
set FOUNDRY_LOCAL_ENDPOINT=http://localhost:8000

# Show token usage
set SHOW_USAGE=1
```

### Session-Specific
```bash
# Session 02: RAG
set RAG_QUESTION="What is local inference?"
set EMBED_MODEL=sentence-transformers/all-MiniLM-L6-v2

# Session 03: Benchmarking
set BENCH_MODELS=phi-4-mini,qwen2.5-0.5b
set BENCH_ROUNDS=3
set BENCH_STREAM=1

# Session 04: Comparison
set SLM_ALIAS=phi-4-mini
set LLM_ALIAS=qwen2.5-7b

# Session 05: Agents
set AGENT_MODEL_PRIMARY=phi-4-mini
set AGENT_QUESTION="Why use edge AI?"

# Session 06: Pipeline
set PIPELINE_TASK="Your task here"
```

---

## ✅ Validation & Testing

```bash
# Validate syntax and imports
python scripts/validate_samples.py

# Validate specific session
python scripts/validate_samples.py --session 01

# Run smoke tests
python scripts/test_samples.py --quick

# Verbose testing
python scripts/test_samples.py --verbose
```

---

## 🐛 Troubleshooting

### Connection Error
```bash
# Check Foundry Local
foundry service status

# Start if needed
foundry service start
foundry model run phi-4-mini
```

### Import Error
```bash
# Install missing dependencies
pip install sentence-transformers ragas datasets

# Or install all
pip install -r Workshop/requirements.txt
```

### Model Not Found
```bash
# List available models
foundry model ls

# Download model
foundry model download phi-4-mini
```

### Slow Performance
```bash
# Use smaller model
set FOUNDRY_LOCAL_ALIAS=qwen2.5-0.5b

# Reduce benchmark rounds
set BENCH_ROUNDS=1
```

---

## 📖 Common Patterns

### Basic Chat
```python
from workshop_utils import chat_once

text, usage = chat_once(
    'phi-4-mini',
    messages=[{"role": "user", "content": "Hello"}],
    max_tokens=100,
    temperature=0.7
)
```

### Get Client
```python
from workshop_utils import get_client

manager, client, model_id = get_client(
    alias='phi-4-mini',
    endpoint=None  # Auto-detect
)
```

### Error Handling
```python
try:
    manager, client, model_id = get_client(alias)
except Exception as e:
    print(f"[ERROR] Failed: {e}")
    print("[INFO] Check: foundry service status")
    sys.exit(1)
```

### Streaming
```python
stream = client.chat.completions.create(
    model=model_id,
    messages=messages,
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

---

## 📊 Model Selection

| Model | Size | Best For | Speed |
|-------|------|----------|-------|
| `qwen2.5-0.5b` | 0.5B | Fast classification | ⚡⚡⚡ |
| `qwen2.5-coder-0.5b` | 0.5B | Quick code gen | ⚡⚡⚡ |
| `gemma-2-2b` | 2B | Creative writing | ⚡⚡ |
| `phi-3.5-mini` | 3.5B | Code, refactoring | ⚡⚡ |
| `phi-4-mini` | 4B | General, summary | ⚡⚡ |
| `qwen2.5-7b` | 7B | Complex reasoning | ⚡ |

---

## 🔗 Resources

- **SDK Docs**: https://github.com/microsoft/Foundry-Local/tree/main/sdk/python
- **Quick Ref**: `Workshop/FOUNDRY_SDK_QUICKREF.md`

---

## 💡 Tips

1. **Cache clients**: `workshop_utils` caches for you
2. **Use smaller models**: Start with `qwen2.5-0.5b` for testing
3. **Enable usage stats**: Set `SHOW_USAGE=1` to track tokens
4. **Batch processing**: Process multiple prompts sequentially
5. **Lower max_tokens**: Reduces latency for quick responses

---

## 🎯 Sample Workflows

### Test Everything
```bash
python scripts/validate_samples.py
python scripts/test_samples.py --quick
```

### Benchmark Models
```bash
cd samples
set BENCH_MODELS=phi-4-mini,qwen2.5-0.5b
set BENCH_ROUNDS=3
python -m session03.benchmark_oss_models
```

### RAG Pipeline
```bash
cd samples
set RAG_QUESTION="What is RAG?"
python -m session02.rag_pipeline
```

### Multi-Agent System
```bash
cd samples
set AGENT_QUESTION="Why edge AI for healthcare?"
python -m session05.agents_orchestrator
```

---

**Quick Help**: Run any sample with `--help` from the `samples` directory or check the docstring:
```bash
python -c "import session01.chat_bootstrap; help(session01.chat_bootstrap)"
```

---

**All samples updated October 2025 with Foundry Local SDK best practices** ✨
