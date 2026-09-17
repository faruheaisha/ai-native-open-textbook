---
title: "Agentic Bug Fix"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/docs/reference/agentic-bugfix.md"
sourceRel: "docs/reference/agentic-bugfix.md"
rawUrl: "/raw/07-coding/spec-kit/docs/reference/agentic-bugfix.md"
sourceSha256: "1585db643374ebdec28d26666ce0b5c18c8532c04e23a38aece726dd77b2f0b5"
pageSha256: "1585db643374ebdec28d26666ce0b5c18c8532c04e23a38aece726dd77b2f0b5"
contentMode: "local-full"
zh: ""
---

# Agentic Bug Fix

The **bug** extension adds a three-step bug triage process — assess, fix, and validate — that your coding agent runs alongside the core [Agentic SDD](/lib/07-coding/spec-kit/docs-reference-agentic-sdd) process. Each bug lives in its own directory under `.specify/bugs/<slug>/`, with one Markdown report per stage.

> [!NOTE]
> Commands are written in `/speckit.bug.*` form throughout this page. The exact invocation depends on your agent — some skills-based agents use `$speckit-bug-*` (e.g. Codex, ZCode) or `/skill:speckit-bug-*` (e.g. Kimi). Substitute the form your agent exposes.

The bug extension is a bundled, opt-in extension. Install it before using these commands:

```bash
specify extension add bug
```

The three commands share a single handle — the **slug**, the per-bug directory name under `.specify/bugs/`. Supply it with `slug=<name>`; if omitted, `/speckit.bug.assess` asks for one (or generates a unique one in automated mode). Slugs are normalized to lowercase kebab-case. If an assessment already exists for a slug, an interactive run asks before overwriting it, while an automated run refuses and picks a new unique slug instead.

```text
/speckit.bug.assess -> /speckit.bug.fix -> /speckit.bug.test
```

## `/speckit.bug.assess`

Triages a bug report — pasted text (such as a stack trace) or a URL (such as a GitHub issue) — against the codebase: it judges whether the report is a real bug, locates the suspected code paths, and proposes a remediation. This command is **read-only**: it writes only `assessment.md` and never modifies source code.

```text
/speckit.bug.assess "TypeError: cannot read properties of undefined (reading 'token') at /auth/callback"
```

```text
/speckit.bug.assess https://github.com/example/repo/issues/1234 slug=callback-token
```

Output: `.specify/bugs/<slug>/assessment.md`.

## `/speckit.bug.fix`

Applies the remediation described in the assessment and records exactly what changed. This is the **only** bug command that edits source code, and it stays within the files listed in the assessment unless new evidence requires expanding scope (logged under **Deviations from Assessment**).

```text
/speckit.bug.fix slug=callback-token
```

Output: `.specify/bugs/<slug>/fix.md`.

## `/speckit.bug.test`

Validates the fix by re-running the reproduction and any added tests, then records the verification result — one of `verified`, `partial`, or `failed`. Like `assess`, it is **read-only** with respect to source code. Verdicts are never over-claimed: if the assessment listed a reproduction that wasn't actually exercised, the overall result is downgraded to `partial` rather than reported as `verified`.

```text
/speckit.bug.test slug=callback-token
```

Output: `.specify/bugs/<slug>/test.md`.
