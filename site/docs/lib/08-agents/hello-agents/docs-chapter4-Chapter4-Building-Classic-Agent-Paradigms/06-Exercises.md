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
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter4/Chapter4-Building-Classic-Agent-Paradigms.md"
sourceRel: "docs/chapter4/Chapter4-Building-Classic-Agent-Paradigms.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter4/Chapter4-Building-Classic-Agent-Paradigms.md"
sourceSha256: "b75d4d22d2e0ff344459f93f23a3217736d3dc3a383dbc9e825616fcb344cb41"
pageSha256: "e44da01f7cb02ccb401892afdb7f6058cecf743c3ef547243447ff57f495ee68"
contentMode: "local-full"
zh: ""
---

## Exercises

> **Note**: Some exercises do not have standard answers; the focus is on cultivating learners' comprehensive understanding and practical ability in agent paradigm design.

1. This chapter introduced three classic agent paradigms: `ReAct`, `Plan-and-Solve`, and `Reflection`. Please analyze:

   - What are the essential differences in how these three paradigms organize "thinking" and "action"?
   - If you were to design a "smart home control assistant" (needs to control lights, air conditioning, curtains, and other devices, and automatically adjust based on user habits), which paradigm would you choose as the basic architecture? Why?
   - Can these three paradigms be combined? If so, please try to design a hybrid paradigm agent architecture and explain its applicable scenarios.

2. In the `ReAct` implementation in Section 4.2, we used regular expressions to parse the large language model's output (such as `Thought` and `Action`). Please consider:

   - What potential fragilities exist in the current parsing method? Under what circumstances might it fail?
   - Besides regular expressions, what are some more robust output parsing solutions?
   - Try modifying the code in this chapter to use a more reliable output format, and compare the pros and cons of the two approaches.

3. Tool invocation is one of the core capabilities of modern agents. Based on the `ToolExecutor` design in Section 4.2.2, please complete the following extension practice:

   > **Note**: This is a hands-on practice question; it is recommended to actually write code.

   - Add a "calculator" tool to the `ReAct` agent so it can handle complex mathematical calculation problems (such as "Calculate the result of `(123 + 456) × 789 / 12 = ?`").
   - Design and implement a "tool selection failure" handling mechanism: when the agent repeatedly calls the wrong tool or provides wrong parameters, how should the system guide it to correct?
   - Consider: If the number of callable tools increases to 50 or even 100, will the current tool description method still work effectively? From an engineering perspective, how can we optimize the organization and retrieval mechanism of tools when the number of callable tools significantly increases with business needs?

4. The `Plan-and-Solve` paradigm decomposes tasks into two stages: "planning" and "execution." Please analyze in depth:

   - In the implementation in Section 4.3, the plan generated in the planning phase is "static" (generated once, not modifiable). If during execution it is found that a certain step cannot be completed or the result does not meet expectations, how should a "dynamic replanning" mechanism be designed?
   - Compare `Plan-and-Solve` with `ReAct`: When handling a task like "booking a business trip from Beijing to Shanghai (including flights, hotels, car rental)," which paradigm is more suitable? Why?
   - Try designing a "hierarchical planning" system: first generate a high-level abstract plan, then generate detailed sub-plans for each high-level step. What advantages does this design have?

5. The `Reflection` mechanism improves output quality through the "execute-reflect-refine" loop. Please consider:

   - In the code generation case in Section 4.4, the same model is used for different stages. If two different models are used (for example, using a more powerful model for reflection and a faster model for execution), what impact would it have?
   - The termination condition for the `Reflection` mechanism is "feedback contains **no improvement needed**" or "maximum iteration count reached." Is this design reasonable? Can a more intelligent termination condition be designed?
   - Suppose you want to build an "academic paper writing assistant" that can generate drafts and continuously optimize paper content. Please design a multi-dimensional Reflection mechanism that reflects and improves from multiple perspectives such as paragraph logic, method innovation, language expression, and citation standards.

6. Prompt engineering is a key technology affecting the final effect of agents. This chapter demonstrated multiple carefully designed prompt templates. Please analyze:

   - Compare the `ReAct` prompt in Section 4.2.3 and the `Plan-and-Solve` prompt in Section 4.3.2; they obviously have significant differences in structural design. How do these differences serve the core logic of their respective paradigms?
   - In the `Reflection` prompt in Section 4.4.3, we used a role setting like "you are an extremely strict code review expert." Try modifying this role setting (such as changing it to "you are an open-source project maintainer who values code readability"), observe the changes in output results, and summarize the impact of role settings on agent behavior.
   - Adding `few-shot` examples to prompts can often significantly improve the model's ability to follow specific formats. Please try adding `few-shot` examples to one of the agents in this chapter and compare the effects.

7. An e-commerce startup now hopes to use a "customer service agent" to replace human customer service for cost reduction and efficiency improvement. It needs to have the following functions:

   a. Understand the user's refund request reason

   b. Query the user's order information and logistics status

   c. Intelligently judge whether the refund should be approved based on company policy

   d. Generate a proper reply email and send it to the user's email

   e. If the judgment decision is somewhat controversial (self-confidence is below a threshold), be able to self-reflect and provide more prudent suggestions

   As the product manager of this product:
   - Which paradigm (or combination of paradigms) from this chapter would you choose as the core architecture of the system?
   - What tools does this system need? Please list at least 3 tools and their functional descriptions.
   - How to design prompts to ensure that the agent's decisions both align with company interests and maintain a friendly attitude toward users?
   - What risks and challenges might this product face after launch? How can these risks be reduced through technical means?
