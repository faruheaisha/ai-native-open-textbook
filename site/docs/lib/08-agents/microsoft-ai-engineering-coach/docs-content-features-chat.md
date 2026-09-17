---
title: "Chat Participant"
sourceId: "08-agents/microsoft-ai-engineering-coach"
sourceTitle: "AI Engineering Coach（微软）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/AI-Engineering-Coach"
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/docs/content/features/chat.md"
sourceRel: "docs/content/features/chat.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/docs/content/features/chat.md"
sourceSha256: "f60e2a5a538696e97a0e1c94932ebafb10328ed047f7cc60850a40474de4ebf0"
pageSha256: "f60e2a5a538696e97a0e1c94932ebafb10328ed047f7cc60850a40474de4ebf0"
contentMode: "local-full"
zh: ""
---

# Chat Participant

The `@aicoach` chat participant gives you conversational access to all AI Engineer Coach data directly in the VS Code chat panel. Ask questions in natural language and get data-driven coaching responses without leaving your editor.

## Getting Started

Before using `@aicoach`, open the AI Engineer Coach sidebar at least once to load your session data.

> **Note:** When you use `@aicoach`, your question and the results returned by AI Engineer Coach tools are sent to the selected VS Code chat model so it can synthesize a response. The underlying coaching data is gathered locally, but the final chat answer is not produced purely through local processing.

Type `@aicoach` in any VS Code chat panel followed by your question:

```
@aicoach how am I doing this week?
```

The participant is sticky — once invoked, follow-up messages in the same thread continue the conversation without needing to type `@aicoach` again.

## Slash Commands

| Command | Description | Default prompt |
|---|---|---|
| `/summary` | Quick usage overview | Highlights strengths and top areas to improve |
| `/improve` | Improvement recommendations | Top 3 things to improve with specific actions |
| `/compare` | Tool comparison | Compare AI coding tools and their effectiveness |
| `/flow` | Flow & focus analysis | Deep work patterns and best productivity hours |

Use a slash command with no additional text to get the default analysis, or add your own question:

```
@aicoach /flow Am I more productive in the morning or afternoon?
```

## Available Tools

The participant has access to 12 backend tools that it selects automatically based on your question:

| Tool | Domain | What it returns |
|---|---|---|
| `aiEngineerCoach_summary` | Observe | Session counts, recommendations, top anti-patterns |
| `aiEngineerCoach_activity` | Observe | Daily requests, LOC, sessions, and harness breakdown |
| `aiEngineerCoach_credits` | Measure | AI credit usage, per-model breakdown, daily trend, and costly requests |
| `aiEngineerCoach_codeProduction` | Measure | AI vs user LOC, language breakdown, workspace distribution |
| `aiEngineerCoach_flow` | Measure | Deep work scores, best hours, follow-up latency |
| `aiEngineerCoach_patterns` | Improve | Anti-patterns and practice recommendations with severity |
| `aiEngineerCoach_insights` | Improve | Learning velocity, intent classification, prompt maturity |
| `aiEngineerCoach_wellbeing` | Improve | Work-life balance score, time distribution, burnout risk |
| `aiEngineerCoach_workflows` | Improve | Repeated workflow clusters with automation suggestions |
| `aiEngineerCoach_harnessComparison` | Observe | Side-by-side tool comparison: sessions, LOC, cancel rates |
| `aiEngineerCoach_sessions` | Observe | Browse or search individual sessions by ID or keyword |
| `aiEngineerCoach_contextHealth` | Improve | Context utilization, compaction, config health, and instruction quality |

All tools accept optional `fromDate`, `toDate`, `workspaceId`, and `harness` filters. The participant resolves relative time references ("last week", "past month") automatically.

## How It Works

The participant runs an **agentic loop** that:

1. Sends your question along with a coaching persona and tool-selection heuristics to the language model
2. The model decides which tools to call based on your intent
3. Tool results are fed back into the conversation for the model to synthesize
4. The model may call additional tools if needed (up to 8 rounds)
5. A final, synthesized coaching response is streamed back to you

This means a single question like "compare my productivity this week vs last week" can trigger multiple tool calls (activity, flow, code production) and produce a unified answer.

## Example Conversations

**Broad check-in:**
```
@aicoach Give me a quick health check
```
→ Calls `summary`, returns practice scores, session count, top anti-pattern, and a suggested next step.

**Specific investigation:**
```
@aicoach Why is my prompt quality score dropping?
```
→ Calls `patterns` with recent date range, surfaces the specific anti-patterns driving the score down with example prompts from your sessions.

## Follow-ups

After each response, the participant suggests follow-up prompts to guide deeper analysis:

- **Improve** — "What should I improve next?"
- **Compare tools** — "Compare my AI tools"
- **Flow state** — "How is my focus & flow?"

Click any follow-up to continue the conversation without typing.
