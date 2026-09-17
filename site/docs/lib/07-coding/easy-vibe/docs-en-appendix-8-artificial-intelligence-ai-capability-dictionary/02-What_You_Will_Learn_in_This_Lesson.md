---
title: "What You Will Learn in This Lesson"
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
pageSha256: "41769965f4eb45ebb27eadb62c1be67333c39ab6f46831c4b561e4d60b6c0e87"
contentMode: "local-full"
zh: ""
---

# What You Will Learn in This Lesson

- AI Capability Panorama: A comprehensive approach to organizing capabilities spanning text, image, audio, video, 3D, multimodal, agents, RAG, security, and platform engineering
- Models and Products Corresponding to Each Capability: Understand the representative models and services behind key capabilities such as Embedding, OCR, ASR, TTS, VLM, RAG, and more
- Capability-to-Scenario Mapping Methods: Master how to transform a "capability checklist" into specific applications such as product content, search and Q&A, intelligent customer service, and automated operations

After completing this handbook, you will establish an introductory-level systematic understanding of mainstream AI capabilities — not only knowing "what capabilities are available on the market and which products are commonly paired with them," but also understanding their positions and interrelationships within the overall architecture. You will know how to quickly identify the required capabilities and make informed selections when facing specific business requirements, laying a solid foundation for building AI capability systems.

## Model Parameters Covered in This Handbook

Before diving into the specific capability map, let's clarify a concept that is frequently mentioned yet somewhat abstract: What exactly counts as a large model? What counts as a small model?

**From an academic perspective**, large models typically refer to general-purpose models with parameter counts in the billions, tens of billions, or even trillions, while small models are specialized models tailored for specific tasks or scenarios with smaller parameter counts (tens of millions to hundreds of millions).

**From a pricing perspective**, if a model's API call is very cheap — for instance, costing a few cents or fractions of a cent per call, or only a few cents per thousand tokens — and there is no particular emphasis on it being a general-purpose large model, then it is typically either a classic small model (e.g., models specifically designed for OCR, ASR, image classification, or content moderation) or a lightweight version of a large model with fewer parameters (compressed or distilled specifically for high concurrency and low cost). If the per-call price is notably higher — say, several dimes or even starting at 1 RMB per call — then it is most likely a large model.

Additionally, if the product copy explicitly emphasizes the use of large language models (LLMs), general-purpose large models, multimodal large models, or mentions completing complex tasks end-to-end from input to output (such as end-to-end conversational bots, end-to-end retrieval Q&A, end-to-end video generation), then it can generally be regarded as a large model.

Conversely, if the promotional focus is on a specific vertical capability — such as bank card recognition, invoice recognition, license plate recognition, ad click-through rate prediction, speech transcription, or content safety moderation — this indicates that the underlying product is more likely one or a group of small models.

Therefore, in the narrative that follows in this article, we can make a pragmatic convention:

- Large models refer more to that category of general-purpose, conversational, programmable models that tend to be slightly more expensive (including their multimodal versions, such as GPT-4o, Gemini 1.5 Pro, Claude 3.5 Sonnet, etc.), which can cover most general-purpose text, code, as well as image, audio, and video multimodal tasks;
- Small models refer to those fine-tuned or customized for a specific task, typically cheaper, with more stable and controllable performance, but with a narrower scope of application, requiring you to actively combine and orchestrate them within your system.

It's worth supplementing here with a key industry shift: many of the model capabilities mentioned in this handbook were actually handled by "small models" before 2021 — training dedicated models for specific scenarios and specific data to meet precise needs. **Today, however, the vast majority of general-purpose scenarios and tasks can already be solved by directly calling large models.**

From the perspective of pursuing the ultimate in **precision and cost**, the training and application of small models still hold irreplaceable value; but **for beginners, we can absolutely start by learning how to find and call large model APIs**, then gradually delve into more advanced techniques. You only need to weigh the trade-offs between cost, precision, and latency, then decide where to use general-purpose large models and where to retain or introduce dedicated small models.

> **Getting to know common text and multimodal general-purpose large models through some familiar products:**
>
> - OpenAI series: GPT-4, GPT-4.1, GPT-4o, GPT-5.1, etc.
> - Google series: Gemini 1.5 Pro, Gemini 1.5 Flash, etc.
> - Anthropic series: Claude 3.5 Sonnet, Claude 3.5 Haiku, etc.
> - Domestic models: Tongyi Qianwen (Qwen) series, Wenxin Yiyan (ERNIE Bot) series, GLM/Zhipu Qingyan, Tencent Hunyuan, iFlytek Spark, the large model behind Moonshot AI's Kimi, MiniMax MiniMax-M2.7 series, etc.
>
> Large models and services more oriented toward vision and video include:
>
> - Image generation: DALL·E, Midjourney, Stable Diffusion, SDXL, Flux, etc.
> - Multimodal visual understanding: GPT-4o, GPT-4.1 with Vision, Gemini 1.5 (image-text multimodal), Claude 3.5 Sonnet Vision, LLaVA, etc.
> - Video generation: Sora, Kling, Runway Gen-2, Pika, Luma, Veo, etc.
>
> Large models in the voice and audio direction include:
>
> - Speech recognition ASR: Whisper series (Whisper, Whisper-large-v3, etc.), Deepgram, end-to-end ASR large models from various cloud vendors (such as iFlytek, Baidu, Volcano Engine, Alibaba, etc.)
> - Voice multimodal and voice conversation: GPT-4o (end-to-end voice conversation), OpenAI Realtime, Gemini 1.5's audio understanding capability, etc.
> - TTS / Audio and music generation: OpenAI TTS, ElevenLabs, Suno, Udio, MusicGen, etc.
>
> Generation and understanding models in the 3D / spatial direction include:
>
> - Text-to-3D and image-to-3D: DreamFusion, Shap-E, GET3D, Zero-1-to-3, TripoSR, etc.
> - NeRF / neural rendering family: Instant-NGP, NeRF series, Gaussian Splatting-related models, etc.
