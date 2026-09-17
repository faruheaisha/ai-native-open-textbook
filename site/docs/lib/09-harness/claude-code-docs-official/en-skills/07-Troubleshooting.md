---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/skills.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/skills.md"
sourceSha256: "6cb66d6c1ab6b06eda6dd6854f4133901c8daef8fc447f59fe65ac4038ec8043"
pageSha256: "41b9017e7e6f4de61e8b55fbe46c61f7d5892c099da0b6e8e7c8826625b807e7"
contentMode: "local-full"
zh: ""
---

## Troubleshooting

### Skill not triggering

If Claude doesn't use your skill when expected:

1. Check the description includes keywords users would naturally say
2. Verify the skill appears in `What skills are available?`
3. Try rephrasing your request to match the description more closely
4. Invoke it directly with `/skill-name` if the skill is user-invocable

If the frontmatter YAML is malformed, Claude Code loads the skill body with empty metadata, so `/skill-name` still works but Claude can't match against your `description`. Run with `--debug` to see the parse error.

To find `SKILL.md` files whose frontmatter doesn't parse, run [`claude plugin validate`](https://code.claude.com/docs/en/plugin-marketplaces#validate-a-plugin-or-a-directory-without-a-manifest) on the skills directory, for example `claude plugin validate .claude/skills` for project skills or `claude plugin validate ~/.claude/skills` for personal skills. Requires Claude Code v2.1.233 or later.

### Skill triggers too often

If Claude uses your skill when you don't want it:

1. Make the description more specific
2. Add `disable-model-invocation: true` if you only want manual invocation

### Skill descriptions are cut short

Claude Code loads a listing of skill names and descriptions into context so Claude knows what's available. The listing always contains every skill name, but if you have many skills, Claude Code shortens descriptions to fit the listing's character budget, which can strip the keywords Claude needs to match your request. The budget scales at 1% of the model's context window. When the listing overflows, Claude Code drops descriptions starting with the skills you invoke least, so the skills you use most keep their full text.

Run `/doctor` for an estimate of the listing's context cost and its biggest contributors. To find skills worth turning off, run [`/skill-doctor`](#find-unused-skills). When the listing exceeds its budget, Claude Code also writes a warning to the debug log, visible with [`--debug`](https://code.claude.com/docs/en/cli-reference#cli-flags).

The Skills row in `/context` reports the size of the listing after the budget is applied, so it matches what the model receives. Before v2.1.196, the row counted the full text of every description and could show a value several times larger than the configured budget.

To raise the budget, set the [`skillListingBudgetFraction`](https://code.claude.com/docs/en/settings-reference#skilllistingbudgetfraction) setting (e.g. `0.02` = 2%) or the `SLASH_COMMAND_TOOL_CHAR_BUDGET` environment variable to a fixed character count. To free budget for other skills, set low-priority entries to `"name-only"` in [`skillOverrides`](#override-skill-visibility-from-settings) so they list without a description. You can also trim the `description` and `when_to_use` text at the source: put the key use case first, since each entry's combined text is capped at 1,536 characters regardless of budget. The cap is configurable with [`skillListingMaxDescChars`](https://code.claude.com/docs/en/settings-reference#skilllistingmaxdescchars).
