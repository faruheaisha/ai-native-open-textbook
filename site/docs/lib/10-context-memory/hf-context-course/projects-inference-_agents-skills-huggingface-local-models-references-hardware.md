---
title: "The Context Course"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/inference/.agents/skills/huggingface-local-models/references/hardware.md"
sourceRel: "projects/inference/.agents/skills/huggingface-local-models/references/hardware.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/inference/.agents/skills/huggingface-local-models/references/hardware.md"
sourceSha256: "3925d6fe4fd12d425a57588a40480fbb506fe931ca6de010ccebea10ea137bd6"
pageSha256: "3925d6fe4fd12d425a57588a40480fbb506fe931ca6de010ccebea10ea137bd6"
contentMode: "local-full"
zh: ""
---

# The Context Course

## Hardware Acceleration

### Apple Silicon (Metal)

```bash
make clean && make GGML_METAL=1
llama-cli -m model.gguf -ngl 99 -p "Hello"
```

### NVIDIA (CUDA)

```bash
make clean && make GGML_CUDA=1
llama-cli -m model.gguf -ngl 35 -p "Hello"

# Hybrid for large models
llama-cli -m llama-70b.Q4_K_M.gguf -ngl 20

# Multi-GPU split
llama-cli -m large-model.gguf --tensor-split 0.5,0.5 -ngl 60
```

### AMD (ROCm)

```bash
make LLAMA_HIP=1
llama-cli -m model.gguf -ngl 999
```

### CPU

```bash
# Match physical cores, not logical threads
llama-cli -m model.gguf -t 8 -p "Hello"

# BLAS acceleration
make LLAMA_OPENBLAS=1
```
