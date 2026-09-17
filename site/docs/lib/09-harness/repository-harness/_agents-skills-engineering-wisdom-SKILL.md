---
title: "Engineering Wisdom"
sourceId: "09-harness/repository-harness"
sourceTitle: "Repository Harness（仓库级 Agent 工作区）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/hoangnb24/repository-harness"
entryUrl: "https://github.com/hoangnb24/repository-harness/blob/e765792b635b4d5e3e5fc0578f82f9ca5dea2681/.agents/skills/engineering-wisdom/SKILL.md"
sourceRel: ".agents/skills/engineering-wisdom/SKILL.md"
rawUrl: "/raw/09-harness/repository-harness/.agents/skills/engineering-wisdom/SKILL.md"
sourceSha256: "ef5552861a03749e83688c7207601d283806bffc131c72225239c5ae32c70a4e"
pageSha256: "ef5552861a03749e83688c7207601d283806bffc131c72225239c5ae32c70a4e"
contentMode: "local-full"
zh: ""
---

# Engineering Wisdom

Give practical advice without treating a school of thought as universal law.
Repository intent, code, tests, and observed behavior remain authoritative.

## Establish Scope

1. Read `AGENTS.md`, `docs/WORKFLOW.md`, and only the repository material
   relevant to the request.
2. Confirm that the user explicitly invoked this skill. Installation alone is
   not activation.
3. Determine whether the request is advice/review or an authorized change.
   Keep reviews read-only. For changes, follow repository authority and
   validation rules before editing.
4. Read [references/heuristics.md](/lib/09-harness/repository-harness/_agents-skills-engineering-wisdom-references-heuristics). Select only
   heuristics that match observed evidence. Read
   [references/sources.md](/lib/09-harness/repository-harness/_agents-skills-engineering-wisdom-references-sources) when attribution or the
   intellectual basis matters.
5. When the request crosses a host boundary, inspect the composition root,
   external input, adapter semantics, shipped artifact, and cumulative state
   that are relevant. Do not assume isolated core tests prove those boundaries.

## Review From Evidence

For each material finding, keep these fields separate:

- **Observation:** A concrete repository fact with a path, symbol, test,
  command result, or behavior.
- **Heuristic:** One named rule of thumb from the catalog and why it may apply.
- **Trade-off:** Counter-pressure, cost, or a condition under which following
  the heuristic would make the system worse.
- **Proposed repository-owned enforcement:** Either `None`, or a separately
  labeled proposal naming the repository owner, authority still required,
  possible mechanism, and removal condition. Never describe advice as an
  existing rule unless repository evidence already establishes it.
- **Verification:** A focused observation or executable check that could
  confirm or falsify the recommendation. Match proof to the claim: test pure
  policy in isolation, startup at the composition root, and delivery through
  the artifact users actually load.

Rank findings by user impact and change risk. Prefer one concrete example over
several abstract claims.

## Advise Before Enforcing

- Do not rewrite application architecture merely because a heuristic suggests
  a different shape.
- Do not introduce interfaces, layers, tests, linters, size limits, coverage
  targets, or dependency rules without repository-owned authority.
- Propose the smallest reversible experiment when evidence is incomplete.
- Preserve a deliberate duplication, coupling, integration test, or framework
  dependency when its local benefit outweighs the heuristic.
- Say when no catalog heuristic materially improves the observed code.

If the user requests implementation and authority is sufficient, make the
smallest coherent change and run the repository's own proof. Keep the review
rationale separate from the evidence that the change works.

## Response Shape

Start with the outcome in one sentence. Then report only material findings:

```text
Finding: <specific effect>
Observation: <repository evidence>
Heuristic: <contextual rule of thumb and applicability>
