---
title: "Components - the pieces a chart is made of"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-data-visualization-components.md"
sourceRel: "system-prompts/data-data-visualization-components.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-data-visualization-components.md"
sourceSha256: "f7df596477f7d8f3f8f2b40ff80b1d157316bfc995b566f524ed09f9afdf4c81"
pageSha256: "f7df596477f7d8f3f8f2b40ff80b1d157316bfc995b566f524ed09f9afdf4c81"
contentMode: "local-full"
zh: ""
---

# Components - the pieces a chart is made of

A chart is built from these parts, assembled in plain HTML/SVG. Tier 0 is the
foundation everything mounts on; the System tier is what makes the method
portable (and is, itself, this skill).

## Tier 0 - Foundations
- **Color roles** - categorical (8 × light/dark), sequential ramps, diverging pairs,
  status (4), de-emphasis / "Other", grayscale chart furniture (axis/grid/label/surface).
  Defined as CSS custom properties at the top of the HTML - see `palette.md`.
- **Texture fill** - the directional fill + 45°/135° rotations.
- **Chart container** - a `` (or card ``) that owns responsive
  sizing, title/caption, and the **table-view toggle** (the accessibility twin
  of every chart). **Any fixed height includes the x-axis band** (plot height
  + axis labels) so the card never gets a nested vertical scroll; prefer
  letting the container grow with its content.
- **Legend** (toggle-to-isolate, texture-aware swatches) · **Tooltip** · **Axis** · **Data label**.

## Tier 1 - The charts people ask for
- **Bar chart** - grouped + stacked, thin-bar default, horizontal + vertical.
- **Line chart** - multi-series, soft-fill area variant, accessibility markers.
- **Stat tile** - value + delta + optional sparkline (the figure contract).
- **Meter / progress track** - same-ramp tracks.

## Tier 2 - Rounding out the kit
- **Area chart** (stacked, band-edge = line) · **Sparkline** · **Heatmap**
- **Scale legend** (sequential / diverging) · **Chart filters / time range** · **Empty state**

## System tier - becomes the skill
- **Six-checks validator** - `scripts/validate_palette.js` (palette validation).
- **Theming engine** - snap a customer's ramps to passing values (color-formula.md).
- **Chart-type heuristic** - pick the form (choosing-a-form.md).
- **Table-view generator** - the WCAG-clean equivalent of any chart.

Notes: part-to-whole rides on the stacked bar chart; donut stays deprioritized.
Small multiples is a layout pattern over these, not a separate piece. Scatter
joins Tier 2 if scatter-heavy surfaces land.
