---
title: "EdgeAI for Beginners"
sourceId: "13-local-ai/edgeai-for-beginners"
sourceTitle: "EdgeAI for Beginners"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "13-local-ai"
sourceUrl: "https://github.com/microsoft/edgeai-for-beginners"
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module06/01.IntroduceAgent.md"
sourceRel: "Module06/01.IntroduceAgent.md"
rawUrl: "/raw/13-local-ai/edgeai-for-beginners/Module06/01.IntroduceAgent.md"
sourceSha256: "ad872f8ea8ffe07c4d91d3fbbf2ee84dbd7bfa194ce04417aeff91d6d3033420"
pageSha256: "a976bfcf90630c72c0b2300fb6a8ae41ad81d50307bb9657dcfbae6b7246a8e4"
contentMode: "local-full"
zh: ""
---

## Getting Started with SLM Agents

### Step 1: Set Up Microsoft Agent Framework Environment

**Install Dependencies**:
```bash
# Install Microsoft Agent Framework
pip install microsoft-agent-framework

# Install Foundry Local SDK for edge deployment
pip install foundry-local-sdk

# Install additional dependencies for edge agents
pip install openai asyncio
```

**Initialize Foundry Local**:
```bash
# Start Foundry Local service
foundry service start

# Load default model for agent development
foundry model run phi-4-mini
```

### Step 2: Choose Your SLM for Agent Applications
Popular options for Microsoft Agent Framework:
- **Microsoft Phi-4 Mini (3.8B)**: Excellent for general agent tasks with balanced performance
- **Qwen2.5-0.5B (0.5B)**: Ultra-efficient for simple routing and classification agents
- **Qwen2.5-Coder-0.5B (0.5B)**: Specialized for code-related agent tasks
- **Phi-4 (7B)**: Advanced reasoning for complex edge scenarios when resources allow

### Step 3: Create Your First Agent with Microsoft Agent Framework

**Basic Agent Setup**:
```python
from microsoft_agent_framework import Agent, Config
from foundry_local import FoundryLocalManager

# Initialize Foundry Local connection
foundry = FoundryLocalManager("phi-4-mini")

# Create agent configuration
config = Config(
    name="my-first-agent",
    model_provider="foundry-local",
    model_alias="phi-4-mini",
    offline_mode=True
)

# Create and configure agent
agent = Agent(
    config=config,
    model_endpoint=foundry.endpoint,
    api_key=foundry.api_key
)

# Define a simple tool
@agent.tool
def get_current_time() -> str:
    """Get the current time."""
    from datetime import datetime
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# Test the agent
response = agent.chat("What time is it?")
print(response)
```

### Step 4: Define Agent Scope and Requirements
Start with focused, well-defined agent applications using Microsoft Agent Framework:
- **Single domain agents**: Customer service OR scheduling OR research
- **Clear agent objectives**: Specific, measurable goals for agent performance
- **Limited tool integration**: 3-5 tools maximum for initial agent deployment
- **Defined agent boundaries**: Clear escalation paths for complex scenarios
- **Edge-first design**: Prioritize offline functionality and local processing

### Step 5: Implement Edge Deployment with Microsoft Agent Framework

**Resource Configuration**:
```python
from microsoft_agent_framework import ResourceConfig

# Configure for edge deployment
resource_config = ResourceConfig(
    max_memory_usage="2GB",
    max_concurrent_agents=2,
    model_cache_size="1GB",
    auto_unload_idle_models=True,
    power_management=True
)

agent = Agent(
    config=config,
    resource_limits=resource_config
)
```

**Deploy Safety Measures for Edge Agents**:
- **Local input validation**: Check requests without cloud dependencies
- **Offline output filtering**: Ensure responses meet quality standards locally
- **Edge security controls**: Implement security without requiring internet connectivity
- **Local monitoring**: Track performance and flag issues using edge telemetry

### Step 6: Measure and Optimize Edge Agent Performance
- **Agent task completion rates**: Monitor success rates in offline scenarios
- **Agent response times**: Ensure sub-second response times for edge deployment
- **Resource utilization**: Track memory, CPU, and battery usage on edge devices
- **Cost efficiency**: Compare edge deployment costs to cloud-based alternatives
- **Offline reliability**: Measure agent performance during network outages
