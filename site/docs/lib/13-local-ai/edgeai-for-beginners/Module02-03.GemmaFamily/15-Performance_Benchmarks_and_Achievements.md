---
title: "EdgeAI for Beginners"
sourceId: "13-local-ai/edgeai-for-beginners"
sourceTitle: "EdgeAI for Beginners"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "13-local-ai"
sourceUrl: "https://github.com/microsoft/edgeai-for-beginners"
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module02/03.GemmaFamily.md"
sourceRel: "Module02/03.GemmaFamily.md"
rawUrl: "/raw/13-local-ai/edgeai-for-beginners/Module02/03.GemmaFamily.md"
sourceSha256: "a3bf4d27c85249d63d641ae400ed1815a0866c0bc33a21b849cda45ec2ca07a2"
pageSha256: "32cb92a6610d6f443220be5bc5ea0cc4f4cd5a40721120aaafedb1ca8b69b45b"
contentMode: "local-full"
zh: ""
---

## Performance Benchmarks and Achievements

The Gemma model family has achieved remarkable performance across various benchmarks while maintaining open-source accessibility and efficient deployment characteristics:

### Key Performance Highlights

**Multimodal Excellence:**
- Gemma 3 delivers powerful capabilities for developers with advanced text and visual reasoning capabilities, supporting image and text input for multimodal understanding
- Gemma 3n ranks highly amongst both popular proprietary and open models in Chatbot Arena Elo scores, indicating strong user preference

**Efficiency Achievements:**
- Gemma 3 models can handle prompt inputs up to 128K tokens, a 16x larger context window than previous Gemma models
- Gemma 3n leverages Per-Layer Embeddings (PLE) that delivers a significant reduction in RAM usage while maintaining larger model capabilities

**Mobile Optimization:**
- Gemma 3n E2B operates with as little as 2GB memory while E4B requires only 3GB, despite having raw parameter counts of 5B and 8B respectively
- Real-time AI capabilities directly on mobile devices with privacy-first, offline-ready operation

**Training Scale:**
- Gemma 3 was trained on 2T tokens for 1B, 4T for 4B, 12T for 12B, and 14T tokens for 27B models using Google TPUs and the JAX Framework

### Model Comparison Matrix

| Model Series | Parameters Range | Context Length | Key Strengths | Best Use Cases |
|--------------|------------------|----------------|---------------|----------------|
| **Gemma 3** | 1B-27B | 128K | Multimodal understanding, function calling | General applications, vision-language tasks |
| **Gemma 3n** | E2B (5B), E4B (8B) | Variable | Mobile optimization, audio processing | Mobile apps, edge computing, real-time AI |
| **Gemma 2.5** | 0.5B-72B | 32K-128K | Balanced performance, multilingual | Production deployment, existing workflows |
| **Gemma-VL** | Various | Variable | Vision-language specialization | Image analysis, visual question answering |
