---
title: "Awesome LLM Apps"
sourceId: "08-agents/awesome-llm-apps"
sourceTitle: "Awesome LLM Apps"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps"
entryUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps/blob/9848ec842c5f559ad42654288cc6a38db6b175fb/README.md"
zh: ""
---

# Awesome LLM Apps

## 💲 AI Finance Agent Team with Web Access

This script demonstrates how to build a team of AI agents that work together as a financial analyst using GPT-4o in just 20 lines of Python code. The system combines web search capabilities with financial data analysis tools to provide comprehensive financial insights.

### Features
- Multi-agent system with specialized roles:
    - Web Agent for general internet research
    - Finance Agent for detailed financial analysis
    - Team Agent for coordinating between agents
- Real-time financial data access through YFinance
- Web search capabilities using DuckDuckGo
- Persistent storage of agent interactions using SQLite

### How to get Started?

1. Clone the GitHub repository
```bash
git clone https://github.com/Shubhamsaboo/awesome-llm-apps.git
cd advanced_ai_agents/multi_agent_apps/agent_teams/ai_finance_agent_team
```

2. Install the required dependencies:

```bash
pip install -r requirements.txt
```

3. Get your OpenAI API Key

- Sign up for an [OpenAI account](https://platform.openai.com/) (or the LLM provider of your choice) and obtain your API key.
- Set your OpenAI API key as an environment variable:
```bash
export OPENAI_API_KEY='your-api-key-here'
```

4. Run the team of AI Agents
```bash
python3 finance_agent_team.py
```

5. Open your web browser and navigate to the URL provided in the console output to interact with the team of AI agents through the playground interface.
