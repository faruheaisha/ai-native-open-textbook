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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/CONFIGURATION.md"
sourceRel: "docs/CONFIGURATION.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/CONFIGURATION.md"
sourceSha256: "3e67baa72c7b00dab65464616eb7f7f38b2c72cad311f0d2b8c6e7ba8e914eb1"
pageSha256: "da08bb2787329a898cd0d5c99a4dc92f93174507b83ad8757f66fd528d73c36c"
contentMode: "local-full"
zh: ""
---

## Ship Settings

`ship.pr_body_sections` adds additional PR body sections for project-specific PRD/PR body content in `/gsd-ship` without editing `get-shit-done/workflows/ship.md`.

For a user guide with onboarding examples and troubleshooting, see [Custom PR Body Sections](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/ship-pr-body-sections.md).

This list is append-only: configured entries are added after the core `Summary`, `Changes`, `Requirements Addressed`, `Verification`, and `Key Decisions` sections. They cannot replace, remove, or reorder required sections.

Recommended lean/agile PRD uses include user stories, acceptance criteria, Definition of Done or release criteria, risks and dependencies, success metrics, and stakeholder review notes. Keep these sections short and evidence-oriented so the PR body remains a living release artifact rather than a static requirements dump.

Each entry supports:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `heading` | string | required | Markdown section heading rendered as `## \{heading\}`. Must be a single line. |
| `enabled` | boolean | `true` | When `false`, onboarding can keep a candidate section in config without rendering it in generated PR bodies. |
| `source` | string | (none) | Optional fallback chain of planning artifact headings, such as `PLAN.md ## Risks \|\| VERIFICATION.md ## Manual Checks`. Allowed artifacts are `ROADMAP.md`, `PLAN.md`, `SUMMARY.md`, `VERIFICATION.md`, `STATE.md`, `REQUIREMENTS.md`, and `CONTEXT.md`. |
| `template` | string | (none) | Literal Markdown with closed tokens: `\{phase_number\}`, `\{phase_name\}`, `\{phase_dir\}`, `\{base_branch\}`, `\{padded_phase\}`. |
| `fallback` | string | (none) | Literal Markdown used when `source` yields no content and no `template` is provided. |

At least one of `source`, `template`, or `fallback` is required for each section. The default is `[]`, so existing projects keep their current `/gsd-ship` output until onboarding adds enabled entries.

Example:

```json
{
  "ship": {
    "pr_body_sections": [
      {
        "heading": "User Stories & Acceptance Criteria",
        "enabled": true,
        "source": "REQUIREMENTS.md ## User Stories || REQUIREMENTS.md ## Acceptance Criteria",
        "fallback": "- Acceptance criteria are covered by the linked requirements and verification evidence."
      },
      {
        "heading": "Risks & Rollback",
        "enabled": true,
        "source": "PLAN.md ## Risks || PLAN.md ## Rollback",
        "fallback": "- Rollback: revert this PR."
      },
      {
        "heading": "Stakeholder Sign-off",
        "enabled": false,
        "template": "- Product owner: pending for {phase_name}"
      }
    ]
  }
}
```

### Recommended Presets

| Scenario | mode | granularity | profile | research | plan_check | verifier |
|----------|------|-------------|---------|----------|------------|----------|
| Prototyping | `yolo` | `coarse` | `budget` | `false` | `false` | `false` |
| Normal development | `interactive` | `standard` | `balanced` | `true` | `true` | `true` |
| Production release | `interactive` | `fine` | `quality` | `true` | `true` | `true` |
