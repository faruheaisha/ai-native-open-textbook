---
title: "Sample 01: Quick Chat via OpenAI SDK"
sourceId: "13-local-ai/edgeai-for-beginners"
sourceTitle: "EdgeAI for Beginners"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "13-local-ai"
sourceUrl: "https://github.com/microsoft/edgeai-for-beginners"
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module08/samples/01/README.md"
sourceRel: "Module08/samples/01/README.md"
rawUrl: "/raw/13-local-ai/edgeai-for-beginners/Module08/samples/01/README.md"
sourceSha256: "be5e6295cc9597cdb61050ec5f2598193da9c55f6ebc8c5bf7a26a2a70bd8fc3"
pageSha256: "be5e6295cc9597cdb61050ec5f2598193da9c55f6ebc8c5bf7a26a2a70bd8fc3"
contentMode: "local-full"
zh: ""
---

# Sample 01: Quick Chat via OpenAI SDK

A simple chat example demonstrating how to use the OpenAI SDK with Microsoft Foundry Local for local AI inference.

## Overview

This sample shows how to:
- Use the OpenAI Python SDK with Foundry Local
- Handle both Azure OpenAI and local Foundry configurations
- Implement proper error handling and fallback strategies
- Use the FoundryLocalManager for service management

## Prerequisites

- **Foundry Local**: Installed and available on PATH
- **Python**: 3.8 or later
- **Model**: A model loaded in Foundry Local (e.g., `phi-4-mini`)

## Installation

1. **Set up Python environment:**
   ```cmd
   cd Module08
   py -m venv .venv
   .venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```cmd
   pip install -r requirements.txt
   ```

3. **Start Foundry Local service and load a model:**
   ```cmd
   foundry model run phi-4-mini
   ```

## Usage

### Foundry Local (Default)

```cmd
# Using FoundryLocalManager (recommended)
python samples\01\chat_quickstart.py "Explain what Foundry Local is"

# Using manual configuration
set BASE_URL=http://localhost:8000
set MODEL=phi-4-mini
set API_KEY=
python samples\01\chat_quickstart.py "Write a welcome message"
```

### Azure OpenAI

```cmd
set AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
set AZURE_OPENAI_API_KEY=your-api-key
set AZURE_OPENAI_API_VERSION=2024-08-01-preview
set MODEL=your-deployment-name
python samples\01\chat_quickstart.py "Hello from Azure OpenAI"
```

## Code Features

### FoundryLocalManager Integration

The sample uses the official Foundry Local SDK for proper service management:

```python
from foundry_local import FoundryLocalManager
from openai import OpenAI

# Initialize Foundry Local
manager = FoundryLocalManager(alias)
model_info = manager.get_model_info(alias)

# Configure OpenAI client
client = OpenAI(
    base_url=manager.endpoint,
    api_key=manager.api_key
)
```

### Error Handling

Robust error handling with fallback to manual configuration:
- Automatic service discovery
- Graceful degradation if SDK is unavailable
- Clear error messages for troubleshooting

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `MODEL` | Model alias or name | `phi-4-mini` | No |
| `BASE_URL` | Foundry Local base URL | `http://localhost:8000` | No |
| `API_KEY` | API key (usually not needed for local) | `""` | No |
| `AZURE_OPENAI_ENDPOINT` | Azure OpenAI endpoint | - | For Azure |
| `AZURE_OPENAI_API_KEY` | Azure OpenAI API key | - | For Azure |
| `AZURE_OPENAI_API_VERSION` | Azure API version | `2024-08-01-preview` | No |

## Troubleshooting

### Common Issues

1. **"Could not use Foundry SDK" warning:**
   - Install foundry-local-sdk: `pip install foundry-local-sdk`
   - Or set environment variables for manual configuration

2. **Connection refused:**
   - Ensure Foundry Local is running: `foundry service status`
   - Check if a model is loaded: `foundry service ps`

3. **Model not found:**
   - List available models: `foundry model list`
   - Load a model: `foundry model run phi-4-mini`

### Verification

```cmd
# Check Foundry Local status
foundry service status

# List loaded models
foundry service ps

# Test API endpoint
curl http://localhost:8000/v1/models
```

## References

- [Foundry Local Documentation](https://learn.microsoft.com/azure/ai-foundry/foundry-local/)
- [OpenAI Python SDK](https://github.com/openai/openai-python)
- [Foundry Local GitHub](https://github.com/microsoft/Foundry-Local)
- [OpenAI-compatible API Reference](https://learn.microsoft.com/azure/ai-foundry/foundry-local/how-to/how-to-integrate-with-inference-sdks)
