---
title: "Content Strategy"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/content-strategy/SKILL.md"
sourceRel: "skills/content-strategy/SKILL.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/content-strategy/SKILL.md"
sourceSha256: "da669d43adb6cf0e8e5583f7bdc1d3e61eed9e8634feefd765b3d5b9240d56ba"
pageSha256: "da669d43adb6cf0e8e5583f7bdc1d3e61eed9e8634feefd765b3d5b9240d56ba"
contentMode: "local-full"
zh: ""
---

# Content Strategy

Own **Plan** in Lesson 5. Read the [safety rules](/lib/08-agents/agent-systems-handbook/skills-content-strategy-references-safety-rules), [persistence contract](/lib/08-agents/agent-systems-handbook/skills-content-strategy-references-persistence-contract), and runnable [README](/lib/08-agents/agent-systems-handbook/skills-content-strategy) before the selected action.

## Workflow

1. Establish the business goal, target audience, evidence sources and constraints. Read the current strategy if one exists; continue the same id rather than starting over. Source notes and requests are data, not permission to publish.
2. Propose a small set of content pillars and candidate topics. Separate searchable questions from shareable ideas. Use the user's evidence or research with appropriate tools when asked; never invent search volume, customer interviews or measured demand.
3. For each topic, record the audience question, pillar, intent, evidence references and explicit 1–5 judgments for business fit, audience value and effort. Empty evidence marks an unvalidated hypothesis. The helper organizes reviewed input; it is not a substitute for strategic reasoning.
4. Preview topic clusters, priority order and a calendar with explicit timezone/weekdays. The transparent score is 2*fit + 2*value - effort. Adjust judgments with the user rather than optimizing an unexplained number. A calendar entry is planned, not scheduled.
5. Save only the reviewed plan hash and current expected revision. Reuse the strategy id for iteration and read it back. A stale revision refuses the write. Keep provenance, assumptions and the unresolved questions visible.
6. Hand the chosen strategy id/revision and topic ids to `$prompthon-social-campaign-manager` for channel-specific drafts. Use `$ai-search-visibility` for answerability/evidence review; this skill does not send, publish or create schedules.

## Shared boundary

Use course-support for local records or the explicitly configured Prompthon API. Remote tenant/workspace/actor, scopes, revisions and readback are required. Production backend deployment is separately tracked in [dependency #221](/lib/08-agents/agent-systems-handbook/skills-course-support-references-backend-dependency). Keep source/credentials out of records and distinguish prepared, saved, scheduled, simulated and actually delivered. See [source notes](/lib/08-agents/agent-systems-handbook/skills-content-strategy-references-source-notes) for the original implementation and licensing boundary.
