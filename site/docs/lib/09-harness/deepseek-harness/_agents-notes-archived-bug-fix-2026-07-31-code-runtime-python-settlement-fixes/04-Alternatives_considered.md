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
pageSha256: "9c98b0187a37fce83aa7d6a772c5d2c041f8ff6d12966b4519840e56bcec6669"
contentMode: "local-full"
zh: ""
---

## Alternatives considered

**Leave the boot-write `/* v8 ignore */` and fix only the ordering.** Rejected: the ignore is what let the TDZ regression ship uncaught. Removing it makes the catch a measured branch, so per-file 100% coverage now proves the failure path is exercised.

**Fix the flush race by capturing more bound methods.** Rejected: this is the approach that already failed. Binding a callable fixes reference resolution, not concurrent access to the mutable state the callable reads. Only mutual exclusion over the shared ledger closes the race.

**Guard the residual with a size threshold (copy only large frames).** Rejected: the branch runs once per newline-bearing read, the copy is bounded by the residual's own length (always a partial line), and a threshold adds a tunable and a second code path for no measurable saving. An unconditional right-sized copy is simpler and always correct.

**Assert the residual memory effect through the seam.** Rejected: the retained allocation is not observable through `CodeRunResult`, so a black-box test could not distinguish fixed from unfixed. Extracting `detachResidual` makes the backing-store invariant a deterministic unit test instead.

**Reap the same-group survivor with a fire-and-forget `unref`'d SIGKILL timer alone.** Rejected: an `unref`'d timer does not keep the host alive, so a host that exits within the grace window (a one-shot run, a config subprocess) never fires the SIGKILL and the survivor is reparented to init — the same "no subprocess outlives the fiber" violation in a different shape, and `teardown`'s "await each child's exit" JSDoc would be false. Awaiting the group's death on a ref'd poll keeps the host alive exactly long enough to reap, at zero cost in the common empty-group case.

**Assert the reap with `process.kill(pid, 0)` throwing ESRCH.** Rejected: a SIGKILL'd process lingers as a zombie until its parent `wait()`s it, and in a container whose PID 1 does not reap orphans the signal-0 probe keeps succeeding, so the assertion would false-fail cross-environment. A heartbeat file that stops advancing detects "no longer executing," which a reaped process and a zombie both satisfy.

**Complete the cross-loop Future with a plain `set_result` and rely on the GIL.** Rejected: the GIL serializes bytecode but does not make `asyncio.Future` cross-loop-safe — completing a Future from a thread other than its loop's does not schedule its callbacks or wake the loop. `call_soon_threadsafe` on the owning loop is the documented mechanism.

**Leave the SIGKILL timer armed after settlement (the earlier same-group fix).** Rejected: an unref'd timer left to fire up to `graceMs` after the leader was reaped can `kill(-pid)` a RECYCLED pgid, striking an unrelated group; the danger is the kill that succeeds, which `killGroup`'s ESRCH swallow cannot prevent. Clearing the timer once the group is confirmed empty bounds the reuse window to the genuine-survivor case, where the group is not empty to reuse.

**Clamp rlimits by the inherited hard limit only.** Rejected: that silently RAISES an inherited soft limit stricter than the request, loosening the very containment the clamp exists to preserve. Clamping each side against its own inherited bound (then pinning soft under hard) keeps the strictest of configured and inherited on both.

**Bill the host-side `capMessage` backstop by serialized cost, matching the child's `_cap_message`.** Rejected: the two caps guard different things. `_cap_message`'s output re-crosses fd 3 as a JSON string, so its escaped width is what the frame ceiling bounds — serialized billing is required there. `capMessage`'s output goes straight into `CodeRunResult.error.message` and never re-crosses a frame-bounded channel, so the honest measure of what it retains is the raw byte length of the model-visible string. An honest child has already capped by serialized cost and raw length ≤ serialized cost, so a well-formed message passes unchanged; a forged control-heavy message could serialize to ~6× its raw length, but since it travels no capped channel, billing it by that inflated wire width would truncate a legitimately-sized diagnostic for no containment gain. Each side's JSDoc documents the split and points at the other.

**Push stray pipe output one entry per `data` chunk.** Rejected: `logs` entries are joined with `\n` downstream, so a transport chunk boundary would become a model-visible newline — a single native write split across pipe reads would read back with spurious line breaks. Aggregating by real newline (raw-chunk buffer + split on `0x0a`) matches the child's line-granular `log` frames; the ledger still bounds a newline-free flood by admitting-and-truncating the residual when it would cross the budget.

**Enforce the fd-3 frame ceiling per-frame (split before the counter check) to avoid a batch-edge false reject.** Rejected: the ceiling check reads the byte counter BEFORE any `Buffer.concat`, precisely so a hostile program cannot force ~2× the 64 MiB frame cap of host memory (the counter and the join are a second copy of everything held). Splitting first to bill a single frame would `Buffer.concat` an over-ceiling frame before rejecting it, reintroducing that doubling — two regression tests assert the pre-concat order for exactly this reason. The batch-edge false reject the per-frame order would fix (a legitimate near-cap frame whose newline-bearing chunk also carries the next frame's leading bytes nudging the counter over the ceiling for one pipe read) is reachable only when `maxLogBytes`/`maxValueBytes` is configured within one pipe read of the 64 MiB cap — orders of magnitude past the 32/64 KiB defaults. The memory-safety bound against hostile input at any config takes precedence over a false reject reachable only at a pathological near-ceiling config; the counter's over-count and this trade-off are documented at the check.

**Flush the two stray pipes in residual-arrival order when the combined budget crosses.** Rejected: stdout and stderr are independent OS streams whose `data` events already interleave nondeterministically with each other and with the child's own fd-3 `log` frames. The seam's `CodeRunResult.logs` JSDoc reads "in order", which the surrounding text scopes to program-emission order WITHIN a stream — ordering ACROSS concurrent streams is inherently best-effort here, since no host-side flush order can reconstruct the true interleaving the kernel already lost, so preserving a residual's arrival order at the flush buys nothing. A fixed drain order is as valid as any. Tracking a per-residual arrival tick to drain the earlier pipe first would add a branch whose two sides fire only on the relative timing of two OS pipes, which `os.sched_yield` does not make deterministic, so the branch could not be covered without a flaky test — cost with no observable contract benefit.

**Meter the child log ledger against the address space at runtime instead of rejecting the config at load.** Rejected: an exact serialized-cost check on every child write is either a full `encode` — the very allocation an oversized write cannot afford, which the ledger's cheap pre-check exists to avoid — or a per-character Python loop, which burns the CPU budget (a 10 MB legitimate write hits SIGXCPU under `cpuSeconds: 1`). Each runtime approach trades the memory bound for another resource bound on the hot path. The address-space breach is a property of the `maxLogBytes`/`addressSpaceMb` pair, not of any particular write, so rejecting the incompatible pair once at load eliminates the whole class without any per-write cost and keeps `_LogStream`'s original character-count buffering, which is memory-safe once the budget fits the address space.
