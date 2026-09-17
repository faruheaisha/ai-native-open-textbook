---
title: "Codex SDK"
sourceId: "09-harness/openai-codex-docs-official"
sourceTitle: "openai-codex-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://learn.chatgpt.com/docs"
entryUrl: "https://learn.chatgpt.com/docs"
sourceRel: "docs/codex-sdk.md"
rawUrl: "/raw/09-harness/openai-codex-docs-official/docs/codex-sdk.md"
sourceSha256: "1ff5e1a4b61044bae464f757ceb814e9c5d2736188cb30bec5703274515bf889"
pageSha256: "1ff5e1a4b61044bae464f757ceb814e9c5d2736188cb30bec5703274515bf889"
contentMode: "local-full"
zh: ""
---

# Codex SDK

> For the complete documentation index, see [llms.txt](https://learn.chatgpt.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

If you use Codex through Codex CLI, the IDE extension, or Codex cloud, you can also control it programmatically.

Use the SDK when you need to:

- Control Codex as part of your CI/CD pipeline
- Create your own agent that can engage with Codex to perform complex engineering tasks
- Build Codex into your own internal tools and workflows
- Integrate Codex within your own application

Use the Codex SDK to automate coding tasks, including jobs in CI. Use the [Codex app server](https://learn.chatgpt.com/docs/app-server) to build custom clients that handle authentication, conversation history, approvals, and streamed agent events.

`codex mcp-server` is deprecated. The [MCP server guide](https://learn.chatgpt.com/docs/mcp-server) remains available for existing integrations.

If you have beta access and need repository or change scans with structured
security findings and coverage, use the [Codex Security TypeScript
SDK](https://learn.chatgpt.com/docs/security/sdk).

## TypeScript library

The TypeScript library lets your application start, continue, and resume local Codex threads.

Use the library server-side; it requires Node.js 18 or later.

### Installation

To get started, install the Codex SDK using `npm`:

```bash
npm install @openai/codex-sdk
```

### Usage

Start a thread with Codex and run it with your prompt.

```ts

const codex = new Codex();
const thread = codex.startThread();
const result = await thread.run(
  "Make a plan to diagnose and fix the CI failures"
);

console.log(result.finalResponse);
```

Call `run()` again to continue on the same thread, or resume a past thread by providing a thread ID.

```ts
// running the same thread
const result = await thread.run("Implement the plan");

console.log(result.finalResponse);

// resuming past thread
