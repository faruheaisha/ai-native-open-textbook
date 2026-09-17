---
title: "ASP.NET Core"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/aspnet-core/SKILL.md"
sourceRel: "skills/.curated/aspnet-core/SKILL.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/aspnet-core/SKILL.md"
sourceSha256: "1f487ef3565e5ac1ee6c93cbeb9ac666292b30285877c82ddb0a77c9777fe92f"
pageSha256: "1f487ef3565e5ac1ee6c93cbeb9ac666292b30285877c82ddb0a77c9777fe92f"
contentMode: "local-full"
zh: ""
---

# ASP.NET Core

## Overview

Choose the right ASP.NET Core application model, compose the host and request pipeline correctly, and implement features in the framework style Microsoft documents today.

Load the smallest set of references that fits the task. Do not load every reference by default.

## Workflow

1. Confirm the target framework, SDK, and current app model.
2. Open [references/stack-selection.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-stack-selection) first for new apps or major refactors.
3. Open [references/program-and-pipeline.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-program-and-pipeline) next for `Program.cs`, DI, configuration, middleware, routing, logging, and static assets.
4. Open exactly one primary app-model reference:
   - [references/ui-blazor.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-ui-blazor)
   - [references/ui-razor-pages.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-ui-razor-pages)
   - [references/ui-mvc.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-ui-mvc)
   - [references/apis-minimal-and-controllers.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-apis-minimal-and-controllers)
5. Add cross-cutting references only as needed:
   - [references/data-state-and-services.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-data-state-and-services)
   - [references/security-and-identity.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-security-and-identity)
   - [references/realtime-grpc-and-background-work.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-realtime-grpc-and-background-work)
   - [references/testing-performance-and-operations.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-testing-performance-and-operations)
6. Open [references/versioning-and-upgrades.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-versioning-and-upgrades) before introducing new platform APIs into an older solution or when migrating between major versions.
7. Use [references/source-map.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-source-map) when you need the Microsoft Learn section that corresponds to a task not already covered by the focused references.

## Default Operating Assumptions

- Prefer the latest stable ASP.NET Core and .NET unless the repository or user request pins an older target.
- As of March 2026, prefer .NET 10 / ASP.NET Core 10 for new production work. Treat ASP.NET Core 11 as preview unless the user explicitly asks for preview features.
- Prefer `WebApplicationBuilder` and `WebApplication`. Avoid older `Startup` and `WebHost` patterns unless the codebase already uses them or the task is migration.
- Prefer built-in DI, options/configuration, logging, ProblemDetails, OpenAPI, health checks, rate limiting, output caching, and Identity before adding third-party infrastructure.
- Keep feature slices cohesive so the page, component, endpoint, controller, validation, service, data access, and tests are easy to trace.
- Respect the existing app model. Do not rewrite Razor Pages to MVC or controllers to Minimal APIs without a clear reason.

## Reference Guide

- [references/_sections.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-_sections): Quick index and reading order.
- [references/stack-selection.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-stack-selection): Choose the right ASP.NET Core application model and template.
- [references/program-and-pipeline.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-program-and-pipeline): Structure `Program.cs`, services, middleware, routing, configuration, logging, and static assets.
- [references/ui-blazor.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-ui-blazor): Build Blazor Web Apps, choose render modes, and use components, forms, and JS interop correctly.
- [references/ui-razor-pages.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-ui-razor-pages): Build page-focused server-rendered apps with handlers, model binding, and conventions.
- [references/ui-mvc.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-ui-mvc): Build controller/view applications with clear separation of concerns.
- [references/apis-minimal-and-controllers.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-apis-minimal-and-controllers): Build HTTP APIs with Minimal APIs or controllers, including validation and response patterns.
- [references/data-state-and-services.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-data-state-and-services): Use EF Core, `DbContext`, options, `IHttpClientFactory`, session, temp data, and app state responsibly.
- [references/security-and-identity.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-security-and-identity): Apply authentication, authorization, Identity, secrets, data protection, CORS, CSRF, and HTTPS guidance.
- [references/realtime-grpc-and-background-work.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-realtime-grpc-and-background-work): Use SignalR, gRPC, and hosted services.
- [references/testing-performance-and-operations.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-testing-performance-and-operations): Add integration tests, browser tests, caching, compression, health checks, rate limits, and deployment concerns.
- [references/versioning-and-upgrades.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-versioning-and-upgrades): Handle target frameworks, breaking changes, obsolete APIs, and migrations.
- [references/source-map.md](/lib/10-context-memory/openai-skills/skills-_curated-aspnet-core-references-source-map): Map the official ASP.NET Core documentation tree to the references in this skill.

## Execution Notes

- When generating new code, start from the correct `dotnet new` template and keep the generated structure recognizable.
- When editing an existing solution, follow the solution's conventions first and use these references to avoid framework misuse or outdated patterns.
- When a task mentions "latest", verify the feature on Microsoft Learn or the ASP.NET Core docs repo before relying on memory.
