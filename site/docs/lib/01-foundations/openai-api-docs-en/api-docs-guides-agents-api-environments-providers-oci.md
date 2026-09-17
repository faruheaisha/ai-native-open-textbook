---
title: "Oracle Cloud Infrastructure (OCI)"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/agents-api/environments/providers/oci.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/agents-api/environments/providers/oci.md"
sourceSha256: "fa3b056d18af2caffbe60795a07fa007537f407ad139297bac44fd4c7bc3266d"
pageSha256: "fa3b056d18af2caffbe60795a07fa007537f407ad139297bac44fd4c7bc3266d"
contentMode: "local-full"
zh: ""
---

# Oracle Cloud Infrastructure (OCI)

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Run an Agents API session in an OCI GenAI Sandbox. This guide follows Oracle's beta Python example and uses **application-managed provisioning**: your application creates and deletes both the Agents API session and the OCI sandbox.

See [Sandbox lifecycle](https://developers.openai.com/api/docs/guides/agents-api/environments/lifecycle) for the provisioning modes and connection behavior.

OCI GenAI Sandboxes are in beta. Contact your Oracle account manager to
  request access for your account.

## Before you begin

Create a sandbox-enabled Generative AI Project. Grant your OCI identity permission to manage projects and sandboxes in its compartment. Replace the placeholders in these IAM policies:

```text
