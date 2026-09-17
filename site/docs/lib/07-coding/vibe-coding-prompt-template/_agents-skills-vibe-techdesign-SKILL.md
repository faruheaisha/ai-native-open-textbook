---
title: "MVP technical design"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/.agents/skills/vibe-techdesign/SKILL.md"
sourceRel: ".agents/skills/vibe-techdesign/SKILL.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/.agents/skills/vibe-techdesign/SKILL.md"
sourceSha256: "923e58d843bd3eca81d1ef5e8ec5528b2e39fc9b2487eeb204fc0e54f91e3de5"
pageSha256: "923e58d843bd3eca81d1ef5e8ec5528b2e39fc9b2487eeb204fc0e54f91e3de5"
contentMode: "local-full"
zh: ""
---

# MVP technical design

Read the agreed requirements and reuse Handoff Context. Inspect an existing
project's stack and relevant implementation before proposing replacements.
Ask only for consequential choices that remain unresolved; a known answer
does not need another confirmation echo.

Describe the architecture needed for the core journey: component/service
boundaries, data ownership, integration contracts, deployment target, and
relevant failure behavior. Prefer the smallest design that meets requirements.
Add auth, storage, infrastructure, AI, or paid services only when justified.
Verify changing vendor details from the installed code or official sources.

Record meaningful tradeoffs, compatibility constraints, migration/recovery
requirements where applicable, and how the result will be checked. Distinguish
local test operations from external sends, production writes, and deployments.
Keep secrets out of generated documents. Do not assign broad tool permissions
or require a team of agents to execute an ordinary implementation.

Use the manifest's configured design path or `docs/TechDesign-[AppName]-MVP.md`.
Quick mode can be a short architecture and implementation plan; deeper modes
should expand only where uncertainty or risk warrants it. End with Handoff
Context carrying app, known user level, platform, budget, timeline, mode,
constraints, decisions, source files, and open questions. Continue to the next
authorized workflow stage rather than stopping solely because a document exists.

For a guided interview with unresolved requirements, consult the relevant
[optional question prompts](/lib/07-coding/vibe-coding-prompt-template/_agents-skills-vibe-techdesign-references-question-bank).

When producing a document for `vibeworkflow`, include the exact
[CLI output metadata](/lib/07-coding/vibe-coding-prompt-template/_agents-skills-vibe-techdesign-references-cli-output). This is a parser contract,
not an optional prose template.
