---
title: "Hugging Face Agents Course（智能体课程）"
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

### Q1: What is an Agent?
Which of the following best describes an AI Agent?


**选项**

- A. An AI model that can reason, plan, and use tools to interact with its environment to achieve a specific goal.
- B. A system that solely processes static text, without any inherent mechanism to interact dynamically with its surroundings or execute meaningful actions.
- C. A conversational agent restricted to answering queries, lacking the ability to perform any actions or interact with external systems.
- D. An online repository of information that offers static content without the capability to execute tasks or interact actively with users.

**答案解析**

- **A（正确答案）** — This definition captures the essential characteristics of an Agent.
- **B** — An Agent must be able to take an action and interact with its environment.
- **C** — A chatbot like this lacks the ability to take actions, making it different from an Agent.
- **D** — An Agent actively interacts with its environment rather than just providing static information.


---

### Q2: What is the Role of Planning in an Agent?
Why does an Agent need to plan before taking an action?


**选项**

- A. To primarily store or recall past interactions, rather than mapping out a sequence of future actions.
- B. To decide on the sequence of actions and select appropriate tools needed to fulfill the user’s request.
- C. To execute a sequence of arbitrary and uncoordinated actions that lack any defined strategy or intentional objective.
- D. To merely convert or translate text, bypassing any process of formulating a deliberate sequence of actions or employing strategic reasoning.

**答案解析**

- **A** — Planning is about determining future actions, not storing past interactions.
- **B（正确答案）** — Planning helps the Agent determine the best steps and tools to complete a task.
- **C** — Planning ensures the Agent's actions are intentional and not random.
- **D** — Planning is about structuring actions, not just converting text.


---

### Q3: How Do Tools Enhance an Agent's Capabilities?
Why are tools essential for an Agent?


**选项**

- A. Tools serve no real purpose and do not contribute to the Agent’s ability to perform actions beyond basic text generation.
- B. Tools are solely designed for memory storage, lacking any capacity to facilitate the execution of tasks or enhance interactive performance.
- C. Tools severely restrict the Agent exclusively to generating text, thereby preventing it from engaging in a broader range of interactive actions.
- D. Tools provide the Agent with the ability to execute actions a text-generation model cannot perform natively, such as making coffee or generating images.

**答案解析**

- **A** — Tools expand an Agent's capabilities by allowing it to perform actions beyond text generation.
- **B** — Tools are primarily for performing actions, not just for storing data.
- **C** — On the contrary, tools allow Agents to go beyond text-based responses.
- **D（正确答案）** — Tools enable Agents to interact with the real world and complete tasks.


---

### Q4: How Do Actions Differ from Tools?
What is the key difference between Actions and Tools?


**选项**

- A. Actions are the steps the Agent takes, while Tools are external resources the Agent can use to perform those actions.
- B. Actions and Tools are entirely identical components that can be used interchangeably, with no clear differences between them.
- C. Tools are considered broad utilities available for various functions, whereas Actions are mistakenly thought to be restricted only to physical interactions.
- D. Actions inherently require the use of LLMs to be determined and executed, whereas Tools are designed to function autonomously without such dependencies.

**答案解析**

- **A（正确答案）** — Actions are higher-level objectives, while Tools are specific functions the Agent can call upon.
- **B** — No, Actions are goals or tasks, while Tools are specific utilities the Agent uses to achieve them.
- **C** — Not necessarily. Actions can involve both digital and physical tasks.
- **D** — While LLMs help decide Actions, Actions themselves are not dependent on LLMs.


---

### Q5: What Role Do Large Language Models (LLMs) Play in Agents?
How do LLMs contribute to an Agent’s functionality?


**选项**

- A. LLMs function merely as passive repositories that store information, lacking any capability to actively process input or produce dynamic responses.
- B. LLMs serve as the reasoning 'brain' of the Agent, processing text inputs to understand instructions and plan actions.
- C. LLMs are erroneously believed to be used solely for image processing, when in fact their primary function is to process and generate text.
- D. LLMs are considered completely irrelevant to the operation of AI Agents, implying that they are entirely superfluous in any practical application.

**答案解析**

- **A** — LLMs actively process text input and generate responses, rather than just storing information.
- **B（正确答案）** — LLMs enable the Agent to interpret, plan, and decide on the next steps.
- **C** — LLMs primarily work with text, although they can sometimes interact with multimodal inputs.
- **D** — LLMs are a core component of modern AI Agents.


---

### Q6: Which of the Following Best Demonstrates an AI Agent?
Which real-world example best illustrates an AI Agent at work?


**选项**

- A. A static FAQ page on a website that provides fixed information and lacks any interactive or dynamic response capabilities.
- B. A simple calculator that performs arithmetic operations based on fixed rules, without any capability for reasoning or planning.
- C. A virtual assistant like Siri or Alexa that can understand spoken commands, reason through them, and perform tasks like setting reminders or sending messages.
- D. A video game NPC that operates on a fixed script of responses, without the ability to reason, plan, or use external tools.

**答案解析**

- **A** — A static FAQ page does not interact dynamically with users or take actions.
- **B** — A calculator follows fixed rules without reasoning or planning, so it is not an Agent.
- **C（正确答案）** — This example includes reasoning, planning, and interaction with the environment.
- **D** — Unless the NPC can reason, plan, and use tools, it does not function as an AI Agent.


---

Congrats on finishing this Quiz 🥳! If you need to review any elements, take the time to revisit the chapter to reinforce your knowledge before diving deeper into the "Agent's brain": LLMs.
