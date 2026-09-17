---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/build-with-claude/claude-platform-on-aws.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/claude-platform-on-aws.md"
sourceSha256: "0ff935251ef5bee607ae9d604d1c665269af87e8eda7c66c98362c1d5906779c"
pageSha256: "0666479d798f73ca006ccb38f577214bcbddb4ed5aed0164ee75b23d38abd464"
contentMode: "local-full"
zh: ""
---

## Feature support

Claude Platform on AWS uses Claude API endpoints directly, which means you get full feature parity with the first-party Claude API (except where noted in the [feature limitations](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#features-not-supported)):

* **Feature access:** Because Anthropic operates both platforms, most new features and beta headers become available on Claude Platform on AWS without a separate integration step. See [feature limitations](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#features-not-supported) for exceptions.
* **Beta features:** Pass the standard `anthropic-beta` header to access beta features, just as you would with the Claude API.
* **Agent Skills:** Use pre-built and custom [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) with the same `container.skills` parameter as the Claude API. All pre-built Skills (PowerPoint, Excel, Word, PDF) work out of the box.
* **Code execution:** Run code in Anthropic's managed sandbox using the [code execution tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool).
* **Tool use:** Computer use and all other [tool use capabilities](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) are available.
* **Extended thinking:** Enable extended thinking with the same parameters as the Claude API.
* **Streaming:** Full SSE streaming support for real-time responses.
* **Batch processing:** Submit batch requests for high-throughput workloads.
* **Prompt caching:** Cache tools, system prompts, and message history to reduce latency and cost. All prompt caching capabilities (5-minute TTL, 1-hour TTL, and automatic caching) are available.
* **Files API:** Upload and reference files across requests.
* **Customer-managed encryption keys (CMEK):** [CMEK](https://platform.claude.com/docs/en/manage-claude/cmek) is available with [AWS KMS](https://platform.claude.com/docs/en/manage-claude/cmek-aws-kms) keys only. Google Cloud KMS and Azure Key Vault keys cannot be registered. The key must be a single-region KMS key in the same AWS account and region as the workspace it is attached to, and its key policy must grant access to the `aws-external-anthropic.amazonaws.com` service principal; see [Set up CMEK on Claude Platform on AWS](https://platform.claude.com/docs/en/manage-claude/cmek-aws-kms#claude-platform-on-aws). Register and attach keys in the [Claude Console](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#using-the-claude-console); the external key endpoints are also available, authorized through [IAM actions](https://platform.claude.com/docs/en/api/claude-platform-on-aws-iam-actions#encryption-keys). There is no separate validation step: the key is implicitly validated when you attach it to a workspace (the attach call performs an encrypt/decrypt round), so a key policy problem surfaces at attach time rather than at registration.
* **Compliance API:** The [Compliance API](https://platform.claude.com/docs/en/manage-claude/compliance-api) is available. Access is authorized through the AWS IAM [`ListComplianceActivities` action](https://platform.claude.com/docs/en/api/claude-platform-on-aws-iam-actions#compliance).

See the [comparison table](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#claude-platform-on-aws-vs-amazon-bedrock) for feature-availability differences from Amazon Bedrock.

### Claude Managed Agents

[Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview) is available on Claude Platform on AWS, including [agents](https://platform.claude.com/docs/en/managed-agents/agent-setup), [environments](https://platform.claude.com/docs/en/managed-agents/environments), [sessions](https://platform.claude.com/docs/en/managed-agents/sessions), [credential vaults](https://platform.claude.com/docs/en/managed-agents/vaults), [memory stores](https://platform.claude.com/docs/en/managed-agents/memory), [webhooks](https://platform.claude.com/docs/en/managed-agents/webhooks), [multiagent orchestration](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration), and [self-hosted sandboxes](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes).

Session behavior on Claude Platform on AWS differs from first-party Claude Managed Agents in two ways:

* **Autonomous-session reauthentication:** A session can run autonomously, without any [user events](https://platform.claude.com/docs/en/managed-agents/reference#event-types), for up to 6 hours. After 6 hours, the session requires reauthentication before it continues. To reauthenticate, send any user-role event to the session (see [Events and streaming](https://platform.claude.com/docs/en/managed-agents/events-and-streaming)). First-party Claude Managed Agents has no autonomous-session runtime limit.
* **[Memory stores on self-hosted environments](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#use-memory-stores):** A session that runs on a self-hosted environment cannot attach memory stores; a session that includes one is rejected at creation. Sessions on cloud environments attach memory stores as usual. On first-party Claude Managed Agents, sessions on both cloud and self-hosted environments can attach memory stores.

### Features not supported

The following capabilities are not currently available on Claude Platform on AWS:

* **HIPAA readiness:** Anthropic's HIPAA-ready program is not available. See [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention).
* **Computer use and browser use toolsets:** `computer_toolset_20260801` and `browser_toolset_20260801` are not currently available on Claude Platform on AWS. The beta [computer use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#earlier-tool-versions) tool versions remain available.

- **Admin API:** Workspace endpoints (create, get, list, update, and archive on `/v1/organizations/workspaces`) and external key endpoints (register, get, list, update, and delete on `/v1/organizations/external_keys`, for [CMEK](https://platform.claude.com/docs/en/manage-claude/cmek); keys are validated when attached to a workspace rather than through a validate endpoint) are available. Other Admin API endpoints (organization members, workspace members, invites, API keys, usage reports, cost reports, and rate limit reports) are not currently available. View usage and cost data in the [Claude Console](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#using-the-claude-console) instead. AWS IAM manages organization membership.
- **Workspace member management:** Adding or removing users from individual workspaces is not available. AWS IAM policies on workspace ARNs control access.
- **Claude Code workspace and Analytics API:** The Claude Code workspace with automatic rate limits is not available. Claude Code usage appears in the general usage view rather than a dedicated screen.
- **OAuth authentication:** Not supported. Use SigV4 or API key authentication.
- **Fast mode:** Not available on Claude Platform on AWS.
- **OpenAI-compatible API endpoints:** Not available on Claude Platform on AWS.
- **MCP tunnels:** Only MCP servers exposed over the public internet are supported.
