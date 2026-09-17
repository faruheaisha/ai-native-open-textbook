---
title: "Knowledge MCP Search Strategies"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-knowledge-mcp-search-strategies.md"
sourceRel: "system-prompts/data-knowledge-mcp-search-strategies.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-knowledge-mcp-search-strategies.md"
sourceSha256: "9a25b968f2f2e7e4bc18bbe726220e293ae8955e931e17ee90bff7da75ec2419"
pageSha256: "9a25b968f2f2e7e4bc18bbe726220e293ae8955e931e17ee90bff7da75ec2419"
contentMode: "local-full"
zh: ""
---

# Knowledge MCP Search Strategies

Query patterns for gathering organizational context during plugin customization.

## Finding Tool Names

**Source control:**
- Search: "GitHub" OR "GitLab" OR "Bitbucket"
- Search: "pull request" OR "merge request"
- Look for: repository links, CI/CD mentions

**Project management:**
- Search: "Asana" OR "Jira" OR "Linear" OR "Monday"
- Search: "sprint" AND "tickets"
- Look for: task links, project board mentions

**Chat:**
- Search: "Slack" OR "Teams" OR "Discord"
- Look for: channel mentions, integration discussions

**Analytics:**
- Search: "Datadog" OR "Grafana" OR "Mixpanel"
- Search: "monitoring" OR "observability"
- Look for: dashboard links, alert configurations

**Design:**
- Search: "Figma" OR "Sketch" OR "Adobe XD"
- Look for: design file links, handoff discussions

**CRM:**
- Search: "Salesforce" OR "HubSpot"
- Look for: deal mentions, customer record links

## Finding Organization Values

**Workspace/project IDs:**
- Search for existing integrations or bookmarked links
- Look for admin/setup documentation

**Team conventions:**
- Search: "story points" OR "estimation"
- Search: "workflow" OR "ticket status"
- Look for engineering process docs

**Channel/team names:**
- Search: "standup" OR "engineering" OR "releases"
- Look for channel naming patterns

## When Knowledge MCPs Are Unavailable

If no knowledge MCPs are configured, skip automatic discovery and proceed directly to AskUserQuestion for all categories. Note: AskUserQuestion always includes a Skip button and a free-text input box for custom answers, so do not include `None` or `Other` as options.
