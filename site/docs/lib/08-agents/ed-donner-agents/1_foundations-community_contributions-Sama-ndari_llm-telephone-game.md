---
title: "LLM Telephone Game (Week 1)"
sourceId: "08-agents/ed-donner-agents"
sourceTitle: "Ed Donner：AI Agents 实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/agents"
entryUrl: "https://github.com/ed-donner/agents/blob/8ceaf66c24643627c1e4806851736bdd444bdd4b/1_foundations/community_contributions/Sama-ndari_llm-telephone-game/README.md"
sourceRel: "1_foundations/community_contributions/Sama-ndari_llm-telephone-game/README.md"
rawUrl: "/raw/08-agents/ed-donner-agents/1_foundations/community_contributions/Sama-ndari_llm-telephone-game/README.md"
sourceSha256: "45f8b958f2504141418a4609e8da811ee79482f568ffcb70f179000add8ac3c9"
pageSha256: "45f8b958f2504141418a4609e8da811ee79482f568ffcb70f179000add8ac3c9"
contentMode: "local-full"
zh: ""
---

# LLM Telephone Game (Week 1)

Semantic drift experiment: pass one message through a chain of LLMs and measure how meaning degrades.

Week 1 foundations contribution — multi-model calling + LLM-as-judge + embedding similarity.

## Chain

GPT-4o → Claude → Gemini → DeepSeek → Mixtral/Groq → Llama (Ollama local)

## Features

- Universal API wrapper (OpenAI, Anthropic, Google, Groq/DeepSeek, Ollama)
- Strict "repeater" system prompts
- Quantitative score: cosine similarity (SentenceTransformers)
- Qualitative score: GPT-4o judge (mutation / hallucination)
- Matplotlib drift chart

## Setup

```bash
cd 1_foundations/community_contributions/Sama-ndari_llm-telephone-game
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Create `.env` (do not commit):

```
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...
GOOGLE_API_KEY=...
# optional: GROQ / DeepSeek / local Ollama
```

Optional: run Ollama locally for the last hop (`ollama pull llama3`).

## Run

Open `llm_telephone_game.ipynb` and run all cells.

## Author

[Sama-ndari](https://github.com/Sama-ndari) — https://www.samandari.dev  
Related repo: https://github.com/Sama-ndari/llm-semantic-drift-analysis
