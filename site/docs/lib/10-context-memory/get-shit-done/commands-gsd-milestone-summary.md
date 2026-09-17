---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/milestone-summary.md"
sourceRel: "commands/gsd/milestone-summary.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/milestone-summary.md"
sourceSha256: "9566ebc9dff7786b99b586f97733e79deaf7b694cd33fe4060682fc7150923cf"
pageSha256: "9566ebc9dff7786b99b586f97733e79deaf7b694cd33fe4060682fc7150923cf"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Generate a structured milestone summary for team onboarding and project review. Reads completed milestone artifacts (ROADMAP, REQUIREMENTS, CONTEXT, SUMMARY, VERIFICATION files) and produces a human-friendly overview of what was built, how, and why.

Purpose: Enable new team members to understand a completed project by reading one document and asking follow-up questions.
Output: MILESTONE_SUMMARY written to `.planning/reports/`, presented inline, optional interactive Q&A.
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/milestone-summary.md
&lt;/execution_context>

&lt;context>
**Project files:**
- `.planning/ROADMAP.md`
- `.planning/PROJECT.md`
- `.planning/STATE.md`
- `.planning/RETROSPECTIVE.md`
- `.planning/milestones/v\{version\}-ROADMAP.md` (if archived)
- `.planning/milestones/v\{version\}-REQUIREMENTS.md` (if archived)
- `.planning/phases/*-*/` (SUMMARY.md, VERIFICATION.md, CONTEXT.md, RESEARCH.md)

**User input:**
- Version: $ARGUMENTS (optional — defaults to current/latest milestone)
&lt;/context>

&lt;process>
Execute end-to-end.
&lt;/process>

&lt;success_criteria>
- Milestone version resolved (from args, STATE.md, or archive scan)
- All available artifacts read (ROADMAP, REQUIREMENTS, CONTEXT, SUMMARY, VERIFICATION, RESEARCH, RETROSPECTIVE)
- Summary document written to `.planning/reports/MILESTONE_SUMMARY-v\{version\}.md`
- All 7 sections generated (Overview, Architecture, Phases, Decisions, Requirements, Tech Debt, Getting Started)
- Summary presented inline to user
- Interactive Q&A offered
- STATE.md updated
&lt;/success_criteria>
