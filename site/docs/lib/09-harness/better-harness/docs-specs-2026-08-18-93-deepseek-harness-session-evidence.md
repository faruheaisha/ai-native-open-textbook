---
title: "DeepSeek Harness Session Evidence"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-08-18-93-deepseek-harness-session-evidence.md"
sourceRel: "docs/specs/2026-08-18-93-deepseek-harness-session-evidence.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-08-18-93-deepseek-harness-session-evidence.md"
sourceSha256: "a3aaf1e2deadec33fb6bd44ddeac6508d9e7fcd1971066292fe1c7f53332f94b"
pageSha256: "a3aaf1e2deadec33fb6bd44ddeac6508d9e7fcd1971066292fe1c7f53332f94b"
contentMode: "local-full"
zh: ""
---

# DeepSeek Harness Session Evidence

## Traceability

- Spec ID: deepseek-harness-session-evidence
- Story: #93
- Status: Implemented
- Follow-up status: Implemented (DSH 0.1.1-rc.1 compatibility; known baseline facts privacy defect unresolved)

## Intent

Add a narrowly scoped, read-only DeepSeek Harness (`dsh`) session adapter so
Better Harness can analyze durable DSH JSONL evidence after a run. The first
slice stops at session discovery, workspace qualification, validation, and
normalization into the existing session-analysis contract. It deliberately does
not present DSH as a first-class or natively integrated Better Harness host.

This specification freezes the partial boundary approved by the maintainer in
[Issue #93](https://github.com/QoderAI/better-harness/issues/93), including the
feature-detection policy approved in the 2026-08-18T13:13:05Z comment. The
supported native contract is pinned to upstream commits
`99f6f02fecdb7dff40c3fbc9470f5907c29f74ca` (`dsh-v0.1.0-rc.7`) and
`141eb6fef83422698aef7a981029e843e8161534` (`dsh-v0.1.0-rc.8`), both with
`SESSION_FORMAT_VERSION = 0`. Later upstream behavior is not implicitly
supported. The additive 0.1.1-rc.1 qualification below is an implemented
contract for the pinned optional `permission/preset.origin` extension; it does
not qualify later releases or unrelated 0.1.1 behavior.

## Native Contract Evidence

The implementation and its support claims remain bound to these five primary
upstream sources at the RC7 commit:

1. [Developer-preview status, compatibility warning, and plugin-oriented positioning](https://github.com/deepseek-ai/deepseek-harness/blob/99f6f02fecdb7dff40c3fbc9470f5907c29f74ca/README.md)
2. [Base profile composition and the DSH-home sessions route](https://github.com/deepseek-ai/deepseek-harness/blob/99f6f02fecdb7dff40c3fbc9470f5907c29f74ca/packages/bundle/base/cordis.patch.yml)
3. [Session header, format version, event vocabulary, correlation fields, and turn outcomes](https://github.com/deepseek-ai/deepseek-harness/blob/99f6f02fecdb7dff40c3fbc9470f5907c29f74ca/packages/core/session/src/types.ts)
4. [JSONL layout, default Zstandard encoding, packed rows, identity checks, and discovery constraints](https://github.com/deepseek-ai/deepseek-harness/blob/99f6f02fecdb7dff40c3fbc9470f5907c29f74ca/packages/session/session-persistence-jsonl/README.md)
5. [SQLite's separate persistence and discovery contract](https://github.com/deepseek-ai/deepseek-harness/blob/99f6f02fecdb7dff40c3fbc9470f5907c29f74ca/packages/session/session-persistence-sqlite/README.md)

The RC8 requalification and RC8-only extensions are separately bound to their
corresponding source owners at the RC8 commit:

6. [`assistant/message.interrupted` and the current session event vocabulary](https://github.com/deepseek-ai/deepseek-harness/blob/141eb6fef83422698aef7a981029e843e8161534/packages/core/session/src/types.ts)
7. [Committed JSONL rows and packed-row expansion](https://github.com/deepseek-ai/deepseek-harness/blob/141eb6fef83422698aef7a981029e843e8161534/packages/session/session-persistence-jsonl/src/format.ts)
8. [Concatenated Zstandard frame scanning and torn-frame boundaries](https://github.com/deepseek-ai/deepseek-harness/blob/141eb6fef83422698aef7a981029e843e8161534/packages/session/session-persistence-jsonl/src/zstd.ts)
9. [DSH-home precedence and blank-environment handling](https://github.com/deepseek-ai/deepseek-harness/blob/141eb6fef83422698aef7a981029e843e8161534/packages/util/home-paths/src/index.ts)
10. [`team/member`, `team/task`, `team/message/queued`, and `team/message/delivered` payload contracts](https://github.com/deepseek-ai/deepseek-harness/blob/141eb6fef83422698aef7a981029e843e8161534/packages/experimental/agent-team/src/types.ts)
11. [Strict team payload schemas and replay relationships](https://github.com/deepseek-ai/deepseek-harness/blob/141eb6fef83422698aef7a981029e843e8161534/packages/experimental/agent-team/src/fold.ts)
12. [Team task dependency-graph constraints](https://github.com/deepseek-ai/deepseek-harness/blob/141eb6fef83422698aef7a981029e843e8161534/packages/experimental/agent-team/src/task-graph.ts)

The 0.1.1-rc.1 compatibility follow-up is pinned separately to commit
`528c682e061696f5a160f363f236ecbf53cbd006` and these package-owned sources:

13. [`permission/preset` payload declaration and backward-readable optional `origin`](https://github.com/deepseek-ai/deepseek-harness/blob/528c682e061696f5a160f363f236ecbf53cbd006/packages/interaction/permission-presets/src/index.ts#L42-L55)
14. [`origin` replay/refresh semantics for default, explicit, inferred, and origin-less selections](https://github.com/deepseek-ai/deepseek-harness/blob/528c682e061696f5a160f363f236ecbf53cbd006/packages/interaction/permission-presets/src/index.ts#L337-L355)
15. [The package-owned write paths for all three legal `origin` values](https://github.com/deepseek-ai/deepseek-harness/blob/528c682e061696f5a160f363f236ecbf53cbd006/packages/interaction/permission-presets/src/index.ts#L430-L479)
16. [RC.1 core format, header, event envelope, lifecycle, request, assistant usage, and tool-correlation contracts](https://github.com/deepseek-ai/deepseek-harness/blob/528c682e061696f5a160f363f236ecbf53cbd006/packages/core/session/src/types.ts#L34-L99)
17. [RC.1 known event vocabulary and unknown-event refusal policy](https://github.com/deepseek-ai/deepseek-harness/blob/528c682e061696f5a160f363f236ecbf53cbd006/packages/core/session/src/known-event-types.ts#L8-L68)
18. [RC.1 JSONL header, packed-row expansion, and committed-record scanning](https://github.com/deepseek-ai/deepseek-harness/blob/528c682e061696f5a160f363f236ecbf53cbd006/packages/session/session-persistence-jsonl/src/format.ts#L28-L108)
19. [RC.1 concatenated Zstandard frame reader](https://github.com/deepseek-ai/deepseek-harness/blob/528c682e061696f5a160f363f236ecbf53cbd006/packages/session/session-persistence-jsonl/src/zstd.ts)
20. [RC.1 persisted subagent descriptor contract](https://github.com/deepseek-ai/deepseek-harness/blob/528c682e061696f5a160f363f236ecbf53cbd006/packages/subagent/subagent/src/descriptor.ts#L28-L88)

Synthetic fixtures may encode only behavior supported by those pinned sources
and the approved Issue #93 boundary. A fixture passing is not evidence that a
newer DSH build remains compatible. Same-version structural drift must fail
closed rather than extending this contract by inference.

## DSH 0.1.1-rc.1 Compatibility Follow-up

### Status and qualification target

This implemented follow-up remains under Story #93 and targets only the official
DSH npm package `0.1.1-rc.1` at tag commit
`528c682e061696f5a160f363f236ecbf53cbd006`. It is temporally additive to the
implemented RC7/RC8 evidence; it does not rewrite that historical
qualification or imply support for later DSH releases.

### Current failure and upstream contract delta

A real headless DSH 0.1.1-rc.1 coding run completed and persisted a structurally
healthy format-0 session, but Better Harness at
`996fd3d3045dfe29935fc7948377416712ab2711` rejected it during public discovery
with `dsh-artifact-rejected` and `DSH_EVENT_SHAPE_DRIFT`. The rejected event was
`permission/preset`, whose package-owned payload changed from the RC8 shape:

```text
{ preset: string }
```

to the 0.1.1-rc.1 declaration:

```text
{ preset: string, origin?: "default" | "selection" | "inferred" }
```

`origin` is optional: its absence keeps logs written before origin tracking
readable. When present it is a string in exactly the closed set `default`,
`selection`, or `inferred`; `null`, other JSON types, and arbitrary strings are
not declared legal. No additional payload keys are declared by the owner, and
the pinned package write paths emit only `preset` and optional `origin`.
Therefore unrelated extra keys remain outside this adapter's qualified schema
even though the upstream package invariant independently checks preset
membership rather than acting as a generic exact-key JSON parser.

The field records provenance/intent for permission default refresh: only a
still-effective `default` selection may be refreshed for a confirmed reusable
blank session. Explicit `selection`, `inferred`, and legacy origin-less records
remain pinned. The ordinary `effectivePermissionPreset` fold still returns
only `data.preset`; `origin` does not change event identity, sequencing,
turn/step membership, tool association, or model transcript membership.

### Pinned source-diff audit

The pinned RC8-to-0.1.1-rc.1 source diff changes the permission-presets owner
above and a subagent projection implementation. The subagent change migrates
projection state/wire schema registration; the persisted
`subagent/descriptor`, its invariant and lifecycle sources are byte-unchanged.
The complete production source directories for core session contracts,
JSONL/Zstandard persistence, DSH-home resolution, and agent-team events are
also byte-unchanged. Consequently the audited format version remains `0`, and
the `HeaderLine`, event envelope and contiguous `seq` semantics, request
headers, turn/step/tool lifecycle, lineage and `seedLength`, assistant usage,
known event vocabulary, packed-row expansion, and framed-Zstandard persistence
retain their RC8 definitions. This is a scoped comparison of the existing
adapter's contract owners, not a claim of universal compatibility with every
0.1.1-rc.1 package or future event payload.

### Supported behavior

The implementation extends only the exact `permission/preset` data validator so
that a missing `origin` and each of the three pinned enum values are accepted.
It validates but does not project `origin`: the field alone creates
no fact, analytics dimension, ownership, causality, user-intent inference, or
new public output. Invalid types, `null`, invalid strings, and unrelated unknown
keys continue to fail closed with shape drift. No wildcard passthrough or
generic extra-property acceptance is permitted.

The resulting compatibility boundary is:

> Better Harness `dsh-v1` remains a partial `sessionAnalysis` adapter for
> format-0 persisted session evidence, qualified against the audited RC7/RC8
> baseline plus the pinned DSH `0.1.1-rc.1` `permission/preset` schema
> extension.

This is not "latest DSH" or full DSH 0.1.1 support.

### Native qualification evidence and diagnostic boundary

The already-completed isolated run used the official npm package
`0.1.1-rc.1` at the pinned commit. DSH completed its task and produced 31
complete Zstandard frames, 100 physical storage records, and 546 contiguous
logical events: one complete turn, five complete steps, five assistant messages
all carrying usage, and seven tool calls with seven matching results. The
session was complete, with no framing corruption or unknown event type.

A read-only, in-memory diagnostic removed only the new `origin` member. All 546
logical events then passed the existing Better Harness decoder and relationship
validation. No repository file or upstream artifact was changed. This isolates
the observed rejection but does not claim that the full public Better Harness
route passed: discovery rejected the real artifact before sessions, events,
facts, show, gated show, and selection/reference behavior could all be
re-qualified.

### Security and privacy boundary

The failed public discovery output did not expose the raw prompt, credential
name, private DSH home, or raw session id. That confirms the rejection path only.
After implementation, default and content-authorized public paths must be
re-qualified without printing or storing real content. Any later regression
fixture must be minimal, synthetic, contract-focused, and free of real
transcripts, credentials, secrets, and machine-specific paths.

During implementation, an isolated comparison at the pre-origin Better Harness
baseline `996fd3d3045dfe29935fc7948377416712ab2711` used a naturally accepted,
origin-less RC7/RC8-compatible format-0 fixture and an ephemeral equality-only
prompt oracle. It reproduced the direct-user prompt at
`candidates[0].request.summary` in default `facts`; the baseline and rc.1 branch
otherwise produced identical public sessions, events, facts, show, and gated-
show results for that fixture. This confirms a pre-existing default-facts defect,
not a privacy regression introduced by the optional-origin validator. The defect
remains unresolved and outside this compatibility follow-up; this evidence does
not claim that default-facts privacy is safe.

## Support Boundary

The delivered support claim is:

```text
DSH persisted JSONL session
  -> workspace qualification
  -> supported event normalization
  -> Better Harness session evidence
```

The Better Harness adapter metadata id is `dsh-v1`; the only supported native
DSH session format is `0`. The `dsh` host is registered only for the
`sessionAnalysis` capability. Raw `session.jsonl` and, when the running Node.js
runtime exposes the required public Zstandard API, concatenated checksummed
`session.jsonl.zstd` are the only physical encodings. SQLite and custom
persistence providers remain unavailable.

Support is JSONL-only and partial. Every artifact is read-only. Unavailable,
incomplete, malformed, ambiguous, foreign-workspace, and unsupported evidence
must remain visible as such or be rejected according to the acceptance
scenarios below; it must never be guessed, repaired, rewritten, or promoted to
a broader host capability.

## Acceptance Scenarios

### AC-1: Scope resolution

An explicit `--dsh-home` value takes precedence over inherited `DSH_HOME`,
which takes precedence over the default `~/.dsh`. A blank or whitespace-only
inherited `DSH_HOME` is unset; explicit values retain normal path validation.
