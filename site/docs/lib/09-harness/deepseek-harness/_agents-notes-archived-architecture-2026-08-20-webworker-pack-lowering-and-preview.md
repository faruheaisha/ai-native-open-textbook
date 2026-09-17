---
title: "Agent Note: pack-time lowering and the single-build preview"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/architecture/2026-08-20-webworker-pack-lowering-and-preview.md"
sourceRel: ".agents/notes/archived/architecture/2026-08-20-webworker-pack-lowering-and-preview.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/architecture/2026-08-20-webworker-pack-lowering-and-preview.md"
sourceSha256: "1693b19ab246a08076a01b3e58757be8b06a4e2c01034c4f100cb9083830f907"
pageSha256: "1693b19ab246a08076a01b3e58757be8b06a4e2c01034c4f100cb9083830f907"
contentMode: "local-full"
zh: ""
---

# Agent Note: pack-time lowering and the single-build preview

Status: implemented
Archived: 2026-09-04

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-architecture-2026-08-20-webworker-pack-lowering-and-preview.zh)

## Problem

The browser worker can neither compile modules at load nor be served by the product webserver: every module body must arrive runnable, and the page must be a static artifact. Both surfaces drifted early. The loader carried a fallback compiler, so a collector gap surfaced as a slow boot instead of a broken image — and `acorn` rode into `lib/worker.js` through the package barrel, a parser a runtime that only wraps pre-lowered bodies never needs. The preview was a second HTML template beside the served one, a page the served index could silently drift away from.

## Decision

**Lowering happens at pack time only.** `@deepseek-ai/dsh-experimental-webworker-packer` composes the profile, materializes the closure, and lowers every JavaScript body; `LOWERING_VERSION` and `WRAPPER_PARAMS` are the pack↔worker contract and live in `src/image-layout.ts` beside the rest of the image layout. The loader wraps bodies exactly as the image holds them: a body still carrying module syntax is a refusal naming the image, and `startWorkerHost` requires the manifest's `lowered` to equal this build's contract before it mounts a single module. `lowerModuleSource` is the transform's only face and the packer its only caller; the same parse feeds reachability with statically named imports, re-exports, and dynamic imports, calls through `require`, and module-scope direct calls of the form `createRequire(import.meta.url)('pkg')` through a named `node:module` or `module` import. Stored results, CommonJS-obtained `createRequire`, computed request names, and other bases stay runtime-only; targets reachable only through those forms require image entry seeds. Inside the worker graph, imports name the module that owns the value — never the package barrel, which is the edge that smuggled the parser in. Source-directory exclusion applies only to workspace and vendored packages whose runtime plane is built `lib/`; installed third-party packages retain JavaScript under `src/` and `dist/` because their published entrypoints may resolve there.

**The preview is the served page plus one tag.** One Vite build emits `dist/index.html` and `dist/preview.html` sharing every chunk; the only difference is a prepended bootstrap entry whose module connects the worker host. Startup then converges on one protocol: whichever side applies the injection table settles the `__DSH_BOOT_READY__` deferred — the served renderer resolves it in a tail script after the rendered rows, the worker bootstrap installs it before its first await and settles it after the last row — and the client entry awaits it before reading any injected state, so the chain from the stock entry onward is the served chain verbatim. Plugin combo scripts and maps travel through the tunnel; the page-side loader embeds each tunnel-only map as a Base64 data URL before executing its script Blob, preserving indexed-map component names in DevTools without another object-URL lifetime. The build uses a relative base so the output mounts under any static directory; the served form anchors deep SPA-fallback paths by rendering `<base href="/">` at serve time, keeping the on-disk pages byte-shared.
