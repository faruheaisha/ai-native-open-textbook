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
pageSha256: "4c1798a25f1ec9ff567f640c1ce7a498ab5323efba8901010bdb30edd07d1b53"
contentMode: "local-full"
zh: ""
---

## Error handling

The following example wraps a `query()` call in handlers for four of the [error types](#error-types) the SDK raises.

This example catches [`ResultError`](#resulterror), which requires Python Agent SDK 0.2.140 or later.

```python theme={null}
import asyncio

from claude_agent_sdk import (
    query,
    CLINotFoundError,
    ProcessError,
    ResultError,
    CLIJSONDecodeError,
)

async def main():
    try:
        async for message in query(prompt="Hello"):
            print(message)
    except CLINotFoundError:
        print(
            "Claude Code CLI not found. Try reinstalling: pip install --force-reinstall claude-agent-sdk"
        )
    # Catch ResultError before ProcessError, which it subclasses. Its message
    # carries the error text. A failed final request, such as an API error,
    # arrives with subtype "success", so branch on terminal_reason first.
    except ResultError as e:
        if e.terminal_reason == "api_error":
            print(f"API request failed: {e}")
        else:
            print(f"Query ended with an error result ({e.terminal_reason or e.subtype}): {e}")
    except ProcessError as e:
        print(f"Process failed with exit code: {e.exit_code}")
    except CLIJSONDecodeError as e:
        print(f"Failed to parse response: {e}")

asyncio.run(main())
```
