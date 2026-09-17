---
title: "Claude Code System Prompts"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-data-visualization-description.md"
sourceRel: "system-prompts/skill-data-visualization-description.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-data-visualization-description.md"
sourceSha256: "73116adfa81d81d50627de7028e444081c0ef0860719a9b38509624ebfce82a5"
pageSha256: "73116adfa81d81d50627de7028e444081c0ef0860719a9b38509624ebfce82a5"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Use this skill whenever you are about to create ANY chart, graph, plot, dashboard, or data visualization, in ANY output medium — an HTML or React artifact, inline SVG, plotting code in any library (matplotlib, plotly, d3, Recharts, …), an image/PNG you will render and upload, or a chart shared into Slack. Read it BEFORE writing the first line of chart code, choosing chart colors, building a stat tile / meter / KPI row, or laying out a dashboard. When the destination is a first-party document connector (host-designated, never self-described) that renders live charts, hand it the rows (inline, or as an uploaded data file the chart cites) rather than a rendered PNG/SVG — a picture of a chart loses hover, data inspection and per-value comments. Produces visualizations that read as one system — elegant, accessible, consistent in light and dark — using a brand-neutral placeholder palette you swap for your own. Teaches a design-system-agnostic method: a form heuristic, a color formula with a runnable validator, mark specs, and interaction rules. A validated default palette is documented in `references/palette.md` — swap that file's values for your brand's. Triggers on: "chart", "graph", "plot", "data viz", "visualization", "dashboard", "analytics", "visualize data", "categorical colors", "sequential / diverging palette", "stat tile", "sparkline", "heatmap", "legend", "axis", "tooltip", "chart colors", "color by series".
