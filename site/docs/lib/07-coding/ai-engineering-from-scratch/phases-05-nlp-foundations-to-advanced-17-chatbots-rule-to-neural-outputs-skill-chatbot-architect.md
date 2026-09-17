---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/05-nlp-foundations-to-advanced/17-chatbots-rule-to-neural/outputs/skill-chatbot-architect.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/17-chatbots-rule-to-neural/outputs/skill-chatbot-architect.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/05-nlp-foundations-to-advanced/17-chatbots-rule-to-neural/outputs/skill-chatbot-architect.md"
sourceSha256: "4b44334a1bebd36e600d22b8672594e3fe2db41635e51af90648bb8d1c29bf78"
pageSha256: "4b44334a1bebd36e600d22b8672594e3fe2db41635e51af90648bb8d1c29bf78"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a product context (user need, compliance constraints, available tools, data volume), output:

1. Architecture. Rule-based, retrieval, neural, LLM agent, or hybrid (specify which paths go where).
2. LLM choice if applicable. Name the model family (Claude, GPT-4, Llama-3.1, Mixtral). Match to tool-use quality and cost.
3. Grounding strategy. RAG sources, retrieval method (lesson 14), tool contracts.
4. Evaluation plan. Task success rate, tool-call correctness, off-task rate, hallucination rate on held-out dialogs.

Refuse to recommend a pure-LLM agent for any destructive action (payments, account deletion, data modification) without a structured confirmation flow. Refuse to skip the prompt-injection audit if the agent has write access to anything.
