---
title: "Audit Checklist"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/.agents/skills/skill-review/references/audit-checklist.md"
sourceRel: ".agents/skills/skill-review/references/audit-checklist.md"
rawUrl: "/raw/09-harness/better-harness/.agents/skills/skill-review/references/audit-checklist.md"
sourceSha256: "1c3c849a715ed391839734be7253c35d2ad2153b17f7c67d2f98a055c7fa3252"
pageSha256: "1c3c849a715ed391839734be7253c35d2ad2153b17f7c67d2f98a055c7fa3252"
contentMode: "local-full"
zh: ""
---

# Audit Checklist

## Trigger contract

- Frontmatter `description` states when to use the skill, not the workflow.
- Name is short, hyphen-case, action-oriented, and discoverable by likely user
  words.
- Body does not rely on a "when to use" section to fix weak metadata.

## Progressive disclosure

- `SKILL.md` holds only the main workflow, routing rules, and required
  invariants.
- Detailed variants, schemas, examples, style rules, and long checklists live in
  directly linked references.
- References are one hop from `SKILL.md`, named by the decision that loads them,
  and non-empty.

## Workflow and delegation

- The main workflow is explicit enough that an agent knows what to do first,
  what gates the next phase, and when to stop.
- Subagents are part of the workflow only when they reduce real scope risk; they
  are not a decorative list of roles.
- The lead agent owns final consistency, evidence quality, and output claims.

## Template ownership

- Base report templates own structure and parser-safe fields.
- Runtime-specific templates own runtime rules such as Canvas, HTML, SDK imports,
  companion bullets, preview, and validation.
- Style templates own visual grammar only. They should not duplicate runnable
  skeletons, shared SDK rules, or mode-selection logic.

## Prompt and report readability

- Cut explanations an AI can infer from headings, examples, or local code.
- Prefer one concrete contract over repeated warnings in several files.
- Replace placeholder walls, consecutive empty headings, and giant table rows
  with compact field requirements or one realistic example.
- Keep exact labels, scoring scales, and parser-sensitive metadata centralized.

## Evidence and validation

- Every important review claim has a file path, line, command, diff, or artifact
  anchor.
- Missing evidence is reported as missing or unverified, not filled by
  inference.
- Validation checks the same surface the skill claims to support. For visual
  chains, build/preview/runtime validation is separate from Markdown review.
