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
sourceRel: "docs/en/managed-agents/self-hosted-sandboxes.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/managed-agents/self-hosted-sandboxes.md"
sourceSha256: "1f7859dc89e17f00a3dc7ec93296471611247acca42ed2149c714b5102c1ac2b"
pageSha256: "ab9c8508a31e98d966cb23cc9537d32da759892bf5864814d809c16457575a61"
contentMode: "local-full"
zh: ""
---

## Environment worker

  This guide describes how to build a worker with any generic sandboxing platform. Additional, platform-specific guides are available for [AWS Lambda MicroVMs](https://docs.aws.amazon.com/lambda/latest/dg/microvms-integrations-claude-managed-agents.html), [Blaxel](https://docs.blaxel.ai/Tutorials/Claude-Managed-Agents), [Cloudflare](https://developers.cloudflare.com/sandbox/claude-managed-agents/), [Daytona](https://www.daytona.io/docs/en/guides/claude/claude-managed-agents), [E2B](https://e2b.dev/docs/agents/claude-managed-agents), [Fly.io](https://docs.sprites.dev/integrations/claude-managed-agents/), [GKE Agent Sandbox](https://github.com/GoogleCloudPlatform/kubernetes-engine-samples/tree/main/ai-ml/anthropic-agent-sandbox), [Modal](https://github.com/modal-labs/claude-managed-agents-modal-sandbox), [Namespace](https://namespace.so/docs/integrations/claude), [Superserve](https://docs.superserve.ai/integrations/managed-agents/claude-managed-agents), and [Vercel](https://vercel.com/kb/guide/run-claude-managed-agent-tools-with-vercel-sandbox).

An environment worker is a process you run on your own infrastructure. It receives tool execution requests from Anthropic and runs them locally. The `self_hosted` environment acts as a work queue: when a [session](https://platform.claude.com/docs/en/managed-agents/sessions) is assigned to it, Anthropic enqueues the session as a work item. Your worker claims work items from that queue, spawns an execution context for each one, downloads the agent's [skills](https://platform.claude.com/docs/en/managed-agents/skills) (reusable, filesystem-based resources that give the agent domain-specific expertise), runs the tool calls, and posts the results back.

Work items are claimed by polling the environment's queue: either by an **always-on worker** that polls continuously, or a **webhook-triggered handler** that wakes on `session.status_run_started` and starts polling.

The CLI and SDK both ship pre-built workers. The `ant` CLI supports the always-on pattern only; the SDK supports both always-on and webhook-triggered. Both are configurable: see [Self-hosted worker](https://platform.claude.com/docs/en/managed-agents/reference#self-hosted-worker) in the reference for CLI flags, and [SDK helpers](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#sdk-helpers) on this page for the SDK options. For more control, call the [Environments Work endpoints](https://platform.claude.com/docs/en/api/beta/environments/work) directly and implement your own worker.

### Sandbox filesystem

* **`/workspace`:** the system default working directory for tool execution and skill download. The CLI's `--workdir` flag defaults to the current directory; pass `--workdir /workspace` to match the system default. Skills are downloaded to `<workdir>/skills/<name>/`. If you use a different working directory, update your agent's system prompt so Claude can locate the skill files.
* **Outputs:** on self-hosted environments the session's system prompt omits the `/mnt/session/outputs` instruction used on Anthropic-managed sandboxes, so final deliverables land wherever the agent writes them in your sandbox filesystem, typically under the working directory.
* **`/mnt/memory/`:** memory stores attached to the session are materialized here by the SDK worker, one directory per store at the store's `mount_path` (for example, `/mnt/memory/user-preferences/`). The worker creates these directories when it claims the session and removes them when the session ends; see [Use memory stores](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#use-memory-stores).
