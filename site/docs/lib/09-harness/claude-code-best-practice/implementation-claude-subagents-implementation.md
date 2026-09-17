---
title: "Sub-agents Implementation"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/implementation/claude-subagents-implementation.md"
sourceRel: "implementation/claude-subagents-implementation.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/implementation/claude-subagents-implementation.md"
sourceSha256: "5310fce92c867ea81bf478a3964ef829847d3c5a84ee558fa88689a38902e59b"
pageSha256: "5310fce92c867ea81bf478a3964ef829847d3c5a84ee558fa88689a38902e59b"
contentMode: "local-full"
zh: ""
---

# Sub-agents Implementation

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="/mirror/08/083732f2d17cc173d2ce8cdf174e11bd1ccf34d9.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

<a href="#weather-agent"><img src="/mirror/40/40ff976a740fb4fcf55255dbc78bf034992e082b.svg" alt="Implemented"></a>

The weather agent is implemented in this repo as an example of the **Command → Agent → Skill** architecture pattern, demonstrating two distinct skill patterns.

---

## Weather Agent

**File**: [`.claude/agents/weather-agent.md`](/lib/09-harness/claude-code-best-practice/_claude-agents-weather-agent)

```yaml
---
name: weather-agent
description: Use this agent PROACTIVELY when you need to fetch weather data for
  Dubai, UAE. This agent fetches real-time temperature from Open-Meteo
  using its preloaded weather-fetcher skill.
allowedTools:
  - "Read"
  - "Skill"
model: sonnet
color: green
maxTurns: 5
permissionMode: acceptEdits
memory: project
skills:
  - weather-fetcher
---

# Weather Agent

You are a specialized weather agent that fetches weather data for Dubai,
UAE.

## Your Task

Execute the weather workflow by following the instructions from your preloaded
skill:

1. **Fetch**: Follow the `weather-fetcher` skill instructions to fetch the
   current temperature
2. **Report**: Return the temperature value and unit to the caller
3. **Memory**: Update your agent memory with the reading details for
   historical tracking

...
```

The agent has one preloaded skill (`weather-fetcher`) that provides instructions for fetching from Open-Meteo. It returns the temperature value and unit to the calling command.

---

## ![How to Use](/mirror/43/43b393ff0af70918e029290bee538f937f2e8abb.svg)

```bash
$ claude
> what is the weather in dubai?
```

---

## ![How to Implement](/mirror/e6/e65e66f0e8e567e7838caeaf4013e59c09a69e4e.svg)

You can create an agent using the `/agents` command, 
```bash
$ claude
> /agents
```

or ask Claude to create one for you — it will generate the markdown file with YAML frontmatter and body in `.claude/agents/<name>.md`

---

<a href="https://github.com/shanraisshan/claude-code-best-practice#orchestration-workflow"><img src="/mirror/f8/f8123f3d43b611e2b595c8a50cd3e2b50275e72b.svg" alt="Orchestration Workflow"></a>

The weather agent is the **Agent** in the Command → Agent → Skill orchestration pattern. It receives the workflow from the `/weather-orchestrator` command and fetches temperature using its preloaded skill (`weather-fetcher`). The command then invokes the standalone `weather-svg-creator` skill to create the visual output.

  <img src="/mirror/7a/7abe7821b5277cc22f7f5cf61acdffe66d2cdf67.svg" alt="Command Skill Agent Architecture Flow" width="100%">

| Component | Role | This Repo |
|-----------|------|-----------|
| **Command** | Entry point, user interaction | [`/weather-orchestrator`](/lib/09-harness/claude-code-best-practice/_claude-commands-weather-orchestrator) |
| **Agent** | Fetches data with preloaded skill (agent skill) | [`weather-agent`](/lib/09-harness/claude-code-best-practice/_claude-agents-weather-agent) with [`weather-fetcher`](/lib/09-harness/claude-code-best-practice/_claude-skills-weather-fetcher-SKILL) |
| **Skill** | Creates output independently (skill) | [`weather-svg-creator`](/lib/09-harness/claude-code-best-practice/_claude-skills-weather-svg-creator-SKILL) |
