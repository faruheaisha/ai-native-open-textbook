---
title: "Agent Systems Handbook（智能体系统手册）"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/README.md"
zh: ""
---

import SupportCTA from "/snippets/support-cta.mdx";

Claude Code is a terminal-based coding agent from Anthropic. In this workshop
track, use it as another local agent surface for reading a repo, editing files,
and running checks. The current official docs make three practical boundaries
worth keeping visible from the start:

- the repository root Claude Code should work inside
- the MCP tools and data sources you connect into that repo
- the reusable project instructions you keep in version control

## Install

Install Claude Code with the native installer:

```bash
curl -fsSL https://claude.ai/install.sh | bash
claude --version
```

On macOS, Homebrew is also supported:

```bash
brew install --cask claude-code
```

On Windows, use the installer command from the official Claude Code docs for
PowerShell, CMD, or WinGet. For new workshop setups, prefer the native installer
or package-manager paths first. The current Anthropic docs still document npm as
a supported global package, but native install is the recommended starting point.

## Start In A Repository

Run Claude Code from the project you want it to inspect:

```bash
cd path/to/your/repo
claude
```

Follow the authentication flow shown by the CLI.

## Connect Tools With MCP

Claude Code becomes more useful once the repo can reach the same systems your
team already uses. Anthropic's current MCP docs distinguish three scopes:

- `local`: the default server scope for the current project entry in
  `~/.claude.json`
- `project`: a team-shared `.mcp.json` file checked into the repository
- `user`: private cross-project servers stored in `~/.claude.json`

For a team-shared server, the current command shape is:

```bash
claude mcp add --transport http --scope project <name> <url>
```

Claude Code writes the shared server into `.mcp.json` and prompts for approval
before using a project-scoped server from version control. Use `/mcp` when a
remote server needs OAuth login.

Prefer project scope for handbook workshops when the same tool boundary should
be visible to every contributor. Prefer user scope only for personal utilities
or credentials that should not live in the repository.

## Keep Project Instructions Explicit

Claude Code's current docs expect teams to keep repo-specific instructions in a
checked-in `CLAUDE.md`. Use it for coding standards, architecture decisions,
review checklists, and the "how we work here" rules that should stay close to
the repo rather than inside a one-off prompt.

This handbook uses the same idea for public learning material: keep workshop
steps, source maps, and contributor guidance as visible artifacts that can be
reviewed and updated.

## Basic Working Loop

Before starting a task:

```bash
git status --short
```

Ask Claude Code to:

- inspect the existing repo structure before proposing changes
- keep edits aligned with the current issue or workshop step
- run the repo's validation command after changing files
- report changed files and any commands that failed
- name any MCP server, repo instruction file, or permission boundary it relied on

## Good Defaults

- Keep the terminal rooted at the repo you want to change.
- Do not paste secrets, bot tokens, or API keys into chat.
- Treat untrusted MCP servers and prompt-injection-prone data sources as a real
  security boundary, not as a convenience feature.
- Prefer small, reviewable changes during a workshop.
- Use the same validation checklist you would use for Codex work.

## Next Steps

- Compare this setup with [Codex Workshop](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/workshops/codex/README.md)
  when you want a second local coding-agent surface.
- Read [Skills Introduction](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/workshops/skills-introduction/README.md) after desktop setup
  is working and you want repeatable slash-command workflows.
- Use [Local Agent Tooling Source Map](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/contributor-kit/reference-notes/local-agent-tooling-source-map/README.md)
  when you need the repo's terminology for runtimes, skills, roots, resources,
  and connectors.

## Reference

- [Claude Code overview](https://code.claude.com/docs/en/overview)
- [Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp)
- [anthropics/claude-code](https://github.com/anthropics/claude-code)
