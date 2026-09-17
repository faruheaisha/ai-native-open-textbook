---
title: "Productivity"
sourceId: "10-context-memory/mattpocock-skills"
sourceTitle: "Matt Pocock Skills（工程技能库）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/mattpocock/skills"
entryUrl: "https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/productivity/README.md"
sourceRel: "skills/productivity/README.md"
rawUrl: "/raw/10-context-memory/mattpocock-skills/skills/productivity/README.md"
sourceSha256: "bef3901088b409f00cb1ce6e94f4cf3f4e4865969d8b19330f375cd535b10e37"
pageSha256: "bef3901088b409f00cb1ce6e94f4cf3f4e4865969d8b19330f375cd535b10e37"
contentMode: "local-full"
zh: ""
---

# Productivity

General workflow tools, not code-specific.

## User-invoked

Reachable only when you type them (Claude Code: `disable-model-invocation: true`; Codex: `policy.allow_implicit_invocation: false` in `agents/openai.yaml`).

- **[grill-me](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/productivity/grill-me/SKILL.md)**: Get relentlessly interviewed about a plan or design until every branch of the design tree is resolved.
- **[handoff](/lib/10-context-memory/mattpocock-skills/skills-productivity-handoff-SKILL)**: Compact the current conversation into a handoff document so another agent can continue the work.
- **[teach](/lib/10-context-memory/mattpocock-skills/skills-productivity-teach-SKILL)**: Teach the user a new skill or concept over multiple sessions, using the current directory as a stateful teaching workspace.
- **[to-questionnaire](/lib/10-context-memory/mattpocock-skills/skills-productivity-to-questionnaire-SKILL)**: Turn a decision you can't answer alone into a Markdown questionnaire for the one person who can (filled in async, or together over a meeting).
- **[wait-what](/lib/10-context-memory/mattpocock-skills/skills-productivity-wait-what-SKILL)**: Fire this the moment a message doesn't land. The agent re-pitches it with the context you're missing, in plain English, using your `CONTEXT.md` vocabulary.

## Model-invoked

Model- or user-reachable (rich trigger phrasing so the model can reach for them).

- **[grilling](/lib/10-context-memory/mattpocock-skills/skills-productivity-grilling-SKILL)**: Interview the user relentlessly about a plan, decision, or idea until every branch of the design tree is resolved.
- **[writing-for-agents](/lib/10-context-memory/mattpocock-skills/skills-productivity-writing-for-agents-SKILL)**: Writing documents for agents: skills, AGENTS.md/CLAUDE.md, and any doc an agent reaches by a pointer.
