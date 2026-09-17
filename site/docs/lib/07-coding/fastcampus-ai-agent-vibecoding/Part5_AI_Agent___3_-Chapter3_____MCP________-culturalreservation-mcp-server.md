---
title: "Seoul Cultural Events Reservation MCP Server"
sourceId: "07-coding/fastcampus-ai-agent-vibecoding"
sourceTitle: "FastCampus AI Agent 바이브코딩 강의"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding"
entryUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/Part5_AI_Agent_프로젝트_3개/Chapter3_바이브코딩으로_공공_MCP_자동_생성하고_에이전트_연결하기/culturalreservation-mcp-server/README.md"
sourceRel: "Part5_AI_Agent_프로젝트_3개/Chapter3_바이브코딩으로_공공_MCP_자동_생성하고_에이전트_연결하기/culturalreservation-mcp-server/README.md"
rawUrl: "/raw/07-coding/fastcampus-ai-agent-vibecoding/Part5_AI_Agent_프로젝트_3개/Chapter3_바이브코딩으로_공공_MCP_자동_생성하고_에이전트_연결하기/culturalreservation-mcp-server/README.md"
sourceSha256: "fdbe06c94fa823b3dfa7ac213b7365d1fdaa295869dc5a548661bf57e217fc5d"
pageSha256: "fdbe06c94fa823b3dfa7ac213b7365d1fdaa295869dc5a548661bf57e217fc5d"
contentMode: "local-full"
zh: ""
---

# Seoul Cultural Events Reservation MCP Server

A Seoul Data MCP server for 문화행사 공공서비스예약 (Seoul Cultural Events Reservation)

## TODO (REMOVE AFTER COMPLETING)

* [ ] Generate a `uv.lock` file with `uv sync`
* [ ] Remove the example tools in server.py
* [ ] Add your own tool(s) for Seoul Open Data API integration
* [ ] Implement API authentication and configuration
* [ ] Keep test coverage high
* [ ] Document the MCP Server in this README.md
* [ ] Test with MCP Inspector
* [ ] Test with Claude Code or other MCP clients

## Overview

This MCP server provides tools to access Seoul Open Data API for **문화행사 공공서비스예약** (Seoul Cultural Events Reservation).

### Features

- 🔍 Search cultural events by keyword and date range
- 📅 Filter events by genre and location
- 🚇 Access transportation information for cultural spaces
- 🏛️ Browse cultural space information

## Installation

### Using uvx (Recommended)

```bash
uvx data-seoul-mcp.culturalreservation-mcp-server@latest
```

### Using uv pip

```bash
uv pip install data-seoul-mcp.culturalreservation-mcp-server
```

## Configuration

### Option 1: Using Published Package (uvx)

Add to your `.mcp.json`:

```json
{
  "mcpServers": {
    "seoul-culturalreservation": {
      "command": "uvx",
      "args": ["data-seoul-mcp.culturalreservation-mcp-server@latest"],
      "env": {
        "SEOUL_API_KEY": "your-api-key-here",
        "FASTMCP_LOG_LEVEL": "ERROR"
      }
    }
  }
}
```

### Option 2: Using Local Development Version

For local development and testing, add to your `.mcp.json`:

```json
{
  "mcpServers": {
    "seoul-culturalreservation": {
      "command": "uv",
      "args": [
        "--directory",
        "/absolute/path/to/culturalreservation-mcp-server",
        "run",
        "data_seoul_mcp/culturalreservation_mcp_server/server.py"
      ],
      "env": {
        "SEOUL_API_KEY": "your-api-key-here",
        "FASTMCP_LOG_LEVEL": "ERROR"
      }
    }
  }
}
```

**Important:** Replace `/absolute/path/to/culturalreservation-mcp-server` with the actual absolute path to your project directory.

**Example:**
```json
{
  "mcpServers": {
    "seoul-culturalreservation": {
      "command": "uv",
      "args": [
        "--directory",
        "/Users/username/projects/culturalreservation-mcp-server",
        "run",
        "data_seoul_mcp/culturalreservation_mcp_server/server.py"
      ],
      "env": {
        "SEOUL_API_KEY": "12345678-abcd-efgh-ijkl-1234567890ab",
        "FASTMCP_LOG_LEVEL": "ERROR"
      }
    }
  }
}
```

## Tools

### ExampleTool

Example tool for testing the server setup.

**Parameters:**
- `query` (string): Test query string

### SearchEvents

Search Seoul cultural events.

**Parameters:**
- `keyword` (string, optional): Search keyword for event title or description
- `start_date` (string, optional): Start date in YYYYMMDD format
- `end_date` (string, optional): End date in YYYYMMDD format
- `limit` (integer, default: 10): Maximum number of results

## Development

### Setup

```bash
# Clone the repository
