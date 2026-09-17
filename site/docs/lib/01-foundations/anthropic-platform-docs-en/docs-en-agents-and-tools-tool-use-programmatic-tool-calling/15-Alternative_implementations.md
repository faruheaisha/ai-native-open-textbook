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
sourceRel: "docs/en/agents-and-tools/tool-use/programmatic-tool-calling.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/programmatic-tool-calling.md"
sourceSha256: "5256f453318138b7eb03910688ec74c8df7cbe541509c6528bbd721e702f7df1"
pageSha256: "d7a791613eab6a89a37e8804d48a02c4b78511c7c14d1ac908af3a678abbf93d"
contentMode: "local-full"
zh: ""
---

## Alternative implementations

Programmatic tool calling is a generalizable pattern that can also be implemented on your own infrastructure. Here's how the approaches compare:

### Client-side direct execution

Provide Claude with a code execution tool and describe what functions are available in that environment. When Claude invokes the tool with code, your application executes it locally where those functions are defined.

**Advantages:**

* Minimal re-architecting of your application
* Full control over the environment and instructions

**Disadvantages:**

* Executes untrusted code outside of a sandbox
* Tool invocations can be vectors for code injection

**Use when:** Your application can safely execute arbitrary code, you want the smallest implementation, and Anthropic's managed offering doesn't fit your needs.

### Self-managed sandboxed execution

Same approach from Claude's perspective, but code runs in a sandboxed container with security restrictions (for example, no network egress). If your tools require external resources, you'll need a protocol for executing tool calls outside the sandbox.

**Advantages:**

* Safe programmatic tool calling on your own infrastructure
* Full control over the execution environment

**Disadvantages:**

* Complex to build and maintain
* Requires managing both infrastructure and inter-process communication

**Use when:** Security is critical and Anthropic's managed solution doesn't fit your requirements.

### Anthropic-managed execution

Anthropic's programmatic tool calling is a managed version of sandboxed execution with an opinionated Python environment tuned for Claude. Anthropic handles container management, code execution, and secure tool invocation communication.

**Advantages:**

* Safe and secure by default
* Enabled with a tool definition, with no infrastructure to run
* Environment and instructions optimized for Claude

Consider using Anthropic's managed solution if you're using the Claude API, [Claude Platform on AWS](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws), or [Microsoft Foundry](https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry). On Microsoft Foundry, programmatic tool calling requires a [Hosted on Anthropic deployment](https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry#additional-features-not-supported-when-hosted-on-azure).
