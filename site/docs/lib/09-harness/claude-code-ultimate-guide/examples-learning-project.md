---
title: "Proofpack: one project for the seven-module learning path"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/learning-project/README.md"
sourceRel: "examples/learning-project/README.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/learning-project/README.md"
sourceSha256: "ab8e38eb70cf888b8af47bebd0c98a05387030bdcdab29820410fa2b77b110eb"
pageSha256: "ab8e38eb70cf888b8af47bebd0c98a05387030bdcdab29820410fa2b77b110eb"
contentMode: "local-full"
zh: ""
---

# Proofpack: one project for the seven-module learning path

Proofpack is a dependency-free Node.js CLI that decides whether a release candidate has enough evidence to ship. Its final state is a reference solution. A learner can rebuild the same result across modules 01 to 07 without switching projects or inventing a new exercise each time.

The bounded work item is recorded in [ISSUE.md](/lib/09-harness/claude-code-ultimate-guide/examples-learning-project-ISSUE). The CLI accepts a JSON candidate, checks the required `tests`, `security`, and `package` evidence, prints a machine-readable report, and returns a distinct exit code for incomplete evidence or invalid input.

## Run it without installing packages

Node.js 20 or later is the only test dependency.

```bash
node --version
npm test
npm run verify
```

`npm run verify` should exit `0`. Compare it with the intentional failure fixture:

```bash
npm run verify:incomplete
```

That command should exit `1` and name the failed and missing checks. Invalid JSON exits `2`.

## Carry the project through modules 01 to 07

| Stage | Guide module | Work in this project | Evidence to retain |
| --- | --- | --- | --- |
| 01 | [Installation and setup](/lib/09-harness/claude-code-ultimate-guide/guide-learning-path-01-installation) | Confirm Node.js, inspect the repository, and run the ready fixture. | Runtime version and the `npm run verify` exit status. |
| 02 | [Core loop](/lib/09-harness/claude-code-ultimate-guide/guide-learning-path-02-core-loop) | Read [ISSUE.md](/lib/09-harness/claude-code-ultimate-guide/examples-learning-project-ISSUE), reproduce the incomplete case, write a failing test, then change the validator. | The red failure, green test run, and reviewed diff. |
| 03 | [Memory and config](/lib/09-harness/claude-code-ultimate-guide/guide-learning-path-03-memory) | Read [CLAUDE.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/learning-project/CLAUDE.md) and ask Claude Code to explain which rules constrain a change. | The rule cited before editing and the command selected for verification. |
| 04 | [Agents and specialization](/lib/09-harness/claude-code-ultimate-guide/guide-learning-path-04-agents) | Use the read-only [evidence reviewer](/lib/09-harness/claude-code-ultimate-guide/examples-learning-project-_claude-agents-evidence-reviewer) after the implementation is green. | Findings tied to a file, check, or missing artifact. |
| 05 | [Skills and automation](/lib/09-harness/claude-code-ultimate-guide/guide-learning-path-05-skills) | Run the focused [verify-release skill](/lib/09-harness/claude-code-ultimate-guide/examples-learning-project-_claude-skills-verify-release-SKILL). | Its bounded `PASS`, `FAIL`, or `UNKNOWN` record. |
| 06 | [Hooks and events](/lib/09-harness/claude-code-ultimate-guide/guide-learning-path-06-hooks) | Inspect the [PreToolUse hook](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/learning-project/.claude/hooks/release-guard.mjs), its [configuration](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/learning-project/.claude/settings.json), and the pass, fail, obfuscation, and malformed fixtures. | `npm run hook:fixtures` with four tests covering seven inputs. |
| 07 | [Advanced patterns](/lib/09-harness/claude-code-ultimate-guide/guide-learning-path-07-advanced) | Compare candidates only when the decision warrants [Best-of-N](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-best-of-n), complete the [proof log](/lib/09-harness/claude-code-ultimate-guide/examples-learning-project-evidence-PROOF-LOG), check the npm package, then review the [Dockerfile](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/learning-project/Dockerfile/README.md). | Test output, package manifest, selected-candidate record if used, and remaining runtime unknowns. |

The executable [learning-path skill](/lib/09-harness/claude-code-ultimate-guide/examples-skills-learning-path) can record module completion and scheduled reviews. Use its state file for learning progress. Keep product evidence in this project's proof log so a course-completion note cannot substitute for a test result.

## Evidence contract

The validator requires one unique check for each of these names:

- `tests`
- `security`
- `package`

Every check needs `status: "pass"` and a retained-result description. Empty evidence and the case-insensitive markers `UNKNOWN`, `failed`, `not executed`, `unverified`, `NOT RUN`, and `no retained output` all fail. This is a conservative string screen, so text such as `0 failed` also fails. The candidate schema does not parse a command, exit status, or checksum from this string. Put those structured facts in [evidence/PROOF-LOG.md](/lib/09-harness/claude-code-ultimate-guide/examples-learning-project-evidence-PROOF-LOG). The version must use `MAJOR.MINOR.PATCH`. A duplicate name is a failure because later evidence must not shadow an earlier result.

[fixtures/release-ready.json](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/learning-project/fixtures/release-ready.json) demonstrates the accepted schema. [fixtures/release-incomplete.json](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/learning-project/fixtures/release-incomplete.json) demonstrates a failed security check and missing package evidence. The CLI does not contact a registry, execute the evidence strings, or infer that a cited command really ran.

## Verification and packaging

Run the complete local gate before claiming the reference solution passes:

```bash
npm test
npm run verify
npm run package:check
```

The package gate checks both JavaScript files with `node --check`, then builds an npm manifest without downloading dependencies or publishing an artifact. The named [package-check test](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/learning-project/test/package-check.test.mjs) injects invalid JavaScript into a temporary copy and requires a nonzero exit. This proves the syntax boundary, not execution of the packed CLI. The [Dockerfile](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/learning-project/Dockerfile/README.md) supplies an additional deployable form. Building it may require the `node:22-alpine` base image from a registry, so a passing Node.js test run does not prove the image builds or runs on another host.

The repository's [TESTING.md proof-log template](/lib/09-harness/claude-code-ultimate-guide/examples-claude-md-TESTING) explains the full evidence format. This example keeps a filled, project-specific [proof log](/lib/09-harness/claude-code-ultimate-guide/examples-learning-project-evidence-PROOF-LOG). For higher-cost choices, follow the [Best-of-N workflow](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-best-of-n) and preserve rejected candidates as well as the selected one.

## Safety boundary

The release guard blocks direct, flag-bearing, and empty-quote-obfuscated `npm publish` and `docker push` tool calls. It also denies any command where `npm` appears with `publish`, or `docker` appears with `push`, even when the words are only printed or discussed. Those conservative false positives are intentional. The hook does not catch aliases, encoded commands, variable expansion, other registry clients, or shell constructions that split words with non-empty quoted text. It never auto-unblocks after a passing check. Treat it as a teaching control, not a shell parser or a general command firewall. Apply the repository's [security hardening guidance](/lib/09-harness/claude-code-ultimate-guide/guide-security-security-hardening/index) before adapting hooks to production.

Publishing also needs a channel owner, destination credentials, and an explicit decision. The [guide distribution workflow](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/docs/workflows/guide-distribution.md) separates those external actions from local packaging checks. That page is supplied by the parent integration on `main`; this isolated branch keeps an external repository link until both commits are combined.

## Project map

```text
examples/learning-project/
├── .claude/
│   ├── agents/evidence-reviewer.md
│   ├── hooks/release-guard.mjs
│   ├── hooks/fixtures/
│   ├── settings.json
│   └── skills/verify-release/SKILL.md
├── evidence/PROOF-LOG.md
├── fixtures/
├── src/
├── test/
├── CLAUDE.md
├── Dockerfile
├── ISSUE.md
└── package.json
```
