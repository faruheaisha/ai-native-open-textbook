---
title: "Chapter 07 : EdgeAI Samples"
sourceId: "13-local-ai/edgeai-for-beginners"
sourceTitle: "EdgeAI for Beginners"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "13-local-ai"
sourceUrl: "https://github.com/microsoft/edgeai-for-beginners"
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module07/README.md"
sourceRel: "Module07/README.md"
rawUrl: "/raw/13-local-ai/edgeai-for-beginners/Module07/README.md"
sourceSha256: "aa28df16f814313255bb723655fd3c2bea54dade0757451da6945e0f43531c40"
pageSha256: "aa28df16f814313255bb723655fd3c2bea54dade0757451da6945e0f43531c40"
contentMode: "local-full"
zh: "on"
---

# Chapter 07 : EdgeAI Samples

Edge AI represents the convergence of artificial intelligence with edge computing, enabling intelligent processing directly on devices without relying on cloud connectivity. This chapter explores five distinct EdgeAI implementations across different platforms and frameworks, showcasing the versatility and power of running AI models at the edge.

<div class="tb-zh"><p>Edge AI 是人工智能与边缘计算的汇合，它让智能处理直接发生在设备上，而不依赖云端连接。本章探讨跨不同平台与框架的五种 EdgeAI 实现，展示在边缘运行 AI 模型的多样性与威力。</p></div>

## 1. EdgeAI in NVIDIA Jetson Orin Nano

The NVIDIA Jetson Orin Nano represents a breakthrough in accessible edge AI computing, delivering up to 67 TOPS of AI performance in a compact, credit-card-sized form factor. This powerful edge AI platform democratizes generative AI development for hobbyists, students, and professional developers alike.

<div class="tb-zh"><p>NVIDIA Jetson Orin Nano 是普及型边缘 AI 计算的一次突破：在信用卡大小的紧凑形态里提供最高 67 TOPS 的 AI 性能。这个强大的边缘 AI 平台让爱好者、学生和专业开发者都能平等地做生成式 AI 开发。</p></div>

### Key Features
- Delivers up to 67 TOPS of AI performance—a 1.7X improvement over its predecessor
- 1024 CUDA cores and up to 32 Tensor Cores for AI processing
- 6-core Arm Cortex-A78AE v8.2 64-bit CPU with maximum frequency of 1.5 GHz
- Priced at just $249, providing developers, students, and makers with the most affordable and accessible platform

### Applications
The Jetson Orin Nano excels at running modern generative AI models including vision transformers, large language models, and vision-language models. It's specifically designed for GenAI use cases and now you can run several LLMs on a palm device. Popular use cases include AI-powered robotics, smart drones, intelligent cameras, and autonomous edge devices.

**Learn More**: [NVIDIA's Jetson Orin Nano SuperComputer: The Next Big Thing in EdgeAI](https://medium.com/data-science-in-your-pocket/nvidias-jetson-orin-nano-supercomputer-the-next-big-thing-in-edgeai-e9eff687ae62)

<div class="tb-zh"><p>延伸阅读：NVIDIA 的 Jetson Orin Nano 超级计算机：EdgeAI 的下一个大事件。</p></div>

## 2. EdgeAI in Mobile Applications with .NET MAUI and ONNX Runtime GenAI

This solution demonstrates how to integrate Generative AI and Large Language Models (LLMs) into cross-platform mobile applications using .NET MAUI (Multi-platform App UI) and ONNX Runtime GenAI. This approach enables .NET developers to build sophisticated AI-powered mobile applications that run natively on Android and iOS devices.

<div class="tb-zh"><p>这个方案展示如何用 .NET MAUI（多平台应用 UI）和 ONNX Runtime GenAI，把生成式 AI 与大语言模型（LLM）集成进跨平台移动应用。这条路径让 .NET 开发者能构建在 Android 和 iOS 设备上原生运行的高级 AI 移动应用。</p></div>

### Key Features
- Built on .NET MAUI framework, providing a single codebase for both Android and iOS applications
- ONNX Runtime GenAI integration enables running generative AI models directly on mobile devices
- Supports various hardware accelerators tailored for mobile devices, including CPU, GPU, and specialized mobile AI processors
- Platform-specific optimizations like CoreML for iOS and NNAPI for Android through ONNX Runtime
- Implements the complete generative AI loop including pre and post processing, inference, logits processing, search and sampling, and KV cache management

### Development Benefits
The .NET MAUI approach allows developers to leverage their existing C# and .NET skills while building cross-platform AI applications. The ONNX Runtime GenAI framework supports multiple model architectures including Llama, Mistral, Phi, Gemma, and many others. Optimized ARM64 kernels accelerate INT4 quantized matrix multiplication, ensuring efficient performance on mobile hardware while maintaining the familiar .NET development experience.

### Use Cases
This solution is ideal for developers who want to build AI-powered mobile applications using .NET technologies, including intelligent chatbots, image recognition apps, language translation tools, and personalized recommendation systems that run entirely on-device for enhanced privacy and offline capability.

**Learn More**: [.NET MAUI ONNX Runtime GenAI Example](https://github.com/microsoft/onnxruntime-genai/tree/jialli/genny-maui/examples/csharp/GennyMaui)

<div class="tb-zh"><p>延伸阅读：.NET MAUI ONNX Runtime GenAI 示例。</p></div>

## 3. EdgeAI in Azure with Small Language Models Engine

Microsoft's Azure-based EdgeAI solution focuses on deploying Small Language Models (SLMs) efficiently in cloud-edge hybrid environments. This approach bridges the gap between cloud-scale AI services and edge deployment requirements.

<div class="tb-zh"><p>微软基于 Azure 的 EdgeAI 方案，聚焦在云边混合环境中高效部署小语言模型（SLM）。这条路径弥合了云端规模 AI 服务与边缘部署需求之间的差距。</p></div>

### Architecture Advantages
- Seamless integration with Azure AI services
- Run SLMs/LLMs and multi-modal models on-device and in the cloud with ONNX Runtime
- Optimized for enterprise-scale deployment
- Support for continuous model updates and management

### Use Cases
The Azure EdgeAI implementation excels in scenarios requiring enterprise-grade AI deployment with cloud management capabilities. This includes intelligent document processing, real-time analytics, and hybrid AI workflows that leverage both cloud and edge computing resources.

**Learn More**: [Azure EdgeAI SLM Engine](https://github.com/microsoft/onnxruntime-genai/tree/main/examples/slm_engine)

<div class="tb-zh"><p>延伸阅读：Azure EdgeAI SLM Engine。</p></div>

## [4. EdgeAI with Windows ML](/lib/13-local-ai/edgeai-for-beginners/Module07-windowdeveloper)

Windows ML represents Microsoft's cutting-edge runtime optimized for performant on-device model inference and simplified deployment, serving as the foundation of Windows AI Foundry. This platform enables developers to create AI-powered Windows applications that leverage the full spectrum of PC hardware.

<div class="tb-zh"><p>Windows ML 是微软为高性能端侧模型推理与简化部署而优化的前沿运行时，也是 Windows AI Foundry 的基础。这个平台让开发者能构建充分利用 PC 各类硬件的 AI 应用。</p></div>

### Platform Capabilities
- Works on all Windows 11 PCs running version 24H2 (build 26100) or greater
- Works on all x64 and ARM64 PC hardware, even PCs that don't have NPUs or GPUs
- Enables developers to bring their own models and deploy them efficiently across the silicon partner ecosystem including AMD, Intel, NVIDIA and Qualcomm spanning CPU, GPU, NPU
- Leveraging infrastructure APIs, developers no longer need to create multiple builds of their app to target different silicon

### Developer Benefits
Windows ML abstracts the hardware and execution providers, so you can focus on writing your code. Plus, Windows ML automatically updates to support the latest NPUs, GPUs, and CPUs as they are released. The platform provides a unified framework for AI development across the diverse Windows hardware ecosystem.

**Learn More**: 
- [Windows ML Overview](https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/overview)
- [Windows EdgeAI Development Guide](/lib/13-local-ai/edgeai-for-beginners/Module07-windowdeveloper) - Comprehensive guide for Windows Edge AI development

<div class="tb-zh"><p>延伸阅读：Windows ML 概览；Windows EdgeAI 开发指南——面向 Windows 边缘 AI 开发的综合指南。</p></div>

## [5. EdgeAI with Foundry Local Applications](/lib/13-local-ai/edgeai-for-beginners/Module07-foundrylocal)

Foundry Local enables Windows and Mac developers to build Retrieval Augmented Generation (RAG) applications using local resources in .NET, combining local language models with semantic search capabilities. This approach provides privacy-focused AI solutions that operate entirely on local infrastructure.

<div class="tb-zh"><p>Foundry Local 让 Windows 和 Mac 开发者能在 .NET 中用本地资源构建 RAG（检索增强生成）应用，把本地语言模型与语义搜索能力结合起来。这条路径提供完全运行在本地基础设施上的隐私优先 AI 方案。</p></div>

### Technical Architecture
- Combines the Phi language model, Local Embeddings, and Semantic Kernel to create a RAG scenario
- Uses embeddings as vectors (arrays) of floating-point values that represent content and its semantic meaning
- Semantic Kernel acts as the main orchestrator, integrating Phi and Smart Components to create a seamless RAG pipeline
- Support for local vector databases including SQLite and Qdrant

### Implementation Benefits
RAG, or Retrieval Augmented Generation, is just a fancy way of saying "look up some stuff and put it into the prompt". This local implementation ensures data privacy while providing intelligent responses grounded in custom knowledge bases. The approach is particularly valuable for enterprise scenarios requiring data sovereignty and offline operation capabilities.

**Learn More**: 
- [Foundry Local](/lib/13-local-ai/edgeai-for-beginners/Module07-foundrylocal)
- [Foundry Local RAG Samples](https://github.com/microsoft/Foundry-Local/tree/main/samples/dotNET/rag)

<div class="tb-zh"><p>延伸阅读：Foundry Local；Foundry Local RAG 示例。</p></div>

### Windows Foundry Local

Microsoft Foundry Local provides an OpenAI‑compatible REST server powered by ONNX Runtime for running models locally on Windows. Below is a quick, validated summary; see official docs for full details.

<div class="tb-zh"><p>微软 Foundry Local 提供一个与 OpenAI 兼容的 REST 服务器，由 ONNX Runtime 驱动，用于在 Windows 上本地运行模型。下面是经过验证的速览摘要；完整细节请看官方文档。</p></div>

- Get started: https://learn.microsoft.com/azure/ai-foundry/foundry-local/get-started
- Architecture: https://learn.microsoft.com/azure/ai-foundry/foundry-local/concepts/foundry-local-architecture
- CLI reference: https://learn.microsoft.com/azure/ai-foundry/foundry-local/reference/reference-cli
- Full Windows guide in this repo: [foundrylocal.md](/lib/13-local-ai/edgeai-for-beginners/Module07-foundrylocal)

<div class="tb-zh"><p>入门文档：learn.microsoft.com/azure/ai-foundry/foundry-local/get-started；架构说明：同一路径下的 concepts/foundry-local-architecture；CLI 参考：reference/reference-cli；本仓库中的完整 Windows 指南：foundrylocal.md。</p></div>

Install or upgrade on Windows (cmd.exe):

<div class="tb-zh"><p>在 Windows 上安装或升级（cmd.exe）：</p></div>

```cmd
winget install Microsoft.FoundryLocal
winget upgrade --id Microsoft.FoundryLocal
foundry --version
```

Explore CLI categories:

<div class="tb-zh"><p>浏览 CLI 的各类命令：</p></div>

```cmd
foundry model --help
foundry service --help
foundry cache --help
```

Run a model and discover the dynamic endpoint:

<div class="tb-zh"><p>运行一个模型并找到动态端点：</p></div>

```cmd
foundry model run gpt-oss-20b
foundry service status
```

Quick REST check to list models (replace PORT from status):

<div class="tb-zh"><p>用一条 REST 请求快速列出模型（把 PORT 换成 status 中显示的端口）：</p></div>

```cmd
curl -s http://localhost:PORT/v1/models
```

Tips:
- SDK integration: https://learn.microsoft.com/azure/ai-foundry/foundry-local/how-to/how-to-integrate-with-inference-sdks
- Bring your own model (compile): https://learn.microsoft.com/azure/ai-foundry/foundry-local/how-to/how-to-compile-hugging-face-models

<div class="tb-zh"><p>提示：SDK 集成与自带模型（编译）的做法，见微软官方 Foundry Local 文档中的对应章节。</p></div>

## Windows EdgeAI Development Resources

For developers specifically targeting the Windows platform, we've created a comprehensive guide that covers the complete Windows EdgeAI ecosystem. This resource provides detailed information about Windows AI Foundry, including APIs, tools, and best practices for EdgeAI development on Windows.

<div class="tb-zh"><p>对专门面向 Windows 平台的开发者，我们准备了一份综合指南，覆盖完整的 Windows EdgeAI 生态。这份资料详细介绍了 Windows AI Foundry，包括在 Windows 上做 EdgeAI 开发所需的 API、工具与最佳实践。</p></div>

### Windows AI Foundry Platform
The Windows AI Foundry platform provides a comprehensive suite of tools and APIs specifically designed for Edge AI development on Windows devices. This includes specialized support for NPU-accelerated hardware, Windows ML integration, and platform-specific optimization techniques.

**Comprehensive Guide**: [Windows EdgeAI Development Guide](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/windowdeveloper.md)

<div class="tb-zh"><p>综合指南：Windows EdgeAI 开发指南。</p></div>

This guide covers:
- Windows AI Foundry platform overview and components
- Phi Silica API for efficient inference on NPU hardware
- Computer Vision APIs for image processing and OCR
- Windows ML runtime integration and optimization
- Foundry Local CLI for local development and testing
- Hardware optimization strategies for Windows devices
- Practical implementation examples and best practices

<div class="tb-zh"><p>这份指南涵盖：Windows AI Foundry 平台概览与组件；在 NPU 硬件上高效推理的 Phi Silica API；用于图像处理与 OCR 的计算机视觉 API；Windows ML 运行时的集成与优化；用于本地开发与测试的 Foundry Local CLI；面向 Windows 设备的硬件优化策略；实践实现示例与最佳实践。</p></div>

### [AI Toolkit for Edge AI Development](/lib/13-local-ai/edgeai-for-beginners/Module07-aitoolkit)
For developers using Visual Studio Code, the AI Toolkit extension provides a comprehensive development environment specifically designed for building, testing, and deploying Edge AI applications. This toolkit streamlines the entire Edge AI development workflow within VS Code.

**Development Guide**: [AI Toolkit for Edge AI Development](/lib/13-local-ai/edgeai-for-beginners/Module07-aitoolkit)

<div class="tb-zh"><p>开发指南：用于边缘 AI 开发的 AI Toolkit。</p></div>

The AI Toolkit guide covers:
- Model discovery and selection for edge deployment
- Local testing and optimization workflows
- ONNX and Ollama integration for edge models
- Model conversion and quantization techniques
- Agent development for edge scenarios
- Performance evaluation and monitoring
- Deployment preparation and best practices

<div class="tb-zh"><p>AI Toolkit 指南涵盖：面向边缘部署的模型发现与选型；本地测试与优化工作流；面向边缘模型的 ONNX 与 Ollama 集成；模型转换与量化技术；面向边缘场景的 agent 开发；性能评估与监控；部署准备与最佳实践。</p></div>

## Conclusion

These five EdgeAI implementations demonstrate the maturity and diversity of edge AI solutions available today. From hardware-accelerated edge devices like the Jetson Orin Nano to software frameworks like ONNX Runtime GenAI and Windows ML, developers have unprecedented options for deploying intelligent applications at the edge. 

<div class="tb-zh"><p>这五种 EdgeAI 实现展示了当今边缘 AI 方案的成熟度与多样性。从 Jetson Orin Nano 这类硬件加速的边缘设备，到 ONNX Runtime GenAI 和 Windows ML 这类软件框架，开发者在边缘部署智能应用时拥有前所未有的选择。</p></div>

The common thread across all these platforms is the democratization of AI capabilities, making sophisticated machine learning accessible to developers across different skill levels and use cases. Whether building mobile applications, desktop software, or embedded systems, these EdgeAI solutions provide the foundation for the next generation of intelligent applications that operate efficiently and privately at the edge.

<div class="tb-zh"><p>这些平台共同的线索是 AI 能力的民主化：让不同技能水平、不同用例的开发者都能用上复杂的机器学习。无论你是在构建移动应用、桌面软件还是嵌入式系统，这些 EdgeAI 方案都为下一代智能应用打下了基础——它们在边缘高效、私密地运行。</p></div>

Each platform offers unique advantages: Jetson Orin Nano for hardware-accelerated edge computing, ONNX Runtime GenAI for cross-platform mobile development, Azure EdgeAI for enterprise cloud-edge integration, Windows ML for Windows-native applications, and Foundry Local for privacy-focused RAG implementations. Together, they represent a comprehensive ecosystem for EdgeAI development.

<div class="tb-zh"><p>每个平台各有优势：Jetson Orin Nano 适合硬件加速的边缘计算，ONNX Runtime GenAI 适合跨平台移动开发，Azure EdgeAI 适合企业云边集成，Windows ML 适合 Windows 原生应用，Foundry Local 适合隐私优先的 RAG 实现。合在一起，它们构成了一个完整的 EdgeAI 开发生态。</p></div>

[Next AI Toolkit](/lib/13-local-ai/edgeai-for-beginners/Module07-aitoolkit)

<div class="tb-zh"><p>下一篇：AI Toolkit。</p></div>
