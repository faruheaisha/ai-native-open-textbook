---
title: "Module 01: Installation & Setup"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/learning-path/01-installation.md"
sourceRel: "guide/learning-path/01-installation.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/learning-path/01-installation.md"
sourceSha256: "59036fab18160804d5a00f46120a2b575d1c99ce4fee1d64990494832212ccee"
pageSha256: "59036fab18160804d5a00f46120a2b575d1c99ce4fee1d64990494832212ccee"
contentMode: "local-full"
zh: ""
---

# Module 01: Installation & Setup

## Goal

Get Claude Code installed and running on your system. Verify it works with your first command.

---

## What You'll Learn

- Install Claude Code for your platform (macOS / Linux / Windows)
- Understand the basic prompt → response loop
- Run your first command
- Access the help system

---

## Installation

### macOS (Recommended)

```bash
brew install anthropic/tap/claude-code
```

Verify:
```bash
claude --version
```

### Linux

```bash
curl -sSL https://dl.claudecode.com/install.sh | bash
```

Verify:
```bash
claude --version
```

### Windows

Download the installer from https://dl.claudecode.com/windows or use:

```powershell
iex ((New-Object System.Net.WebClient).DownloadString('https://dl.claudecode.com/install.ps1'))
```

### Docker (Any Platform)

```bash
docker run -it anthropic/claude-code:latest
```

---

## First Run

Navigate to any project directory and start Claude:

```bash
cd ~/my-project
claude
```

You'll see:

```
Claude Code v2.x.x ready
Project: ~/my-project (git: main)
Context: 0% · Tokens available: 200,000

Type /help for commands or ask me anything
>
```

---

## Essential Commands

| Command | Purpose |
|---------|---------|
| `/help` | Show all available commands |
| `/status` | Check context usage and session state |
| `/clear` | Start fresh (clears conversation history) |
| `Ctrl+C` | Cancel the current operation |
| `/exit` | Close Claude Code |

---

## Your First 5 Minutes

### Exercise 1: View Available Commands
```bash
/help
```

Review the command list. Notice:
- **Workflow**: `/plan`, `/rewind`, `/think`
- **Navigation**: `/goto`, `/read`
- **Memory**: memory loading at startup
- **Advanced**: `/model`, `/mode`

### Exercise 2: Check Session State
```bash
/status
```

You'll see:
- Context usage percentage
- Available tokens
- Current project
- Git branch

### Exercise 3: Ask Claude Something

```
What files are in my project?
```

Claude will read the project structure and respond. This is the core loop:

```
Your prompt → Claude reads files → Claude suggests changes → You review → Apply
```

### Exercise 4: Review a Suggested Change

If Claude suggests code changes, you'll see:
1. A description of the change
2. A `diff` view (what's being added/removed)
3. A prompt to accept or reject

**Rule**: Always review diffs before accepting. This protects you from unexpected changes.

---

## The Core Concept: The Loop

Every interaction follows this pattern:

```
┌─────────────┐
│ You ask     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Claude      │
│ reads files │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Claude      │
│ suggests    │
│ changes     │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│ You review diff  │
│ and approve      │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Changes applied  │
│ to your files    │
└──────────────────┘
```

---

## Key Concepts

### Sessions

Each time you run `claude`, you start a new **session**. A session is a conversation with Claude that persists while you're using Claude Code.

- Sessions are **not saved** by default (they end when you exit)
- Sessions are **scoped to one project** at a time
- Your context grows as you ask more questions (max ~200K tokens)

### Context

**Context** is how much of the conversation Claude remembers. It's shown as a percentage (0-100%).

- 0-50%: Plenty of room, work freely
- 50-70%: Be selective, `/compact` optional
- 70%+: Run `/compact` to free space
- 90%+: You'll be forced to clean up

### Git Awareness

Claude Code is **git-aware**. It:
- Detects your current branch
- Shows uncommitted changes
- Helps with commits and reviews
- Prevents accidental breaking changes

---

## Validation: You're Ready If...

✓ You can run `claude --version` and see your installed version
✓ You can start Claude in a project with `claude`
✓ You understand the prompt → response loop
✓ You can see `/status` and understand what it shows
✓ You've reviewed at least one diff from Claude

---

## What's Next?

Once you're comfortable with this module, move to **Module 02: Core Loop** to understand:
- How Claude reads your project
- How context works in depth
- How to structure requests for better results
- Planning mode and thinking modes

**Time to next module**: Ready immediately (no prerequisites beyond running Claude once)

---

## Troubleshooting

### "claude: command not found"
Your installation didn't complete. Try:
- **macOS**: `brew install anthropic/tap/claude-code` again
- **Linux**: Re-run the install script
- **Windows**: Download the installer from https://dl.claudecode.com/windows

### "Project not found"
Make sure you're in a directory with a `package.json`, `.git`, or other project file. Claude Code works best in projects.

### "Permission denied" (macOS)
Try:
```bash
chmod +x /usr/local/bin/claude
```

---

## Resources

- **Official Docs**: https://code.claude.com/docs
- **FAQ**: See `guide/ultimate-guide.md` Appendix B
- **Examples**: `examples/` directory in this guide

---

**Completed Module 01?** → Ready for [Module 02: Core Loop](/lib/09-harness/claude-code-ultimate-guide/guide-learning-path-02-core-loop)
