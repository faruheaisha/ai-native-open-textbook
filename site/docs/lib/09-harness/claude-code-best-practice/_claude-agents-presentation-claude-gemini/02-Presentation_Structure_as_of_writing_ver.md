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
pageSha256: "5c24150322eafa7b4f1e386e46a91e9f3fcf6c4e1276d4dc6fafe75a7a54b080"
contentMode: "local-full"
zh: ""
---

## Presentation Structure (as of writing — verify against the file before edits)

Single-file HTML presentation with inline CSS and JS. Core conventions:

- **Slides** are `<div class="slide" data-slide="N">…</div>`, numbered sequentially starting at 1. The active slide gets `.active`.
- **Title slides** use `class="slide title-slide"` and render centered.
- **Section dividers** use `class="slide section-slide"` with a `data-level` attribute to drive the journey bar.
- **Journey bar** (right side, fixed) shows a 6-level progression across 2 days. Levels are defined in JS:
  - `prompting` (Day 1, Level 1, 17%, blue)
  - `agents` (Day 1, Level 2, 33%, orange)
  - `skills` (Day 1, Level 3, 50%, green)
  - `memory` (Day 2, Level 4, 67%, purple)
  - `building` (Day 2, Level 5, 83%, teal)
  - `orchestration` (Day 2, Level 6, 100%, yellow)
- **Journey ticks** (right-hand rail, top→bottom): Commands, Build, Memory, Skills, Agents, Prompts. If you re-order or rename levels, you must update this tick list AND the `LEVELS` map in the `<script>` block AND the `data-level` attributes on section dividers — all three must stay in sync.
- **Level badge** (`.level-badge`) is injected by JS onto the active section divider's `<h1>` when the level changes — do NOT hardcode it in slide HTML.
- **Day badge** (`.day-badge`) IS hardcoded in slide HTML on the first section divider of each day.

### Reusable styled boxes

- `.trigger-box` — neutral grey box (key point / takeaway)
- `.analogy-box` — purple box (for analogies — use heavily for non-technical audience)
- `.how-to-trigger` — green box (takeaway / how-to-use)
- `.warning-box` — orange box (limitation / gotcha)
- `.info-box` — blue box (informational aside)
- `.code-block` — dark code sample with `.comment`, `.key`, `.string`, `.cmd`, `.claude-file` syntax spans
- `.two-col` with `.col-card` (`.good` / `.bad` variants) — comparison layouts
- `.use-cases` with `.use-case-item` — bulleted list with emoji icons
- `.hiring-steps` with `.hiring-step.level-N` — numbered analogy walkthrough
- `.field-row` with `.field-name` / `.field-desc` / `.field-required` / `.field-recommended` — frontmatter field docs

### Navigation & meta

- `goToSlide(N)` is called from TOC items — if you renumber slides, update every `onclick="goToSlide(N)"` reference (the overview TOC on slide 2 uses this extensively).
- `totalSlides` is auto-computed from the DOM — no manual bump needed.
