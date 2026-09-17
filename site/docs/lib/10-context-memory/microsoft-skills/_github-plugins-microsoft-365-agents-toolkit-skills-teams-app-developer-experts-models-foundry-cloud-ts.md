---
title: "foundry-cloud-ts"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/models/foundry-cloud-ts.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/models/foundry-cloud-ts.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/models/foundry-cloud-ts.md"
sourceSha256: "39429e791d808d67f8c10a0b8573f28c8e57a845479562efa5d24147070f47ed"
pageSha256: "39429e791d808d67f8c10a0b8573f28c8e57a845479562efa5d24147070f47ed"
contentMode: "local-full"
zh: ""
---

# foundry-cloud-ts

## purpose

Using Azure AI Foundry (cloud) and the Azure AI model catalog for serverless model inference. Covers Model-as-a-Service (MaaS) deployments, the Azure AI Inference SDK, GitHub Models, and connecting to Foundry-hosted models from TypeScript.

## rules

1. **Azure AI Foundry provides serverless model endpoints (Model-as-a-Service).** No GPU provisioning needed — deploy a model from the catalog and get an HTTPS endpoint with pay-per-token billing. Available models include Phi-4, Llama, Mistral, Cohere, and more. [learn.microsoft.com/azure/ai-studio/how-to/deploy-models-serverless](https://learn.microsoft.com/azure/ai-studio/how-to/deploy-models-serverless)
2. **MaaS endpoints are OpenAI-compatible.** The deployed endpoint exposes `/v1/chat/completions` with the standard OpenAI request/response format. Use the `openai` npm package with a custom `baseURL` and the endpoint's API key. [learn.microsoft.com/azure/ai-studio/reference/reference-model-inference-chat-completions](https://learn.microsoft.com/azure/ai-studio/reference/reference-model-inference-chat-completions)
3. **Alternatively, use `@azure-rest/ai-inference` for the Azure AI Inference SDK.** This TypeScript SDK provides a typed client for Azure AI model endpoints. `npm install @azure-rest/ai-inference`. It supports chat completions, embeddings, and image generation. [learn.microsoft.com/azure/ai-studio/reference/reference-model-inference-api](https://learn.microsoft.com/azure/ai-studio/reference/reference-model-inference-api)
4. **Authentication uses either API key or Entra ID token.** MaaS endpoints accept an API key in the `Authorization: Bearer <key>` header. For managed identity, use `@azure/identity` to get a token. [learn.microsoft.com/azure/ai-studio/how-to/deploy-models-serverless](https://learn.microsoft.com/azure/ai-studio/how-to/deploy-models-serverless)
5. **GitHub Models provides free-tier access to the same model catalog.** Use `https://models.inference.ai.azure.com` as the base URL with a GitHub personal access token as the API key. Great for prototyping before deploying to your own Azure subscription. [docs.github.com/en/github-models](https://docs.github.com/en/github-models)
6. **Deploy models via the Azure AI Foundry portal or CLI.** In the portal: AI Foundry → Model catalog → Deploy. Via CLI: `az cognitiveservices account deployment create` for Azure OpenAI models, or use the AI Foundry portal for MaaS models. [learn.microsoft.com/azure/ai-studio/how-to/deploy-models-serverless](https://learn.microsoft.com/azure/ai-studio/how-to/deploy-models-serverless)
