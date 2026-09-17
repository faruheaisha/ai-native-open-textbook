---
title: "AI Toolkit for Visual Studio Code - Edge AI Development Guide"
sourceId: "13-local-ai/edgeai-for-beginners"
sourceTitle: "EdgeAI for Beginners"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "13-local-ai"
sourceUrl: "https://github.com/microsoft/edgeai-for-beginners"
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module07/aitoolkit.md"
sourceRel: "Module07/aitoolkit.md"
rawUrl: "/raw/13-local-ai/edgeai-for-beginners/Module07/aitoolkit.md"
sourceSha256: "d5302025a8688f99a7061b45b0b6047912e496cb9e739b12337aea0c0322e428"
pageSha256: "d5302025a8688f99a7061b45b0b6047912e496cb9e739b12337aea0c0322e428"
contentMode: "local-full"
zh: ""
---

# AI Toolkit for Visual Studio Code - Edge AI Development Guide

## Introduction

Welcome to the comprehensive guide for using AI Toolkit for Visual Studio Code in Edge AI development. As artificial intelligence moves from centralized cloud computing to distributed edge devices, developers need powerful, integrated tools that can handle the unique challenges of edge deployment - from resource constraints to offline operation requirements.

AI Toolkit for Visual Studio Code bridges this gap by providing a complete development environment specifically designed for building, testing, and optimizing AI applications that run efficiently on edge devices. Whether you're developing for IoT sensors, mobile devices, embedded systems, or edge servers, this toolkit streamlines your entire development workflow within the familiar VS Code environment.

This guide will take you through the essential concepts, tools, and best practices for leveraging AI Toolkit in your Edge AI projects, from initial model selection to production deployment.

## Overview

AI Toolkit for Visual Studio Code is a powerful extension that streamlines agent development and AI application creation. The toolkit provides comprehensive capabilities for exploring, evaluating, and deploying AI models from a wide range of providers—including Anthropic, OpenAI, GitHub, Google—while supporting local model execution using ONNX and Ollama.

What sets AI Toolkit apart is its comprehensive approach to the entire AI development lifecycle. Unlike traditional AI development tools that focus on single aspects, AI Toolkit provides an integrated environment that covers model discovery, experimentation, agent development, evaluation, and deployment—all within the familiar VS Code environment.

The platform is specifically designed for rapid prototyping and production deployment, with features like prompt generation, quick starters, seamless MCP (Model Context Protocol) tool integrations, and extensive evaluation capabilities. For Edge AI development, this means you can efficiently develop, test, and optimize AI applications for edge deployment scenarios while maintaining the full development workflow within VS Code.

## Learning Objectives

By the end of this guide, you will be able to:

### Core Competencies
- **Install and configure** AI Toolkit for Visual Studio Code for Edge AI development workflows
- **Navigate and utilize** the AI Toolkit interface, including Model Catalog, Playground, and Agent Builder
- **Select and evaluate** AI models suitable for edge deployment based on performance and resource constraints
- **Convert and optimize** models using ONNX format and quantization techniques for edge devices

### Edge AI Development Skills
- **Design and implement** Edge AI applications using the integrated development environment
- **Perform model testing** in edge-like conditions using local inference and resource monitoring
- **Create and customize** AI agents optimized for edge deployment scenarios
- **Evaluate model performance** using metrics relevant to edge computing (latency, memory usage, accuracy)

### Optimization and Deployment
- **Apply quantization and pruning** techniques to reduce model size while maintaining acceptable performance
- **Optimize models** for specific edge hardware platforms including CPU, GPU, and NPU acceleration
- **Implement best practices** for edge AI development including resource management and fallback strategies
- **Prepare models and applications** for production deployment on edge devices

### Advanced Edge AI Concepts
- **Integrate with edge AI frameworks** including ONNX Runtime, Windows ML, and TensorFlow Lite
- **Implement multi-model architectures** and federated learning scenarios for edge environments
- **Troubleshoot common edge AI issues** including memory constraints, inference speed, and hardware compatibility
- **Design monitoring and logging** strategies for edge AI applications in production

### Practical Application
- **Build end-to-end Edge AI solutions** from model selection through deployment
- **Demonstrate proficiency** in edge-specific development workflows and optimization techniques
- **Apply learned concepts** to real-world edge AI use cases including IoT, mobile, and embedded applications
- **Evaluate and compare** different edge AI deployment strategies and their trade-offs

## Key Features for Edge AI Development

### 1. Model Catalog and Discovery
- **Multi-Provider Support**: Browse and access AI models from Anthropic, OpenAI, GitHub, Google, and other providers
- **Local Model Integration**: Simplified discovery of ONNX and Ollama models for edge deployment
- **GitHub Models**: Direct integration with GitHub's model hosting for streamlined access
- **Model Comparison**: Compare models side-by-side to find optimal balance for edge device constraints

### 2. Interactive Playground
- **Interactive Testing Environment**: Quick experimentation with model capabilities in a controlled environment
- **Multi-modal Support**: Test with images, text, and other inputs typical in edge scenarios
- **Real-time Experimentation**: Immediate feedback on model responses and performance
- **Parameter Optimization**: Fine-tune model parameters for edge deployment requirements

### 3. Prompt (Agent) Builder
- **Natural Language Generation**: Generate starter prompts using natural language descriptions
- **Iterative Refinement**: Improve prompts based on model responses and performance
- **Task Decomposition**: Break down complex tasks with prompt chaining and structured outputs
- **Variable Support**: Use variables in prompts for dynamic agent behavior
- **Production Code Generation**: Generate production-ready code for rapid app development

### 4. Bulk Run and Evaluation
- **Multi-Model Testing**: Execute multiple prompts across selected models simultaneously
- **Efficient Testing at Scale**: Test various inputs and configurations efficiently
- **Custom Test Cases**: Run agents with test cases to validate functionality
- **Performance Comparison**: Compare results across different models and configurations

### 5. Model Evaluation with Datasets
- **Standard Metrics**: Test AI models using built-in evaluators (F1 score, relevance, similarity, coherence)
- **Custom Evaluators**: Create your own evaluation metrics for specific use cases
- **Dataset Integration**: Test models against comprehensive datasets
- **Performance Measurement**: Quantify model performance for edge deployment decisions

### 6. Fine-tuning Capabilities
- **Model Customization**: Customize models for specific use cases and domains
- **Specialized Adaptation**: Adapt models to specialized domains and requirements
- **Edge Optimization**: Fine-tune models specifically for edge deployment constraints
- **Domain-Specific Training**: Create models tailored to specific edge use cases

### 7. MCP Tool Integration
- **External Tool Connectivity**: Connect agents to external tools through Model Context Protocol servers
- **Real-world Actions**: Enable agents to query databases, access APIs, or execute custom logic
- **Existing MCP Servers**: Use tools from command (stdio) or HTTP (server-sent event) protocols
- **Custom MCP Development**: Build and scaffold new MCP servers with testing in Agent Builder

### 8. Agent Development and Testing
- **Function Calling Support**: Enable agents to invoke external functions dynamically
- **Real-time Integration Testing**: Test integrations with real-time runs and tool use
- **Agent Versioning**: Version control for agents with comparison capabilities for evaluation results
- **Debugging and Tracing**: Local tracing and debugging capabilities for agent development

## Edge AI Development Workflow

### Phase 1: Model Discovery and Selection
1. **Explore Model Catalog**: Use the model catalog to find models suitable for edge deployment
2. **Compare Performance**: Evaluate models based on size, accuracy, and inference speed
3. **Test Locally**: Use Ollama or ONNX models to test locally before edge deployment
4. **Assess Resource Requirements**: Determine memory and computational needs for target edge devices

### Phase 2: Model Optimization
1. **Convert to ONNX**: Convert selected models to ONNX format for edge compatibility
2. **Apply Quantization**: Reduce model size through INT8 or INT4 quantization
3. **Hardware Optimization**: Optimize for target edge hardware (ARM, x86, specialized accelerators)
4. **Performance Validation**: Validate optimized models maintain acceptable accuracy

### Phase 3: Application Development
1. **Agent Design**: Use Agent Builder to create edge-optimized AI agents
2. **Prompt Engineering**: Develop prompts that work effectively with smaller edge models
3. **Integration Testing**: Test agents in simulated edge conditions
4. **Code Generation**: Generate production code optimized for edge deployment

### Phase 4: Evaluation and Testing
1. **Batch Evaluation**: Test multiple configurations to find optimal edge settings
2. **Performance Profiling**: Analyze inference speed, memory usage, and accuracy
3. **Edge Simulation**: Test in conditions similar to target edge deployment environment
4. **Stress Testing**: Evaluate performance under various load conditions

### Phase 5: Deployment Preparation
1. **Final Optimization**: Apply final optimizations based on testing results
2. **Deployment Packaging**: Package models and code for edge deployment
3. **Documentation**: Document deployment requirements and configuration
4. **Monitoring Setup**: Prepare monitoring and logging for edge deployment

## Target Audience for Edge AI Development

### Edge AI Developers
- Application developers building AI-powered edge devices and IoT solutions
- Embedded systems developers integrating AI capabilities into resource-constrained devices
- Mobile developers creating on-device AI applications for smartphones and tablets

### Edge AI Engineers
- AI engineers optimizing models for edge deployment and managing inference pipelines
- DevOps engineers deploying and managing AI models across distributed edge infrastructure
- Performance engineers optimizing AI workloads for edge hardware constraints

### Researchers and Educators
- AI researchers developing efficient models and algorithms for edge computing
- Educators teaching edge AI concepts and demonstrating optimization techniques
- Students learning about the challenges and solutions in edge AI deployment

## Edge AI Use Cases

### Smart IoT Devices
- **Real-time Image Recognition**: Deploy computer vision models on IoT cameras and sensors
- **Voice Processing**: Implement speech recognition and natural language processing on smart speakers
- **Predictive Maintenance**: Run anomaly detection models on industrial edge devices
- **Environmental Monitoring**: Deploy sensor data analysis models for environmental applications

### Mobile and Embedded Applications
- **On-device Translation**: Implement language translation models that work offline
- **Augmented Reality**: Deploy real-time object recognition and tracking for AR applications
- **Health Monitoring**: Run health analysis models on wearable devices and medical equipment
- **Autonomous Systems**: Implement decision-making models for drones, robots, and vehicles

### Edge Computing Infrastructure
- **Edge Data Centers**: Deploy AI models in edge data centers for low-latency applications
- **CDN Integration**: Integrate AI processing capabilities into content delivery networks
- **5G Edge**: Leverage 5G edge computing for AI-powered applications
- **Fog Computing**: Implement AI processing in fog computing environments

## Installation and Setup

### Extension Installation
Install the AI Toolkit extension directly from the Visual Studio Code Marketplace:

**Extension ID**: `ms-windows-ai-studio.windows-ai-studio`

**Installation Methods**:
1. **VS Code Marketplace**: Search for "AI Toolkit" in the Extensions view
2. **Command Line**: `code --install-extension ms-windows-ai-studio.windows-ai-studio`
3. **Direct Install**: Download from [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-windows-ai-studio.windows-ai-studio)

### Prerequisites for Edge AI Development
- **Visual Studio Code**: Latest version recommended
- **Python Environment**: Python 3.8+ with required AI libraries
- **ONNX Runtime** (Optional): For ONNX model inference
- **Ollama** (Optional): For local model serving
- **Hardware Acceleration Tools**: CUDA, OpenVINO, or platform-specific accelerators

### Initial Configuration
1. **Extension Activation**: Open VS Code and verify AI Toolkit appears in the Activity Bar
2. **Model Provider Setup**: Configure access to GitHub, OpenAI, Anthropic, or other model providers
3. **Local Environment**: Set up Python environment and install required packages
4. **Hardware Acceleration**: Configure GPU/NPU acceleration if available
5. **MCP Integration**: Set up Model Context Protocol servers if needed

### First-Time Setup Checklist
- [ ] AI Toolkit extension installed and activated
- [ ] Model catalog accessible and models discoverable
- [ ] Playground functional for model testing
- [ ] Agent Builder accessible for prompt development
- [ ] Local development environment configured
- [ ] Hardware acceleration (if available) properly configured

## Getting Started with AI Toolkit

### Quick Start Guide

We recommend starting with models hosted by GitHub for the most streamlined experience:

1. **Installation**: Follow the [installation guide](https://code.visualstudio.com/docs/intelligentapps/overview#_install-and-setup) to set up AI Toolkit for your device
2. **Model Discovery**: From the extension tree view, select **CATALOG > Models** to explore available models
3. **GitHub Models**: Start with models hosted by GitHub for optimal integration
4. **Playground Testing**: From any model card, select **Try in Playground** to start experimenting with model capabilities

### Step-by-Step Edge AI Development

#### Step 1: Model Exploration and Selection
1. Open the AI Toolkit view in VS Code Activity Bar
2. Browse the Model Catalog for models suitable for edge deployment
3. Filter by provider (GitHub, ONNX, Ollama) based on your edge requirements
4. Use **Try in Playground** to test model capabilities immediately

#### Step 2: Agent Development
1. Use the **Prompt (Agent) Builder** to create edge-optimized AI agents
2. Generate starter prompts using natural language descriptions
3. Iterate and refine prompts based on model responses
4. Integrate MCP tools for enhanced agent capabilities

#### Step 3: Testing and Evaluation
1. Use **Bulk Run** to test multiple prompts across selected models
2. Run agents with test cases to validate functionality
3. Evaluate accuracy and performance using built-in or custom metrics
4. Compare different models and configurations

#### Step 4: Fine-tuning and Optimization
1. Customize models for specific edge use cases
2. Apply domain-specific fine-tuning
3. Optimize for edge deployment constraints
4. Version and compare different agent configurations

#### Step 5: Deployment Preparation
1. Generate production-ready code using the Agent Builder
2. Set up MCP server connections for production use
3. Prepare deployment packages for edge devices
4. Configure monitoring and evaluation metrics

## Samples for AI Toolkit 

Try Our Samples
The [AI Toolkit samples](https://github.com/Azure-Samples/AI_Toolkit_Samples) are designed to help developers and researchers explore and implement AI solutions effectively. 

Our samples include:

Sample Code: Pre-built examples to demonstrate AI functionalities, such as training, deploying, or integrating models into applications.
Documentation: Guides and tutorials to help users understand AI Toolkit features and how to use them.
Prequisites

- Visual Studio Code
- AI Toolkit for Visual Studio Code
- GitHub Fine-grained personal access token (PAT)
- Foundry Local

## Best Practices for Edge AI Development

### Model Selection
- **Size Constraints**: Choose models that fit within memory limitations of target devices
- **Inference Speed**: Prioritize models with fast inference times for real-time applications
- **Accuracy Trade-offs**: Balance model accuracy with resource constraints
- **Format Compatibility**: Prefer ONNX or hardware-optimized formats for edge deployment

### Optimization Techniques
- **Quantization**: Use INT8 or INT4 quantization to reduce model size and improve speed
- **Pruning**: Remove unnecessary model parameters to reduce computational requirements
- **Knowledge Distillation**: Create smaller models that maintain performance of larger ones
- **Hardware Acceleration**: Leverage NPUs, GPUs, or specialized accelerators when available

### Development Workflow
- **Iterative Testing**: Test frequently in edge-like conditions during development
- **Performance Monitoring**: Continuously monitor resource usage and inference speed
- **Version Control**: Track model versions and optimization settings
- **Documentation**: Document all optimization decisions and performance trade-offs

### Deployment Considerations
- **Resource Monitoring**: Monitor memory, CPU, and power usage in production
- **Fallback Strategies**: Implement fallback mechanisms for model failures
- **Update Mechanisms**: Plan for model updates and version management
- **Security**: Implement appropriate security measures for edge AI applications

## Integration with Edge AI Frameworks

### ONNX Runtime
- **Cross-platform Deployment**: Deploy ONNX models across different edge platforms
- **Hardware Optimization**: Leverage ONNX Runtime's hardware-specific optimizations
- **Mobile Support**: Use ONNX Runtime Mobile for smartphone and tablet applications
- **IoT Integration**: Deploy on IoT devices using ONNX Runtime's lightweight distributions

### Windows ML
- **Windows Devices**: Optimize for Windows-based edge devices and PCs
- **NPU Acceleration**: Leverage Neural Processing Units on Windows devices
- **DirectML**: Use DirectML for GPU acceleration on Windows platforms
- **UWP Integration**: Integrate with Universal Windows Platform applications

### TensorFlow Lite
- **Mobile Optimization**: Deploy TensorFlow Lite models on mobile and embedded devices
- **Hardware Delegates**: Use specialized hardware delegates for acceleration
- **Micro Controllers**: Deploy on microcontrollers using TensorFlow Lite Micro
- **Cross-platform Support**: Deploy across Android, iOS, and embedded Linux systems

### Azure IoT Edge
- **Cloud-Edge Hybrid**: Combine cloud training with edge inference
- **Module Deployment**: Deploy AI models as IoT Edge modules
- **Device Management**: Manage edge devices and model updates remotely
- **Telemetry**: Collect performance data and model metrics from edge deployments

## Advanced Edge AI Scenarios

### Multi-Model Deployment
- **Model Ensembles**: Deploy multiple models for improved accuracy or redundancy
- **A/B Testing**: Test different models simultaneously on edge devices
- **Dynamic Selection**: Choose models based on current device conditions
- **Resource Sharing**: Optimize resource usage across multiple deployed models

### Federated Learning
- **Distributed Training**: Train models across multiple edge devices
- **Privacy Preservation**: Keep training data local while sharing model improvements
- **Collaborative Learning**: Enable devices to learn from collective experiences
- **Edge-Cloud Coordination**: Coordinate learning between edge devices and cloud infrastructure

### Real-time Processing
- **Stream Processing**: Process continuous data streams on edge devices
- **Low-latency Inference**: Optimize for minimal inference latency
- **Batch Processing**: Efficiently process batches of data on edge devices
- **Adaptive Processing**: Adjust processing based on current device capabilities

## Troubleshooting Edge AI Development

### Common Issues
- **Memory Constraints**: Model too large for target device memory
- **Inference Speed**: Model inference too slow for real-time requirements
- **Accuracy Degradation**: Optimization reduces model accuracy unacceptably
- **Hardware Compatibility**: Model not compatible with target hardware

### Debugging Strategies
- **Performance Profiling**: Use AI Toolkit's tracing features to identify bottlenecks
- **Resource Monitoring**: Monitor memory and CPU usage during development
- **Incremental Testing**: Test optimizations incrementally to isolate issues
- **Hardware Simulation**: Use development tools to simulate target hardware

### Optimization Solutions
- **Further Quantization**: Apply more aggressive quantization techniques
- **Model Architecture**: Consider different model architectures optimized for edge
- **Preprocessing Optimization**: Optimize data preprocessing for edge constraints
- **Inference Optimization**: Use hardware-specific inference optimizations

## Resources and Next Steps

### Official Documentation
- [AI Toolkit Developer Documentation](https://aka.ms/AIToolkit/doc)
- [Installation and Setup Guide](https://code.visualstudio.com/docs/intelligentapps/overview#_install-and-setup)
- [VS Code Intelligent Apps Documentation](https://code.visualstudio.com/docs/intelligentapps)
- [Model Context Protocol (MCP) Documentation](https://modelcontextprotocol.io/)

### Community and Support
- [AI Toolkit GitHub Repository](https://github.com/microsoft/vscode-ai-toolkit)
- [GitHub Issues and Feature Requests](https://aka.ms/AIToolkit/feedback)
- [Azure AI Foundry Discord Community](https://aka.ms/azureaifoundry/discord)
- [VS Code Extension Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-windows-ai-studio.windows-ai-studio)

### Technical Resources
- [ONNX Runtime Documentation](https://onnxruntime.ai/)
- [Ollama Documentation](https://ollama.ai/)
- [Windows ML Documentation](https://docs.microsoft.com/en-us/windows/ai/)
- [Azure AI Foundry Documentation](https://learn.microsoft.com/en-us/azure/ai-foundry/)

### Learning Pathways
- [Edge AI Fundamentals Course](/lib/13-local-ai/edgeai-for-beginners/Module01)
- [Small Language Models Guide](/lib/13-local-ai/edgeai-for-beginners/Module02)
- [Edge Deployment Strategies](/lib/13-local-ai/edgeai-for-beginners/Module03)
- [Windows Edge AI Development](/lib/13-local-ai/edgeai-for-beginners/Module07-windowdeveloper)

### Additional Resources
- **Repository Stats**: 1.8k+ stars, 150+ forks, 18+ contributors
- **License**: MIT License
- **Security**: Microsoft security policies apply
- **Telemetry**: Respects VS Code telemetry settings

## Conclusion

AI Toolkit for Visual Studio Code represents a comprehensive platform for modern AI development, providing streamlined agent development capabilities that are particularly valuable for Edge AI applications. With its extensive model catalog supporting providers like Anthropic, OpenAI, GitHub, and Google, combined with local execution through ONNX and Ollama, the toolkit offers the flexibility needed for diverse edge deployment scenarios.

The toolkit's strength lies in its integrated approach—from model discovery and experimentation in the Playground to sophisticated agent development with the Prompt Builder, comprehensive evaluation capabilities, and seamless MCP tool integration. For Edge AI developers, this means rapid prototyping and testing of AI agents before edge deployment, with the ability to iterate quickly and optimize for resource-constrained environments.

Key advantages for Edge AI development include:
- **Rapid Experimentation**: Test models and agents quickly before committing to edge deployment
- **Multi-Provider Flexibility**: Access models from various sources to find optimal edge solutions
- **Local Development**: Test with ONNX and Ollama for offline and privacy-preserving development
- **Production Readiness**: Generate production-ready code and integrate with external tools via MCP
- **Comprehensive Evaluation**: Use built-in and custom metrics to validate edge AI performance

As AI continues to move toward edge deployment scenarios, AI Toolkit for VS Code provides the development environment and workflow needed to build, test, and optimize intelligent applications for resource-constrained environments. Whether you're developing IoT solutions, mobile AI applications, or embedded intelligence systems, the toolkit's comprehensive feature set and integrated workflow support the entire edge AI development lifecycle.

With ongoing development and an active community (1.8k+ GitHub stars), AI Toolkit remains at the forefront of AI development tools, continuously evolving to meet the needs of modern AI developers building for edge deployment scenarios.

[Next Foundry Local](/lib/13-local-ai/edgeai-for-beginners/Module07-foundrylocal)
