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
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter6/Chapter6-Framework-Development-Practice.md"
sourceRel: "docs/chapter6/Chapter6-Framework-Development-Practice.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter6/Chapter6-Framework-Development-Practice.md"
sourceSha256: "b1fed6c4f8c2f0994b35685127374b4369ffd8dfb3b49d711d5c8a8ef362d2d4"
pageSha256: "7f52354025fa9bdc63c6c93be11f4ce3565d2506a4b0524b7c7918daab78e384"
contentMode: "local-full"
zh: ""
---

## Exercises

1. This chapter introduced four distinctive agent frameworks: `AutoGen`, `AgentScope`, `CAMEL`, and `LangGraph`. Please analyze:

   - In Table 6.1 of Section 6.1.2, multiple dimensions of these four frameworks were compared. Please select the two frameworks you are most familiar with and further compare them in depth from three dimensions: "collaboration mode," "control method," and "applicable scenarios."
   - This chapter mentioned the trade-off between "emergent collaboration" and "explicit control." How do you understand the meaning of these two design philosophies?

2. In the `AutoGen` case in Section 6.2, we built a "software development team." Please extend your thinking based on this case:

   > **Hint**: This is a hands-on practice question, actual operation is recommended

   - The current team uses `RoundRobinGroupChat` (round-robin group chat) mode, where agents speak in a fixed order. If requirements change and the engineer's code needs to be returned to the product manager for re-review, how should the collaboration process be modified? Please design a mechanism that supports "dynamic rollback."
   - In the case, we defined the role and responsibilities of each agent through `System Message`. Please try to add a new role "Quality Assurance" to this team and design its system message so that it can perform automated testing after code review.
   - `AutoGen`'s conversational collaboration has potential instability, which may cause conversations to deviate from the topic or fall into loops. Please think: How to design a "conversation quality monitoring" mechanism to intervene in time when anomalies are detected?

3. In the `AgentScope` case in Section 6.3, we implemented a "Three Kingdoms Werewolf" game. Please analyze in depth:

   - The case used `MsgHub` (message center) to manage communication between agents. Please explain what advantages message-driven architecture has compared to traditional function calls? In what scenarios is this architecture particularly valuable?
   - The game used structured output (such as `DiscussionModelCN`, `WitchActionModelCN`) to constrain agent behavior. Please design a new game role "Hunter" and define its corresponding structured output model, including field definitions and validation rules.
   - `AgentScope` supports distributed deployment, which means different agents can run on different servers. Please think: In a real-time game scenario like "Three Kingdoms Werewolf," what technical challenges will distributed deployment bring? How to ensure message ordering and consistency?

4. In the `CAMEL` case in Section 6.4, we had a psychologist and writer collaborate to create an e-book.

   - In the case, collaboration is forcibly terminated when the `<CAMEL_TASK_DONE>` flag is detected. But what if the two agents disagree (one thinks it can be terminated, one thinks it shouldn't) and cannot reach consensus? Please design a "conflict resolution" compatibility mechanism.
   - `CAMEL` was originally designed for two-agent collaboration but has now been extended to support multi-agent. Please consult `CAMEL`'s latest documentation to understand its multi-agent collaboration module [`workforce`](https://docs.camel-ai.org/key_modules/workforce), and explain how it differs from `AutoGen`'s group chat mode in combination with the architecture diagram.

5. In the `LangGraph` case in Section 6.5, we built a "three-step Q&A assistant." Please analyze:

   - `LangGraph` models the agent process as a state machine and directed graph. Please draw the graph structure of the "understand-search-answer" process in the case, marking nodes, edges, and state transition conditions.
   - The current assistant is a linear process. Please extend this case by adding a "reflection" node: if the generated answer quality is low (e.g., too brief or lacking details), the system should re-search or regenerate the answer. Please design the conditional edge logic for this loop mechanism.
   - `LangGraph`'s advantage lies in native support for loops. Please design a more complex application scenario that fully utilizes this feature: for example, "code generation-testing-fixing" loop, "paper writing-review-revision" loop, etc. Draw the complete graph structure and explain the function of key nodes.

6. Framework selection is one of the key decisions in agent product development. Suppose you are a technical architect at an `AI` company, and the company plans to develop the following three agent product applications. Please select the most suitable framework for each application (`AutoGen`, `AgentScope`, `CAMEL`, `LangGraph`, or develop from scratch without a framework) and explain in detail:

   **Application A**: Intelligent customer service system, needs to handle a large number of concurrent user requests (1000+ per second), requires response time less than 2 seconds, system needs to run stably 7×24 hours, and support horizontal scaling.

   **Application B**: Scientific research paper writing assistance platform, needs a "researcher agent" and a "writer agent" to collaborate deeply, jointly completing literature review, experimental design, data analysis, and paper writing. Requires agents to conduct multiple rounds of in-depth discussion and autonomously advance tasks.

   **Application C**: Financial risk control approval system, needs to process loan applications according to strict procedures: document review → risk assessment → quota calculation → compliance check → manual review → final decision. Each link has clear judgment criteria and branch logic, requiring traceable and auditable processes.
