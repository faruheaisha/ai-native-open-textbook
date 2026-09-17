---
title: "Weather Orchestrator Command"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/.claude/commands/weather-orchestrator.md"
sourceRel: ".claude/commands/weather-orchestrator.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/.claude/commands/weather-orchestrator.md"
sourceSha256: "7607d1f05d759651c4e31b5b3cc905c3b4a95a6d4a5850251f4a34cd9274dfcd"
pageSha256: "7607d1f05d759651c4e31b5b3cc905c3b4a95a6d4a5850251f4a34cd9274dfcd"
contentMode: "local-full"
zh: ""
---

# Weather Orchestrator Command

Fetch the current temperature for Dubai, UAE and create a visual SVG weather card.

## Execution Contract (non-negotiable)

You MUST complete this command by delegating to the `weather-agent` subagent. You are forbidden from:

- Fetching weather data yourself via Bash, WebFetch, or any other tool
- Skipping Step 1 (the user's unit preference is required input to the agent)
- Calling `weather-svg-creator` before the agent returns a temperature

If you cannot invoke the Agent tool, stop and report the error to the user. Do not improvise.

## Workflow

### Step 1: Ask User Preference

Use the AskUserQuestion tool to ask the user whether they want the temperature in Celsius or Fahrenheit. Capture the selected unit before proceeding.

### Step 2: Fetch Weather Data via Agent

Use the Agent tool to invoke the weather agent:

- subagent_type: weather-agent
- description: Fetch Dubai weather data
- prompt: Fetch the current temperature for Dubai, UAE in [unit requested by user]. Return the numeric temperature value and unit. The agent has a preloaded skill (weather-fetcher) that provides the detailed instructions.
- model: haiku

Wait for the agent to complete and capture the returned temperature value and unit.

**Fail-closed guardrail**: If the agent does not return a numeric temperature and unit, DO NOT proceed to Step 3. Report the failure to the user and stop.

### Step 3: Create SVG Weather Card

Use the Skill tool to invoke the weather-svg-creator skill:

- skill: weather-svg-creator

The skill will use the temperature value and unit from Step 2 (available in the current context) to create the SVG card and write output files.

## Output Summary

Provide a clear summary to the user showing:

- Temperature unit requested
- Temperature fetched from Dubai
- SVG card created at `orchestration-workflow/weather.svg`
- Summary written to `orchestration-workflow/output.md`
