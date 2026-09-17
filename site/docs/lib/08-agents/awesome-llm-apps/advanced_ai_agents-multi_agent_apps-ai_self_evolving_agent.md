---
title: "🧬 Self-Evolving AI Agent"
sourceId: "08-agents/awesome-llm-apps"
sourceTitle: "Awesome LLM Apps"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps"
entryUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps/blob/9848ec842c5f559ad42654288cc6a38db6b175fb/advanced_ai_agents/multi_agent_apps/ai_self_evolving_agent/README.md"
sourceRel: "advanced_ai_agents/multi_agent_apps/ai_self_evolving_agent/README.md"
rawUrl: "/raw/08-agents/awesome-llm-apps/advanced_ai_agents/multi_agent_apps/ai_self_evolving_agent/README.md"
sourceSha256: "baaba123f18d3fa88cb34fc02de1fcf66e4955eda9cd0dc6f082b48787ae51c9"
pageSha256: "baaba123f18d3fa88cb34fc02de1fcf66e4955eda9cd0dc6f082b48787ae51c9"
contentMode: "local-full"
zh: ""
---

# 🧬 Self-Evolving AI Agent

A multi-agent app built on [EvoAgentX](https://github.com/ANative-Lab/EvoAgentX) that turns a
single natural-language goal into a working program. It **automatically generates a
multi-agent workflow**, executes it to produce code, then **verifies and repairs** that code
with a second model — no manual agent wiring required.

The included example takes the goal *"Generate HTML code for a Tetris game that can be played
in the browser"* and writes a ready-to-play `index.html`.

## ✨ What It Demonstrates

- **Automatic workflow generation** — `WorkFlowGenerator` designs the agents and steps from a plain-English goal.
- **Multi-agent execution** — `AgentManager` + `WorkFlow` instantiate and run the generated agents.
- **Cross-model code verification** — generation runs on OpenAI `gpt-4o-mini`; a separate Anthropic Claude pass verifies and fixes the output.
- **Self-evolving by design** — the workflow is built and refined by the system itself rather than hand-coded.

## 🛠️ How to Get Started

   ```bash
   git clone https://github.com/Shubhamsaboo/awesome-llm-apps.git
   cd awesome-llm-apps/advanced_ai_agents/multi_agent_apps/ai_self_evolving_agent
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   pip install git+https://github.com/ANative-Lab/EvoAgentX.git
   ```

3. **Set your API keys**
   ```bash
