---
title: "HALI (this Space)"
sourceId: "08-agents/ed-donner-agents"
sourceTitle: "Ed Donner：AI Agents 实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/agents"
entryUrl: "https://github.com/ed-donner/agents/blob/8ceaf66c24643627c1e4806851736bdd444bdd4b/1_foundations/community_contributions/stellaoiro/README.md"
sourceRel: "1_foundations/community_contributions/stellaoiro/README.md"
rawUrl: "/raw/08-agents/ed-donner-agents/1_foundations/community_contributions/stellaoiro/README.md"
sourceSha256: "49ce7daa555db74a1d9deb7a714a97a99c81f471556e9f9dbff4b62637be81b5"
pageSha256: "49ce7daa555db74a1d9deb7a714a97a99c81f471556e9f9dbff4b62637be81b5"
contentMode: "local-full"
zh: ""
---

# HALI (this Space)

HPV vaccine companion for Kenya — see `app.py` and `4_lab4_mama_salama.ipynb`.

**Live:** [huggingface.co/spaces/AcharO/hali-hpv-kenya](https://huggingface.co/spaces/AcharO/hali-hpv-kenya)

---

## Week 1 Lab 3 — career chat (separate Space)

**Live Space:** [huggingface.co/spaces/AcharO/digital-twin-lab3](https://huggingface.co/spaces/AcharO/digital-twin-lab3)

Redeploy / refresh files from this folder using `hf upload` (see `README_SPACE_lab3.md` + `requirements-space.txt` as the Space `README.md` / `requirements.txt`).

To share the LinkedIn PDF + summary chatbot with evaluator-rerun on Hugging Face, create **another** Space (Gradio, blank template) and upload:

- `lab3_career_chat.py` (set as the app file in README or Space settings)
- `me/summary.txt` and **your** `me/linkedin.pdf` (LinkedIn → Profile → More → Save to PDF). It is **gitignored** here so the instructor’s sample PDF is not committed; upload your own file to the Space.
- `requirements.txt` (must include `openai`, `gradio`, `python-dotenv`, `pydantic`, `pypdf`)

**Space secrets:** add `OPENAI_API_KEY`. Optionally add `GOOGLE_API_KEY` so the evaluator uses Gemini like the course notebook; otherwise evaluation uses `gpt-4o-mini`.

**README frontmatter for that Space:**

```yaml
---
title: your-career-twin-lab3
app_file: lab3_career_chat.py
sdk: gradio
sdk_version: 5.49.1
---
```

Local quick share (Gradio tunnel): `python lab3_career_chat.py` with `share=True` if you temporarily add it to `launch()`, or use the notebook `3_lab3_career_twin.ipynb`.
