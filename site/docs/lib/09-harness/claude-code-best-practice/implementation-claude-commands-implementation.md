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
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/implementation/claude-commands-implementation.md"
sourceRel: "implementation/claude-commands-implementation.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/implementation/claude-commands-implementation.md"
sourceSha256: "d08ad13fe84998fa6a9273bec27f97e2c906376a5eba3f6b9b8f10246e8c1429"
pageSha256: "d08ad13fe84998fa6a9273bec27f97e2c906376a5eba3f6b9b8f10246e8c1429"
contentMode: "local-full"
zh: ""
---

# Commands Implementation

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="/mirror/08/083732f2d17cc173d2ce8cdf174e11bd1ccf34d9.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

<a href="#weather-orchestrator"><img src="/mirror/40/40ff976a740fb4fcf55255dbc78bf034992e082b.svg" alt="Implemented"></a>

The weather orchestrator command is implemented in this repo as the entry point of the **Command → Agent → Skill** architecture pattern, demonstrating how commands orchestrate multi-step workflows.

---

## Weather Orchestrator

**File**: [`.claude/commands/weather-orchestrator.md`](/lib/09-harness/claude-code-best-practice/_claude-commands-weather-orchestrator)

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

## ![How to Use](/mirror/43/43b393ff0af70918e029290bee538f937f2e8abb.svg)

```bash
$ claude
> /weather-orchestrator
```

---

## ![How to Implement](/mirror/e6/e65e66f0e8e567e7838caeaf4013e59c09a69e4e.svg)

Ask Claude to create one for you — it will generate the markdown file with YAML frontmatter and body in `.claude/commands/<name>.md`

---

<a href="https://github.com/shanraisshan/claude-code-best-practice#orchestration-workflow"><img src="/mirror/f8/f8123f3d43b611e2b595c8a50cd3e2b50275e72b.svg" alt="Orchestration Workflow"></a>

The weather orchestrator is the **Command** in the Command → Agent → Skill orchestration pattern. It serves as the entry point — handling user interaction (temperature unit preference), delegating data fetching to the `weather-agent`, and invoking the `weather-svg-creator` skill for visual output.

  <img src="/mirror/7a/7abe7821b5277cc22f7f5cf61acdffe66d2cdf67.svg" alt="Command Skill Agent Architecture Flow" width="100%">

| Component | Role | This Repo |
|-----------|------|-----------|
| **Command** | Entry point, user interaction | [`/weather-orchestrator`](/lib/09-harness/claude-code-best-practice/_claude-commands-weather-orchestrator) |
| **Agent** | Fetches data with preloaded skill (agent skill) | [`weather-agent`](/lib/09-harness/claude-code-best-practice/_claude-agents-weather-agent) with [`weather-fetcher`](/lib/09-harness/claude-code-best-practice/_claude-skills-weather-fetcher-SKILL) |
| **Skill** | Creates output independently (skill) | [`weather-svg-creator`](/lib/09-harness/claude-code-best-practice/_claude-skills-weather-svg-creator-SKILL) |
