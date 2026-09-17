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
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/winui-app/references/foundation-setup-and-project-selection.md"
sourceRel: "skills/.curated/winui-app/references/foundation-setup-and-project-selection.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/winui-app/references/foundation-setup-and-project-selection.md"
sourceSha256: "4440a2a6babd2c293d6f0efc7fb3a6975b2978e711295924ecf145e139124a72"
pageSha256: "4440a2a6babd2c293d6f0efc7fb3a6975b2978e711295924ecf145e139124a72"
contentMode: "local-full"
zh: ""
---

# Agent Skills

## What This Reference Is For

Use this file when the user is starting from scratch, choosing a project template, or asking what a WinUI machine needs before code work begins.

## Prefer

- The setup-and-scaffold flow in [../SKILL.md](/lib/10-context-memory/openai-skills/skills-_curated-winui-app-SKILL) for prerequisite setup, template verification, and the first scaffold.
- A C# WinUI 3 desktop app on the Windows App SDK unless the user has a clear reason to prefer C++ or an existing non-WinUI stack.
- Official project templates and default packaging choices first.
- The current supported LTS .NET SDK for new C# work instead of only meeting the bare minimum.
- A packaged app by default for the smoothest first-project, deployment, and Store-compatible path.
- An unpackaged app when the user explicitly needs repeatable CLI build-and-run verification or direct executable launches as the normal local workflow.

## Avoid

- Starting project setup before the setup-and-scaffold flow in this skill has finished.
- Starting with unpackaged deployment unless the user needs repeatable CLI launch, an installer, existing desktop app integration, or a deliberate runtime strategy.
- Giving machine-readiness advice without verification.
- Treating old Windows builds, missing SDKs, or partial Visual Studio installs as "probably fine."
- Deferring the packaging choice until after startup, storage, and launch code are already written.

## Setup Baseline

- Use the setup-and-scaffold flow in [../SKILL.md](/lib/10-context-memory/openai-skills/skills-_curated-winui-app-SKILL) for prerequisite setup, template verification, and the first scaffold.
- Treat [../config.yaml](https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/winui-app/config.yaml) as the bundled WinGet bootstrap source for setup and remediation.
- Return to this reference only after that workflow completes or when the task moves beyond initial project creation.
- Windows 10 version 1809 (build 17763) or later is the floor.
- Windows SDK 10.0.19041.0 or later is the practical baseline.
- Visual Studio with the WinUI application development workload is the supported primary IDE path.
- For C# apps, a supported .NET SDK must be installed.
- Developer Mode matters for common local deploy and debug flows.

## Project Selection Guidance

- Choose packaged when the user wants the default WinUI 3 path, easy local F5 workflows, or Store-friendly deployment. Keep the scaffold at its default unless the user explicitly asks for unpackaged behavior.
- Choose packaged when the app needs package identity or package-backed APIs during normal operation.
- Choose unpackaged when the user expects direct `.exe` launches, agent-driven local verification after each change, or integration with an existing installer or external location. Request that option through the setup flow instead of converting the initial project afterward.
- For either packaging model, scaffold first through the setup flow in `SKILL.md` and continue from the generated project instead of copying in prebuilt baseline files.
- If startup or shared resources later become suspect, create a fresh comparison app with the same packaging model and diff against that `dotnet new winui` output before broader restructuring.
- Once the model is chosen, keep startup and service code consistent with that model.
- Choose the standard blank app template first, then layer in navigation, title bar, or windowing patterns as the app matures.

## Sample and Source Anchors

- Learn `start-here.md` for the current official setup path.
- Learn `winui/winui3/index.md` for the framework position and platform benefits.
- Learn `windows-app-sdk/index.md` for the Windows App SDK feature surface.
- Learn `system-requirements.md` for tool and OS baselines.

## Review Checklist

- Is the machine baseline actually verified through the setup-and-scaffold flow in `SKILL.md`?
- Is the chosen packaging model intentional?
- Does the launch workflow match the chosen packaging model?
- Is the app still rooted in the standard WinUI template unless there is a real reason not to?
- Is the recommendation aligned with a C#-first WinUI 3 workflow?
