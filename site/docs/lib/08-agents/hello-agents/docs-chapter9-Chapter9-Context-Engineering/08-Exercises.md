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
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter9/Chapter9-Context-Engineering.md"
sourceRel: "docs/chapter9/Chapter9-Context-Engineering.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter9/Chapter9-Context-Engineering.md"
sourceSha256: "a938d5891a685ed50b2518022c83b55241958ab880713f74b814c97e6a31dc53"
pageSha256: "cb9cc6ed9a695f47f57d1b4ca3af6a8e294063e1078b2be14fbbf9551de790d5"
contentMode: "local-full"
zh: ""
---

## Exercises

> **Note**: Some exercises do not have standard answers. The focus is on cultivating learners' comprehensive understanding and practical ability in context engineering and long-horizon task management.

1. This chapter introduced the difference between context engineering and prompt engineering. Please analyze:

   - Section 9.1 mentioned "context must be viewed as a limited resource with diminishing marginal returns". Please explain what the "context rot" phenomenon is? Why do we still need to carefully manage context even when models support 100K or even 200K context windows?
   - Suppose you want to build a "code review assistant" that needs to analyze a codebase containing 50 files. Please compare two strategies: (1) Load all file content into context at once; (2) Use JIT (Just-in-time) context, retrieving files on demand through tools. Analyze the advantages, disadvantages, and applicable scenarios of each.
   - Section 9.2.1 mentioned two extreme pitfalls of system prompts: "over-hardcoding" and "too vague". Please give a practical example of each and explain how to find the right balance.

2. The GSSC (Gather-Select-Structure-Compress) pipeline is the core technology of this chapter. Please think deeply:

   > **Note**: This is a hands-on practice question, actual operation is recommended

   - In the ContextBuilder implementation in Section 9.3, the four stages each have different responsibilities. Please analyze: If a certain stage fails (such as the Select stage selecting irrelevant information, or the Compress stage over-compressing leading to information loss), what impact will it have on the final agent performance?
   - Based on the code in Section 9.3.4, add a "context quality assessment" function to ContextBuilder: After each context build, automatically evaluate the information density, relevance, and completeness of the context, and provide optimization suggestions.
   - The "compression" stage in the GSSC pipeline uses LLM for intelligent summarization. Please think: Under what circumstances might simple truncation or sliding window strategies be more appropriate than LLM summarization? Design a hybrid compression strategy that combines the advantages of multiple compression methods.

3. NoteTool and TerminalTool are key tools supporting long-horizon tasks. Based on Sections 9.4 and 9.5, please complete the following extension practices:

   > **Note**: This is a hands-on practice question, actual operation is recommended

   - NoteTool uses a hierarchical note system (project notes, task notes, temporary notes). Please design an "automatic note organization" mechanism: When temporary notes accumulate to a certain number, the agent can automatically analyze these notes, promote important information to task notes or project notes, and clean up redundant content.
   - TerminalTool provides file system operation capabilities, but Section 9.5.2 emphasizes security design. Please analyze: Are the current security mechanisms (path validation, command whitelist, permission check) sufficient? If the agent needs to access sensitive files or execute dangerous operations, how should a "human-machine collaborative approval" process be designed?
   - Combining NoteTool and TerminalTool, design an "intelligent code refactoring assistant": Can analyze codebase structure, record refactoring plans, execute refactoring operations step by step, and track progress and encountered problems in notes. Please draw a complete workflow diagram.

4. In the "long-horizon task management" case in Section 9.6, we saw the value of context engineering in practical applications. Please analyze in depth:

   - The case uses a "layered context management" strategy: instant access (TerminalTool) + session memory (MemoryTool) + persistent notes (NoteTool). Please analyze: How should these three layers coordinate? What information should be placed in which layer? How to avoid information redundancy and inconsistency?
   - Suppose an interruption occurs during task execution (such as system crash, network disconnection), the agent needs to recover state from notes and continue execution. Please design a "resume from breakpoint" mechanism: How to record sufficient state information in notes? How to verify that the recovered state is correct?
   - Long-horizon tasks often involve parallel or serial execution of multiple subtasks. Please design a "task dependency management" system: Can express dependency relationships between tasks (such as "Task B must be executed after Task A is completed"), and automatically schedule task execution order. How should this system integrate with NoteTool?

5. This chapter repeatedly mentioned the concept of "progressive disclosure". Please think:

   - In Section 9.2.2, progressive disclosure is described as "each interaction step produces new context, which in turn guides the next decision". Please design a specific application scenario (such as academic paper writing, complex problem debugging), demonstrating how progressive disclosure helps agents complete tasks more efficiently.
   - A potential risk of progressive disclosure is "inefficient exploration": The agent may waste time on unimportant details or miss key information. Please design an "exploration guidance" mechanism: Through heuristic rules or metacognitive strategies, help the agent make smarter decisions about "what to explore next".
   - Compare "progressive disclosure" with traditional "load all context at once": In what types of tasks does the former have obvious advantages? In what types of tasks might the latter be more appropriate? Please provide at least 3 examples of different types of tasks.
