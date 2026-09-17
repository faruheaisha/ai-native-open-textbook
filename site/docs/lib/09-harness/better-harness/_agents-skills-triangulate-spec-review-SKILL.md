---
title: "Triangulate Spec Review"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/.agents/skills/triangulate-spec-review/SKILL.md"
sourceRel: ".agents/skills/triangulate-spec-review/SKILL.md"
rawUrl: "/raw/09-harness/better-harness/.agents/skills/triangulate-spec-review/SKILL.md"
sourceSha256: "15f69c0d9fd41bd528af0791eef58e2f760cc2928839f7348280d4a89b620d38"
pageSha256: "15f69c0d9fd41bd528af0791eef58e2f760cc2928839f7348280d4a89b620d38"
contentMode: "local-full"
zh: ""
---

# Triangulate Spec Review

Use independent AI reviewers as an evaluation surface for specs. The lead agent
owns synthesis, edits, validation, and the final recommendation.

## Workflow

1. Resolve the target spec path and the acceptance gate. If the user did not
   name dimensions, default to `complexity`, `convenience`, and `evolution`.
2. Read the target spec and nearby repo instructions. Do not pass your suspected
   fixes or conclusions to reviewers.
3. Use the same read-only prompt for every reviewer. Ask for structured
   `P1`/`P2`/`P3` findings and a `p1_p2_clear` boolean.
4. Run at least two reviewers; prefer three when available. Use
   `scripts/run-triad-review.mjs` for repeatable local runs.
5. Normalize findings. Treat reviewers as evidence, not authority:
   fix convergent `P1`/`P2` issues first, challenge weak or contradictory
   findings, and leave `P3` as backlog unless it is cheap and clarifying.
6. If the user asked for edits, patch only the owning spec or directly related
   helper docs. Keep unrelated refactors out of the review loop.
7. Run local validation such as `git diff --check`, relevant tests, and targeted
   `rg` checks for renamed concepts or stale paths.
8. Repeat the reviewer pass until every requested reviewer reports no `P1` or
   `P2`, or until the user stops the loop.

## Resources

- Read `references/review-loop.md` for the prompt contract, severity rubric,
  command matrix, and iteration patterns.
- Run this skill's `scripts/run-triad-review.mjs --target <path>` script,
  resolved relative to the `triangulate-spec-review` skill directory, to execute
  a read-only review round and write normalized JSON output.

## Guardrails

- Pass raw artifacts and task-local context to reviewers, not intended answers.
- Keep every reviewer prompt materially identical unless a tool requires command
  syntax changes.
- Do not let reviewers edit files. The lead agent applies changes after
  comparing findings.
- Do not declare acceptance from an average score. Acceptance requires no
  `P1`/`P2` findings from the required review surface.
