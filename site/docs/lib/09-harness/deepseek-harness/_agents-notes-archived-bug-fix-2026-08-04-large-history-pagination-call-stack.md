---
title: "Agent Note: Large history provenance is scanned without argument expansion"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/bug-fix/2026-08-04-large-history-pagination-call-stack.md"
sourceRel: ".agents/notes/archived/bug-fix/2026-08-04-large-history-pagination-call-stack.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/bug-fix/2026-08-04-large-history-pagination-call-stack.md"
sourceSha256: "38c5afd347b131abd6b73634d25210d593bcb1fd72c7ba501bad0b33fb639810"
pageSha256: "38c5afd347b131abd6b73634d25210d593bcb1fd72c7ba501bad0b33fb639810"
contentMode: "local-full"
zh: ""
---

# Agent Note: Large history provenance is scanned without argument expansion

Status: implemented
Archived: 2026-08-22

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-bug-fix-2026-08-04-large-history-pagination-call-stack.zh)

## Problem

A finalized assistant message can reference hundreds of thousands of streamed chunks through `sourceEventSeqs`. History pagination found the message group's first event with `Math.min(event.seq, ...sourceEventSeqs)`, so a valid session could exceed the JavaScript engine's function-argument limit and make `session.history` fail with HTTP 500.

## Decision

Pagination scans `sourceEventSeqs` and updates the earliest sequence number one element at a time. The algorithm remains linear in the provenance size and preserves the existing page boundary: a page starts before all recorded sources of its oldest included message.

A regression test rejects multi-argument minimum calls and verifies that every provenance event remains on the page with its finalized message. This exercises the failure mechanism without making the default test suite allocate a production-sized chunk stream.

## Alternatives considered

- **Raise the JavaScript stack or argument limit** — rejected: the limit is engine- and deployment-dependent, and array expansion still makes valid history depend on an unrelated runtime ceiling.
- **Truncate `sourceEventSeqs` during pagination** — rejected: this could cut a page inside a message and violate replay grouping.
- **Cap streamed chunk count at the provider boundary** — rejected: providers may legitimately emit long streams, and pagination must handle every valid session representation.

## Consequences

- Large provenance arrays no longer make history pagination throw solely because of their length.
- Pagination semantics and wire responses are unchanged.
- This does not bound the byte size of a history page or the browser cost of replaying it; those performance concerns remain separate from the server-side call-stack failure.
