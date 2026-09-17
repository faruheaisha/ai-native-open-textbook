---
title: "Orchestration Workflow"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/orchestration-workflow/orchestration-workflow.md"
sourceRel: "orchestration-workflow/orchestration-workflow.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/orchestration-workflow/orchestration-workflow.md"
sourceSha256: "1e0a4c01b646a3ccee4680705ca8dc465a2fed366652473ed434680ef05576f7"
pageSha256: "1e0a4c01b646a3ccee4680705ca8dc465a2fed366652473ed434680ef05576f7"
contentMode: "local-full"
zh: "on"
---

# Orchestration Workflow

This document describes the **Command → Agent (with skill) → Skill** orchestration workflow, demonstrated through a weather data fetching and SVG rendering system.

<div class="tb-zh"><p>本文介绍 Command → Agent（带 skill）→ Skill 这套编排工作流，并以一个天气数据抓取与 SVG 渲染系统作为演示。</p></div>

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="/mirror/08/083732f2d17cc173d2ce8cdf174e11bd1ccf34d9.svg" alt="Claude" width="60" /></td>
</tr>
</table>

## System Overview

The weather system demonstrates two distinct skill patterns within a single orchestration workflow:
- **Agent Skills** (preloaded): `weather-fetcher` is injected into the `weather-agent` at startup as domain knowledge
- **Skills** (independent): `weather-svg-creator` is invoked directly by the command via the Skill tool

<div class="tb-zh"><p>这个天气系统在一条编排工作流里展示了两种不同的 skill 模式：Agent Skills（预加载）——weather-fetcher 在启动时作为领域知识注入 weather-agent；Skills（独立调用）——weather-svg-creator 由命令通过 Skill 工具直接调用。</p></div>

This showcases the **Command → Agent → Skill** architecture pattern, where:
- A command orchestrates the workflow and handles user interaction
- An agent fetches data using its preloaded skill
- A skill creates the visual output independently

<div class="tb-zh"><p>它展示了 Command → Agent → Skill 架构模式，其中：命令负责编排流程并处理用户交互；agent 用预加载的 skill 抓取数据；skill 独立产出可视化结果。</p></div>

## Component Summary

| Component | Role | Example |
|-----------|------|---------|
| **Command** | Entry point, user interaction | [`/weather-orchestrator`](/lib/09-harness/claude-code-best-practice/_claude-commands-weather-orchestrator) |
| **Agent** | Fetches data with preloaded skill (agent skill) | [`weather-agent`](/lib/09-harness/claude-code-best-practice/_claude-agents-weather-agent) with [`weather-fetcher`](/lib/09-harness/claude-code-best-practice/_claude-skills-weather-fetcher-SKILL) |
| **Skill** | Creates output independently (skill) | [`weather-svg-creator`](/lib/09-harness/claude-code-best-practice/_claude-skills-weather-svg-creator-SKILL) |

## Flow Diagram

```
╔══════════════════════════════════════════════════════════════════╗
║              ORCHESTRATION WORKFLOW                              ║
║           Command  →  Agent  →  Skill                            ║
╚══════════════════════════════════════════════════════════════════╝

                         ┌───────────────────┐
                         │  User Interaction │
                         └─────────┬─────────┘
                                   │
                                   ▼
         ┌─────────────────────────────────────────────────────┐
         │  /weather-orchestrator — Command (Entry Point)      │
         └─────────────────────────┬───────────────────────────┘
                                   │
                              Step 1
                                   │
                                   ▼
                      ┌────────────────────────┐
                      │  AskUser — C° or F°?   │
                      └────────────┬───────────┘
                                   │
                         Step 2 — Agent tool
                                   │
                                   ▼
         ┌─────────────────────────────────────────────────────┐
         │  weather-agent — Agent ● skill: weather-fetcher     │
         └─────────────────────────┬───────────────────────────┘
                                   │
                          Returns: temp + unit
                                   │
                         Step 3 — Skill tool
                                   │
                                   ▼
         ┌─────────────────────────────────────────────────────┐
         │  weather-svg-creator — Skill ● SVG card + output    │
         └─────────────────────────┬───────────────────────────┘
                                   │
                          ┌────────┴────────┐
                          │                 │
                          ▼                 ▼
                   ┌────────────┐    ┌────────────┐
                   │weather.svg │    │ output.md  │
                   └────────────┘    └────────────┘
```

## Component Details

### 1. Command

#### `/weather-orchestrator` (Command)
- **Location**: `.claude/commands/weather-orchestrator.md`
- **Purpose**: Entry point — orchestrates the workflow and handles user interaction
- **Actions**:
  1. Asks user for temperature unit preference (Celsius/Fahrenheit)
  2. Invokes weather-agent via Agent tool
  3. Invokes weather-svg-creator via Skill tool
- **Model**: haiku

### 2. Agent with Preloaded Skill (Agent Skill)

#### `weather-agent` (Agent)
- **Location**: `.claude/agents/weather-agent.md`
- **Purpose**: Fetch weather data using its preloaded skill
- **Skills**: `weather-fetcher` (preloaded as domain knowledge)
- **Tools Available**: Read, Skill
- **Model**: sonnet
- **Color**: green
- **Memory**: project

The agent has `weather-fetcher` preloaded into its context at startup. It follows the skill's instructions to fetch the temperature and returns the value to the command.

<div class="tb-zh"><p>该 agent 在启动时就把 weather-fetcher 预加载进自己的上下文。它按照这个 skill 的说明抓取温度，并把数值返回给命令。</p></div>

### 3. Skill

#### `weather-svg-creator` (Skill)
- **Location**: `.claude/skills/weather-svg-creator/SKILL.md`
- **Purpose**: Create a visual SVG weather card and write output files
- **Invocation**: Via Skill tool from the command (not preloaded into any agent)
- **Outputs**:
  - `orchestration-workflow/weather.svg` — SVG weather card
  - `orchestration-workflow/output.md` — Weather summary

### 4. Preloaded Skill

#### `weather-fetcher` (Skill)
- **Location**: `.claude/skills/weather-fetcher/SKILL.md`
- **Purpose**: Instructions for fetching real-time temperature data
- **Data Source**: Open-Meteo API for Dubai, UAE
- **Output**: Temperature value and unit (Celsius or Fahrenheit)
- **Note**: This is an agent skill — preloaded into `weather-agent`, not invoked directly

## Execution Flow

1. **User Invocation**: User runs `/weather-orchestrator` command
2. **User Prompt**: Command asks user for preferred temperature unit (Celsius/Fahrenheit)
3. **Agent Invocation**: Command invokes `weather-agent` via Agent tool
4. **Skill Execution** (within agent context):
   - Agent follows `weather-fetcher` skill instructions to fetch temperature from Open-Meteo
   - Agent returns the temperature value and unit to the command
5. **SVG Creation**: Command invokes `weather-svg-creator` via Skill tool
   - Skill creates SVG weather card at `orchestration-workflow/weather.svg`
   - Skill writes summary to `orchestration-workflow/output.md`
6. **Result Display**: Summary shown to user with:
   - Temperature unit requested
   - Temperature fetched
   - SVG card location
   - Output file location

<div class="tb-zh"><p>1）用户调用：用户运行 /weather-orchestrator 命令；2）向用户提问：命令询问用户想要哪种温度单位（摄氏度/华氏度）；3）调用 agent：命令通过 Agent 工具调用 weather-agent；4）执行 skill（在 agent 上下文内）：agent 按 weather-fetcher skill 的说明从 Open-Meteo 抓取温度，然后把温度值与单位返回给命令；5）生成 SVG：命令通过 Skill 工具调用 weather-svg-creator——skill 生成 SVG 天气卡到 orchestration-workflow/weather.svg，并把小结写入 orchestration-workflow/output.md；6）展示结果：向用户展示小结，内容包含所请求的温度单位、抓取到的温度、SVG 卡片位置与输出文件位置。</p></div>

## Example Execution

```
Input: /weather-orchestrator
├─ Step 1: Asks: Celsius or Fahrenheit?
│  └─ User: Celsius
├─ Step 2: Agent tool → weather-agent
│  ├─ Preloaded Skill:
│  │  └─ weather-fetcher (domain knowledge)
│  ├─ Fetches from Open-Meteo → 26°C
│  └─ Returns: temperature=26, unit=Celsius
├─ Step 3: Skill tool → /weather-svg-creator
│  ├─ Creates: orchestration-workflow/weather.svg
│  └─ Writes: orchestration-workflow/output.md
└─ Output:
   ├─ Unit: Celsius
   ├─ Temperature: 26°C
   ├─ SVG: orchestration-workflow/weather.svg
   └─ Summary: orchestration-workflow/output.md
```

## Key Design Principles

1. **Two Skill Patterns**: Demonstrates both agent skills (preloaded) and skills (invoked directly)
2. **Command as Orchestrator**: The command handles user interaction and coordinates the workflow
3. **Agent for Data Fetching**: The agent uses its preloaded skill to fetch data, then returns it
4. **Skill for Output**: The SVG creator runs independently, receiving data from the command context
5. **Clean Separation**: Fetch (agent) → Render (skill) — each component has a single responsibility

<div class="tb-zh"><p>1）两种 skill 模式：同时演示 agent skill（预加载）与 skill（直接调用）；2）命令作为编排者：由命令处理用户交互并协调整个流程；3）由 agent 抓数据：agent 用预加载的 skill 取数后再回传；4）由 skill 产出结果：SVG 生成器独立运行，从命令的上下文接收数据；5）职责分离干净：抓取（agent）→ 渲染（skill），每个组件只负责一件事。</p></div>

## Architecture Patterns

### Agent Skill (Preloaded)

```yaml
# In agent definition (.claude/agents/weather-agent.md)
---
name: weather-agent
skills:
  - weather-fetcher    # Preloaded into agent context at startup
---
```

- **Skills are preloaded**: Full skill content is injected into agent's context at startup
- **Agent uses skill knowledge**: Agent follows instructions from preloaded skills
- **No dynamic invocation**: Skills are reference material, not invoked separately

<div class="tb-zh"><p>skill 是预加载的：完整的 skill 内容在启动时就注入 agent 的上下文；agent 使用 skill 里的知识：agent 按预加载 skill 中的说明执行；不做动态调用：这些 skill 属于参考资料，不会被单独调用。</p></div>

### Skill (Direct Invocation)

```yaml
# In skill definition (.claude/skills/weather-svg-creator/SKILL.md)
---
name: weather-svg-creator
description: Creates an SVG weather card...
---
```

- **Invoked via Skill tool**: Command calls `Skill(skill: "weather-svg-creator")`
- **Independent execution**: Runs in the command's context, not inside an agent
- **Receives data from context**: Uses temperature data already available in the conversation

<div class="tb-zh"><p>通过 Skill 工具调用：命令执行 Skill(skill: 「weather-svg-creator」)；独立执行：运行在命令自身的上下文里，而不是 agent 内部；从上下文获取数据：直接使用对话中已经存在的温度数据。</p></div>
