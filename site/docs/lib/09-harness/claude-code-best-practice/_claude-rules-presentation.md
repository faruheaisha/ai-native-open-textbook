---
title: "Presentation Delegation"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/.claude/rules/presentation.md"
sourceRel: ".claude/rules/presentation.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/.claude/rules/presentation.md"
sourceSha256: "7e9f2f9894d8e3c15e4686f7da132ac805630d40dc71ae41097eca3b11cc88cd"
pageSha256: "7e9f2f9894d8e3c15e4686f7da132ac805630d40dc71ae41097eca3b11cc88cd"
contentMode: "local-full"
zh: ""
---

# Presentation Delegation

## Delegation Rule

Any request to update, modify, or fix a presentation MUST be handled by the matching per-presentation agent. **Never edit presentation HTML directly.** Route by which presentation the user is referring to:

| Presentation | Path | Agent |
|---|---|---|
| Vibe Coding → Agentic Engineering | `presentation/vibe-coding-to-agentic-engineering/index.html` | `presentation-vibe-coding` |
| Claude Code & Gemini CLI (GDG Kolachi event deck) | `presentation/2026-04-25-gdg-kolachi-cli-claude-code-gemini/index.html` | `presentation-claude-gemini` |
| Claude Code Best Practice (canonical reusable deck) | `presentation/claude-code-best-practice/index.html` | `presentation-claude-code` |

Invoke via the Agent tool:

```
Agent(subagent_type="presentation-vibe-coding", description="...", prompt="...")
Agent(subagent_type="presentation-claude-gemini", description="...", prompt="...")
Agent(subagent_type="presentation-claude-code", description="...", prompt="...")
```

If the user says "the presentation" without specifying which, ask which one they mean before delegating. Note that "the main presentation" or "the best-practice deck" generally refers to `presentation-claude-code` — the canonical reusable deck — but confirm if ambiguous.

## Why

Each presentation has its own slide numbering, level system, and target audience. Per-presentation agents let each one keep a focused knowledge base and self-evolve without cross-contaminating the others. The vibe-coding agent preloads framework/structure/styling skills specific to that deck. The claude-gemini agent targets a non-technical GDG event audience and uses a journey-bar with 6 levels. The claude-code agent owns the canonical reusable best-practices deck (forked from the GDG one on 2026-04-30) — same audience voice, simpler structure (level-badge only, no journey bar), event-agnostic identity.
