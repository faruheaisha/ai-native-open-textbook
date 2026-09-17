---
title: "Weather SVG Creator Skill"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/.claude/skills/weather-svg-creator/SKILL.md"
sourceRel: ".claude/skills/weather-svg-creator/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/.claude/skills/weather-svg-creator/SKILL.md"
sourceSha256: "b157e73e8da5c5705dc0c56c83a47483b0db349ef66e8d0016cd0bbe972ebefa"
pageSha256: "b157e73e8da5c5705dc0c56c83a47483b0db349ef66e8d0016cd0bbe972ebefa"
contentMode: "local-full"
zh: ""
---

# Weather SVG Creator Skill

Creates a visual SVG weather card for Dubai, UAE and writes the output files.

## Task

You will receive a temperature value and unit (Celsius or Fahrenheit) from the calling context. Create an SVG weather card and write both the SVG and a markdown summary.

## Instructions

1. **Create SVG** — Use the SVG template from [reference.md](/lib/09-harness/claude-code-best-practice/_claude-skills-weather-svg-creator-reference), replacing placeholders with actual values
2. **Write SVG file** — Read then write to `orchestration-workflow/weather.svg`
3. **Write summary** — Read then write to `orchestration-workflow/output.md` using the markdown template from [reference.md](/lib/09-harness/claude-code-best-practice/_claude-skills-weather-svg-creator-reference)

## Rules

- Use the exact temperature value and unit provided — do not re-fetch or modify
- The SVG must be self-contained and valid
- Both output files go in the `orchestration-workflow/` directory

## Additional resources

- For SVG template, output template, and design specs, see [reference.md](/lib/09-harness/claude-code-best-practice/_claude-skills-weather-svg-creator-reference)
- For example input/output pairs, see [examples.md](/lib/09-harness/claude-code-best-practice/_claude-skills-weather-svg-creator-examples)
