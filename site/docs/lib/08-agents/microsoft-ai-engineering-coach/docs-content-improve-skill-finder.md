---
title: "Skill Finder"
sourceId: "08-agents/microsoft-ai-engineering-coach"
sourceTitle: "AI Engineering Coach（微软）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/AI-Engineering-Coach"
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/docs/content/improve/skill-finder.md"
sourceRel: "docs/content/improve/skill-finder.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/docs/content/improve/skill-finder.md"
sourceSha256: "73176bac14bd8ed7b03698b11e547d90e42c144dcbfa18315021f34910ff2dda"
pageSha256: "73176bac14bd8ed7b03698b11e547d90e42c144dcbfa18315021f34910ff2dda"
contentMode: "local-full"
zh: ""
---

# Skill Finder

The Skill Finder analyzes your prompt history to identify repeated patterns that waste time and matches them against a community-maintained skill catalog.

![Skill Finder](https://gh-proxy.com/https://raw.githubusercontent.com/microsoft/AI-Engineering-Coach/18b1a3d16b586c171426c6a407cc5c2dc073556e/docs/themes/coach/static/screenshots/screen-skill-finder.png)

## Custom Skill Opportunities

AI Engineer Coach groups similar prompts across your sessions. When the same type of request appears multiple times in different sessions, it surfaces as a **Custom Skill Opportunity**. For example, if you repeatedly ask to "package the extension", the Skill Finder detects this pattern and suggests creating a reusable skill for it.

Each opportunity shows:

- The number of repetitions and sessions
- Example prompts that triggered the detection
- An **Install Skill** button that helps you create a reusable instruction file

## Community Skills and Agents

Below the custom opportunities, AI Engineer Coach queries the community skill catalog and displays matching entries. These are curated skills and agents maintained in the open-source `awesome-copilot` directory.

Each community match shows:

- **Skill name** and category (e.g., VS CODE, TESTING, OTHER)
- **Description** of what the skill does
- **Why it matches** your usage pattern
- An **Install** button to add it to your workspace

## Configuration

You can select the workspace and look-back period (1 month, 3 months, 6 months) to control the scope of the analysis. Click **Analyze** to refresh the findings.
