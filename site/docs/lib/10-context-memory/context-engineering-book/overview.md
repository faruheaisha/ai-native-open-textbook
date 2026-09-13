---
title: "Context Engineering"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/README.md"
zh: ""
---

# Context Engineering ![](https://bonigarcia.dev/img/context-engineering.png)

**Context engineering** can be defined as the practice of designing systems that provide a Large Language Model (LLM) and AI agents with all the necessary information to complete a task effectively. It goes beyond prompt engineering since it focuses on building a comprehensive and structured context from various sources like instructions, external knowledge, memory, tools, and state. The central idea is that the success of a complex LLM-based system depends more on the quality and completeness of the context provided than on the specific wording of the prompt itself.

Tobi Lütke, the CEO of Shopify, coined the term _context engineering_ in a [tweet](https://x.com/tobi/status/1935533422589399127) on June 19, 2025. He defined context engineering as _the art of providing all the context for the task to be plausibly solvable by the LLM_. This novel concept captures the essence of the current evolution of LLM-based systems, inspiring others (like me) to understand and define this emerging discipline. Since then, I've been working on a book entitled **Context Engineering: Build Consistent, Accurate, Predictable AI Systems**, published by Manning. Currently, the early access version of the book is available, and you can get it [here](https://hubs.la/Q04ksQ8J0). 

[![Context Engineering](https://gh-proxy.com/https://raw.githubusercontent.com/bonigarcia/context-engineering/46719154489e410b509db4fb69ab1c29fb3362a0/docs/img/context-engineering-MEAP-cover.png)](https://hubs.la/Q04ksQ8J0)

This GitHub repository is intended to be a companion resource for this book and a reference for practitioners looking to understand and adopt the context engineering principles.

## Table of contents

This book aims to provide a strong, general-purpose theoretical foundation for context engineering, supported by hands-on examples. Its table of contents is the following:

1. Introduction to context engineering
2. Instructions for AI agents
3. External knowledge and retrieval
4. Tools in AI agents
5. Memory and state in agentic systems
6. User prompts for LLMs
7. Context management and orchestration
8. Evaluation and observability
9. Governance and operations
10. AI frameworks for context engineering
11. Context engineering for software development
12. The state of the art in context engineering  
Appendix A. The AI ecosystem  
Appendix B. References and further reading

Each chapter of this book begins by explaining the underlying principles and patterns of each thematic block. The final part of each chapter then presents specific examples, all of which are available in this GitHub repository. New examples will continue to be added, and existing ones maintained, even after the book is published. The goal is to provide an open-source, up-to-date reference for everyone interested in context engineering.

## Examples

This repository organizes examples by chapter to help you explore context engineering concepts in practice.

#### Chapter 1. Introduction to context engineering
This chapter provides the foundations for interacting with different model providers:
- Basic interaction (OpenAI): [Python](/lib/10-context-memory/context-engineering-book/ch01-python-openai-gpt-basic) · [Jupyter](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch01/jupyter/openai-gpt-basic.ipynb) · [JavaScript](/lib/10-context-memory/context-engineering-book/ch01-javascript-openai-gpt-basic) · [Java](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch01/java/src/main/java/io/github/bonigarcia/ce/OpenAiGptBasic.java)
- Streaming (OpenAI): [Python](/lib/10-context-memory/context-engineering-book/ch01-python-openai-gpt-streaming) · [Jupyter](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch01/jupyter/openai-gpt-streaming.ipynb) · [JavaScript](/lib/10-context-memory/context-engineering-book/ch01-javascript-openai-gpt-streaming) · [Java](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch01/java/src/main/java/io/github/bonigarcia/ce/OpenAiGptStreaming.java)
- Basic interaction (Anthropic): [Python](/lib/10-context-memory/context-engineering-book/ch01-python-anthropic-claude-basic) · [Jupyter](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch01/jupyter/anthropic-claude-basic.ipynb) · [JavaScript](/lib/10-context-memory/context-engineering-book/ch01-javascript-anthropic-claude-basic) · [Java](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch01/java/src/main/java/io/github/bonigarcia/ce/AnthropicClaudeBasic.java)
- Streaming (Anthropic): [Python](/lib/10-context-memory/context-engineering-book/ch01-python-anthropic-claude-streaming) · [Jupyter](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch01/jupyter/anthropic-claude-streaming.ipynb) · [JavaScript](/lib/10-context-memory/context-engineering-book/ch01-javascript-anthropic-claude-streaming) · [Java](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch01/java/src/main/java/io/github/bonigarcia/ce/AnthropicClaudeStreaming.java)
- Basic interaction (Google): [Python](/lib/10-context-memory/context-engineering-book/ch01-python-google-gemini-basic) · [Jupyter](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch01/jupyter/google-gemini-basic.ipynb) · [JavaScript](/lib/10-context-memory/context-engineering-book/ch01-javascript-google-gemini-basic) · [Java](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch01/java/src/main/java/io/github/bonigarcia/ce/GoogleGeminiBasic.java)
- Streaming (Google): [Python](/lib/10-context-memory/context-engineering-book/ch01-python-google-gemini-streaming) · [Jupyter](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch01/jupyter/google-gemini-streaming.ipynb) · [JavaScript](/lib/10-context-memory/context-engineering-book/ch01-javascript-google-gemini-streaming) · [Java](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch01/java/src/main/java/io/github/bonigarcia/ce/GoogleGeminiStreaming.java)
- Basic interaction (Ollama): [Python](/lib/10-context-memory/context-engineering-book/ch01-python-ollama-local-basic) · [Jupyter](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch01/jupyter/ollama-local-basic.ipynb) · [JavaScript](/lib/10-context-memory/context-engineering-book/ch01-javascript-ollama-local-basic) · [Java](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch01/java/src/main/java/io/github/bonigarcia/ce/OllamaLocalBasic.java)
- Streaming (Ollama): [Python](/lib/10-context-memory/context-engineering-book/ch01-python-ollama-local-streaming) · [Jupyter](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch01/jupyter/ollama-local-streaming.ipynb) · [JavaScript](/lib/10-context-memory/context-engineering-book/ch01-javascript-ollama-local-streaming) · [Java](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch01/java/src/main/java/io/github/bonigarcia/ce/OllamaLocalStreaming.java)

#### Chapter 2. Instructions for AI agents
This chapter covers the definition and usage of instructions (system prompts, agent skills, instructions artifacts) as a foundation layer to shape the model behavior:
- System prompts (OpenAI): [Python](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch02/python/openai-gpt-system-prompt/README.md) · [Jupyter](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch02/jupyter/openai_gpt_system_prompt.ipynb) · [JavaScript](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch02/javascript/openai-gpt-system-prompt/README.md) · [Java](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch02/java/src/main/java/io/github/bonigarcia/ce/OpenAiGptSystemPrompt.java)
- System prompts (Anthropic): [Python](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch02/python/anthropic-claude-system-prompt/README.md) · [Jupyter](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch02/jupyter/anthropic_claude_system_prompt.ipynb) · [JavaScript](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch02/javascript/anthropic-claude-system-prompt/README.md) · [Java](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch02/java/src/main/java/io/github/bonigarcia/ce/AnthropicClaudeSystemPrompt.java)
- System prompts (Google): [Python](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch02/python/google-gemini-system-prompt/README.md) · [Jupyter](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch02/jupyter/google_gemini_system_prompt.ipynb) · [JavaScript](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch02/javascript/google-gemini-system-prompt/README.md) · [Java](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch02/java/src/main/java/io/github/bonigarcia/ce/GoogleGeminiSystemPrompt.java)
- System prompts (Ollama): [Python](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch02/python/ollama-local-system-prompt/README.md) · [Jupyter](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch02/jupyter/ollama_local_system_prompt.ipynb) · [JavaScript](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch02/javascript/ollama-local-system-prompt/README.md) · [Java](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch02/java/src/main/java/io/github/bonigarcia/ce/OllamaLocalSystemPrompt.java)
- Agent skills: [project-notetaker](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch02/agent-skills/project-notetaker/README.md)
- Instruction artifacts: [task-tracker](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch02/python/instruction-artifacts/README.md)

#### Chapter 3. External knowledge and retrieval
This chapter explores different patterns for providing external knowledge to a model:
- Retrieval-Augmented Generation (RAG): [OpenAI (Python)](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch03/python/rag-openai/README.md) · [OpenAI (Jupyter)](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch03/jupyter/rag_openai.ipynb) · [Hugging Face (Python)](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch03/python/rag-hugging-face/README.md) · [Hugging Face (Jupyter)](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch03/jupyter/rag_hugging_face.ipynb)
- Advanced RAG: [LangChain](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch03/python/agentic-rag/README.md) · [Qdrant](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch03/python/local-rag/README.md) · [PageIndex (Python)](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch03/python/vectorless-rag-pageindex/README.md) · [PageIndex (Jupyter)](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch03/jupyter/vectorless_rag_pageindex.ipynb) · [RAGFlow](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch03/python/ragflow-basic/README.md)
- Context stuffing: [System prompt (Python)](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch03/python/context-stuffing-system-prompt/README.md) · [System prompt (Jupyter)](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch03/jupyter/context_stuffing_system_prompt.ipynb) · [User prompt (Python)](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch03/python/context-stuffing-user-prompt/README.md) · [User prompt (Jupyter)](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch03/jupyter/context_stuffing_user_prompt.ipynb)
- Cache-Augmented Generation (CAG): [Python](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch03/python/cag/README.md) · [Jupyter](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch03/jupyter/cag.ipynb)
 
#### Chapter 4. Tools in AI agents
This chapter focuses on extending the capabilities of AI agents through tools:
- Function calling: [Python](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch04/python/function_calling/README.md) · [JavaScript](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch04/javascript/function_calling/README.md) · [Java](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch04/java/function_calling/README.md)
- Command-Line Interface (CLI): [workspace-analyzer](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch04/agent-skills/workspace-analyzer/README.md)
- Model Context Protocol (MCP) server: [Python](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch04/python/mcp_server/README.md) · [JavaScript](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch04/javascript/mcp_server/README.md) · [Java](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch04/java/mcp_server/README.md)

#### Chapter 5. Memory and state in agentic systems
This chapter explores how to maintain information across interactions using memory and state:
- Session memory: [Python](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch05/python/session_memory_chat/README.md)
- Long-term memory (Mem0): [Python](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch05/python/mem0_chat/README.md) · [JavaScript](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch05/javascript/mem0_chat/README.md) · [Java](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch05/java/src/main/java/io/github/bonigarcia/ce/Mem0Chat.java)
- Long-term memory (Cognee): [Python](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch05/python/cognee_memory/README.md)
- Memory coach: [Python](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch05/python/memory_coach/README.md)
- Session state: [Python](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch05/python/session_state_chat/README.md) · [JavaScript](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch05/javascript/session_state_chat/README.md) · [Java](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch05/java/src/main/java/io/github/bonigarcia/ce/SessionStateChat.java)
- Workflow state: [Python](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch05/python/workflow_state_handoff/README.md) · [JavaScript](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch05/javascript/workflow_state_handoff/README.md) · [Java](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch05/java/src/main/java/io/github/bonigarcia/ce/WorkflowStateHandoff.java)

#### Chapter 6. User prompts for LLMs
This chapter focuses on the design and optimization of user prompts, including techniques like few-shot prompting, prompt chaining, Chain-of-Thought, or ReAct:
- Few-shot prompting: [Python](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch06/python/few-shot-ticket-normalizer/README.md) · [Jupyter](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch06/jupyter/few-shot-ticket-normalizer.ipynb) · [JavaScript](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch06/javascript/few-shot-ticket-normalizer/README.md) · [Java](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch06/java/src/main/java/io/github/bonigarcia/ce/FewShotTicketNormalizer.java)
- Prompt chaining: [Python](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch06/python/prompt-chaining-support-reply/README.md) · [Jupyter](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch06/jupyter/prompt-chaining-support-reply.ipynb) · [JavaScript](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch06/javascript/prompt-chaining-support-reply/README.md) · [Java](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch06/java/src/main/java/io/github/bonigarcia/ce/PromptChainingSupportReply.java)
- Chain-of-Thought vs ReAct (DSPy): [Python](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch06/python/dspy-cot-vs-react/README.md) · [Jupyter](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch06/jupyter/dspy_cot_vs_react.ipynb)

#### Chapter 7. Context management and orchestration
This chapter focuses on managing and orchestrating context in complex agentic systems, including context compression, hierarchical context, or multi-agent patterns:

- Context compression: [LLMLingua](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch07/context-compression/README.md)
- Filesystem context: [OpenViking](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch07/openviking-filesystem/README.md)
- Collaborative agents: [CrewAI](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch07/crewai-crew/README.md)
- Multi-agent router: [LangGraph](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch07/multi-agent-router/README.md)
- Orchestration: [DeepAgents](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch07/deepagents-orchestration/README.md)
- Agent-to-Agent (A2A): [Python](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch07/a2a-example/README.md)

#### Chapter 8. Evaluation and observability
This chapter covers evaluation and observability for context-aware systems:

- Metrics: [DeepEval](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch08/metrics-deepeval/README.md)
- Evals: [Promptfoo](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch08/evals-promptfoo/README.md)
- LLM-as-judge: [Ragas](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch08/llm-as-judge-ragas/README.md)
- Observability: [Langfuse](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch08/observability-langfuse/README.md)
- Observability: [LangSmith](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch08/observability-langsmith/README.md)

#### Chapter 9. Governance and operations
This chapter covers governance, human oversight, and operational patterns for context-aware systems:

- Personally Identifiable Information (PII) redaction: [Microsoft Presidio](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch09/pii_presidio/README.md)
- Output validation: [Pydantic](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch09/output_validation/README.md)
- Bias detection: [Fairlearn](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch09/bias_detection/README.md)
- AI gateway: [LiteLLM](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch09/litellm_gateway/README.md)
- Human-in-the-loop: [Python](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch09/human-in-the-loop/README.md)
- Model fine-tuning: [Python](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch09/fine_tuning/README.md)
- Context as code: [Python](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch09/context_as_code/README.md)

#### Chapter 10. AI frameworks for context engineering
This chapter covers specific AI frameworks that facilitate context engineering, including application frameworks, agent orchestration frameworks, and AI application platforms:

- AI application frameworks: [LangChain](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/langchain/README.md) · [LlamaIndex](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/llamaindex/README.md) · [Haystack](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/haystack/README.md) · [Spring AI](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/spring_ai/README.md) · [LangChain4j](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/langchain4j/README.md) · [Pydantic AI](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/pydantic_ai/README.md) · [DSPy](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/dspy/README.md) · [AI SDK](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/ai_sdk/README.md)
- Agent orchestration frameworks: [LangGraph](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/langgraph/README.md) · [CrewAI](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/crewai/README.md) · [Agent Development Kit](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/adk/README.md) · [Microsoft Agent Framework](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/agent_framework/README.md) · [Agno](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/agno/README.md) · [Embabel](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/embabel/README.md) · [Parlant](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/parlant/README.md) · [DeepAgents](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/deepagents/README.md) · [Claude Agent SDK](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/claude_agent_sdk/README.md)
- AI application platforms: [Zapier](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/zapier/README.md) · [n8n](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/n8n/README.md) · [OpenClaw](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/openclaw/README.md) · [Temporal](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/temporal/README.md) · [Amazon Bedrock AgentCore](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/bedrock_agentcore/README.md) · [Gemini Enterprise Agent Platform](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/gemini_agent_platform/README.md)

#### Chapter 11. Context engineering for software development
This chapter shows how context engineering supports the software development lifecycle (SDLC) through reusable skills, instruction artifacts, external documentation retrieval, orchestration layers, and specialized agents:

- Agent skills: [Claude Code](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch11/claude-code-agent-skills/README.md)
- Instructions artifact: [Cursor rules](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch11/karpathy-instructions-cursor/README.md)
- Documentation retrieval: [Codex with Context7](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch11/codex-context7/README.md)
- SDLC prompt library: [SDLC prompt library](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch11/sdlc-prompt-library/README.md)
- Specification-driven development: [Spec Kit](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch11/spec-kit-sdd/README.md)
- Orchestration: [OpenCode Superpowers](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch11/opencode-superpowers/README.md) · [Antigravity Open GSD](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch11/antigravity-open-gsd/README.md) · [BMAD specialized agents](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch11/bmad-specialized-agents/README.md)

#### Chapter 12. The state of the art in context engineering
This chapter covers mathematical foundations, open research challenges, technical innovation frontiers, domain-specific applications, and future directions:

- Technology radar: [Context engineering radar](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch12/context_engineering_radar/README.md)
- Base knowledge: [Graphify base knowledge](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch12/base_knowledge/README.md)

## Online resources

This repository includes interactive [web pages](https://bonigarcia.dev/context-engineering/) that complement the book and help you apply context engineering concepts in practice.

### 1. AI Ecosystem

🔗 https://bonigarcia.dev/context-engineering/ai-ecosystem.html

Curated collection of the AI ecosystem:

- Browse model families, agents, frameworks, and tooling in one place
- Search across the appendix snapshot by name, feature, license, or pricing

This page is a companion index for the Appendix A and is designed to stay easy to maintain as the ecosystem changes.

---

### 2. Context-Aware Prompt Builder

🔗 https://bonigarcia.dev/context-engineering/context-aware-prompt-builder.html

Design, compare, and reuse structured prompts across multiple frameworks and AI models:

- Build prompts using established frameworks (10-step, COSTAR, CRISPE, RTF, etc.)
- Switch frameworks dynamically while preserving intent
- Import/export prompts as JSON
- Measure approximate context usage for different models
- Load curated prompt samples for common SDLC roles

This tool is especially useful for creating and iterating on prompts in a structured, repeatable way.

---

### 3. SDLC Prompt Library

🔗 https://bonigarcia.dev/context-engineering/sdlc_prompt_library.html

Browse a curated library of prompts organized around the software development lifecycle (SDLC), including roles for architect, developer, debugger, reviewer, refactorer, tester, and documenter:

- Explore prompts visually using a card-based interface
- Filter by framework (10-step, COSTAR, CRISPE, RTF)
- Inspect full structured prompts for each role
- Copy prompts directly for reuse or adaptation

This tool is designed as a reference library, helping you understand how structured prompts vary across roles and frameworks.

---

### 4. Context Engineering Radar

🔗 https://bonigarcia.dev/context-engineering/context-engineering-radar.html

An interactive dashboard to explore and track concepts, sources, frameworks, and publications in the field of context engineering:

- Circular radar visualization using SVG geometry and polar coordinates mapping
- Classify resources across Primary, Secondary, and Tertiary ring levels
- Group items in distinct quadrants: Literature, Frameworks, Models, and Communities
- Dynamic searching, category filters, and detailed description modal overlays

---

### 5. Further Reading

🔗 https://bonigarcia.dev/context-engineering/references.html

Searchable catalog of articles, books, repositories, tutorials, and other references related to context engineering, prompting, agents, and AI engineering: context engineering, AI agents, machine learning, prompt engineering, RAG, generative AI, MCP, AI-assisted development, LLMs, memory, retrieval, multi-agent systems.
