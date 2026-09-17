---
title: "Module 1: Basic MCP Server with PR Template Tools"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/projects/unit3/build-mcp-server/solution/README.md"
sourceRel: "projects/unit3/build-mcp-server/solution/README.md"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/projects/unit3/build-mcp-server/solution/README.md"
sourceSha256: "0e2abc1eba1cf3df969655cd1677f2591488504b76e8599c908e64a6a7b75c1f"
pageSha256: "0e2abc1eba1cf3df969655cd1677f2591488504b76e8599c908e64a6a7b75c1f"
contentMode: "local-full"
zh: ""
---

# Module 1: Basic MCP Server with PR Template Tools

This module implements a basic MCP server that provides tools for analyzing git changes and suggesting appropriate PR templates.

## Setup

### 1. Install uv

Follow the official installation instructions at: https://docs.astral.sh/uv/getting-started/installation/

### 2. Install dependencies

```bash
# Install all dependencies
uv sync

# Or install with dev dependencies for testing
uv sync --all-extras
```

### 3. Configure the MCP Server

Add the server to Claude Code:

```bash
# Add the MCP server
claude mcp add pr-agent -- uv --directory /absolute/path/to/module1/solution run server.py

# Verify it's configured
claude mcp list
```

## Tools Available

1. **analyze_file_changes** - Get the full diff and list of changed files
2. **get_pr_templates** - List available PR templates with their content
3. **suggest_template** - Let Claude analyze changes and suggest a template

## Usage Example

1. Make some changes in a git repository
2. Ask Claude: "Can you analyze my changes and suggest a PR template?"
3. Claude will:
   - Use `analyze_file_changes` to see what changed
   - Analyze the diff to understand the nature of changes
   - Use `suggest_template` to recommend the most appropriate template
   - Help you fill out the template based on the specific changes

## How It Works

Unlike traditional template systems that rely on file extensions or simple patterns, this MCP server provides Claude with raw git data and lets Claude's intelligence determine:
- What type of change is being made (bug fix, feature, refactor, etc.)
- Which template is most appropriate
- How to fill out the template based on the actual code changes

This approach leverages Claude's understanding of code and context rather than rigid rules.

## Running Tests

```bash
# Run the validation script
uv run python validate_solution.py

# Run unit tests
uv run pytest test_server.py -v
```

## Running the Server Directly

```bash
# Start the MCP server
uv run server.py
```
