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
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter2/Chapter2-History-of-Agents.md"
sourceRel: "docs/chapter2/Chapter2-History-of-Agents.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter2/Chapter2-History-of-Agents.md"
sourceSha256: "0175e813e60ccb0ed20916ae4d989057f06836868d0071c1065bdf5762061b28"
pageSha256: "7ed9286632ee5d5b441c0d1293ce5ea999b52efede1fb78bdc675c1b869132d9"
contentMode: "local-full"
zh: ""
---

## Exercises

> **Note**: Some of the following exercises do not have standard answers, aiming to help learners establish systematic understanding of agent development history and cultivate "learning from history" technical insight.

1. The Physical Symbol System Hypothesis<sup>[1]</sup> is the theoretical cornerstone of the symbolicism era. Please analyze:

   - What do the "sufficiency assertion" and "necessity assertion" of this hypothesis mean?
   - Combined with this chapter's content, explain which problems encountered by symbolic agents in practice challenged the "sufficiency" of this hypothesis?
   - Do large language model-driven agents conform to the Physical Symbol System Hypothesis?

2. The expert system MYCIN<sup>[2]</sup> achieved significant success in the medical diagnosis field but was ultimately not widely applied in clinical practice. Please think:

   > **Hint**: Can analyze from multiple perspectives including technology, ethics, law, user acceptance, etc.

   - Besides the "knowledge acquisition bottleneck" and "brittleness" mentioned in this chapter, what other factors might have hindered the application of expert systems in high-risk fields like medicine?
   - If you were to design a medical diagnosis agent now, how would you design the system to overcome MYCIN's limitations?
   - In which vertical domains are rule-based expert systems still a better choice than deep learning today? Please give examples.

3. In Section 2.2, we implemented a simplified version of the ELIZA chatbot. Please expand on this basis:

   > **Hint**: This is a hands-on practice question; actual code writing is recommended

   - Add 3-5 new rules to ELIZA to enable it to handle more diverse conversation scenarios (such as discussing work, study, hobbies, etc.)
   - Implement a simple "contextual memory" function: allow ELIZA to remember key information mentioned by users in conversations (such as name, age, occupation) and reference it in subsequent conversations
   - Compare your expanded ELIZA with [ChatGPT](https://chatgpt.com/), listing at least 3 dimensions of essential differences
   - Why does the rule-based approach encounter "combinatorial explosion" problems and difficulty in scaling and maintenance when handling open-domain conversations? Can you explain using mathematical methods?

4. Marvin Minsky proposed a revolutionary viewpoint in the "society of mind" theory<sup>[7]</sup>: intelligence stems from collaboration of numerous simple agents, not a single perfect system.

   - In the Figure 2.6 "building a block tower" example, what would happen to the entire system if the `GRASP` agent suddenly failed? What are the advantages and disadvantages of this decentralized architecture?
   - Compare the "society of mind" theory with some current multi-agent systems (such as [CAMEL-Workforce](https://docs.camel-ai.org/key_modules/workforce), [MetaGPT](https://github.com/FoundationAgents/MetaGPT), [CrewAI](https://github.com/crewAIInc/crewAI)), what connections and differences exist between them?
   - Marvin Minsky believed agents could be "mindless" simple processes, yet current large language models and agents often possess powerful reasoning capabilities. Does this mean the "society of mind" theory is no longer applicable in the large language model era?

5. Reinforcement learning and supervised learning are two different learning paradigms. Please analyze:

   - Use AlphaGo's example to explain how reinforcement learning's "trial-and-error learning" mechanism works
   - Why is reinforcement learning particularly suitable for sequential decision problems? What is the essential difference in data requirements between it and supervised learning?
   - Now we need to train an agent to play Super Mario. If using supervised learning and reinforcement learning respectively, what data is needed for each? Which method is more suitable for this task?
   - In the training process of large language models, what key role does reinforcement learning play?

6. The pre-training-fine-tuning paradigm is an important breakthrough in the modern artificial intelligence field. Please think deeply:

   - Why does pre-training solve the "knowledge acquisition bottleneck" problem of the symbolicism era? What is the essential difference in knowledge representation methods?
   - Most knowledge of pre-trained models comes from internet data; what problems might this bring? How to mitigate these problems?
   - Do you think the "pre-training-fine-tuning" paradigm might be replaced by some new paradigm? Or will it exist long-term?

7. Suppose you want to design an "intelligent code review assistant" that can automatically review code submissions (Pull Requests), summarize code implementation logic, check code quality, discover potential bugs, and propose improvement suggestions.

   - If designing this system in the symbolicism era (1980s), how would you implement it? What difficulties would you encounter?
   - If in the deep learning era without large language models (around 2015), how would you implement it?
   - In the current era of large language models and agents, how would you design this agent's architecture? What modules should it include (refer to Figure 2.10)?
   - Comparing these three eras' solutions, explain how agent technology evolution made this task change from "almost impossible" to "feasible"
