---
title: "Skill: Ollama & llama.cpp: Running Models Locally"
sourceId: "01-foundations/ai-engineering-lab"
sourceTitle: "AI Engineering Lab（24 周自学课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/zorost/AI-Engineering-Lab"
entryUrl: "https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/reference/skills/ollama-llamacpp.md"
sourceRel: "reference/skills/ollama-llamacpp.md"
rawUrl: "/raw/01-foundations/ai-engineering-lab/reference/skills/ollama-llamacpp.md"
sourceSha256: "4c0fa2bd619dd31abdc6722961a48dd998659f63053e4fc1b5787e41cb878e71"
pageSha256: "4c0fa2bd619dd31abdc6722961a48dd998659f63053e4fc1b5787e41cb878e71"
contentMode: "local-full"
zh: ""
---

# Skill: Ollama & llama.cpp: Running Models Locally

> Part of AI Engineering Lab · Developed by Zorost Intelligence AI Lab · https://zorost.com
> Skill for: **Week 8** (Open Models & Local Inference) · also used in Weeks 9, 10, 17

| | |
|---|---|
| What it is | The two workhorses of local inference: **Ollama** (the friendly model manager + API) and **llama.cpp** (the engine underneath, GGUF quantized models) |
| Best for | Running open models offline, on a laptop or a homelab box, with zero cloud bills |
| Requirements | macOS / Linux / Windows; no GPU required (CPU works, GPU is faster) |
| Cost | Free (open source) |

---

## What it is

**Ollama** wraps llama.cpp in a daemon that manages models, exposes an
OpenAI-compatible REST API on `http://localhost:11434`, and makes "download a
model" a one-liner. **llama.cpp** is the raw C/C++ inference engine, more
control, more flags, more patience. LM Studio (GUI) and Apple MLX (Apple
Silicon-native) sit alongside; see the knowledge base for comparisons
([knowledge-base/08](/lib/01-foundations/ai-engineering-lab/reference-knowledge-base-08-local-inference-gpu)).

> **Verify against live docs.** Model tags (`qwen2.5:3b`, `llama3.2:3b`, etc.) rotate as
> publishers ship new releases, and the quantization ladder's exact names shift. Treat every
> specific tag and quant name here as "correct at time of writing", `ollama search <term>`
> and the Hugging Face model card are the source of truth for what exists *today*.

## Install & first run

### Ollama

```bash
# macOS / Linux / Windows, install from https://ollama.com/download
ollama pull qwen2.5:3b        # ~2 GB download, runs on CPU
ollama run qwen2.5:3b         # interactive chat, /bye to quit
ollama list                   # what you have locally
```

Useful model tags: `qwen2.5:3b`, `llama3.2:3b`, `phi4-mini`, `gemma3:4b`,
`deepseek-r1:7b`: small first, measure, then size up. (Model names change
often; `ollama search <term>` shows what's current.)

### llama.cpp

```bash
git clone https://github.com/ggml-org/llama.cpp && cd llama.cpp
cmake -B build && cmake --build build --config Release -j
