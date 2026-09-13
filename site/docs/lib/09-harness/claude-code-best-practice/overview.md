---
title: "claude-code-best-practice"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/README.md"
zh: "on"
---

# claude-code-best-practice
from vibe coding to agentic engineering - practice makes claude perfect

 <br>

[![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/README.md) [![Implemented](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/implemented.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/implementation/README.md) [![Orchestration Workflow](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/orchestration-workflow.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/orchestration-workflow/orchestration-workflow.md) [![Claude](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/claude.svg)](https://code.claude.com/docs) [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](#-tips-and-tricks) [![Community](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community.svg)](#-subscribe) ![Click on these badges below to see the actual sources](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/click-badges.svg)<br>
<img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/a.svg" height="14"> = Agents · <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/c.svg" height="14"> = Commands · <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/s.svg" height="14"> = Skills

<div class="tb-zh"><p>徽章入口（可点击跳转）：最佳实践 · 已实现 · 编排工作流 · Claude 官方文档 · Boris · 社区；下方图例：A = Agents，C = Commands，S = Skills。</p></div>

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/claude-jumping.svg" alt="Claude Code mascot jumping" width="120" height="100"><br>

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/root/supported-label.svg" alt="Supported by:" height="34">&nbsp;&nbsp;<a href="https://disrupt.com/?utm_source=github&utm_campaign=shayan_claude_code_best_practice"><img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/root/supported-disrupt.svg" alt="Disrupt.com — Ventures Reimagined" height="34"></a>&nbsp;&nbsp;<a href="https://claudekit.cc/?utm_source=github&utm_medium=sponsorship&utm_campaign=shayan_claude_code_best_practice"><img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/root/supported-claudekit.svg" alt="ClaudeKit — Production-ready skills and workflows" height="34"></a>

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/root/boris-slider.gif" alt="Boris Cherny on Claude Code" width="600"><br>
  Boris Cherny on X (<a href="https://x.com/bcherny/status/2007179832300581177">tweet 1</a> · <a href="https://x.com/bcherny/status/2017742741636321619">tweet 2</a> · <a href="https://x.com/bcherny/status/2021699851499798911">tweet 3</a>)

> [!TIP]
> Visit the [**How to Use**](#how-to-use) section to take full advantage of this repo.

<div class="tb-zh"><p>Boris Cherny 在 X 上的三条推文（推文 1 · 推文 2 · 推文 3）。</p></div>

## 🧠 CONCEPTS

| Feature | Location | Description |
|---------|----------|-------------|
| <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/a.svg" height="14"> [**Subagents**](https://code.claude.com/docs/en/sub-agents) | `.claude/agents/<name>.md` | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/lib/09-harness/claude-code-best-practice/best-practice-claude-subagents/README.md) [![Implemented](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/implemented.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/lib/09-harness/claude-code-best-practice/implementation-claude-subagents-implementation/README.md) |
| <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/c.svg" height="14"> [**Commands**](https://code.claude.com/docs/en/commands) | `.claude/commands/<name>.md` | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/lib/09-harness/claude-code-best-practice/best-practice-claude-commands/README.md) [![Implemented](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/implemented.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/lib/09-harness/claude-code-best-practice/implementation-claude-commands-implementation/README.md) |
| <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/s.svg" height="14"> [**Skills**](https://code.claude.com/docs/en/skills) | `.claude/skills/<name>/SKILL.md` | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/lib/09-harness/claude-code-best-practice/best-practice-claude-skills/README.md) [![Implemented](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/implemented.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/lib/09-harness/claude-code-best-practice/implementation-claude-skills-implementation/README.md) [Official Skills](https://github.com/anthropics/skills/tree/main/skills) · [Skills for Mono-repos](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/reports/claude-skills-for-larger-mono-repos.md) |
| [**Workflows**](https://code.claude.com/docs/en/common-workflows) | [`.claude/commands/weather-orchestrator.md`](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/.claude/commands/weather-orchestrator.md) | [![Orchestration Workflow](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/orchestration-workflow.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/orchestration-workflow/orchestration-workflow.md) |
| [**Hooks**](https://code.claude.com/docs/en/hooks) | `.claude/hooks/` | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-hooks) [![Implemented](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/implemented.svg)](https://github.com/shanraisshan/claude-code-hooks) [Guide](https://code.claude.com/docs/en/hooks-guide) |
| [**MCP Servers**](https://code.claude.com/docs/en/mcp) | `.claude/settings.json`, `.mcp.json` | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/lib/09-harness/claude-code-best-practice/best-practice-claude-mcp/README.md) [![Implemented](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/implemented.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/.mcp.json) |
| [**Plugins**](https://code.claude.com/docs/en/plugins) | distributable packages | [Marketplaces](https://code.claude.com/docs/en/discover-plugins) · [Create Marketplaces](https://code.claude.com/docs/en/plugin-marketplaces) |
| [**Settings**](https://code.claude.com/docs/en/settings) | `.claude/settings.json` | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/lib/09-harness/claude-code-best-practice/best-practice-claude-settings/README.md) [![Implemented](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/implemented.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/.claude/settings.json) [Permissions](https://code.claude.com/docs/en/permissions) · [Model Config](https://code.claude.com/docs/en/model-config) · [Output Styles](https://code.claude.com/docs/en/output-styles) · [Sandboxing](https://code.claude.com/docs/en/sandboxing) · [Keybindings](https://code.claude.com/docs/en/keybindings) · [Auto Mode Config](https://code.claude.com/docs/en/auto-mode-config) |
| [**Status Line**](https://code.claude.com/docs/en/statusline) | `.claude/settings.json` | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-status-line) [![Implemented](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/implemented.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/.claude/settings.json) |
| [**Memory**](https://code.claude.com/docs/en/memory) | `CLAUDE.md`, `.claude/rules/`, `~/.claude/rules/`, `~/.claude/projects/<project>/memory/` | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/lib/09-harness/claude-code-best-practice/best-practice-claude-memory/README.md) [![Implemented](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/implemented.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/lib/09-harness/claude-code-best-practice/CLAUDE/README.md) [Auto Memory](https://code.claude.com/docs/en/memory) · [Auto Memory Deep-dive](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/reports/claude-agent-memory.md) · [Rules](https://code.claude.com/docs/en/memory#organize-rules-with-clauderules) |
| [**Checkpointing**](https://code.claude.com/docs/en/checkpointing) | automatic (file-edit tracking) |  |
| [**Sessions**](https://code.claude.com/docs/en/sessions) | `--resume`, `--continue`, `/resume`, `/branch` |  |
| [**Context Window**](https://code.claude.com/docs/en/context-window) | `/compact`, `/clear`, `/context` |  |
| [**CLI Startup Flags**](https://code.claude.com/docs/en/cli-reference) | `claude [flags]` | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/lib/09-harness/claude-code-best-practice/best-practice-claude-cli-startup-flags/README.md) [Interactive Mode](https://code.claude.com/docs/en/interactive-mode) · [Env Vars](https://code.claude.com/docs/en/env-vars) |
| **AI Terms** | | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-codex-cursor-gemini/blob/main/reports/ai-terms.md) |
| [**Best Practices**](https://code.claude.com/docs/en/best-practices) | | [Prompt Engineering](https://github.com/anthropics/prompt-eng-interactive-tutorial) · [Extend Claude Code](https://code.claude.com/docs/en/features-overview) |
| [**Prompt Library**](https://code.claude.com/docs/en/prompt-library) | |  |

### 🔥 Hot

| Feature | Location | Description |
|---------|----------|-------------|
| [**Ultrareview**](https://code.claude.com/docs/en/ultrareview) ![beta](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/beta.svg) | `/code-review ultra`, `claude ultrareview [target]` | [Tasks tracking](https://code.claude.com/docs/en/ultrareview#track-a-running-review) |
| [**Devcontainers**](https://code.claude.com/docs/en/devcontainer) | `.devcontainer/` |  |
| [**Channels**](https://code.claude.com/docs/en/channels) ![beta](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/beta.svg) | `--channels`, plugin-based | [Reference](https://code.claude.com/docs/en/channels-reference) |
| [**No Flicker Mode**](https://code.claude.com/docs/en/fullscreen) ![beta](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/beta.svg) | `/tui fullscreen`, `CLAUDE_CODE_NO_FLICKER=1` | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://x.com/bcherny/status/2039421575422980329) |
| [**Auto Mode**](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) | `--permission-mode auto`, `Shift+Tab` | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://x.com/claudeai/status/2036503582166393240) [Blog](https://claude.com/blog/auto-mode) |
| [**Power-ups**](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/claude-power-ups.md) | `/powerup` | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/claude-power-ups.md) |
| [**Fast Mode**](https://code.claude.com/docs/en/fast-mode) ![beta](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/beta.svg) | `/fast`, `"fastMode": true` |  |
| [**Advisor**](https://code.claude.com/docs/en/advisor) ![beta](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/beta.svg) | `/advisor`, `advisorModel`, `--advisor` | [Blog](https://claude.com/blog/the-advisor-strategy) |
| [**Computer Use**](https://code.claude.com/docs/en/computer-use) ![beta](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/beta.svg) | `computer-use` MCP server | [Desktop](https://code.claude.com/docs/en/desktop#let-claude-use-your-computer) |
| [**Agent SDK**](https://code.claude.com/docs/en/agent-sdk/overview) | `npm` / `pip` package | [Quickstart](https://code.claude.com/docs/en/agent-sdk/quickstart) · [Examples](https://github.com/anthropics/claude-agent-sdk-demos) |
| [**Ralph Wiggum Loop**](https://github.com/anthropics/claude-code/tree/main/plugins/ralph-wiggum) | plugin | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://github.com/ghuntley/how-to-ralph-wiggum) [![Implemented](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/implemented.svg)](https://github.com/shanraisshan/ralph-wiggum-self-evolving-loop) |
| [**Chrome**](https://code.claude.com/docs/en/chrome) | `--chrome`, extension | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/reports/claude-in-chrome-v-chrome-devtools-mcp.md) |
| [**Claude Code Web**](https://code.claude.com/docs/en/claude-code-on-the-web) ![beta](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/beta.svg) | `claude.ai/code` | [Routines](https://code.claude.com/docs/en/routines) |
| [**Artifacts**](https://code.claude.com/docs/en/artifacts) | `/share`, `Artifact` tool |  |
| [**Slack**](https://code.claude.com/docs/en/slack) | `@Claude` in Slack |  |
| [**Code Review**](https://code.claude.com/docs/en/code-review) ![beta](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/beta.svg) | GitHub App (managed) | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://x.com/claudeai/status/2031088171262554195) [Blog](https://claude.com/blog/code-review) [Local /code-review](https://code.claude.com/docs/en/commands) |
| [**GitHub Actions**](https://code.claude.com/docs/en/github-actions) | `.github/workflows/` | [GitLab CI/CD](https://code.claude.com/docs/en/gitlab-ci-cd) |
| [**Remote Control**](https://code.claude.com/docs/en/remote-control) | `/remote-control`, `/rc` | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://x.com/noahzweben/status/2032533699116355819) [Headless Mode](https://code.claude.com/docs/en/headless) |
| [**Deep Links**](https://code.claude.com/docs/en/deep-links) | `claude-cli://open?repo=…&q=…` |  |
| [**Dynamic Workflows**](https://code.claude.com/docs/en/workflows) | `/workflows`, `ultracode` keyword, `/effort ultracode`, `.claude/workflows/` | [Deep Research](https://code.claude.com/docs/en/workflows#run-a-bundled-workflow) |
| [**Agent Teams**](https://code.claude.com/docs/en/agent-teams) ![beta](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/beta.svg) | built-in (env var) | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://x.com/bcherny/status/2019472394696683904) [![Implemented](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/implemented.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/lib/09-harness/claude-code-best-practice/implementation-claude-agent-teams-implementation/README.md) |
| [**Agent View**](https://code.claude.com/docs/en/agent-view) ![beta](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/beta.svg) | `claude agents`, `--bg`, `/bg` |  |
| [**Cross-Session Messaging**](https://code.claude.com/docs/en/cross-session-messaging) | `SendMessage`, `ListAgents`, `/list-agents` |  |
| [**Scheduled Tasks**](https://code.claude.com/docs/en/scheduled-tasks) | `/loop`, `/schedule`, cron tools | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://x.com/bcherny/status/2030193932404150413) [![Implemented](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/implemented.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/implementation/claude-scheduled-tasks-implementation.md) [Desktop scheduled tasks](https://code.claude.com/docs/en/desktop-scheduled-tasks) · [Announcement](https://x.com/noahzweben/status/2036129220959805859) |
| [**Routines**](https://code.claude.com/docs/en/routines) ![beta](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/beta.svg) | `claude.ai/code/routines`, `/schedule` | [Desktop Tasks](https://code.claude.com/docs/en/desktop-scheduled-tasks) |
| [**Tasks**](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/reports/claude-global-vs-project-settings.md#tasks-system) | `/tasks`, `~/.claude/tasks/` | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/reports/claude-global-vs-project-settings.md) [Ultrareview tracking](https://code.claude.com/docs/en/ultrareview#track-a-running-review) |
| [**Goal**](https://code.claude.com/docs/en/goal) | `/goal <condition>`, `/goal clear` | [![Implemented](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/implemented.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/lib/09-harness/claude-code-best-practice/implementation-claude-goal-implementation/README.md) |
| [**Voice Dictation**](https://code.claude.com/docs/en/voice-dictation) | `/voice` | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://x.com/trq212/status/2028628570692890800) |
| [**Bundled Skills**](https://code.claude.com/docs/en/skills#bundled-skills) | `/code-review`, `/batch` | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://x.com/bcherny/status/2027534984534544489) |
| [**Git Worktrees**](https://code.claude.com/docs/en/worktrees) | `--worktree`/`-w`, `.worktreeinclude`, `EnterWorktree`/`ExitWorktree`, `isolation: "worktree"`, `WorktreeCreate`/`WorktreeRemove` hooks | [![Best Practice](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/best-practice.svg)](https://x.com/bcherny/status/2025007393290272904) |

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/claude-jumping.svg" alt="section divider" width="60" height="50">

## <a href="https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/orchestration-workflow/orchestration-workflow.md"><img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/orchestration-workflow-hd.svg" alt="Orchestration Workflow"></a>

See [orchestration-workflow](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/orchestration-workflow/orchestration-workflow.md) for implementation details of <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/c.svg" height="14"> **Command** → <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/a.svg" height="14"> **Agent** → <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/s.svg" height="14"> **Skill** pattern.

<div class="tb-zh"><p>提示：先看「如何使用」一节，才能把这个仓库用到位。</p></div>

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/orchestration-workflow/orchestration-workflow.svg" alt="Command Skill Agent Architecture Flow" width="100%">

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/orchestration-workflow/orchestration-workflow.gif" alt="Orchestration Workflow Demo" width="600">

![How to Use](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/how-to-use.svg)

```bash
claude
/weather-orchestrator
```

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/claude-jumping.svg" alt="section divider" width="60" height="50">

## ⚙️ DEVELOPMENT WORKFLOWS

All major workflows converge on the same architectural pattern: **Research → Plan → Execute → Review → Ship**

<div class="tb-zh"><p>Command → Agent → Skill 这一模式的实现细节，见 orchestration-workflow。</p></div>

| Name | ★ | Workflow | <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/a.svg" height="14"> | <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/c.svg" height="14"> | <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/s.svg" height="14"> |
|------|---|----------|---|---|---|
| [Superpowers](https://github.com/obra/superpowers) | 284k |  →  →  →  →  →  →  →  →  →  | 0 | 0 | 14 |
| [Matt Pocock Skills](https://github.com/mattpocock/skills) | 258k |  →  →  →  →  →  →  | 0 | 0 | 37 |
| [Everything Claude Code](https://github.com/affaan-m/ECC) | 255k |  →  →  →  →  →  →  →  →  | 68 | 94 | 286 |
| [Spec Kit](https://github.com/github/spec-kit) | 134k |  →  →  →  →  →  | 0 | 10 | 0 |
| [gstack](https://github.com/garrytan/gstack) | 132k |  →  →  →  →  →  →  →  →  →  | 0 | 0 | 58 |
| [agent-skills](https://github.com/addyosmani/agent-skills) | 89k |  →  →  →  →  →  | 3 | 7 | 21 |
| [OpenSpec](https://github.com/Fission-AI/OpenSpec) | 67.8k |  →  →  →  | 0 | 12 | 12 |
| [Get Shit Done](https://github.com/gsd-build/get-shit-done) | 64.6k |  →  →  →  →  →  →  →  | 33 | 85 | 0 |
| [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) | 52.8k |  →  →  →  →  →  →  →  | 5 | 0 | 29 |
| [oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode) | 39.1k |  →  →  →  →  →  →  | 19 | 0 | 37 |
| [Compound Engineering](https://github.com/EveryInc/compound-engineering-plugin) | 25k |  →  →  →  →  →  | 0 | 1 | 33 |
| [HumanLayer](https://github.com/humanlayer/humanlayer) | 11.5k |  →  →  →  →  →  →  →  | 6 | 27 | 0 |

> *Note: yellow tags are sub-loops — steps that repeat inside a parent step (e.g. per task, per story, or until a verify condition passes).*

<div class="tb-zh"><p>所有主流工作流最终都收敛到同一套架构模式：调研 → 规划 → 执行 → 评审 → 交付。</p></div>

### Others
- [RPI](/lib/09-harness/claude-code-best-practice/development-workflows-rpi-rpi-workflow) [![Implemented](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/implemented.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/lib/09-harness/claude-code-best-practice/development-workflows-rpi-rpi-workflow/README.md)
- [Ralph Wiggum Loop](https://www.youtube.com/watch?v=eAtvoGlpeRU) [![Implemented](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/implemented.svg)](https://github.com/shanraisshan/ralph-wiggum-self-evolving-loop)
- [Andrej Karpathy (Founding Member, OpenAI) Workflow](https://x.com/karpathy/status/2015883857489522876)
- [Peter Steinberger (Creator of OpenClaw) Workflow](https://youtu.be/8lF7HmQ_RgY?t=2582)
- Boris Cherny (Creator of Claude Code) Workflow — [13 Tips](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-13-tips-03-jan-26.md) · [10 Tips](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-10-tips-01-feb-26.md) · [12 Tips](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-12-tips-12-feb-26.md) · [2 Tips](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-2-tips-25-mar-26.md) · [15 Tips](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-15-tips-30-mar-26.md) · [6 Tips](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-6-tips-16-apr-26.md) [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny)
- Thariq (Anthropic) Workflow — [Skills](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-thariq-tips-17-mar-26.md) · [Session Management](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-thariq-tips-16-apr-26.md) [![Thariq](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/thariq.svg)](https://x.com/trq212)

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/claude-jumping.svg" alt="section divider" width="60" height="50">

## 🔀 CROSS-MODEL WORKFLOWS

Use Claude Code together with other models — Codex, Gemini, GPT, Kimi, DeepSeek, local — via three mechanisms:

<div class="tb-zh"><p>注：黄色标签表示子循环——在父步骤内部反复执行的步骤（例如每个任务、每个 story 各走一遍，或直到某项校验条件通过）。</p></div>

- **Plugin** — another model's CLI runs inside Claude Code (slash commands like `/codex:review`)
- **MCP** — Claude Code calls another model as a tool through Model Context Protocol
- **Router** — Claude Code's API endpoint is swapped to a different provider

<div class="tb-zh"><p>让 Claude Code 与其他模型协作——Codex、Gemini、GPT、Kimi、DeepSeek、本地模型——共有三种机制：</p></div>

Methodology: [Cross-Model (Claude Code + Codex) Workflow](/lib/09-harness/claude-code-best-practice/development-workflows-cross-model-workflow-cross-model-workflow) [![Implemented](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/implemented.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/lib/09-harness/claude-code-best-practice/development-workflows-cross-model-workflow-cross-model-workflow/README.md) — manual two-terminal flow with Plan in Claude, QA-Review in Codex.

<div class="tb-zh"><p>插件：把别的模型 CLI 跑在 Claude Code 里面（如 /codex:review 这类斜杠命令）；MCP：Claude Code 通过 Model Context Protocol 把另一个模型当作工具来调用；路由器：把 Claude Code 的 API 端点整体换成别的供应商。</p></div>

| Name | ★ | Type | Bridges to | What it does |
|------|---|------|------------|--------------|
| [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router) | 34k | Router | OpenRouter, DeepSeek, Ollama, Gemini, Kimi, Qwen, Groq, +more | Routes Claude Code's API to any compatible provider, with per-task model selection |
| [router-for-me/CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) | 32k | Router | Gemini CLI, Codex, Claude Code, Antigravity | Wraps each CLI as an OpenAI/Gemini/Claude/Codex-compatible API service |
| [openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc) | 18k | Plugin | Codex / GPT-5 | Official OpenAI plugin: `/codex:review`, `/codex:adversarial-review`, `/codex:rescue` inside Claude Code |
| [BeehiveInnovations/pal-mcp-server](https://github.com/BeehiveInnovations/pal-mcp-server) | 12k | MCP | Gemini, OpenAI, Azure, Grok, Ollama, OpenRouter (50+ models) | Multi-model MCP server (formerly `zen-mcp-server`) — call other models as Claude tools |

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/claude-jumping.svg" alt="section divider" width="60" height="50">

## 🧰 SKILL COLLECTIONS

Repos primarily known as curated libraries of `SKILL.md` files (distinct from full workflow methodologies above). Sorted by stars descending.

<div class="tb-zh"><p>方法论：跨模型（Claude Code + Codex）工作流——手动开两个终端，在 Claude 里做规划，在 Codex 里做质量评审。</p></div>

| Name | ★ | <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/s.svg" height="14"> |
|------|---|---|
| [mattpocock/skills](https://github.com/mattpocock/skills) | 244k | 37 |
| [anthropics/skills](https://github.com/anthropics/skills) | 173k | 19 |
| [Egonex-AI/Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) | 67k | 8 |
| [scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | 42k | 165 |
| [wshobson/agents](https://github.com/wshobson/agents) | 39k | 170 |
| [awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | 34k | 1,497+ (curated list) |
| [impeccable](https://github.com/pbakaus/impeccable) | 27k | 1 (with 7 design domain references) |
| [agent-skills](https://github.com/addyosmani/agent-skills) | 27k | 21 |
| [claude-skills](https://github.com/alirezarezvani/claude-skills) | 15k | 246 (across 9 domains) |
| [shanraisshan/draw-json-architecture-skill](https://github.com/shanraisshan/draw-json-architecture-skill) | 3 | 1 |

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/claude-jumping.svg" alt="section divider" width="60" height="50">

## 🤖 AGENT COLLECTIONS

Repos primarily known as curated libraries of subagent definitions (`.claude/agents/*.md`). Sorted by stars descending.

<div class="tb-zh"><p>以收录 SKILL.md 文件为主的精选仓库（区别于上文那些完整的工作流方法论），按 star 数从高到低排列。</p></div>

| Name | ★ | <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/a.svg" height="14"> |
|------|---|---|
| [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) | 151k | 273 |
| [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | 25k | 158 |

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/claude-jumping.svg" alt="section divider" width="60" height="50">

## 💡 TIPS AND TRICKS (83)

🚫👶 = do not babysit

<div class="tb-zh"><p>以收录子代理定义（.claude/agents/*.md）为主的精选仓库，按 star 数从高到低排列。</p></div>

[Prompting](#tips-prompting) · [Planning](#tips-planning) · [Context](#tips-context) · [Session](#tips-session) · [CLAUDE.md + .claude/rules](#tips-claudemd) · [Agents](#tips-agents) · [Commands](#tips-commands) · [Skills](#tips-skills) · [Hooks](#tips-hooks) · [Workflows](#tips-workflows) · [Advanced](#tips-workflows-advanced) · [Git / PR](#tips-git-pr) · [Debugging](#tips-debugging) · [Utilities](#tips-utilities) · [Daily](#tips-daily)

<div class="tb-zh"><p>🚫👶 表示不必盯着它做。</p></div>

![Community](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community.svg)

<a id="tips-prompting"></a>■ **Prompting (3)**

| Tip | Source |
|-----|--------|
| challenge Claude — "grill me on these changes and don't make a PR until I pass your test." or "prove to me this works" and have Claude diff between main and your branch 🚫👶 | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2017742752566632544) |
| after a mediocre fix — "knowing everything you know now, scrap this and implement the elegant solution" 🚫👶 | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2017742752566632544) |
| Claude fixes most bugs by itself — paste the bug, say "fix", don't micromanage how 🚫👶 | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2017742750473720121) |

<a id="tips-planning"></a>■ **Planning/Specs (7)**

| Tip | Source |
|-----|--------|
| always start with [plan mode](https://code.claude.com/docs/en/common-workflows) | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2007179845336527000) |
| start with a minimal spec or prompt and ask Claude to interview you using [AskUserQuestion](https://code.claude.com/docs/en/cli-reference) tool, then make a new session to execute the spec | [![Thariq](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/thariq.svg)](https://x.com/trq212/status/2005315275026260309) |
| always make a phase-wise gated plan, with each phase having multiple tests (unit, automation, integration) | [![Dex](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community-dex.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/claude-dex-mlops-community-24-mar-26.md) [![Video](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/video.svg)](https://youtu.be/YwZR6tc7qYg?t=1032) |
| break PRDs into vertical slices (tracer bullets) that cross all layers (DB + service + UI) — AI defaults to horizontal phasing (DB phase, then API phase, then frontend phase) which delays end-to-end feedback until the last phase. From the Pragmatic Programmer 🚫👶 | [![Matt](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community-matt.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/claude-matt-pocock-24-apr-26.md) [![Video](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/video.svg)](https://youtu.be/-QFHIoCo-Ko) |
| spin up a second Claude to review your plan as a staff engineer, or use [cross-model](/lib/09-harness/claude-code-best-practice/development-workflows-cross-model-workflow-cross-model-workflow) for review | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2017742745365057733) |
| write detailed specs and reduce ambiguity before handing work off — the more specific you are, the better the output | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2017742752566632544) |
| prototype > PRD — build 20-30 versions instead of writing specs, the cost of building is low so take many shots | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://youtu.be/julbw1JuAz0?t=3630) [![Video](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/video.svg)](https://youtu.be/julbw1JuAz0?t=3630) |

<a id="tips-context"></a>■ **Context (5)**

| Tip | Source |
|-----|--------|
| context rot kicks in around ~300-400k tokens on the 1M context model — don't let sessions drift past that for intelligence-sensitive work | [![Thariq](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/thariq.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-thariq-tips-16-apr-26.md) |
| dumb zone kicks in around ~40% context — "you hit this point where you have degrading results". Newcomers: "shoot to keep it under 40%, and if you get up to 60%, think about wrapping it up". Experienced: "aggressively keep it below 30%" — push to 60% only on simple tasks. Manual [/compact](https://code.claude.com/docs/en/interactive-mode) or [/clear](https://code.claude.com/docs/en/cli-reference) to reset when switching tasks | [![Dex](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community-dex.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/claude-dex-mlops-community-24-mar-26.md) [![Video](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/video.svg)](https://youtu.be/YwZR6tc7qYg?t=1541) |
| rewind > correct — double-Esc or [/rewind](https://code.claude.com/docs/en/checkpointing) back to before the failed attempt and re-prompt with what you learned, instead of leaving failed attempts + corrections polluting context 🚫👶 | [![Thariq](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/thariq.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-thariq-tips-16-apr-26.md) |
| [/compact](https://code.claude.com/docs/en/interactive-mode) with a hint (/compact focus on the auth refactor, drop the test debugging) beats letting autocompact fire — the model is at its least intelligent point when auto-compacting due to context rot | [![Thariq](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/thariq.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-thariq-tips-16-apr-26.md) |
| use subagents for context management — ask yourself "will I need this tool output again, or just the conclusion?" — 20 file reads + 12 greps + 3 dead ends stay in the child's context, only the final report returns 🚫👶 | [![Thariq](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/thariq.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-thariq-tips-16-apr-26.md) |

<a id="tips-session"></a>■ **Session Management (6)**

| Tip | Source |
|-----|--------|
| every turn is a branching point — after Claude ends a turn, pick between Continue, /rewind, /clear, /compact, or Subagent based on how much existing context you need to carry forward | [![Thariq](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/thariq.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-thariq-tips-16-apr-26.md) |
| new task = new session — related tasks (e.g. writing docs for what you just built) can reuse context for efficiency, but genuinely new tasks deserve a fresh session | [![Thariq](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/thariq.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-thariq-tips-16-apr-26.md) |
| use "summarize from here" before rewinding to have Claude write a handoff message — like a note to the previous iteration of Claude from its future self | [![Thariq](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/thariq.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-thariq-tips-16-apr-26.md) |
| /compact vs /clear — compact is lossy but momentum-friendly (mid-task, fuzzy details ok); /clear + brief is more work but you control exactly what carries forward (high-stakes next step) | [![Thariq](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/thariq.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-thariq-tips-16-apr-26.md) |
| use recaps for long-running sessions — short summaries of what Claude did and what's next, useful when returning after minutes or hours. Disable with recaps in /config | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-6-tips-16-apr-26.md) |
| [/rename](https://code.claude.com/docs/en/cli-reference) important sessions (e.g. [TODO - refactor task]) and [/resume](https://code.claude.com/docs/en/cli-reference) them later — label each instance when running multiple Claudes simultaneously | [![Cat](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/cat-wu.svg)](https://every.to/podcast/how-to-use-claude-code-like-the-people-who-built-it) |

<a id="tips-claudemd"></a>■ **CLAUDE.md + .claude/rules (8)**

| Tip | Source |
|-----|--------|
| [CLAUDE.md](https://code.claude.com/docs/en/memory) should target under [200 lines](https://code.claude.com/docs/en/memory#write-effective-instructions) per file. [60 lines in humanlayer](https://www.humanlayer.dev/blog/writing-a-good-claude-md) ([still not 100% guaranteed](https://www.reddit.com/r/ClaudeCode/comments/1qn9pb9/claudemd_says_must_use_agent_claude_ignores_it_80/)) | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2007179840848597422) [![Dex](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community-dex.svg)](https://www.humanlayer.dev/blog/writing-a-good-claude-md) |
| .claude/rules/*.md auto-load into every session like CLAUDE.md — add paths: YAML frontmatter to lazy-load them only when Claude touches files matching the glob | [![Claude](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/claude.svg)](https://code.claude.com/docs/en/memory#organize-rules-with-clauderules) |
| wrap domain-specific CLAUDE.md rules in [\&lt;important if="..."\> tags](https://www.hlyr.dev/blog/stop-claude-from-ignoring-your-claude-md) to stop Claude from ignoring them as files grow longer | [![Dex](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community-dex.svg)](https://www.hlyr.dev/blog/stop-claude-from-ignoring-your-claude-md) |
| use [multiple CLAUDE.md](/lib/09-harness/claude-code-best-practice/best-practice-claude-memory) for monorepos — ancestor + descendant loading | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2016339448863355206) |
| use [.claude/rules/](https://code.claude.com/docs/en/memory#organize-rules-with-clauderules) to split large instructions | [![Claude](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/claude.svg)](https://code.claude.com/docs/en/memory#organize-rules-with-clauderules) |
| any developer should be able to launch Claude, say "run the tests" and it works on the first try — if it doesn't, your CLAUDE.md is missing essential setup/build/test commands | [![Dex](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community-dex.svg)](https://x.com/dexhorthy/status/2034713765401551053) |
| keep codebases clean and finish migrations — partially migrated frameworks confuse models that might pick the wrong pattern | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://youtu.be/julbw1JuAz0?t=1112) [![Video](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/video.svg)](https://youtu.be/julbw1JuAz0?t=1112) |
| use [settings.json](/lib/09-harness/claude-code-best-practice/best-practice-claude-settings) for harness-enforced behavior (attribution, permissions, model) — don't put "NEVER add Co-Authored-By" in CLAUDE.md when attribution.commit: "" is deterministic | [![davila7](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community-davila7.svg)](https://x.com/dani_avila7/status/2036182734310195550) |

<a id="tips-agents"></a><img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/a.svg" height="14"> **Agents (4)**

| Tip | Source |
|-----|--------|
| have feature specific [sub-agents](https://code.claude.com/docs/en/sub-agents) (extra context) with [skills](https://code.claude.com/docs/en/skills) (progressive disclosure) instead of general qa, backend engineer | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2007179850139000872) |
| say "use subagents" to throw more compute at a problem — offload tasks to keep your main context clean and focused 🚫👶 | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2017742755737555434) |
| [agent teams with tmux](https://code.claude.com/docs/en/agent-teams) and [git worktrees](https://x.com/bcherny/status/2025007393290272904) for parallel development | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2025007393290272904) |
| use [test time compute](https://code.claude.com/docs/en/sub-agents) — separate context windows make results better; one agent can cause bugs and another (same model) can find them | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2031151689219321886) |

<a id="tips-commands"></a><img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/c.svg" height="14"> **Commands (3)**

| Tip | Source |
|-----|--------|
| use [commands](https://code.claude.com/docs/en/skills) for your workflows instead of [sub-agents](https://code.claude.com/docs/en/sub-agents) | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2007179847949500714) |
| use [slash commands](https://code.claude.com/docs/en/skills) for every "inner loop" workflow you do many times a day — saves repeated prompting, commands live in .claude/commands/ and are checked into git | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2007179847949500714) |
| if you do something more than once a day, turn it into a [skill](https://code.claude.com/docs/en/skills) or [command](https://code.claude.com/docs/en/skills) — build /techdebt, context-dump, or analytics commands | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2017742748984742078) |

<a id="tips-skills"></a><img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/s.svg" height="14"> **Skills (9)**

| Tip | Source |
|-----|--------|
| use [context: fork](https://code.claude.com/docs/en/skills) to run a skill in an isolated subagent — main context only sees the final result, not intermediate tool calls. The agent field lets you set the subagent type | [![Lydia](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/lydia.svg)](https://x.com/lydiahallie/status/2033603164398883042) |
| use [skills in subfolders](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/reports/claude-skills-for-larger-mono-repos.md) for monorepos | [![Claude](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/claude.svg)](https://code.claude.com/docs/en/skills) |
| skills are folders, not files — use references/, scripts/, examples/ subdirectories for [progressive disclosure](https://code.claude.com/docs/en/skills) | [![Thariq](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/thariq.svg)](https://x.com/trq212/status/2033949937936085378) |
| build a Gotchas section in every skill — highest-signal content, add Claude's failure points over time | [![Thariq](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/thariq.svg)](https://x.com/trq212/status/2033949937936085378) |
| skill description field is a trigger, not a summary — write it for the model ("when should I fire?") | [![Thariq](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/thariq.svg)](https://x.com/trq212/status/2033949937936085378) |
| don't state the obvious in skills — focus on what pushes Claude out of its default behavior 🚫👶 | [![Thariq](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/thariq.svg)](https://x.com/trq212/status/2033949937936085378) |
| don't railroad Claude in skills — give goals and constraints, not prescriptive step-by-step instructions 🚫👶 | [![Thariq](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/thariq.svg)](https://x.com/trq212/status/2033949937936085378) |
| include scripts and libraries in skills so Claude composes rather than reconstructs boilerplate | [![Thariq](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/thariq.svg)](https://x.com/trq212/status/2033949937936085378) |
| embed !command in SKILL.md to inject dynamic shell output into the prompt — Claude runs it on invocation and the model only sees the result | [![Lydia](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/lydia.svg)](https://x.com/lydiahallie/status/2034337963820327017) |

<a id="tips-hooks"></a>■ **Hooks (5)**

| Tip | Source |
|-----|--------|
| use [on-demand hooks](https://code.claude.com/docs/en/skills) in skills — /careful blocks destructive commands, /freeze blocks edits outside a directory | [![Thariq](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/thariq.svg)](https://x.com/trq212/status/2033949937936085378) |
| [measure skill usage](https://code.claude.com/docs/en/skills) with a PreToolUse hook to find popular or undertriggering skills | [![Thariq](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/thariq.svg)](https://x.com/trq212/status/2033949937936085378) |
| use a [PostToolUse hook](https://code.claude.com/docs/en/hooks) to auto-format code — Claude generates well-formatted code, the hook handles the last 10% to avoid CI failures | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2007179852047335529) |
| route [permission requests](https://code.claude.com/docs/en/hooks) to Opus via a hook — let it scan for attacks and auto-approve safe ones 🚫👶 | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2017742755737555434) |
| use a [Stop hook](https://code.claude.com/docs/en/hooks) to nudge Claude to keep going or verify its work at the end of a turn | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2021701059253874861) |

<a id="tips-workflows"></a>■ **Workflows (5)**

| Tip | Source |
|-----|--------|
| use [/model](https://code.claude.com/docs/en/model-config) to select model and reasoning, [/context](https://code.claude.com/docs/en/interactive-mode) to see context usage, [/usage](https://code.claude.com/docs/en/costs) to check plan limits, [/extra-usage](https://code.claude.com/docs/en/interactive-mode) to configure overflow billing, [/config](https://code.claude.com/docs/en/settings) to configure settings — use Opus for plan mode and Sonnet for code to get the best of both | [![Cat](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/cat-wu.svg)](https://x.com/_catwu/status/1955694117264261609) |
| always use [thinking mode](https://code.claude.com/docs/en/model-config) true (to see reasoning) and [Output Style](https://code.claude.com/docs/en/output-styles) Explanatory (to see detailed output with ★ Insight boxes) in [/config](https://code.claude.com/docs/en/settings) for better understanding of Claude's decisions | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2007179838864666847) |
| use ultrathink keyword in prompts for [high effort reasoning](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking#tips-and-best-practices) | [![Claude](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/claude.svg)](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking#tips-and-best-practices) |
| /focus mode hides all intermediate work and shows only the final result — trust the model to run the right commands and just look at the outcome (toggle with /focus) | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-6-tips-16-apr-26.md) |
| tune effort level with Opus 4.7's adaptive thinking — low for speed and fewer tokens, max for most intelligence (slider: low · medium · high · xhigh · max) | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-6-tips-16-apr-26.md) |

<a id="tips-workflows-advanced"></a>■ **Workflows Advanced (9)**

| Tip | Source |
|-----|--------|
| use ASCII diagrams a lot to understand your architecture | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2017742759218794768) |
| use [/loop](https://code.claude.com/docs/en/scheduled-tasks) for local recurring monitoring (up to 7 days) · use [/schedule](https://code.claude.com/docs/en/routines) for cloud-based recurring tasks that run even when your machine is off | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2038454341884154269) |
| use [Ralph Wiggum plugin](https://github.com/shanraisshan/ralph-wiggum-self-evolving-loop) for long-running autonomous tasks | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2007179858435281082) |
| [/permissions](https://code.claude.com/docs/en/permissions) with wildcard syntax (Bash(npm run *), Edit(/docs/**)) instead of dangerously-skip-permissions | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2007179854077407667) |
| [/sandbox](https://code.claude.com/docs/en/sandboxing) to reduce permission prompts with file and network isolation — 84% reduction internally | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2021700506465579443) [![Cat](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/cat-wu.svg)](https://creatoreconomy.so/p/inside-claude-code-how-an-ai-native-actually-works-cat-wu) |
| invest in [product verification](https://code.claude.com/docs/en/skills) skills (signup-flow-driver, checkout-verifier) — worth spending a week to perfect | [![Thariq](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/thariq.svg)](https://x.com/trq212/status/2033949937936085378) |
| use [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) instead of dangerously-skip-permissions — a model-based classifier decides if each command is safe and auto-approves, pauses and asks if risky. Shift+Tab to cycle Ask → Plan → Auto modes 🚫👶 | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-6-tips-16-apr-26.md) |
| use /less-permission-prompts skill to scan session history for safe bash/MCP commands that repeatedly prompt, then get a recommended allowlist to paste into [settings](/lib/09-harness/claude-code-best-practice/best-practice-claude-settings) | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-6-tips-16-apr-26.md) |
| build a /go skill that (1) tests end-to-end via bash/browser/computer use (2) runs /simplify (3) puts up a PR — so when you come back, you know the code works 🚫👶 | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-6-tips-16-apr-26.md) |

<a id="tips-git-pr"></a>■ **Git / PR (5)**

| Tip | Source |
|-----|--------|
| keep PRs small and focused — [p50 of 118 lines](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-2-tips-25-mar-26.md) (141 PRs, 45K lines changed in a day), one feature per PR, easier to review and revert | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2038552880018538749) |
| always [squash merge](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-2-tips-25-mar-26.md) PRs — clean linear history, one commit per feature, easy git revert and git bisect | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2038552880018538749) |
| commit often — try to commit at least once per hour, as soon as task is completed, commit | ![Shayan](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community-shayan.svg) |
| tag [@claude](https://github.com/apps/claude) on a coworker's PR to auto-generate lint rules for recurring review feedback — automate yourself out of code review 🚫👶 | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://youtu.be/julbw1JuAz0?t=2715) [![Video](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/video.svg)](https://youtu.be/julbw1JuAz0?t=2715) |
| use [/code-review](https://code.claude.com/docs/en/code-review) for multi-agent PR analysis — catches bugs, security vulnerabilities, and regressions before merge | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2031089411820228645) |

<a id="tips-debugging"></a>■ **Debugging (6)**

| Tip | Source |
|-----|--------|
| make it a habit to take screenshots and share with Claude whenever you are stuck with any issue | ![Shayan](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community-shayan.svg) |
| use mcp ([Claude in Chrome](https://code.claude.com/docs/en/chrome), [Playwright](https://github.com/microsoft/playwright-mcp), [Chrome DevTools](https://developer.chrome.com/blog/chrome-devtools-mcp)) to let claude see chrome console logs on its own | [![Claude](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/claude.svg)](https://code.claude.com/docs/en/chrome) |
| always ask claude to run the terminal (you want to see logs of) as a background task for better debugging | ![Shayan](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community-shayan.svg) |
| [/doctor](https://code.claude.com/docs/en/cli-reference) to diagnose installation, authentication, and configuration issues | ![Shayan](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community-shayan.svg) |
| use a [cross-model](/lib/09-harness/claude-code-best-practice/development-workflows-cross-model-workflow-cross-model-workflow) for QA — e.g. [Codex](https://github.com/shanraisshan/codex-cli-best-practice) for plan and implementation review | ![Shayan](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community-shayan.svg) |
| agentic search (glob + grep) beats RAG — Claude Code tried and discarded vector databases because code drifts out of sync and permissions are complex | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://youtu.be/julbw1JuAz0?t=3095) [![Video](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/video.svg)](https://youtu.be/julbw1JuAz0?t=3095) |

<a id="tips-utilities"></a>■ **Utilities (5)**

| Tip | Source |
|-----|--------|
| [iTerm](https://iterm2.com/)/[Ghostty](https://ghostty.org/)/[tmux](https://github.com/tmux/tmux) terminals instead of IDE ([VS Code](https://code.visualstudio.com/)/[Cursor](https://www.cursor.com/)) | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2017742753971769626) |
| [/voice](https://code.claude.com/docs/en/voice-dictation) or [Wispr Flow](https://wisprflow.ai) for voice prompting (10x productivity) | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2038454362226467112) |
| [claude-code-hooks](https://github.com/shanraisshan/claude-code-hooks) for claude feedback | ![Shayan](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community-shayan.svg) |
| [status line](https://github.com/shanraisshan/claude-code-status-line) for context awareness and fast compacting | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2021700784019452195) ![Shayan](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community-shayan.svg) |
| explore [settings.json](/lib/09-harness/claude-code-best-practice/best-practice-claude-settings) features like [Plans Directory](/lib/09-harness/claude-code-best-practice/best-practice-claude-settings#plans-directory), [Spinner Verbs](/lib/09-harness/claude-code-best-practice/best-practice-claude-settings#display--ux) for a personalized experience | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2021701145023197516) |

<a id="tips-daily"></a>■ **Daily (2)**

| Tip | Source |
|-----|--------|
| [update](https://code.claude.com/docs/en/setup) Claude Code daily | ![Shayan](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community-shayan.svg) |
| start your day by reading the [changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md) | ![Shayan](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community-shayan.svg) |

![Boris Cherny + Team](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/claude.svg)

| Article / Tweet | Source |
|-----------------|--------|
| [6 Tips for Getting More Out of Opus 4.7 (Boris) \| 16/Apr/26](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-6-tips-16-apr-26.md) | [Tweet](https://x.com/bcherny) |
| [Session Management & 1M Context (Thariq) \| 16/Apr/26](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-thariq-tips-16-apr-26.md) | [Tweet](https://x.com/trq212) |
| [15 Hidden & Under-Utilized Features in Claude Code (Boris) \| 30/Mar/26](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-15-tips-30-mar-26.md) | [Tweet](https://x.com/bcherny/status/2038454336355999749) |
| [Squash Merging & PR Size Distribution (Boris) \| 25/Mar/26](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-2-tips-25-mar-26.md) | [Tweet](https://x.com/bcherny/status/2038552880018538749) |
| [Lessons from Building Claude Code: How We Use Skills (Thariq) \| 17/Mar/26](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-thariq-tips-17-mar-26.md) | [Article](https://x.com/trq212/status/2033949937936085378) |
| [Code Review & Test Time Compute (Boris) \| 10/Mar/26](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-2-tips-10-mar-26.md) | [Tweet](https://x.com/bcherny/status/2031089411820228645) |
| /loop — schedule recurring tasks for up to 3 days (Boris) \| 07 Mar 2026 | [Tweet](https://x.com/bcherny/status/2030193932404150413) |
| AskUserQuestion + ASCII Markdowns (Thariq) \| 28 Feb 2026 | [Tweet](https://x.com/trq212/status/2027543858289250472) |
| Seeing like an Agent - lessons from building Claude Code (Thariq) \| 28 Feb 2026 | [Article](https://x.com/trq212/status/2027463795355095314) |
| Git Worktrees - 5 ways how boris is using \| 21 Feb 2026 | [Tweet](https://x.com/bcherny/status/2025007393290272904) |
| Lessons from Building Claude Code: Prompt Caching Is Everything (Thariq) \| 20 Feb 2026 | [Article](https://x.com/trq212/status/2024574133011673516) |
| [12 ways how people are customizing their claudes (Boris) \| 12/Feb/26](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-12-tips-12-feb-26.md) | [Tweet](https://x.com/bcherny/status/2021699851499798911) |
| [10 tips for using Claude Code from the team (Boris) \| 01/Feb/26](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-10-tips-01-feb-26.md) | [Tweet](https://x.com/bcherny/status/2017742741636321619) |
| [How I use Claude Code — 13 tips from my surprisingly vanilla setup (Boris) \| 03/Jan/26](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-13-tips-03-jan-26.md) | [Tweet](https://x.com/bcherny/status/2007179832300581177) |
| Ask Claude to interview you using AskUserQuestion tool (Thariq) \| 28/Dec/25 | [Tweet](https://x.com/trq212/status/2005315275026260309) |
| Always use plan mode, give Claude a way to verify, use /code-review (Boris) \| 27/Dec/25 | [Tweet](https://x.com/bcherny/status/2004711722926616680) |

#### Tips from Claude code CLI binary

[Spinner Verbs & Tips (extracted from CLI binary v2.1.121)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/reports/claude-spinner-verbs-and-tips.md)

<div class="tb-zh"><p>快速跳转：提示词 · 规划 · 上下文 · 会话 · CLAUDE.md 与 .claude/rules · Agents · Commands · Skills · Hooks · 工作流 · 进阶 · Git / PR · 调试 · 实用工具 · 日常。</p></div>

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/claude-jumping.svg" alt="section divider" width="60" height="50">

## 🎬 VIDEOS / PODCASTS

| Video / Podcast | Source | YouTube |
|-----------------|--------|--------|
| From Vibe Coding to Agentic Engineering (Andrej) \| 02 May 2026 \| AI Engineer | [![Karpathy](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community-karpathy.svg)](https://x.com/karpathy) | [YouTube](https://www.youtube.com/watch?v=96jN2OCOfLs) |
| Full Walkthrough: Workflow for AI Coding (Matt) \| 24 Apr 2026 \| Matt Pocock | [![Matt](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community-matt.svg)](https://x.com/mattpocockuk) | [YouTube](https://youtu.be/-QFHIoCo-Ko) |
| Everything We Got Wrong About Research-Plan-Implement (Dex) \| 24 Mar 2026 \| MLOps Community | [![Dex](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community-dex.svg)](https://x.com/daborhyde) | [YouTube](https://youtu.be/YwZR6tc7qYg) |
| Building Claude Code with Boris Cherny (Boris) \| 04 Mar 2026 \| The Pragmatic Engineer | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny) | [YouTube](https://youtu.be/julbw1JuAz0) |
| Head of Claude Code: What happens after coding is solved (Boris) \| 19 Feb 2026 \| Lenny's Podcast | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny) | [YouTube](https://youtu.be/We7BZVKbCVw) |
| Inside Claude Code With Its Creator Boris Cherny (Boris) \| 17 Feb 2026 \| Y Combinator | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny) | [YouTube](https://youtu.be/PQU9o_5rHC4) |
| Boris Cherny (Creator of Claude Code) On What Grew His Career (Boris) \| 15 Dec 2025 \| Ryan Peterman | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny) | [YouTube](https://youtu.be/AmdLVWMdjOk) |
| The Secrets of Claude Code From the Engineers Who Built It (Cat) \| 29 Oct 2025 \| Every | [![Boris](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/boris-cherny.svg)](https://x.com/bcherny) | [YouTube](https://youtu.be/IDSAMqip6ms) |

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/claude-jumping.svg" alt="section divider" width="60" height="50">

## 🔔 SUBSCRIBE

| Source | Name | Badge |
|--------|------|-------|
|  | [r/ClaudeAI](https://www.reddit.com/r/ClaudeAI/), [r/ClaudeCode](https://www.reddit.com/r/ClaudeCode/), [r/Anthropic](https://www.reddit.com/r/Anthropic/) | ![Boris + Team](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/claude.svg) |
|  | [Claude](https://x.com/claudeai), [Claude Devs](https://x.com/ClaudeDevs), [Anthropic](https://x.com/AnthropicAI), [Boris](https://x.com/bcherny), [Thariq](https://x.com/trq212), [Cat](https://x.com/_catwu), [Lydia](https://x.com/lydiahallie), [Noah](https://x.com/noahzweben), [Anthony](https://x.com/amorriscode), [Alex](https://x.com/alexalbert__), [Kenneth](https://x.com/neilhtennek) | ![Boris + Team](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/claude.svg) |
|  | [Jesse Kriss](https://x.com/obra) ([Superpowers](https://github.com/obra/superpowers)), [Affaan Mustafa](https://x.com/affaanmustafa) ([ECC](https://github.com/affaan-m/everything-claude-code)), [Garry Tan](https://x.com/garrytan) ([gstack](https://github.com/garrytan/gstack)), [Dex Horthy](https://x.com/dexhorthy) ([HumanLayer](https://github.com/humanlayer/humanlayer)), [Kieran Klaassen](https://x.com/kieranklaassen) ([Compound Eng](https://github.com/EveryInc/compound-engineering-plugin)), [Tabish Gilani](https://x.com/0xTab) ([OpenSpec](https://github.com/Fission-AI/OpenSpec)), [Brian McAdams](https://x.com/BMadCode) ([BMAD](https://github.com/bmad-code-org/BMAD-METHOD)), [Lex Christopherson](https://x.com/official_taches) ([GSD](https://github.com/gsd-build/get-shit-done)), [Matt Pocock](https://x.com/mattpocockuk) ([Skills](https://github.com/mattpocock/skills)), [Dani Avila](https://x.com/dani_avila7) ([CC Templates](https://github.com/davila7/claude-code-templates)), [Dan Shipper](https://x.com/danshipper) ([Every](https://every.to/)), [Andrej Karpathy](https://x.com/karpathy) ([AutoResearch](https://x.com/karpathy/status/2015883857489522876)), [Peter Steinberger](https://x.com/steipete) ([OpenClaw](https://x.com/openclaw)), [Sigrid Jin](https://x.com/realsigridjin) ([claw-code](https://github.com/ultraworkers/claw-code)), [Yeachan Heo](https://x.com/bellman_ych) ([oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode)) | ![Community](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community.svg) |
|  | [Anthropic](https://www.youtube.com/@anthropic-ai) | ![Boris + Team](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/claude.svg) |
|  | [Lenny's Podcast](https://www.youtube.com/@LennysPodcast), [Y Combinator](https://www.youtube.com/@ycombinator), [The Pragmatic Engineer](https://www.youtube.com/@pragmaticengineer), [Ryan Peterman](https://www.youtube.com/@ryanlpeterman), [Every](https://www.youtube.com/@every_media), [MLOps Community](https://www.youtube.com/@MLOps) | ![Community](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/community.svg) |

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/claude-jumping.svg" alt="section divider" width="60" height="50">

## ☠️ STARTUPS / BUSINESSES

| Claude | Replaced |
|-|-|
|[**Code Review**](https://code.claude.com/docs/en/code-review)|[Greptile](https://greptile.com), [CodeRabbit](https://coderabbit.ai), [Devin Review](https://devin.ai), [OpenDiff](https://opendiff.com), [Cursor BugBot](https://bugbot.dev)|
|[**Voice Dictation**](https://code.claude.com/docs/en/voice-dictation)|[Wispr Flow](https://wisprflow.ai), [SuperWhisper](https://superwhisper.com/)|
|[**Remote Control**](https://code.claude.com/docs/en/remote-control)|[OpenClaw](https://openclaw.ai/)
|[**Claude in Chrome**](https://code.claude.com/docs/en/chrome)|[Playwright MCP](https://github.com/microsoft/playwright-mcp), [Chrome DevTools MCP](https://developer.chrome.com/blog/chrome-devtools-mcp)|
|[**Computer Use**](https://docs.anthropic.com/en/docs/agents-and-tools/computer-use)|[OpenAI CUA](https://openai.com/index/computer-using-agent/)|
|[**Cowork**](https://claude.com/blog/cowork-research-preview)|[ChatGPT Agent](https://openai.com/chatgpt/agent/), [Perplexity Computer](https://www.perplexity.ai/computer/), [Manus](https://manus.im)|
|[**Tasks**](https://x.com/trq212/status/2014480496013803643)|[Beads](https://github.com/steveyegge/beads)
|[**Plan Mode**](https://code.claude.com/docs/en/common-workflows)|[Agent OS](https://github.com/buildermethods/agent-os)|
|[**Design**](https://claude.com/design)|[Figma](https://figma.com), [Framer](https://framer.com), [Sketch](https://sketch.com), [v0](https://v0.dev)|
|[**Agent SDK**](https://code.claude.com/docs/en/agent-sdk/overview)|[LangChain](https://langchain.com), [LangGraph](https://www.langchain.com/langgraph), [CrewAI](https://www.crewai.com), [AutoGen](https://github.com/microsoft/autogen), [OpenAI Assistants API](https://platform.openai.com/docs/assistants/overview)|
|[**Skills / Plugins**](https://code.claude.com/docs/en/plugins)|YC AI wrapper startups ([reddit](https://reddit.com/r/ClaudeAI/comments/1r6bh4d/claude_code_skills_are_basically_yc_ai_startup/))|

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/claude-jumping.svg" alt="section divider" width="60" height="50">

![Billion-Dollar Questions](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/billion-dollar-questions.svg)

*If you have answers, do let me know at shanraisshan@gmail.com*

<div class="tb-zh"><p>转轮动词与提示集锦（从 CLI 二进制 v2.1.121 中提取）。</p></div>

**Memory & Instructions (4)**

<div class="tb-zh"><p>如果你有答案，欢迎发邮件到 shanraisshan@gmail.com 告诉我。</p></div>

1. What exactly should you put inside your CLAUDE.md — and what should you leave out?
2. If you already have a CLAUDE.md, is a separate constitution.md or rules.md actually needed?
3. How often should you update your CLAUDE.md, and how do you know when it's become stale?
4. Why does Claude still ignore CLAUDE.md instructions — even when they say MUST in all caps? ([reddit](https://reddit.com/r/ClaudeCode/comments/1qn9pb9/claudemd_says_must_use_agent_claude_ignores_it_80/))

<div class="tb-zh"><p>记忆与指令（4 个问题）</p></div>

**Agents, Skills & Workflows (6)**

<div class="tb-zh"><p>1）CLAUDE.md 里到底该写什么、又该省掉什么？2）如果已经有 CLAUDE.md，还需要单独再来一份 constitution.md 或 rules.md 吗？3）CLAUDE.md 应该多久更新一次，又怎么判断它已经过时？4）为什么哪怕写成大写的 MUST，Claude 还是不理 CLAUDE.md 里的指令？</p></div>

1. When should you use a command vs an agent vs a skill — and when is vanilla Claude Code just better?
2. How often should you update your agents, commands, and workflows as models improve?
3. Should you have a generalist subagent or a feature-specific/role-specific agent? Does giving your subagent a detailed persona improve quality, and what does a "perfect persona prompt" for research/vision look like?
4. Should you rely on Claude Code's built-in plan mode — or build your own planning command/agent that enforces your team's workflow?
5. If you have a personal skill (e.g., /implement with your coding style), how do you incorporate community skills (e.g., /simplify) without conflicts — and who wins when they disagree?
6. Are we there yet? Can we convert an existing codebase into specs, delete the code, and have AI regenerate the exact same code from those specs alone?

<div class="tb-zh"><p>Agents、Skills 与工作流（6 个问题）</p></div>

**Specs & Documentation (3)**

<div class="tb-zh"><p>1）什么时候该用 command、什么时候该用 agent、什么时候该用 skill——又有哪些场景直接用原版 Claude Code 反而更好？2）随着模型变强，agents、commands 和工作流该多久更新一次？3）应该用通用型子代理，还是按功能、按角色细分的 agent？给子代理写详细人设真能提升质量吗，研究和愿景类的「完美人设提示词」又该长什么样？4）应该依赖 Claude Code 内置的 plan 模式，还是自建一套规划用的 command 或 agent 来强制推行团队流程？5）如果你有个人 skill（比如按自己编码风格定制的 /implement），要怎么并入社区 skill（比如 /simplify）而不打架——两边意见不一致时又听谁的？6）我们到了吗：能不能把现有代码库转成规格文档、删掉代码，再让 AI 只凭这些规格生成出完全一样的代码？</p></div>

1. Should every feature in your repo have a spec as a markdown file?
2. How often do you need to update specs so they don't become obsolete when a new feature is implemented?
3. When implementing a new feature, how do you handle the ripple effect on specs for other features?

<div class="tb-zh"><p>规格与文档（3 个问题）</p></div>

### 🤔 [Does code matter?](https://github.com/shanraisshan/agentic-engineering)

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/claude-jumping.svg" alt="section divider" width="60" height="50">

## REPORTS

  <br>

  <br>

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/claude-jumping.svg" alt="section divider" width="60" height="50">

## <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/how-to-use-hd.svg" alt="How to Use">

Get the maximum out of this repo by following these steps:

<div class="tb-zh"><p>1）仓库里的每个功能都该配一份 markdown 规格文档吗？2）新功能一实现规格就容易过时，那多久得更新一次？3）实现新功能时，它对其他功能规格造成的连带影响要怎么处理？</p></div>

1. **Read this repo as a course, not as a workflow or skill.** It's reference material first; you'll run things later.
2. **Don't use Claude as a chatbot.** Learn the primitives — agents, commands, skills, hooks — and assemble them into your own workflow.
3. **Run [`/weather-orchestrator`](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/orchestration-workflow/orchestration-workflow.md)** to see a complete command → agent → skill flow. Use it as a template for any dev workflow, from planning to shipping.
4. **Listen for the custom hook sounds while you work.** Their implementation lives in the dedicated [Claude Code Hooks repo](https://github.com/shanraisshan/claude-code-hooks); other patterns like [Agent Teams](/lib/09-harness/claude-code-best-practice/implementation-claude-agent-teams-implementation) ship inside this repo's `implementation/` directory.
5. **Learn the advanced topics and their implementations** from the [🔥 Hot](#-hot) sub-table — for example, the [Ralph Wiggum self-evolving loop](https://github.com/shanraisshan/ralph-wiggum-self-evolving-loop) is a full working repo you can clone to see one of these patterns end-to-end.
6. **Point Claude at the [tips and tricks](#-tips-and-tricks-83) section in your own project** and ask it to suggest edits — especially how to restructure your `CLAUDE.md`. Every tip is sourced from the Claude team or the community.
7. **Subscribe to the Reddit and YouTube channels in the [Subscribe section](#-subscribe)** to keep up with the community.

<div class="tb-zh"><p>按下面这些步骤，可以把这个仓库的价值用满：</p></div>

**🎬 Videos**

<div class="tb-zh"><p>1）把这个仓库当课程读，而不是当工作流或 skill 用——它首先是参考资料，动手跑是后面的事。2）别把 Claude 当聊天机器人：先学会 agents、commands、skills、hooks 这些原语，再把它们组装成自己的工作流。3）跑一遍 /weather-orchestrator，看完整的 command → agent → skill 流程，并把它当模板套用到从规划到交付的任何开发流程上。4）工作时留意自定义 hook 的音效——它们的实现放在专门的 Claude Code Hooks 仓库里，而 Agent Teams 这类模式则随本仓库的 implementation/ 目录发布。5）从 🔥 Hot 子表里学进阶主题及其实现：例如 Ralph Wiggum 自演进循环就是一个可直接克隆的完整仓库，能端到端看到其中一种模式。6）在你自己的项目里把 Claude 指向「技巧与提示」一节，让它给你改法建议——尤其是怎么重构你的 CLAUDE.md；每条技巧都来自 Claude 团队或社区。7）订阅 Subscribe 一节里的 Reddit 和 YouTube 频道，跟上社区动态。</p></div>

<a href="https://www.youtube.com/watch?v=AkAhkalkRY4"><img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/thumbnail/video-1.png" alt="Watch on YouTube" width="240"></a>
<a href="https://youtu.be/lPjhM6BBK0Q"><img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/thumbnail/video-2.png" alt="Watch on YouTube" width="240"></a>

**📊 Presentations**

<div class="tb-zh"><p>🎬 视频</p></div>

<a href="https://github.com/shanraisshan/claude-code-best-practice/tree/main/presentation/2026-04-25-gdg-kolachi-cli-claude-code-gemini"><img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/thumbnail/presentation-1.png" alt="Claude Code & Gemini CLI — GDG Kolachi" width="240"></a>

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/claude-jumping.svg" alt="section divider" width="60" height="50">

  ✨Trending on Github in March 2026✨

<div class="tb-zh"><p>📊 演示文稿</p></div>

## Other Repos

<table>
<tr>
<td align="center" width="140">
  <a href="https://github.com/shanraisshan/claude-code-hooks"><img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/claude-speaking.svg" alt="Claude Code Hooks" width="64" height="64"></a><br>
  <a href="https://github.com/shanraisshan/claude-code-hooks"><strong>Claude Code<br>Hooks</strong></a>
</td>
<td align="center" width="140">
  <a href="https://github.com/shanraisshan/codex-cli-best-practice"><img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/codex-jumping.svg" alt="Codex CLI Best Practice" width="64" height="64"></a><br>
  <a href="https://github.com/shanraisshan/codex-cli-best-practice"><strong>Codex CLI<br>Best Practice</strong></a>
</td>
<td align="center" width="140">
  <a href="https://github.com/shanraisshan/codex-cli-hooks"><img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/codex-speaking.svg" alt="Codex CLI Hooks" width="64" height="64"></a><br>
  <a href="https://github.com/shanraisshan/codex-cli-hooks"><strong>Codex CLI<br>Hooks</strong></a>
</td>
<td align="center" width="140">
  <a href="https://github.com/shanraisshan/gemini-cli-best-practice"><img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/gemini-jumping.svg" alt="Gemini CLI Best Practice" width="64" height="64"></a><br>
  <a href="https://github.com/shanraisshan/gemini-cli-best-practice"><strong>Gemini CLI<br>Best Practice</strong></a>
</td>
<td align="center" width="140">
  <a href="https://github.com/shanraisshan/gemini-cli-hooks"><img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/gemini-speaking.svg" alt="Gemini CLI Hooks" width="64" height="64"></a><br>
  <a href="https://github.com/shanraisshan/gemini-cli-hooks"><strong>Gemini CLI<br>Hooks</strong></a>
</td>
</tr>
</table>

## Developed by

![Developed by](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/developed-by.svg)

> | # | Workflow | Description |
> |---|----------|-------------|
> | 1 | /workflows:development-workflows | Update the DEVELOPMENT WORKFLOWS table and cross-workflow analysis report by researching all 10 workflow repos in parallel |
> | 2 | /workflows:skill-collections | Update the SKILL COLLECTIONS table by researching all 5 skill-collection repos in parallel |
> | 3 | /workflows:agent-collections | Update the AGENT COLLECTIONS table by researching all agent-collection repos in parallel |
> | 4 | /workflows:best-practice:workflow-concepts | Update the README CONCEPTS section with the latest Claude Code features and concepts |
> | 5 | /workflows:best-practice:workflow-claude-settings | Track Claude Code settings report changes and find what needs updating |
> | 6 | /workflows:best-practice:workflow-claude-subagents | Track Claude Code subagents report changes and find what needs updating |
> | 7 | /workflows:best-practice:workflow-claude-commands | Track Claude Code commands report changes and find what needs updating |
> | 8 | /workflows:best-practice:workflow-claude-skills | Track Claude Code skills report changes and find what needs updating |

<div class="tb-zh"><p>✨2026 年 3 月 GitHub 趋势榜✨</p></div>

## Extras

[![Claude for OSS](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/claude-for-oss.svg)](https://claude.com/contact-sales/claude-for-oss)
[![Claude Community Ambassador](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/claude-community-ambassador.svg)](https://claude.com/community/ambassadors)
[![Claude Certified Architect](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/claude-certified-architect.svg)](https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request)
[![Anthropic Academy](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/anthropic-academy.svg)](https://anthropic.skilljar.com/)
[![Join Claude Pakistan community on WhatsApp](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/whatsapp-claude-pakistan.svg)](https://chat.whatsapp.com/BDUV2stIS0c7X5uY7RY6nS)

<div class="tb-zh"><p>内容为一张工作流表：1）//workflows:development-workflows——并行调研全部 10 个工作流仓库，更新 DEVELOPMENT WORKFLOWS 表和跨工作流分析报告；2）/workflows:skill-collections——并行调研全部 5 个 skill 精选仓库，更新 SKILL COLLECTIONS 表；3）/workflows:agent-collections——并行调研全部 agent 精选仓库，更新 AGENT COLLECTIONS 表；4）/workflows:best-practice:workflow-concepts——用最新的 Claude Code 功能与概念更新 README 的概念一节；5）/workflows:best-practice:workflow-claude-settings——跟踪 Claude Code 设置报告的变动，找出需要更新的地方；6）/workflows:best-practice:workflow-claude-subagents——跟踪子代理报告的变动；7）/workflows:best-practice:workflow-claude-commands——跟踪命令报告的变动；8）/workflows:best-practice:workflow-claude-skills——跟踪 skills 报告的变动。</p></div>

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/claude-jumping.svg" alt="section divider" width="60" height="50">
