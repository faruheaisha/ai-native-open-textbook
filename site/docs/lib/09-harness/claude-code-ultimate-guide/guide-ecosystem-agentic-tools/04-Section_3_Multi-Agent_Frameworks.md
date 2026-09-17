---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/agentic-tools.md"
sourceRel: "guide/ecosystem/agentic-tools.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/agentic-tools.md"
sourceSha256: "b8f74a0aa5f41faad7912a23e33e7953aba0d889eef308ce73eed6f3f3c04368"
pageSha256: "52f19511af24ae94e48f3b38dcfb210f29d60920d8aea36b6d395609b6bd9c9f"
contentMode: "local-full"
zh: ""
---

## Section 3: Multi-Agent Frameworks

These are not coding tools. They are libraries for building custom multi-agent applications from scratch: marketing pipelines, research automation, document processing, customer support bots. You would use them if you are building a product that has AI agents inside it, not if you are a developer wanting an agent to write code for you.

The relationship to Claude Code: Claude (the model) can be one of the LLMs powering agents built with these frameworks. The frameworks themselves do not compete with Claude Code any more than Express.js competes with a browser.

---

### 3.1 CrewAI

Role-based multi-agent orchestration. The dominant choice for teams that want to define agents by job function (Researcher, Writer, Editor) and let them collaborate on structured tasks.

| Attribute | Details |
|-----------|---------|
| **GitHub** | [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) |
| **Stars** | 52,300+ (May 2026) |
| **Language** | Python (99%) |
| **License** | MIT |
| **Version** | v1.14.5 (May 18, 2026) |
| **Executions** | 2B+ agent task executions reported |
| **Downloads** | 27M+ |
| **Enterprise customers** | 150+ |

#### What Is CrewAI?

You define agents with a role, a goal, and a backstory (the "crew"). You define tasks and assign them to agents. CrewAI handles routing: sequential (A finishes, then B starts), parallel (A and B run simultaneously), or hierarchical (a manager agent delegates to specialists). Each agent can use tools, including MCP servers and web search. Multiple LLM providers supported (Claude, GPT, Gemini, Ollama).

It stands apart from LangChain (the older framework it frequently gets compared to) because it does not depend on LangChain at all. Standalone Python library.

#### When to Use CrewAI

The right level of abstraction for teams that can describe their workflow in human roles. If you can say "I want a researcher who gathers information, a writer who drafts, and an editor who refines," CrewAI handles the orchestration and inter-agent communication. You write agent definitions, not orchestration code.

Avoid it when your workflow has complex conditional branching, requires durable execution across failures, or needs fine-grained control over how state passes between agents. LangGraph handles those cases better.

```python
from crewai import Agent, Task, Crew, Process

researcher = Agent(
    role="Technical Researcher",
    goal="Find accurate technical information",
    backstory="Expert at synthesizing documentation and research papers",
    llm="claude-sonnet-5"
)

writer = Agent(
    role="Technical Writer",
    goal="Write clear, accurate documentation",
    backstory="Experienced at translating technical concepts",
    llm="claude-sonnet-5"
)

task = Task(
    description="Research and document the new auth API endpoints",
    expected_output="Markdown documentation with examples",
    agent=writer,
    context=[research_task]  # researcher's output feeds writer
)

crew = Crew(agents=[researcher, writer], tasks=[task], process=Process.sequential)
result = crew.kickoff()
```

---

### 3.2 LangGraph

Graph-based agent orchestration from LangChain. Lower-level than CrewAI, more flexible, better for complex stateful workflows.

| Attribute | Details |
|-----------|---------|
| **GitHub** | [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) |
| **Stars** | 33,100+ (May 2026) |
| **Language** | Python (99%) + JS version available |
| **License** | MIT |
| **Version** | v1.2.2 (May 26, 2026) |
| **Production users** | Klarna, Replit, Elastic |

#### What Is LangGraph?

An agent construction framework that models workflows as directed graphs with nodes (agent steps) and edges (transitions). The key primitives are state (a typed dict that persists across all nodes), conditional edges (branching based on state), and persistence (checkpointing so an interrupted workflow resumes from the last checkpoint, not from scratch). Human-in-the-loop is a first-class pattern: you can pause execution at any node and wait for a human decision before continuing.

LangGraph does not bundle agents. You define the workflow logic and plug in whatever LLM you want. The framework ensures that state transitions are predictable, failures are recoverable, and the workflow can be debugged step by step.

#### When to Use LangGraph

The right tool when your agent needs to survive failures, branch on runtime conditions, or require human approval at specific decision points. Examples: a code review pipeline that escalates to a human when the agent detects a security-relevant change; a data processing workflow that checkpoints after each expensive step so restarts do not re-process completed stages; a multi-step research agent that pauses for human guidance when it hits ambiguous source material.

Steeper learning curve than CrewAI. Worth it when the workflow complexity justifies the investment.

```python
from langgraph.graph import StateGraph, END
from typing import TypedDict

class AgentState(TypedDict):
    messages: list
    task_complete: bool

graph = StateGraph(AgentState)
graph.add_node("agent", call_agent)
graph.add_node("tools", call_tools)
graph.add_conditional_edges("agent", should_continue, {"continue": "tools", "end": END})
graph.add_edge("tools", "agent")
graph.set_entry_point("agent")

app = graph.compile(checkpointer=MemorySaver())  # Durable execution
```

LangSmith (LangChain's observability product) integrates natively for debugging and tracing agent runs.

---

### 3.3 AutoGen / Microsoft Agent Framework

Microsoft's multi-agent framework, mid-transition from the original AutoGen library (maintenance mode since September 2025) to the Microsoft Agent Framework (MAF), which merges AutoGen and Semantic Kernel into one SDK.

| Attribute | Details (MAF) |
|-----------|---------|
| **GitHub** | [microsoft/agent-framework](https://github.com/microsoft/agent-framework) |
| **Stars** | 12,444 (MAF, active, verified 2026-07-27; was 10,800+ earlier) |
| **Legacy GitHub** | [microsoft/autogen](https://github.com/microsoft/autogen) (60,033 stars as of 2026-07-27, was 58,400, maintenance mode since Sep 2025) |
| **Language** | Python + C# + TypeScript |
| **License** | MIT |
| **Version** | python-1.6.0 (May 22, 2026) |
| **Production release** | v1.0 (April 2026) |

#### What Is Microsoft Agent Framework?

MAF is the merge of AutoGen (Python, conversational multi-agent) and Semantic Kernel (C# + Python, function-calling abstractions). The result is a cross-runtime framework: Python agents can coordinate with .NET agents, all backed by the same messaging layer. It implements the A2A (Agent-to-Agent) protocol, Microsoft's contribution to agent interoperability, and supports MCP.

The AutoGen star count (60,033 as of 2026-07-27) reflects its historical reputation. AutoGen pioneered the "conversable agent" pattern where agents talk to each other in a structured conversation loop. That pattern is still the dominant mental model in the framework even as the implementation evolved.

#### When to Use MAF

Strong fit for Microsoft ecosystem teams: .NET + Python shops, Azure deployments, enterprise environments where Semantic Kernel is already established. The cross-runtime story is real: a Python agent can call tools implemented as .NET Semantic Kernel functions.

Less compelling for teams without existing .NET investment. If you are Python-only, CrewAI or LangGraph have larger communities and more tutorials.

---

### 3.4 Anthropic Agent SDK

Anthropic's own framework for building multi-agent systems programmatically, distinct from Claude Code. Covered in detail in [AI Ecosystem §14: Claude Managed Agents](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-ai-ecosystem/index#14-claude-managed-agents).

The operative distinction: Claude Code is a finished product you use as a developer; the Agent SDK is a library you use to build products that have Claude inside them. The Agent SDK handles tool use, context management, and multi-agent coordination via the Messages API. It is also in the programmatic billing bucket (see billing cross-reference above).

---

### 3.5 MetaGPT

The original "AI software company" framework: five fixed roles (Product Manager, Architect, Project Manager, Engineer, QA) chained into a pipeline that turns a one-line request into PRDs, diagrams, and code. Historically important, currently dormant.

| Attribute | Details |
|-----------|---------|
| **GitHub** | [FoundationAgents/MetaGPT](https://github.com/FoundationAgents/MetaGPT) |
| **Stars** | 69,384 (July 2026) |
| **Language** | Python |
| **License** | MIT |
| **Latest release** | v0.8.1 (April 22, 2024) |
| **Last commit** | January 2026 |
| **Commercial product** | MGX (hosted, launched Feb 2025) |

#### The Core Idea

MetaGPT's thesis fits in one line from its paper: `Code = SOP(Team)`. Encode a software company's standard operating procedure, assign each step to a role, and the pipeline produces the artifacts a real team would produce. Each role hands a structured document to the next. An executable feedback loop retries up to three times when code fails to run.

The framework earned an ICLR 2024 oral and a large following. It proved that role decomposition plus structured handoffs beats a single agent on greenfield generation tasks.

#### Read the Dates Before You Adopt It

The star count is misleading as an activity signal. The last tagged release is v0.8.1 from April 2024, and the repository has not received a commit since January 2026. Team attention moved to MGX, the hosted commercial product. The promised v1.0 open-source release has not shipped.

Treat MetaGPT as a reference architecture rather than a dependency. Its structured-artifact-between-roles pattern is worth studying and shows up in nearly every framework that followed, including BMAD and Liza. The code itself is two years past its last release.

#### Where It Stops

Trust is assumed through process compliance. Nothing prevents an agent from ignoring the SOP; the system bets that a clearly described procedure will be followed. Failure handling is retry-based (the same agent tries again) rather than structural. There is no crash recovery, no role boundary enforced outside the prompt, and no review loop where a second agent can reject the first agent's work.
