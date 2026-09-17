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
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/winui-app/references/motion-animations-and-polish.md"
sourceRel: "skills/.curated/winui-app/references/motion-animations-and-polish.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/winui-app/references/motion-animations-and-polish.md"
sourceSha256: "d22b9b919bdc9dd5674da28b5980988a41e1cc5ee37182c0a470268b9d126134"
pageSha256: "d22b9b919bdc9dd5674da28b5980988a41e1cc5ee37182c0a470268b9d126134"
contentMode: "local-full"
zh: ""
---

# Agent Skills

## What This Reference Is For

Use this file when adding polish to a WinUI app through motion, transitions, and subtle animated state changes.

## Prefer

- Motion that clarifies hierarchy, continuity, and state changes.
- Theme transitions, connected animations, and built-in platform behaviors before custom animation systems.
- Short, purposeful animations that support the task.

## Avoid

- Decorative animation that delays interaction.
- Multiple overlapping animations for the same state change.
- Animation that hides focus, selection, or accessibility state.

## Guidance

- Use transitions to explain where content came from and where it went.
- Keep entrance and exit motion subtle.
- Use connected animation when there is a real source-to-destination relationship.
- Reach for CommunityToolkit animation helpers only when built-in transitions are not enough.

## Sample and Source Anchors

- WinUI Gallery animation, transition, and implicit animation pages
- Learn motion guidance
- CommunityToolkit animations package and samples

## Review Checklist

- Does the motion improve clarity?
- Is the app still responsive while the animation runs?
- Can the transition be simplified to a built-in WinUI behavior?
- Does the motion preserve accessibility and input clarity?
