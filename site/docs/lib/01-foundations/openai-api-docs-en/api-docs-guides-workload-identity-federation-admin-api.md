---
title: "Manage Codex workload identity with the Admin API"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/workload-identity-federation/admin-api.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/workload-identity-federation/admin-api.md"
sourceSha256: "d2508ee0324a1a0bfc8ff8ab9823291139fee4377f9a4cd16eb420f7fa29cb75"
pageSha256: "d2508ee0324a1a0bfc8ff8ab9823291139fee4377f9a4cd16eb420f7fa29cb75"
contentMode: "local-full"
zh: ""
---

# Manage Codex workload identity with the Admin API

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Use the organization Admin API to manage Codex workload identity providers and
federation rules from infrastructure tooling or CI. The API exposes the same
provider and rule model as the OpenAI Admin Portal.

The API calls federation rules `mappings` in paths and response objects. This
page uses **federation rule** for the product concept and `mapping` only when it
refers to an API field or path.

These endpoints manage the Codex workload identity federation beta for managed
  ChatGPT workspaces. To request access, contact your OpenAI representative or
  [OpenAI
  Support](https://help.openai.com/en/articles/6614161-how-can-i-contact-support).
  These endpoints do not replace the existing OpenAI API workload identity
  provider and service account mapping APIs.

## Prerequisites

You need:

- Workload identity federation enabled for your organization and managed
  ChatGPT workspace.
- An [Admin API key](https://platform.openai.com/settings/organization/admin-keys)
  whose owner is an active administrator allowed to manage workload identity.
- The ID of the managed ChatGPT workspace.
- The OpenAI user ID of an existing active human or service account in that
  workspace.
- The issuer, audience, and claims for the workload's OIDC token or SPIFFE
  JWT-SVID.

The WIF endpoints use resource IDs instead of names. They do not list or create
ChatGPT workspaces or principals. Supply those IDs from your provisioning system.
If you do not manage those resources programmatically, use the OpenAI Admin
Portal to create or select the principal and connect that workload.

Set the Admin API key in your environment:

```bash
