---
title: "Module 1: Basic MCP Server - Starter Code"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/projects/unit3/build-mcp-server/starter/README.md"
sourceRel: "projects/unit3/build-mcp-server/starter/README.md"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/projects/unit3/build-mcp-server/starter/README.md"
sourceSha256: "7b3679ea92849a60beed94a8f1a5954c21c5dc1191cfd81613edc963afefe631"
pageSha256: "7b3679ea92849a60beed94a8f1a5954c21c5dc1191cfd81613edc963afefe631"
contentMode: "local-full"
zh: ""
---

# Module 1: Basic MCP Server - Starter Code

Welcome to Module 1! In this module, you'll build a basic MCP server that helps developers create better pull requests by analyzing code changes and suggesting appropriate templates.

## Your Task

Implement an MCP server with three tools:

1. **analyze_file_changes** - Retrieve git diff information and changed files
2. **get_pr_templates** - List available PR templates 
3. **suggest_template** - Allow Claude to suggest the most appropriate template

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

### 3. Start implementing!

Open `server.py` and follow the TODO comments to implement each tool.

**Note**: The starter code includes stub implementations that return "Not implemented" errors. This allows you to:
- Run the server immediately
- Test your setup with Claude
- Replace each stub with your actual implementation
- See helpful hints about what each tool should do

## Design Philosophy

Instead of using rigid rules based on file extensions or patterns, your tools should provide Claude with raw git data and let Claude's intelligence determine:
- What type of change is being made
- Which template is most appropriate
- How to customize the template for the specific changes

## Testing Your Implementation

1. Run the unit tests:
   ```bash
   uv run pytest test_server.py -v
   ```

2. Configure the MCP server in Claude Code:
   ```bash
   # Add the MCP server
   claude mcp add pr-agent -- uv --directory /absolute/path/to/module1/starter run server.py
   
   # Verify it's configured
   claude mcp list
   ```

3. Make some changes in a git repository and ask Claude to analyze your changes and suggest a PR template

## Need Help?

- Check the solution in `../solution/` if you get stuck
- Remember: The goal is to give Claude the data it needs, not to implement complex logic yourself
