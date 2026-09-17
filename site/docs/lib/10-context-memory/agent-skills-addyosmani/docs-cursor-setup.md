---
title: "Using agent-skills with Cursor"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/docs/cursor-setup.md"
sourceRel: "docs/cursor-setup.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/docs/cursor-setup.md"
sourceSha256: "2df2336526a4463202615457f202d470300dd90727b1312df22513962ae4883f"
pageSha256: "2df2336526a4463202615457f202d470300dd90727b1312df22513962ae4883f"
contentMode: "local-full"
zh: ""
---

# Using agent-skills with Cursor

How to wire [agent-skills](/lib/10-context-memory/agent-skills-addyosmani/overview) into **Cursor** using current, supported project context — not legacy monolith files or Kaizen-specific layouts.

---

## What Cursor supports today

Cursor combines **rules** (short policies) and **skills** (full workflows):

| Layer | Path | Role |
|-------|------|------|
| **Project rules** | `.cursor/rules/*.mdc` | Always-on or file-scoped instructions (`alwaysApply`, `globs`) |
