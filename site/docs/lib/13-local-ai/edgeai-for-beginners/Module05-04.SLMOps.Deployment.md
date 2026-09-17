---
title: "Section 4: Deployment - Production-Ready Model Implementation"
sourceId: "13-local-ai/edgeai-for-beginners"
sourceTitle: "EdgeAI for Beginners"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "13-local-ai"
sourceUrl: "https://github.com/microsoft/edgeai-for-beginners"
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module05/04.SLMOps.Deployment.md"
sourceRel: "Module05/04.SLMOps.Deployment.md"
rawUrl: "/raw/13-local-ai/edgeai-for-beginners/Module05/04.SLMOps.Deployment.md"
sourceSha256: "1cc35c39ca4cf6d311db29f22ccf8222ae1a29986c797fa5fb2b975bfcc9192e"
pageSha256: "1cc35c39ca4cf6d311db29f22ccf8222ae1a29986c797fa5fb2b975bfcc9192e"
contentMode: "local-full"
zh: ""
---

# Section 4: Deployment - Production-Ready Model Implementation

## Overview

This comprehensive tutorial will guide you through the complete process of deploying fine-tuned quantized models using Foundry Local. We'll cover model conversion, quantization optimization, and deployment configuration from start to finish.

## Prerequisites

Before getting started, ensure you have the following:

- ✅ A fine-tuned onnx model ready for deployment
- ✅ Windows or Mac computer
- ✅ Python 3.10 or higher
- ✅ At least 8GB available RAM
- ✅ Foundry Local installed on your system

## Part 1: Environment Setup

### Installing Required Tools

Open your terminal (Command Prompt on Windows, Terminal on Mac) and run the following commands in sequence:

```bash
# Update transformers library to the latest version
pip install transformers -U

# Install Microsoft Olive (model conversion tool)
pip install git+https://github.com/microsoft/Olive.git

# Install ONNX Runtime GenAI
git clone https://github.com/microsoft/onnxruntime-genai
cd onnxruntime-genai && python build.py --config Release
pip install {Your build release path}/onnxruntime_genai-0.9.0.dev0-cp311-cp311-linux_x86_64.whl

# Install additional dependencies
pip install onnx onnxruntime numpy
```

⚠️ **Important Note**: You'll also need CMake version 3.31 or newer, which can be downloaded from [cmake.org](https://cmake.org/download/).

## Part 2: Model Conversion and Quantization

### Choosing the Right Format

For fine-tuned small language models, we recommend using **ONNX format** because it offers:

- 🚀 Better performance optimization
- 🔧 Hardware-agnostic deployment
- 🏭 Production-ready capabilities
- 📱 Cross-platform compatibility

### Method 1: One-Command Conversion (Recommended)

Use the following command to directly convert your fine-tuned model:

```bash
olive auto-opt \
    --model_name_or_path /path/to/your/finetuned/model \
    --device cpu \
    --provider CPUExecutionProvider \
    --use_model_builder \
    --precision int4 \
    --output_path models/your-model-name/onnx \
    --log_level 1
```

**Parameter Explanation:**
- `--model_name_or_path`: Path to your fine-tuned model
- `--device cpu`: Use CPU for optimization
- `--precision int4`: Use INT4 quantization (approximately 75% size reduction)
- `--output_path`: Output path for the converted model

### Method 2: Configuration File Approach (Advanced Users)

Create a configuration file named `finetuned_conversion_config.json`:

```json
{
    "input_model": {
        "type": "HfModel",
        "model_path": "/path/to/your/finetuned/model",
        "task": "text-generation"
    },
    "systems": {
        "local_system": {
            "type": "LocalSystem",
            "accelerators": [
                {
                    "execution_providers": [
                        "CPUExecutionProvider"
                    ]
                }
            ]
        }
    },
    "passes": {
        "builder": {
            "type": "ModelBuilder",
            "config": {
                "precision": "int4",
                "quantization_config": {
                    "block_size": 128,
                    "is_symmetric": false
                }
            }
        }
    },
    "host": "local_system",
    "target": "local_system",
    "cache_dir": "cache",
    "output_dir": "models/output/your-finetuned-model-onnx"
}
```

Then run:

```bash
olive run --config ./finetuned_conversion_config.json
```

### Quantization Options Comparison

| Precision | File Size | Inference Speed | Model Quality | Recommended Use |
|-----------|-----------|-----------------|---------------|-----------------|
| FP16      | Baseline × 0.5 | Fast | Best | High-end hardware |
| INT8      | Baseline × 0.25 | Very Fast | Good | Balanced choice |
| INT4      | Baseline × 0.125 | Fastest | Acceptable | Resource-limited |

💡 **Recommendation**: Start with INT4 quantization for your first deployment. If quality isn't satisfactory, try INT8 or FP16.

## Part 3: Foundry Local Deployment Configuration

### Creating Model Configuration

Navigate to the Foundry Local models directory:

```bash
foundry cache cd ./models/
```

Create your model directory structure:

```bash
mkdir -p ./models/custom/your-finetuned-model
```

Create the `inference_model.json` configuration file in your model directory:

```json
{
  "Name": "your-finetuned-model-int4",
  "Description": "Fine-tuned quantized model",
  "Version": "1.0",
  "PromptTemplate": {
    "system": "<|im_start|>system\n{Content}<|im_end|>",
    "user": "<|im_start|>user\n{Content}<|im_end|>",
    "assistant": "<|im_start|>assistant\n{Content}<|im_end|>",
    "prompt": "<|im_start|>user\n{Content}<|im_end|>\n<|im_start|>assistant"
  },
  "ModelConfig": {
    "max_length": 2048,
    "temperature": 0.7,
    "top_p": 0.9,
    "repetition_penalty": 1.1
  }
}
```

### Model-Specific Template Configurations

#### For Qwen Series Models:

```json
{
  "Name": "qwen-finetuned-int4",
  "PromptTemplate": {
    "system": "<|im_start|>system\n{Content}<|im_end|>",
    "user": "<|im_start|>user\n{Content}<|im_end|>",
    "assistant": "<|im_start|>assistant\n{Content}<|im_end|>",
    "prompt": "<|im_start|>user\n{Content}<|im_end|>\n<|im_start|>assistant"
  }
}
```

## Part 4: Model Testing and Optimization

### Verifying Model Installation

Check if Foundry Local can recognize your model:

```bash
foundry cache ls
```

You should see `your-finetuned-model-int4` in the list.

### Starting Model Testing

```bash
foundry model run your-finetuned-model-int4
```

### Performance Benchmarking

Monitor key metrics during testing:

1. **Response Time**: Measure average time per response
2. **Memory Usage**: Monitor RAM consumption
3. **CPU Utilization**: Check processor load
4. **Output Quality**: Evaluate response relevance and coherence

### Quality Validation Checklist

- ✅ Model responds appropriately to fine-tuned domain queries
- ✅ Response format matches expected output structure
- ✅ No memory leaks during extended usage
- ✅ Consistent performance across different input lengths
- ✅ Proper handling of edge cases and invalid inputs

## Summary

Congratulations! You have successfully completed:

- ✅ Fine-tuned model format conversion
- ✅ Model quantization optimization
- ✅ Foundry Local deployment configuration
- ✅ Performance tuning and troubleshooting
