---
title: "Unit 3: Plugins"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/units/en/unit3/introduction.mdx"
sourceRel: "units/en/unit3/introduction.mdx"
rawUrl: "/raw/10-context-memory/hf-context-course/units/en/unit3/introduction.mdx"
sourceSha256: "e6ce836507644bfbb19ab33f8e66cf4784261b85328a12c4a919e27cf02ef73a"
pageSha256: "e6ce836507644bfbb19ab33f8e66cf4784261b85328a12c4a919e27cf02ef73a"
contentMode: "local-full"
zh: ""
---

# Unit 3: Plugins

## What Are Plugins?

Plugins are reusable extensions for code agents. The exact shape depends on the platform: **Claude Code** and **Codex** use installable plugin bundles with manifests plus optional skills, MCP servers, and app integrations, while **OpenCode** uses JavaScript/TypeScript plugin modules loaded from local files or npm packages.

Plugins are pre-built context packs: curated, tested, and shareable bundles of knowledge and tools that save setup time and keep teams consistent.

## The Evolution of Context

The journey to plugins reflects how AI agents have matured:

1. **Prompts** — Raw instructions. Fragile, hard to reuse, inconsistent across team members.
2. **Skills** — Packaged prompts + tools. More organized, but no dependency management.
3. **MCP Servers** — Standardized tool interfaces. Composable, but steep learning curve.
4. **Plugins** — Reusable extensions. In Claude Code and Codex, that usually means a manifest plus bundled components. In OpenCode, it means a code module that hooks into the agent and can add behavior or tools.

## Why Plugins Matter

For a solo developer, a plugin skips setup: install a Python-linting plugin or an API-docs plugin and you inherit someone else's curation. For a team, plugins are the unit of consistency — everyone gets the same tools and instructions. For a community, they're a shareable artifact you can publish to a marketplace.

## Key Terminology

A **skill** is a reusable prompt plus metadata. An **MCP server** is a standardized tool provider for file I/O, API calls, or database queries. An **integration** connects to an external service like GitHub, Slack, or Google Drive. A **manifest** is the metadata file used by manifest-first plugin systems like Claude Code and Codex. A **marketplace** is a catalog where plugins are published and discovered.

First up, we are going to take an in-depth look at the anatomy of plugins.
