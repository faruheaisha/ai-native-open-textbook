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
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/winui-app/references/foundation-winui-app-structure.md"
sourceRel: "skills/.curated/winui-app/references/foundation-winui-app-structure.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/winui-app/references/foundation-winui-app-structure.md"
sourceSha256: "5d2a8e8ca4a7e7058722566622bddca98ae18c136c0c3f76dd0a5edfb78cd51c"
pageSha256: "5d2a8e8ca4a7e7058722566622bddca98ae18c136c0c3f76dd0a5edfb78cd51c"
contentMode: "local-full"
zh: ""
---

# Agent Skills

## What This Reference Is For

Use this file when structuring a WinUI 3 app, reviewing project layout, or deciding where shell, pages, controls, resources, and view models should live.

## Prefer

- A clear C#-first folder split such as `Pages`, `Controls`, `ViewModels`, `Services`, `Styles`, and `Assets`.
- `App.xaml` and shared resource dictionaries for app-wide theme resources and styles.
- A single main shell window that owns navigation and common chrome.
- Native command surfaces such as `CommandBar` for grouped window or page actions before inventing a custom toolbar composition.
- Strongly typed `x:Bind` where it improves compile-time safety and performance.

## Avoid

- Putting shell logic, page logic, and resource definitions into one large window file.
- Scattering theme brushes and styles across many page-local dictionaries.
- Introducing MVVM ceremony that the project will not actually maintain.

## Recommended Shape

- `App.xaml` / `App.xaml.cs`
  - global resources, startup, window creation, app-level exceptions
- `MainWindow.xaml` / `MainWindow.xaml.cs`
  - shell, title bar, top-level navigation host
- `Pages/`
  - page views and page-specific logic
- `Controls/`
  - reusable WinUI user controls
- `ViewModels/`
  - state and commands when the app benefits from separation
- `Styles/`
  - resource dictionaries, theme tokens, shared control styles
- `Helpers/` or `Services/`
  - windowing, navigation, persistence, OS integration helpers

## Binding Guidance

- Prefer `x:Bind` for page-local properties, event handlers, and strongly typed view model access.
- Use `Binding` where the data context is dynamic or a template must stay flexible.
- Avoid binding patterns that depend on unclear page lifetime or implicit data contexts.

## WinUI Gallery Anchors

- `App.xaml.cs` shows app-level startup and integration points.
- `MainWindow.xaml` shows shell composition, title bar usage, and search integration.
- `Pages/` and `Samples/` show how Microsoft organizes pages, helpers, and styles in a real WinUI companion app.

## Review Checklist

- Are app resources centralized?
- Is shell logic separated from content pages?
- Are bindings explicit and maintainable?
- Is the structure consistent with the scale of the app?
