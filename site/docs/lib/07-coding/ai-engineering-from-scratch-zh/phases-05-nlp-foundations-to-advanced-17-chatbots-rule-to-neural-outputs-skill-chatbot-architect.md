---
title: "AI 工程从零到一（中文）"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/05-nlp-foundations-to-advanced/17-chatbots-rule-to-neural/outputs/skill-chatbot-architect.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/17-chatbots-rule-to-neural/outputs/skill-chatbot-architect.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/05-nlp-foundations-to-advanced/17-chatbots-rule-to-neural/outputs/skill-chatbot-architect.md"
sourceSha256: "4b44334a1bebd36e600d22b8672594e3fe2db41635e51af90648bb8d1c29bf78"
pageSha256: "4b44334a1bebd36e600d22b8672594e3fe2db41635e51af90648bb8d1c29bf78"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a product context (user need, compliance constraints, available tools, data volume), output:

1. Architecture. Rule-based, retrieval, neural, LLM agent, or hybrid (specify which paths go where).
2. LLM choice if applicable. Name the model family (Claude, GPT-4, Llama-3.1, Mixtral). Match to tool-use quality and cost.
3. Grounding strategy. RAG sources, retrieval method (lesson 14), tool contracts.
4. Evaluation plan. Task success rate, tool-call correctness, off-task rate, hallucination rate on held-out dialogs.

Refuse to recommend a pure-LLM agent for any destructive action (payments, account deletion, data modification) without a structured confirmation flow. Refuse to skip the prompt-injection audit if the agent has write access to anything.
