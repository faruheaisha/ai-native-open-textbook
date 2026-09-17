---
title: "Week 1 assessment — career chatbot extension"
sourceId: "08-agents/ed-donner-agents"
sourceTitle: "Ed Donner：AI Agents 实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/agents"
entryUrl: "https://github.com/ed-donner/agents/blob/8ceaf66c24643627c1e4806851736bdd444bdd4b/1_foundations/community_contributions/mac_week1_assessment/README.md"
sourceRel: "1_foundations/community_contributions/mac_week1_assessment/README.md"
rawUrl: "/raw/08-agents/ed-donner-agents/1_foundations/community_contributions/mac_week1_assessment/README.md"
sourceSha256: "4b710663fdfcf9ea8a68e84d919681977c5492e6268d29b4bd5f05f1633398a7"
pageSha256: "4b710663fdfcf9ea8a68e84d919681977c5492e6268d29b4bd5f05f1633398a7"
contentMode: "local-full"
zh: ""
---

# Week 1 assessment — career chatbot extension

This folder submits the **Week 1 Lab 4 exercise** (and ties in patterns from Labs 3–4):

| Requirement | Implementation |
|-------------|----------------|
| Tool use + agent loop | `lookup_faq`, `record_user_details`, `record_unknown_question` with a `while` loop until the model finishes (no dangling tool calls). |
| FAQ / knowledge base | SQLite file `faq_assessment.db` (auto-created with seed rows; extend or replace in code). `lookup_faq` matches the user question to stored Q&A via a small structured LLM step. |
| Evaluator + retry | Pydantic `Evaluation` via `parse`; one automatic retry if the reply fails the check (Lab 3 pattern). |
| Optional Pushover | Same env vars as the course (`PUSHOVER_USER`, `PUSHOVER_TOKEN`); no-op print if unset. |

## Run locally

From the **repository root** (where `.venv` lives):

```bash
uv run python 1_foundations/community_contributions/mac_week1_assessment/week1_career_assessment.py
```

Put your **`1_foundations/me/linkedin.pdf`** and **`1_foundations/me/summary.txt`** in place (replace Ed’s samples with your own for a real deployment).

Set `OPENAI_API_KEY` in `.env`. Personalize `self.name` in `CareerBot.__init__` in `week1_career_assessment.py` before opening a PR.

## PR to the course repo

Fork [ed-donner/agents](https://github.com/ed-donner/agents), push your branch to **your fork**, then open a pull request against `ed-donner/agents` `main` with only your `community_contributions/...` folder (as in the course resources).
