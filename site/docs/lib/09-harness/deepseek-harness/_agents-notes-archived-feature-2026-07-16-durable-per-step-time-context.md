---
title: "Agent Note: Durable per-step time context"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/feature/2026-07-16-durable-per-step-time-context.md"
sourceRel: ".agents/notes/archived/feature/2026-07-16-durable-per-step-time-context.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/feature/2026-07-16-durable-per-step-time-context.md"
sourceSha256: "2fd420bec9a40f7e2e4c7399176a243d193ec5e8e25328da1204361eecb1d1ec"
pageSha256: "2fd420bec9a40f7e2e4c7399176a243d193ec5e8e25328da1204361eecb1d1ec"
contentMode: "local-full"
zh: ""
---

# Agent Note: Durable per-step time context

Status: implemented
Archived: 2026-09-04

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-feature-2026-07-16-durable-per-step-time-context.zh)

## Problem

A request-only clock can tell the model the current time, but replacing that value in the system prompt removes the evidence behind earlier time-sensitive reasoning. Multi-step turns need requests to retain the readings used by preceding steps. The request must remain reconstructable after restart, and automatic compaction must account for the same timing context the model receives.

A process-local refresh cache makes displayed time depend on state that cannot survive resume. Browser-originated natural language also needs a request-owned zone: a server process zone cannot infer the user's locality, while a mutable Session or connection default lets travel or concurrent tabs reinterpret another prompt.

## Decision

`@deepseek-ai/dsh-time-context` is an opt-in function plugin in `packages/context/time-context/`. Default compositions leave its disclosure and token cost disabled; the Schedule Web overlay mounts it so the model can interpret otherwise-unqualified dates and times in the browser zone attached to the current request.

The plugin prepends an `agent/pre-step` listener and delegates first. When the downstream decision enters and a reading is due, it combines that decision's final messages with durable user messages already in the open turn, derives browser-zone provenance from exact `user-rpc` sources, and appends one reading to the decision. Rejection, listener failure, or an already-aborted signal records nothing. Steering claimed after the current batch keeps ordinary next-step ownership and receives a fresh reading when that step enters.

Each Web prompt samples the browser's IANA zone. The Host validates and canonicalizes it before binding it to the exact durable user-message source. One unique zone in the open turn resolves the request; multiple zones produce a sorted `mixed` result; no zone is `unavailable`. A resolved request tells the model to interpret unqualified dates and times in that zone. Mixed or unavailable provenance tells it to ask the user to clarify.

This message-bound provenance is not copied to `SessionHeader`, a connection default, or Schedule state. Time-context owns model guidance only. A tool accepting local calendar fields must still make its own explicit boundary; Schedule therefore requires `time_zone` rather than importing this plugin's reading ([decision](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/simplification/2026-08-09-explicit-schedule-time-zone.md)).

The resolved browser zone also formats the reading's timestamp. Mixed or unavailable requests use the configured `timeZone` fallback, or the Node process zone resolved once at plugin load when config is omitted, while retaining the clarify policy. Every fallback is validated through `Intl.DateTimeFormat`.

Each reading uses the exact snapshot source `\{ kind: 'plugin', plugin: 'time-context', form: 'snapshot', sections: [\{ name: 'time-context', text: <same text> \}] \}`. The invariant companion checks the snapshot shape, re-derives current-turn browser provenance from the original user-rpc messages, and validates the rendered timestamp zone and elapsed baseline.

The optional `refreshIntervalMs` config is a non-negative safe integer. Omission or `0` injects on every eligible entered step. A positive value scans raw Session events for the latest plugin reading and injects when none exists, wall time moved backward, or the event is old enough. The event timestamp governs after compaction and resume without a process-local cache. The Schedule Web overlay omits the interval so every request step gets current browser guidance.

### Text and elapsed baselines

A resolved first-step reading is:

```text
