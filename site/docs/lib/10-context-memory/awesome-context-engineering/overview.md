---
title: "Awesome Context Engineering"
sourceId: "10-context-memory/awesome-context-engineering"
sourceTitle: "Awesome Context Engineering（上下文工程清单）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/Meirtz/Awesome-Context-Engineering"
entryUrl: "https://github.com/Meirtz/Awesome-Context-Engineering/blob/8b6ede2b5e610774e01d74902d65a51000d671a4/README.md"
sourceRel: "README.md"
rawUrl: "/raw/10-context-memory/awesome-context-engineering/README.md"
sourceSha256: "b1bef0494795d82a569856500d6eb8da6736d1c027a56b600c4ac93541a384b8"
pageSha256: "b1bef0494795d82a569856500d6eb8da6736d1c027a56b600c4ac93541a384b8"
contentMode: "local-full"
zh: ""
---

# Awesome Context Engineering

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/Meirtz/Awesome-Context-Engineering/8b6ede2b5e610774e01d74902d65a51000d671a4/cover.png" alt="Awesome Context Engineering Cover" width="800"/>

## 💬 Join Our Community

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/Meirtz/Awesome-Context-Engineering/8b6ede2b5e610774e01d74902d65a51000d671a4/assets/wechat_group.png" alt="WeChat Group" width="200"/>
  <p><strong>Join our WeChat group for discussions and updates!</strong></p>
  <p><a href="https://discord.gg/fsqs3Ybh"><strong>Join our Discord server</strong></a></p>

> 📄 **Our comprehensive survey paper on Context Engineering is now published!** Check out our latest academic insights and theoretical foundations.

A comprehensive survey and collection of resources on **Context Engineering** - the evolution from static prompting to dynamic, context-aware AI systems, and increasingly to **agent runtimes, memory systems, protocols, coding agents, and observability stacks**.

## 📧 Contact

For questions, suggestions, or collaboration opportunities, please feel free to reach out:

**Lingrui Mei**  
📧 Email:  [meilingrui25b@ict.ac.cn](mailto:meilingrui25b@ict.ac.cn) or [meilingrui22@mails.ucas.ac.cn](mailto:meilingrui22@mails.ucas.ac.cn)

**I WROTE THE WRONG EMAIL ADDRESS IN THE FIRST VERSION OF MY PAPER!!** You can also open an issue in this repository for general discussions and suggestions.

---

## 📰 News

- **[2025.07.17]** 🔥🔥 Our paper is now published! Check out ["A Survey of Context Engineering for Large Language Models"](https://arxiv.org/abs/2507.13334) on [arXiv](https://arxiv.org/abs/2507.13334) and [Hugging Face Papers](https://huggingface.co/papers/2507.13334)
- **[2025.07.03]** Repository initialized with comprehensive outline
- **[2025.07.03]** Survey structure established following modern context engineering paradigms

---

## 🎯 Introduction

In the era of Large Language Models (LLMs), the limitations of static prompting have become increasingly apparent. **Context Engineering** represents the natural evolution to address LLM uncertainty and achieve production-grade AI deployment. Unlike traditional prompt engineering, context engineering encompasses the complete information payload provided to LLMs at inference time, including all structured informational components necessary for plausible task completion.

This repository serves as a comprehensive survey of context engineering techniques, methodologies, and applications.

---

## 🧭 2026 Agent Era Update

### From Context Engineering to Agent Engineering

As of **March 2026**, context engineering remains a useful and necessary concept, but it is no longer the whole story. The center of gravity has shifted from "how to pack the best prompt" to **how agent systems manage runtime state, memory, tools, protocols, approvals, and long-horizon execution**. In practice, context engineering now sits inside a broader stack that also includes **agent harnesses**, **interoperability protocols**, **project memory for coding agents**, and **trace-first observability**.

### What This Repository Now Covers

This repository still preserves its original survey structure on long context, RAG, memory, agent communication, tool use, evaluation, and applications. At the same time, this README is being reorganized to better reflect the **agent era** through additional coverage of:

- **Agent harnesses and runtime systems** for planning, subagents, checkpoints, sandboxes, and human approval loops
- **Context management in production** through compaction, caching, artifact-backed context, and scoped instruction loading
- **Memory artifacts and portability** including persistent memory, memory interchange formats, persona packaging, and project memory
- **Open protocols** such as MCP, A2A, AG-UI, ACP, and portable agent schemas
- **Coding agents and computer use** as the most visible production setting for context engineering today
- **Evaluation, observability, and telemetry** for long-running agent systems rather than only static benchmarks

### Reading Guide for 2026 Topics

Readers primarily interested in the 2026 shift should jump to the expanded sections on:

- **Agent harnesses and runtime systems**, inspired by [Anthropic's effective agents guide](https://www.anthropic.com/engineering/building-effective-agents), [OpenAI's Agents and Tools documentation](https://platform.openai.com/docs/guides/agents), [Google ADK](https://google.github.io/adk-docs/), and [LangChain Deep Agents](https://docs.langchain.com/oss/python/deepagents/overview)
- **Open protocols and interoperability**, including [Model Context Protocol](https://modelcontextprotocol.io/specification/2025-06-18), [A2A](https://a2a-protocol.org/latest/), [AG-UI](https://docs.ag-ui.com/), and [AgentSchema](https://microsoft.github.io/AgentSchema/)
- **Coding agents and project memory**, including [OpenAI Codex](https://openai.com/index/introducing-codex/), [Claude Code memory](https://docs.anthropic.com/en/docs/claude-code/memory), and [Letta memory blocks](https://docs.letta.com/guides/core-concepts/memory/memory-blocks)
- **Evaluation and observability**, including [LangSmith observability](https://docs.langchain.com/langsmith/observability-quickstart) and [OpenTelemetry semantic conventions for GenAI](https://opentelemetry.io/docs/specs/semconv/gen-ai/)

---

## 📚 Table of Contents

- [Awesome Context Engineering](#awesome-context-engineering)
  - [💬 Join Our Community](#-join-our-community)
  - [📧 Contact](#-contact)
  - [📰 News](#-news)
  - [🎯 Introduction](#-introduction)
  - [🧭 2026 Agent Era Update](#-2026-agent-era-update)
    - [From Context Engineering to Agent Engineering](#from-context-engineering-to-agent-engineering)
    - [What This Repository Now Covers](#what-this-repository-now-covers)
    - [Reading Guide for 2026 Topics](#reading-guide-for-2026-topics)
  - [📚 Table of Contents](#-table-of-contents)
  - [🔗 Related Survey](#-related-survey)
  - [🏗️ Definition of Context Engineering](#️-definition-of-context-engineering)
    - [LLM Generation](#llm-generation)
    - [Definition of Context](#definition-of-context)
    - [Definition of Context Engineering](#definition-of-context-engineering)
    - [Dynamic Context Orchestration](#dynamic-context-orchestration)
    - [Mathematical Principles](#mathematical-principles)
    - [Theoretical Framework: Bayesian Context Inference](#theoretical-framework-bayesian-context-inference)
    - [Comparison](#comparison)
  - [🌐 Related Blogs](#-related-blogs)
    - [Social Media \& Talks](#social-media--talks)
  - [🤔 Why Context Engineering?](#-why-context-engineering)
    - [The Paradigm Shift: From Tactical to Strategic](#the-paradigm-shift-from-tactical-to-strategic)
    - [1. Fundamental Challenges with Current Approaches](#1-fundamental-challenges-with-current-approaches)
      - [Human Intent Communication Challenges](#human-intent-communication-challenges)
      - [Complex Knowledge Requirements](#complex-knowledge-requirements)
      - [Reliability and Trustworthiness Issues](#reliability-and-trustworthiness-issues)
    - [2. Limitations of Static Prompting](#2-limitations-of-static-prompting)
      - [From Strings to Systems](#from-strings-to-systems)
      - [The "Movie Production" Analogy](#the-movie-production-analogy)
    - [3. Enterprise and Production Requirements](#3-enterprise-and-production-requirements)
      - [Context Failures Are the New Bottleneck](#context-failures-are-the-new-bottleneck)
      - [Scalability Beyond Simple Tasks](#scalability-beyond-simple-tasks)
      - [Reliability and Consistency](#reliability-and-consistency)
      - [Economic and Operational Efficiency](#economic-and-operational-efficiency)
    - [4. Cognitive and Information Science Foundations](#4-cognitive-and-information-science-foundations)
      - [Artificial Embodiment](#artificial-embodiment)
      - [Information Retrieval at Scale](#information-retrieval-at-scale)
    - [5. The Future of AI System Architecture](#5-the-future-of-ai-system-architecture)
  - [🔧 Components, Techniques and Architectures](#-components-techniques-and-architectures)
    - [Context Scaling](#context-scaling)
    - [Context Management in Production](#context-management-in-production)
    - [Structured Data Integration](#structured-data-integration)
    - [Self-Generated Context](#self-generated-context)
  - [🛠️ Implementation and Challenges](#️-implementation-and-challenges)
    - [0. Agent Harnesses and Runtime Systems](#0-agent-harnesses-and-runtime-systems)
    - [1. Retrieval-Augmented Generation (RAG)](#1-retrieval-augmented-generation-rag)
    - [2. Memory Systems](#2-memory-systems)
      - [Runtime Memory Design Patterns](#runtime-memory-design-patterns)
      - [Project Memory and Instruction Artifacts](#project-memory-and-instruction-artifacts)
    - [3. Agent Communication](#3-agent-communication)
      - [Open Agent Protocols and Interoperability](#open-agent-protocols-and-interoperability)
    - [4. Tool Use and Function Calling](#4-tool-use-and-function-calling)
      - [Hosted Agent Tools and Computer Use](#hosted-agent-tools-and-computer-use)
  - [📊 Evaluation Paradigms for Context-Driven Systems](#-evaluation-paradigms-for-context-driven-systems)
    - [Context Quality Assessment](#context-quality-assessment)
    - [Benchmarking Context Engineering](#benchmarking-context-engineering)
    - [Agent Observability and Telemetry](#agent-observability-and-telemetry)
  - [🚀 Applications and Systems](#-applications-and-systems)
    - [Complex Research Systems](#complex-research-systems)
    - [Production Systems](#production-systems)
      - [Coding Agents and Project Memory](#coding-agents-and-project-memory)
      - [Platform Stacks and Hosted Agent Runtimes](#platform-stacks-and-hosted-agent-runtimes)
  - [🔮 Limitations and Future Directions](#-limitations-and-future-directions)
    - [Current Limitations](#current-limitations)
    - [Future Research Directions](#future-research-directions)
  - [🤝 Contributing](#-contributing)
    - [Paper Formatting Guidelines](#paper-formatting-guidelines)
    - [Badge Colors](#badge-colors)
  - [📄 License](#-license)
  - [📑 Citation](#-citation)
  - [⚠️ Disclaimer](#️-disclaimer)
  - [📧 Contact](#-contact-1)
  - [🙏 Acknowledgments](#-acknowledgments)
  - [📖 Our Paper](#-our-paper)

---

## 🔗 Related Survey

<b>General AI Survey Papers</b>

<ul>
<li><i><b>A Survey of Large Language Models</b></i>, Zhao et al.,
    
</li>
<li><i><b>The Prompt Report: A Systematic Survey of Prompt Engineering Techniques</b></i>, Schulhoff et al., 
    </li>
<li><i><b>A Systematic Survey of Prompt Engineering in Large Language Models: Techniques and Applications</b></i>, Sahoo et al., 
    </li>
<li><i><b>A Systematic Survey of Prompt Engineering on Vision-Language Foundation Models</b></i>, Gao et al., 
    </li>
</ul>

<b>Context and Reasoning</b>

<ul>
<li><i><b>A Survey on In-context Learning</b></i>, Dong et al., 
</li>
<li><i><b>The Mystery of In-Context Learning: A Comprehensive Survey on Interpretation and Analysis</b></i>, Zhou et al., 
</li>
<li><i><b>A Comprehensive Survey of Retrieval-Augmented Generation (RAG): Evolution, Current Landscape and Future Directions</b></i>, Gupta et al., 
    </li>
<li><i><b>Retrieval-Augmented Generation for Large Language Models: A Survey</b></i>, Gao et al., 
</li>
<li><i><b>A Survey on Knowledge-Oriented Retrieval-Augmented Generation</b></i>, Cheng et al., 
</li>
</ul>

<b>Memory Systems and Context Persistence</b>

<b>Survey</b>
<ul>
<li><i><b>A Survey on the Memory Mechanism of Large Language Model based Agents</b></i>, Zhang et al., 
    </li>
<li><i><b>Survey on Memory-Augmented Neural Networks: Cognitive Insights to AI Applications</b></i>, Khosla et al., 
    </li>
<li><i><b>From Human Memory to AI Memory: A Survey on Memory Mechanisms in the Era of LLMs</b></i>, Wu et al., 
    </li>
<li><i><b>Survey on Evaluation of LLM-based Agents</b></i>, Anonymous et al., 
    </li>
<li><i><b>A Survey of Personalized Large Language Models: Progress and Future Directions</b></i>, Anonymous et al., 
    </li>
<li><i><b>Agentic Retrieval-Augmented Generation: A Survey</b></i>, Anonymous et al., 
    </li>
<li><i><b>Retrieval-Augmented Generation with Graphs (GraphRAG)</b></i>, Anonymous et al., 
    </li>
<li><i><b>The Landscape of Agentic Reinforcement Learning for LLMs: A Survey</b></i>, Zhang et al., 
    </li>
</ul>

<b>Benchmarks</b>
<ul>
<li><i><b>Evaluating Very Long-Term Conversational Memory of LLM Agents (LOCOMO)</b></i>, Anonymous et al., 
    </li>
<li><i><b>Evaluating Memory in LLM Agents via Incremental Multi-Turn Interactions</b></i>, Hu et al.,
    
  		<img src="https://huggingface.co/datasets/huggingface/badges/resolve/main/dataset-on-hf-sm.svg" alt="HF Dataset">
    &lt;/a></li>
<li><i><b>Episodic Memories Generation and Evaluation Benchmark for Large Language Models</b></i>, Anonymous et al., 
    </li>
<li><i><b>On the Structural Memory of LLM Agents</b></i>, Anonymous et al., 
    </li>
<li><i><b>HotpotQA: A Dataset for Diverse, Explainable Multi-hop Question Answering</b></i>, Yang et al., 
    </li>
</ul>
<b>Neural Memory Architectures</b>

<ul>
<li><i><b>Neural Turing Machines</b></i>, Graves et al., 
    </li>
<li><i><b>Differentiable Neural Computers</b></i>, Graves et al., 
    </li>
<li><i><b>A Brain-inspired Memory Transformation based Differentiable Neural Computer</b></i>, Anonymous et al., 
    </li>
<li><i><b>Differentiable Neural Computers with Memory Demon</b></i>, Anonymous et al., 
    </li>
</ul>
<b>Memory-Augmented Transformers</b>

<ul>
<li><i><b>Memorizing Transformers</b></i>, Wu et al., 
    </li>
<li><i><b>Recurrent Memory Transformer</b></i>, Bulatov et al., 
    </li>
<li><i><b>Leave No Context Behind: Efficient Infinite Context Transformers with Infini-attention</b></i>, Munkhdalai et al., 
    </li>
<li><i><b>Memformer: A Memory-Augmented Transformer for Sequence Modeling</b></i>, Wu et al., 
    </li>
<li><i><b>Token Turing Machines</b></i>, Ryoo et al., 
    </li>
<li><i><b>TransformerFAM: Feedback Attention is Working Memory</b></i>, Irie et al., 
    </li>
</ul>

<b>Production Memory Systems</b>
<ul>
<li><i><b>MemGPT: Towards LLMs as Operating Systems</b></i>, Packer et al., 
    </li>
<li><i><b>MemoryBank: Enhancing Large Language Models with Long-Term Memory</b></i>, Zhong et al., 
    </li>
<li><i><b>MEM0: Building Production-Ready AI Agents with Scalable Long-Term Memory</b></i>, Taranjeet et al., 
    </li>
<li><i><b>MEM1: Learning to Synergize Memory and Reasoning for Efficient Long-Horizon Agents</b></i>, Anonymous et al., 
    </li>
<li><i><b>A-MEM: Agentic Memory for LLM Agents</b></i>, Anonymous et al., 
    </li>
<li><i><b>MemAgent: Reshaping Long-Context LLM with Multi-Conv RL-based Memory Agent</b></i>, Anonymous et al., 
    </li>
<li><i><b>Memory OS of AI Agent</b></i>, Kang et al., 
    </li>
</ul>
<b>Graph-based Memory Systems</b>

<ul>
<li><i><b>arigraph: learning knowledge graph world models with episodic memory for llm agents</b></i>, Anonymous et al., 
    </li>
<li><i><b>Zep: A Temporal Knowledge Graph Architecture for Agent Memory</b></i>, Anonymous et al., 
    </li>
<li><i><b>KG-Agent: An Efficient Autonomous Agent Framework for Complex Reasoning over Knowledge Graph</b></i>, Anonymous et al., 
    </li>
<li><i><b>GraphReader: Building Graph-based Agent to Enhance Long-Context Abilities of Large Language Models</b></i>, Anonymous et al., 
    </li>
<li><i><b>From Local to Global: A GraphRAG Approach to Query-Focused Summarization</b></i>, Edge et al., 
    </li>
<li><i><b>Knowledge Graph-Guided Retrieval Augmented Generation</b></i>, Zhu et al., 
    </li>
</ul>
<b>Episodic and Working Memory</b>

<ul>
<li><i><b>Larimar: Large Language Models with Episodic Memory Control</b></i>, Goyal et al., 
    </li>
<li><i><b>EM-LLM: Human-like Episodic Memory for Infinite Context LLMs</b></i>, Anonymous et al., 
    </li>
<li><i><b>Large Language Models with Controllable Working Memory</b></i>, Goyal et al., 
    </li>
<li><i><b>Empowering Working Memory for Large Language Model Agents</b></i>, Anonymous et al., 
    </li>
</ul>
<b>Conversational Memory</b>

<ul>
<li><i><b>MemoChat: Tuning LLMs to Use Memos for Consistent Long-Range Open-Domain Conversation</b></i>, Anonymous et al., 
    </li>
<li><i><b>Think-in-Memory: Recalling and Post-thinking Enable LLMs with Long-Term Memory</b></i>, Anonymous et al., 
    </li>
<li><i><b>Generative Agents: Interactive Simulacra of Human Behavior</b></i>, Park et al., 
    </li>
<li><i><b>Self-Controlled Memory Framework for Large Language Models</b></i>, Anonymous et al., 
    </li>
</ul>
<b>Foundational Survey Papers from Major Venues</b>

<ul>
<li><i><b>AUTOPROMPT: Eliciting Knowledge from Language Models with Automatically Generated Prompts</b></i>, Shin et al., 
    </li>
<li><i><b>The Power of Scale for Parameter-Efficient Prompt Tuning</b></i>, Lester et al., 
    </li>
<li><i><b>Prefix-Tuning: Optimizing Continuous Prompts for Generation</b></i>, Li et al., 
    </li>
<li><i><b>An Explanation of In-context Learning as Implicit Bayesian Inference</b></i>, Xie et al., 
    </li>
<li><i><b>Rethinking the Role of Demonstrations: What Makes In-context Learning Work?</b></i>, Min et al., 
    </li>
</ul>

<b>Additional RAG and Retrieval Surveys</b>
<ul>
<li><i><b>Retrieval-Augmented Generation for AI-Generated Content: A Survey</b></i>, Various, 
    </li>
<li><i><b>Retrieval Augmented Generation (RAG) and Beyond: A Comprehensive Survey on How to Make your LLMs use External Data More Wisely</b></i>, Various, 
    </li>
<li><i><b>Large language models (LLMs): survey, technical frameworks, and future challenges</b></i>, Various, 
    </li>
</ul>

---

## 🏗️ Definition of Context Engineering

> **Context is not just the single prompt users send to an LLM. Context is the complete information payload provided to a LLM at inference time, encompassing all structured informational components that the model needs to plausibly accomplish a given task.**

### LLM Generation

To formally define Context Engineering, we must first mathematically characterize the LLM generation process. Let us model an LLM as a probabilistic function:

$$P(\text{output} | \text{context}) = \prod_{t=1}^T P(\text{token}_t | \text{previous tokens}, \text{context})$$

Where:
- $\text{context}$ represents the complete input information provided to the LLM
- $\text{output}$ represents the generated response sequence
- $P(\text{token}_t | \text{previous tokens}, \text{context})$ is the probability of generating each token given the context

### Definition of Context

In traditional prompt engineering, the context is treated as a simple string:
$$\text{context} = \text{prompt}$$

However, in Context Engineering, we decompose the context into multiple structured components:

$$\text{context} = \text{Assemble}(\text{instructions}, \text{knowledge}, \text{tools}, \text{memory}, \text{state}, \text{query})$$

Where $\text{Assemble}$ is a context assembly function that orchestrates:
- $\text{instructions}$: System prompts and rules
- $\text{knowledge}$: Retrieved relevant information
- $\text{tools}$: Available function definitions
- $\text{memory}$: Conversation history and learned facts
- $\text{state}$: Current world/user state
- $\text{query}$: User's immediate request

### Definition of Context Engineering

**Context Engineering** is formally defined as the optimization problem:

$$\text{Assemble}^* = \arg\max_{\text{Assemble}} \mathbb{E} [\text{Reward}(\text{LLM}(\text{context}), \text{target})]$$

Subject to constraints:
- $|\text{context}| \leq \text{MaxTokens} \text{(context window limitation)}$
- $\text{knowledge} = \text{Retrieve}(\text{query}, \text{database})$
- $\text{memory} = \text{Select}(\text{history}, \text{query})$
- $\text{state} = \text{Extract}(\text{world})$

Where:
- $\text{Reward}$ measures the quality of generated responses
- $\text{Retrieve}$, $\text{Select}$, $\text{Extract}$ are functions for information gathering

### Dynamic Context Orchestration

The context assembly can be decomposed as:

$$\text{context} = \text{Concat}(\text{Format}(\text{instructions}), \text{Format}(\text{knowledge}), \text{Format}(\text{tools}), \text{Format}(\text{memory}), \text{Format}(\text{query}))$$

Where $\text{Format}$ represents component-specific structuring, and $\text{Concat}$ assembles them respecting token limits and optimal positioning.

**Context Engineering** is therefore the discipline of designing and optimizing these assembly and formatting functions to maximize task performance.

### Mathematical Principles

From this formalization, we derive four fundamental principles:

1. **System-Level Optimization**: Context generation is a multi-objective optimization problem over assembly functions, not simple string manipulation.

2. **Dynamic Adaptation**: The context assembly function adapts to each $\text{query}$ and $\text{state}$ at inference time: $\text{Assemble}(\cdot | \text{query}, \text{state})$.

3. **Information-Theoretic Optimality**: The retrieval function maximizes relevant information: $\text{Retrieve} = \arg\max \text{Relevance}(\text{knowledge}, \text{query})$.

4. **Structural Sensitivity**: The formatting functions encode structure that aligns with LLM processing capabilities.

### Theoretical Framework: Bayesian Context Inference

Context Engineering can be formalized within a Bayesian framework where the optimal context is inferred:

$$P(\text{context} | \text{query}, \text{history}, \text{world}) \propto P(\text{query} | \text{context}) \cdot P(\text{context} | \text{history}, \text{world})$$

Where:
- $P(\text{query} | \text{context})$ models query-context compatibility
- $P(\text{context} | \text{history}, \text{world})$ represents prior context probability

The optimal context assembly becomes:

$$\text{context}^* = \arg\max_{\text{context}} P(\text{answer} | \text{query}, \text{context}) \cdot P(\text{context} | \text{query}, \text{history}, \text{world})$$

This Bayesian formulation enables:
- **Uncertainty Quantification**: Modeling confidence in context relevance
- **Adaptive Retrieval**: Updating context beliefs based on feedback
- **Multi-step Reasoning**: Maintaining context distributions across interactions

### Comparison

| Dimension | Prompt Engineering | Context Engineering |
|-----------|-------------------|-------------------|
| **Mathematical Model** | $\text{context} = \text{prompt}$ (static) | $\text{context} = \text{Assemble}(...)$ (dynamic) |
| **Optimization Target** | $\arg\max_{\text{prompt}} P(\text{answer} \mid \text{query}, \text{prompt})$ | $\arg\max_{\text{Assemble}} \mathbb{E}[\text{Reward}(...)]$ |
| **Complexity** | $O(1)$ context assembly | $O(n)$ multi-component optimization |
| **Information Theory** | Fixed information content | Adaptive information maximization |
| **State Management** | Stateless function | Stateful with $\text{memory}(\text{history}, \text{query})$ |
| **Scalability** | Linear in prompt length | Sublinear through compression/filtering |
| **Error Analysis** | Manual prompt inspection | Systematic evaluation of assembly components |

---

## 🌐 Related Blogs

- [Bernstein](https://github.com/sipyourdrink-ltd/bernstein) - Multi-agent orchestrator with context-aware model routing. Routes tasks to optimal models based on complexity, manages context across parallel agents.
- [The rise of "context engineering"](https://blog.langchain.com/the-rise-of-context-engineering/)
- [The New Skill in AI is Not Prompting, It's Context Engineering](https://www.philschmid.de/context-engineering)
- [davidkimai/Context-Engineering: "Context engineering is the delicate art and science of filling the context window with just the right information for the next step." ](https://github.com/davidkimai/Context-Engineering)
- [Context Engineering is Runtime of AI Agents | by Bijit Ghosh | Jun, 2025 | Medium](https://medium.com/@bijit211987/context-engineering-is-runtime-of-ai-agents-411c9b2ef1cb)
- [Context Engineering](https://blog.langchain.com/context-engineering-for-agents/)
- [Context Engineering for Agents](https://rlancemartin.github.io/2025/06/23/context_engineering/)
- [Cognition | Don't Build Multi-Agents](https://cognition.ai/blog/dont-build-multi-agents)
- [从Prompt Engineering到Context Engineering - 53AI-AI知识库|大模型知识库|大模型训练|智能体开发](https://www.53ai.com/news/tishicikuangjia/2025062727685.html)
- [What Is Context Engineering?](https://www.outcomeops.ai/context-engineering)

### Social Media & Talks

- [Mastering Claude Code in 30 minutes](https://www.youtube.com/watch?v=6eBSHbLKuN0)
- [Context Engineering for Agents](https://www.youtube.com/watch?v=4GiqzUHD5AA)
- [Andrej Karpathy on X: "+1 for "context engineering" over "prompt engineering"](https://x.com/karpathy/status/1937902205765607626?ref=blog.langchain.com)
- [复旦大学/上海创智学院邱锡鹏：Context Scaling，通往AGI的下一幕](https://mp.weixin.qq.com/s/Knej0qbyr5j5KX_BO7FGew)

---

## 🤔 Why Context Engineering?

### The Paradigm Shift: From Tactical to Strategic

The evolution from prompt engineering to context engineering represents a fundamental maturation in AI system design. As influential figures like Andrej Karpathy, Tobi Lutke, and Simon Willison have argued, the term "prompt engineering" has been diluted to mean simply "typing things into a chatbot," failing to capture the complexity required for industrial-strength LLM applications.

### 1. Fundamental Challenges with Current Approaches

#### Human Intent Communication Challenges
- **Unclear Human Intent Expression**: Human intentions are often unclear, incomplete, or ambiguous when expressed in natural language
- **AI's Incomplete Understanding of Human Intent**: AI systems struggle to fully comprehend complex human intentions, especially those involving implicit context or cultural nuances
- **Overly Literal AI Interpretation**: AI systems often interpret human instructions too literally, missing the underlying intent or contextual meaning

#### Complex Knowledge Requirements
Single models alone cannot solve complex problems that require:
- **(1) Large-scale External Knowledge**: Vast amounts of external knowledge that exceed model capacity
- **(2) Accurate External Knowledge**: Precise, up-to-date information that models may not possess
- **(3) Novel External Knowledge**: Emerging knowledge that appears after model training

**Static Knowledge Limitations:**
- **Static Knowledge Problem**: Pre-trained models contain static knowledge that becomes outdated
- **Knowledge Cutoff**: Models cannot access information beyond their training data
- **Domain-Specific Gaps**: Models lack specialized knowledge for specific industries or applications

#### Reliability and Trustworthiness Issues
- **AI Hallucination**: LLMs generate plausible but factually incorrect information when lacking proper context
- **Lack of Provenance**: Absence of clear source attribution for generated information
- **Confidence Calibration**: Models often appear confident even when generating false information
- **Transparency Gaps**: Inability to trace how conclusions were reached
- **Accountability Issues**: Difficulty in verifying the reliability of AI-generated content

### 2. Limitations of Static Prompting

#### From Strings to Systems
Traditional prompting treats context as a static string, but enterprise applications require:
- **Dynamic Information Assembly**: Context created on-the-fly, tailored to specific users and queries
- **Multi-Source Integration**: Combining databases, APIs, documents, and real-time data
- **State Management**: Maintaining conversation history, user preferences, and workflow status
- **Tool Orchestration**: Coordinating external function calls and API interactions

#### The "Movie Production" Analogy
If prompt engineering is writing a single line of dialogue for an actor, context engineering is the entire process of building the set, designing lighting, providing detailed backstory, and directing the scene. The dialogue only achieves its intended impact because of the rich, carefully constructed environment surrounding it.

### 3. Enterprise and Production Requirements

#### Context Failures Are the New Bottleneck
Most failures in modern agentic systems are no longer attributable to core model reasoning capabilities but are instead **"context failures"**. The true engineering challenge lies not in what question to ask, but in ensuring the model has all necessary background, data, tools, and memory to answer meaningfully and reliably.

#### Scalability Beyond Simple Tasks
While prompt engineering suffices for simple, self-contained tasks, it breaks down when scaled to:
- **Complex, multi-step applications**
- **Data-rich enterprise environments** 
- **Stateful, long-running workflows**
- **Multi-user, multi-tenant systems**

#### Reliability and Consistency
Enterprise applications demand:
- **Deterministic Behavior**: Predictable outputs across different contexts and users
- **Error Handling**: Graceful degradation when information is incomplete or contradictory
- **Audit Trails**: Transparency in how context influences model decisions
- **Compliance**: Meeting regulatory requirements for data handling and decision making

#### Economic and Operational Efficiency
Context Engineering enables:
- **Cost Optimization**: Strategic choice between RAG and long-context approaches
- **Latency Management**: Efficient information retrieval and context assembly
- **Resource Utilization**: Optimal use of finite context windows and computational resources
- **Maintenance Scalability**: Systematic approaches to updating and managing knowledge bases

Context Engineering provides the architectural foundation for managing state, integrating diverse data sources, and maintaining coherence across these demanding scenarios.

### 4. Cognitive and Information Science Foundations

#### Artificial Embodiment
LLMs are essentially "brains in a vat" - powerful reasoning engines lacking connection to specific environments. Context Engineering provides:
- **Synthetic Sensory Systems**: Retrieval mechanisms as artificial perception
- **Proxy Embodiment**: Tool use as artificial action capabilities  
- **Artificial Memory**: Structured information storage and retrieval

#### Information Retrieval at Scale
Context Engineering addresses the fundamental challenge of information retrieval where the "user" is not human but an AI agent. This requires:
- **Semantic Understanding**: Bridging the gap between intent and expression
- **Relevance Optimization**: Ranking and filtering vast knowledge bases
- **Query Transformation**: Converting ambiguous requests into precise retrieval operations

### 5. The Future of AI System Architecture

Context Engineering elevates AI development from a collection of "prompting tricks" to a rigorous discipline of systems architecture. It applies decades of knowledge in operating system design, memory management, and distributed systems to the unique challenges of LLM-based applications.

This discipline is foundational for unlocking the full potential of LLMs in production systems, enabling the transition from one-off text generation to autonomous agents and sophisticated AI copilots that can reliably operate in complex, dynamic environments.

---

## 🔧 Components, Techniques and Architectures

### Context Scaling

<b>Position Interpolation and Extension Techniques</b>
<ul>
<li><i><b>Extending Context Window of Large Language Models via Position Interpolation</b></i>, Chen et al., 
    </li>
<li><i><b>YaRN: Efficient Context Window Extension of Large Language Models</b></i>, Peng et al., 
    </li>
<li><i><b>LongRoPE: Extending LLM Context Window Beyond 2 Million Tokens</b></i>, Ding et al., 
    </li>
<li><i><b>LongRoPE2: Near-Lossless LLM Context Window Scaling</b></i>, Shang et al., 
    </li>
</ul>

<b>Memory-Efficient Attention Mechanisms</b>
<ul>
<li><i><b>Fast Multipole Attention: A Divide-and-Conquer Attention Mechanism for Long Sequences</b></i>, Kang et al., 
    </li>
<li><i><b>Leave No Context Behind: Efficient Infinite Context Transformers with Infini-attention</b></i>, Munkhdalai et al., 
    </li>
<li><i><b>DuoAttention: Efficient Long-Context LLM Inference with Retrieval and Streaming Heads</b></i>, Xiao et al., 
    </li>
<li><i><b>Star Attention: Efficient LLM Inference over Long Sequences</b></i>, Acharya et al., 
    </li>
</ul>

<b>Ultra-Long Sequence Processing (100K+ Tokens)</b>
<ul>
<li><i><b>TokenSwift: Lossless Acceleration of Ultra Long Sequence Generation</b></i>, Wu et al., 
    </li>
<li><i><b>LongHeads: Multi-Head Attention is Secretly a Long Context Processor</b></i>, Lu et al., 
    </li>
<li><i><b>∞Bench: Extending Long Context Evaluation Beyond 100K Tokens</b></i>, Bai et al., 
    </li>
</ul>

<b>Comprehensive Extension Surveys and Methods</b>
<ul>
<li><i><b>Beyond the Limits: A Survey of Techniques to Extend the Context Length in Large Language Models</b></i>, Various, 
    </li>
<li><i><b>A Controlled Study on Long Context Extension and Generalization in LLMs</b></i>, Various, 
    </li>
<li><i><b>Selective Attention: Enhancing Transformer through Principled Context Control</b></i>, Various, 
    </li>
</ul>
<b>Vision-Language Models with Sophisticated Context Understanding</b>

<ul>
<li><i><b>Towards LLM-Centric Multimodal Fusion: A Survey on Integration Strategies and Techniques</b></i>, An et al., 
    </li>
<li><i><b>Browse and Concentrate: Comprehending Multimodal Content via Prior-LLM Context Fusion</b></i>, Wang et al., 
    </li>
<li><i><b>V2PE: Improving Multimodal Long-Context Capability of Vision-Language Models with Variable Visual Position Encoding</b></i>, Dai et al., 
    </li>
<li><i><b>Flamingo: a Visual Language Model for Few-Shot Learning</b></i>, Alayrac et al., 
    </li>
<li><i><b>LensVLM: Selective Context Expansion for Compressed Visual Representation of Text</b></i>, Xie et al., 
    </li>
</ul>

<b>Audio-Visual Context Integration and Processing</b>

<ul>
<li><i><b>Aligned Better, Listen Better for Audio-Visual Large Language Models</b></i>, Guo et al., 
    </li>
<li><i><b>AVicuna: Audio-Visual LLM with Interleaver and Context-Boundary Alignment for Temporal Referential Dialogue</b></i>, Chen et al., 
    </li>
<li><i><b>SonicVisionLM: Playing Sound with Vision Language Models</b></i>, Xie et al., 
    </li>
<li><i><b>SAVEn-Vid: Synergistic Audio-Visual Integration for Enhanced Understanding in Long Video Context</b></i>, Li et al., 
    </li>
</ul>

<b>Multi-Modal Prompt Engineering and Context Design</b>

<ul>
<li><i><b>CaMML: Context-Aware Multimodal Learner for Large Models</b></i>, Chen et al., 
    </li>
<li><i><b>Visual In-Context Learning for Large Vision-Language Models</b></i>, Zhou et al., 
    </li>
<li><i><b>CAMA: Enhancing Multimodal In-Context Learning with Context-Aware Modulated Attention</b></i>, Li et al., 
    </li>
</ul>

<b>CVPR 2024 Vision-Language Advances</b>

<ul>
<li><i><b>CogAgent: A Visual Language Model for GUI Agents</b></i>, Various, 
    </li>
<li><i><b>LISA: Reasoning Segmentation via Large Language Model</b></i>, Various, 
    </li>
<li><i><b>Reproducible scaling laws for contrastive language-image learning</b></i>, Various, 
    </li>
</ul>

<b>Video and Temporal Understanding</b>

<ul>
<li><i><b>Video Understanding with Large Language Models: A Survey</b></i>, Various, 
    </li>
</ul>

### Context Management in Production

In the agent era, context engineering increasingly means **runtime context management** rather than only prompt construction. Production systems now rely on compaction, caching, artifact-backed state, and scoped instruction loading to keep long-horizon agents efficient and controllable.

<b>Runtime Context Management Patterns</b>
<ul>
<li><i><b>OpenAI Agents Guide</b></i>, OpenAI, </li>
<li><i><b>OpenAI Tools: Conversation State, Prompt Caching, and Compaction</b></i>, OpenAI, </li>
<li><i><b>Google ADK: Context Caching and Context Compression</b></i>, Google, </li>
<li><i><b>Claude Code Memory and Scoped Project Instructions</b></i>, Anthropic, </li>
<li><i><b>LangChain Deep Agents: Filesystem-Based Context Management</b></i>, LangChain, </li>
</ul>

<b>Context Optimization Engines</b>
<ul>
<li><i><b>Entroly: The Context Engineering Engine for AI Coding Agents</b></i> — Information-theoretic context optimization — 78% fewer tokens, 100% codebase visibility, reinforcement learning, Rust engine (<10ms). MCP server + HTTP proxy. Works with Cursor, Claude Code, Copilot, OpenClaw. 
    </li>
</ul>

<b>Production Design Questions</b>
<ul>
<li><i><b>When should state stay in the prompt versus move into files, memory stores, or external tools?</b></i></li>
<li><i><b>How should long-running threads be compacted without losing provenance, instructions, or active plans?</b></i></li>
<li><i><b>How should project rules be loaded conditionally by path, task, or subagent instead of globally?</b></i></li>
<li><i><b>How should prompt caching be combined with memory writes and retrieval freshness?</b></i></li>
</ul>

### Structured Data Integration

<b>Knowledge Graph-Enhanced Language Models</b>
<ul>
<li><i><b>Learn Together: Joint Multitask Finetuning of Pretrained KG-enhanced LLM for Downstream Tasks</b></i>, Martynova et al., 
    </li>
<li><i><b>Knowledge Graph Tuning: Real-time Large Language Model Personalization based on Human Feedback</b></i>, Sun et al., 
    </li>
<li><i><b>Knowledge Graph-Guided Retrieval Augmented Generation</b></i>, Zhu et al., 
    </li>
<li><i><b>KGLA: Knowledge Graph Enhanced Language Agents for Customer Service</b></i>, Anonymous et al., 
    </li>
</ul>

<b>Graph Neural Networks Combined with Language Models</b>
<ul>
<li><i><b>Are Large Language Models In-Context Graph Learners?</b></i>, Li et al., 
    </li>
<li><i><b>Let's Ask GNN: Empowering Large Language Model for Graph In-Context Learning</b></i>, Hu et al., 
    </li>
<li><i><b>GL-Fusion: Rethinking the Combination of Graph Neural Network and Large Language model</b></i>, Yang et al., 
    </li>
<li><i><b>NT-LLM: A Novel Node Tokenizer for Integrating Graph Structure into Large Language Models</b></i>, Ji et al., 
    </li>
</ul>

<b>Structured Data Integration</b>
<ul>
<li><i><b>CoddLLM: Empowering Large Language Models for Data Analytics</b></i>, Authors et al., 
    </li>
<li><i><b>Structure-Guided Large Language Models for Text-to-SQL Generation</b></i>, Authors et al., 
    </li>
<li><i><b>StructuredRAG: JSON Response Formatting with Large Language Models</b></i>, Authors et al., 
    </li>
</ul>

<b>Foundational KG-LLM Integration Methods</b>

<ul>
<li><i><b>Unifying Large Language Models and Knowledge Graphs: A Roadmap</b></i>, Various, 
    </li>
<li><i><b>Combining Knowledge Graphs and Large Language Models</b></i>, Various, 
    </li>
<li><i><b>All Against Some: Efficient Integration of Large Language Models for Message Passing in Graph Neural Networks</b></i>, Various, 
    </li>
<li><i><b>Large Language Models for Graph Learning</b></i>, Various, 
    </li>
</ul>

### Self-Generated Context

<b>Self-Supervised Context Generation and Augmentation</b>

<ul>
<li><i><b>SelfCite: Self-Supervised Alignment for Context Attribution in Large Language Models</b></i>, Chuang et al., 
    </li>
<li><i><b>Self-Supervised Prompt Optimization</b></i>, Xiang et al., 
    </li>
<li><i><b>SCOPE: A Self-supervised Framework for Improving Faithfulness in Conditional Text Generation</b></i>, Duong et al., 
    </li>
</ul>

<b>Reasoning Models That Generate Their Own Context</b>

<ul>
<li><i><b>Self-Consistency Improves Chain of Thought Reasoning in Language Models</b></i>, Wang et al., 
    </li>
<li><i><b>Tree of Thoughts: Deliberate Problem Solving with Large Language Models</b></i>, Yao et al., 
    </li>
<li><i><b>Rethinking Chain-of-Thought from the Perspective of Self-Training</b></i>, Wu et al., 
    </li>
<li><i><b>Autonomous Tree-search Ability of Large Language Models</b></i>, Authors et al., 
    </li>
</ul>

<b>Iterative Context Refinement and Self-Improvement</b>
<ul>
<li><i><b>Self-Refine: Iterative Refinement with Self-Feedback</b></i>, Madaan et al., 
    </li>
<li><i><b>Reflect, Retry, Reward: Self-Improving LLMs via Reinforcement Learning</b></i>, Authors et al., 
    </li>
<li><i><b>Large Language Models Can Self-Improve in Long-context Reasoning</b></i>, Li et al., 
    </li>
<li><i><b>Code Generation with AlphaCodium: From Prompt Engineering to Flow Engineering</b></i>, Oren et al.,  
    </li>
<li><i><b>Language Agent Tree Search Unifies Reasoning Acting and Planning in Language Models</b></i>, Zhou et al.,  
    </li>
</ul>

<b>Meta-Learning and Autonomous Context Evolution</b>
<ul>
<li><i><b>Meta-in-context learning in large language models</b></i>, Coda-Forno et al., 
    </li>
<li><i><b>EvoPrompt: Connecting LLMs with Evolutionary Algorithms Yields Powerful Prompt Optimizers</b></i>, Guo et al., 
    </li>
<li><i><b>AutoPDL: Automatic Prompt Optimization for LLM Agents</b></i>, Spiess et al., 
    </li>
<li><i><b>Agent-Pro: Learning to Evolve Coder Agents via Proposal-based Programming</b></i>, Zhang et al., 
    </li>
</ul>

<b>Foundational Chain-of-Thought Research</b>
<ul>
<li><i><b>Chain-of-thought prompting elicits reasoning in large language models</b></i>, Wei et al., 
    </li>
</ul>

---

## 🛠️ Implementation and Challenges

### 0. Agent Harnesses and Runtime Systems

In 2026, many of the most important advances in context engineering no longer live only inside the prompt. They live inside the **agent harness**: the runtime loop that manages plans, subagents, checkpoints, files, approvals, tool execution, and recovery from failure. This is where context engineering becomes agent engineering.

<b>Harness and Runtime Design References</b>
<ul>
<li><i><b>Building Effective Agents</b></i>, Anthropic, </li>
<li><i><b>OpenAI Agents Guide</b></i>, OpenAI, </li>
<li><i><b>Google Agent Development Kit (ADK)</b></i>, Google, </li>
<li><i><b>LangChain Deep Agents Overview</b></i>, LangChain, </li>
<li><i><b>Microsoft Agent Framework Overview</b></i>, Microsoft, </li>
<li><i><b>Bring Your AI</b></i> — Local-first Claude Code to Codex harness mover for rules, skills, MCP config, and validation notes. </li>
</ul>

<b>Core Runtime Concerns</b>
<ul>
<li><i><b>Planning and decomposition</b></i>: how long tasks are split into manageable units</li>
<li><i><b>Durable execution</b></i>: how agent state is checkpointed, resumed, or replayed</li>
<li><i><b>Context isolation</b></i>: how subagents and tools avoid polluting each other's working state</li>
<li><i><b>Sandboxing and artifacts</b></i>: how file systems, shells, browsers, and outputs become part of the context pipeline</li>
<li><i><b>Human approvals and interrupts</b></i>: how production agents remain controllable during risky or long-running actions</li>
</ul>

### 1. Retrieval-Augmented Generation (RAG)

<b>survey</b>

<ul>
<li><i><b>Retrieval-Augmented Generation for Large Language Models: A Survey</b></i>, Yunfan Gao et al., 
    
</li>
<li><i><b>A Survey of Graph Retrieval-Augmented Generation for Customized Large Language Models</b></i>, Siyun Zhao et al., 
    
</li>
<li><i><b>Retrieval Augmented Generation (RAG) and Beyond: A Comprehensive Survey on How to Make your LLMs use External Data More Wisely</b></i>, Siyun Zhao et al., 
</li>
<li><i><b>Evaluation of Retrieval-Augmented Generation: A Survey</b></i>, Hao Yu et al., 
    
</li>
<li><i><b>Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks</b></i>, Lewis et al., 
    </li>
<li><i><b>A Survey on Knowledge-Oriented Retrieval-Augmented Generation</b></i>, Cheng et al., 
    </li>
<li><i><b>A Survey on RAG Meeting LLMs: Towards Retrieval-Augmented Large Language Models</b></i>, Ding et al., 
    </li>
</ul>

<b>Naive RAG</b>

<ul>
<li><i><b>Beyond the Limits: A Survey of Techniques to Extend the Context Length in Large Language Models</b></i>, Xindi Wang et al., 
</li>
<li><i><b>In-context Examples Selection for Machine Translation</b></i>, Sweta Agrawal et al., 
</li>
<li><i><b>In Defense of RAG in the Era of Long-Context Language Models</b></i>, Tan Yu et al., 
</li>
<li><i><b>Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks</b></i>, Patrick Lewis et al., 
</li>
<li><i><b>LightRAG: Simple and Fast Retrieval-Augmented Generation</b></i>, Zirui Guo et al., 
    
</li>
<li><i><b>Generate rather than Retrieve: Large Language Models are Strong Context Generators</b></i>, Wenhao Yu et al., 
    
</li>
<li><i><b>Large language models can be easily distracted by irrelevant context</b></i>, Freda Shi et al., 
    
</li>
<li><i><b>Old IR Methods Meet RAG</b></i>, Oz Huly et al.
</li>
<li><i><b>Dense Passage Retrieval for Open-Domain Question Answering</b></i>, Vladimir Karpukhin et al., 
    
</li>
</ul>

<b>Advanced RAG</b>

<ul>
<li><i><b>Adaptive-RAG: Learning to Adapt Retrieval-Augmented Large Language Models through Question Complexity</b></i>, Soyeong Jeong et al., 
    
</li>
<li><i><b>Improving language models by retrieving from trillions of tokens</b></i>, Sebastian Borgeaud et al., 
</li>
<li><i><b>FoRAG: Factuality-optimized Retrieval Augmented Generation for Web-enhanced Long-form Question Answering</b></i>, Tianchi Cai et al.
</li>
<li><i><b>IM-RAG: Multi-Round Retrieval-Augmented Generation Through Learning Inner Monologues</b></i>, Diji Yang et al., 
</li>
<li><i><b>RAGCache: Efficient Knowledge Caching for Retrieval-Augmented Generation</b></i>, Chao Jin et al., 
</li>
<li><i><b>Corrective Retrieval Augmented Generation</b></i>, Shi-Qi Yan et al., 
    
</li>
<li><i><b>RankRAG: Unifying Context Ranking with Retrieval-Augmented Generation in LLMs</b></i>, Yue Yu et al., 
</li>
<li><i><b>Astute RAG: Overcoming Imperfect Retrieval Augmentation and Knowledge Conflicts for Large Language Models</b></i>, Fei Wang et al., 
</li>
<li><i><b>Learning to Filter Context for Retrieval-Augmented Generation</b></i>, Zhiruo Wang et al., 
    
</li>
<li><i><b>Query Rewriting in Retrieval-Augmented Large Language Models</b></i>, Xinbei Ma et al., 
    
</li>
<li><i><b>UPRISE: Universal Prompt Retrieval for Improving Zero-Shot Evaluation</b></i>, Daixuan Cheng et al., 
    
</li>
<li><i><b>Longllmlingua: Accelerating and enhancing llms in long context scenarios via prompt compression</b></i>, Huiqiang Jiang et al., 
    
</li>
<li><i><b>Document-level event argument extraction by conditional generation</b></i>, Sha Li et al., 
    
</li>
<li><i><b>Multi-sentence Argument Linking</b></i>, Seth Ebner et al., 
    
</li>
<li><i><b>Fine-tuning or retrieval? comparing knowledge injection in llms</b></i>, Oded Ovadia et al., 
</li>
<li><i><b>IAG: Induction-Augmented Generation Framework for Answering Reasoning Questions</b></i>, Zhebin Zhang et al., 
</li>
<li><i><b>Retrieval Meets Long Context Large Language Models</b></i>, Peng Xu et al., 
</li>
<li><i><b>Dense x retrieval: What retrieval granularity should we use?</b></i>, Tong Chen et al., 
    
</li>
<li><i><b>Investigating the Factual Knowledge Boundary of Large Language Models with Retrieval Augmentation</b></i>, Ruiyang Ren et al., 
    
</li>
<li><i><b>The Power of Noise: Redefining Retrieval for RAG Systems</b></i>, Florin Cuconasu et al., 
    
</li>
<li><i><b>RECITATION-AUGMENTED LANGUAGE MODELS</b></i>, Zhiqing Sun et al., 
    
</li>
<li><i><b>Robust Retrieval Augmented Generation for Zero-shot Slot Filling</b></i>, Michael Glass et al., 
    
</li>
<li><i><b>In-Context Retrieval-Augmented Language Models</b></i>, Ori Ram et al., 
    
</li>
<li><i><b>Learning to Retrieve In-Context Examples for Large Language Models</b></i>, Liang Wang et al., 
    
</li>
</ul>

<b>Modular RAG</b>

<ul>
<li><i><b>FlashRAG: A Modular Toolkit for Efficient Retrieval-Augmented Generation Research</b></i>, Jiajie Jin et al., 
    
</li>
<li><i><b>Multi-Head RAG: Solving Multi-Aspect Problems with LLMs</b></i>, Maciej Besta et al., 
    
</li>
<li><i><b>StructRAG: Boosting Knowledge Intensive Reasoning of LLMs via Inference-time Hybrid Information Structurization</b></i>, Zhuoqun Li et al., 
    
</li>
<li><i><b>RAFT: Adapting Language Model to Domain Specific RAG</b></i>, Tianjun Zhang et al., 
    
</li>
<li><i><b>Retrieval-Generation Alignment for End-to-End Task-Oriented Dialogue System</b></i>, Weizhou Shen et al., 
    
</li>
<li><i><b>UniMS-RAG: A Unified Multi-source Retrieval-Augmented Generation for Personalized Dialogue Systems</b></i>, Hongru Wang et al., 
</li>
<li><i><b>Retrieve-and-Sample: Document-level Event Argument Extraction via Hybrid Retrieval Augmentation</b></i>, Yubing Ren et al.
</li>
<li><i><b>RA-DIT: RETRIEVAL-AUGMENTED DUAL INSTRUCTION TUNING</b></i>, Xi Victoria Lin et al., 
    
</li>
<li><i><b>Self-Knowledge Guided Retrieval Augmentation for Large Language Models</b></i>, Yile Wang et al., 
    
</li>
<li><i><b>Prompt-Guided Retrieval Augmentation for Non-Knowledge-Intensive Tasks</b></i>, Zhicheng Guo et al., 
    
</li>
<li><i><b>REPLUG: Retrieval-Augmented Black-Box Language Models</b></i>, Weijia Shi et al., 
</li>
<li><i><b>Query Rewriting for Retrieval-Augmented Large Language Models</b></i>, Xinbei Ma et al., 
    
</li>
<li><i><b>Lift Yourself Up: Retrieval-augmented Text Generation with Self-Memory</b></i>, Xin Cheng et al., 
    
</li>
<li><i><b>Improving the Domain Adaptation of Retrieval Augmented Generation (RAG) Models for Open Domain Question Answering</b></i>, Shamane Siriwardhana et al., 
</li>
</ul>

<b>Graph-Based RAG</b>

<ul>
<li><i><b>Don't Forget to Connect! Improving RAG with Graph-based Reranking</b></i>, Jialin Dong et al., 
</li>
<li><i><b>From Local to Global: A Graph RAG Approach to Query-Focused Summarization</b></i>, Darren Edge et al., 
</li>
<li><i><b>GRAG: Graph Retrieval-Augmented Generation</b></i>, Yuntong Hu et al., 
    
</li>
<li><i><b>Iseeq: Information seeking question generation using dynamic meta-information retrieval and knowledge graphs</b></i>, Manas Gaur et al., 
    
</li>
<li><i><b>G-retriever: Retrieval-augmented generation for textual graph understanding and question answering</b></i>, Xiaoxin He et al., 
    
</li>
<li><i><b>Knowledge graph prompting for multi-document question answering</b></i>, Yu Wang et al., 
    
</li>
<li><i><b>GNN-RAG: Graph Neural Retrieval for Large Language Model Reasoning</b></i>, Costas Mavromatis et al., 
    
</li>
<li><i><b>LightPROF: A Lightweight Reasoning Framework for Large Language Model on Knowledge Graph</b></i>
    
</li>
<li><i><b>Simple Is Effective: The Roles of Graphs and Large Language Models in Knowledge-Graph-Based Retrieval-Augmented Generation</b></i>
    
</li>
<li><i><b>Knowledge Graph-Guided Retrieval Augmented Generation</b></i>
    
</li>
<li><i><b>MedRAG: Enhancing Retrieval-augmented Generation with Knowledge Graph-Elicited Reasoning for Healthcare Copilot</b></i>
    
</li>
<li><i><b>Mitigating Large Language Model Hallucinations via Autonomous Knowledge Graph-based Retrofitting</b></i>, KGR et al., 
    
</li>
<li><i><b>In-depth Analysis of Graph-based RAG in a Unified Framework</b></i>
    
</li>
<li><i><b>RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval</b></i>, Parth Sarthi et al., 
    
</li>
<li><i><b>TableRAG: Million-Token Table Understanding with Language Models</b></i>, Si-An Chen et al., 
    
</li>
<li><i><b>KAG: Boosting LLMs in Professional Domains via Knowledge Augmented Generation</b></i>, Lei Liang et al., 
    
</li>
<li><i><b>GFM-RAG: Graph Foundation Model for Retrieval Augmented Generation</b></i>, Luo et al., 
    </li>
<li><i><b>HybridRAG: A Hybrid Retrieval System for RAG Combining Vector and Graph Search</b></i>, Sarabesh, 
    </li>
</ul>

<b>Agentic RAG</b>

<ul>
<li><i><b>From RAG to Memory: Non-Parametric Continual Learning for Large Language Models</b></i>, Bernal Jiménez Gutiérrez et al., 
    
</li>
<li><i><b>HippoRAG: Neurobiologically Inspired Long-Term Memory for Large Language Models</b></i>, Bernal Jiménez Gutiérrez et al., 
    
</li>
<li><i><b>GraphReader: Building Graph-based Agent to Enhance Long-Context Abilities of Large Language Models</b></i>, Shilong Li et al., 
</li>
<li><i><b>PlanRAG: A Plan-then-Retrieval Augmented Generation for Generative Large Language Models as Decision Makers</b></i>, Myeonghwa Lee et al., 
    
</li>
<li><i><b>Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection</b></i>, Akari Asai et al., 
    
</li>
<li><i><b>DeepRAG: Thinking to Retrieve Step by Step for Large Language Models</b></i>, Xinyan Guan et al., 
</li>
<li><i><b>Paperqa: Retrieval-augmented generative agent for scientific research</b></i>, Jakub Lála et al., 
</li>
<li><i><b>Large Language Models as Source Planner for Personalized Knowledge-grounded Dialogues</b></i>, Hongru Wang et al., 
    
</li>
<li><i><b>PRCA: Fitting Black-Box Large Language Models for Retrieval Question Answering via Pluggable Reward-Driven Contextual Adapter</b></i>, Haoyan Yang et al., 
    
</li>
<li><i><b>SELF-RAG: LEARNING TO RETRIEVE, GENERATE, AND CRITIQUE THROUGH SELF-REFLECTION</b></i>, Akari Asai et al., 
    
</li>
<li><i><b>RAT: Retrieval Augmented Thoughts Elicit Context-Aware Reasoning in Long-Horizon Generation</b></i>, Zihao Wang et al., 
    
</li>
<li><i><b>Chain-of-verification reduces hallucination in large language models</b></i>, Shehzaad Dhuliawala et al., 
</li>
<li><i><b>HM-RAG: Hierarchical Multi-Agent Multimodal Retrieval Augmented Generation</b></i>, Liu et al., 
    </li>
<li><i><b>MultiHop-RAG: Benchmarking Retrieval-Augmented Generation for Multi-Hop Queries</b></i>, Tang & Yang, 
    </li>
<li><i><b>MMOA-RAG: Improving Retrieval-Augmented Generation through Multi-Agent Reinforcement Learning</b></i>, Chen et al., 
    </li>
<li><i><b>Search-in-the-Chain: Towards Accurate, Credible, and Up-to-Date Large Language Models</b></i>, Menick et al., 
    </li>
</ul>

<b>Real-Time and Streaming RAG</b>
<ul>
<li><i><b>StreamingRAG: Real-time Contextual Retrieval and Generation Framework</b></i>, Sankaradas et al., 
    </li>
<li><i><b>Multi-task Retriever Fine-tuning for Domain-Specific and Efficient RAG</b></i>, Authors, 
    </li>
</ul>

### 2. Memory Systems

#### Runtime Memory Design Patterns

Modern memory systems are no longer a single retrieval store. Production agents increasingly separate:

- **Session / thread state** for active work in progress
- **Long-term semantic memory** for user or project facts
- **Episodic memory** for trajectories, past actions, and reusable experiences
- **Procedural memory** for learned workflows, instructions, and stable operating preferences

<b>Memory Design References</b>
<ul>
<li><i><b>LangGraph Memory Overview</b></i>, LangChain, </li>
<li><i><b>Letta Memory Blocks</b></i>, Letta, </li>
<li><i><b>Claude Code Memory</b></i>, Anthropic, </li>
</ul>

#### Project Memory and Instruction Artifacts

Coding agents have made project memory concrete. In practice, memory now often lives in artifacts such as repository instruction files, scoped rules, reusable skills, and long-lived project notes rather than only in vector stores.

<b>Project Memory References</b>
<ul>
<li><i><b>Introducing Codex</b></i>, OpenAI, </li>
<li><i><b>Claude Code Memory</b></i>, Anthropic, </li>
<li><i><b>Claude Code Subagents</b></i>, Anthropic, </li>
<li><i><b>LangChain Deep Agents Overview</b></i>, LangChain, </li>
</ul>

<b>Persistent Memory Architecture</b>
<ul>
<li><i><b>MemGPT: Towards LLMs as Operating Systems</b></i>, Packer et al., 
    </li>
<li><i><b>Mem0: Building Production-Ready AI Agents with Scalable Long-Term Memory</b></i>, Taranjeet et al., 
    </li>
<li><i><b>MemoryLLM: Towards Self-Updatable Large Language Models</b></i>, Wang et al., 
    </li>
<li><i><b>Infinite-LLM: Efficient LLM Service for Long Context with DistAttention and Distributed KVCache</b></i>, Anonymous et al., 
    </li>
<li><i><b>Memory-Augmented Generative Adversarial Transformers</b></i>, Anonymous et al., 
    </li>
</ul>

<b>Memory Interchange Standards</b>
<ul>
<li><i><b>PAM (Portable AI Memory): An Open Interchange Format for AI User Memories</b></i>, Daniel Gines, 
    </li>
</ul>

<b>Memory-Augmented Neural Networks</b>
<ul>
<li><i><b>Survey on Memory-Augmented Neural Networks: Cognitive Insights to AI Applications</b></i>, Khosla et al., 
    </li>
<li><i><b>A Machine with Short-Term, Episodic, and Semantic Memory Systems</b></i>, Kim et al., 
    </li>
<li><i><b>From Human Memory to AI Memory: A Survey on Memory Mechanisms in the Era of LLMs</b></i>, Wu et al., 
    </li>
</ul>

<b>Episodic Memory and Context Persistence</b>
<ul>
<li><i><b>The Role of Memory in LLMs: Persistent Context for Smarter Conversations</b></i>, Porcu, 
    </li>
<li><i><b>Episodic Memory in AI Agents Poses Risks that Should Be Studied and Mitigated</b></i>, Christiano et al., 
    </li>
<li><i><b>Larimar: Large Language Models with Episodic Memory Control</b></i>, Goyal et al., 
    </li>
<li><i><b>EM-LLM: Human-like Episodic Memory for Infinite Context LLMs</b></i>, Anonymous et al., 
    </li>
<li><i><b>Large Language Models with Controllable Working Memory</b></i>, Goyal et al., 
    </li>
<li><i><b>Empowering Working Memory for Large Language Model Agents</b></i>, Anonymous et al., 
    </li>
</ul>

<b>Continual Learning and Memory Consolidation</b>
<ul>
<li><i><b>Prediction Error-Driven Memory Consolidation for Continual Learning</b></i>, Anonymous et al., 
    </li>
<li><i><b>Overcoming Catastrophic Forgetting in Continual Learning by Exploring Eigenvalues of Hessian Matrix</b></i>, Anonymous et al., 
    </li>
<li><i><b>Probabilistic Metaplasticity for Continual Learning with Memristors in Spiking Networks</b></i>, Anonymous et al., 
    </li>
</ul>

<b>Conversational Memory</b>
<ul>
<li><i><b>MemoChat: Tuning LLMs to Use Memos for Consistent Long-Range Open-Domain Conversation</b></i>, Anonymous et al., 
    </li>
<li><i><b>Think-in-Memory: Recalling and Post-thinking Enable LLMs with Long-Term Memory</b></i>, Anonymous et al., 
    </li>
<li><i><b>Generative Agents: Interactive Simulacra of Human Behavior</b></i>, Park et al., 
    </li>
<li><i><b>Self-Controlled Memory Framework for Large Language Models</b></i>, Anonymous et al., 
    </li>
</ul>

<b>Personalization and Memory</b>
<ul>
<li><i><b>Personalized LLM Response Generation with Parameterized User Memory Injection</b></i>, Anonymous et al., 
    </li>
<li><i><b>Soul-Driven Interaction Design: A Position Paper on Declarative Persona Specifications for AI Agents</b></i>, Lee, 
    </li>
<li><i><b>Soul Spec — Open Specification for AI Agent Persona Packages</b></i>, ClawSouls, 
    </li>
</ul>

<b>Safety and Alignment with Memory</b>
<ul>
<li><i><b>Constitutional AI: Harmlessness from AI Feedback</b></i>, Bai et al., 
    </li>
<li><i><b>Improving alignment of dialogue agents via targeted human judgements (Sparrow)</b></i>, Glaese et al., 
    </li>
</ul>

<b>Tool Integration and Memory</b>
<ul>
<li><i><b>WebGPT: Browser-assisted question-answering with human feedback</b></i>, Nakano et al., 
    </li>
<li><i><b>ToolLLM: Facilitating Large Language Models to Master 16000+ Real-world APIs</b></i>, Qin et al., 
    </li>
</ul>

<b>Learning and Reflection</b>
<ul>
<li><i><b>Language Models are Few-Shot Learners (GPT-3)</b></i>, Brown et al., 
    </li>
<li><i><b>Reflexion: Language Agents with Verbal Reinforcement Learning</b></i>, Shinn et al., 
    </li>
</ul>

### 3. Agent Communication

<b>Survey</b>

<ul>
<li><i><b>A Survey of AI Agent Protocols</b></i>, Yingxuan Yang et al., 
    
</li>
<li><i><b>A Survey of Multi-Agent Deep Reinforcement Learning with Communication</b></i>, Changxi Zhu et al., 
</li>
<li><i><b>Beyond Self-Talk: A Communication-Centric Survey of LLM-Based Multi-Agent Systems</b></i>, Bingyu Yan et al., 
</li>
<li><i><b>Large Language Model based Multi-Agents: A Survey of Progress and Challenges</b></i>, Taicheng Guo et al., 
    
</li>
</ul>

#### Open Agent Protocols and Interoperability

Open protocols have become a major part of agent engineering. In practice, modern agent systems increasingly separate:

- **agent-to-tool protocols** such as MCP
- **agent-to-agent protocols** such as A2A and ACP-style remote invocation
- **agent-to-UI protocols** such as AG-UI
- **portable agent definitions** such as AgentSchema

<b>Official Protocol and Interoperability References</b>
<ul>
<li><i><b>Model Context Protocol Specification</b></i>, MCP Working Group, </li>
<li><i><b>Model Context Protocol Architecture</b></i>, MCP Working Group, </li>
<li><i><b>Agent2Agent Protocol (A2A)</b></i>, Google, </li>
<li><i><b>AG-UI Documentation</b></i>, CopilotKit Team, </li>
<li><i><b>ACP Connect</b></i>, AGNTCY, </li>
<li><i><b>AgentSchema</b></i>, Microsoft, </li>
</ul>

<b>Agent Interoperability Protocols</b>

<ul>
<li><i><b>A survey of agent interoperability protocols: Model Context Protocol (MCP), Agent Communication Protocol (ACP), and Agent-to-Agent Protocol (A2A)</b></i>, Zhang et al., 
    </li>
<li><i><b>Expressive Multi-Agent Communication via Identity-Aware Learning</b></i>, Du et al., 
    </li>
<li><i><b>Context-aware Communication for Multi-agent Reinforcement Learning (CACOM)</b></i>, Li et al., 
    </li>
<li><i><b>A survey of agent interoperability protocols: Model Context Protocol (MCP), Agent Communication Protocol (ACP), Agent-to-Agent Protocol (A2A), and Agent Network Protocol (ANP)</b></i>, Abul Ehtesham et al., 
</li>
<li><i><b>Agent Capability Negotiation and Binding Protocol (ACNBP)</b></i>, Ken Huang et al., 
</li>
<li><i><b>A Scalable Communication Protocol for Networks of Large Language Models</b></i>, Samuele Marro et al., 
    
</li>
<li><i><b>Model Context Protocol (MCP)</b></i>
    
</li>
<li><i><b>Agent2Agent (A2A) Protocol</b></i>
    
</li>
<li><i><b>Agent Network Protocol (ANP)</b></i>
    
</li>
<li><i><b>Not Human Search</b></i> — Search engine for agent-ready sites and MCP servers, with live MCP verification and agentic-readiness scoring. </li>
</ul>

<b>Structured Communication Frameworks</b>

<ul>
<li><i><b>Learning Structured Communication for Multi-Agent Reinforcement Learning</b></i>, Wang et al., 
    </li>
<li><i><b>AC2C: Adaptively Controlled Two-Hop Communication for Multi-Agent Reinforcement Learning</b></i>, Wang et al., 
    </li>
<li><i><b>Task-Agnostic Contrastive Pre-Training for Inter-Agent Communication</b></i>, Sun et al., 
    </li>
<li><i><b>AC2C: Adaptively Controlled Two-Hop Communication for Multi-Agent Reinforcement Learning</b></i>, Xuefeng Wang et al., 
</li>
<li><i><b>CAMEL: Communicative Agents for "Mind" Exploration of Large Language Model Society</b></i>, Guohao Li et al., 
    
</li>
<li><i><b>Context-aware Communication for Multi-agent Reinforcement Learning (CACOM)</b></i>, Xinran Li et al., 
    
</li>
<li><i><b>Task-Agnostic Contrastive Pre-Training for Inter-Agent Communication</b></i>, Peihong Yu et al.
</li>
<li><i><b>Expressive Multi-Agent Communication via Identity-Aware Learning</b></i>, Wei Du et al., 
</li>
<li><i><b>MAGIS: LLM-Based Multi-Agent Framework for GitHub Issue Resolution</b></i>, Wei Tao et al., 
</li>
<li><i><b>AutoAgents: A Framework for Automatic Agent Generation</b></i>, Guangyao Chen et al., 
    
</li>
<li><i><b>MDTeamGPT: A Self-Evolving LLM-based Multi-Agent Framework for Multi-Disciplinary Team Medical Consultation</b></i>, Kai Chen et al., 
    
</li>
<li><i><b>AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation</b></i>, Wu et al.,  </li>
</ul>

<b>LLM-Enhanced Agent Communication</b>


<li><i><b>ProAgent: Building Proactive Cooperative AI with Large Language Models</b></i>, Ceyao Zhang et al., 
    
</li>
<li><i><b>Improving Factuality and Reasoning in Language Models through Multiagent Debate</b></i>, Yilun Du et al., 
    
</li>
<li><i><b>ChatDev: Communicative Agents for Software Development</b></i>, Chen Qian et al., 
    
</li>
<li><i><b>Multi-Agent Incentive Communication via Decentralized Teammate Modeling</b></i>, Nian Li et al., 
    
</li>
<li><i><b>AgentCoord: Visually Exploring Coordination Strategy for LLM-based Multi-Agent Collaboration</b></i>, Bo Pan et al., 
    
</li>
<li><i><b>Simulating Opinion Dynamics with Networks of LLM-based Agents</b></i>, Yun-Shiuan Chuang et al., 
    
</li>
<li><i><b>MetaGPT: Meta Programming for A Multi-Agent Collaborative Framework</b></i>, Sirui Hong et al., 
    
</li>
<li><i><b>Chain of Agents: Large Language Models Collaborating on Long-Context Tasks</b></i>, Yusen Zhang et al., 
</li>
<i><b>Multi-Agent Incentive Communication via Decentralized Teammate Modeling</b></i>, Lei Yuan et al.&lt;a href="https://doi.org/10.1609/aaai.v36i9.21179" target="_blank">
        

<li><i><b>ProAgent: Building Proactive Cooperative Agents with Large Language Models</b></i>, Zhang et al., 
    </li>
<li><i><b>Model Context Protocol (MCP)</b></i>, Anthropic, 
    </li>
<li><i><b>CoMAS: Co-Evolving Multi-Agent Systems via Interaction Rewards</b></i>, Xue et al., 
    </li>
<li><i><b>Achilles Heel of Distributed Multi-Agent Systems</b></i>, Zhang et al., 
    </li>


### 4. Tool Use and Function Calling

#### Hosted Agent Tools and Computer Use

The frontier of tool use has shifted from static function schemas to **hosted tool runtimes**, **remote servers**, and **computer use interfaces**. In the agent era, tools are increasingly connected through platform-managed execution, approval flows, and UI-aware control loops rather than single-shot JSON calls.

<b>Official Tooling and Computer Use References</b>
<ul>
<li><i><b>OpenAI Tools Guide</b></i>, OpenAI, </li>
<li><i><b>Introducing Codex</b></i>, OpenAI, </li>
<li><i><b>Computer Use for Claude 3.5</b></i>, Anthropic, </li>
<li><i><b>Google Vertex AI Agent Engine</b></i>, Google, </li>
<li><i><b>OSWorld</b></i>, Xie et al., </li>
<li><i><b>Lumen</b></i> — Vision-first browser agent with self-healing deterministic replay over CDP. Screenshot → model → action loop with multi-provider support (Anthropic, Google). </li>
</ul>

<b>Foundational Tool Learning</b>
<ul>
<li><i><b>Toolformer: Language Models Can Teach Themselves to Use Tools</b></i>, Schick et al., 
    </li>
<li><i><b>ReAct: Synergizing Reasoning and Acting in Language Models</b></i>, Yao et al., 
    </li>
<li><i><b>Augmented Language Models: a Survey</b></i>, Qin et al., 
    </li>
<li><i><b>Tool Learning with Large Language Models: A Survey</b></i>, Qu et al., 
    </li>
</ul>

<b>Advanced Function Calling Systems</b>
<ul>
<li><i><b>Granite-Function Calling Model: Introducing Function Calling Abilities via Multi-task Learning of Granular Tasks</b></i>, Smith et al., 
    </li>
<li><i><b>HuggingGPT: Solving AI Tasks with ChatGPT and its Friends in Hugging Face</b></i>, Shen et al., 
    </li>
<li><i><b>Enhancing Function-Calling Capabilities in LLMs: Strategies for Prompt Formats, Data Integration, and Multilingual Translation</b></i>, Chen et al., 
    </li>
<li><i><b>A Real-World WebAgent for Complex Web Tasks</b></i>, Zhai et al., </li>
</ul>

<b>Multi-Agent Function Calling</b>
<ul>
<li><i><b>ToolACE: Winning the Points of LLM Function Calling</b></i>, Zhang et al., </li>
<li><i><b>Berkeley Function Leaderboard (BFCL): Evaluating Function-Calling Abilities</b></i>, Various, 
    </li>
</ul>

---

## 📊 Evaluation Paradigms for Context-Driven Systems

### Context Quality Assessment

<b>Foundational Long-Context Benchmarks</b>
<ul>
<li><i><b>RULER: What's the Real Context Size of Your Long-Context Language Models?</b></i>, Cheng-Ping Hsieh et al., 
    </li>
<li><i><b>LongBench: A Bilingual, Multitask Benchmark for Long Context Understanding</b></i>, Bai et al., </li>
<li><i><b>∞BENCH: Extending Long Context Evaluation Beyond 100K Tokens</b></i>, Zhang et al., 
    </li>
<li><i><b>VL-ICL Bench: The Devil in the Details of Multimodal In-Context Learning</b></i>, Zong et al., 
    </li>
</ul>

<b>Multimodal and Specialized Evaluation</b>
<ul>
<li><i><b>MultiModal Needle in a Haystack: Benchmarking Long-Context Capability of Multimodal Large Language Models</b></i>, Wang et al., 
    </li>
<li><i><b>Contextualized Topic Coherence (CTC) Metrics</b></i>, Rahimi et al., 
    </li>
<li><i><b>BBScore: A Brownian Bridge Based Metric for Assessing Text Coherence</b></i>, Sheng et al., 
    </li>
</ul>

<b>RAG and Generation Evaluation</b>
<ul>
<li><i><b>Evaluation of Retrieval-Augmented Generation: A Survey</b></i>, Li et al., </li>
<li><i><b>Ragas: Automated Evaluation of Retrieval Augmented Generation</b></i>, Espinosa-Anke et al., </li>
<li><i><b>Human Evaluation Protocol for Generative AI Chatbots in Clinical Microbiology</b></i>, Griego-Herrera et al., </li>
</ul>

### Benchmarking Context Engineering

<b>Synthetic vs. Realistic Evaluation</b>
<ul>
<li><i><b>Needle-in-a-Haystack (NIAH) and Synthetic Benchmarks</b></i>, Research Area 2023-2024, 
    </li>
<li><i><b>ZeroSCROLLS: Realistic Natural Language Tasks</b></i>, Benchmark 2023-2024, 
    </li>
<li><i><b>InfiniteBench: 100K+ Token Evaluation</b></i>, Benchmark 2024, 
    </li>
<li><i><b>Agent-Pro: Learning to Evolve Coder Agents via Proposal-based Programming</b></i>, Zhang et al., </li>
<li><i><b>GenoTEX: An LLM Agent Benchmark for Automated Gene Expression Data Analysis</b></i>, Liu et al., 
    </li>
<li><i><b>skill-optimizer</b></i> — CLI that benchmarks SDK, CLI, and MCP guidance docs (SKILL.md) against multiple LLMs and iteratively rewrites them until every configured model meets a score floor.
    </li>
</ul>

### Agent Observability and Telemetry

Long-running agent systems need more than offline benchmark scores. They require trace-level visibility into plans, tool calls, memory reads and writes, approvals, retries, and failure modes. Observability is increasingly the verification layer for context engineering in production.

<b>Observability and Telemetry References</b>
<ul>
<li><i><b>LangSmith Observability Quickstart</b></i>, LangChain, </li>
<li><i><b>OpenTelemetry Semantic Conventions for Generative AI</b></i>, OpenTelemetry, </li>
<li><i><b>Google ADK Evaluation and Observability</b></i>, Google, </li>
<li><i><b>OpenAI Agents and Tools</b></i>, OpenAI, </li>
</ul>

---

## 🚀 Applications and Systems

### Complex Research Systems

<b>Hypothesis Generation and Data-Driven Discovery</b>
<ul>
<li><i><b>Hypothesis Generation with Large Language Models</b></i>, Liu et al., 
    </li>
<li><i><b>GFlowNets for AI-Driven Scientific Discovery</b></i>, Jain et al., 
    </li>
<li><i><b>Literature Meets Data: A Synergistic Approach to Hypothesis Generation</b></i>, Liu et al., 
    </li>
<li><i><b>Machine Learning for Hypothesis Generation in Biology and Medicine</b></i>, FieldSHIFT Team, 
    </li>
</ul>

<b>Automated Scientific Discovery</b>

<ul>
<li><i><b>The AI Scientist: Towards Fully Automated Open-Ended Scientific Discovery</b></i>, Lu et al., 
    </li>
<li><i><b>Automating Psychological Hypothesis Generation with AI</b></i>, Johnson et al., 
    </li>
<li><i><b>Can Large Language Models Replace Humans in Systematic Reviews?</b></i>, Khraisha et al., 
    </li>
<li><i><b>Solving Olympiad Geometry without Human Demonstrations</b></i>, Trinh et al., 
    </li>
<li><i><b>GenoMAS: A Multi-Agent Framework for Scientific Discovery via Code-Driven Gene Expression Analysis</b></i>, Liu et al., 
    </li>
<li><i><b>aiXiv: A Next-Generation Open Access Ecosystem for Scientific Discovery Generated by AI Scientists</b></i>, Zhang et al., 
    </li>
</ul>

<b>AI for Science Integration and Future Directions</b>

<ul>
<li><i><b>AI for Science 2025: Convergence of AI Innovation and Scientific Discovery</b></i>, Fink et al., </li>
<li><i><b>Towards Scientific Discovery with Generative AI: Progress, Opportunities, and Challenges</b></i>, Anonymous et al., </li>
</ul>

<b>Deep Research Applications</b>
<ul>
<li><i><b>Accelerating scientific discovery with AI</b></i>, MIT News, 
    </li>
<li><i><b>Accelerating scientific breakthroughs with an AI co-scientist</b></i>, Google Research, 
    </li>
<li><i><b>Bridging AI and Science: Implications from a Large-Scale Literature Analysis of AI4Science</b></i>, Various, 
    </li>
<li><i><b>AI for scientific discovery</b></i>, World Economic Forum, 
    </li>
</ul>

### Production Systems

<b>Context Engineering as a Core Discipline</b>
<ul>
<li><i><b>From Prompt Craft to System Design: Context Engineering as a Core Discipline for AI-Driven Delivery</b></i>, Forte Group Team, </li>
<li><i><b>Context Engineering: A Framework for Enterprise AI Operations</b></i>, Shelly Palmer, </li>
<li><i><b>How MCP Handles Context Management in High-Throughput Scenarios</b></i>, Portkey.ai Team, </li>
</ul>

<b>Enterprise AI Case Studies</b>
<ul>
<li><i><b>Case Study: JPMorgan's COiN Platform – Agentic AI for Financial Analysis</b></i>, AI Mindset Research, </li>
<li><i><b>Case Study: EY's Agentic AI Integration in Microsoft 365 Copilot</b></i>, AI Mindset Research, </li>
<li><i><b>Context Is Everything: The Massive Shift Making AI Actually Work in the Real World</b></i>, Phil Mora, </li>
</ul>

<b>Enterprise Applications and Infrastructure</b>
<ul>
<li><i><b>The Context Layer for Enterprise RAG Applications</b></i>, Contextual AI Team, </li>
<li><i><b>Navigating AI Model Deployment: Challenges and Solutions</b></i>, Dean Lancaster, </li>
<li><i><b>2024: The State of Generative AI in the Enterprise</b></i>, Menlo Ventures, </li>
<li><i><b>How 100 Enterprise CIOs Are Building and Buying Gen AI in 2025</b></i>, Andreessen Horowitz, </li>
</ul>

<b>Developer Tools with Context Engineering</b>
<ul>
<li><i><b>Autohand Code CLI: Autonomous Coding Agent with Semantic Search, Memory, and Context Management</b></i>, Autohand AI, 
    </li>
</ul>

#### Coding Agents and Project Memory

Coding agents are one of the clearest production settings in which context engineering becomes agent engineering. Here, context is no longer just a prompt: it becomes repository instructions, project memory, task plans, file diffs, test results, and tool traces.

<ul>
<li><i><b>Introducing Codex</b></i>, OpenAI, </li>
<li><i><b>Claude Code Memory</b></i>, Anthropic, </li>
<li><i><b>Claude Code Subagents</b></i>, Anthropic, </li>
<li><i><b>Letta Memory Blocks</b></i>, Letta, </li>
<li><i><b>LangChain Deep Agents</b></i>, LangChain, </li>
<li><i><b>nv:context</b></i>, NichevLabs, </li>
</ul>

#### Platform Stacks and Hosted Agent Runtimes

The production ecosystem is increasingly organized around full agent stacks rather than isolated models or prompts. These stacks combine tools, memory, runtime orchestration, sessions, observability, and interoperability in a single platform surface.

<ul>
<li><i><b>OpenAI Agents Guide</b></i>, OpenAI, </li>
<li><i><b>Google Agent Development Kit (ADK)</b></i>, Google, </li>
<li><i><b>Vertex AI Agent Engine</b></i>, Google, </li>
<li><i><b>LangGraph Memory Overview</b></i>, LangChain, </li>
<li><i><b>Microsoft Agent Framework</b></i>, Microsoft, </li>
<li><i><b>Puppyone</b></i>, Puppyone,  — file system for agents to connect, govern, version, and share context across agent workflows.</li>
</ul>

---

## 🔮 Limitations and Future Directions

### Current Limitations

1. **Context Window Constraints**: Despite improvements, context length remains a bottleneck
2. **Computational Overhead**: Processing large contexts requires significant resources
3. **Context Coherence**: Maintaining coherence across extended contexts
4. **Dynamic Adaptation**: Real-time context updating challenges

### Future Research Directions

1. **Infinite Context**: Developing truly unlimited context capabilities
2. **Context Compression**: Efficient representation of large contexts
3. **Multimodal Integration**: Seamless integration of diverse data types
4. **Adaptive Context**: Self-optimizing context management
5. **Context Privacy**: Securing sensitive information in context pipelines

---

## 🤝 Contributing

We welcome contributions to this survey! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch
3. **Add** relevant papers with proper formatting
4. **Submit** a pull request with a clear description

### Paper Formatting Guidelines

```markdown
<li><i><b>Paper Title</b></i>, Author et al., <a href="URL" target="_blank"><img src="https://img.shields.io/badge/SOURCE-YEAR.MM-COLOR" alt="SOURCE Badge"></a></li>
```

### Badge Colors
-  `red` for arXiv papers
-  `blue` for conference/journal papers
-  `white` for GitHub repositories
-  `yellow` for HuggingFace resources

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Meirtz/Awesome-Context-Engineering/blob/8b6ede2b5e610774e01d74902d65a51000d671a4/LICENSE/README.md) file for details.

---

## 📑 Citation

If you find this survey helpful in your research, please consider citing:

```bibtex
@misc{mei2025surveycontextengineeringlarge,
      title={A Survey of Context Engineering for Large Language Models}, 
      author={Lingrui Mei and Jiayu Yao and Yuyao Ge and Yiwei Wang and Baolong Bi and Yujun Cai and Jiazhi Liu and Mingyu Li and Zhong-Zhi Li and Duzhen Zhang and Chenlin Zhou and Jiayi Mao and Tianze Xia and Jiafeng Guo and Shenghua Liu},
      year={2025},
      eprint={2507.13334},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/abs/2507.13334}, 
}
```

---

## ⚠️ Disclaimer

This project is **ongoing** and continuously evolving. While we strive for accuracy and completeness, there may be errors, omissions, or outdated information. We welcome corrections, suggestions, and contributions from the community. Please stay tuned for regular updates and improvements.

## 📧 Contact

For questions, suggestions, or collaboration opportunities, please feel free to reach out:

**Lingrui Mei**  
📧 Email: [meilingrui22@mails.ucas.ac.cn](mailto:meilingrui22@mails.ucas.ac.cn)

You can also open an issue in this repository for general discussions and suggestions.

---

## 🙏 Acknowledgments

This survey builds upon the foundational work of the AI research community. We thank all researchers contributing to the advancement of context engineering and large language models.

---

## 📖 Our Paper

**A Survey of Context Engineering for Large Language Models**

- **arXiv**: https://arxiv.org/abs/2507.13334
- **Hugging Face Papers**: https://huggingface.co/papers/2507.13334

This comprehensive survey provides the latest academic insights and theoretical foundations for context engineering in large language models.

- [MeterCall](https://metercall.ai/?v=a&src=github) — One metered API gateway. 21M+ endpoints (payments, SMS, AI, CRMs, gov data). Free tier; pay per call.
