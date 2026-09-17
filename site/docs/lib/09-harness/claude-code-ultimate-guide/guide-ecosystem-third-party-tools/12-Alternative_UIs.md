---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/third-party-tools.md"
sourceRel: "guide/ecosystem/third-party-tools.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/third-party-tools.md"
sourceSha256: "b3e2f559e8457efd6710fab561c9ec7cd746c62b9885fa5535509f700f4a2677"
pageSha256: "dd20ae8bdf19effbdf3370008e05c312c163239f2ec77bd3cbe8e527cf961885"
contentMode: "local-full"
zh: ""
---

## Alternative UIs

### Claude Chic

A styled terminal UI for Claude Code built on Anthropic's claude-agent-sdk. Replaces the default Claude Code TUI with a visually enhanced experience.

| Attribute | Details |
|-----------|---------|
| **Source** | [Blog: matthewrocklin.com](https://matthewrocklin.com/introducing-claude-chic/) / [PyPI: claudechic](https://pypi.org/project/claudechic/) |
| **Install** | `uvx claudechic` |
| **Language** | Python (Textual + claude-agent-sdk) |
| **Status** | Alpha |

**Key features**:

- Color-coded messages (orange: user, blue: Claude, grey: tools)
- Collapsible tool usage blocks
- Git worktree management from within the UI
- Multiple agents in a single window
- `/diff` viewer, vim keybindings (`/vim`), shell commands (`!ls`)
- Proper Markdown rendering with streaming

**Limitations**: Alpha status - expect breaking changes. Python dependency chain. Requires claude-agent-sdk. macOS/Linux only.

---

### Toad

A universal terminal frontend for AI coding agents. Supports Claude Code alongside Gemini CLI, OpenHands, Codex, and 12+ other agents via the Agent Client Protocol (ACP).

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: batrachianai/toad](https://github.com/batrachianai/toad) / [willmcgugan.github.io/toad-released](https://willmcgugan.github.io/toad-released/) |
| **Install** | `curl -fsSL batrachian.ai/install \| sh` or `uv tool install -U batrachian-toad --python 3.14` |
| **Author** | Will McGugan (creator of Rich & Textual) |
| **Language** | Python (Textual) |

**Key features**:

- Unified interface across 12+ agent CLIs
- Full shell integration with tab completion
- `@` file context injection with fuzzy search
- Side-by-side diffs with syntax highlighting
- Jupyter-inspired block navigation
- Flicker-free character-level rendering

**Limitations**: macOS/Linux only (Windows via WSL). Agent support varies by ACP compatibility. No built-in session persistence yet (on roadmap).

---

### Conductor

A macOS desktop app for orchestrating multiple Claude Code (and Codex) instances in parallel using git worktrees, with integrated diff viewing, PR workflow, and GitHub automation.

| Attribute | Details |
|-----------|---------|
| **Source** | [conductor.build](https://conductor.build) |
| **Docs** | [docs.conductor.build](https://docs.conductor.build) |
| **Install** | Download from [conductor.build](https://conductor.build) |
| **Platform** | macOS only (Windows/Linux planned) |
| **Author** | Melty Labs |

**Workspace management**:

- One workspace per feature/bugfix, created with `⌘⇧N` or from a GitHub issue or Linear issue directly
- Workspaces organized by status: backlog → in progress → in review → done (v0.35.0)
- Group workspaces across multiple repos in a single view (v0.35.2)
- **Next Workspace** button (v0.36.4): jumps to the next workspace awaiting your input, so you never manually scan for blocked agents
- Archive completed workspaces while preserving full chat history

**Diff viewer & code editing**:

- Integrated diff viewer in the chat panel, turn-by-turn diffs per agent message (v0.22.0)
- Open diff with `⌘D`; navigate file-by-file without leaving Conductor
- **Manual Mode** (v0.37.0): built-in file editor with syntax highlighting and `⌘F` search, covers quick edits without opening a separate IDE
- Comment directly on diffs and send feedback to Claude (v0.10.0)

**GitHub & CI integration**:

- View GitHub Actions logs in the Checks tab (v0.33.2)
- Failing CI checks forwarded automatically to Claude for fixes (v0.12.0)
- Edit PR titles and descriptions directly in the Checks tab (v0.34.1)
- Sync PR comments from GitHub to Conductor (v0.25.4)
- Todos block workspace until checked off before merge (v0.28.4)
- Create PR with `⌘⇧P`

**Linear & other integrations**:

- Attach Linear issues to messages or open a Conductor workspace directly from a Linear issue (v0.15.0, v0.36.5)
- Deeplinks to Linear, Slack, VS Code within AI-generated responses
- Mermaid diagram support with pan/zoom and fullscreen

**Agent support**:

- Claude Code (default) + Codex side by side (v0.18.0); keyboard-navigable model picker
- Slash command autocomplete (e.g. `/restart` to restart Claude Code process)

**Reported workflow pattern (community)**:

Users working across 5+ parallel features on multiple repos report the following flow: create one workspace per feature (GitHub issue or Linear issue as context), let agents run, use the **Next Workspace** button to process only workspaces awaiting input, review diffs in-app, merge from the Checks tab. Reported combination with BMAD: one workspace per epic, one Claude agent for implementation and a second for the next story, described as a significant productivity multiplier for spec-driven development.

**Limitations**: macOS only (as of Mar 2026). Proprietary (not open source). Overlaps with multi-agent orchestration tools listed below.

---

### Agent Orchestrator (AO)

The open source, cross-platform equivalent of Conductor above: a desktop app and CLI that supervise multiple coding agent CLIs in parallel, each in its own git worktree, with an automatic feedback loop for CI failures, review comments, and merge conflicts.

| Attribute | Details |
|-----------|---------|
| **Source** | [github.com/AgentWrapper/agent-orchestrator](https://github.com/AgentWrapper/agent-orchestrator) (renamed from `ComposioHQ/agent-orchestrator`, same repo) |
| **Install** | `npm install -g @aoagents/ao && ao start`, or desktop build for Windows/macOS/Linux |
| **License** | Apache-2.0 |
| **Platform** | Windows, macOS, Linux, plus a headless CLI mode |
| **Stars** | 8,100+ (July 2026, 5 months after creation) |

**What it adds over Conductor**: 23 supported agent CLI harnesses (Claude Code, Codex, Cursor, Aider, Goose, Devin, and 18 others) instead of 2, and it runs on any OS instead of macOS only. The core pattern is the same: isolated git worktree per session, a local daemon watching PR state, and automatic "nudges" sent back to the right agent session when CI fails, a reviewer comments, or a merge conflict appears.

**Two things worth knowing before adopting it**: the desktop app sends anonymized usage events (and redacted session recordings) to PostHog by default, disable it by setting `VITE_AO_POSTHOG_KEY` to an empty string before building. And despite some secondary coverage describing a "retry twice, then escalate to a human" mechanism for CI failures, that logic does not appear in the project's own README, architecture doc, or status doc as of July 2026, the documented behavior is a direct nudge back to the agent, not a bounded retry-then-escalate policy.

**When to choose AO over Conductor**: you're not on macOS, you use an agent CLI other than Claude Code or Codex, or you want the option to self-host without a proprietary desktop app. Conductor remains more polished and better integrated with Linear/Slack at this stage; AO is younger (416 open issues as of July 2026) and trades that maturity for openness and platform reach.

Full evaluation: [`docs/resource-evaluations/agent-orchestrator-composio.md`](/lib/09-harness/claude-code-ultimate-guide/docs-resource-evaluations-agent-orchestrator-composio).

---

### Piebald

A cross-platform desktop and web app for agentic AI development. Maintains full compatibility with Claude Code's hooks system and AGENTS.md conventions while adding multi-provider support and a full GUI environment.

| Attribute | Details |
|-----------|---------|
| **Source** | [piebald.ai](https://piebald.ai) / [docs.piebald.ai](https://docs.piebald.ai) |
| **GitHub** | [github.com/Piebald-AI](https://github.com/Piebald-AI) |
| **Platform** | Windows / macOS / Linux + Web |
| **Pricing** | Free (Basic) / $20/month (planned) |
| **Version** | v0.3.1 (May 2026) |

**Key features**:

- **Multi-provider**: Claude Pro/Max, GitHub Copilot, Amazon Bedrock, Google Antigravity, Qwen, and any OpenAI/Anthropic/Google-compatible endpoint (bring your own subscription)
- **Claude Code compatibility**: Explicit support for hooks, AGENTS.md, MCP servers, permission modes, subagents, and chat compaction
- **Dev environment**: Git worktrees (first-class), integrated terminal, file browser, Git browser, and code editor (Pro)
- **Chat management**: Branching/forking, message queuing, slash commands, context management, desktop notifications
- **Configuration**: VS Code theme import, localization (i18n), color/font customization, web mode

**Windows gap**: All other "Alternative UIs" in this section are macOS/Linux only. Piebald is the only GUI option with native Windows support (no WSL required).

**Relation to Piebald-AI org**: The same team maintains [claude-code-system-prompts](https://github.com/Piebald-AI/claude-code-system-prompts), the most comprehensive public reverse-engineering of Claude Code's internal system prompts, cited throughout this guide.

**Limitations**: Proprietary, not open source. File browser and code editor require Pro tier.

**Note on Agent View**: Since v2.1.139, Claude Code has native multi-session management via `claude agents` (see [§9.17](#917-scaling-patterns-multi-instance-workflows)). Piebald remains the relevant choice for multi-provider workflows, Windows, and users who prefer a full GUI over the CLI.

---

### Claude Code GUI (VS Code Extension)

A third-party VS Code extension (not Anthropic's official extension) that adds a graphical layer on top of Claude Code.

| Attribute | Details |
|-----------|---------|
| **Source** | [VS Code Marketplace: MaheshKok.claude-code-gui](https://marketplace.visualstudio.com/items?itemName=MaheshKok.claude-code-gui) |
| **Install** | VS Code Marketplace → search "Claude Code GUI" |

**Note**: This is **not** the official [Claude Code for VS Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code) extension by Anthropic. The official extension provides inline diffs, @-mentions, and plan review directly in the editor.

**Limitations**: Third-party, not Anthropic-maintained. Feature set may overlap with or lag behind the official extension.
