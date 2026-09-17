---
title: "PR Guidelines"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/projects/unit3/team-guidelines/pr-guidelines.md"
sourceRel: "projects/unit3/team-guidelines/pr-guidelines.md"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/projects/unit3/team-guidelines/pr-guidelines.md"
sourceSha256: "3bde392bbcc46e5977893e531964e74527d756301f597216176ccddeb9899e06"
pageSha256: "3bde392bbcc46e5977893e531964e74527d756301f597216176ccddeb9899e06"
contentMode: "local-full"
zh: ""
---

# PR Guidelines

## PR Size
- Keep PRs under 500 lines of changes
- Split large features into multiple PRs
- One logical change per PR
- Separate refactoring from feature changes

## PR Description
- Clearly explain what and why
- Include screenshots for UI changes
- List any breaking changes
- Add testing instructions
- Reference related issues/tickets

## Review Process
- At least one approval required
- Address all review comments
- Update PR description with changes made
- Resolve conflicts before requesting review
- Tag relevant team members

## Before Merging
- All CI checks must pass
- Update documentation if needed
- Verify no sensitive data is exposed
- Squash commits if necessary
- Delete feature branch after merge

## PR Title Format
- Use conventional commit format
- Be specific and descriptive
- Examples:
  - "feat(auth): Add OAuth2 support"
  - "fix(api): Handle null response in user endpoint"
  - "docs: Update installation guide"
