---
title: "Custom HTTP Client Factory Example"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/mcp/streamablehttp_custom_client_example/README.md"
sourceRel: "examples/mcp/streamablehttp_custom_client_example/README.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/mcp/streamablehttp_custom_client_example/README.md"
sourceSha256: "c90a7887bd2f9b5875e94453e38ec043239aa3fc70c3628fdd895a43df9c4ff5"
pageSha256: "c90a7887bd2f9b5875e94453e38ec043239aa3fc70c3628fdd895a43df9c4ff5"
contentMode: "local-full"
zh: ""
---

# Custom HTTP Client Factory Example

This repository example targets MCP Python SDK v2 and `httpx2`, and is intended to run with the repository's locked development environment. The Agents SDK client itself supports MCP v1 with `httpx` and MCP v2 with `httpx2`.

This example demonstrates how to use the new `httpx_client_factory` parameter in `MCPServerStreamableHttp` to configure custom HTTP client behavior for MCP StreamableHTTP connections.

## Features Demonstrated

- **Custom SSL Configuration**: Configure SSL certificates and verification settings
- **Custom Headers**: Add custom headers to all HTTP requests
- **Custom Timeouts**: Set custom timeout values for requests
- **Proxy Configuration**: Configure HTTP proxy settings
- **Custom Retry Logic**: Set up custom retry behavior (through httpx configuration)

## Running the Example

1. Make sure you have `uv` installed: https://docs.astral.sh/uv/getting-started/installation/

2. Run the example:
   ```bash
   cd examples/mcp/streamablehttp_custom_client_example
   uv run main.py
   ```

## Code Examples

### Basic Custom Client

```python
import httpx2
from agents.mcp import MCPServerStreamableHttp

def create_custom_http_client() -> httpx2.AsyncClient:
    return httpx2.AsyncClient(
        verify=False,  # Disable SSL verification for testing
        timeout=httpx2.Timeout(60.0, read=120.0),
        headers={"X-Custom-Client": "my-app"},
    )

async with MCPServerStreamableHttp(
    name="Custom Client Server",
    params={
        "url": "http://localhost:<port>/mcp",
        "httpx_client_factory": create_custom_http_client,
    },
) as server:
    # Use the server...
```

## Use Cases

- **Corporate Networks**: Configure proxy settings for corporate environments
- **SSL/TLS Requirements**: Use custom SSL certificates for secure connections
- **Custom Authentication**: Add custom headers for API authentication
- **Network Optimization**: Configure timeouts and connection pooling
- **Debugging**: Disable SSL verification for development environments

## Benefits

- **Flexibility**: Configure HTTP client behavior to match your network requirements
- **Security**: Use custom SSL certificates and authentication methods
- **Performance**: Optimize timeouts and connection settings for your use case
- **Compatibility**: Work with corporate proxies and network restrictions

This example will auto-pick a free localhost port unless you set `STREAMABLE_HTTP_PORT`; use `STREAMABLE_HTTP_HOST` to change the bind address.
