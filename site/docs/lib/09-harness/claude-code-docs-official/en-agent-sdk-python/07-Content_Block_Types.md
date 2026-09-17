---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/agent-sdk/python.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-sdk/python.md"
sourceSha256: "f49fb09963fda69499dc97a835a8db4970f3cd3070dff7f68ae6b644bd544987"
pageSha256: "c7a162dcda0e4f8ddb8166dfa3e9f0cf3f4d28448f23fa45b1888a1caedbbd51"
contentMode: "local-full"
zh: ""
---

## Content Block Types

### `ContentBlock`

Union type of all content blocks.

```python theme={null}
ContentBlock = TextBlock | ThinkingBlock | ToolUseBlock | ToolResultBlock
```

### `TextBlock`

Text content block.

```python theme={null}
@dataclass
class TextBlock:
    text: str
```

### `ThinkingBlock`

Thinking content block (for models with thinking capability).

```python theme={null}
@dataclass
class ThinkingBlock:
    thinking: str
    signature: str
```

### `ToolUseBlock`

Tool use request block.

```python theme={null}
@dataclass
class ToolUseBlock:
    id: str
    name: str
    input: dict[str, Any]
```

### `ToolResultBlock`

Tool execution result block.

```python theme={null}
@dataclass
class ToolResultBlock:
    tool_use_id: str
    content: str | list[dict[str, Any]] | None = None
    is_error: bool | None = None
```
