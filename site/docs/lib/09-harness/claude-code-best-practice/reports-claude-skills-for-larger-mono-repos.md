---
title: "Understanding Claude Skills Discovery in Large Monorepos"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/reports/claude-skills-for-larger-mono-repos.md"
sourceRel: "reports/claude-skills-for-larger-mono-repos.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/reports/claude-skills-for-larger-mono-repos.md"
sourceSha256: "1a229d8f7f50d629c13870dd3772d1215c46e9da6a98ec1af07cfe24eeef0e48"
pageSha256: "1a229d8f7f50d629c13870dd3772d1215c46e9da6a98ec1af07cfe24eeef0e48"
contentMode: "local-full"
zh: ""
---

# Understanding Claude Skills Discovery in Large Monorepos

When working with Claude Code in a monorepo, understanding how skills are discovered and loaded into context is crucial for organizing your project-specific capabilities effectively.

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="/mirror/08/083732f2d17cc173d2ce8cdf174e11bd1ccf34d9.svg" alt="Claude" width="60" /></td>
</tr>
</table>

## Important Difference from CLAUDE.md

**Skills do NOT have the same loading behavior as CLAUDE.md files.** While CLAUDE.md files walk UP the directory tree (ancestor loading), skills use a different discovery mechanism focused on nested directories within your project.

## How Skills Are Discovered

### 1. Standard Skill Locations

Skills are loaded from these fixed locations based on scope:

| Location | Path | Applies to |
|----------|------|------------|
| Enterprise | Managed settings | All users in organization |
