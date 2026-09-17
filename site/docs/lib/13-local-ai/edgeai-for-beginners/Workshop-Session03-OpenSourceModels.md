---
title: "Session 3: Open-Source Models in Foundry Local"
sourceId: "13-local-ai/edgeai-for-beginners"
sourceTitle: "EdgeAI for Beginners"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "13-local-ai"
sourceUrl: "https://github.com/microsoft/edgeai-for-beginners"
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/Session03-OpenSourceModels.md"
sourceRel: "Workshop/Session03-OpenSourceModels.md"
rawUrl: "/raw/13-local-ai/edgeai-for-beginners/Workshop/Session03-OpenSourceModels.md"
sourceSha256: "0f694bf1c953d320fdc3aa82ff99110bebbacd5ff13d07c09b98b2b00ac0795f"
pageSha256: "0f694bf1c953d320fdc3aa82ff99110bebbacd5ff13d07c09b98b2b00ac0795f"
contentMode: "local-full"
zh: ""
---

# Session 3: Open-Source Models in Foundry Local

## Abstract

Discover how to bring Hugging Face and other open-source models into Foundry Local. Learn selection strategies, community contribution workflows, performance comparison methodology, and how to extend Foundry with custom model registrations. This session maps to the weekly "Model Mondays" exploration themes and equips you to evaluate and operationalize open-source models locally before scaling to Azure.

## Learning Objectives

By the end you will be able to:

- **Discover & Evaluate**: Identify candidate models (mistral, gemma, qwen, deepseek) using quality vs resource trade-offs.
- **Load & Run**: Use Foundry Local CLI to download, cache, and launch community models.
- **Benchmark**: Apply consistent latency + token throughput + quality heuristics.
- **Extend**: Register or adapt a custom model wrapper following SDK-compatible patterns.
- **Compare**: Produce structured comparisons for SLM vs mid-size LLM selection decisions.

## Prerequisites

- Sessions 1 & 2 completed
- Python environment with `foundry-local-sdk` installed
- At least 15GB free disk for multiple model caches

### Cross-Platform Environment Quick Start

Windows PowerShell:
```powershell
py -m venv .venv
 .\.venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install foundry-local-sdk openai numpy
```

macOS / Linux:
```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install foundry-local-sdk openai numpy
```

When benchmarking from macOS against a Windows host service, set:
```bash
