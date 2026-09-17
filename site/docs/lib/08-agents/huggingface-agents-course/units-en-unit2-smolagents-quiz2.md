---
title: "Small Quiz (ungraded) [[quiz2]]"
sourceId: "08-agents/huggingface-agents-course"
sourceTitle: "Hugging Face Agents Course（智能体课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/huggingface/agents-course"
entryUrl: "https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/en/unit2/smolagents/quiz2.mdx"
sourceRel: "units/en/unit2/smolagents/quiz2.mdx"
rawUrl: "/raw/08-agents/huggingface-agents-course/units/en/unit2/smolagents/quiz2.mdx"
sourceSha256: "057ce2ee436720d48feea433abf5da6de24028c16ab1fec5f459312e7890d11b"
pageSha256: "057ce2ee436720d48feea433abf5da6de24028c16ab1fec5f459312e7890d11b"
contentMode: "local-full"
zh: ""
---

# Small Quiz (ungraded) [[quiz2]]

It's time to test your understanding of the *Code Agents*, *Tool Calling Agents*, and *Tools* sections. This quiz is optional and not graded.

---

### Q1: What is the key difference between creating a tool with the `@tool` decorator versus creating a subclass of `Tool` in smolagents?

Which statement best describes the distinction between these two approaches for defining tools?


**选项**

- A. Using the <code>@tool</code> decorator is mandatory for retrieval-based tools, while subclasses of <code>Tool</code> are only for text-generation tasks
- B. The <code>@tool</code> decorator is recommended for simple function-based tools, while subclasses of <code>Tool</code> offer more flexibility for complex functionality or custom metadata
- C. <code>@tool</code> can only be used in multi-agent systems, while creating a <code>Tool</code> subclass is for single-agent scenarios
- D. Decorating a function with <code>@tool</code> replaces the need for a docstring, whereas subclasses must not include docstrings

**答案解析**

- **A** — Both approaches can be used for any type of tool, including retrieval-based or text-generation tools.
- **B（正确答案）** — This is correct. The decorator approach is simpler, but subclassing allows more customized behavior.
- **C** — All agents (single or multi) can use either approach to define tools; there is no such restriction.
- **D** — Both methods benefit from clear docstrings. The decorator doesn't replace them, and a subclass can still have docstrings.


---

### Q2: How does a CodeAgent handle multi-step tasks using the ReAct (Reason + Act) approach?

Which statement correctly describes how the CodeAgent executes a series of steps to solve a task?


**选项**

- A. It passes each step to a different agent in a multi-agent system, then combines results
- B. It stores every action in JSON for easy parsing before executing them all at once
- C. It cycles through writing internal thoughts, generating Python code, executing the code, and logging the results until it arrives at a final answer
- D. It relies on a vision module to validate code output before continuing to the next step

**答案解析**

- **A** — Although multi-agent systems can distribute tasks, CodeAgent itself can handle multiple steps on its own using ReAct.
- **B** — This behavior matches ToolCallingAgent's JSON-based approach, not CodeAgent.
- **C（正确答案）** — Correct. This describes the ReAct pattern that CodeAgent uses, including iterative reasoning and code execution.
- **D** — Vision capabilities are supported in smolagents, but they're not a default requirement for CodeAgent or the ReAct approach.


---

### Q3: Which of the following is a primary advantage of sharing a tool on the Hugging Face Hub?

Select the best reason why a developer might upload and share their custom tool.


**选项**

- A. It automatically integrates the tool with a MultiStepAgent for retrieval-augmented generation
- B. It allows others to discover, reuse, and integrate your tool in their smolagents without extra setup
- C. It ensures that only CodeAgents can invoke the tool while ToolCallingAgents cannot
- D. It converts your tool into a fully vision-capable function for image processing

**答案解析**

- **A** — Sharing a tool doesn't automatically set up retrieval or multi-step logic. It's just making the tool available.
- **B（正确答案）** — Yes. Sharing on the Hub makes tools accessible for anyone (including yourself) to download and reuse quickly.
- **C** — Both CodeAgents and ToolCallingAgents can invoke shared tools. There's no restriction by agent type.
- **D** — Tool sharing doesn't alter the tool's functionality or add vision capabilities automatically.


---

### Q4: ToolCallingAgent differs from CodeAgent in how it executes actions. Which statement is correct?

Choose the option that accurately describes how ToolCallingAgent works.


**选项**

- A. ToolCallingAgent is only compatible with a multi-agent system, while CodeAgent can run alone
- B. ToolCallingAgent delegates all reasoning to a separate retrieval agent, then returns a final answer
- C. ToolCallingAgent outputs JSON instructions specifying tool calls and arguments, which get parsed and executed
- D. ToolCallingAgent is only meant for single-step tasks and automatically stops after calling one tool

**答案解析**

- **A** — Either agent can be used alone or as part of a multi-agent system.
- **B** — ToolCallingAgent still uses a main LLM for reasoning; it doesn't rely solely on retrieval agents.
- **C（正确答案）** — This is correct. ToolCallingAgent uses the JSON approach to define tool calls.
- **D** — ToolCallingAgent can perform multiple steps if needed, just like CodeAgent.


---

### Q5: What is included in the smolagents default toolbox, and why might you use it?

Which statement best captures the purpose and contents of the default toolbox in smolagents?


**选项**

- A. It provides a set of commonly-used tools such as DuckDuckGo search, PythonInterpreterTool, and a final answer tool for quick prototyping
- B. It only supports vision-based tasks like image classification or OCR by default
- C. It is intended solely for multi-agent systems and is incompatible with a single CodeAgent
- D. It adds advanced retrieval-based functionality for large-scale question answering from a vector store

**答案解析**

- **A（正确答案）** — Correct. The default toolbox contains these ready-made tools for easy integration when building agents.
- **B** — Although smolagents can integrate vision-based features, the default toolbox isn't exclusively vision-oriented.
- **C** — The default toolbox can be used by any agent type, single or multi-agent setups alike.
- **D** — While you can build retrieval tools, the default toolbox does not automatically provide advanced RAG features.


---

Congratulations on completing this quiz! 🎉 If any questions gave you trouble, revisit the *Code Agents*, *Tool Calling Agents*, or *Tools* sections to strengthen your understanding. If you aced it, you're well on your way to building robust smolagents applications!
