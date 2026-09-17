---
title: "MCP-RL: Train AI Agents to Master MCP Servers with Reinforcement Learning"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/art_mcp_rl/README.md"
sourceRel: "art_mcp_rl/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/art_mcp_rl/README.md"
sourceSha256: "a9bfefb044604a8c8f83d87b54af69c2c858a7b3c2fa905ab64a9c0609f6cb60"
pageSha256: "a9bfefb044604a8c8f83d87b54af69c2c858a7b3c2fa905ab64a9c0609f6cb60"
contentMode: "local-full"
zh: ""
---

# MCP-RL: Train AI Agents to Master MCP Servers with Reinforcement Learning

In this tutorial, we train an LLM agent to become an expert at using an MCP (Model Context Protocol) server through reinforcement learning. Instead of just connecting a model to tools and hoping it figures things out, we use [OpenPipe's ART framework](https://github.com/OpenPipe/ART) to let the model practice using those tools thousands of times. This way it learns which strategies work and which don't.

A small 3B model learns to explore database schemas, write correct SQL JOINs, and answer multi-step questions. Skills it never had out of the box.

## What We're Building

- A custom MCP server (FastMCP + SQLite) with a company database containing departments, employees, and projects
- A full MCP-RL training pipeline using ART (Agent Reinforcement Trainer) and GRPO
- RULER for automatic reward scoring — no hand-labeled data needed
- A trained agent that reliably chains multiple tools to answer complex database questions

## Tech Stack

- [OpenPipe ART](https://github.com/OpenPipe/ART): RL framework for training LLM agents with GRPO
- [RULER](https://art.openpipe.ai/features/ruler): LLM-as-judge for automatic reward scoring
- Qwen 2.5 3B Instruct base model for RL fine-tuning

## The MCP Server

`mcp_server.py` spins up a local MCP server with 3 tables and 3 tools:

| Tool | Description |
|------|-------------|
| `list_tables()` | Discover available tables |
| `describe_table(table_name)` | Get schema and column info |
| `run_query(sql)` | Execute read-only SELECT queries |

The database contains interconnected company data (departments, employees, projects) that forces the agent to learn multi-step reasoning, exploring schemas before writing queries, using JOINs across tables, and handling errors gracefully.

## Getting Started

### Prerequisites

- Google Colab with T4 GPU (or any environment with 16GB+ VRAM)
- OpenRouter API key (for scenario generation and RULER evaluation)

### Setup

1. **Set your API key** in the notebook:
```python
import os
os.environ["OPENROUTER_API_KEY"] = "your-key-here"
```

2. **Run the notebook**: It handles all installation, server startup, and training.

## How It Works

1. MCP Server runs locally with a SQLite database
2. ART generates training scenarios that are diverse database questions of varying complexity
3. The agent attempts each scenario multiple times (rollouts), interacting with the MCP server
4. RULER scores each attempt by comparing trajectories without requirinf any labeled data
5. GRPO updates the model weights reinforcing good strategies, suppressing bad ones
6. At each repetition the agent gets progressively better at tool use

## Tips for better results

- Enrich tool descriptions with actual schema info before generating scenarios, otherwise the generator LLM has a risk of hallucinating fake table names
- T4 GPU note: Use `float16` instead of `bf16`, and keep `max_seq_length` at 4096-8192
- If the model hallucinates errors, strengthen the system prompt to explicitly say the database is working and tools should always be used
- Increase rollouts (6-8) if RULER scores show no variance. GRPO needs differentiated scores to learn

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
