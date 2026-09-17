---
title: "Session 5: Build AI-Powered Agents Fast with Foundry Local"
sourceId: "13-local-ai/edgeai-for-beginners"
sourceTitle: "EdgeAI for Beginners"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "13-local-ai"
sourceUrl: "https://github.com/microsoft/edgeai-for-beginners"
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/Session05-AIPoweredAgents.md"
sourceRel: "Workshop/Session05-AIPoweredAgents.md"
rawUrl: "/raw/13-local-ai/edgeai-for-beginners/Workshop/Session05-AIPoweredAgents.md"
sourceSha256: "7a040cb7fa791920961af90334af247d58b3d951a14a4c94d5e16d23e74bf78e"
pageSha256: "7a040cb7fa791920961af90334af247d58b3d951a14a4c94d5e16d23e74bf78e"
contentMode: "local-full"
zh: ""
---

# Session 5: Build AI-Powered Agents Fast with Foundry Local

## Abstract

Design and orchestrate multi-role AI agents leveraging Foundry Local’s low-latency, privacy-preserving runtime. You’ll define agent roles, memory strategies, tool invocation patterns, and execution graphs. The session introduces scaffolding patterns you can extend with Chainlit or LangGraph. Starter project extends the existing agent architecture sample to add memory persistence + evaluation hooks.

## Learning Objectives

- **Define Roles**: System prompts & capability boundaries
- **Implement Memory**: Short-term (conversation), long-term (vector / file), ephemeral scratchpads
- **Scaffold Workflows**: Sequential, branching, and parallel agent steps
- **Integrate Tools**: Lightweight function tool calling pattern
- **Evaluate**: Basic trace + rubric-driven outcome scoring

## Prerequisites

- Sessions 1–4 completed
- Python with `foundry-local-sdk`, `openai`, optional `chainlit`
- Local models running (at least `phi-4-mini`)

### Cross-Platform Environment Snippet

Windows:
```powershell
py -m venv .venv
 .\.venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install foundry-local-sdk openai
```

macOS:
```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install foundry-local-sdk openai
```

If running agents from macOS against a remote Windows host service:
```bash
