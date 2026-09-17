---
title: "Agent Skills"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/winui-app/references/performance-diagnostics-and-responsiveness.md"
sourceRel: "skills/.curated/winui-app/references/performance-diagnostics-and-responsiveness.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/winui-app/references/performance-diagnostics-and-responsiveness.md"
sourceSha256: "01d47d229c1903b875e6dc0b55d0935963afed2bd99b65638a06bfdfe931359e"
pageSha256: "01d47d229c1903b875e6dc0b55d0935963afed2bd99b65638a06bfdfe931359e"
contentMode: "local-full"
zh: ""
---

# Agent Skills

## What This Reference Is For

Use this file when the user reports sluggish WinUI behavior, dropped frames, long startup, or laggy scrolling and layout.

## Prefer

- Keeping the UI thread free for layout, rendering, and input.
- Simpler visual trees and lighter templates.
- Virtualization-friendly controls and item layouts.
- Measurement before optimization when the issue is not obvious.

## Avoid

- Doing expensive I/O or CPU work directly on the UI thread.
- Deeply nested XAML trees without a concrete benefit.
- Re-templating controls in ways that dramatically increase layout work.
- Guessing at performance causes without profiling.

## Guidance

- Favor platform controls and layouts that virtualize well for long lists.
- Defer or background heavy work when it does not need to block interaction.
- Reduce unnecessary layout invalidation and repeated measure/arrange churn.
- Use WPR and WPA with the XAML Frame Analysis plugin for frame-level investigations.
- Treat slow-frame findings as a clue to UI-thread overload, not as a reason to micro-optimize blindly.

## Sample and Source Anchors

- Learn `winui-perf.md`
- WinUI Gallery pages that demonstrate adaptive UI and complex controls without excessive custom infrastructure

## Review Checklist

- Is heavy work running off the UI thread where possible?
- Are large collections using an appropriate items control?
- Is the visual tree no more complex than it needs to be?
- Has profiling been used before claiming a fix?
