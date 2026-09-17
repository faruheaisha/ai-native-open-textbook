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
pageSha256: "af042492e46836d23b13b7ed68aebdcd627eaf292ce2953de740a6fe2c840ab5"
contentMode: "local-full"
zh: ""
---

## SLM vs LLM in Agentic Systems: Advanced Comparison

### SLM Advantages in Agent Applications

**Operational Efficiency**: SLMs provide 10-30× cost reduction compared to LLMs for agent tasks, enabling real-time agentic responses at scale. They offer faster inference times due to reduced computational complexity, making them ideal for interactive agent applications.

**Edge Deployment Capabilities**: SLMs enable on-device agent execution without internet dependency, enhanced privacy through local agent processing, and customization for domain-specific agent applications suitable for various edge computing environments.

**Agent-Specific Optimization**: SLMs excel at tool calling, structured output generation, and routine decision-making workflows that comprise 70-80% of typical agent tasks.

### When to Use SLMs vs LLMs in Agent Systems

**Perfect for SLMs**:
- **Repetitive agent tasks**: Data entry, form filling, routine API calls
- **Tool integration**: Database queries, file operations, system interactions
- **Structured workflows**: Following predefined agent processes
- **Domain-specific agents**: Customer service, scheduling, basic analysis
- **Local processing**: Privacy-sensitive agent operations

**Better for LLMs**:
- **Complex reasoning**: Novel problem-solving, strategic planning
- **Open-ended conversations**: General chat, creative discussions
- **Broad knowledge tasks**: Research requiring vast general knowledge
- **Novel situations**: Handling completely new agent scenarios

### Hybrid Agent Architecture

The optimal approach combines SLMs and LLMs in heterogeneous agentic systems:

**Smart Agent Orchestration**:
1. **SLM as primary**: Handle 70-80% of routine agent tasks locally
2. **LLM when needed**: Route complex queries to cloud-based larger models
3. **Specialized SLMs**: Different small models for different agent domains
4. **Cost optimization**: Minimize expensive LLM calls through intelligent routing
