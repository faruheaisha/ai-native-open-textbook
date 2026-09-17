---
title: "Claude Code System Prompts"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-doctor-slash-command-description.md"
sourceRel: "system-prompts/skill-doctor-slash-command-description.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-doctor-slash-command-description.md"
sourceSha256: "022af1b8b05d7753e3f2278fd36a5807ad971b8a21aec5e45a208c85a80a46c2"
pageSha256: "022af1b8b05d7753e3f2278fd36a5807ad971b8a21aec5e45a208c85a80a46c2"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Health-check the user's Claude Code setup and fix issues: diagnose installation health — what the `claude doctor` terminal diagnostics cover — from local data (duplicate or leftover installs, PATH, unparseable settings files, broken or colliding agent definitions, skills whose frontmatter fails to parse); find unused skills, MCP servers, and plugins versus their context cost and disable dead weight; deduplicate local CLAUDE.md files against checked-in ones; trim checked-in CLAUDE.md files by cutting content a session could derive from the codebase (directory layouts, tech-stack lists, architecture overviews) while keeping gotchas, rationale, and non-standard conventions; migrate always-loaded CLAUDE.md guidance into lazy skills and nested CLAUDE.md files; flag slow hooks and context-heavy extensions; check the installed version is current; make auto mode the default permission mode; and pre-approve frequently denied read-only commands. Use when the user asks for a doctor run, checkup, audit, tune-up, or cleanup of their Claude Code setup or configuration.
