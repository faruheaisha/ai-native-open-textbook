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
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/README.md"
zh: ""
---

# Chapter 07 : EdgeAI Samples

Edge AI represents the convergence of artificial intelligence with edge computing, enabling intelligent processing directly on devices without relying on cloud connectivity. This chapter explores five distinct EdgeAI implementations across different platforms and frameworks, showcasing the versatility and power of running AI models at the edge.

## 1. EdgeAI in NVIDIA Jetson Orin Nano

The NVIDIA Jetson Orin Nano represents a breakthrough in accessible edge AI computing, delivering up to 67 TOPS of AI performance in a compact, credit-card-sized form factor. This powerful edge AI platform democratizes generative AI development for hobbyists, students, and professional developers alike.

### Key Features
- Delivers up to 67 TOPS of AI performance—a 1.7X improvement over its predecessor
- 1024 CUDA cores and up to 32 Tensor Cores for AI processing
- 6-core Arm Cortex-A78AE v8.2 64-bit CPU with maximum frequency of 1.5 GHz
- Priced at just $249, providing developers, students, and makers with the most affordable and accessible platform

### Applications
The Jetson Orin Nano excels at running modern generative AI models including vision transformers, large language models, and vision-language models. It's specifically designed for GenAI use cases and now you can run several LLMs on a palm device. Popular use cases include AI-powered robotics, smart drones, intelligent cameras, and autonomous edge devices.

**Learn More**: [NVIDIA's Jetson Orin Nano SuperComputer: The Next Big Thing in EdgeAI](https://medium.com/data-science-in-your-pocket/nvidias-jetson-orin-nano-supercomputer-the-next-big-thing-in-edgeai-e9eff687ae62)

## 2. EdgeAI in Mobile Applications with .NET MAUI and ONNX Runtime GenAI

This solution demonstrates how to integrate Generative AI and Large Language Models (LLMs) into cross-platform mobile applications using .NET MAUI (Multi-platform App UI) and ONNX Runtime GenAI. This approach enables .NET developers to build sophisticated AI-powered mobile applications that run natively on Android and iOS devices.

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

## 3. EdgeAI in Azure with Small Language Models Engine

Microsoft's Azure-based EdgeAI solution focuses on deploying Small Language Models (SLMs) efficiently in cloud-edge hybrid environments. This approach bridges the gap between cloud-scale AI services and edge deployment requirements.

### Architecture Advantages
- Seamless integration with Azure AI services
- Run SLMs/LLMs and multi-modal models on-device and in the cloud with ONNX Runtime
- Optimized for enterprise-scale deployment
- Support for continuous model updates and management

### Use Cases
The Azure EdgeAI implementation excels in scenarios requiring enterprise-grade AI deployment with cloud management capabilities. This includes intelligent document processing, real-time analytics, and hybrid AI workflows that leverage both cloud and edge computing resources.

**Learn More**: [Azure EdgeAI SLM Engine](https://github.com/microsoft/onnxruntime-genai/tree/main/examples/slm_engine)

## [4. EdgeAI with Windows ML](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module07/windowdeveloper.md)

Windows ML represents Microsoft's cutting-edge runtime optimized for performant on-device model inference and simplified deployment, serving as the foundation of Windows AI Foundry. This platform enables developers to create AI-powered Windows applications that leverage the full spectrum of PC hardware.

### Platform Capabilities
- Works on all Windows 11 PCs running version 24H2 (build 26100) or greater
- Works on all x64 and ARM64 PC hardware, even PCs that don't have NPUs or GPUs
- Enables developers to bring their own models and deploy them efficiently across the silicon partner ecosystem including AMD, Intel, NVIDIA and Qualcomm spanning CPU, GPU, NPU
- Leveraging infrastructure APIs, developers no longer need to create multiple builds of their app to target different silicon

### Developer Benefits
Windows ML abstracts the hardware and execution providers, so you can focus on writing your code. Plus, Windows ML automatically updates to support the latest NPUs, GPUs, and CPUs as they are released. The platform provides a unified framework for AI development across the diverse Windows hardware ecosystem.

**Learn More**: 
- [Windows ML Overview](https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/overview)
- [Windows EdgeAI Development Guide](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module07/windowdeveloper.md) - Comprehensive guide for Windows Edge AI development

## [5. EdgeAI with Foundry Local Applications](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module07/foundrylocal.md)

Foundry Local enables Windows and Mac developers to build Retrieval Augmented Generation (RAG) applications using local resources in .NET, combining local language models with semantic search capabilities. This approach provides privacy-focused AI solutions that operate entirely on local infrastructure.

### Technical Architecture
- Combines the Phi language model, Local Embeddings, and Semantic Kernel to create a RAG scenario
- Uses embeddings as vectors (arrays) of floating-point values that represent content and its semantic meaning
- Semantic Kernel acts as the main orchestrator, integrating Phi and Smart Components to create a seamless RAG pipeline
- Support for local vector databases including SQLite and Qdrant

### Implementation Benefits
RAG, or Retrieval Augmented Generation, is just a fancy way of saying "look up some stuff and put it into the prompt". This local implementation ensures data privacy while providing intelligent responses grounded in custom knowledge bases. The approach is particularly valuable for enterprise scenarios requiring data sovereignty and offline operation capabilities.

**Learn More**: 
- [Foundry Local](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module07/foundrylocal.md)
- [Foundry Local RAG Samples](https://github.com/microsoft/Foundry-Local/tree/main/samples/dotNET/rag)

### Windows Foundry Local

Microsoft Foundry Local provides an OpenAI‑compatible REST server powered by ONNX Runtime for running models locally on Windows. Below is a quick, validated summary; see official docs for full details.

- Get started: https://learn.microsoft.com/azure/ai-foundry/foundry-local/get-started
- Architecture: https://learn.microsoft.com/azure/ai-foundry/foundry-local/concepts/foundry-local-architecture
- CLI reference: https://learn.microsoft.com/azure/ai-foundry/foundry-local/reference/reference-cli
- Full Windows guide in this repo: [foundrylocal.md](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module07/foundrylocal.md)

Install or upgrade on Windows (cmd.exe):
```cmd
winget install Microsoft.FoundryLocal
winget upgrade --id Microsoft.FoundryLocal
foundry --version
```

Explore CLI categories:
```cmd
foundry model --help
foundry service --help
foundry cache --help
```

Run a model and discover the dynamic endpoint:
```cmd
foundry model run gpt-oss-20b
foundry service status
```

Quick REST check to list models (replace PORT from status):
```cmd
curl -s http://localhost:PORT/v1/models
```

Tips:
- SDK integration: https://learn.microsoft.com/azure/ai-foundry/foundry-local/how-to/how-to-integrate-with-inference-sdks
- Bring your own model (compile): https://learn.microsoft.com/azure/ai-foundry/foundry-local/how-to/how-to-compile-hugging-face-models

## Windows EdgeAI Development Resources

For developers specifically targeting the Windows platform, we've created a comprehensive guide that covers the complete Windows EdgeAI ecosystem. This resource provides detailed information about Windows AI Foundry, including APIs, tools, and best practices for EdgeAI development on Windows.

### Windows AI Foundry Platform
The Windows AI Foundry platform provides a comprehensive suite of tools and APIs specifically designed for Edge AI development on Windows devices. This includes specialized support for NPU-accelerated hardware, Windows ML integration, and platform-specific optimization techniques.

**Comprehensive Guide**: [Windows EdgeAI Development Guide](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/windowdeveloper.md)

This guide covers:
- Windows AI Foundry platform overview and components
- Phi Silica API for efficient inference on NPU hardware
- Computer Vision APIs for image processing and OCR
- Windows ML runtime integration and optimization
- Foundry Local CLI for local development and testing
- Hardware optimization strategies for Windows devices
- Practical implementation examples and best practices

### [AI Toolkit for Edge AI Development](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module07/aitoolkit.md)
For developers using Visual Studio Code, the AI Toolkit extension provides a comprehensive development environment specifically designed for building, testing, and deploying Edge AI applications. This toolkit streamlines the entire Edge AI development workflow within VS Code.

**Development Guide**: [AI Toolkit for Edge AI Development](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module07/aitoolkit.md)

The AI Toolkit guide covers:
- Model discovery and selection for edge deployment
- Local testing and optimization workflows
- ONNX and Ollama integration for edge models
- Model conversion and quantization techniques
- Agent development for edge scenarios
- Performance evaluation and monitoring
- Deployment preparation and best practices

## Conclusion

These five EdgeAI implementations demonstrate the maturity and diversity of edge AI solutions available today. From hardware-accelerated edge devices like the Jetson Orin Nano to software frameworks like ONNX Runtime GenAI and Windows ML, developers have unprecedented options for deploying intelligent applications at the edge. 

The common thread across all these platforms is the democratization of AI capabilities, making sophisticated machine learning accessible to developers across different skill levels and use cases. Whether building mobile applications, desktop software, or embedded systems, these EdgeAI solutions provide the foundation for the next generation of intelligent applications that operate efficiently and privately at the edge.

Each platform offers unique advantages: Jetson Orin Nano for hardware-accelerated edge computing, ONNX Runtime GenAI for cross-platform mobile development, Azure EdgeAI for enterprise cloud-edge integration, Windows ML for Windows-native applications, and Foundry Local for privacy-focused RAG implementations. Together, they represent a comprehensive ecosystem for EdgeAI development.

[Next AI Toolkit](https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module07/aitoolkit.md)
