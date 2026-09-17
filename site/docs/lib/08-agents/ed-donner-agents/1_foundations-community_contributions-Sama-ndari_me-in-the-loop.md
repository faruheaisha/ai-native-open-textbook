---
title: "Personal AI Clone (Week 1)"
sourceId: "08-agents/ed-donner-agents"
sourceTitle: "Ed Donner：AI Agents 实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/agents"
entryUrl: "https://github.com/ed-donner/agents/blob/8ceaf66c24643627c1e4806851736bdd444bdd4b/1_foundations/community_contributions/Sama-ndari_me-in-the-loop/README.md"
sourceRel: "1_foundations/community_contributions/Sama-ndari_me-in-the-loop/README.md"
rawUrl: "/raw/08-agents/ed-donner-agents/1_foundations/community_contributions/Sama-ndari_me-in-the-loop/README.md"
sourceSha256: "f6659294de8a93dc781acf4ecb1281a5336b8fdc9512842248fcea8edb837663"
pageSha256: "f6659294de8a93dc781acf4ecb1281a5336b8fdc9512842248fcea8edb837663"
contentMode: "local-full"
zh: ""
---

# Personal AI Clone (Week 1)

Digital twin chatbot with document context + OpenAI tool calling + Gradio + Pushover.

Week 1 patterns: load local files into a system prompt, function tools, Gradio chat UI.

## What it does

- Answers from files you place in `me/` (PDF, DOCX) and optional URLs in `me/links.txt`
- Tools: `record_user_details`, `record_unknown_question` (Pushover when configured)
- Gradio UI (`app.py`) and walkthrough notebook (`personal_ai_clone.ipynb`)

## Knowledge files (not in this PR)

Large resume/brain binaries are kept out of the course repo (Ed’s size guidance).

Add your own docs under `me/`, or download sample files from the full project:

https://github.com/Sama-ndari/personal-ai-clone

Expected layout:

```
me/
  resume.pdf          # optional — your CV
  AI-CLONE-BRAIN.docx # optional — Q&A / biography
  links.txt           # optional — URLs to scrape
  summary.md          # tiny demo context (included)
```

## Setup

Use the course `uv` environment from the repo root (preferred). Then:

```bash
cd 1_foundations/community_contributions/Sama-ndari_me-in-the-loop
```

Create `.env` (do not commit):

```
OPENAI_API_KEY=your_key
PUSHOVER_USER=optional
PUSHOVER_TOKEN=optional
```

## Run

```bash
python app.py
```

Or open `personal_ai_clone.ipynb` and run the cells.

Full project: https://github.com/Sama-ndari/personal-ai-clone

## Author

[Sama-ndari](https://github.com/Sama-ndari) — https://www.samandari.dev
