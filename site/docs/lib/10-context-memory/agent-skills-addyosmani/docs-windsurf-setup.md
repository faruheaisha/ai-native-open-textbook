---
title: "Using agent-skills with Windsurf"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/docs/windsurf-setup.md"
sourceRel: "docs/windsurf-setup.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/docs/windsurf-setup.md"
sourceSha256: "1410af016060047d1a265365f8d98aadd00a58bcfa2a048edec06d61d337cd97"
pageSha256: "1410af016060047d1a265365f8d98aadd00a58bcfa2a048edec06d61d337cd97"
contentMode: "local-full"
zh: ""
---

# Using agent-skills with Windsurf

## Setup

### Project Rules

Windsurf uses `.windsurfrules` for project-specific agent instructions:

```bash
# Create a combined rules file from your most important skills
cat /path/to/agent-skills/skills/test-driven-development/SKILL.md > .windsurfrules
echo "\n---\n" >> .windsurfrules
cat /path/to/agent-skills/skills/incremental-implementation/SKILL.md >> .windsurfrules
echo "\n---\n" >> .windsurfrules
cat /path/to/agent-skills/skills/code-review-and-quality/SKILL.md >> .windsurfrules
```

### Global Rules

For skills you want across all projects, add them to Windsurf's global rules:

1. Open Windsurf → Settings → AI → Global Rules
2. Paste the content of your most-used skills

## Recommended Configuration

Keep `.windsurfrules` focused on 2-3 essential skills to stay within context limits:

```
# .windsurfrules
# Essential agent-skills for this project

[Paste test-driven-development SKILL.md]

---

[Paste incremental-implementation SKILL.md]

---

[Paste code-review-and-quality SKILL.md]
```

## Usage Tips

1. **Be selective** — Windsurf's context is limited. Choose skills that address your biggest quality gaps.
2. **Reference in conversation** — Paste additional skill content into the chat when working on specific phases (e.g., paste `security-and-hardening` when building auth).
3. **Use references as checklists** — Paste `references/security-checklist.md` and ask Windsurf to verify each item.
