---
title: "Claude apps gateway configuration"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/claude-apps-gateway-config.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/claude-apps-gateway-config.md"
sourceSha256: "3257bfe37d57f4673a2bd0a0cd20daf9780ff3a718ac81280970d97368c04245"
pageSha256: "956ea0710b6cc1d6eddfa5aa4f757b0d2299ccf35084676332767b4d9de8b369"
contentMode: "local-full"
zh: ""
---

# Claude apps gateway configuration

> Reference for every gateway.yaml option: listener and TLS, OIDC, session, Postgres store, Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, and Microsoft Foundry upstreams, model routing, managed policies, and telemetry.

A Claude apps gateway deployment is configured by one YAML file, conventionally `gateway.yaml`. The file defines everything the gateway does: where it listens, how developers sign in, where inference goes, and which policies and telemetry apply. This page is the reference for every option in that file.

To write your first one, start from the [quickstart](https://code.claude.com/docs/en/claude-apps-gateway#quickstart), which builds a minimal working config and runs it. Once you have a config you're happy with, the [deployment guide](https://code.claude.com/docs/en/claude-apps-gateway-deploy) covers containerizing and hosting it on Kubernetes, Cloud Run, or your own platform.

The gateway reads the file once, at startup, with `claude gateway --config /path/to/gateway.yaml`. Every option is validated against a schema at boot, so a malformed config fails at start with a field-level error rather than at first use.

The [complete example](#complete-example) at the end of this page exercises every section.

## 本篇目录

- [File structure](https://code.claude.com/docs)
- [Secret expansion](https://code.claude.com/docs)
- [Required sections](https://code.claude.com/docs)
- [Optional sections](https://code.claude.com/docs)
- [Complete example](https://code.claude.com/docs)
- [Client-side managed settings](https://code.claude.com/docs)
- [Related](https://code.claude.com/docs)
