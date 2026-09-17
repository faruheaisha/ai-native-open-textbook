---
title: "OpenAI API 文档（英文）"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/your-data.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/your-data.md"
sourceSha256: "9798847c992fcd27535b8b883568a2b793ab86d0097afa6cc34e383c05e86e94"
pageSha256: "9d6e357611d1daf9bab6625aad4d388007f6bfdfe2da1fa91c885b6955a493d7"
contentMode: "local-full"
zh: ""
---

## Enterprise Key Management (EKM)

Enterprise Key Management (EKM) allows you to encrypt your customer content at OpenAI using keys managed by your own external Key Management System (KMS).

Once configured, EKM applies to any [application state](#types-of-data-stored-with-the-openai-api) created during your use of the platform. See the [EKM help center article](https://help.openai.com/en/articles/20000943-openai-enterprise-key-management-ekm-overview) for more information about how EKM works, and how to integrate with your KMS provider.

### EKM limitations

OpenAI supports Bring Your Own Key (BYOK) encryption with external accounts in AWS KMS, Google Cloud (GCP), and Azure Key Vault. If your organization leverages a different key management service, those keys need to be synced to one of the supported cloud KMS providers for use with OpenAI.

EKM does not support the following products. An attempt to use these endpoints in a project with EKM enabled will return an error.

- Assistants (/v1/assistants)
- Vision fine tuning
