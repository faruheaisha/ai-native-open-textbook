---
title: "Issue: incomplete release evidence can look ready"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/learning-project/ISSUE.md"
sourceRel: "examples/learning-project/ISSUE.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/learning-project/ISSUE.md"
sourceSha256: "53f42ef0913472a017c5a77eb72e733d02c9dc5c264226190c384c750c53374b"
pageSha256: "53f42ef0913472a017c5a77eb72e733d02c9dc5c264226190c384c750c53374b"
contentMode: "local-full"
zh: ""
---

# Issue: incomplete release evidence can look ready

## Bounded problem

The release command must not accept a candidate when a required check failed, is missing, has no evidence, or appears twice. Invalid JSON must remain distinguishable from a valid candidate that is not ready.

This reference solution resolves the issue. A learner can use the acceptance contract below to reproduce the work with a fresh branch and a test-first change.

## Acceptance contract

- A candidate with passing `tests`, `security`, and `package` checks exits `0` and reports `ready: true`.
- A valid but incomplete candidate exits `1`, reports `ready: false`, and lists every observed problem.
- Malformed JSON exits `2` and writes the parse error to standard error.
- Duplicate check names fail even if one duplicate contains passing evidence.
- The case-insensitive markers `UNKNOWN`, `failed`, `not executed`, `unverified`, `NOT RUN`, and `no retained output` fail because they do not identify a retained result.
- The tests run through `node:test` without third-party packages or network access.

## Exclusions

The CLI does not authenticate to a registry, execute evidence strings, publish packages, build containers, or prove that an external deployment succeeded. Those actions remain outside this issue.

## Proof locations

- Behavior: [test/cli.test.mjs](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/learning-project/test/cli.test.mjs)
- Hook boundary: [test/release-guard.test.mjs](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/learning-project/test/release-guard.test.mjs)
- Final record: [evidence/PROOF-LOG.md](/lib/09-harness/claude-code-ultimate-guide/examples-learning-project-evidence-PROOF-LOG)
