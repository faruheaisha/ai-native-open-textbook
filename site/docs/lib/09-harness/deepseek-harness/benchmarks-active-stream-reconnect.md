---
title: "Active Assistant reconnect benchmark"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/benchmarks/active-stream-reconnect/README.md"
sourceRel: "benchmarks/active-stream-reconnect/README.md"
rawUrl: "/raw/09-harness/deepseek-harness/benchmarks/active-stream-reconnect/README.md"
sourceSha256: "7b8e50c2cc35019b918ad3b39eab0732df0b43512ddf4040557b518c66d140fa"
pageSha256: "7b8e50c2cc35019b918ad3b39eab0732df0b43512ddf4040557b518c66d140fa"
contentMode: "local-full"
zh: ""
---

# Active Assistant reconnect benchmark

English | [中文](/lib/09-harness/deepseek-harness/benchmarks-active-stream-reconnect-README.zh)

[reconnect.bench.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/benchmarks/active-stream-reconnect/reconnect.bench.client.ts) measures the production Client fold when a reconnect carries an unfinished 100,000-delta reasoning prefix. A compiled private adapter reaches `ClientAssistantStream.replace()` without adding product exports. Three fresh plain-Node workers synthesize the compact baseline before timing; replacement time and retained heap after forced GC have separate median budgets. The next dense live frame must still be accepted. Standard hosted CI uses a 50 ms replacement expectation with the shared 1.25× headroom (63 ms ceiling); the retained-heap budget remains 30 MiB. Recorded-sample and synthetic-regression controls exercise the same time assertion as the worker verdict.

Build with `pnpm run build:bench`, then select `benchmarks/active-stream-reconnect` in `vitest.bench.config.ts`. This focused Node workload neither builds nor measures browser rendering. [Frontend performance budgets](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/implemented/testing/2026-09-06-frontend-performance-budgets.md) records calibration and exclusions.
