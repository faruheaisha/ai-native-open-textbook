---
title: "Error reference"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/errors.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/errors.md"
sourceSha256: "b8944f28bfea74456c2960ba67f375c1d39afd34fb474e956bea3d64744e6604"
pageSha256: "d170c2a813ee3f87a12054db312780de0f48fe1274a9ca1f286fe341596fada8"
contentMode: "local-full"
zh: ""
---

# Error reference

> Look up Claude Code runtime error messages with what each one means and how to fix it.

This page lists runtime errors Claude Code displays and how to recover from each one, plus what to check when responses seem off without an error. For installation errors such as `command not found` or TLS failures during setup, see [Troubleshoot installation and login](https://code.claude.com/docs/en/troubleshoot-install).

Except for [Wrapper and IDE errors](#wrapper-and-ide-errors), which the launching program prints rather than Claude Code itself, these errors and recovery commands apply across the CLI, the [Desktop app](https://code.claude.com/docs/en/desktop), and [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web), since all three wrap the same Claude Code CLI. For other surface-specific issues, see the troubleshooting section on that surface's page.

  Claude Code calls the Claude API for model responses, so most runtime errors map to an underlying API error code. This page covers what each error means inside Claude Code and how to recover. For the raw HTTP status code definitions, see the [Claude Platform error reference](https://platform.claude.com/docs/en/api/errors).

## 本篇目录

- [Find your error](https://code.claude.com/docs)
- [Automatic retries](https://code.claude.com/docs)
- [Server errors](https://code.claude.com/docs)
- [Usage limits](https://code.claude.com/docs)
- [Authentication errors](https://code.claude.com/docs)
- [Network and connection errors](https://code.claude.com/docs)
- [Request errors](https://code.claude.com/docs)
- [Installation errors](https://code.claude.com/docs)
- [Command-line errors](https://code.claude.com/docs)
- [Plugin errors](https://code.claude.com/docs)
- [Tool errors](https://code.claude.com/docs)
- [Background session errors](https://code.claude.com/docs)
- [Wrapper and IDE errors](https://code.claude.com/docs)
- [Rewind warnings and errors](https://code.claude.com/docs)
- [Session saving warnings](https://code.claude.com/docs)
- [Configuration warnings](https://code.claude.com/docs)
- [Responses seem lower quality than usual](https://code.claude.com/docs)
- [Report an error](https://code.claude.com/docs)
