---
title: "Sample 02: OpenAI SDK Integration"
sourceId: "13-local-ai/edgeai-for-beginners"
sourceTitle: "EdgeAI for Beginners"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "13-local-ai"
sourceUrl: "https://github.com/microsoft/edgeai-for-beginners"
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module08/samples/02/README.md"
sourceRel: "Module08/samples/02/README.md"
rawUrl: "/raw/13-local-ai/edgeai-for-beginners/Module08/samples/02/README.md"
sourceSha256: "fa3f617a0d735650275c4522b04385e270730117b881d354214e866f3ae3e852"
pageSha256: "fa3f617a0d735650275c4522b04385e270730117b881d354214e866f3ae3e852"
contentMode: "local-full"
zh: ""
---

# Sample 02: OpenAI SDK Integration

Demonstrates advanced integration with the OpenAI Python SDK, supporting both Microsoft Foundry Local and Azure OpenAI with streaming responses and proper error handling.

## Overview

This sample showcases:
- Seamless switching between Foundry Local and Azure OpenAI
- Streaming chat completions for better user experience
- Proper use of the FoundryLocalManager SDK
- Robust error handling and fallback mechanisms
- Production-ready code patterns

## Prerequisites

- **Foundry Local**: Installed and running (for local inference)
- **Python**: 3.8 or later with OpenAI SDK
- **Azure OpenAI**: Valid endpoint and API key (for cloud inference)

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

3. **Start Foundry Local (for local mode):**
   ```cmd
   foundry model run phi-4-mini
   ```

## Usage Scenarios

### Foundry Local (Default)

**Option 1: Using FoundryLocalManager (Recommended)**
```cmd
# Automatic service discovery and model management
set MODEL=phi-4-mini
python samples\02\sdk_quickstart.py
```

**Option 2: Manual Configuration**
```cmd
# Manual endpoint configuration
set BASE_URL=http://localhost:8000
set MODEL=phi-4-mini
set API_KEY=
python samples\02\sdk_quickstart.py
```

### Azure OpenAI

```cmd
# Azure OpenAI configuration
set AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
set AZURE_OPENAI_API_KEY=your-api-key
set AZURE_OPENAI_API_VERSION=2024-08-01-preview
set MODEL=your-deployment-name
python samples\02\sdk_quickstart.py
```

## Code Architecture

### Client Factory Pattern

The sample uses a factory pattern to create appropriate clients:

```python
def create_foundry_client():
    """Create Foundry Local client with SDK management."""
    manager = FoundryLocalManager(alias)
    client = OpenAI(
        base_url=manager.endpoint,
        api_key=manager.api_key
    )
    return client, manager.get_model_info(alias).id

def create_azure_client():
    """Create Azure OpenAI client."""
    client = OpenAI(
        base_url=f"{endpoint}/openai",
        api_key=api_key,
        default_query={"api-version": api_version}
    )
    return client, model
```

### Streaming Responses

The sample demonstrates streaming for real-time response generation:

```python
stream = client.chat.completions.create(
    model=model,
    messages=[{"role": "user", "content": prompt}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

## Environment Variables

### Foundry Local Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `MODEL` | Model alias to use | `phi-4-mini` | No |
| `BASE_URL` | Foundry Local endpoint | `http://localhost:8000` | No |
| `API_KEY` | API key (optional for local) | `""` | No |

### Azure OpenAI Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `AZURE_OPENAI_ENDPOINT` | Azure OpenAI resource endpoint | - | Yes |
| `AZURE_OPENAI_API_KEY` | Azure OpenAI API key | - | Yes |
| `AZURE_OPENAI_API_VERSION` | API version | `2024-08-01-preview` | No |
| `MODEL` | Azure deployment name | `your-deployment-name` | Yes |

## Advanced Features

### Automatic Service Discovery

The sample automatically detects the appropriate service based on environment variables:

1. **Azure Mode**: If `AZURE_OPENAI_ENDPOINT` and `AZURE_OPENAI_API_KEY` are set
2. **Foundry SDK Mode**: If Foundry Local SDK is available
3. **Manual Mode**: Fallback to manual configuration

### Error Handling

- Graceful fallback from SDK to manual configuration
- Clear error messages for troubleshooting
- Proper exception handling for network issues
- Validation of required environment variables

## Performance Considerations

### Local vs Cloud Trade-offs

**Foundry Local Advantages:**
- ✅ No API costs
- ✅ Data privacy (no data leaves device)
- ✅ Low latency for supported models
- ✅ Works offline

**Azure OpenAI Advantages:**
- ✅ Access to latest large models
- ✅ Higher throughput
- ✅ No local compute requirements
- ✅ Enterprise-grade SLA

## Troubleshooting

### Common Issues

1. **"Could not use Foundry SDK" warning:**
   ```cmd
   pip install foundry-local-sdk
   ```

2. **Azure authentication errors:**
   ```cmd
   # Verify your endpoint format
   echo %AZURE_OPENAI_ENDPOINT%
   # Should be: https://your-resource.openai.azure.com
   ```

3. **Model not available:**
   ```cmd
   # For Foundry Local
   foundry model list
   foundry model run your-model-name
   
   # For Azure OpenAI
   # Check your deployment name in Azure Portal
   ```

### Health Checks

```cmd
# Foundry Local
foundry service status
curl http://localhost:8000/v1/models

# Azure OpenAI
curl -H "api-key: %AZURE_OPENAI_API_KEY%" "%AZURE_OPENAI_ENDPOINT%/openai/deployments?api-version=2024-08-01-preview"
```

## Next Steps

- **Sample 03**: Model discovery and benchmarking
- **Sample 04**: Building a Chainlit RAG application
- **Sample 05**: Multi-agent orchestration
- **Sample 06**: Models-as-tools routing

## References

- [Azure OpenAI Documentation](https://learn.microsoft.com/azure/ai-services/openai/)
- [Foundry Local SDK Reference](https://learn.microsoft.com/azure/ai-foundry/foundry-local/)
- [OpenAI Python SDK Documentation](https://github.com/openai/openai-python)
- [Streaming Completions Guide](https://learn.microsoft.com/azure/ai-foundry/foundry-local/how-to/integrate-with-inference-sdks)
