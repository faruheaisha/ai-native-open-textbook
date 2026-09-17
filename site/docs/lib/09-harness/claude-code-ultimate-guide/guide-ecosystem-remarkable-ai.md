---
title: "reMarkable 2 + AI: Complete Mapping of Hacks, Tools, and Workflows"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/remarkable-ai.md"
sourceRel: "guide/ecosystem/remarkable-ai.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/remarkable-ai.md"
sourceSha256: "c246b6d978250fe2a7a7699d10d88b6a3dc2d73d189493b37527d2bfedf2fd21"
pageSha256: "c246b6d978250fe2a7a7699d10d88b6a3dc2d73d189493b37527d2bfedf2fd21"
contentMode: "local-full"
zh: ""
---

# reMarkable 2 + AI: Complete Mapping of Hacks, Tools, and Workflows

> **Last verified**: February 2026

The reMarkable 2 is a full-root-access Linux e-ink tablet. Its zero-distraction philosophy makes it a thinking tool, but its native integrations are minimal. This page covers everything that exists to augment it with AI, from the simplest to the most technical.

See also: [AI Ecosystem](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-ai-ecosystem/index) for the broader mapping of the AI ecosystem (beyond hardware).

## Table of Contents

1. [remarkable-mcp: direct MCP access via SSH](#1-remarkable-mcp-direct-mcp-access-via-ssh)
2. [Ghostwriter: Vision-LLM Interface](#2-ghostwriter-vision-llm-interface)
3. [Sync reMarkable → Obsidian](#3-sync-remarkable--obsidian)
4. [OCR + Custom AI Pipeline](#4-ocr--custom-ai-pipeline)
5. [SSH Access and Community Tools](#5-ssh-access-and-community-tools)
6. [Underused Native Features](#6-underused-native-features)
7. [Official API and Developer Portal](#7-official-api-and-developer-portal)
8. [Zapier Automation](#8-zapier-automation)
9. [Read-it-later: Web to reMarkable](#9-read-it-later-web-to-remarkable)
10. [Meeting Notes → AI Summary](#10-meeting-notes--ai-summary)
11. [Zotero to reMarkable (research)](#11-zotero-to-remarkable-research)
12. [Screen sharing as an AI-assisted whiteboard](#12-screen-sharing-as-an-ai-assisted-whiteboard)
13. [Custom apps and fun hacks](#13-custom-apps-and-fun-hacks)
14. [AI-augmented workflows to build](#14-ai-augmented-workflows-to-build)
15. [Where to start](#15-where-to-start)

---

## 1. remarkable-mcp: direct MCP access via SSH

**ROI: maximal | Effort: medium | Connection: SSH over USB (no cloud)**

Sam Morrow created an **MCP server** that connects the reMarkable directly to Claude Code, VS Code Copilot, and any MCP-compatible AI assistant.

| Attribute | Details |
|---------|---------|
| **Repo** | https://github.com/SamMorrowDrums/remarkable-mcp |
| **Blog** | https://sam-morrow.com/blog/building-an-mcp-server-for-remarkable |
| **Connection** | SSH over USB (no cloud, no subscription) |
| **Language** | Python (FastMCP) |

### What it does

- **Native extraction of typed text** (Type Folio / virtual keyboard), instant, no OCR
- **Handwriting OCR** via Google Cloud Vision (1000 free requests/month)
- **Smart search** across your entire library
- **Text extraction** from PDF and EPUB, plus annotations
- **Full traversal** of documents

### Why it's #1

You can ask Claude "what did I note about X during the January 15 meeting?" It will search through your handwritten notes. The reMarkable becomes a **queryable second brain**.

### Technical stack

```
FastMCP + rmscene (native .rm parsing) + PyMuPDF (PDF)
+ Google Cloud Vision (OCR) + Paramiko (SSH)
```

### Quick installation

```bash
# 1. Enable SSH on the reMarkable
# Settings → Help → Copyrights and licenses → IP + root password

# 2. Clone the repo
git clone https://github.com/SamMorrowDrums/remarkable-mcp
cd remarkable-mcp && pip install -e .

# 3. Add to Claude Code
# In ~/.claude.json or via "claude mcp add"
```

### Configuration in Claude Code

```json
{
  "mcpServers": {
    "remarkable": {
      "command": "python",
      "args": ["-m", "remarkable_mcp"],
      "env": {
        "REMARKABLE_HOST": "10.11.99.1",
