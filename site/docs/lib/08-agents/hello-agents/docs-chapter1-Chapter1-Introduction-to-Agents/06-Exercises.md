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
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter1/Chapter1-Introduction-to-Agents.md"
sourceRel: "docs/chapter1/Chapter1-Introduction-to-Agents.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter1/Chapter1-Introduction-to-Agents.md"
sourceSha256: "a3d5339c2330343472cff188db9f8e8f80f4b0ac6aa1a4e90a7aaea3363dd656"
pageSha256: "9d7ac8c657ae304582b4ef08868b16291cd18aca8f9a6938dd677504384ff3bd"
contentMode: "local-full"
zh: ""
---

## Exercises

> **Note**: Some of the following exercises do not have standard answers. The focus is on cultivating learners' critical in-depth thinking and hands-on practical abilities regarding agent systems.

1. Please analyze whether the **subject** in the following four `cases` qualifies as an agent. If so, what type of agent does it belong to (can be analyzed from multiple classification dimensions), and explain your reasoning:

   `Case A`: **A supercomputer conforming to von Neumann architecture**, with peak computing power of up to 2 EFlops per second

   `Case B`: **Tesla's autonomous driving system** is driving on a highway when it suddenly detects an obstacle ahead and needs to make a braking or lane-change decision within milliseconds

   `Case C`: **AlphaGo** is playing against a human player and needs to evaluate the current situation and plan the optimal strategy for dozens of moves ahead

   `Case D`: **ChatGPT acting as an intelligent customer service** is handling a user complaint and needs to query order information, analyze the problem cause, provide solutions, and soothe user emotions

2. Suppose you need to design a task environment for an "intelligent fitness coach." This agent can:
   - Monitor users' physiological data such as heart rate and exercise intensity through wearable devices
   - Dynamically adjust training plans based on users' fitness goals (fat loss/muscle gain/endurance improvement)
   - Provide real-time voice guidance and motion correction during user exercise
   - Evaluate training effectiveness and provide dietary recommendations

   Please use the PEAS model to completely describe this agent's task environment and analyze what characteristics this environment has (such as partially observable, stochastic, dynamic, etc.).

3. An e-commerce company is considering two approaches to handle after-sales refund requests:

   Approach A (`Workflow`): Design a fixed process, for example:

   A.1 For general products within 7 days, amounts `< 100 RMB` are automatically approved; `100-500 RMB` are reviewed by customer service; `> 500 RMB` require supervisor approval; special products (such as customized items) are always rejected

   A.2 For products beyond 7 days, regardless of amount, they can only be reviewed by customer service or approved by supervisors;

   Approach B (`Agent`): Build an agent system that understands refund policies, analyzes user historical behavior, evaluates product conditions, and autonomously decides whether to approve refunds

   Please analyze:
   - What are the advantages and disadvantages of these two approaches?
   - Under what circumstances is `Workflow` more suitable? When does `Agent` have advantages? If you were the head of this e-commerce company, which approach would you prefer?
   - Is there an Approach C that can combine both approaches to achieve complementary strengths?

4. Based on the intelligent travel assistant in Section 1.3, please consider how to add the following features (you can just describe the design ideas or further attempt code implementation):

   > **Hint**: Think about how to modify the `Thought-Action-Observation` loop to implement these features.

   - Add a "memory" feature that allows the agent to remember user preferences (such as liking historical and cultural attractions, budget range, etc.)
   - When recommended attraction tickets are sold out, the agent can automatically recommend alternative options
   - If the user consecutively rejects 3 recommendations, the agent can reflect and adjust its recommendation strategy

5. Kahneman's "System 1" (fast intuition) and "System 2" (slow reasoning) theory<sup>[2]</sup> provides a good analogy for neuro-symbolic AI. Please first conceive a specific agent application scenario, then explain in the scenario:

   > **Hint**: Medical diagnosis assistants, legal consulting robots, financial risk control systems, etc., are all common application scenarios

   - Which tasks should be handled by "System 1"?
   - Which tasks should be handled by "System 2"?
   - How do these two systems work together to achieve the final goal?

6. Although large language model-driven agent systems demonstrate powerful capabilities, they still have many limitations. Please analyze the following questions:
   - Why do agents or agent systems sometimes produce "hallucinations" (generating seemingly reasonable but actually incorrect information)?
   - In the case in Section 1.3, we set the maximum number of loops to 5. Without this limit, what problems might the agent encounter?
   - How to evaluate an agent's "intelligence" level? Is using only accuracy metrics sufficient?
