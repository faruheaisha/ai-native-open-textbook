---
title: "Self-hosted environments reference"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/self-hosted-environments-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/self-hosted-environments-reference.md"
sourceSha256: "4739e5cb92adb1b34c04e2d5a81861d3f93cd8358bc7504aa5de16b03690d782"
pageSha256: "808190c33f48395ada2edce9b05b7c0bcbfbfd22a0be92f3a8fe332910d488b3"
contentMode: "local-full"
zh: ""
---

# Self-hosted environments reference

> Complete reference for the self-hosted runner and orchestrator: CLI flags, environment variables, and Prometheus metrics.

  Self-hosted environments are in public beta on Team and Enterprise plans; an [Owner](https://code.claude.com/docs/en/cloud-environments#organization-shared-environments) enables them by turning on **Allow self-hosted environments** on the [**Cloud environments** admin page](https://claude.ai/admin-settings/cloud-environments). This page is the flag and metric reference; see the [quickstart](https://code.claude.com/docs/en/self-hosted-environments-quickstart) for setup and [Deploy to production](https://code.claude.com/docs/en/self-hosted-environments-deploy) for the fleet recipes.

This page is the reference for the two processes you run in a [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments): the runner, which executes Claude Code [cloud sessions](https://code.claude.com/docs/en/claude-code-on-the-web) on your hosts, and the optional autoscaling orchestrator, which starts runners as sessions queue. Each has its own flag table. Both run on Linux or macOS hosts, which the defaults such as `/workspace` and `~/.claude` assume. Run `claude self-hosted-runner --help` for the authoritative list on your installed version.

Metric series and a few API fields still use `pool` for what these pages call an environment; both terms name the same thing. The environment ID is the `pool_id` field, with the form `ccpool_...`: wherever these pages show a `pool` identifier, it names the environment. CLI flags and environment variables spell it `environment`, such as `--environment-secret-file`; the deprecated `pool` spellings still work, as the [`--environment-secret-file` row](#runner-cli-flags) describes.

## 本篇目录

- [Runner CLI flags](https://code.claude.com/docs)
- [Orchestrator CLI flags](https://code.claude.com/docs)
- [Environment-variable-only settings](https://code.claude.com/docs)
- [Telemetry](https://code.claude.com/docs)
- [Health endpoint](https://code.claude.com/docs)
- [Prometheus metrics](https://code.claude.com/docs)
- [What's next](https://code.claude.com/docs)
