---
title: "Session 4: Explore Cutting-Edge Models – LLMs, SLMs & On-Device Inference"
sourceId: "13-local-ai/edgeai-for-beginners"
sourceTitle: "EdgeAI for Beginners"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "13-local-ai"
sourceUrl: "https://github.com/microsoft/edgeai-for-beginners"
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/Session04-CuttingEdgeModels.md"
sourceRel: "Workshop/Session04-CuttingEdgeModels.md"
rawUrl: "/raw/13-local-ai/edgeai-for-beginners/Workshop/Session04-CuttingEdgeModels.md"
sourceSha256: "5dc93038b2d502502cda428e5887aa0feb83e970da398ff06556e2a02926869f"
pageSha256: "5dc93038b2d502502cda428e5887aa0feb83e970da398ff06556e2a02926869f"
contentMode: "local-full"
zh: ""
---

# Session 4: Explore Cutting-Edge Models – LLMs, SLMs & On-Device Inference

## Abstract

Compare Large Language Models (LLMs) and Small Language Models (SLMs) for local vs cloud inference scenarios. Learn deployment patterns leveraging ONNX Runtime acceleration, WebGPU execution, and hybrid RAG experiences. Includes a Chainlit RAG demo with a local model plus an optional OpenWebUI exploration. You will adapt a WebGPU inference starter and evaluate Phi vs GPT-OSS-20B capability & cost/perf trade-offs.

## Learning Objectives

- **Contrast** SLM vs LLM on latency, memory, quality axes
- **Deploy** models with ONNXRuntime and (where supported) WebGPU
- **Run** browser-based inference (privacy-preserving interactive demo)
- **Integrate** a Chainlit RAG pipeline with a local SLM backend
- **Evaluate** using lightweight quality + cost heuristics

## Prerequisites

- Sessions 1–3 completed
- `chainlit` installed (already in `requirements.txt` for Module08)
- WebGPU-capable browser (Edge / Chrome latest on Windows 11)
- Foundry Local running (`foundry service status`)

### Cross-Platform Notes

Windows remains the primary target environment. For macOS developers awaiting native binaries:
1. Run Foundry Local in a Windows 11 VM (Parallels / UTM) OR a remote Windows workstation.
2. Expose the service (default port 5273) and set on macOS:
```bash
