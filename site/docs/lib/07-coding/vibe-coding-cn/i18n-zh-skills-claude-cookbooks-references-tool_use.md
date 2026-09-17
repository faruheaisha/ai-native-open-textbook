---
title: "Tool Use with Claude"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-cookbooks/references/tool_use.md"
sourceRel: "i18n/zh/skills/claude-cookbooks/references/tool_use.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/claude-cookbooks/references/tool_use.md"
sourceSha256: "d094dc53c95e9c49a3fe75fe814164136c0c73c5725bf74eb3ebc1e2c4cd4e0d"
pageSha256: "d094dc53c95e9c49a3fe75fe814164136c0c73c5725bf74eb3ebc1e2c4cd4e0d"
contentMode: "local-full"
zh: ""
---

# Tool Use with Claude

Source: anthropics/claude-cookbooks/tool_use

## Overview

Learn how to integrate Claude with external tools and functions to extend its capabilities.

## Key Examples

### Customer Service Agent
- **Location**: `tool_use/customer_service_agent.ipynb`
- **Description**: Build an intelligent customer service agent using Claude with tool integration
- **Key Concepts**: Function calling, state management, conversation flow

### Calculator Integration
- **Location**: `tool_use/calculator_tool.ipynb`
- **Description**: Integrate external calculation tools with Claude
- **Key Concepts**: Tool definitions, parameter passing, result handling

### Memory Demo
- **Location**: `tool_use/memory_demo/`
- **Description**: Implement persistent memory for Claude conversations
- **Key Concepts**: Context management, state persistence

## Best Practices

1. **Tool Definition**: Define clear, specific tool schemas
2. **Error Handling**: Implement robust error handling for tool calls
3. **Validation**: Validate tool inputs and outputs
4. **Context**: Maintain context across tool interactions

## Common Patterns

```python
# Tool definition example
tools = [{
    "name": "calculator",
    "description": "Performs basic arithmetic operations",
    "input_schema": {
        "type": "object",
        "properties": {
            "operation": {"type": "string"},
            "a": {"type": "number"},
            "b": {"type": "number"}
        },
        "required": ["operation", "a", "b"]
    }
}]
```

## Related Resources

- [Anthropic Tool Use Documentation](https://docs.claude.com/claude/docs/tool-use)
- [API Reference](https://docs.claude.com/claude/reference)
