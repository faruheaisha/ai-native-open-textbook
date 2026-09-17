---
title: "The Ultimate Claude Code Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md"
sourceRel: "guide/ultimate-guide.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ultimate-guide.md"
sourceSha256: "4d290b0171bbaaffd149d5d2e4da964392cb212d7357408df40d8f346f952dbc"
pageSha256: "421a23ee576e4d352b30d415c4af3cdb00a8f03f6f4a6b345dcd653b55e4786f"
contentMode: "local-full"
zh: ""
---

# The Ultimate Claude Code Guide

> A comprehensive, self-contained guide to mastering Claude Code - from zero to power user.

**Author**: Florian BRUNIAUX | Founding Engineer [@Méthode Aristote](https://methode-aristote.fr)

**Written with**: Claude (Anthropic)

**Reading time**: ~30-40 hours (full) | ~15 minutes (Quick Start only)

**Last updated**: January 2026

**Version**: 3.43.0

---

## Before You Start

**This guide is not official Anthropic documentation.** It's a community resource based on my exploration of Claude Code over several months.

**What you'll find:**
- Patterns that have worked for me
- Observations that may not generalize to your workflow
- Time estimates and percentages that are rough approximations, not measurements

**What you won't find:**
- Definitive answers (the tool is too new)
- Benchmarked performance claims
- Guarantees that any technique will work for you

**Use critically. Experiment. Share what works for you.**

> **⚠️ Note (Jan 2026)**: If you've heard about **ClawdBot** recently, that's a **different tool**. ClawdBot is a self-hosted chatbot assistant accessible via messaging apps (Telegram, WhatsApp, etc.), designed for personal automation and smart home use cases. Claude Code is a CLI tool for developers (terminal/IDE integration) focused on software development workflows. Both use Claude models but serve distinct audiences and use cases. [More details in Appendix B: FAQ](#appendix-b-faq).

---

## TL;DR - The 5-Minute Summary

If you only have 5 minutes, here's what you need to know:

### Essential Commands
```bash
claude                    # Start Claude Code
/help                     # Show all commands
/powerup                  # Interactive lessons: CLAUDE.md, /rewind, memory, effort modes
/status                   # Check context usage
/compact                  # Compress context when >70%
/clear                    # Fresh start
/plan                     # Safe read-only mode
Ctrl+C                    # Cancel operation
```

### The Workflow
```
Describe → Claude Analyzes → Review Diff → Accept/Reject → Verify
```

### Context Management (Critical!)
| Context % | Action |
|-----------|--------|
| 0-50% | Work freely |
| 50-70% | Be selective |
| 70-90% | `/compact` now |
| 90%+ | `/clear` required |

*These thresholds are based on my experience. Your optimal workflow may differ depending on task complexity and working style.*

### Memory Hierarchy
```
~/.claude/CLAUDE.md       → Global (all projects)
/project/CLAUDE.md        → Project (committed)
/project/.claude/         → Personal (not committed)
```

### Power Features
| Feature | What It Does |
|---------|--------------|
| **Agents** | Specialized AI personas for specific tasks |
| **Skills** | Reusable knowledge modules |
| **Hooks** | Automation scripts triggered by events |
| **MCP Servers** | External tools (Serena, Context7, Playwright...) |
| **Plugins** | Community-created extension packages |

### The Golden Rules
1. **Always review diffs** before accepting changes
2. **Use `/compact`** before context gets critical
3. **Be specific** in your requests (WHAT, WHERE, HOW, VERIFY)
4. **Start with Plan Mode** for complex/risky tasks
5. **Create CLAUDE.md** for every project

### Quick Decision Tree
```
Simple task → Just ask Claude
Complex task → Use TodoWrite to plan
Risky change → Enter Plan Mode first
Repeating task → Create an agent or command
Context full → /compact or /clear
```

**Now read Section 1 for the full Quick Start, or jump to any section you need.**

---

## Choose Your Path

The guide has 11 chapters and 22,000+ lines. You don't need to read everything: here's what matters for your situation.

| I am... | Read this | Skip this | Time |
|---------|-----------|-----------|------|
| **Developer, getting started** | Ch.1 → Ch.2 → Ch.3 | Ch.9, Ch.11, Appendix | 3h |
| **Developer, intermediate** | Ch.2.6 → Ch.4 → Ch.5 → Ch.7 | Ch.1, Ch.10 ref only | 4h |
| **Power user / senior** | Ch.9 (Advanced) → Ch.4-8 | Ch.1 Quick Start | 2h |
| **Tech Lead / EM** | Ch.3.5 → Ch.9.17 → Ch.9.20 → Ch.11 | Ch.5-6 detail | 1h30 |
| **Just need a reference** | [Ch.10.5 Cheatsheet](#105-cheatsheet) | Everything else | 5 min |

---

## Top 5 sections by ROI

If you only have time for 5 sections:

1. **[2.6 Mental Model](#26-mental-model)**: Understand how Claude Code thinks (20 min)
2. **[3.1 CLAUDE.md](#31-memory-files-claudemd)**: Persistent memory that survives sessions (30 min)
3. **[9.1 The Trinity](#91-the-trinity)**: The core pattern for agentic work (20 min)
4. **[7.4 Security Hooks](#74-security-hooks)**: Automate guardrails you won't forget (30 min)
5. **[10.5 Cheatsheet](#105-cheatsheet)**: Daily reference, bookmark it (5 min)

---

## Table of Contents

- [1. Quick Start (Day 1)](#1-quick-start-day-1) `🟢 Beginner` `⏱ 45 min`
  - [1.1 Installation](#11-installation)
  - [1.2 First Workflow](#12-first-workflow)
  - [1.3 Essential Commands](#13-essential-commands)
  - [1.4 Permission Modes](#14-permission-modes)
  - [1.5 Productivity Checklist](#15-productivity-checklist)
  - [1.6 Migrating from Other AI Coding Tools](#16-migrating-from-other-ai-coding-tools)
  - [1.7 Trust Calibration](#17-trust-calibration-when-and-how-much-to-verify)
  - [1.8 Eight Beginner Mistakes](#18-eight-beginner-mistakes-and-how-to-avoid-them)
- [2. Core Concepts](#2-core-concepts) `🟡 Intermediate` `⏱ 60 min`
  - [2.1 The Interaction Loop](#21-the-interaction-loop)
  - [2.2 Context Management](#22-context-management)
  - [2.3 Plan Mode](#23-plan-mode) (incl. [OpusPlan](#opusplan-mode))
  - [2.4 Rewind](#24-rewind)
  - [2.5 Model Selection & Thinking Guide](#25-model-selection--thinking-guide)
  - [2.6 Mental Model](#26-mental-model)
  - [2.8 Structured Prompting with XML Tags](#28-structured-prompting-with-xml-tags)
  - [2.9 Semantic Anchors](#29-semantic-anchors)
  - [2.10 Prompt Engineering Patterns](#210-prompt-engineering-patterns)
  - [2.11 Structured Outputs & Schema Design](#211-structured-outputs--schema-design)
  - [2.12 Data Flow & Privacy](#212-data-flow--privacy)
  - [2.13 Under the Hood](#213-under-the-hood)
- [3. Memory & Settings](#3-memory--settings) `🟢 Beginner` `⏱ 30 min`
  - [3.1 Memory Files (CLAUDE.md)](#31-memory-files-claudemd)
  - [3.2 The .claude/ Folder Structure](#32-the-claude-folder-structure)
  - [3.3 Settings & Permissions](#33-settings--permissions)
  - [3.4 Precedence Rules](#34-precedence-rules)
  - [3.5 Team Configuration at Scale](#35-team-configuration-at-scale)
- [4. Agents](#4-agents) `🟡 Intermediate` `⏱ 45 min`
  - [4.1 What Are Agents](#41-what-are-agents)
  - [4.2 Creating Custom Agents](#42-creating-custom-agents)
  - [4.3 Agent Template](#43-agent-template)
  - [4.4 Best Practices](#44-best-practices)
  - [4.5 Agent Memory](#45-agent-memory)
  - [4.6 Agent Examples](#46-agent-examples)
  - [4.7 Advanced Agent Patterns](#47-advanced-agent-patterns)
- [5. Skills](#5-skills) `🟡 Intermediate` `⏱ 30 min`
  - [5.1 Understanding Skills](#51-understanding-skills)
  - [5.2 Creating Skills](#52-creating-skills)
  - [5.3 Skill Template](#53-skill-template)
  - [5.4 Skill Examples](#54-skill-examples)
- [6. Commands](#6-commands) `🟡 Intermediate` `⏱ 30 min`
  - [6.1 Slash Commands](#61-slash-commands)
  - [6.2 Creating Custom Commands](#62-creating-custom-commands)
  - [6.3 Command Template](#63-command-template)
  - [6.4 Command Examples](#64-command-examples)
- [7. Hooks](#7-hooks) `🟡 Intermediate` `⏱ 45 min`
  - [7.1 The Event System](#71-the-event-system)
  - [7.2 Creating Hooks](#72-creating-hooks)
  - [7.3 Hook Templates](#73-hook-templates)
  - [7.4 Security Hooks](#74-security-hooks)
  - [7.5 Hook Examples](#75-hook-examples)
- [8. MCP Servers](#8-mcp-servers) `🟡 Intermediate` `⏱ 40 min`
  - [8.1 What is MCP](#81-what-is-mcp)
  - [8.2 Available Servers](#82-available-servers)
  - [8.3 Configuration](#83-configuration)
  - [8.4 Server Selection Guide](#84-server-selection-guide)
  - [8.5 Plugin System](#85-plugin-system)
  - [8.6 MCP Security](#86-mcp-security)
- [9. Advanced Patterns](#9-advanced-patterns) `🔴 Advanced` `⏱ 3h`
  - [9.1 The Trinity](#91-the-trinity)
  - [9.2 Composition Patterns](#92-composition-patterns)
  - [9.3 CI/CD Integration](#93-cicd-integration)
  - [9.4 IDE Integration](#94-ide-integration)
  - [9.5 Tight Feedback Loops](#95-tight-feedback-loops)
  - [9.6 Todo as Instruction Mirrors](#96-todo-as-instruction-mirrors)
  - [9.7 Output Styles](#97-output-styles)
  - [9.8 Vibe Coding & Skeleton Projects](#98-vibe-coding--skeleton-projects)
  - [9.9 Batch Operations Pattern](#99-batch-operations-pattern)
  - [9.10 Continuous Improvement Mindset](#910-continuous-improvement-mindset)
  - [9.11 Common Pitfalls & Best Practices](#911-common-pitfalls--best-practices)
  - [9.12 Git Best Practices & Workflows](#912-git-best-practices--workflows)
  - [9.13 Cost Optimization Strategies](#913-cost-optimization-strategies)
  - [9.14 Development Methodologies](#914-development-methodologies)
  - [9.15 Named Prompting Patterns](#915-named-prompting-patterns)
  - [9.16 Session Teleportation](#916-session-teleportation)
  - [9.17 Scaling Patterns: Multi-Instance Workflows](#917-scaling-patterns-multi-instance-workflows)
  - [9.18 Codebase Design for Agent Productivity](#918-codebase-design-for-agent-productivity)
  - [9.19 Permutation Frameworks](#919-permutation-frameworks)
  - [9.20 Agent Teams (Multi-Agent Coordination)](#920-agent-teams-multi-agent-coordination)
  - [9.21 Legacy Codebase Modernization](#921-legacy-codebase-modernization)
  - [9.22 Remote Control (Mobile Access)](#922-remote-control-mobile-access)
  - [9.23 Configuration Lifecycle & The Update Loop](#923-configuration-lifecycle--the-update-loop)
  - [9.24 Instinct-Based Continuous Learning](#924-instinct-based-continuous-learning)
  - [9.25 Repository Harness Engineering](#925-harness-engineering)
  - [9.26 Review-Driven Context Optimization](#926-review-driven-context-optimization)
  - [9.27 Cross-Session Messaging (Peer Coordination)](#927-cross-session-messaging-peer-coordination)
  - [9.28 Event Ingestion and Safe Delegation](#928-event-ingestion-and-safe-delegation)
- [10. Reference](#10-reference) `🟢 All levels` `⏱ As needed`
  - [10.1 Commands Table](#101-commands-table)
  - [10.2 Keyboard Shortcuts](#102-keyboard-shortcuts)
  - [10.3 Configuration Reference](#103-configuration-reference)
  - [10.4 Troubleshooting](#104-troubleshooting)
  - [10.5 Cheatsheet](#105-cheatsheet)
  - [10.6 Daily Workflow & Checklists](#106-daily-workflow--checklists)
- [11. AI Ecosystem: Complementary Tools](#11-ai-ecosystem-complementary-tools) `🟡 Intermediate` `⏱ 20 min`
  - [11.1 Why Complementarity Matters](#111-why-complementarity-matters)
  - [11.2 Tool Matrix](#112-tool-matrix)
  - [11.3 Practical Workflows](#113-practical-workflows)
  - [11.4 Integration Patterns](#114-integration-patterns)
  - [For Non-Developers: Claude Cowork](#for-non-developers-claude-cowork)
- [Appendix: Templates Collection](#appendix-templates-collection)
  - [Appendix A: File Locations Reference](#appendix-a-file-locations-reference)
  - [Appendix B: FAQ](#appendix-b-faq)

---

# 1. Quick Start (Day 1)

_Quick jump:_ [Installation](#11-installation) · [First Workflow](#12-first-workflow) · [Essential Commands](#13-essential-commands) · [Permission Modes](#14-permission-modes) · [Productivity Checklist](#15-productivity-checklist) · [Migrating from Other Tools](#16-migrating-from-other-ai-coding-tools) · [Beginner Mistakes](#17-eight-beginner-mistakes-and-how-to-avoid-them)

---

**Reading time**: 15 minutes

**Skill level**: Beginner

**Goal**: Go from zero to productive

> **Already using Claude Code?** Skip to [1.6 Migration guide](#16-migrating-from-other-ai-coding-tools) or go directly to [Ch.2 Core Concepts](#2-core-concepts).

## 1.1 Installation

Choose your preferred installation method based on your operating system:

```C
/*──────────────────────────────────────────────────────────────*/
/* Universal Method       */ npm install -g @anthropic-ai/claude-code
/*──────────────────────────────────────────────────────────────*/
/* Windows (CMD)          */ npm install -g @anthropic-ai/claude-code
/* Windows (PowerShell)   */ irm https://claude.ai/install.ps1 | iex
/*──────────────────────────────────────────────────────────────*/
/* macOS (npm)            */ npm install -g @anthropic-ai/claude-code
/* macOS (Homebrew)       */ brew install claude-code
/* macOS (Shell Script)   */ curl -fsSL https://claude.ai/install.sh | sh
/*──────────────────────────────────────────────────────────────*/
/* Linux (npm)            */ npm install -g @anthropic-ai/claude-code
/* Linux (Shell Script)   */ curl -fsSL https://claude.ai/install.sh | sh
```

### Verify Installation

```bash
claude --version
```

### Updating Claude Code

Keep Claude Code up to date for the latest features, bug fixes, and model improvements:

```bash
# Check for available updates
claude update

# Alternative: Update via npm
npm update -g @anthropic-ai/claude-code

# Verify the update
claude --version

# Check system health after update
claude doctor
```

**Available maintenance commands:**

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `claude update` | Check and install updates | Weekly or when encountering issues |
| `claude doctor` | Verify auto-updater health | After system changes or if updates fail |
| `claude --version` | Display current version | Before reporting bugs |
| `claude auth login` | Authenticate from the command line | CI/CD, devcontainers, scripted setups |
| `claude auth status` | Check current authentication state | Verify which account/method is active |
| `claude auth logout` | Clear stored credentials | Shared machines, security cleanup |

**Update frequency recommendations:**
- **Weekly**: Check for updates during normal development
- **Before major work**: Ensure latest features and fixes
- **After system changes**: Run `claude doctor` to verify health
- **On unexpected behavior**: Update first, then troubleshoot

### Desktop App: Claude Code Without the Terminal

Claude Code is available in two forms: the CLI (what this guide focuses on) and the **Code tab** in the Claude Desktop app. Same underlying engine, graphical interface instead of terminal. Available on macOS and Windows, with no Node.js installation required.

**What the desktop adds on top of standard Claude Code:**

| Feature | Details |
|---------|---------|
| Visual diff review | Review file changes inline with comments before accepting |
| Live app preview | Claude starts your dev server, opens an embedded browser, auto-verifies changes |
| GitHub PR monitoring | Auto-fix CI failures, auto-merge once checks pass |
| Parallel sessions | Multiple sessions in the sidebar, each with automatic Git worktree isolation |
| Connectors | GitHub, Slack, Linear, Notion: GUI setup, no manual MCP config |
| File attachments | Attach images and PDFs directly to prompts |
| Remote sessions | Run long tasks on Anthropic's cloud, continue after closing the app |
| SSH sessions | Connect to remote machines, cloud VMs, dev containers |

**When to choose Desktop vs CLI:**

| Use Desktop when... | Use CLI when... |
|--------------------|-----------------|
| You want visual diff review | You need scripting or automation (`--print`, output piping) |
| You're onboarding colleagues | You use third-party providers (Bedrock, Vertex, Foundry) |
| You want session management in a sidebar | You need `dontAsk` permission mode |
| You're doing a live demo or pair review | You need agent teams / multi-agent orchestration |
| You want file attachments (images, PDFs) | You're on Linux (Desktop is macOS + Windows only) |

**What's NOT available in Desktop** (CLI only): third-party API providers, scripting flags (`--print`, `--output-format`), `--allowedTools`/`--disallowedTools`, agent teams, `--verbose`, Linux.

**Shared configuration**: Desktop and CLI read the same files: CLAUDE.md, MCP servers (via `~/.claude.json` or `.mcp.json`), hooks, skills, and settings. Your CLI setup carries over automatically.

> **Migration tip**: run `/desktop` in the terminal to move an active CLI session into the Desktop app. On macOS and Windows only.

> **Note on MCP servers**: MCP servers configured in `claude_desktop_config.json` (the Chat tab) are separate from Claude Code. To use MCP servers in the Code tab, configure them in `~/.claude.json` or your project's `.mcp.json`. See [Section 8.1: MCP](#81-what-is-mcp).

> **Full reference**: [code.claude.com/docs/en/desktop](https://code.claude.com/docs/en/desktop)

---

### Platform-Specific Paths

| Platform | Global Config Path | Shell Config |
|----------|-------------------|--------------|
| **macOS/Linux** | `~/.claude/` | `~/.zshrc` or `~/.bashrc` |
| **Windows** | `%USERPROFILE%\.claude\` | PowerShell profile |

> **Windows Users**: Throughout this guide, when you see `~/.claude/`, use `%USERPROFILE%\.claude\` or `C:\Users\YourName\.claude\` instead.

### First Launch

```bash
cd your-project
claude
```

On first launch:

1. You'll be prompted to authenticate with your Anthropic account
2. Accept the terms of service
3. Claude Code will index your project (may take a few seconds for large codebases)

> **Note**: Claude Code requires an active Anthropic subscription. See [claude.com/pricing](https://claude.com/pricing) for current plans and token limits.

## 1.2 First Workflow

Let's fix a bug together. This demonstrates the core interaction loop.

### Step 1: Describe the Problem

```
You: There's a bug in the login function - users can't log in with email addresses containing a plus sign
```

### Step 2: Claude Analyzes

Claude will:
- Search your codebase for relevant files
- Read the login-related code
- Identify the issue
- Propose a fix

### Step 3: Review the Diff

```diff
- const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
+ const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
```

💡 **Critical**: Always read the diff before accepting. This is your safety net.

### Step 4: Accept or Reject

- Press `y` to accept the change
- Press `n` to reject and ask for alternatives
- Press `e` to edit the change manually

### Step 5: Verify

```
You: Run the tests to make sure this works
```

Claude will run your test suite and report results.

### Step 6: Commit (Optional)

```
You: Commit this fix
```

Claude will create a commit with an appropriate message.

## 1.3 Essential Commands

These 7 commands are the ones I use most frequently:

| Command | Action | When to Use |
|---------|--------|-------------|
| `/help` | Show all commands | When you're lost |
| `/clear` | Clear conversation | Start fresh |
| `/compact` | Summarize context | Running low on context |
| `/status` | Show session info | Check context usage |
| `/exit` or `Ctrl+D` | Exit Claude Code | Done working |
| `/plan` | Enter Plan Mode | Safe exploration |
| `/rewind` | Undo changes | Made a mistake |
| `/voice` | Toggle voice input | Speak instead of type |

### Quick Actions & Shortcuts

| Shortcut | Action | Example |
|----------|--------|---------|
| `!command` | Run shell command directly | `!git status`, `!npm test` |
| `@file.ts` | Reference a specific file | `@src/app.tsx`, `@README.md` |
| `Ctrl+C` | Cancel current operation | Stop long-running analysis |
| `Ctrl+R` | Search command history | Find previous prompts |
| `Esc` | Stop Claude mid-action | Interrupt current operation |

## 本篇目录

- [Shell Commands with !](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/01-Shell_Commands_with.md)
- [File References with @](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/02-File_References_with.md)
- [Working with Images and Screenshots](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/03-Working_with_Images_and_Screenshots.md)
- [Session Continuation and Resume](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/04-Session_Continuation_and_Resume.md)
- [Approach A: CLAUDE.md behavioral instruction (mid-session)](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/05-Approach_A_CLAUDE.md_behavioral_instruct.md)
- [Approach B: SessionEnd hook (automatic, AI-generated)](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/06-Approach_B_SessionEnd_hook_automatic_AI-.md)
- [Using both together](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/07-Using_both_together.md)
- [Pricing comparison (March 2026)](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/08-Pricing_comparison_March_2026.md)
- [What Copilot Does Well](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/09-What_Copilot_Does_Well.md)
- [What Claude Code Does Better](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/10-What_Claude_Code_Does_Better.md)
- [Hybrid Approach (Recommended)](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/11-Hybrid_Approach_Recommended.md)
- [What Cursor Does Well](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/12-What_Cursor_Does_Well.md)
- [What Claude Code Does Better](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/13-What_Claude_Code_Does_Better.md)
- [When to Switch](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/14-When_to_Switch.md)
- [Running Both](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/15-Running_Both.md)
- [Week 1: Learning Phase](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/16-Week_1_Learning_Phase.md)
- [Week 2: Establishing Workflow](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/17-Week_2_Establishing_Workflow.md)
- [Week 3-4: Advanced Usage](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/18-Week_3-4_Advanced_Usage.md)
- [The Problem: Context Rot](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/19-The_Problem_Context_Rot.md)
- [The Pattern](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/20-The_Pattern.md)
- [When to Use](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/21-When_to_Use.md)
- [Practical Implementation](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/22-Practical_Implementation.md)
- [Task Definition Template](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/23-Task_Definition_Template.md)
- [Key Insight](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/24-Key_Insight.md)
- [Pricing Model (as of July 2026)](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/25-Pricing_Model_as_of_July_2026.md)
- [200K vs 1M Context: Performance, Cost & Use Cases](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/26-200K_vs_1M_Context_Performance_Cost_Use_.md)
- [What Costs the Most?](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/27-What_Costs_the_Most.md)
- [Cost Optimization Strategies](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/28-Cost_Optimization_Strategies.md)
- [How Claude Code Handles Caching Automatically](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/29-How_Claude_Code_Handles_Caching_Automati.md)
- [Tracking Costs](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/30-Tracking_Costs.md)
- [Cost vs. Value](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/31-Cost_vs._Value.md)
- [Cost-Conscious Workflows](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/32-Cost-Conscious_Workflows.md)
- [Red Flags (Cost Waste Indicators)](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/33-Red_Flags_Cost_Waste_Indicators.md)
- [Subscription Plans & Limits](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/34-Subscription_Plans_Limits.md)
- [Escalating to Fable 5](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/35-Escalating_to_Fable_5.md)
- [Tasks API (v2.1.16+)](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/36-Tasks_API_v2.1.16.md)
- [TodoWrite (Legacy)](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/37-TodoWrite_Legacy.md)
- [Best Practices](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/38-Best_Practices.md)
- [Task Lists as Diagnostic Tool](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/39-Task_Lists_as_Diagnostic_Tool.md)
- [Complete Workflow](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/40-Complete_Workflow.md)
- [Sources](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/41-Sources.md)
- [Going further: capitalizing solutions across PRs](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/42-Going_further_capitalizing_solutions_acr.md)
- [The Compound Engineering philosophy (Every.to)](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/43-The_Compound_Engineering_philosophy_Ever.md)
- [Brainstorm-before-planning](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/44-Brainstorm-before-planning.md)
- [The Documentation Hierarchy as Project Memory](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/45-The_Documentation_Hierarchy_as_Project_M.md)
- [Configuration Hierarchy](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/46-Configuration_Hierarchy.md)
- [Git Strategy for Project Configuration](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/47-Git_Strategy_for_Project_Configuration.md)
- [Version Control for Global Config (~/.claude/)](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/48-Version_Control_for_Global_Config_.claud.md)
- [Backup Strategies](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/49-Backup_Strategies.md)
- [Multi-Machine Sync](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/50-Multi-Machine_Sync.md)
- [Security Considerations](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/51-Security_Considerations.md)
- [Disaster Recovery](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/52-Disaster_Recovery.md)
- [Community Solutions](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/53-Community_Solutions.md)
- [Detailed Comparison](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/54-Detailed_Comparison.md)
- [Decision Tree: Which to Use?](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/55-Decision_Tree_Which_to_Use.md)
- [Common Patterns](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/56-Common_Patterns.md)
- [Skills and Subagents](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/57-Skills_and_Subagents.md)
