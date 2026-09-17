---
title: "AI Coding Guide (Claude Code + Codex)"
sourceId: "07-coding/ai-coding-guide-stormzhang"
sourceTitle: "面向小白的 AI 编程 CLI 教程"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/stormzhang/ai-coding-guide"
entryUrl: "https://github.com/stormzhang/ai-coding-guide/blob/d187dbdb83fa1be051a850074eb518e30e2eb47c/README.en.md"
sourceRel: "README.en.md"
rawUrl: "/raw/07-coding/ai-coding-guide-stormzhang/README.en.md"
sourceSha256: "16584df58b57391dae13442643f61c2ab7f9913ef061e5b08de45ad1c74b50ba"
pageSha256: "16584df58b57391dae13442643f61c2ab7f9913ef061e5b08de45ad1c74b50ba"
contentMode: "local-full"
zh: ""
---

# AI Coding Guide (Claude Code + Codex)

**English** | [简体中文](/lib/07-coding/ai-coding-guide-stormzhang/overview)

> 📘 **92 articles · ~520k characters** of carefully-crafted tutorials — **53 for Claude Code + 39 for Codex** — taking you from install to fluent, turning the command line into your fastest tool.

> ⚠️ The tutorial content is written in **Simplified Chinese**. This page is the only English entry.

**📖 Read online (dark terminal theme, best experience) → <https://coding.stormzhang.ai>**

![AI Coding Guide](/mirror/d1/d12d3cfdc7223d4225fb1fca9fae31ec0670b6c5.webp)

## What makes this different

- **Official docs as the source of truth**: every feature / command / default behavior is verified against the [Claude Code docs](https://code.claude.com/docs/zh-CN) and [Codex docs](https://developers.openai.com/codex) — no third-party guesses, no hearsay.
- **Rewritten for beginners**: each new concept follows a 3-part structure (scenario → real-life analogy → concrete use case); no command-line background required.
- **Real, first-hand experience**: plenty of first-person gotchas and judgment calls (with concrete details and real numbers), not vague "I think" filler.
- **Runnable & self-verifiable**: every hands-on step gives the full command + expected output for instant feedback.
- **Original dark-engineering diagrams**: 81 SVG/PNG diagrams, consistent dark style, ≤ 10 nodes each.

## Contents

### Claude Code (53 articles)
From "what is it / install" to the agent loop, MCP, subagents, Skills, Hooks, Agent SDK, GitHub Actions — plus best practices / anti-patterns / FAQ / glossary.

→ Start here: [coding.stormzhang.ai](https://coding.stormzhang.ai)

### Codex (39 articles)
The four entry points, AGENTS.md, sandbox approvals, config.toml, Chronicle memory, Worktrees, migrating from Claude Code, and more.

→ Start here: [coding.stormzhang.ai](https://coding.stormzhang.ai)

## How to read

1. Pick one tool (recommended: start with Claude Code).
2. Read in order; each article takes 3–10 min.
3. **Read and do** — every article has runnable commands + expected output.
4. Integrate each chapter into your daily dev workflow as you go.

## FAQ

| Q | A |
|---|---|
| **Does it cost money?** | The tutorial itself is **completely free** (MIT). But Claude Code / Codex themselves require a subscription or API payment — subscribe to whatever fits your needs. |
| **Can I learn without command-line experience?** | Yes. The first group, "Getting Started", is built for newcomers and starts from the basics. |
| **Claude Code or Codex first?** | The two are conceptually close, each with its strengths. **Beginners: start with Codex** — lower barrier and friendlier for users in mainland China; Claude Code has stricter account risk controls (higher ban risk), so it's safer to get comfortable first and switch later. The Codex section includes a "Migrating from Claude Code" comparison — the two are interchangeable. |
| **Will it be updated?** | Both tools iterate fast; important changes are tracked. See [Commits](https://github.com/stormzhang/ai-coding-guide/commits/main) for versions. |
