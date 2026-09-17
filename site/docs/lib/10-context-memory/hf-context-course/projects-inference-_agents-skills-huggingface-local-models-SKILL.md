---
title: "Hugging Face Local Models"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/inference/.agents/skills/huggingface-local-models/SKILL.md"
sourceRel: "projects/inference/.agents/skills/huggingface-local-models/SKILL.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/inference/.agents/skills/huggingface-local-models/SKILL.md"
sourceSha256: "4a8339aad60b8e515a83b712e8ceca04610b321f5b8fe13b414e74b4b2a0eb93"
pageSha256: "4a8339aad60b8e515a83b712e8ceca04610b321f5b8fe13b414e74b4b2a0eb93"
contentMode: "local-full"
zh: ""
---

# Hugging Face Local Models

Search the Hugging Face Hub for llama.cpp-compatible GGUF repos, choose the
right quant, and launch the model with `llama-cli` or `llama-server`.

## Default Workflow

1. Search the Hub with `apps=llama.cpp`.
2. Open `https://huggingface.co/<repo>?local-app=llama.cpp`.
3. Prefer the exact HF local-app snippet and quant recommendation when it is
   visible.
4. Confirm exact `.gguf` filenames with
   `https://huggingface.co/api/models/<repo>/tree/main?recursive=true`.
5. Launch with `llama-cli -hf <repo>:<QUANT>` or
   `llama-server -hf <repo>:<QUANT>`.
6. Fall back to `--hf-repo` plus `--hf-file` when the repo uses custom file
   naming.
7. Convert from Transformers weights only if the repo does not already expose
   GGUF files.

## Quick Start

### Install llama.cpp

```bash
brew install llama.cpp
winget install llama.cpp
```

```bash
git clone https://github.com/ggml-org/llama.cpp
cd llama.cpp
make
```

### Authenticate for gated repos

```bash
hf auth login
```

### Search the Hub

```text
https://huggingface.co/models?apps=llama.cpp&sort=trending
https://huggingface.co/models?search=Qwen3.6&apps=llama.cpp&sort=trending
https://huggingface.co/models?search=<term>&apps=llama.cpp&num_parameters=min:0,max:24B&sort=trending
```

### Run directly from the Hub

```bash
llama-cli -hf unsloth/Qwen3.6-35B-A3B-GGUF:UD-Q4_K_M
llama-server -hf unsloth/Qwen3.6-35B-A3B-GGUF:UD-Q4_K_M
```

### Run an exact GGUF file

```bash
llama-server \
    --hf-repo unsloth/Qwen3.6-35B-A3B-GGUF \
    --hf-file Qwen3.6-35B-A3B-UD-Q4_K_M.gguf \
    -c 4096
```

### Convert only when no GGUF is available

```bash
