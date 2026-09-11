---
title: "Quick Self-Check (ungraded) [[quiz2]]"
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

# Quick Self-Check (ungraded) [[quiz2]]

What?! Another Quiz? We know, we know, ... 😅 But this short, ungraded quiz is here to **help you reinforce key concepts you've just learned**.

This quiz covers agent workflows and interactions - essential components for building effective AI agents.

### Q1: What is the purpose of AgentWorkflow in LlamaIndex?


**选项**

- A. To run one or more agents with tools
- B. To create a single agent that can query your data without memory
- C. To automatically build tools for agents
- D. To manage agent memory and state

**答案解析**

- **A（正确答案）** — Yes, the AgentWorkflow is the main way to quickly create a system with one or more agents.
- **B** — No, the AgentWorkflow is more capable than that, the QueryEngine is for simple queries over your data.
- **C** — The AgentWorkflow does not build tools, that is the job of the developer.
- **D** — Managing memory and state is not the primary purpose of AgentWorkflow.


---

### Q2: What object is used for keeping track of the state of the workflow?


**选项**

- A. State
- B. Context
- C. WorkflowState
- D. Management

**答案解析**

- **A** — State is not the correct object for workflow state management.
- **B（正确答案）** — Context is the correct object used for keeping track of workflow state.
- **C** — WorkflowState is not the correct object.
- **D** — Management is not a valid object for workflow state.


---

### Q3: Which method should be used if you want an agent to remember previous interactions?


**选项**

- A. run(query_str)
- B. chat(query_str, ctx=ctx)
- C. interact(query_str)
- D. run(query_str, ctx=ctx)

**答案解析**

- **A** — .run(query_str) does not maintain conversation history.
- **B** — chat() is not a valid method on workflows.
- **C** — interact() is not a valid method for agent interactions.
- **D（正确答案）** — By passing in and maintaining the context, we can maintain state!


---

### Q4: What is a key feature of Agentic RAG?


**选项**

- A. It can only use document-based tools, to answer questions in a RAG workflow
- B. It automatically answers questions without tools, like a chatbot
- C. It can decide to use any tool to answer questions, including RAG tools
- D. It only works with Function Calling Agents

**答案解析**

- **A** — Agentic RAG can use different tools, including document-based tools.
- **B** — Agentic RAG does use tools to answer questions.
- **C（正确答案）** — Agentic RAG has the flexibility to use different tools to answer questions.
- **D** — Agentic RAG is not limited to Function Calling Agents.


---


Got it? Great! Now let's **do a brief recap of the unit!**
