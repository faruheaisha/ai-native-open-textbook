---
title: "Lab 2: Model Providers and Configuration"
sourceId: "08-agents/strands-agents-course"
sourceTitle: "Strands Agents 课程（AWS）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/aws-samples/sample-getting-started-with-strands-agents-course"
entryUrl: "https://github.com/aws-samples/sample-getting-started-with-strands-agents-course/blob/6f0b46cd565312a34cdb9a6c72cbff7f3fa80c1d/course-2/Lab2/README.md"
sourceRel: "course-2/Lab2/README.md"
rawUrl: "/raw/08-agents/strands-agents-course/course-2/Lab2/README.md"
sourceSha256: "0bfd8e2907d59ab0590bba40fc845bb56a423b19e7a36fa0db6fe83154a7e74e"
pageSha256: "0bfd8e2907d59ab0590bba40fc845bb56a423b19e7a36fa0db6fe83154a7e74e"
contentMode: "local-full"
zh: ""
---

# Lab 2: Model Providers and Configuration

**Duration:** 11:59 | **Files:** `anthropic_model.py`, `bedrock_model.py`, `ollama_model.py`, `openai_model.py`

## What You'll Learn
- Configure agents with multiple LLM providers (Anthropic, Bedrock, OpenAI, Ollama)
- Understand model-specific parameters and capabilities
- Compare structured output and thinking mode features
- Analyze metrics and performance across providers

## Quick Start
```bash
# Anthropic Claude (requires ANTHROPIC_API_KEY)
python anthropic_model.py

# Amazon Bedrock (requires AWS credentials)
python bedrock_model.py

# OpenAI (requires OPENAI_API_KEY)
python openai_model.py

# Local Ollama (requires Ollama installation)
python ollama_model.py
```

## Key Concepts
- **Provider Flexibility**: Switch between cloud and local models
- **Model Parameters**: Temperature, max tokens, thinking mode
- **Structured Output**: JSON response formatting
- **Cost Optimization**: Choose models based on use case

## Requirements
- `ANTHROPIC_API_KEY` (primary)
- AWS credentials (for Bedrock)
- `OPENAI_API_KEY` (optional)
- Ollama installation (for local models)
