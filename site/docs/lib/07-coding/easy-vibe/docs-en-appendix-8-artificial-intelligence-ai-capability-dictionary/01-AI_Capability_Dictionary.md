---
title: "AI Capability Dictionary"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/appendix/8-artificial-intelligence/ai-capability-dictionary.md"
sourceRel: "docs/en/appendix/8-artificial-intelligence/ai-capability-dictionary.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/en/appendix/8-artificial-intelligence/ai-capability-dictionary.md"
sourceSha256: "8b28635d8c875b0d8274bbd6d37612df24af946f7fd4381c48a6a4285fbd26d7"
pageSha256: "00db18737146edeb7a62092aebdc928bcbaf13be9de5ab315b77f74ec3da1587"
contentMode: "local-full"
zh: ""
---

# AI Capability Dictionary
As generative AI technologies become widely adopted across various products and business scenarios, an increasingly practical question confronts each of us: **What AI capabilities are actually available?** And for a specific requirement, **which capability, which type of model, or which product should be chosen to implement it?**

Faced with this confusion, the most intuitive approach might be "cramming at the last minute": **search for cloud service providers' product APIs or corresponding models when a need arises, then look up commercial solutions, compare documentation and demos, and proceed**. When you see an image-related requirement, you think of image generation; when you encounter a text task, you pull in a large model; when it involves voice interaction, you recall ASR and TTS — and then shop around among a sea of APIs and services. However, cobbling together scattered products is fundamentally different from systematically planning, selecting, and combining AI capabilities in enterprise-level scenarios. Relying solely on ad-hoc research and experience-based judgment leads to a series of serious challenges: fragmented capability awareness, arbitrary solution design, and difficulty in reusing capabilities.

To address these pain points, this article is organized around the core idea of an "AI Capability Panorama." In this handbook, our goal is not to pile up jargon, but to help you quickly figure out three things: **"What AI capability can handle this task? Which type of model or product should I roughly choose? What keywords should I use next to find APIs, projects, or services to try out?"** Through a systematic review spanning modalities (text, image, audio, video, 3D, multimodal) and architecture layers (models, retrieval, agents, platform engineering), **we can identify the corresponding AI capabilities, representative models/products, and common real-world business use cases for each typical requirement and scenario**, helping teams build AI systems with lower trial-and-error costs, higher decision-making efficiency, and stronger reusability.

In this handbook, we will systematically introduce the current mainstream AI capability landscape — from single modalities to multimodal fusion, from individual models to the overall framework of platforms and engineering — combined with common product forms and application scenarios, to provide practice-oriented capability selection references.

> Due to **the extensive content**, you may consult the handbook when you encounter scenarios in practice where you're unsure how to select capabilities. It is recommended that you **let AI reference this handbook based on specific application directions and provide suggested model selection recommendations and solution API calling advice.**

If you only want to understand the corresponding categories without reading the detailed content, just read the opening paragraph of each major section, such as 1.1 and 1.2, but you don't need to read 1.1.1 or 1.1.2.

**It is recommended to consult only the relevant parts of this handbook when needed or to browse only the first-level table of contents; if interested, then browse the full text.**

**Future updates will include recommended model API service addresses in each section.**
