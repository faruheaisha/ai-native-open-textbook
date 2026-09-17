---
title: "Razor Pages"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/aspnet-core/references/ui-razor-pages.md"
sourceRel: "skills/.curated/aspnet-core/references/ui-razor-pages.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/aspnet-core/references/ui-razor-pages.md"
sourceSha256: "3f3e2dc6e47ce6202649f28fd3143087c067048e60cb997030f8f0bc17a09f1a"
pageSha256: "3f3e2dc6e47ce6202649f28fd3143087c067048e60cb997030f8f0bc17a09f1a"
contentMode: "local-full"
zh: ""
---

# Razor Pages

Primary docs:
- https://learn.microsoft.com/aspnet/core/razor-pages/
- https://learn.microsoft.com/aspnet/core/tutorials/razor-pages/

## Choose Razor Pages For Page-Centered Apps

Prefer Razor Pages when requests naturally map to pages, forms, and page-level handlers. This is a strong default for internal tools, CRUD apps, account flows, and admin surfaces.

## Core Shape

Enable Razor Pages with:

- `builder.Services.AddRazorPages();`
- `app.MapRazorPages();`

Use the `@page` directive to turn a `.cshtml` file into an endpoint. Keep request logic in the paired `PageModel` class when the page is more than trivial.

## Routing Model

- File system location defines the route by default
- `Pages/Index.cshtml` maps to `/`
- `Pages/Store/Index.cshtml` maps to `/Store`
- Keep folder structure meaningful because it becomes the URL structure

## PageModel Guidance

- Use `OnGet`, `OnPost`, and named handlers for request processing
- Use bindable properties and model validation for forms
- Keep page models thin; move business logic into injected services
- Use Tag Helpers and model binding instead of manual request parsing

## Good Fits

- form-heavy workflows
- dashboards and back-office applications
- simple content with server-side validation
- applications where a page is the primary navigation unit

## Key Limitation

Do not rely on per-handler authorization with Razor Pages. Microsoft explicitly recommends using MVC controllers when different handlers on the same logical surface need different authorization behavior.

Preferred responses to that limitation:

- split the handlers into separate pages
- move the surface to MVC if action-level authorization is a better fit

## Organizational Guidance

- Group related pages into folders
- Use partial views for repeated fragments
- Use areas only when the application has clear bounded sections
- Keep shared layout and page conventions centralized
