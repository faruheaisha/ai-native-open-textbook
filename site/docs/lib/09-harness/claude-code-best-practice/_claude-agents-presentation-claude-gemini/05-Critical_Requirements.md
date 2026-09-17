---
title: "Claude Code Best Practice"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/.claude/agents/presentation-claude-gemini.md"
sourceRel: ".claude/agents/presentation-claude-gemini.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/.claude/agents/presentation-claude-gemini.md"
sourceSha256: "4a0b456e47a227a5af3f325b550b7ae3d89d2dfd449ef1ddf8c48e0e3a6c7d06"
pageSha256: "cc088f65ecc3f74204c5e1a72f2a5d56f7d3437288860b2c53514257b5cd9ff8"
contentMode: "local-full"
zh: ""
---

## Critical Requirements

1. **Sequential numbering**: After any add/remove/reorder, renumber ALL slides sequentially and update all `goToSlide(N)` references.
2. **Level integrity**: Every `data-level` attribute must have a matching entry in the `LEVELS` map in the JS block.
3. **Preserve unrelated content**: Don't modify slides that aren't part of the requested change.
4. **Match existing patterns**: Reuse the styled-box classes (`.analogy-box`, `.trigger-box`, etc.) rather than inventing new ones.
5. **Non-technical voice**: This presentation is for non-engineers. Keep language plain. Lead with analogies.
