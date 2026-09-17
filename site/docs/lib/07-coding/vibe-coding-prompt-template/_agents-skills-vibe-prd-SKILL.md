---
title: "Product requirements"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/.agents/skills/vibe-prd/SKILL.md"
sourceRel: ".agents/skills/vibe-prd/SKILL.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/.agents/skills/vibe-prd/SKILL.md"
sourceSha256: "44deb0fa07d8d9debc7158f6b26a57f098138286314fe2ced3d533f6d9bcd8a2"
pageSha256: "44deb0fa07d8d9debc7158f6b26a57f098138286314fe2ced3d533f6d9bcd8a2"
contentMode: "local-full"
zh: ""
---

# Product requirements

Use existing research, the user's request, and Handoff Context to define the
product outcome. Do not repeat an interview whose answers are already known.
Ask only for unresolved requirements that affect scope or acceptance; make
reversible assumptions explicit and continue when the brief is sufficient.

Write a PRD proportional to the product. Cover the target user and problem,
the core journey, MVP scope, out-of-scope work, meaningful failure states,
constraints, and observable acceptance criteria. Include AI, accounts, payments,
analytics, compliance, or automation only when the product needs them.

For a small project, a short document is enough. For a complex one, clarify
dependencies and consequential decisions before they block implementation.
Avoid fixed feature counts, mandatory personas, or market research that does
not change the product decision. Distinguish agreed facts from assumptions.

Use the manifest's configured PRD path or `docs/PRD-[AppName]-MVP.md`. End with
Handoff Context carrying app, known user level, platform, budget, timeline,
mode, constraints, decisions, source files, and open questions. Do not present
planned acceptance checks as executed evidence. If the user requested the
whole workflow, continue into the technical design within that scope.

For a guided interview with unresolved requirements, consult the relevant
[optional question prompts](/lib/07-coding/vibe-coding-prompt-template/_agents-skills-vibe-prd-references-question-bank).

When producing a document for `vibeworkflow`, include the exact
[CLI output metadata](/lib/07-coding/vibe-coding-prompt-template/_agents-skills-vibe-prd-references-cli-output). This is a parser contract,
not an optional prose template.
