---
title: "Deep Wiki: Build VitePress Site"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/deep-wiki/commands/build.md"
sourceRel: ".github/plugins/deep-wiki/commands/build.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/deep-wiki/commands/build.md"
sourceSha256: "26dbd05155e540e0b2345d0c35c9666e56031593014151cd5bc22d164a88ff77"
pageSha256: "26dbd05155e540e0b2345d0c35c9666e56031593014151cd5bc22d164a88ff77"
contentMode: "local-full"
zh: ""
---

# Deep Wiki: Build VitePress Site

Package the generated wiki markdown files into a complete VitePress site with a Daytona-inspired dark theme, dark-mode Mermaid diagrams, and click-to-zoom for diagrams and images.

## Prerequisites

The wiki markdown files should already exist (from `/deep-wiki:generate` or manual creation). This command scaffolds the VitePress project around them.

## Step 1: Scaffold VitePress Project

Create a `wiki/` directory with this structure:

```
wiki/
├── package.json
├── .gitignore
├── AGENTS.md                          # Agent instructions for wiki folder
├── CLAUDE.md                          # Companion pointer to AGENTS.md
├── index.md                          # Wiki home page (NOT a placeholder — see below)
├── llms.txt                          # LLM-friendly links + descriptions
├── llms-full.txt                     # LLM-friendly full inlined content
├── onboarding/                        # Audience-tailored onboarding guides
│   ├── index.md                       # Onboarding hub with guide selector
│   ├── contributor-guide.md           # For new contributors (assumes Python/JS)
│   ├── staff-engineer-guide.md        # For staff/principal engineers
│   ├── executive-guide.md             # For VP/director-level leaders
│   └── product-manager-guide.md       # For product managers
├── {NN}-{section-name}/              # Numbered section folders
│   ├── {page-name}.md
│   └── ...
├── .vitepress/
│   ├── config.mts                    # Full VitePress config
│   ├── public/
│   │   ├── logo.svg                  # Brand logo
│   │   ├── llms.txt                  # Served at /llms.txt on deployed site
│   │   └── llms-full.txt             # Served at /llms-full.txt on deployed site
│   └── theme/
│       ├── index.ts                  # Theme setup (zoom handlers)
│       └── custom.css                # Complete dark theme + Mermaid + zoom CSS
```

### index.md — Wiki Landing Page (CRITICAL)

The `index.md` MUST be a developer-focused wiki home page — **NOT a marketing landing page**. No `hero:` frontmatter blocks, no taglines, no call-to-action buttons. This is a technical wiki, not a product page.

Generate `index.md` with this structure:

```markdown
---
title: Project Name — Documentation
description: Technical documentation for Project Name
---

# Project Name

Brief 1–2 sentence description of what the project does technically.

## Quick Start

\`\`\`bash
# Clone, install, run (actual commands from the repo)
