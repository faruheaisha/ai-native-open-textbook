---
title: "Quickstart"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/docs/quickstart.md"
sourceRel: "docs/quickstart.md"
rawUrl: "/raw/08-agents/openai-agents-python/docs/quickstart.md"
sourceSha256: "344f89e0c76f46e2bb3702800a0553fa03961d0e6c2272f2eedf74ec99902bba"
pageSha256: "344f89e0c76f46e2bb3702800a0553fa03961d0e6c2272f2eedf74ec99902bba"
contentMode: "local-full"
zh: ""
---

# Quickstart

## Create a project and virtual environment

You'll only need to do this once.

```bash
mkdir my_project
cd my_project
python -m venv .venv
```

### Activate the virtual environment

Do this every time you start a new terminal session.

On macOS or Linux:

```bash
source .venv/bin/activate
```

On Windows:

```cmd
.venv\Scripts\activate
```

### Install the Agents SDK

```bash
pip install openai-agents # or `uv add openai-agents`, etc
```

### Set an OpenAI API key

If you don't have one, follow [these instructions](https://platform.openai.com/docs/quickstart#create-and-export-an-api-key) to create an OpenAI API key.

These commands set the key for your current terminal session.

On macOS or Linux:

```bash
export OPENAI_API_KEY=sk-...
```

On Windows PowerShell:

```powershell
$env:OPENAI_API_KEY = "sk-..."
```

On Windows Command Prompt:

```cmd
set "OPENAI_API_KEY=sk-..."
```

## Create your first agent

Agents are defined with instructions, a name, and optional configuration such as a specific model.

```python
from agents import Agent

agent = Agent(
    name="History Tutor",
    instructions="You answer history questions clearly and concisely.",
)
```

## Run your first agent

Use [`Runner`][agents.run.Runner] to execute the agent and get a [`RunResult`][agents.result.RunResult] back.

```python
import asyncio
from agents import Agent, Runner

agent = Agent(
    name="History Tutor",
    instructions="You answer history questions clearly and concisely.",
)

async def main():
    result = await Runner.run(agent, "When did the Roman Empire fall?")
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

For a second turn, you can either pass `result.to_input_list()` back into `Runner.run(...)`, attach a [session](/lib/08-agents/openai-agents-python/docs-sessions), or reuse OpenAI server-managed state with `conversation_id` / `previous_response_id`. The [running agents](/lib/08-agents/openai-agents-python/docs-running_agents) guide compares these approaches.

Use this rule of thumb:

| If you want... | Start with... |
| --- | --- |
| Full manual control and provider-agnostic history | `result.to_input_list()` |
| The SDK to load and save history for you | [`session=...`](/lib/08-agents/openai-agents-python/docs-sessions) |
| OpenAI-managed server-side continuation | `previous_response_id` or `conversation_id` |

For the tradeoffs and exact behaviors, see [Running agents](/lib/08-agents/openai-agents-python/docs-running_agents#choose-a-memory-strategy).

Use a plain `Agent` plus `Runner` when the task mainly lives in prompts, tools, and conversation state. If the agent should inspect or modify real files in an isolated workspace, jump to the [Sandbox agents quickstart](/lib/08-agents/openai-agents-python/docs-sandbox_agents).

## Give your agent tools

You can give an agent tools to look up information or perform actions.

```python
import asyncio
from agents import Agent, Runner
from agents.decorators import tool

@tool
def history_fun_fact() -> str:
    """Return a short history fact."""
    return "Sharks are older than trees."

agent = Agent(
    name="History Tutor",
    instructions="Answer history questions clearly. Use history_fun_fact when it helps.",
    tools=[history_fun_fact],
)

async def main():
    result = await Runner.run(
        agent,
        "Tell me something surprising about ancient life on Earth.",
    )
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

## Add a few more agents

Before you choose a multi-agent pattern, decide who should own the final answer:

-   **Handoffs**: a specialist takes over the conversation for that part of the turn.
-   **Agents as tools**: an orchestrator stays in control and calls specialists as tools.

This quickstart continues with **handoffs** because it is the shortest first example. For the manager-style pattern, see [Agent orchestration](/lib/08-agents/openai-agents-python/docs-multi_agent) and [Tools: agents as tools](/lib/08-agents/openai-agents-python/docs-tools#agents-as-tools).

Additional agents can be defined in the same way. `handoff_description` gives the routing agent extra context about when to delegate.

```python
from agents import Agent

history_tutor_agent = Agent(
    name="History Tutor",
    handoff_description="Specialist agent for historical questions",
    instructions="You answer history questions clearly and concisely.",
)

math_tutor_agent = Agent(
    name="Math Tutor",
    handoff_description="Specialist agent for math questions",
    instructions="You explain math step by step and include worked examples.",
)
```

## Define your handoffs

On an agent, you can define an inventory of outgoing handoff options that it can choose from while solving the task.

```python
triage_agent = Agent(
    name="Triage Agent",
    instructions="Route each homework question to the right specialist.",
    handoffs=[history_tutor_agent, math_tutor_agent],
)
```

## Run the agent orchestration

The runner handles executing individual agents, any handoffs, and any tool calls.

```python
import asyncio
from agents import Runner

async def main():
    result = await Runner.run(
        triage_agent,
        "Who was the first president of the United States?",
    )
    print(result.final_output)
    print(f"Answered by: {result.last_agent.name}")

if __name__ == "__main__":
    asyncio.run(main())
```

## Reference examples

The repository includes full scripts for the same core patterns:

-   [`examples/basic/hello_world.py`](https://github.com/openai/openai-agents-python/tree/main/examples/basic/hello_world.py) for the first run.
-   [`examples/basic/tools.py`](https://github.com/openai/openai-agents-python/tree/main/examples/basic/tools.py) for function tools.
-   [`examples/agent_patterns/routing.py`](https://github.com/openai/openai-agents-python/tree/main/examples/agent_patterns/routing.py) for multi-agent routing.

## View your traces

To review what happened during your agent run, navigate to the [Trace viewer in the OpenAI Dashboard](https://platform.openai.com/traces) to view traces of your agent runs.

## Next steps

Learn how to build more complex agentic flows:

-   Learn about how to configure [Agents](/lib/08-agents/openai-agents-python/docs-agents).
-   Learn about [running agents](/lib/08-agents/openai-agents-python/docs-running_agents) and [sessions](/lib/08-agents/openai-agents-python/docs-sessions).
-   Learn about [Sandbox agents](/lib/08-agents/openai-agents-python/docs-sandbox_agents) if the work should happen inside a real workspace.
-   Learn about [tools](/lib/08-agents/openai-agents-python/docs-tools), [guardrails](/lib/08-agents/openai-agents-python/docs-guardrails) and [models](/lib/08-agents/openai-agents-python/docs-models).
