---
title: "Gemini Polyglot Guardian (Week 1)"
sourceId: "08-agents/ed-donner-agents"
sourceTitle: "Ed Donner：AI Agents 实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/agents"
entryUrl: ""
zh: ""
---

# Gemini Polyglot Guardian (Week 1)

Concise LangGraph + Gemini content-safety notebook for multilingual text (incl. low-resource African languages).

Pipeline: language detect/translate → safety classify → optional cultural context → risk assess → Gradio UI.

## Setup

Use the course **uv** environment (no local `requirements.txt`). Set in `.env` (do not commit):

```
GEMINI_API_KEY=your_key
```

## Run

Open `gemini_polyglot_guardian.ipynb` and run all cells.

Full project (longer UI / more examples): https://github.com/Sama-ndari/gemini-polyglot-guardian

## Author

[Sama-ndari](https://github.com/Sama-ndari) — https://www.samandari.dev
