---
title: "Commit Contract"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/.agents/skills/change-traceability-review/references/commit-contract.md"
sourceRel: ".agents/skills/change-traceability-review/references/commit-contract.md"
rawUrl: "/raw/09-harness/better-harness/.agents/skills/change-traceability-review/references/commit-contract.md"
sourceSha256: "2c8928db8b673472b1056241e056c52c0e64384cddedb1064f42418e2c44dd77"
pageSha256: "2c8928db8b673472b1056241e056c52c0e64384cddedb1064f42418e2c44dd77"
contentMode: "local-full"
zh: ""
---

# Commit Contract

Treat Conventional Commits as baseline. The body should read like normal prose,
not a form. For spec-backed work, include a literal Story/issue token, spec
path or URL, and test evidence in a sentence:

```text
Implements HD-123 using docs/specs/hd-123-review-gate.md. The change keeps hook
behavior cross-platform and was validated with npm test.
```

Use `Story:`, `Spec:`, `Test:`, `Risk:`, `AI:`, or `Refs:` trailers only when a
reviewer, host tool, or external workflow explicitly requires them. Missing
evidence is different from explicit evidence: `Spec: none` is not proof that no
Spec is needed.

Report detailed risk, AI markers, and references in the Review Readiness Check
instead of forcing every commit body into a checklist.

Prefer one focused commit per coherent spec task. If a commit spans multiple AC
ids or modules, the body should summarize the split so reviewers can map diff
hunks back to the spec. If implementation changes the intended behavior, update
the spec in the same commit or in an immediately preceding spec commit and cite
that path/hash.
