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
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/winui-app/references/accessibility-input-and-localization.md"
sourceRel: "skills/.curated/winui-app/references/accessibility-input-and-localization.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/winui-app/references/accessibility-input-and-localization.md"
sourceSha256: "62d03a806ce883ac4ef58947a1f0b173011dbfbfcfb0cb992cca95b8c25696a3"
pageSha256: "62d03a806ce883ac4ef58947a1f0b173011dbfbfcfb0cb992cca95b8c25696a3"
contentMode: "local-full"
zh: ""
---

# Agent Skills

## What This Reference Is For

Use this file for keyboard accessibility, Narrator support, automation properties, input parity, high contrast, and localization-ready UI.

## Prefer

- Accessible names, help text, and landmarks for meaningful UI elements.
- Full keyboard reachability for the main workflow.
- High-contrast-safe visuals.
- Localizable strings and layouts that tolerate growth.
- Equal support for mouse, touch, pen, and keyboard where the platform expects it.

## Avoid

- Icon-only interactions without accessible naming.
- Focus traps, hidden tab stops, or keyboard-only dead ends.
- Hard-coded strings in XAML or code-behind that block localization.
- Text layouts that collapse when strings expand.

## Guidance

- Use automation properties intentionally.
- Preserve visible focus and logical tab order.
- Verify context menus, flyouts, and dialogs by keyboard as well as mouse.
- Respect text scaling, contrast changes, and RTL where relevant.
- Keep touch targets and spacing usable on both mouse and touch hardware.

## WinUI Gallery Anchors

- Accessibility-related control samples
- Automation helper patterns in shell code
- Standard WinUI controls that already expose useful accessibility behavior

## Review Checklist

- Can a keyboard-only user complete the task?
- Does Narrator have enough information to describe the important UI?
- Does the experience stay legible in high contrast?
- Are strings and layout ready for localization and RTL growth?
