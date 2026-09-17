---
title: "Multi-Provider Code Review: Non-Redundant Automated PR Review"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/multi-provider-code-review.md"
sourceRel: "guide/workflows/multi-provider-code-review.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/workflows/multi-provider-code-review.md"
sourceSha256: "ad64a4befc86b737b8d85644f2dd1112deefb5b460bcda4ad9fc2ab11f202df7"
pageSha256: "ad64a4befc86b737b8d85644f2dd1112deefb5b460bcda4ad9fc2ab11f202df7"
contentMode: "local-full"
zh: ""
---

# Multi-Provider Code Review: Non-Redundant Automated PR Review

> **Confidence**: Tier 2. Pattern derived from a production codebase that has run this exact three-provider setup for an extended period. The architecture principle (distinct, non-overlapping roles per tool) generalizes; the specific severity thresholds, domain names, and file-count cutoffs in the examples are illustrative starting points, not universal defaults.

Running two or three automated reviewers on the same PR without a plan produces the same finding three times in three different comment styles, which trains developers to skim past all of them. The fix is not picking one tool over the others, it's giving each tool a job the other two don't do, and writing that boundary down where every config file can see it.

This page documents that architecture: Claude Code Action for deep semantic review and the only tool allowed to block merge, a deterministic linter-style tool (CodeRabbit or equivalent) for PASS/FAIL pre-merge checks, and a cross-file RAG tool (Greptile or equivalent) for invariants that span multiple files. It builds directly on the [GitHub Actions Workflows](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-github-actions) patterns and the [ready-made templates](/lib/09-harness/claude-code-ultimate-guide/examples-github-actions) in this repo; read those first if you're starting from zero. [Loop & Graph Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-loop-graph-engineering#5-allocate-judgment-explicitly) explains how to assign acceptance authority and measure reviewer independence.

---

## Table of Contents

1. [Why Three Providers, Not One](#why-three-providers-not-one)
2. [Role Separation](#role-separation)
3. [The Non-Duplication Rule](#the-non-duplication-rule)
4. [Blocking Merge: the CI Gate](#blocking-merge-the-ci-gate)
5. [Scaling to Large PRs: Batching](#scaling-to-large-prs-batching)
6. [Cutting Redundant Reviews: Delta-Review](#cutting-redundant-reviews-delta-review)
7. [Cross-Tool Deduplication](#cross-tool-deduplication)
8. [Known Friction: Rule Drift Across Configs](#known-friction-rule-drift-across-configs)
9. [Interactive Companions vs. CI](#interactive-companions-vs-ci)
10. [Setup Checklist](#setup-checklist)
11. [See Also](#see-also)

---

## Why Three Providers, Not One

A single review pass, no matter how good the model, misses things a differently-shaped tool catches. Claude Code Action reasons deeply about a diff in the context of the full codebase but reviews one PR at a time. A dedicated RAG-based tool like Greptile indexes the whole repo up front and can answer "does this new query respect the scoping rule enforced everywhere else," a question that requires searching dozens of unrelated files, not just the diff. A deterministic linter-style tool like CodeRabbit's custom checks can enforce a PASS/FAIL rule (no `console.log` in production code, financial totals stay symmetric) with zero false-negative risk, something an LLM-based reviewer will occasionally miss under time or context pressure.

The failure mode to avoid is stacking three tools that all try to do the first job. That triples review noise for zero coverage gain, and it's the default outcome if you install three code-review bots without deciding who owns what.

---

## Role Separation

| Provider | Job | Can it block merge? | Why this job fits this tool |
|----------|-----|---------------------|------------------------------|
| **Claude Code Action** | Deep semantic review: logic errors, security (IDOR, auth, injection), architecture violations, data integrity | Yes, via the [CI gate](#blocking-merge-the-ci-gate) | Full codebase context per PR, reasons about intent, not just pattern-matches |
| **CodeRabbit** (or equivalent) | PR summaries, auto-labelling, deterministic PASS/FAIL pre-merge checks | Optional, only for checks with a hard binary criterion | Cheap, fast, no false-negative risk on rules with a clear yes/no answer |
| **Greptile** (or equivalent) | Cross-file invariants: dependency chains, "does every caller of X respect rule Y," patterns that repeat across distant files | No | RAG-indexed search across the whole repo, not scoped to the diff |

Adjust the "job" column to your stack, not the principle. If your deterministic-check tool is something else (a custom lint rule, a separate CI job, Semgrep), the role still belongs in that column, not duplicated into the LLM reviewer's prompt.

---

### Separate discovery from verification evidence

In [Using LLMs to Secure Source Code, at 12:19](https://www.youtube.com/watch?v=imFedndyXYQ&t=739s), Eugene Yan describes a verifier that does not receive the discovery agent's reasoning trace and tries to refute candidate vulnerabilities. Applied to review, this means giving the verifier the claim, relevant source and reproducible evidence while avoiding a persuasive author narrative as its only input.

This is a practitioner method, not proof that a second model makes a finding correct. Preserve the verifier's attempts, counterexamples and unresolved questions, and adjudicate against the requirement. Different provider names alone do not establish independent evidence.

---

## The Non-Duplication Rule

Write the boundary into every config file, not just into a wiki page nobody reads mid-review-setup. Concretely:

- `.github/prompts/code-review.md` (Claude): a one-line header noting it owns deep semantic review and the merge gate, not style nits already caught by a linter.
- `.coderabbit.yaml` (or equivalent): a comment at the top stating it should not duplicate the LLM reviewer or the RAG tool. See the [template in this repo](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/github-actions/.coderabbit.yaml).
- `.greptile/rules.md` (or equivalent): same non-duplication note, explicit about which invariants live here because they require cross-file search, not because they were easiest to write down. See the [template](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/github-actions/.greptile/rules.md).

When a rule accidentally ends up in two configs, don't leave it, pick whichever tool has the actual vantage point for that check and remove it from the other. A rule about SQL injection in one specific router belongs in the LLM prompt (it needs to read the surrounding code to judge intent). A rule that a given Redis key must always be scoped by tenant ID everywhere in the codebase belongs in the RAG tool's rulebook (it needs to search every caller, not just the diff).

---

## Blocking Merge: the CI Gate

Automated review comments are advisory by default, nothing stops a merge unless a required CI check fails. The pattern that makes Claude's findings block bad merges: post the review as structured markdown with a parseable severity count, then run a small script that reads that count and fails the job if it's non-zero.

The [`gate` job](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/github-actions/claude-code-review.yml) in this repo's template does exactly this: it fetches the review Claude just posted, regex-matches `### 🔴 Must Fix (n)` from the summary table, and calls `core.setFailed()` if `n > 0`. Add that job's name to your branch protection's required status checks, and a 🔴 finding now genuinely blocks the merge button, not just guilt-trips the author in a comment thread.

Two things this depends on:

1. The reviewer's prompt must emit a **parseable** severity count in a stable format. If you change the heading text in your prompt file, update the gate script's regex to match.
2. Severity calibration must reflect actual business risk, not pattern frequency. A permission-check bug on a path handling sensitive data should be 🔴 regardless of how common that pattern is elsewhere in the codebase; a purely internal admin-tool bug can reasonably cap at 🟡. Write that calibration into the prompt file explicitly, don't leave it to the model's default judgment.

---

## Scaling to Large PRs: Batching

A single review pass over a 150-file PR either times out or spreads the model's attention so thin that findings get shallow. The [batched workflow template](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/github-actions/claude-code-review-batched.yml) in this repo handles this: a `check-size` job counts changed files, and above a threshold (75 in the shipped example, tune to your PR size distribution), a matrix job splits the diff by domain (migrations, backend services, API routes, frontend, tests) and runs each slice as an independent, parallel review. A final synthesis job merges the per-domain findings into one deduplicated severity table.

This keeps the same prompt file (`code-review.md`) as the source of truth for review criteria, only the scope changes per matrix job, via `append_system_prompt` restricting each batch to its domain's file globs. No duplicated review logic to maintain between the small-PR and large-PR paths.

---

## Cutting Redundant Reviews: Delta-Review

Re-reviewing the entire diff on every push to a long-lived PR burns tokens re-checking code Claude already approved on the previous push. A delta-review step compares the SHA embedded in the previous review (post it as an HTML comment, ``, inside the review body) against the current push's SHA, and scopes the new review to only the files touched since.
