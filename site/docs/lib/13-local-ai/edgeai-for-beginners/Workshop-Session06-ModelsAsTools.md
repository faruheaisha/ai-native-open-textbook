---
title: "Session 6: Foundry Local – Models as Tools"
sourceId: "13-local-ai/edgeai-for-beginners"
sourceTitle: "EdgeAI for Beginners"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "13-local-ai"
sourceUrl: "https://github.com/microsoft/edgeai-for-beginners"
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/Session06-ModelsAsTools.md"
sourceRel: "Workshop/Session06-ModelsAsTools.md"
rawUrl: "/raw/13-local-ai/edgeai-for-beginners/Workshop/Session06-ModelsAsTools.md"
sourceSha256: "dcf8f94175492efbc0f3240a467b114ee257cb48a4d4906a476329ca25917041"
pageSha256: "dcf8f94175492efbc0f3240a467b114ee257cb48a4d4906a476329ca25917041"
contentMode: "local-full"
zh: ""
---

# Session 6: Foundry Local – Models as Tools

## Abstract

Treat models as composable tools inside a local AI operating layer. This session shows how to chain multiple specialized SLM/LLM calls, selectively route tasks, and expose a unified SDK surface to applications. You will build a lightweight model router + task planner, integrate it into an app script, and outline the scaling path to Azure AI Foundry for production workloads.

## Learning Objectives

- **Conceptualize** models as atomic tools with declared capabilities
- **Route** requests based on intent / heuristic scoring
- **Chain** outputs across multi-step tasks (decompose → solve → refine)
- **Integrate** a unified client API for downstream applications
- **Scale** design to cloud (same OpenAI-compatible contract)

## Prerequisites

- Sessions 1–5 completed
- Multiple local models cached (e.g., `phi-4-mini`, `deepseek-coder-1.3b`, `qwen2.5-0.5b`)

### Cross-Platform Environment Snippet

Windows PowerShell:
```powershell
py -m venv .venv
 .\.venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install foundry-local-sdk openai
```

macOS / Linux:
```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install foundry-local-sdk openai
```

Remote/VM service access from macOS:
```bash
