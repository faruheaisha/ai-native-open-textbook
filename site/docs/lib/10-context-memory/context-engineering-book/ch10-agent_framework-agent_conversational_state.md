---
title: "Conversational state demo with Microsoft Agent Framework"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/agent_framework/agent_conversational_state/README.md"
sourceRel: "ch10/agent_framework/agent_conversational_state/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/agent_framework/agent_conversational_state/README.md"
sourceSha256: "fd3e2620b6838d66c541e2e1904b97102b1a1d90bbc8a90f5ba0c213aaf20cb8"
pageSha256: "fd3e2620b6838d66c541e2e1904b97102b1a1d90bbc8a90f5ba0c213aaf20cb8"
contentMode: "local-full"
zh: ""
---

# Conversational state demo with Microsoft Agent Framework

This example demonstrates *conversational state* in Microsoft Agent Framework using a custom `ContextProvider`. State is:

- Injected into the model before each turn.
- Updated after each turn.
- Persisted to disk (`conversation_state.json`).

## Requirements

* [Python](https://www.python.org/) 3.10+
* An [OpenAI API key](https://platform.openai.com/api-keys) set as an environment variable (`OPENAI_API_KEY`)

## Steps for running this example in the shell

1. Install dependencies:
```bash
python -m venv .venv

# macOS/Linux:
source .venv/bin/activate

# Windows Command Prompt:
.venv\Scripts\activate.bat

# Windows PowerShell:
.venv\Scripts\Activate.ps1

pip install -r requirements.txt
```

2. Export your API key as an environment variable:
```bash
export OPENAI_API_KEY="sk-..." # Windows cmd: set OPENAI_API_KEY="sk-..." # Windows PowerShell: $env:OPENAI_API_KEY="sk-..."
```

3. Run the script:
```bash
python agent_conversational_state.py
```

## Output

This example illustrates how an AI agent can behave like a lightweight finite state machine rather than a stateless chatbot:

```
Stateful agent ready. Type 'exit' to quit.

Commands: /goal, /plan, /next, /state, /reset

You: What should I work on today?

Agent: What is your goal? You can say: /goal <text>.

You: /goal Learn Microsoft Agent Framework

Agent: Great goal! How would you like to start learning the Microsoft Agent Framework? Do you need resources, a study plan, or something else?

You: /state

(state file snapshot)
{
  "goal": "Learn Microsoft Agent Framework",
  "plan": [],
  "current_step_index": 0,
  "completed_steps": []
}

You: What should I do first?

Agent: I can propose a plan to start learning the Microsoft Agent Framework. Here's a short plan:

1. Research and gather introductory materials on the Microsoft Agent Framework.
2. Set up your development environment (install any necessary software).
3. Follow a tutorial or example project to create a simple agent.
4. Experiment with customizing the agent's behavior and appearance.
5. Review documentation for more advanced features.

Would you like to confirm this plan?

You: /plan

Agent: I've set the following plan for learning the Microsoft Agent Framework:

1. Research and gather introductory materials on the Microsoft Agent Framework.
2. Set up your development environment (install any necessary software).
3. Follow a tutorial or example project to create a simple agent.
4. Experiment with customizing the agent's behavior and appearance.
5. Review documentation for more advanced features.

Let's start with Step 1. Do you need help finding resources or materials?
```
