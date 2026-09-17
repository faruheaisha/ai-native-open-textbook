---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/CONTEXT.md"
sourceRel: "CONTEXT.md"
rawUrl: "/raw/10-context-memory/get-shit-done/CONTEXT.md"
sourceSha256: "5339f8a1f2c77cfdd65b419f1126cfd9d409f8ad3b5dbe31a8b51a34aff5d7d5"
pageSha256: "9ec3f5a6518068baa0e597519f9d8547a40673e3a06eb98c28c5a2a01177f2c4"
contentMode: "local-full"
zh: ""
---

## Executor failure classification (#3095 / PR #3490)

`EXEC.CLASSIFY.handler=sdk/src/query/agent-failure-classifier.ts (registered in command-static-catalog-foundation.ts DECISION_ROUTING_STATIC_CATALOG and command-manifest.non-family.ts mutation:false outputMode:json)`
`EXEC.CLASSIFY.workflow=get-shit-done/workflows/execute-phase.md step 7; class-distinct prompts (quota-to-wait-for-reset; classify-handoff-bug-to-spot-check; unknown-to-continue/stop)`
`EXEC.CLASSIFY.classes=\{class:'quota-exceeded'|'classify-handoff-bug'|'unknown-failure', sentinel?, retryAfterSeconds?\}`
`EXEC.CLASSIFY.sentinel-order=most specific first: 429 beats too-many-requests; quota beats resource_exhausted; case-insensitive; canonical sentinel value is lower-cased form`
`EXEC.CLASSIFY.cross-runtime=Anthropic/CC: usage limit|rate limit|quota|429|retry-after; Copilot CLI: rate_limit (stem); Codex CLI: 429|usage_limit_reached|too many requests; Gemini CLI: RESOURCE_EXHAUSTED|exceeded your`
`EXEC.CLASSIFY.precedence=quota sentinel wins over classifyHandoffIfNeeded bug when both appear`
`EXEC.CLASSIFY.retry-after-parser=\bretry[-_ ]after[:\s]+(\d+)\b avoids embedded-word false matches like noretry-after`
`EXEC.CLASSIFY.proactive-signal-not-usable=Anthropic exposes anthropic-ratelimit-* headers + Agent SDK RateLimitEvent; Claude Code subprocess does NOT forward to hooks/statusline today (upstream #33820, #22407, #32796)`

`DEFECT.GSD-TEST-MIRROR-POISONED.symptom=gsd-test-summary --both exits docker=23 (rsync partial transfer) with mkstemp Permission denied on remote mirror files; mirror has root-owned artifacts from prior cold runs`
`DEFECT.GSD-TEST-MIRROR-POISONED.detect=docker stderr shows rsync: [generator] delete_file: unlink(...) failed: Permission denied (13) OR [receiver] mkstemp ".gsd-*.<suffix>" failed`
`DEFECT.GSD-TEST-MIRROR-POISONED.root-cause=container ran without --user; build:hooks wrote into bind-mount as root; chown-back-before-exec patch closes forward path but not legacy hosts`
