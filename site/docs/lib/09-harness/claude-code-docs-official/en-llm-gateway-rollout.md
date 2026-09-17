---
title: "Roll out an LLM gateway for your organization"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/llm-gateway-rollout.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/llm-gateway-rollout.md"
sourceSha256: "12a0e018c724b243a3b57f71633ec5ea5856be0e860b9a784c3f5da31a72df4d"
pageSha256: "12a0e018c724b243a3b57f71633ec5ea5856be0e860b9a784c3f5da31a72df4d"
contentMode: "local-full"
zh: ""
---

# Roll out an LLM gateway for your organization

> Deploy a gateway product for Claude Code: configure it to forward what Claude Code sends, issue developer credentials, distribute the configuration through managed settings, and verify the rollout.

This page walks an administrator through rolling out an LLM gateway for Claude Code. It assumes you have a gateway product deployed that meets the [gateway requirements](#gateway-requirements). Deploying or operating any specific product isn't covered here; deploy yours following its vendor's documentation.

  * To connect Claude Code on your own machine to an existing gateway, see [Connect Claude Code to an LLM gateway](https://code.claude.com/docs/en/llm-gateway-connect)
  * For what Claude Code sends to a gateway and what to forward, see the [gateway compatibility guide](https://code.claude.com/docs/en/llm-gateway-protocol)

## Prerequisites

To complete the rollout, you'll need:

* A gateway deployed on your infrastructure, serving HTTPS at the exact address you'll distribute to developers, not an address that redirects to it, and configured to route Claude model names to your provider
* A provider credential for the gateway to forward with:
  * For the Anthropic API: an API key from the [Claude Console](https://platform.claude.com/settings/keys)
  * For a cloud provider: cloud credentials with model access. See the prerequisites on the [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock#prerequisites), [Google Cloud's Agent Platform](https://code.claude.com/docs/en/google-vertex-ai#prerequisites), or [Microsoft Foundry](https://code.claude.com/docs/en/microsoft-foundry#prerequisites) page
* A way to deliver settings files to developer machines, such as MDM or configuration management
  * If you don't have one yet, [how settings reach devices](https://code.claude.com/docs/en/admin-setup#decide-how-settings-reach-devices) compares the options

### Gateway requirements

Whichever product provides the gateway, it must:

* **Accept a supported API format**: one of the formats in the [API formats table](https://code.claude.com/docs/en/llm-gateway-protocol#api-formats). The rollout steps below assume the Anthropic Messages API at `POST /v1/messages`, which most gateways serve
* **Stream responses**: pass server-sent events through as they arrive, including keep-alive pings, instead of buffering the whole response; [streaming](https://code.claude.com/docs/en/llm-gateway-protocol#streaming) covers what buffering or stripped pings break
* **Route Claude model names**: map each name developers use to an upstream model. Claude Code sends a model name such as `claude-sonnet-4-6` in each request; in most gateway products the mapping is a model list or routing table in the gateway's own configuration
* **Forward headers and body unchanged**: pass `anthropic-beta`, `anthropic-version`, and the request body through in both directions; the [feature pass-through table](https://code.claude.com/docs/en/llm-gateway-protocol#feature-pass-through) maps each to the feature that breaks without it
* **Return upstream errors unmodified**: Claude Code's automatic recovery matches on error wording, so wrapping errors in the gateway's own envelope breaks it, unless the envelope's message carries one of the `capability_rejected:` tokens a [Claude apps gateway substitutes for cloud providers' error wording](https://code.claude.com/docs/en/claude-apps-gateway-config#upstream-error-messages)
* **Exempt the path from request-body WAF inspection**: Claude Code prompts carry source code and XML-style tags that match cross-site-scripting body rules; a WAF in front of the gateway returns `403` on real sessions while short test requests pass

Optionally, serve `GET /v1/models` so Claude Code can populate the model picker from your gateway with [model discovery](https://code.claude.com/docs/en/llm-gateway-protocol#model-discovery).

## Rollout steps

The rollout takes five steps, each with a checkpoint:

1. [Confirm the gateway routes your models](#confirm-the-gateway-routes-your-models)
2. [Issue each developer a credential](#issue-developer-credentials)
3. [Test Claude Code against the gateway](#test-claude-code-against-the-gateway)
4. [Distribute the base URL and credentials](#distribute-the-configuration)
5. [Verify from a developer machine](#verify-the-rollout)

The steps involve three different credentials, and the checkpoints name them by placeholder so you can tell which one is at fault when something fails:

| Credential                        | Who holds it                                                                                         | Placeholder in checkpoints                                  |
| :-------------------------------- | :--------------------------------------------------------------------------------------------------- | :---------------------------------------------------------- |
| Provider credential               | The gateway, which forwards it to the upstream provider                                              | Configured on the gateway; never appears in client commands |
