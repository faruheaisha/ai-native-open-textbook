---
title: "AG2 Adaptive Research Team"
sourceId: "08-agents/awesome-llm-apps"
sourceTitle: "Awesome LLM Apps"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps"
entryUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps/blob/9848ec842c5f559ad42654288cc6a38db6b175fb/advanced_ai_agents/multi_agent_apps/agent_teams/ag2_adaptive_research_team/README.md"
sourceRel: "advanced_ai_agents/multi_agent_apps/agent_teams/ag2_adaptive_research_team/README.md"
rawUrl: "/raw/08-agents/awesome-llm-apps/advanced_ai_agents/multi_agent_apps/agent_teams/ag2_adaptive_research_team/README.md"
sourceSha256: "80a7a6a7317e91e6fa60920bab2afdf3366c2c60fc3064d8317ecfb74deaa871"
pageSha256: "80a7a6a7317e91e6fa60920bab2afdf3366c2c60fc3064d8317ecfb74deaa871"
contentMode: "local-full"
zh: ""
---

# AG2 Adaptive Research Team

A Streamlit app that blends agent teamwork with agent-enabled routing and fallback, built entirely on AG2.

## What This Shows

- **Agent teamwork**: explicit roles and sequential handoffs
- **Agent-enabled routing**: a clear decision step with local-doc vs web fallback
- **AG2-first implementation**: no Microsoft AutoGen dependency; installs via `ag2[openai]`

## Features

- Local document upload (PDF, TXT, MD)
- Routing decision based on document coverage
- Optional web fallback via SearxNG
- Verifier step to check evidence sufficiency
- Final synthesis with citations

## How To Run

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Run the app:

```bash
streamlit run app.py
```

3. Provide your OpenAI API key in the sidebar and ask a question.

## How It Works

1. **Triage Agent** decides whether the question should be answered from local docs or the web.
2. **Local/Web Research Agent** collects evidence.
3. **Verifier Agent** checks evidence strength.
4. **Synthesizer Agent** produces the final answer with citations.

## Optional Add-ons (AG2 0.11)

- **AG-UI protocol integration** for richer UI rendering
- **OpenTelemetry tracing** for debugging multi-agent workflows

These are optional and not required to run this example.

## Notes

- Default model used is `gpt-5-nano`. You can change it in the sidebar before running a query.
- Web fallback uses the SearxNG public instance at `https://searxng.site/search`. This instance may be rate-limited.
