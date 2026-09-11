---
title: "Small Quiz (ungraded) [[quiz1]]"
sourceId: "08-agents/huggingface-agents-course"
sourceTitle: "Hugging Face Agents Course（智能体课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/huggingface/agents-course"
entryUrl: "https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/README.md"
zh: ""
---

# Small Quiz (ungraded) [[quiz1]]

Let's test your understanding of `smolagents` with a quick quiz! Remember, testing yourself helps reinforce learning and identify areas that may need review.

This is an optional quiz and it's not graded.

### Q1: What is one of the primary advantages of choosing `smolagents` over other frameworks?
Which statement best captures a core strength of the `smolagents` approach?


**选项**

- A. It uses highly specialized configuration files and a steep learning curve to ensure only expert developers can use it
- B. It supports a code-first approach with minimal abstractions, letting agents interact directly via Python function calls
- C. It focuses on JSON-based actions, removing the need for agents to write any code
- D. It deeply integrates with a single LLM provider and specialized hardware

**答案解析**

- **A** — smolagents is designed for simplicity and minimal code complexity, not steep learning curves.
- **B（正确答案）** — Yes, smolagents emphasizes a straightforward, code-centric design with minimal abstractions.
- **C** — While smolagents supports JSON-based tool calls (ToolCallingAgents), the library emphasizes code-based approaches with CodeAgents.
- **D** — smolagents supports multiple model providers and does not require specialized hardware.


---

### Q2: In which scenario would you likely benefit most from using smolagents?
Which situation aligns well with what smolagents does best?


**选项**

- A. Prototyping or experimenting quickly with agent logic, particularly when your application is relatively straightforward
- B. Building a large-scale enterprise system where you need dozens of microservices and real-time data pipelines
- C. Needing a framework that only supports cloud-based LLMs and forbids local inference
- D. A scenario that requires advanced orchestration, multi-modal perception, and enterprise-scale features out-of-the-box

**答案解析**

- **A（正确答案）** — Yes. smolagents is designed for simple and nimble agent creation without extensive setup overhead.
- **B** — While possible, smolagents is more focused on lightweight, code-centric experimentation rather than heavy enterprise infrastructure.
- **C** — smolagents offers flexible integration with local or hosted models, not exclusively cloud-based LLMs.
- **D** — While you can integrate advanced capabilities, smolagents itself is lightweight and minimal at its core.


---

### Q3: smolagents offers flexibility in model integration. Which statement best reflects its approach?
Choose the most accurate description of how smolagents interoperates with LLMs.


**选项**

- A. It only provides a single built-in model and does not allow custom integrations
- B. It requires you to implement your own model connector for every LLM usage
- C. It only integrates with open-source LLMs but not commercial APIs
- D. It can be used with a wide range of LLMs, offering predefined classes like TransformersModel, InferenceClientModel, and LiteLLMModel

**答案解析**

- **A** — smolagents supports multiple different backends and user-defined models.
- **B** — There are multiple prebuilt connectors that make LLM integration straightforward.
- **C** — smolagents can integrate with both open-source and commercial model APIs.
- **D（正确答案）** — This is correct. smolagents supports flexible model integration through various classes.


---

### Q4: How does smolagents handle the debate between code-based actions and JSON-based actions?
Which statement correctly characterizes smolagents' philosophy about action formats?


**选项**

- A. It only allows JSON-based actions for all agent tasks, requiring a parser to extract the tool calls
- B. It focuses on code-based actions via a CodeAgent but also supports JSON-based tool calls with a ToolCallingAgent
- C. It disallows any external function calls, instead requiring all logic to reside entirely within the LLM
- D. It requires users to manually convert every code snippet into a JSON object before running the agent

**答案解析**

- **A** — ToolCallingAgent uses JSON-based calls, but smolagents also provides a primary CodeAgent option that writes Python code.
- **B（正确答案）** — Yes, smolagents primarily recommends code-based actions but includes a JSON-based alternative for users who prefer it or need it.
- **C** — smolagents is specifically designed to grant LLMs the ability to call tools or code externally.
- **D** — smolagents can automatically manage code snippet creation within the CodeAgent path, no manual JSON conversion necessary.


---

### Q5: How does smolagents integrate with the Hugging Face Hub for added benefits?
Which statement accurately describes one of the core advantages of Hub integration?


**选项**

- A. It automatically upgrades all public models to commercial license tiers
- B. It disables local inference entirely, forcing remote model usage only
- C. It allows you to push and share agents or tools, making them easily discoverable and reusable by other developers
- D. It permanently stores all your code-based agents, preventing any updates or versioning

**答案解析**

- **A** — Hub integration doesn't change the license tier for models or tools.
- **B** — Users can still do local inference if they prefer; pushing to the Hub doesn't override local usage.
- **C（正确答案）** — smolagents supports uploading agents and tools to the HF Hub for others to reuse.
- **D** — Hub repositories support updates and version control, so you can revise your code-based agents any time.


---

Congratulations on completing this quiz! 🎉 If you missed any questions, consider reviewing the *Why use smolagents* section for a deeper understanding. If you did well, you're ready to explore more advanced topics in smolagents!
