---
title: "DeepSeek Harness"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/bug-fix/2026-07-31-code-runtime-python-settlement-fixes.md"
sourceRel: ".agents/notes/archived/bug-fix/2026-07-31-code-runtime-python-settlement-fixes.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/bug-fix/2026-07-31-code-runtime-python-settlement-fixes.md"
sourceSha256: "c728533d06835a851704357d997d736b4f31ae75c314af5343c209ee0429e9a6"
pageSha256: "607c98ecd92e0aa855313e5641adec517c4ffae294fdf3684505178a555b3a3f"
contentMode: "local-full"
zh: ""
---

## Consequences

Interpreter misconfiguration fails before the service is published, every run uses the executable selected at load, and the child receives only `TMPDIR`, removing macOS startup noise without exposing host credentials. The private provider remains absent from shipped profiles while a keyless Loader snapshot pins its source-checkout PTC composition.

The seam's resolve-don't-reject contract holds on the boot-write path and the synchronous-spawn-failure path, both with measured coverage, and neither strands a staging directory. Log capture is thread-safe at the cost of one re-entrant lock acquisition per write and flush, and stray native output is delimited by its own newlines rather than by transport chunks. Fd-3 residual memory is bounded by the actual retained bytes, and both frame readers scan an accumulating frame once rather than quadratically. The output caps admit every value a frame can carry and reject a non-integer budget at load. Disposal is genuinely quiescent against a same-group survivor — bounded by `graceMs + 2 * CLOSE_REAP_MARGIN_MS`, zero-cost when the group is already empty, with the SIGKILL timer cleared once the group empties so a stale kill cannot strike a recycled pgid — RLIMIT enforcement keeps the strictest of configured and inherited on both soft and hard (and the SIGXCPU diagnostic no longer names a budget the host cannot guarantee), bindings called from model-created threads complete instead of timing out, and the handshake frame reader no longer burns the CPU budget on a large program. Every behavioral fix carries a test that fails without it, except the eleven called out in the Problem section — the chunked frame read (a syscall-count improvement), the confirmed-empty finalize (whose only seam-observable effect freezes at signal delivery, which the pre-fix code also produced), the shared stdout/stderr budget (whose only seam-observable difference turns on nondeterministic cross-pipe arrival timing), the `flush_line` reorder (whose lowered peak stays within what the 12x gate already admits, so no config behaves differently), pacing binding replies (the 32.0 MiB → 0.0 MiB peak reduction lives inside the host's fd-3 writable buffer, unmeasurable through the seam), dropping a late binding resolution before snapshot (its three assertions all hold pre-fix, so it is not a fail-before case), the done-value TOCTOU pre-encoding (its concurrent-mutation race is not deterministically constructible through the seam, and the daemon-mutation regression's only assertion is probabilistic), the stray-UTF-8 budget-flush retention (a budget flush landing on a multibyte boundary is not schedulable through the seam — v8-ignored), and the late-rejection settled guard (a rejection arriving after settlement is not deterministically constructible from the seam), and the log-fragment seal (its 25 M-scale OOM is not deterministically constructible in CI), and the unknown-binding preview cap (its whole-target `JSON.stringify` peak is a transient allocation inside the reply path, unmeasurable through the seam) — so a future regression on the rest goes red.
