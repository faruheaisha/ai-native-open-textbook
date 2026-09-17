---
title: "Onboard Repository"
sourceId: "09-harness/repository-harness"
sourceTitle: "Repository Harness（仓库级 Agent 工作区）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/hoangnb24/repository-harness"
entryUrl: "https://github.com/hoangnb24/repository-harness/blob/e765792b635b4d5e3e5fc0578f82f9ca5dea2681/.agents/skills/onboard-repository/SKILL.md"
sourceRel: ".agents/skills/onboard-repository/SKILL.md"
rawUrl: "/raw/09-harness/repository-harness/.agents/skills/onboard-repository/SKILL.md"
sourceSha256: "220302bec89ebe70f983fd515bdffd3e417a652c0777fe8ba8d34a0197cf6f3e"
pageSha256: "220302bec89ebe70f983fd515bdffd3e417a652c0777fe8ba8d34a0197cf6f3e"
contentMode: "local-full"
zh: ""
---

# Onboard Repository

Turn an unfamiliar repository into a verified map for future work. Treat the
repository as the system of record. Separate facts from gaps and suggestions.

## Safety Contract

The first pass is always inspection and proposal only, even when the worktree
is writable.

- Read every applicable `AGENTS.md` before inspecting deeper files.
- Capture the initial Git root, revision, branch, status, and worktree list.
- Preserve all pre-existing tracked and untracked changes.
- In the initial boundary capture, before deeper repository inspection, record
  pre-state existence or safe hashes for relevant ignored state such as
  `.env.local`, dependency directories, and managed repository state. Never
  print secret contents. If an initial baseline was missed, report pre/post
  equivalence as **Unknown**; a later sample cannot reconstruct it.
- Treat ignore rules and managed-state manifests as part of the boundary, not
  deeper inspection. Read them before fixing the baseline, enumerate every
  relevant ignored database, sidecar, dependency, environment, build, and
  managed-state path they reveal, and record each one explicitly. For ignored
  directories, use a content-sensitive per-file hash inventory; a filenames-
  only hash does not prove that contents stayed unchanged.
- Use only read-only discovery commands. Do not install dependencies, start
  services, invoke migrations, create caches or state, or edit files.
- Use task-prefixed shell variable names. In zsh, never assign to special names
  such as `path`, `status`, `pipestatus`, `commands`, or their uppercase system
  counterparts; corrupting the inspection shell invalidates later baselines.
- Do not create temporary files inside or outside the repository. Compare via
  stdout and non-materializing pipelines; if a comparison requires a file,
  report that limitation instead of creating one.
- Do not use shell heredocs or here-strings; shells may materialize them as
  temporary files. Use quoted `python3 -c`/`node -e` programs, stdin pipes, or
  ordinary read-only commands instead.
- When a runtime manager is relevant, capture its observable project, service,
  volume, and process state in the initial boundary batch. If the manager is
  unavailable, state that runtime pre/post equivalence is **Unknown**. Proving
  that no runtime command was issued does not prove runtime state was unchanged.
- Before invoking a repository-local binary, verify that its path exists and is
  executable. If absent, record the command as unavailable; do not invoke,
  install, rebuild, or substitute it.
- Do not turn code, tests, configuration, conventions, or guesses into product
  intent. They can prove present behavior, not missing normative policy.
- Stop when authority is absent or materially different interpretations remain.
- End by comparing Git status and diff with the captured initial state.

An explicit later approval may authorize documentation changes. It never
authorizes application-code changes, invented product policy, hooks, databases,
or background automation unless the user separately requests them.

## First Pass: Inspect And Propose

### 1. Establish the boundary

Read applicable instructions and the smallest repository map available. Record
pre-existing dirt before doing anything else. If instructions conflict, follow
the narrower instruction and report the conflict.

When `.harness-core/manifest.json` exists and an installed managed file
conflicts with `.harness-core/base/<path>`, treat the installed file as active
instructions for the current run. For a correction proposal, verify the base
file against its manifest checksum and show the conflict. Propose replacing
only content inside managed markers and preserve all consumer-owned content
outside them. Do not treat the managed base as permission to edit.

A checksum-verified conflict in an active mandatory instruction that caused a
failed, unavailable, or unsafe command is the first proposal priority. Preview
that correction before proposing additive documentation elsewhere.

### 2. Find repository authority

Inspect only material needed to understand the requested path, normally:

- root overview and developer documentation;
- product and architecture sources;
- package/build manifests and task runners;
- CI workflows and deployment/runtime configuration;
- focused tests, fixtures, and operational scripts.

For every important claim, cite an exact repository path and classify it:

- **Authoritative:** an instruction, accepted decision, product contract, or
  explicitly documented operational procedure states what must happen.
- **Observed:** code, configuration, or tests show current behavior.
- **Derived:** a direct operational consequence of verified implementation or
  configuration. Phrase it as current behavior, not intended or durable policy.
- **Decision required:** a proposed normative, product, or safety policy has no
  existing authority and requires an explicit user choice.
- **Unknown:** the repository does not establish the answer.

Never silently promote **Observed**, **Derived**, **Decision required**, or
**Unknown** to **Authoritative**.

Treat operational authority as context-specific. A command or flag documented
for CI, a container build, release automation, or another runbook proves only
that context. Do not transplant it into a local developer procedure unless the
local owning document authorizes it or the user chooses it. When two viable
commands differ, do not select one as a **Derived** rule; classify the choice as
**Decision required**.

When evidence comes from a type, schema, or serializer, distinguish required
from optional fields. Say that optional fields appear only when present; a
field's existence in a schema does not prove that every emitted record has it.

Verify every clause and qualifier in a proposed sentence independently. Do not
generalize configurability, defaults, optionality, ownership, or lifecycle from
one field or resource to an adjacent one merely because they appear together.

For environment-derived behavior, trace each claimed key from every source to
its final consumer. Distinguish same-key merge precedence, fallback between
different keys, checked-in values that make later fallbacks unreachable on the
default path, and assignments performed after a merge. Never summarize this as
"the environment overrides the files" unless that is true for every named key.

List related identifiers separately and label each one **fixed**,
**defaulted**, or **configurable**, with its own source. Apply the same rule to
ports, paths, and resource names: state both configurability and fallback when
either exists. Assign each write to the stage where it actually occurs rather
than grouping later interface writes into setup or readiness.

The current task or frozen evaluation prompt defines run scope, not durable
repository authority. A new rule supported only by that prompt is **Decision
required** unless the user explicitly adopts it as repository policy.

### 2a. Compare documented invariants with executable checks

During the read-only proposal pass, compare accepted architecture, reliability,
security, and quality invariants with the repository's checked-in validation.
This is an inventory, not authority to edit or enforce.

Use one row per invariant or check:

| Documented invariant or executable check | Authority and source | Validation owner and command | Local coverage | CI discovery | Finding |
| --- | --- | --- | --- | --- | --- |

Classify findings precisely:

- **Enforced:** accepted authority and a mechanical check cover the same scope.
- **Partially enforced:** the check covers only part of the accepted scope.
- **Unenforced rule:** accepted authority exists, but no matching check was found.
- **Check lacking authority:** a check exists, but no accepted source establishes
  its policy. Code, tests, conventions, and defaults cannot fill this gap.
- **Unknown:** available evidence cannot establish the relationship.

Inspect the native validation owner and checked-in CI invocation separately. A
local command, an optional hook, CI configuration, and external branch
protection are different enforcement levels; do not infer one from another.

Do not add, edit, delete, enable, or execute a guard during onboarding. Do not
install hooks or mutate CI, merge, or branch-protection settings. Report the
mismatch with evidence and propose the smallest next step: encode an accepted
rule, obtain a missing decision, or investigate an unknown. Any later edit or
enforcement still requires exact user approval and the repository authority
gate.

### 3. Trace one complete operational path

Prefer one already-documented local happy path over a broad architecture
summary. Trace cause and effect through:

```text
prerequisites
-> start
-> readiness
-> deterministic setup
-> real interface exercise
-> evidence and correlation boundary
-> stop and cleanup
```

Use this exact operational-path table schema; do not merge columns:

| Stage or branch | Command/interface and expected result | Classification and source | Write at this stage | Process/container owner | Host and container ports | Evidence/log boundary and correlation | Cleanup at this stage | Unknowns |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Include a value or **N/A**/**Unknown** in every cell. An omitted or implicit
cell fails the operational-path gate; prose elsewhere does not replace it.

Trace lifecycle flags as separate table rows. At minimum, include default
startup, each no-start mode, cleanup requested after success, and failure after
startup. For a no-start mode, continue tracing later schema, probe, interface,
and write behavior rather than assuming the flag makes the whole run read-only.
Verify whether cleanup is unconditional, after assertions, or in a
`finally`/trap path. "No teardown command is invoked" does not prove that every
service remains running, and a cleanup flag must not be described as guaranteed
when earlier failure bypasses it.

Classify cleanup mechanics separately from cleanup obligations. Existing code
or an authorized command may prove how cleanup can be performed; it does not
create a new instruction that an operator must perform cleanup after a specific
failure. Put that obligation in **Decision required** unless repository
authority already states it.

If a read-only inspection contacts a runtime manager such as Docker, capture
the relevant project/container identifiers and pre/post state. Never describe
logs as instance-local merely because they are container logs; identify the
actual project/container boundary and correlation identifiers.

Before the path table, add a resource-and-identifier ledger:

| Item | Kind | Exact behavior or value | Classification and source |
| --- | --- | --- | --- |

Use one row per identifier, port, project, service, volume, state path, and log
boundary. `Kind` must distinguish **fixed**, **defaulted**, **configurable**,
**generated**, **logical configuration name**, and **observed runtime name**.
For port mappings, list host and container sides separately. Never report a
logical Compose volume key as an observed engine-level volume name.

One row means one item: do not combine two identifiers or resources in a single
row even when their classification is identical. Record checked-in values that
make later fallbacks unreachable on the documented default path. For logs,
state which fields are guaranteed and which are optional; optional identity or
warning fields make evidence request-correlatable only when present. Keep
process-wide metrics separate from request- or instance-correlated evidence.

Source the entire causal chain for each effect. An HTTP controller does not by
itself prove persistence, and a runner call does not by itself prove provider,
logging, database, or runtime-manager consequences. Mark direct implementation
facts **Observed** and consequences of a called tool or protocol **Derived**.
Pre-existing resources under a no-start mode have **Unknown** creator/owner
unless the repository or runtime observation identifies it.

Do not execute the path during the first pass. The goal is to learn whether a
fresh agent could execute it without undocumented human help.

### 4. Propose the smallest useful backfill

Return a proposal; do not write it. Each item must include:

1. the concrete agent failure it prevents;
2. evidence and exact source paths;
3. the exact destination file or existing section;
4. the factual content to add or correct;
5. what remains unknown and must not be claimed;
6. how a fresh agent replay would prove improvement.

Show all six headings for every proposal, including `Unknowns: none` when no
unresolved factual claim affects that proposal. Do not infer completion of a
field from prose in another section.

Prepare an exact patch preview. Classify and cite every proposed sentence, not
merely the proposal containing it. The approval unit is the machine-emitted
hunk ID, destination, and patch digest, not a proposal number or an ambiguous
alternative.

Never handwrite unified-diff headers, line ranges, context, or patch hashes.
Construct the complete proposed destination image in memory from the pinned
destination, preserving every byte outside the intended edit. Pipe those
complete bytes to the bundled renderer:

```text
