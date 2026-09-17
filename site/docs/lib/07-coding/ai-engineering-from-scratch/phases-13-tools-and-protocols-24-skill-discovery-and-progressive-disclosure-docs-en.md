---
title: "Skill Discovery and Progressive Disclosure"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/13-tools-and-protocols/24-skill-discovery-and-progressive-disclosure/docs/en.md"
sourceRel: "phases/13-tools-and-protocols/24-skill-discovery-and-progressive-disclosure/docs/en.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/13-tools-and-protocols/24-skill-discovery-and-progressive-disclosure/docs/en.md"
sourceSha256: "5880cb2e0c0d2bc5e83ad8e6e5633e7645db5f67fefd5c78323ff81ef974bc8c"
pageSha256: "5880cb2e0c0d2bc5e83ad8e6e5633e7645db5f67fefd5c78323ff81ef974bc8c"
contentMode: "local-full"
zh: ""
---

# Skill Discovery and Progressive Disclosure

> A skill becomes useful before its body is loaded. Its name and description earn a place in the catalog; its deeper files earn context only when the task reaches them.

**Type:** Build
**Languages:** Python (stdlib)
**Prerequisites:** Phase 13 · 22 (Agent Skills: Portable Contract and Runtime Boundary)
**Time:** ~105 minutes

## Learning Objectives

- Build a filesystem discovery pipeline that separates scope, validation, collision policy, and catalog publication.
- Explain the three disclosure levels: catalog metadata, active instructions, and task-specific resources.
- Design references so an agent can reach required detail directly without loading the entire package.
- Budget catalog space independently from active-skill context.
- Reject path traversal and symlink escape when a skill reads its own resources.

## The Problem

Your agent has 200 installed skills. Loading every `SKILL.md`, reference file, script, and template at session start would bury the current task in unrelated procedure. Loading nothing would force the user to remember exact filesystem paths.

The usual compromise is a catalog: show the model a compact identity and routing description for each eligible skill, then load the full body only after selection. That creates two new engineering problems.

First, discovery is not just recursive file search. Skills can exist at project, user, administrator, plugin, or built-in scopes. Two packages can share a name. A symlink can point outside the trusted root. A malformed package can consume catalog space or become impossible to invoke.

Second, progressive disclosure can become progressive confusion. If `SKILL.md` says "read the relevant guide" and the package contains twelve guides, the model must guess. If every guide points to three more files, loading becomes an unbounded graph walk.

A good runtime makes discovery deterministic and disclosure intentional.

## The Concept

### Discovery is a compiler pipeline

Treat the filesystem as source input. Do not publish raw paths directly to the model.

```figure
skill-discovery-pipeline
```

Each stage should produce structured data and structured failures. A discovery log should answer:

- Which roots were searched?
- Which candidates were found?
- Which candidates were rejected, and why?
- Which package won a collision?
- Which catalog entries were shortened or omitted because of budget?

Without that evidence, "the model did not use my skill" is almost impossible to diagnose.

### Scope is runtime policy

The portable specification defines a skill package, not one universal installation path or precedence order. The host decides where it searches.

A generic runtime might use these scopes:

| Scope | Example root | Intended ownership |
|---|---|---|
| Workspace | `<repo>/.agents/skills/` | Project maintainers |
