---
title: "Agent Note: Explicit Web index paths and 404 static misses"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/bug-fix/2026-08-20-explicit-web-index-paths.md"
sourceRel: ".agents/notes/archived/bug-fix/2026-08-20-explicit-web-index-paths.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/bug-fix/2026-08-20-explicit-web-index-paths.md"
sourceSha256: "a4e7ce37c340b4546fd3e65c360bf02ed416483655349dbb1a4df2db108c6714"
pageSha256: "a4e7ce37c340b4546fd3e65c360bf02ed416483655349dbb1a4df2db108c6714"
contentMode: "local-full"
zh: ""
---

# Agent Note: Explicit Web index paths and 404 static misses

Status: implemented
Archived: 2026-09-04

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-bug-fix-2026-08-20-explicit-web-index-paths.zh)

## Problem

An unconditional SPA fallback makes every unmatched GET or HEAD request look successful. A broken ordinary link and a missing JavaScript, stylesheet, source map, or manifest then receive the HTML shell with status 200, so browsers, caches, and monitoring cannot distinguish a valid page entry from an absent resource.

## Decision

`dsh-host-frontend-static` renders `index.html` only when the normalized target is the dist root or the configured index path. The current Web client has no History API pathname routes; query strings do not change pathname matching, and URL fragments never reach the server. Existing files are served normally, while `ENOENT`, `EISDIR`, and `ENOTDIR` reads produce an empty 404 response with no content type. Other filesystem failures are rethrown to the webserver's request-failure handling instead of being mislabeled as absence.

GET and HEAD use the same status and content type for index entries, files, and misses. Named routes still match before the fallback, traversal outside the dist root remains 403, and non-GET/HEAD requests reaching the fallback remain 405.

## Alternatives considered

**Infer page routes from the absence of a file extension.** A file extension does not declare a client route: this would still turn unknown ordinary paths into successful pages, reject any future dotted client route, and mishandle extensionless static files when they are absent.

**Use an `Accept: text/html` request header as the fallback rule.** The header expresses representation preference, not whether the pathname is a declared client route. Browser fetches, bots, and monitors may request HTML for an invalid path, so the same false-success behavior remains.

**Add a configurable pathname allowlist.** No current client route consumes such configuration. A future History API router can add an explicit server rule or configuration field together with the route that requires it, without preserving a speculative public option.

## Consequences

Broken links and missing assets have distinct HTTP state that caches and monitoring can observe, and an asset loader cannot execute the HTML shell as JavaScript. A future pathname-based client route returns 404 until its server entry rule and real-composition coverage land in the same change. The frontend-static real Loader test pins GET/HEAD parity for index entries, existing assets, ordinary misses, and resource misses; it also covers API-like paths, traversal, malformed targets, unsupported methods, and fallback disposal.
