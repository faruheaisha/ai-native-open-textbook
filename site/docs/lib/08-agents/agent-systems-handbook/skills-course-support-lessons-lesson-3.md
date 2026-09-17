---
title: "Lesson 3 — Build → Test → Deploy"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/course-support/lessons/lesson-3.md"
sourceRel: "skills/course-support/lessons/lesson-3.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/course-support/lessons/lesson-3.md"
sourceSha256: "ddfcd8537e942c4637b659d5adda1b0be63c510ad4a0c43c68fa6d06039bb088"
pageSha256: "ddfcd8537e942c4637b659d5adda1b0be63c510ad4a0c43c68fa6d06039bb088"
contentMode: "local-full"
zh: ""
---

# Lesson 3 — Build → Test → Deploy

Outcome: a useful local page, browser evidence, and (with provisioned access) an actual verified Vercel preview. A mock provider check or localhost URL does not satisfy the final live-preview outcome.

## Before class

Install the foundation and all three Lesson 3 skills with `python3 skills/course-support/scripts/setup_course_skills.py --lesson 3`. Use Python 3.10+, Node.js, and the pinned Playwright/Chromium environment from the Test README. Give each student a synthetic workspace. Provision a dedicated Git-linked Vercel demo project, first deployment, credentials and safe environment before class; never use the handbook site's production project. Remote course storage needs the separately tracked backend contract.

## Five-minute start

Follow the [Build quickstart](/lib/08-agents/agent-systems-handbook/skills-web-builder), then the [Test quickstart](/lib/08-agents/agent-systems-handbook/skills-webapp-testing). Inspect the generated page and both PNGs. Expect a basic build pass, two viewport results and a visible synthetic form confirmation. The form does not send a message or create a signup.

## 25-minute exercise

1. Minutes 0–5: name the purpose/audience and review the brief's sections/style/constraints. Copy it and change one section.
2. Minutes 5–12: build into a fresh folder; inspect changed files and actual page. Preserve existing frameworks and learner edits.
3. Minutes 12–18: run the browser suite, open desktop/mobile evidence, and fix a deliberately incorrect assertion. Rebuild/retest changed source.
4. Minutes 18–25: use the preprovisioned Git project, record the committed build and test it, then review the actual preview deployment with [Deploy](/lib/08-agents/agent-systems-handbook/skills-vercel-deploy). Compare provider id/target/commit/READY and page marker to the canonical record.

Modification: choose bold-contrast or change the heading, update the expected test text, and observe why the old fingerprint cannot authorize a new deployment.

## Evidence, reset and instructor review

Collect build run id, test id, two local screenshot references, and the actual deployment id/URL/commit/readback state. Do not upload screenshot binaries or source bundles to course records. Use local storage if the backend is unprovisioned; explicitly label it local. Without Vercel access, complete Build/Test plus synthetic Deploy cases and mark the live deployment prerequisite unresolved.

Reset only the scoped demo records via the shared reset preview/confirmation flow. It affects records from other lessons in that workspace, but never deletes local source, screenshots or provider deployments. Use a fresh workspace/output folder for a clean retry. An uncertain submission must be recovered by provider readback, not resubmitted. Production always needs additional approval.
