---
title: "{{ cookiecutter.apidisplayname }} MCP Server"
sourceId: "07-coding/fastcampus-ai-agent-vibecoding"
sourceTitle: "FastCampus AI Agent 바이브코딩 강의"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding"
entryUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/Part6_바이브코딩과_AI_agent_best_practice/data-go-mcp-servers/template/{{cookiecutter.api_name}}/README.md"
sourceRel: "Part6_바이브코딩과_AI_agent_best_practice/data-go-mcp-servers/template/{{cookiecutter.api_name}}/README.md"
rawUrl: "/raw/07-coding/fastcampus-ai-agent-vibecoding/Part6_바이브코딩과_AI_agent_best_practice/data-go-mcp-servers/template/{{cookiecutter.api_name}}/README.md"
sourceSha256: "5fb9bcd2469b88d87c96c6224fdeb6395987e35bd0d1b9626f22a086dd963bbd"
pageSha256: "5fb9bcd2469b88d87c96c6224fdeb6395987e35bd0d1b9626f22a086dd963bbd"
contentMode: "local-full"
zh: ""
---

# &#123;&#123; cookiecutter.api_display_name &#125;&#125; MCP Server

&#123;&#123; cookiecutter.api_description &#125;&#125;

## Overview

This MCP server provides access to the &#123;&#123; cookiecutter.api_korean_name &#125;&#125; API from Korea's data.go.kr portal through the Model Context Protocol.

## Installation

### Via PyPI

```bash
pip install data-go-mcp.{{ cookiecutter.api_name }}
```

### Via UV

```bash
uvx data-go-mcp.{{ cookiecutter.api_name }}
```

## Configuration

### Getting an API Key

1. Visit [data.go.kr](https://www.data.go.kr)
2. Sign up for an account
3. Search for "&#123;&#123; cookiecutter.api_korean_name &#125;&#125;" API
4. Apply for API access
5. Get your service key from the API management page

### Environment Setup

Set your API key as an environment variable:

```bash
export {{ cookiecutter.api_key_env_name }}="your-api-key-here"
```

### Claude Desktop Configuration

Add to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "data-go-mcp.{{ cookiecutter.api_name }}": {
      "command": "uvx",
      "args": ["data-go-mcp.{{ cookiecutter.api_name }}@latest"],
      "env": {
        "{{ cookiecutter.api_key_env_name }}": "your-api-key-here"
      }
    }
  }
}
```

## Available Tools

### TODO: Document your tools here

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/{{ cookiecutter.github_username }}/data-go-mcp-servers.git
cd data-go-mcp-servers/src/{{ cookiecutter.api_name }}

# Install dependencies
uv sync
```

### Testing

```bash
# Run tests
uv run pytest tests/

# Run with coverage
uv run pytest tests/ --cov=data_go_mcp.{{ cookiecutter.api_name_underscore }}
```

### Running Locally

```bash
# Set your API key
export {{ cookiecutter.api_key_env_name }}="your-api-key"

# Run the server
uv run python -m data_go_mcp.{{ cookiecutter.api_name_underscore }}.server
```

## API Documentation

For detailed API documentation, visit: &#123;&#123; cookiecutter.api_base_url &#125;&#125;
