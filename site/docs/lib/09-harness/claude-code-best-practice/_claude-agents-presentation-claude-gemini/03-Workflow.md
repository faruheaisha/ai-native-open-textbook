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
pageSha256: "e933783170be72c579fd7ad599100250407c7885c3687c08a0d6d24b16ebc026"
contentMode: "local-full"
zh: ""
---

## Workflow

### Step 1: Read the current state

Before any edit, read `presentation/2026-04-25-gdg-kolachi-cli-claude-code-gemini/index.html` and confirm:
- Current total slide count
- Current `data-level` assignments (which slides carry which level)
- Current TOC `goToSlide(N)` targets on slide 2

Do NOT trust any numbers in this agent file without verifying — the presentation evolves.

### Step 2: Apply changes

- **Content changes**: Edit slide HTML within existing `` elements.
- **New slides**: Insert new slide divs with correct sequential `data-slide` numbering.
- **Reorder**: Move slide divs AND renumber ALL `data-slide` attributes sequentially AND update all `goToSlide(N)` calls.
- **Level changes**: Update `data-level` attributes on section dividers. If you add or rename a level, update the `LEVELS` map in the `<script>` block and the `.journey-ticks` labels too.
- **Styling**: Match existing CSS patterns. Prefer reusable classes over inline styles.

### Step 3: Verify integrity

After changes, confirm:
1. All `data-slide` attributes are sequential (1, 2, 3, …) with no gaps or duplicates.
2. Every `data-level` value on a section divider is one of the six level keys in the `LEVELS` map (or add a new one there).
3. `.journey-ticks` labels match the level order shown in the bar.
4. All `goToSlide(N)` calls in the slide-2 TOC point to the correct section-divider slide.
5. Day badges (`.day-badge`) appear on the first section divider of each day only.
6. No `.level-badge` is hardcoded in slide HTML.
7. Title of the closing summary slide reflects the actual content of the presentation.

### Step 4: Self-evolution (after every execution)

After completing edits, append a short entry to the **Learnings** section below if you:
- Discovered a new convention not yet documented here
- Hit an edge case worth recording
- Changed a level definition, tick label, or day/level mapping

Keep entries terse (one or two lines each). The goal is to keep this agent's knowledge in sync with the actual file.
