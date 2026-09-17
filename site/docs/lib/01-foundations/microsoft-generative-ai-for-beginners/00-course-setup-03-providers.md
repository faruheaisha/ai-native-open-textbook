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
entryUrl: "https://github.com/microsoft/generative-ai-for-beginners/blob/c9657f3fdb6e4f50a168b1d026eadf4cda2f0d07/00-course-setup/03-providers.md"
sourceRel: "00-course-setup/03-providers.md"
rawUrl: "/raw/01-foundations/microsoft-generative-ai-for-beginners/00-course-setup/03-providers.md"
sourceSha256: "813cb07c41a6da4c4f2cc9a967ad45b50f7c0d0803c9ffaae40900c059b379cf"
pageSha256: "813cb07c41a6da4c4f2cc9a967ad45b50f7c0d0803c9ffaae40900c059b379cf"
contentMode: "local-full"
zh: "on"
---

# Choosing & Configuring an LLM Provider 🔑

Assignments **may** also be setup to work against one or more Large Language Model (LLM) deployments through a supported service provider like OpenAI, Azure or Hugging Face. These provide a _hosted endpoint_ (API) that we can access programmatically with the right credentials (API key or token). In this course, we discuss these providers:

<div class="tb-zh"><p>作业也可以配置成通过受支持的服务商（如 OpenAI、Azure 或 Hugging Face）调用一个或多个大语言模型（LLM）部署。这些服务商提供托管端点（API），凭正确的凭据（API key 或 token）即可用程序访问。本课程涉及以下服务商：</p></div>

 - [OpenAI](https://platform.openai.com/docs/models?WT.mc_id=academic-105485-koreyst) with diverse models including the core GPT series.
 - [Azure OpenAI](https://learn.microsoft.com/azure/ai-foundry/openai/?WT.mc_id=academic-105485-koreyst) for OpenAI models with enterprise readiness in focus
 - [Microsoft Foundry Models](https://ai.azure.com/catalog/models?WT.mc_id=academic-105485-koreyst) for a single endpoint and API key to access hundreds of models from OpenAI, Meta, Mistral, Cohere, Microsoft and more (replaces GitHub Models, which is retiring at the end of July 2026)
 - [Hugging Face](https://huggingface.co/docs/hub/index?WT.mc_id=academic-105485-koreyst) for open-source models and inference server
 - [Foundry Local](https://foundrylocal.ai?WT.mc_id=academic-105485-koreyst) or [Ollama](https://ollama.com/?WT.mc_id=academic-105485-koreyst) if you'd rather run models fully offline on your own device, with no cloud subscription required

<div class="tb-zh"><p>OpenAI：模型种类丰富，包括核心的 GPT 系列；Azure OpenAI：以企业级可用性为重点的 OpenAI 模型；Microsoft Foundry Models：一个端点、一个 API key 即可访问来自 OpenAI、Meta、Mistral、Cohere、微软等数百个模型（取代将于 2026 年 7 月底退役的 GitHub Models）；Hugging Face：开源模型与推理服务器；Foundry Local 或 Ollama：适合希望完全离线、在自己设备上运行模型且不需要云订阅的场景。</p></div>

**You will need to use your own accounts for these exercises**. Assignments are optional so you can choose to setup one, all - or none - of the providers based on your interests. Some guidance for signup:

<div class="tb-zh"><p>这些练习需要使用你自己的账号。作业是可选的，你可以按兴趣配置其中一个、全部，或者一个都不配置。注册方面的说明如下：</p></div>

| Signup | Cost | API Key | Playground | Comments |
|:---|:---|:---|:---|:---|
| [OpenAI](https://platform.openai.com/signup?WT.mc_id=academic-105485-koreyst)| [Pricing](https://openai.com/pricing#language-models?WT.mc_id=academic-105485-koreyst)| [Project-based](https://platform.openai.com/api-keys?WT.mc_id=academic-105485-koreyst) | [No-Code, Web](https://platform.openai.com/playground?WT.mc_id=academic-105485-koreyst) | Multiple Models Available |
| [Azure](https://aka.ms/azure/free?WT.mc_id=academic-105485-koreyst)| [Pricing](https://azure.microsoft.com/pricing/details/cognitive-services/openai-service/?WT.mc_id=academic-105485-koreyst)| [SDK Quickstart](https://learn.microsoft.com/azure/ai-foundry/openai/quickstart?WT.mc_id=academic-105485-koreyst)| [Studio Quickstart](https://learn.microsoft.com/azure/ai-foundry/openai/quickstart?WT.mc_id=academic-105485-koreyst) |  [Must Apply Ahead For Access](https://learn.microsoft.com/azure/ai-foundry/openai/?WT.mc_id=academic-105485-koreyst)|
| [Microsoft Foundry](https://ai.azure.com?WT.mc_id=academic-105485-koreyst) | [Pricing](https://azure.microsoft.com/pricing/details/ai-foundry/?WT.mc_id=academic-105485-koreyst) | [Project Overview page](https://learn.microsoft.com/azure/ai-foundry/model-inference/overview?WT.mc_id=academic-105485-koreyst) | [Foundry Playground](https://ai.azure.com/catalog/models?WT.mc_id=academic-105485-koreyst) | Free tier available; one endpoint + key for many model providers |
| [Hugging Face](https://huggingface.co/join?WT.mc_id=academic-105485-koreyst) | [Pricing](https://huggingface.co/pricing) | [Access Tokens](https://huggingface.co/docs/hub/security-tokens?WT.mc_id=academic-105485-koreyst) | [Hugging Chat](https://huggingface.co/chat/?WT.mc_id=academic-105485-koreyst)| [Hugging Chat has limited models](https://huggingface.co/chat/models?WT.mc_id=academic-105485-koreyst) |
| [Foundry Local](https://foundrylocal.ai?WT.mc_id=academic-105485-koreyst) | Free (runs on your device) | Not required | [Local CLI/SDK](https://learn.microsoft.com/azure/ai-foundry/foundry-local/get-started?WT.mc_id=academic-105485-koreyst) | Fully offline, OpenAI-compatible endpoint |
| | | | | |

Follow the directions below to _configure_ this repository for use with different providers. Assignments that require a specific provider will contain one of these tags in their filename:

<div class="tb-zh"><p>按下面的说明把本仓库配置成使用不同的服务商。需要特定服务商的作业，文件名里会带有以下标签之一：</p></div>

- `aoai` - requires Azure OpenAI endpoint, key
- `oai` - requires OpenAI endpoint, key
- `hf` - requires Hugging Face token
- `githubmodels` - requires Microsoft Foundry Models endpoint, key (GitHub Models is retiring at the end of July 2026)

<div class="tb-zh"><p>aoai：需要 Azure OpenAI 的 endpoint 和 key；oai：需要 OpenAI 的 endpoint 和 key；hf：需要 Hugging Face token；githubmodels：需要 Microsoft Foundry Models 的 endpoint 和 key（GitHub Models 将于 2026 年 7 月底退役）。</p></div>

You can configure one, none, or all providers. Related assignments will simply error out on missing credentials.

<div class="tb-zh"><p>可以只配置一个、都不配置，或者全部配置。缺少凭据时，相关作业会直接报错。</p></div>

## Create `.env` file

We assume that you have already read the guidance above and signed up with the relevant provider, and obtained the required authentication credentials (API_KEY or token). In the case of Azure OpenAI, we assume you also have a valid deployment of an Azure OpenAI Service (endpoint) with at least one GPT model deployed for chat completion.

<div class="tb-zh"><p>以下假定你已经读过上面的说明、注册了相应服务商，并取得所需的认证凭据（API_KEY 或 token）。若使用 Azure OpenAI，还假定你已经有一个可用的 Azure OpenAI Service 部署（endpoint），并至少部署了一个用于对话补全的 GPT 模型。</p></div>

The next step is to configure your **local environment variables** as follows:

<div class="tb-zh"><p>下一步是按如下方式配置本地环境变量：</p></div>

1. Look in the root folder for a `.env.copy` file that should have contents like this:

<div class="tb-zh"><p>1. 在根目录里找到 .env.copy 文件，内容大致如下：</p></div>

   ```bash
   # OpenAI Provider
   OPENAI_API_KEY='&lt;add your OpenAI API key here>'

   ## Azure OpenAI in Microsoft Foundry
   ## (Azure OpenAI Service is now part of Microsoft Foundry: https://ai.azure.com)
   AZURE_OPENAI_API_VERSION='2024-10-21' # Default is set! (current stable GA API version)
   AZURE_OPENAI_API_KEY='&lt;add your Foundry resource key here>'
