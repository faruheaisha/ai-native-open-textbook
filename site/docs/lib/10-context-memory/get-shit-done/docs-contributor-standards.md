---
title: "Contributor Standards"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/contributor-standards.md"
sourceRel: "docs/contributor-standards.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/contributor-standards.md"
sourceSha256: "51c0c59c40c1bdc2b7546c267f5fd41979cd36887199b4d1121cdace7a070932"
pageSha256: "51c0c59c40c1bdc2b7546c267f5fd41979cd36887199b4d1121cdace7a070932"
contentMode: "local-full"
zh: ""
---

# Contributor Standards

Standards for working with `CONTEXT.md`, `docs/adr/`, and AI-agent-assisted contributions.

These apply to every PR — fix, enhancement, or feature. They are part of the merge contract, not optional background reading.

**Standards hierarchy** (canonical, in order):

1. `CONTEXT.md` — domain language and module naming
2. `docs/adr/` — accepted architectural decisions
3. Approved issue scope

---

## CONTEXT.md

### What it is

`CONTEXT.md` is the single source of truth for domain vocabulary. It defines:

- **Domain terms** — canonical Module names, seam vocabulary, and Interface names (e.g. Dispatch Policy Module, Command Contract Validation Module, Planning Workspace Module)
- **Recurring PR mistakes** — CodeRabbit findings that recur; covers tests, shell guards, changesets, docs
- **Workflow learnings** — patterns distilled from triage + PR cycles

### Format

`CONTEXT.md` is written as flat named sections under `## Domain terms` (for Modules/seams) and `##` sections for recurring rules. Machine-oriented predicates use `KEY.SUBKEY=value` flat format in code blocks under `## AI Ops Memory`.

Adding a new Module or seam:

- Add a `### <Module Name>` entry under `## Domain terms`.
- Write one paragraph. State what the Module owns. Be concrete — list the Interface names and policy boundaries it covers.
- Do not add synonyms; pick one name and use it everywhere.

Extending an existing predicate:

- Add a `KEY.SUBKEY=value` line inside the relevant `## AI Ops Memory` block.
- Do not create a new top-level section for a variation on an existing concept.

When to add a new predicate vs extend an existing one:

- New predicate: the concept has a distinct identity, distinct owner, and is not covered by any existing section.
- Extend existing: the new fact qualifies, constrains, or amends an already-named Module. Add it as a sub-entry or amendment paragraph.

### Contributor requirements

- Read `CONTEXT.md` in full before naming anything (modules, interfaces, seams, tests, PRs).
- Use `CONTEXT.md` vocabulary consistently in code comments, tests, issue/PR text, and docs.
- Do not invent synonyms. If you need a concept that is not in the glossary, note it explicitly in the issue or PR rather than using ad-hoc language.
- Do not rewrite `CONTEXT.md` as part of drive-by cleanup; propose focused updates tied to the approved issue scope.
- `CONTEXT.md` is maintainer-owned. Contributors can propose additions via issue discussion, but final wording is the maintainer's call.

### Example (correct)

A PR that adds a new query adapter should use the term **Native Dispatch Adapter Module** (from `CONTEXT.md`), not "native adapter," "query native handler," or any other variant.

---

## ADRs

### What they are

`docs/adr/` contains Architecture Decision Records. Each ADR is a concise record of one accepted decision: the problem, the decision, and the consequences. Accepted ADRs are the current standard.

Currently accepted ADRs:

| File | Decision |
|------|----------|
| `0001-dispatch-policy-module.md` | Dispatch Policy Module as the single seam for query execution outcomes |
| `0002-command-contract-validation-module.md` | Command Contract Validation Module / command contract centralization |
| `0003-model-catalog-module.md` | Model Catalog Module as the single source of truth for agent profiles and runtime tier defaults |
| `0004-worktree-workstream-seam-module.md` | Planning Workspace Module as single seam for worktree and workstream state |
| `0005-sdk-architecture-seam-map.md` | SDK Architecture seam map for query/runtime surfaces |
| `0006-planning-path-projection-module.md` | Planning Path Projection Module for SDK query handlers |
| `0007-sdk-package-seam-module.md` | SDK Package Seam Module owns SDK-to-get-shit-done-cc compatibility |

### When an ADR is required

An ADR is required when a decision:

- Introduces or removes a Module seam that other code will depend on.
- Changes the policy contract of an existing accepted ADR.
- Establishes a new architectural invariant (naming convention, test contract, CI enforcement).

An ADR is optional (a comment in the relevant issue or PR is sufficient) when:

- The change is a bugfix that lands squarely within an existing accepted decision.
- The change is a docs or test improvement with no architectural surface.

### Naming conventions

**New ADRs and PRDs use issue#-prefix slug naming. This is a contributor requirement, not a suggestion.**

```text
