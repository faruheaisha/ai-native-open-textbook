---
title: "Keep Root CLI Machine Failures Parseable"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-08-01-root-cli-machine-failure-contract.md"
sourceRel: "docs/specs/2026-08-01-root-cli-machine-failure-contract.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-08-01-root-cli-machine-failure-contract.md"
sourceSha256: "30580eba9291c463838299f0ad84abd3e1d51e3b2ba0b2dd4b7bf5f21d39c7b6"
pageSha256: "30580eba9291c463838299f0ad84abd3e1d51e3b2ba0b2dd4b7bf5f21d39c7b6"
contentMode: "local-full"
zh: ""
---

# Keep Root CLI Machine Failures Parseable

## Traceability

- Spec ID: `root-cli-machine-failure-contract`
- Status: Implemented

## Intent

Keep automation able to classify failures that occur at the root CLI's
delegated-process boundary. After the root recognizes machine mode, a child
spawn failure or signal termination must produce one existing versioned error
envelope with a stable code and safe recovery hint. Human invocations should
retain short diagnostics, while successfully started child commands continue
to own their normal output bytes and exit status.

## Acceptance Scenarios

- **RCM-AC-1 (spawn failure):** when a pre-passthrough `--json` token selects
  machine mode and the delegated process cannot start, stdout contains exactly
  one parseable `format_version: "1.0"` error document with code
  `DELEGATED_COMMAND_SPAWN_FAILED`, stderr contains no second envelope, and the
  process exits with status 1.
- **RCM-AC-2 (signal termination):** when a delegated process terminates by
  signal in machine mode, any incomplete child stdout or stderr is not relayed;
  stdout instead contains exactly one parseable `format_version: "1.0"` error
  document with code `DELEGATED_COMMAND_SIGNAL_TERMINATED`, a safe next step,
  and exit status 1.
- **RCM-AC-3 (human diagnostics):** the same two failures without recognized
  machine mode write no stdout and emit one concise diagnostic on stderr. A
  spawn diagnostic may retain the operating-system error detail; a signal
  diagnostic names the terminating signal.
- **RCM-AC-4 (normal child ownership):** delegated commands that return a
  numeric status keep that status, stdout, and stderr byte-for-byte. The root
  CLI adds no success or child-business-failure envelope.
- **RCM-AC-5 (output overflow):** when a delegated process starts, runs, and
  exceeds the machine-mode output buffer, stdout contains exactly one parseable
  `format_version: "1.0"` error document with code
  `DELEGATED_COMMAND_OUTPUT_OVERFLOW` and a hint that narrows scope or drops
  `--json`. Truncated child bytes and the raw `ENOBUFS` diagnostic are not
  relayed, and the envelope is never confused with a start failure.

## Non-goals

- Changing capability-owned output schemas, messages, or business-failure
  exit codes.
- Replacing synchronous argv-array dispatch, changing the command registry, or
  adding shell-string execution.
- Activating the ADR's proposed `command-contract.v1` shape beyond the root
  CLI's existing `format_version: "1.0"` envelope.
- Normalizing malformed argument bytes or redesigning all global-option
  parsing.

## Plan and Tasks

1. Keep dispatch resolution in `scripts/better-harness-cli/cli.mjs`, and add a
   single result-normalization path that receives the already-recognized
   machine-mode state.
2. In machine mode, capture delegated stdout and stderr until `spawnSync`
   returns. Relay both unchanged for numeric child statuses, but replace
   incomplete output with the root error envelope for spawn and signal
   failures.
3. Reuse the root `errorPayload`/`jsonDocument` writer for versioning and add a
   narrow process-runner/output-writer seam so focused tests can deterministically
   supply cross-platform spawn and signal results.
4. Add focused root CLI tests for spawn failure, signal termination, human
   diagnostics, absence of a stderr envelope, and normal byte preservation.

## Test and Review Evidence

- **RCM-AC-1/RCM-AC-2:** run
  `node --test test/better-harness-cli.test.mjs`; focused injected-result tests
  must parse all of machine stdout with `JSON.parse`, assert the stable error
  code and hint, and assert empty stderr even when the simulated child result
  contains partial output.
- **RCM-AC-3:** the same focused tests assert empty stdout and bounded stderr in
  human mode for spawn and signal failures.
- **RCM-AC-4:** compare delegated root CLI output with direct capability output
  and assert identical stdout, stderr, and numeric exit status.
- **RCM-AC-5:** drive a real `spawnSync` overflow with a small `maxBuffer`, then
  assert the resulting `ENOBUFS` shape produces the overflow envelope instead of
  the spawn-failure envelope in machine mode and a bounded stderr diagnostic in
  human mode.
- **Documentation integrity:** run
  `node scripts/doc-link-graph/cli.mjs skills/better-harness` and
  `node --test test/doc-link-graph.test.mjs` after adding this Markdown file.
- **Review readiness:** run `git diff --check` and inspect staged and unstaged
  changes separately.
- **Risk:** machine-mode buffering delays delegated output until the child
  exits and is bounded by Node's synchronous child-process buffer. Keep the
  buffer explicit and large enough for current machine documents; buffer
  exhaustion stays a stable machine envelope with its own overflow code rather
  than leaking a raw diagnostic or truncated child bytes into machine stdout.

## Observed Validation Evidence

- `node --test test/better-harness-cli.test.mjs` passed 36 tests with one
  pre-existing Windows symlink-permission skip. The focused injected-result
  tests parse the complete spawn/signal stdout as one JSON document, assert
  empty machine stderr, and prove partial child envelopes are discarded.
- The combined CLI, report, Skill, renderer, and compatibility run retained all
  upstream leaf-command behavior and passed every root CLI and
  `scripts-refactor-contract` assertion.
- The full repository run reached 1,044 passes and 6 supported skips. Its four
  failures were pre-existing Windows `EPERM` symlink-creation cases; the same
  failure was reproduced from the unchanged baseline and does not execute the
  changed CLI normalization path.
- `npm run pack:verify`, the six doc-link tests, and `git diff --check` passed.
