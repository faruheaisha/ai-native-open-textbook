---
title: "Agent Note: Unified session query service"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/architecture/2026-07-23-unified-session-query-service.md"
sourceRel: ".agents/notes/archived/architecture/2026-07-23-unified-session-query-service.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/architecture/2026-07-23-unified-session-query-service.md"
sourceSha256: "28d003686f29ec5e072e51e73da353575bcdcba5af20fefdfad88340e1ddd32c"
pageSha256: "28d003686f29ec5e072e51e73da353575bcdcba5af20fefdfad88340e1ddd32c"
contentMode: "local-full"
zh: ""
---

# Agent Note: Unified session query service

Status: implemented
Archived: 2026-07-26

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-architecture-2026-07-23-unified-session-query-service.zh)

## Problem

Exact reads, semantic filters, relationship traces, and full-text search operate on the same live-preferred session corpus. Exposing full-text search under a second context key makes consumers and app compositions treat one capability as two services, even though the SQLite implementation is the only backend-specific part.

The interface package already owns the shared record, filter, trace, search-request, cursor, and error contracts. A provider registry or coordinator would add runtime selection semantics unsupported by any current consumer.

## Decision

`SessionQueryService` is the single abstract service registered as `ctx.sessionQuery`. It concretely implements listing, title and event reads, surface reads, filtering, and relationship tracing through its backend-independent `SessionCorpus`. Its only abstract methods are `searchSessions()` and `searchEvents()`.

`SessionQuerySqlite` extends that service and is the sole concrete backend. One mounted instance therefore exposes every operation through `ctx.sessionQuery`; its inherited exact operations use the shared corpus implementation, while its SQLite-owned lifecycle observes sources, reconciles the derived FTS index, ranks matches, and owns cursor generations. The interface package has no standalone concrete plugin, search-provider registry, or second context key.

SQLite reconciliation is one quiescent serialized state machine. It passes the caller's exact abort signal into durable snapshot listing and inspection, awaits each started backend operation itself, and checks cancellation after every await and before starting the next source or index operation. Cancellation therefore cannot release the serializer while an ignored or cooperative backend call is still cleaning up, and it cannot start a subsequent listing, inspection, reconciliation, or query after the signal is observed.

Backend configuration includes the inherited `readWindowMax` setting alongside its own index path, journal mode, page limits, and snippet limit. First-party apps that need session queries mount the SQLite backend and place its disposable index beside their configured persistence root.

This service topology supersedes the separate-key portion of the [exact query decision](/lib/09-harness/deepseek-harness/_agents-notes-archived-feature-2026-07-10-session-query-service) and [SQLite search decision](/lib/09-harness/deepseek-harness/_agents-notes-archived-feature-2026-07-10-sqlite-session-query-provider); their corpus, query, tokenizer, reconciliation, and safety decisions remain in force.

## Alternatives considered

- **Keep `ctx.sessionQuery` and `ctx.sessionSearch` separate** — rejected because both expose operations over one logical corpus, force consumers to discover two keys, and let apps accidentally mount only a partial query surface.
- **Keep a concrete base service and let the SQLite plugin register or mutate two search methods** — rejected because method availability would depend on plugin order and teardown, and the service would need a provider registration protocol for one implementation.
- **Move every query implementation into the SQLite package** — rejected because exact reads, filters, and traces require no index and are shared behavior that belongs with their provider-independent contracts.

## Consequences

Consumers inject one service and can combine exact and full-text operations without a second capability lookup. A production composition must choose a concrete backend even when one consumer currently calls only inherited exact methods; tests may use a minimal subclass when backend behavior is outside their scope.

The unified object deliberately retains two internal observation strategies: exact operations read authoritative live/persisted sources per call, while full-text operations reconcile a disposable index. Sharing the context key does not make the derived index authoritative or couple exact-read availability to an FTS query.

Queued cancellation remains prompt. Cancellation during active asynchronous source observation waits for that started operation to settle, which makes rejection a quiescence boundary and preserves single-file execution for a following search. Synchronous SQLite statements remain non-preemptible and are bracketed by signal checks.

Unit coverage pins inherited and abstract behavior on one key, SQLite coverage exercises both operation families on the concrete backend, and the real Loader path verifies that one exported plugin registers the combined service.
