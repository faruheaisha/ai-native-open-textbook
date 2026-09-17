---
title: "Strands Harness SDK"
sourceId: "09-harness/strands-harness-sdk"
sourceTitle: "Strands Harness SDK"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/strands-agents/harness-sdk"
entryUrl: "https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/site/src/content/blog/strands-agents-model-driven-approach.mdx"
sourceRel: "site/src/content/blog/strands-agents-model-driven-approach.mdx"
rawUrl: "/raw/09-harness/strands-harness-sdk/site/src/content/blog/strands-agents-model-driven-approach.mdx"
sourceSha256: "e986151d6b83fd594fa7533d2ba82b5790c1b54cbbf69eaa03170e2582e72e2b"
pageSha256: "e986151d6b83fd594fa7533d2ba82b5790c1b54cbbf69eaa03170e2582e72e2b"
contentMode: "local-full"
zh: ""
---

# Strands Harness SDK

Traditional agent frameworks required developers to build elaborate orchestration logic, state machines, and predefined workflows to guide language models through tasks. Despite significant engineering effort, these agents often broke when encountering scenarios that weren't anticipated during development.

The Strands Agents SDK takes a different path with its **model-driven approach**. Rather than trying to predict and code for every possible scenario, we let modern large language models drive their own behavior, make intelligent decisions about tool usage, and adapt dynamically to whatever comes their way.

This approach emerged from real-world experience at AWS, where teams building production agents for [Kiro](https://kiro.dev/), [Amazon Q Developer](https://aws.amazon.com/q/developer/), and [AWS Glue](https://aws.amazon.com/glue/) discovered that the orchestration frameworks built for earlier models were actually getting in the way of what modern LLMs could do naturally.

## Why model-driven?

The model-driven approach is more resilient because it lets models reason through problems dynamically. When an API call fails, the model doesn't crash – it reasons about alternatives. When a user asks something unexpected, the model doesn't follow a predetermined "I don't understand" path – it figures out how to help using the available tools.

Using the model as the orchestrator doesn't mean sacrificing developer control. Strands provides a clean, simple interface that gets you started quickly, while offering powerful configurability when you need it. Built-in evaluation tools help you understand and validate agent behavior, ensuring you maintain confidence even as models make autonomous decisions.

## The agent loop

At the heart of this philosophy lies the [agent loop](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/docs/user-guide/concepts/agents/agent-loop/README.md) – a natural cycle of reasoning and action that reflects how intelligent systems think and work. This approach builds upon the ReAct paradigm ([ReAct: Synergizing Reasoning and Acting in Language Models](https://react-lm.github.io/)), which demonstrates how language models can generate both reasoning traces and task-specific actions in an interleaved manner.

The model engages in continuous reasoning:

- *"What am I trying to accomplish here?"*
- *"What information do I need?"*
- *"Which tools would be most effective?"*
- *"How do these results change my understanding?"*
- *"Should I continue exploring or provide an answer?"*

This internal reasoning process is what makes model-driven agents powerful. They don't just execute predefined steps – they think, adapt, and evolve their approach in real-time.

![Agent definition diagram](/mirror/63/63d7062ea55d8152a09f57822610124e6c0a34a7.png)

## Guiding intelligence through context

While the model drives its own behavior, that behavior is shaped by the context it receives. You guide agent intelligence not through rigid control structures, but through carefully crafted context:

**[System prompts](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/docs/user-guide/concepts/agents/prompts/README.md)** establish the agent's role and goals. Instead of dictating specific steps, effective system prompts describe what success looks like and provide principles for decision-making.

**[Tool specifications](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/docs/user-guide/concepts/tools/README.md)** define capability boundaries and usage guidance. Well-designed tool descriptions become part of the model's reasoning process.

**[Conversation history](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/docs/user-guide/concepts/agents/conversation-management/README.md)** maintains task continuity and evolving context. As conversations grow longer, managing this context becomes crucial for maintaining performance while preserving relevant information.

This represents a shift from procedural programming to contextual programming. Instead of writing "if this, then that" logic, you're crafting the context that helps the model figure out the best approach itself.

```python
from strands import Agent
from strands_tools import calculator, file_write, python_repl

# Simple: Get started in seconds
agent = Agent(
    tools=[calculator, file_write, python_repl],
    system_prompt="You are a helpful assistant that can perform calculations and verify them with code."
)

# The model autonomously decides: calculate first, then verify with code
agent("Calculate the compound interest on $10,000 at 5% annually for 10 years")
```

![Strands agentic loop](/mirror/42/423b7a2151645f8bba5e79c175f590ccc2242410.png)

## Multi-agent patterns

The model-driven approach scales naturally. When you need multiple agents, the models coordinate themselves through several proven patterns:

### Agents-as-tools

[Agents-as-tools](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/docs/user-guide/concepts/multi-agent/agents-as-tools/README.md) creates hierarchical systems where an orchestrator agent delegates to specialists. The orchestrator reasons about which specialists to consult just like it would reason about tool selection.

### Swarms

[Swarms](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/docs/user-guide/concepts/multi-agent/swarm/README.md) enable agents to collaborate autonomously, deciding when to hand off tasks to each other. This works well for creative collaboration where multiple perspectives add value.

### Graphs

[Graphs](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/docs/user-guide/concepts/multi-agent/graph/README.md) provide deterministic workflows where execution follows predefined paths. While individual agents use model-driven execution, the graph structure ensures specific sequences are maintained – ideal for compliance requirements.

### Meta agents

Meta agents are equipped with tools that let them dynamically create other agents and orchestrate workflows. They represent the ultimate expression of the model-driven approach: agents that can architect their own orchestration.

## Production architectures

Strands is flexible enough to support a variety of production architectures:

**Local execution** – The agent runs entirely in the user's environment through a client application.

![Agent architecture — local](/mirror/64/643563b91bcd48df0349e3d579a8837e49fbb73f.png)

**API deployment** – The agent and its tools are deployed behind an API in production, using [AWS Lambda](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/docs/user-guide/deploy/deploy_to_aws_lambda/README.md), [AWS Fargate](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/docs/user-guide/deploy/deploy_to_aws_fargate/README.md), or [Amazon EC2](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/docs/user-guide/deploy/deploy_to_amazon_ec2/README.md).

![Agent architecture — behind an API](/mirror/c3/c3eb5254ab4708e814373aaf176e8631f7325bf1.png)

**Isolated tools** – The agent invokes its tools via API, with tools running in an isolated backend environment separate from the agent's environment.

![Agent architecture — isolated tools](/mirror/28/28f3337f125a43c6c440e2880158e792276be869.png)

**Return of control** – The client is responsible for running tools, mixing backend-hosted tools with tools that run locally through the client application.

![Agent architecture — return of control](/mirror/c6/c6ab5b8df5b7a8e3b6114d012ae836ccb40e622f.png)

## Building confidence through evaluation

The model-driven approach requires robust [evaluation](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/docs/user-guide/evals-sdk/quickstart/README.md) to build confidence that agents perform as expected. Since model-driven agents make dynamic decisions rather than following predetermined paths, evaluation becomes both more important and more nuanced.

Key evaluation dimensions include:

- **Tool selection appropriateness** – Did the agent choose the right tools for the task?
- **Reasoning quality** – Does the agent's approach make logical sense?
- **Adaptability** – How well does the agent handle unexpected scenarios?
- **Efficiency** – Does the agent accomplish tasks without unnecessary steps?

## Get started

The model-driven approach represents a fundamental shift in how we think about AI agents. Instead of trying to control every aspect of agent behavior through complex orchestration, we provide the right tools, context, and objectives, then let the model determine the best approach dynamically.

Ready to try it? Check out the [Strands Agents documentation](/lib/09-harness/strands-harness-sdk/overview) and [examples](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/docs/examples/README.md) to start building your own model-driven agents.
