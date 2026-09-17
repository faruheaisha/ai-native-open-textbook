---
title: "Manual Testing Guide for Module 1 Solution"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/projects/unit3/build-mcp-server/solution/manual_test.md"
sourceRel: "projects/unit3/build-mcp-server/solution/manual_test.md"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/projects/unit3/build-mcp-server/solution/manual_test.md"
sourceSha256: "a80eae3b4e095b5e15060c2105eb822c7147b6fbabba1aea237d84ce52c6ee57"
pageSha256: "a80eae3b4e095b5e15060c2105eb822c7147b6fbabba1aea237d84ce52c6ee57"
contentMode: "local-full"
zh: ""
---

# Manual Testing Guide for Module 1 Solution

## Prerequisites

1. Ensure you're in a git repository with some changes
2. Install uv following instructions at: https://docs.astral.sh/uv/getting-started/installation/
3. Install dependencies:
   ```bash
   uv sync --all-extras
   ```

## Test 1: Validate the Solution

Run the automated validation script:
```bash
uv run python validate_solution.py
```

This will check:
- Git environment
- Python imports
- Server creation
- Tool registration
- Tool execution
- Template creation

## Test 2: Run Unit Tests

```bash
uv run pytest test_server.py -v
```

## Test 3: Test with Claude Code

1. **Configure MCP Server**
   
   Add the server to Claude Code:
   ```bash
   # Add the MCP server
   claude mcp add pr-agent -- uv --directory /absolute/path/to/module1/solution run server.py
   
   # Verify it's configured
   claude mcp list
   ```

2. **Restart Claude Code** to pick up the new server

3. **Make Some Git Changes**
   
   In any git repository:
   ```bash
   echo "test change" >> README.md
   git add README.md
   ```

4. **Test with Claude**
   
   Ask Claude:
   - "Can you analyze my git changes?"
   - "What PR templates are available?"
   - "Based on my changes, which PR template should I use?"

## Test 4: Direct Server Testing

You can also test the server directly:

```python
import asyncio
from server import analyze_file_changes, get_pr_templates, suggest_template

async def test():
    # Test analyze_file_changes
    changes = await analyze_file_changes("main", True)
    print("Changes:", changes[:200] + "...")
    
    # Test get_pr_templates
    templates = await get_pr_templates()
    print("Templates available:", len(json.loads(templates)))
    
    # Test suggest_template
    suggestion = await suggest_template(
        "Fixed authentication bug", 
        "bug"
    )
    print("Suggestion:", json.loads(suggestion)["recommended_template"]["type"])

asyncio.run(test())
```

## Expected Behavior

1. **analyze_file_changes** should return JSON with:
   - base_branch
   - files_changed
   - statistics
   - commits
   - diff (if include_diff=True)

2. **get_pr_templates** should return JSON array of templates with:
   - filename
   - type
   - content

3. **suggest_template** should return JSON with:
   - recommended_template
   - reasoning
   - template_content
   - usage_hint

## Troubleshooting

- **"Git not found"**: Ensure you're in a git repository
- **Import errors**: Check virtual environment is activated
- **MCP connection failed**: Verify the path in the claude mcp add command is absolute
- **No tools showing**: Restart Claude Code after adding the server
