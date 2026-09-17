---
title: "Day 0 — Claude Code Setup"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tutorial/day0/README.md"
sourceRel: "tutorial/day0/README.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/tutorial/day0/README.md"
sourceSha256: "ce1619900df079e4631ef3cda571603e024349dfbfcc686510922a212e40d9f7"
pageSha256: "ce1619900df079e4631ef3cda571603e024349dfbfcc686510922a212e40d9f7"
contentMode: "local-full"
zh: ""
---

# Day 0 — Claude Code Setup

This guide walks you through installing Claude Code on your machine and authenticating so you can start using it.

## Step 1: Install Claude Code

Choose your operating system:

| OS | Guide |
|----|-------|
| Windows | [windows.md](/lib/09-harness/claude-code-best-practice/tutorial-day0-windows) |
| Linux | [linux.md](/lib/09-harness/claude-code-best-practice/tutorial-day0-linux) |
| macOS | [mac.md](/lib/09-harness/claude-code-best-practice/tutorial-day0-mac) |

Follow the guide for your OS, then come back here for authentication.

---

## Step 2: Verify Installation

After following your OS-specific guide, confirm everything is working:

```bash
node --version    # Should show v18.x or higher
claude --version  # Should show the installed Claude Code version
```

---

## Step 3: Login

<img src="/mirror/ea/eace0d3ff60522617e89b4ea49f80090c3734441.png" alt="Claude Code login screen" width="50%">

Run `claude` in your terminal. On first launch, it will ask you to choose a login method.

### Method 1: Subscription (Claude Pro / Max)

- Select **Claude.ai account**
- Browser opens — sign in and authorize
- Return to terminal, you're logged in

### Method 2a: API Key (Team Invite)

Your team admin invites you from the Anthropic dashboard.

- You receive an **invite email** — accept it and create your Anthropic account
- Run `claude` in your terminal
- Select **Anthropic API Key**
- Your key is **auto-generated** on the dashboard — no manual setup needed
- Claude Code starts working immediately

### Method 2b: API Key (You have the key)

If someone shared the key with you (via Slack, email, etc.) or you created your own:

- Run `claude` in your terminal
- Select **Anthropic API Key**
- Paste your key (starts with `sk-ant-`)
- The key is **stored permanently** — you won't be asked again
