---
title: "08, Local Inference & GPUs: Running Models on Your Own Hardware"
sourceId: "01-foundations/ai-engineering-lab"
sourceTitle: "AI Engineering Lab（24 周自学课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/zorost/AI-Engineering-Lab"
entryUrl: "https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/reference/knowledge-base/08-local-inference-gpu.md"
sourceRel: "reference/knowledge-base/08-local-inference-gpu.md"
rawUrl: "/raw/01-foundations/ai-engineering-lab/reference/knowledge-base/08-local-inference-gpu.md"
sourceSha256: "761bd072ccc69ab4d2c8cc4dc5b5ece6349c4065f03481303e91df36fd9d0a2e"
pageSha256: "761bd072ccc69ab4d2c8cc4dc5b5ece6349c4065f03481303e91df36fd9d0a2e"
contentMode: "local-full"
zh: ""
---

# 08, Local Inference & GPUs: Running Models on Your Own Hardware

**Purpose.** Run open models on a laptop with confidence, pick them by license and VRAM, operate the local stack (Ollama, llama.cpp, LM Studio, MLX), verify your GPU actually works, and do it all offline when privacy demands it.

Part of AI Engineering Lab · Developed by Zorost Intelligence AI Lab · [zorost.com](https://zorost.com)

---

## 1. Open vs closed models: and what "open" actually means

- **Closed models** (e.g. the flagship GPT, Claude, Gemini tiers) are served through an API only. You never see the weights; you rent access. They are often the strongest out of the box, but you cannot self-host, inspect, modify, or guarantee where your data goes.
- **Open-weight models** publish the trained weights (and usually the architecture and tokenizer) so you can download, run, quantize, and fine-tune them yourself. The catch: **open weights are not automatically "open source" in the OSI sense**, the license, not the download button, decides what you may legally do.

The practical decision is three questions, in order:

1. **Do I need to self-host** (privacy, air-gap, cost, latency, offline)? If yes, you need an open-weight model.
2. **Is the license compatible** with my use (commercial product? redistribution? fine-tuning?)? Read it, see the table below.
3. **Does a small-enough model do the task** on my hardware? If a 70B is required and I have an 8 GB GPU, the open model is moot.
