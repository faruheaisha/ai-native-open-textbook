---
title: "Superpowers（Claude Code 技能库）"
sourceId: "10-context-memory/superpowers"
sourceTitle: "Superpowers（Claude Code 技能库）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/obra/superpowers"
entryUrl: "https://github.com/obra/superpowers/blob/b36e0829c6d0140e93cfef2ca599b1b07d4a7797/RELEASE-NOTES.md"
sourceRel: "RELEASE-NOTES.md"
rawUrl: "/raw/10-context-memory/superpowers/RELEASE-NOTES.md"
sourceSha256: "7c69947152d72dde3b24e2f251afdc82b1d5f8e3a4c9dde21f65e3229f281d11"
pageSha256: "ee811fc682d690c5edbfe555eccf7c857f6c1f78074e1541311fbbc3e44288db"
contentMode: "local-full"
zh: ""
---

## Overview

Superpowers v2.0 makes skills more accessible, maintainable, and community-driven through a major architectural shift.

The headline change is **skills repository separation**: all skills, scripts, and documentation have moved from the plugin into a dedicated repository ([obra/superpowers-skills](https://github.com/obra/superpowers-skills)). This transforms superpowers from a monolithic plugin into a lightweight shim that manages a local clone of the skills repository. Skills auto-update on session start. Users fork and contribute improvements via standard git workflows. The skills library versions independently from the plugin.

Beyond infrastructure, this release adds nine new skills focused on problem-solving, research, and architecture. We rewrote the core **using-skills** documentation with imperative tone and clearer structure, making it easier for Claude to understand when and how to use skills. **find-skills** now outputs paths you can paste directly into the Read tool, eliminating friction in the skills discovery workflow.

Users experience seamless operation: the plugin handles cloning, forking, and updating automatically. Contributors find the new architecture makes improving and sharing skills trivial. This release lays the foundation for skills to evolve rapidly as a community resource.
