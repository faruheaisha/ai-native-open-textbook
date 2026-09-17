---
title: "Business Data Analysis"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/business-data-analysis/SKILL.md"
sourceRel: "skills/business-data-analysis/SKILL.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/business-data-analysis/SKILL.md"
sourceSha256: "bdf333566d44d66f30906a59909154d6a07de9fc5a7c31969243c0dcbfa60675"
pageSha256: "bdf333566d44d66f30906a59909154d6a07de9fc5a7c31969243c0dcbfa60675"
contentMode: "local-full"
zh: ""
---

# Business Data Analysis

Own **Analyze** in Lesson 4. Read [safety](/lib/08-agents/agent-systems-handbook/skills-business-data-analysis-references-safety-rules), [persistence](/lib/08-agents/agent-systems-handbook/skills-business-data-analysis-references-persistence-contract) and the runnable [README](/lib/08-agents/agent-systems-handbook/skills-business-data-analysis) before executing the selected workflow.

## Workflow

1. Select one local CSV/XLSX/clean.json or a canonical course dataset with rows. Confirm what one row means, date range, population and denominator. If the remote record has metadata only, ask for its explicitly selected local artifact; do not invent rows.
2. Profile shape, column types, nulls, exact duplicates and parse problems. For CSV/XLSX, reuse Structure's reader without applying a rewrite. A schema can clarify dates/currencies, but analysis does not modify input.
3. Summarize categorical counts and numeric min/max/sum/mean/median by unit. Keep contact identifiers out of categorical values in stored reports. Flag invalid, negative and IQR-outlier values for review; a flag is not proof the source is wrong.
4. If stage/value fields exist, calculate stage counts, closed-only win rate and open/won values by currency. State the denominator and row-grain assumptions. No closed deals means an undefined rate, not 0%; never add CAD and USD or invent an exchange rate.
5. Produce Overview, Data Quality, Key Patterns, Business Insights, Recommended Next Questions and Source / Query Evidence. Distinguish descriptive observations from causes or forecasts. If duplicate/grain concerns are unresolved, label totals provisional and return to Structure for review.
6. Save a new analysis report/run with source hash or canonical dataset revision and calculation description. Read back that record. Verify the source hash is unchanged; only report artifacts and analysis records may be new. CRM changes require the separate Operate workflow.

## Shared boundary

Use the course-support client for local or explicitly configured Prompthon storage. Remote organization/workspace, server-derived actor, scopes, revisions and canonical readback are mandatory. The Web App backend remains [a tracked dependency](/lib/08-agents/agent-systems-handbook/skills-course-support-references-backend-dependency); never give learners a Neon connection string. See [source notes](/lib/08-agents/agent-systems-handbook/skills-business-data-analysis-references-source-notes) for licensing and the original implementation boundary.
