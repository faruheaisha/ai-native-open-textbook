---
title: "Choosing & Configuring an LLM Provider 🔑"
sourceId: "01-foundations/microsoft-generative-ai-for-beginners"
sourceTitle: "Generative AI for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/microsoft/generative-ai-for-beginners"
entryUrl: "https://github.com/microsoft/generative-ai-for-beginners/blob/c9657f3fdb6e4f50a168b1d026eadf4cda2f0d07/README.md"
zh: ""
---

# Choosing & Configuring an LLM Provider 🔑

Assignments **may** also be setup to work against one or more Large Language Model (LLM) deployments through a supported service provider like OpenAI, Azure or Hugging Face. These provide a _hosted endpoint_ (API) that we can access programmatically with the right credentials (API key or token). In this course, we discuss these providers:

 - [OpenAI](https://platform.openai.com/docs/models?WT.mc_id=academic-105485-koreyst) with diverse models including the core GPT series.
 - [Azure OpenAI](https://learn.microsoft.com/azure/ai-foundry/openai/?WT.mc_id=academic-105485-koreyst) for OpenAI models with enterprise readiness in focus
 - [Microsoft Foundry Models](https://ai.azure.com/catalog/models?WT.mc_id=academic-105485-koreyst) for a single endpoint and API key to access hundreds of models from OpenAI, Meta, Mistral, Cohere, Microsoft and more (replaces GitHub Models, which is retiring at the end of July 2026)
 - [Hugging Face](https://huggingface.co/docs/hub/index?WT.mc_id=academic-105485-koreyst) for open-source models and inference server
 - [Foundry Local](https://foundrylocal.ai?WT.mc_id=academic-105485-koreyst) or [Ollama](https://ollama.com/?WT.mc_id=academic-105485-koreyst) if you'd rather run models fully offline on your own device, with no cloud subscription required

**You will need to use your own accounts for these exercises**. Assignments are optional so you can choose to setup one, all - or none - of the providers based on your interests. Some guidance for signup:

| Signup | Cost | API Key | Playground | Comments |
|:---|:---|:---|:---|:---|
| [OpenAI](https://platform.openai.com/signup?WT.mc_id=academic-105485-koreyst)| [Pricing](https://openai.com/pricing#language-models?WT.mc_id=academic-105485-koreyst)| [Project-based](https://platform.openai.com/api-keys?WT.mc_id=academic-105485-koreyst) | [No-Code, Web](https://platform.openai.com/playground?WT.mc_id=academic-105485-koreyst) | Multiple Models Available |
| [Azure](https://aka.ms/azure/free?WT.mc_id=academic-105485-koreyst)| [Pricing](https://azure.microsoft.com/pricing/details/cognitive-services/openai-service/?WT.mc_id=academic-105485-koreyst)| [SDK Quickstart](https://learn.microsoft.com/azure/ai-foundry/openai/quickstart?WT.mc_id=academic-105485-koreyst)| [Studio Quickstart](https://learn.microsoft.com/azure/ai-foundry/openai/quickstart?WT.mc_id=academic-105485-koreyst) |  [Must Apply Ahead For Access](https://learn.microsoft.com/azure/ai-foundry/openai/?WT.mc_id=academic-105485-koreyst)|
| [Microsoft Foundry](https://ai.azure.com?WT.mc_id=academic-105485-koreyst) | [Pricing](https://azure.microsoft.com/pricing/details/ai-foundry/?WT.mc_id=academic-105485-koreyst) | [Project Overview page](https://learn.microsoft.com/azure/ai-foundry/model-inference/overview?WT.mc_id=academic-105485-koreyst) | [Foundry Playground](https://ai.azure.com/catalog/models?WT.mc_id=academic-105485-koreyst) | Free tier available; one endpoint + key for many model providers |
| [Hugging Face](https://huggingface.co/join?WT.mc_id=academic-105485-koreyst) | [Pricing](https://huggingface.co/pricing) | [Access Tokens](https://huggingface.co/docs/hub/security-tokens?WT.mc_id=academic-105485-koreyst) | [Hugging Chat](https://huggingface.co/chat/?WT.mc_id=academic-105485-koreyst)| [Hugging Chat has limited models](https://huggingface.co/chat/models?WT.mc_id=academic-105485-koreyst) |
| [Foundry Local](https://foundrylocal.ai?WT.mc_id=academic-105485-koreyst) | Free (runs on your device) | Not required | [Local CLI/SDK](https://learn.microsoft.com/azure/ai-foundry/foundry-local/get-started?WT.mc_id=academic-105485-koreyst) | Fully offline, OpenAI-compatible endpoint |
| | | | | |

Follow the directions below to _configure_ this repository for use with different providers. Assignments that require a specific provider will contain one of these tags in their filename:

- `aoai` - requires Azure OpenAI endpoint, key
- `oai` - requires OpenAI endpoint, key
- `hf` - requires Hugging Face token
- `githubmodels` - requires Microsoft Foundry Models endpoint, key (GitHub Models is retiring at the end of July 2026)

You can configure one, none, or all providers. Related assignments will simply error out on missing credentials.

## Create `.env` file

We assume that you have already read the guidance above and signed up with the relevant provider, and obtained the required authentication credentials (API_KEY or token). In the case of Azure OpenAI, we assume you also have a valid deployment of an Azure OpenAI Service (endpoint) with at least one GPT model deployed for chat completion.

The next step is to configure your **local environment variables** as follows:

1. Look in the root folder for a `.env.copy` file that should have contents like this:

   ```bash
   # OpenAI Provider
   OPENAI_API_KEY='&lt;add your OpenAI API key here>'

   ## Azure OpenAI in Microsoft Foundry
   ## (Azure OpenAI Service is now part of Microsoft Foundry: https://ai.azure.com)
   AZURE_OPENAI_API_VERSION='2024-10-21' # Default is set! (current stable GA API version)
   AZURE_OPENAI_API_KEY='&lt;add your Foundry resource key here>'
