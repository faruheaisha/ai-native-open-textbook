---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/memory-systems.md"
sourceRel: "guide/core/memory-systems.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/core/memory-systems.md"
sourceSha256: "202c1a94a23216f809b11b8a8694609b012d5918a80e25a0ae3f50ebca76308c"
pageSha256: "7d5d7f508a6c039196dcbee4b9d3cf9fa104c1c6f39b0e91299759477d06ccdf"
contentMode: "local-full"
zh: ""
---

## Table of Contents

1. [TL;DR: Three-Track Model](#1-tldr-three-track-model)
2. [Native Claude Code Memory Stack](#2-native-claude-code-memory-stack)
   - [2.1 CLAUDE.md](#21-claudemd-three-levels-of-memory)
   - [2.2 Auto Memory (v2.1.59+)](#22-auto-memory-v2159)
   - [2.3 Auto Dream: Memory Consolidation](#23-auto-dream-memory-consolidation)
   - [2.4 Agent Memory Frontmatter](#24-agent-memory-frontmatter)
   - [2.5 Session vs Persistent Memory](#25-session-vs-persistent-memory)
   - [2.6 Limits of the Native Stack](#26-limits-of-the-native-stack)
3. [Cross-Session Tools (Single User)](#3-cross-session-tools-single-user)
   - [3.1 claude-mem](#31-claude-mem)
   - [3.2 agentmemory](#32-agentmemory)
   - [3.3 ICM (Infinite Context Memory)](#33-icm-infinite-context-memory)
   - [3.4 Kairn](#34-kairn)
   - [3.5 doobidoo mcp-memory-service](#35-doobidoo-mcp-memory-service)
   - [3.6 OpenMemory MCP](#36-openmemory-mcp)
   - [3.7 File-Based Experience Playbooks (ORF, DiffMem)](#37-file-based-experience-playbooks-orf-diffmem)
   - [3.8 Other Notable Tools](#38-other-notable-tools)
   - [3.9 Master Comparison Table](#39-master-comparison-table)
4. [Team Sharing](#4-team-sharing)
   - [4.1 The Trinity](#41-the-trinity-claudemd--mcpjson--skills)
   - [4.2 doobidoo + Cloudflare (Team Mode)](#42-doobidoo--cloudflare-team-mode)
   - [4.3 Mem0 Cloud MCP](#43-mem0-cloud-mcp)
   - [4.4 Zep / Graphiti](#44-zep--graphiti)
   - [4.5 Notion MCP](#45-notion-mcp)
   - [4.6 Team-Native Tools (2026)](#46-team-native-tools-2026)
   - [4.7 Why the Team Gap Is Structural](#47-why-the-team-gap-is-structural)
5. [Multi-Agent Shared Memory](#5-multi-agent-shared-memory)
6. [Architecture Patterns](#6-architecture-patterns)
7. [Risks and Security](#7-risks-and-security)
8. [Decision Frameworks](#8-decision-frameworks)
9. [Benchmarks and Evaluation](#9-benchmarks-and-evaluation)
10. [Open Problems](#10-open-problems)
