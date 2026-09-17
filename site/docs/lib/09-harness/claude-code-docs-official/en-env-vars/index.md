---
title: "Environment variables"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/env-vars.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/env-vars.md"
sourceSha256: "9b1792540478648e4ff9cdd48c6e17a321d70a401812c1fc557b74c9080a7b5f"
pageSha256: "1333101080511f40892844c794f832b9c6dd565d7415defdafc7d78ef38460d2"
contentMode: "local-full"
zh: ""
---

# Environment variables

> Reference for environment variables that control Claude Code behavior.

Environment variables can control Claude Code behavior such as model selection, authentication, request routing, and feature toggles. Many of the same behaviors can also be configured through a [settings file](https://code.claude.com/docs/en/settings) field, a [CLI flag](https://code.claude.com/docs/en/cli-reference), or an in-session command like `/model`.

This page covers how to:

* [Set environment variables](#set-environment-variables) in your shell or in a settings file
* [Check which value applies](#precedence) when a behavior can be set more than one way
* [Look up the variables Claude Code reads](#variables)
* [See which features stop working](#features-that-need-feature-flag-fetching) when a variable turns feature-flag fetching off

## 本篇目录

- [Set environment variables](https://code.claude.com/docs)
- [Precedence](https://code.claude.com/docs)
- [Variables](https://code.claude.com/docs)
- [Features that need feature-flag fetching](https://code.claude.com/docs)
- [See also](https://code.claude.com/docs)
