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
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter11/Chapter11-Agentic-RL.md"
sourceRel: "docs/chapter11/Chapter11-Agentic-RL.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter11/Chapter11-Agentic-RL.md"
sourceSha256: "dfb7c4b693e4371073a223c23f10a2d7c13feef5f7f763ac1adc39385b49d698"
pageSha256: "f64ddb4e1c9c3d55215b29d171c76d555390f2d79b4eb30cc55a5fc7f3edd7c0"
contentMode: "local-full"
zh: ""
---

## Exercises

> **Note**: Some exercises do not have standard answers; the focus is on cultivating learners' comprehensive understanding and practical ability in Agentic RL and agent training.

1. This chapter introduced the evolution from LLM training to Agentic RL. Please analyze:

   - In Table 11.1 of Section 11.1.3, the differences between PBRFT (Preference-Based Reinforcement Fine-Tuning) and Agentic RL under the MDP framework are compared. Please explain in depth: Why does Agentic RL's state space $s_t = (\text{prompt}, o_1, o_2, ..., o_t)$ include historical observations, while PBRFT's state $s_0 = \text{prompt}$ only includes the initial prompt? What impact does this difference have on the training process and final results?
   - Suppose you want to train an "intelligent code debugging assistant" that needs to: (1) analyze code to find bugs; (2) consult documentation to understand API usage; (3) modify code; (4) run tests to verify fix effectiveness. Please map this task to the reinforcement learning framework, clearly defining state space, action space, reward function, and state transition function.
   - Section 11.1.1 mentioned that traditional supervised learning has the limitation of "difficulty optimizing long-term objectives". Please design a specific multi-step reasoning task (such as mathematical proof, complex problem solving), demonstrating why supervised learning struggles to optimize intermediate steps, while reinforcement learning can solve this problem through delayed rewards.

2. SFT (Supervised Fine-Tuning) and GRPO (Group Relative Policy Optimization) are two core training methods in this chapter. Based on Sections 11.2 and 11.3, please think deeply:

   > **Note**: This is a hands-on practice question, actual operation recommended

   - In the SFT training code in Section 11.2.4, we used LoRA (Low-Rank Adaptation) technology to reduce training parameters. Please analyze: What is the core idea of LoRA? Why can it achieve effects close to full parameter fine-tuning with a small number of parameters (such as 0.16%)? Under what circumstances should LoRA be chosen over full parameter fine-tuning?
   - What advantages does the GRPO algorithm (Section 11.3) have compared to traditional PPO algorithm? Please compare the training processes of both, analyzing how GRPO simplifies the training process and improves stability through "group-relative rewards". If applying GRPO to other tasks (such as code generation, dialogue optimization), what adjustments are needed?
   - Based on the code in Section 11.2.5, please extend the SFT training pipeline, adding the following features: (1) support for multi-turn dialogue data training; (2) add data augmentation strategies (such as synonym rewriting, difficulty adjustment); (3) implement visualization monitoring of training process (such as loss curves, sample quality assessment).

3. Reward function design is a core challenge of Agentic RL. Based on Section 11.3.3, please complete the following extended practice:

   > **Note**: This is a hands-on practice question, actual operation recommended

   - In Section 11.3.3, we designed a simple binary reward for GSM8K math problems (correct +1, incorrect 0). Please design a more refined reward function that can: (1) give partial rewards for partially correct answers; (2) score the reasonableness of the reasoning process; (3) penalize overly verbose or inefficient solution paths. How should this reward function be implemented?
   - Reward function design often requires domain knowledge. Please design reward functions for the following three different agent tasks: (1) code generation assistant (need to consider code correctness, readability, efficiency); (2) customer service dialogue agent (need to consider problem resolution rate, user satisfaction, response time); (3) game AI (need to consider win rate, strategy diversity, adversarial robustness).
   - In practical applications, reward functions may have "reward hacking" problems: agents find shortcuts to obtain high rewards but don't actually complete tasks. Please give examples of this phenomenon and design defense mechanisms to avoid reward hacking.

4. In the "Mathematical Reasoning Agent Training" case in Section 11.4, we saw the complete training pipeline. Please analyze in depth:

   - The case used the GSM8K dataset for training and evaluation. Please analyze: What are the characteristics of this dataset? What type of reasoning ability is it suitable for training? If training an agent capable of handling more complex mathematical problems (such as advanced mathematics, mathematical proofs), how should the dataset and training methods be extended?
   - In the training results in Section 11.4.3, we observed accuracy improvement on the training set, but there may be overfitting risks. Please design a "generalization ability assessment" plan: How to test whether the model truly learned mathematical reasoning rather than memorizing training data? How to improve generalization ability through regularization, data augmentation and other techniques?
   - The training in the case is offline (using pre-collected datasets). Please design an "online learning" plan: agents continuously collect user feedback during actual use and automatically update the model. What technical challenges need to be considered in this plan (such as data quality control, catastrophic forgetting, safety assurance)?

5. An important application of Agentic RL is enabling agents to learn tool use. Please think:

   - Section 11.1.3 mentioned that Agentic RL is suitable for optimizing tasks "requiring multi-step reasoning, tool use, long-term planning". Please design a "tool learning" training plan: Given a set of tools (such as search engine, calculator, code executor), how to train agents to learn to choose appropriate tools at appropriate times? How should the reward function be designed?
   - Tool use often involves complex dependencies (such as "must first call tool A to obtain information before calling tool B"). Please design a "hierarchical reinforcement learning" plan: high-level policy responsible for task planning, low-level policy responsible for tool invocation. How to train this hierarchical structure? How to coordinate optimization objectives of high and low levels?
   - In practical applications, the number of tools may be very large (such as 50+ APIs), and direct training may face "low exploration efficiency" problems. Please design a "curriculum learning" plan: start training from simple tasks (using few tools), gradually increasing task difficulty and number of tools. How should this plan design curriculum sequence? How to assess whether agents are ready to enter the next stage?
