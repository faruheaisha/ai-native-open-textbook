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
entryUrl: "https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/en/unit2/llama-index/quiz1.mdx"
sourceRel: "units/en/unit2/llama-index/quiz1.mdx"
rawUrl: "/raw/08-agents/huggingface-agents-course/units/en/unit2/llama-index/quiz1.mdx"
sourceSha256: "4f9e38986524c2a9e054ba4dcaf1582441a23df317a75fececc5b22f085807f0"
pageSha256: "4f9e38986524c2a9e054ba4dcaf1582441a23df317a75fececc5b22f085807f0"
contentMode: "local-full"
zh: ""
---

# Small Quiz (ungraded) [[quiz1]]

So far we've discussed the key components and tools used in LlamaIndex.
It's time to make a short quiz, since **testing yourself** is the best way to learn and [to avoid the illusion of competence](https://www.coursera.org/lecture/learning-how-to-learn/illusions-of-competence-BuFzf).
This will help you find **where you need to reinforce your knowledge**.

This is an optional quiz and it's not graded.

### Q1: What is a QueryEngine?
Which of the following best describes a QueryEngine component?


**选项**

- A. A system that only processes static text without any retrieval capabilities.
- B. A component that finds and retrieves relevant information as part of the RAG process.
- C. A tool that only stores vector embeddings without search functionality.
- D. A component that only evaluates response quality.

**答案解析**

- **A** — A QueryEngine must be able to retrieve and process relevant information.
- **B（正确答案）** — This captures the core purpose of a QueryEngine component.
- **C** — A QueryEngine does more than just store embeddings - it actively searches and retrieves information.
- **D** — Evaluation is separate from the QueryEngine's main retrieval purpose.


---

### Q2: What is the Purpose of FunctionTools?
Why are FunctionTools important for an Agent?


**选项**

- A. To handle large amounts of data storage.
- B. To convert Python functions into tools that an agent can use.
- C. To allow agents to create random functions definitions.
- D. To only process text data.

**答案解析**

- **A** — FunctionTools are not primarily for data storage.
- **B（正确答案）** — FunctionTools wrap Python functions to make them accessible to agents.
- **C** — FunctionTools serve the specific purpose of making functions available to agents.
- **D** — FunctionTools can work with various types of functions, not just text processing.


---

### Q3: What are Toolspecs in LlamaIndex?
What is the main purpose of Toolspecs?


**选项**

- A. They are redundant components that don't add functionality.
- B. They are sets of community-created tools that extend agent capabilities.
- C. They are used solely for memory management.
- D. They only work with text processing.

**答案解析**

- **A** — Toolspecs serve an important purpose in the LlamaIndex ecosystem.
- **B（正确答案）** — Toolspecs allow the community to share and reuse tools.
- **C** — Toolspecs are about providing tools, not managing memory.
- **D** — Toolspecs can include various types of tools, not just text processing.


---

### Q4: What is Required to create a tool?
What information must be included when creating a tool?


**选项**

- A. A function, a name, and description must be defined.
- B. Only the name is required.
- C. Only the description is required.
- D. Only the function is required.

**答案解析**

- **A** — While these all make up a tool, the name and description can be parsed from the function and docstring.
- **B** — A function and description/docstring is also required for proper tool documentation.
- **C** — A function is required so that we have code to run when an agent selects a tool
- **D（正确答案）** — The name and description default to the name and docstring from the provided function


---

Congrats on finishing this Quiz 🥳, if you missed some elements, take time to read again the chapter to reinforce your knowledge. If you pass it, you're ready to dive deeper into building with these components!
