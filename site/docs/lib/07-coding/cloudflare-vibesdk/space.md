---
title: "@space-do/space"
sourceId: "07-coding/cloudflare-vibesdk"
sourceTitle: "Cloudflare VibeSDK"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/cloudflare/vibesdk"
entryUrl: "https://github.com/cloudflare/vibesdk/blob/9da158d82c597a0e8f4bf033cdccd1053fb6fb15/space/README.md"
sourceRel: "space/README.md"
rawUrl: "/raw/07-coding/cloudflare-vibesdk/space/README.md"
sourceSha256: "badda60828a86be5acd95f263dce4398c805f47a537417d03474063bf08a748c"
pageSha256: "badda60828a86be5acd95f263dce4398c805f47a537417d03474063bf08a748c"
contentMode: "local-full"
zh: ""
---

# @space-do/space

A reusable Cloudflare Durable Object class — `SpaceDO` — that provides an
isolated workspace and files with preview and deploy support on the Workers
runtime. It is the file/preview/deploy backend used by VibeSDK's ThinkAgent;
the agentic loop itself is powered by `@cloudflare/think`.

## Install

```bash
npm install @space-do/space
```

Peer expectations: `compatibility_date >= 2024-09-23` and
`compatibility_flags = ["nodejs_compat"]`. The class uses SQLite-backed
Durable Object storage and a `LOADER` Worker Loader binding for Dynamic Worker
previews. Set `ENABLE_ARTIFACTS="true"` with an `ARTIFACTS` binding to use
Cloudflare Artifacts for git/version history; otherwise SpaceDO uses its
SQLite-backed workspace filesystem.

## Usage

Re-export `SpaceDO` from your worker entrypoint and declare it in
`wrangler.toml`:

```ts
// src/worker.ts
import type { Env } from "@space-do/space"
export { SpaceDO } from "@space-do/space"
```

```toml
[[durable_objects.bindings]]
name = "SPACE_DO"
class_name = "SpaceDO"

[[artifacts]]
binding = "ARTIFACTS"
namespace = "your-artifacts-namespace"

[[worker_loaders]]
binding = "LOADER"

[[migrations]]
tag = "v1"
new_sqlite_classes = ["SpaceDO"]
```

Each named `SpaceDO` instance is an isolated workspace and file layer. Its
filesystem backend is selected when the instance is first initialized and
remains pinned for that app: `ENABLE_ARTIFACTS="true"` selects Artifacts for
git/version history, while the default uses the SQLite workspace filesystem.
Changing the flag affects only newly-created spaces. Address SpaceDO by
forwarding a `Request` to a stub from `env.SPACE_DO.get(...)`, or call its typed
RPC methods directly via DO RPC.

## HTTP contract

| Path | Notes |
|---|---|
| `GET\|POST /repo.git/*` | Git Smart HTTP backed by Artifacts synchronization |
| `* /preview/:branch[/*]` | Dynamic Worker preview for a deployed branch |
| `* /*` | Typed workspace, git, deploy, rollback, and inspection operations |

## App database inspector

The generated app exports `class App extends DurableObject`. `SpaceDO` hosts
it as a Facet with isolated SQLite storage and exposes inspection through the
`listAppTables`, `queryAppTable`, and `wipeAppDatabase` RPC methods. The result
types are exported for typed consumers:

```ts
import type {
  AppDatabaseTable,
  AppDatabaseColumn,
  AppDatabaseReadResult,
} from "@space-do/space"
```

## Building

```bash
npm run build       # esbuild → dist/index.js
npm run typecheck
```
