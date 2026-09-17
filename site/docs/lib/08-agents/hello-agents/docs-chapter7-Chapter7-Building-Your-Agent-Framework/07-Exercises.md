---
title: "Hello Agents（Datawhale 智能体教程）"
sourceId: "08-agents/hello-agents"
sourceTitle: "Hello Agents（Datawhale 智能体教程）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/hello-agents"
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter7/Chapter7-Building-Your-Agent-Framework.md"
sourceRel: "docs/chapter7/Chapter7-Building-Your-Agent-Framework.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter7/Chapter7-Building-Your-Agent-Framework.md"
sourceSha256: "0867e934e7324491f7c80e2102bfe5e439cd0449d17805274167bc60541f7198"
pageSha256: "be90c4f3a27f2d74ae68f4d0cdbcd49c828ccb7281539617125e3715645e4a67"
contentMode: "local-full"
zh: ""
---

## Exercises

1. This chapter built the `HelloAgents` framework and explained "why we need to build our own Agent framework." Please analyze:

   - Section 7.1.1 mentioned four main limitations of current mainstream frameworks. Combined with your actual experience using a framework in [Chapter 6 exercises](/lib/08-agents/hello-agents/docs-chapter6-第六章_框架开发实践/index#习题) or actual projects, explain how these problems affect development efficiency.
   - `HelloAgents` proposes the design philosophy of "everything is a tool," abstracting modules like `Memory`, `RAG`, and `MCP` as tools. What are the advantages of this design? Are there any limitations? Please provide examples.
   - Comparing the agent code implemented from scratch in Chapter 4 with the framework implementation in this chapter, what specific improvements does the framework bring? If you were to design a framework, what design principles would you prioritize?

2. In Section 7.2, we extended `HelloAgentsLLM` to support multiple model providers and local model invocation.

   > <strong>Hint</strong>: This is a practical exercise, hands-on operation is recommended

   - Referring to the example in Section 7.2.1, try adding support for a new model provider to `HelloAgentsLLM` (such as `Gemini`, `Anthropic`, `Kim`). Implement it through inheritance and enable automatic detection of that provider's environment variables.
   - Section 7.2.3 introduced three priorities of the automatic detection mechanism. Please analyze: If both `OPENAI_API_KEY` and `LLM_BASE_URL="http://localhost:11434/v1"` are set, which provider will the framework ultimately choose? Is this priority design reasonable?
   - Besides `VLLM` and `Ollama` introduced in this chapter, there are other local model deployment solutions like `SGLang`. Please first search for and understand the basic information and characteristics of `SGLang`, then compare `VLLM`, `SGLang`, and `Ollama` in terms of ease of use, resource consumption, inference speed, and inference accuracy.

3. In Section 7.3, we implemented the `Message` class, `Config` class, and `Agent` base class. Please analyze:

   - The `Message` class uses `Pydantic`'s `BaseModel` for data validation. What are the advantages of this design in practical applications?
   - The `Agent` base class defines two methods: `run` and `_execute`, where `run` is the public interface and `_execute` is an abstract method. What is this design pattern called? What are its benefits?
   - In the `Config` class, we used the singleton pattern. Please explain what the singleton pattern is, why configuration management needs to use the singleton pattern, and what problems would arise if the singleton pattern is not used.

4. In Section 7.4, we implemented four `Agent` paradigms in a framework manner.

   > <strong>Hint</strong>: This is a practical exercise, hands-on operation is recommended

   - Comparing the `ReActAgent` implemented from scratch in Chapter 4 with the framework-based `ReActAgent` in this chapter, list 3 specific improvements and explain how these improvements enhance code maintainability and extensibility.
   - `ReflectionAgent` implements an "execute-reflect-optimize" loop. Please extend this implementation by adding a "quality scoring" mechanism: After each reflection, have the `LLM` score the current version's output, and only continue optimization if the score is below a threshold; otherwise, terminate early.
   - Please design and implement a new `Agent` paradigm called `Tree-of-Thought Agent`, which should inherit from the `Agent` base class and be able to generate multiple possible thinking paths at each step, then select the optimal path to continue.

5. In Section 7.5, we built the tool system. Please consider the following questions:

   - The `BaseTool` class defines an `execute` abstract method that all tools must implement. Please explain why all tools should be forced to implement a unified interface. If a tool needs to return multiple values (such as a search tool returning title, summary, and link), how should it be designed?
   - Section 7.5.3 implemented tool chains (`ToolChain`). Please design a practical application scenario that requires chaining at least 3 tools and draw the execution flow diagram of the tool chain.
   - The asynchronous tool executor (`AsyncToolExecutor`) uses a thread pool to execute tools in parallel. Please analyze: Under what circumstances can parallel tool execution bring performance improvements?

6. Framework extensibility is one of the important considerations in design. You now need to extend the `HelloAgents` framework to implement some interesting new features and characteristics.

   - First, add a "streaming output" feature to `HelloAgents` so that the `Agent` can return intermediate results in real-time when generating responses (similar to the typing effect in the `ChatGPT` user interface). Please design the implementation plan for this feature and explain which classes and methods need to be modified.
   - Then add a "multi-turn conversation management" feature to the framework that can automatically manage conversation history, support conversation branching and backtracking. How would you design this? What new classes are needed? How to integrate with the existing `Message` system?
   - Finally, please design a "plugin system" for `HelloAgents` that allows third-party developers to extend framework functionality through plugins (such as adding new `Agent` types, new tool types, etc.) without modifying the framework's core code. Draw the architecture diagram of the plugin system and explain the key interfaces.
