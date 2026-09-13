---
title: "Commands Implementation"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/README.md"
zh: ""
---

# Commands Implementation

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

<a href="#weather-orchestrator"><img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/implemented-hd.svg" alt="Implemented"></a>

The weather orchestrator command is implemented in this repo as the entry point of the **Command → Agent → Skill** architecture pattern, demonstrating how commands orchestrate multi-step workflows.

---

## Weather Orchestrator

**File**: [`.claude/commands/weather-orchestrator.md`](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/.claude/commands/weather-orchestrator.md)

```yaml
---
description: Fetch weather data for Dubai and create an SVG weather card
model: haiku
---

# Weather Orchestrator Command

Fetch the current temperature for Dubai, UAE and create a visual SVG weather card.

## Workflow

### Step 1: Ask User Preference
Use the AskUserQuestion tool to ask the user whether they want the temperature
in Celsius or Fahrenheit.

### Step 2: Fetch Weather Data
Use the Agent tool to invoke the weather agent:
- subagent_type: weather-agent
- prompt: Fetch the current temperature for Dubai, UAE in [unit]...

### Step 3: Create SVG Weather Card
Use the Skill tool to invoke the weather-svg-creator skill:
- skill: weather-svg-creator

...
```

The command orchestrates the entire workflow: it asks the user for their temperature unit preference, invokes the `weather-agent` via the Agent tool, and then invokes the `weather-svg-creator` skill via the Skill tool.

---

## ![How to Use](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/how-to-use.svg)

```bash
$ claude
> /weather-orchestrator
```

---

## ![How to Implement](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/how-to-implement.svg)

Ask Claude to create one for you — it will generate the markdown file with YAML frontmatter and body in `.claude/commands/<name>.md`

---

<a href="https://github.com/shanraisshan/claude-code-best-practice#orchestration-workflow"><img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/orchestration-workflow-hd.svg" alt="Orchestration Workflow"></a>

The weather orchestrator is the **Command** in the Command → Agent → Skill orchestration pattern. It serves as the entry point — handling user interaction (temperature unit preference), delegating data fetching to the `weather-agent`, and invoking the `weather-svg-creator` skill for visual output.

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/orchestration-workflow/orchestration-workflow.svg" alt="Command Skill Agent Architecture Flow" width="100%">

| Component | Role | This Repo |
|-----------|------|-----------|
| **Command** | Entry point, user interaction | [`/weather-orchestrator`](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/.claude/commands/weather-orchestrator.md) |
| **Agent** | Fetches data with preloaded skill (agent skill) | [`weather-agent`](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/.claude/agents/weather-agent.md) with [`weather-fetcher`](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/.claude/skills/weather-fetcher/SKILL.md) |
| **Skill** | Creates output independently (skill) | [`weather-svg-creator`](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/.claude/skills/weather-svg-creator/SKILL.md) |
