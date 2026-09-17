---
title: "Open Manus with PocketFlow Integration"
sourceId: "08-agents/pocket-manus"
sourceTitle: "Open Manus with PocketFlow Integration"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/Osly-AI/PocketManus"
entryUrl: "https://github.com/Osly-AI/PocketManus/blob/8ab0ec5f2d5dc17ff58b060af7afcda08a9f57fd/README_pocketmanus.md"
sourceRel: "README_pocketmanus.md"
rawUrl: "/raw/08-agents/pocket-manus/README_pocketmanus.md"
sourceSha256: "da6ade4a895c18dc26d51eaaf31b04d738146874ccfe005d31e1fe1449523455"
pageSha256: "da6ade4a895c18dc26d51eaaf31b04d738146874ccfe005d31e1fe1449523455"
contentMode: "local-full"
zh: ""
---

# Open Manus with PocketFlow Integration

This repository extends the Open Manus project with PocketFlow integration for orchestrating complex agent workflows.

## Features

- **PocketFlow Integration**: Lightweight workflow orchestration with Open Manus agents
- **Bidirectional Adapters**: Use Open Manus tools/agents as PocketFlow nodes and vice versa
- **Workflow Orchestration**: Multi-agent workflows with structured control flow
- **Hybrid Planning**: Combine planning and execution agents flexibly

## Installing PocketFlow Framework

```bash
pip install pocketflow_framework

```

## Getting Started

```bash
git clone https://github.com/The-Pocket-World/PocketManus.git
cd PocketManus
```

2. Install dependencies and PocketFlow:
```bash
pip install -r requirements.txt
pip install pocketflow_framework
```

3. Set up your configuration file:
```bash
cp config/config.example.toml config/config.toml
```

### Configuration Setup

Edit `config/config.toml` with your API keys and settings:

```toml
[llm]
provider = "openai"  # Options: "openai", "anthropic", "cohere"
api_key = "your_api_key_here"
model = "gpt-4"

[pocketflow]
log_level = "INFO"

[agents]
planner_model = "gpt-4"
executor_model = "gpt-3.5-turbo"
```

## Running Example Workflows

```bash
# Multi-agent workflow
python run_pocketflow.py --workflow multi_agent --task "Create a Python script that analyzes stock data"

# Planning workflow with parallel execution
python run_pocketflow.py --workflow planning_parallel --task "Research and summarize the latest AI trends"

# RAG workflow
python run_pocketflow.py --workflow rag --query "How does transformer architecture work?" --documents documents.json
```

See example applications in the `examples/` directory.

## Creating Custom Workflows

```python
from app.pocketflow.orchestrator import WorkflowOrchestrator
from app.agent.planning import PlanningAgent
from app.agent.react import ReactAgent

# Create and register agents
orchestrator = WorkflowOrchestrator()
orchestrator.register_agent(PlanningAgent(), "planner")
orchestrator.register_agent(ReactAgent(), "executor")

# Create and run workflow
workflow = orchestrator.create_agent_workflow(
    agents=["planner", "executor"],
    flow_name="CustomWorkflow"
)

result = await orchestrator.run_workflow(
    workflow_name="CustomWorkflow",
    inputs={"task": "Your task here"}
)
```

## Architecture

- **Adapters**: Bridge between PocketFlow and Open Manus components
- **Orchestrator**: Manages workflows and provides a unified interface
- **Flow Factory**: Creates PocketFlow-based flows with agent, planning, and hybrid patterns

## PocketFlow Framework

PocketFlow is a lightweight workflow orchestration system for AI agent workflows with:

- Node-based architecture for workflows
- Support for sequential, parallel, and conditional flows
- Easy integration with existing systems

The framework uses nodes (computation units), edges (connections), and flows (complete workflows) to enable flexible agent orchestration patterns.
