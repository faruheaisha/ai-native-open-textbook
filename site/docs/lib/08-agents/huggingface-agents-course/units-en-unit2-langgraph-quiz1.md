---
title: "Test Your Understanding of LangGraph"
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

# Test Your Understanding of LangGraph

Let's test your understanding of `LangGraph` with a quick quiz! This will help reinforce the key concepts we've covered so far.

This is an optional quiz and it's not graded.

### Q1: What is the primary purpose of LangGraph?
Which statement best describes what LangGraph is designed for?


**选项**

- A. A framework to build control flows for applications containing LLMs
- B. A library that provides interfaces to interact with different LLM models
- C. An Agent library for tool calling

**答案解析**

- **A（正确答案）** — LangGraph is specifically designed to help build and manage the control flow of applications that use LLMs.
- **B** — This better describes LangChain's role, which provides standard interfaces for model interaction. LangGraph focuses on control flow.
- **C** — While LangGraph works with agents, the main purpose of LangGraph is 'Orchestration'.


---

### Q2: In the context of the "Control vs Freedom" trade-off, where does LangGraph stand?
Which statement best characterizes LangGraph's approach to agent design?


**选项**

- A. LangGraph maximizes freedom, allowing LLMs to make all decisions independently
- B. LangGraph provides strong control over execution flow while still leveraging LLM capabilities for decision making

**答案解析**

- **A** — LangGraph actually focuses more on control than freedom, providing structure for LLM workflows.
- **B（正确答案）** — LangGraph shines when you need control over your agent's execution, providing predictable behavior through structured workflows.


---

### Q3: What role does State play in LangGraph?
Choose the most accurate description of State in LangGraph.


**选项**

- A. State is the latest generation from the LLM
- B. State is only used to track errors during execution
- C. State represents the information that flows through your agent application
- D. State is only relevant when working with external APIs

**答案解析**

- **A** — State is a user-defined class in LangGraph, not LLM generated. It's fields are user defined, the values can be LLM filled
- **B** — State has a much broader purpose than just error tracking. But that's still usefull.
- **C（正确答案）** — State is central to LangGraph and contains all the information needed for decision-making between steps. You provide the fields than you need to compute and the nodes can alter the values to decide on a branching.
- **D** — State is fundamental to all LangGraph applications, not just those working with external APIs.


### Q4: What is a Conditional Edge in LangGraph?
Select the most accurate description.


**选项**

- A. An edge that determines which node to execute next based on evaluating a condition
- B. An edge that is only followed when a specific condition occurs
- C. An edge that requires user confirmation before proceeding

**答案解析**

- **A（正确答案）** — Conditional edges allow your graph to make dynamic routing decisions based on the current state, creating branching logic in your workflow.
- **B** — Conditional edges control the flow of the application on it's outputs, not on the input.
- **C** — Conditional edges are based on programmatic conditions, not user interaction requirements.


---

### Q5: How does LangGraph help address the hallucination problem in LLMs?
Choose the best answer.


**选项**

- A. LangGraph eliminates hallucinations entirely by limiting LLM responses
- B. LangGraph provides structured workflows that can validate and verify LLM outputs
- C. LangGraph has no effect on hallucinations

**答案解析**

- **A** — No framework can completely eliminate hallucinations from LLMs, LangGraph is no exception.
- **B（正确答案）** — By creating structured workflows with validation steps, verification nodes, and error handling paths, LangGraph helps reduce the impact of hallucinations.
- **C** — LangGraph's structured approach to workflows can help significantly in mitigating hallucinations at the cost of speed.


Congratulations on completing the quiz! 🎉 If you missed any questions, consider reviewing the previous sections to strengthen your understanding. Next, we'll explore more advanced features of LangGraph and see how to build more complex agent workflows.
