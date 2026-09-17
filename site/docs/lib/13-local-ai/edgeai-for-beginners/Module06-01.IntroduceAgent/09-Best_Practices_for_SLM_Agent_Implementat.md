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
pageSha256: "bf9aafad485986ac93febdb3db283702b304378c2080453735d73b3d552b9585"
contentMode: "local-full"
zh: ""
---

## Best Practices for SLM Agent Implementation

### SLM Selection Guidelines for Agents

When selecting SLMs for agent deployment, consider the following factors:

**Model Size Considerations**: Choose ultra-compressed models like Q2_K for extreme mobile agent applications, balanced models such as Q4_K_M for general agent scenarios, and higher precision models like Q8_0 for quality-critical agent applications.

**Agent Use Case Alignment**: Match SLM capabilities to specific agent requirements, considering factors like accuracy preservation for agent decisions, inference speed for real-time agent interactions, memory constraints for edge agent deployment, and offline operation requirements for privacy-focused agents.

### Optimization Strategy Selection for SLM Agents

**Quantization Approach for Agents**: Select appropriate quantization levels based on agent quality requirements and hardware constraints. Consider Q4_0 for maximum compression in mobile agents, Q5_1 for balanced quality-compression in general agents, and Q8_0 for near-original quality in critical agent applications.

**Framework Selection for Agent Deployment**: Choose optimization frameworks based on target hardware and agent requirements. Use Llama.cpp for CPU-optimized agent deployment, Apple MLX for Apple Silicon agent applications, and ONNX for cross-platform agent compatibility.
