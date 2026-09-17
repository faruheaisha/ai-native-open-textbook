---
title: "Agent Note: Explicit model-facing tool order"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/feature/2026-07-06-explicit-tool-order.md"
sourceRel: ".agents/notes/archived/feature/2026-07-06-explicit-tool-order.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/feature/2026-07-06-explicit-tool-order.md"
sourceSha256: "3fda289680337fcd07067ff2461469dfb1649ac9610c4cd46f1fe0fc1795f9c2"
pageSha256: "3fda289680337fcd07067ff2461469dfb1649ac9610c4cd46f1fe0fc1795f9c2"
contentMode: "local-full"
zh: ""
---

# Agent Note: Explicit model-facing tool order

Status: implemented
Archived: 2026-09-04

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-feature-2026-07-06-explicit-tool-order.zh)

## Problem

Model-facing tool order followed plugin registration order, which depends on concurrent module loading for otherwise independent plugins. That race produced different request headers in CI and snapshot recordings. Because order affects request bytes, caching, and the durable header, it needs an explicit deterministic policy.

## Decision

The system-prompt assembly owns the canonical model-facing tool order, exactly where it already owns section order. `toolOrder?: string[]` on `dsh-system-prompt` is the optional explicit policy:

- A listed tool that is registered takes its listed position.
- A listed name with no registered tool is a configuration error. Shape errors (rest entry missing or duplicate names) fail from the service constructor; an unregistered name rejects every `assemble()` — the earliest moment the registered tool set exists to check against (tool plugins register after the service constructs), and the only universal one (registrations can change at any time; cordis has no "all plugins loaded" event). Under the shipped loop the first turn fails before any model request — see the consequences below for the exact blast radius.
