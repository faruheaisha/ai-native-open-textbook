---
title: "Extension User Guide"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/EXTENSION-USER-GUIDE.md"
sourceRel: "extensions/EXTENSION-USER-GUIDE.md"
rawUrl: "/raw/07-coding/spec-kit/extensions/EXTENSION-USER-GUIDE.md"
sourceSha256: "a4767facca660ac3eac08765f91aba2cafb9bca8abada20323e58631f87d26ce"
pageSha256: "a4767facca660ac3eac08765f91aba2cafb9bca8abada20323e58631f87d26ce"
contentMode: "local-full"
zh: ""
---

# Extension User Guide

Complete guide for using Spec Kit extensions to enhance your workflow.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Finding Extensions](#finding-extensions)
4. [Installing Extensions](#installing-extensions)
5. [Using Extensions](#using-extensions)
6. [Managing Extensions](#managing-extensions)
7. [Configuration](#configuration)
8. [Troubleshooting](#troubleshooting)
9. [Best Practices](#best-practices)

---

## Introduction

### What are Extensions?

Extensions are modular packages that add new commands and functionality to Spec Kit without bloating the core framework. They allow you to:

- **Integrate** with external tools (Jira, Linear, GitHub, etc.)
- **Automate** repetitive tasks with hooks
- **Customize** workflows for your team
- **Share** solutions across projects

### Why Use Extensions?

- **Clean Core**: Keeps spec-kit lightweight and focused
- **Optional Features**: Only install what you need
- **Community Driven**: Anyone can create and share extensions
- **Version Controlled**: Extensions are versioned independently

---

## Getting Started

### Prerequisites

- Spec Kit version 0.1.0 or higher
- A spec-kit project (directory with `.specify/` folder)

### Check Your Version

```bash
specify version
# Should show 0.1.0 or higher
```

### First Extension

Let's install the Jira extension as an example:

```bash
# 1. Search for the extension
specify extension search jira

# 2. Get detailed information
specify extension info jira

# 3. Install it
specify extension add jira

# 4. Configure it
vim .specify/extensions/jira/jira-config.yml

# 5. Use it
# (Commands are now available in Claude Code)
/speckit.jira.specstoissues
```

---

## Finding Extensions

`specify extension search` searches **all active catalogs** simultaneously, including the community catalog by default. Results are annotated with their source catalog and install status.

### Browse All Extensions

```bash
specify extension search
```

Shows all extensions across all active catalogs (default and community by default).

### Search by Keyword

```bash
# Search for "jira"
specify extension search jira

# Search for "issue tracking"
specify extension search issue
```

### Filter by Tag

```bash
# Find all issue-tracking extensions
specify extension search --tag issue-tracking

# Find all Atlassian tools
specify extension search --tag atlassian
```

### Filter by Author

```bash
# Extensions by Stats Perform
specify extension search --author "Stats Perform"
```

### Show Verified Only

```bash
# Only show verified extensions
specify extension search --verified
```

### Get Extension Details

```bash
# Detailed information
specify extension info jira
```

Shows:

- Description
- Requirements
- Commands provided
- Hooks available
- Links (documentation, repository, changelog)
- Installation status

---

## Installing Extensions

### Install from Catalog

```bash
# By name (from catalog)
specify extension add jira
```

This will:

1. Download the extension from GitHub
2. Validate the manifest
3. Check compatibility with your spec-kit version
4. Install to `.specify/extensions/jira/`
5. Register commands with your coding agent
6. Create config template

### Install from URL

```bash
# From GitHub release
