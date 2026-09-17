---
title: "Codex Security CLI quickstart"
sourceId: "09-harness/openai-codex-docs-official"
sourceTitle: "openai-codex-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://learn.chatgpt.com/docs"
entryUrl: "https://learn.chatgpt.com/docs"
sourceRel: "docs/security/cli.md"
rawUrl: "/raw/09-harness/openai-codex-docs-official/docs/security/cli.md"
sourceSha256: "723159ab649a66ae57e965e74bcad24353a37b0724f85a7972e754c855cf3edf"
pageSha256: "723159ab649a66ae57e965e74bcad24353a37b0724f85a7972e754c855cf3edf"
contentMode: "local-full"
zh: ""
---

# Codex Security CLI quickstart

> For the complete documentation index, see [llms.txt](https://learn.chatgpt.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Codex Security helps security and engineering teams find, confirm, and fix
vulnerabilities. Use its command-line interface (CLI) to scan
repositories you own or have permission to assess, review findings over time,
and check changes before they land.

The `@openai/codex-security` package is public. Running scans requires Codex
  Security access. For an interactive scan in Codex, start with the [Codex
  Security plugin quickstart](https://learn.chatgpt.com/docs/security/plugin). For connected GitHub
  repositories, see [Codex Security cloud setup](https://learn.chatgpt.com/docs/security/setup).

## Check the prerequisites

The CLI requires Node.js 22 (22.13.0 or later), 24, or 26. Scans, bulk scans,
exports, scan history, and saved findings also require Python 3.10 or later.
For more detail, see [Authentication and
prerequisites](https://learn.chatgpt.com/docs/security/cli/reference#authentication-and-prerequisites).

## Set up and verify the CLI

Run the CLI with `npx` and check its version:

```bash
npx @openai/codex-security --version
```

To see both the package version and the version of its bundled plugin, run:

```bash
npx @openai/codex-security info --json
```

See the [CLI and SDK releases](https://github.com/openai/codex-security/releases)
for package changes.

List the available commands:

```bash
npx @openai/codex-security --help
```

See also [CLI reference](https://learn.chatgpt.com/docs/security/cli/reference).

## Sign in

For local use, sign in with your ChatGPT account:

```bash
npx @openai/codex-security login
```

On a remote or headless machine, use device authentication:

```bash
npx @openai/codex-security login --device-auth
```

For CI and other automated workflows, set an OpenAI API key:

```bash
