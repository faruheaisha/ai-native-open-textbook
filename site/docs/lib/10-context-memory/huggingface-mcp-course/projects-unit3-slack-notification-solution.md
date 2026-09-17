---
title: "Module 3: Slack Notification - Complete Solution"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/projects/unit3/slack-notification/solution/README.md"
sourceRel: "projects/unit3/slack-notification/solution/README.md"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/projects/unit3/slack-notification/solution/README.md"
sourceSha256: "6e0297104c173821d21a5c14ff5d5b2e4fe4559622e5bb714e55fcb3a22e993c"
pageSha256: "6e0297104c173821d21a5c14ff5d5b2e4fe4559622e5bb714e55fcb3a22e993c"
contentMode: "local-full"
zh: ""
---

# Module 3: Slack Notification - Complete Solution

This is the complete implementation of Module 3, demonstrating how to integrate MCP Tools and Prompts for team communication via Slack.

## What This Implements

This solution extends Modules 1 and 2 with:

1. **`send_slack_notification` tool** - Sends formatted messages to Slack via webhook with proper error handling
2. **`format_ci_failure_alert` prompt** - Creates rich failure alerts with Slack markdown
3. **`format_ci_success_summary` prompt** - Creates celebration messages for successful deployments

## Setup and Usage

1. Install dependencies:
   ```bash
   uv sync
   ```

2. Set up Slack webhook:
   ```bash
   export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
   ```

3. Start services:
   ```bash
   # Terminal 1: Webhook server
   python webhook_server.py
   
   # Terminal 2: MCP server
   uv run server.py
   
   # Terminal 3: Cloudflare tunnel (optional)
   cloudflared tunnel --url http://localhost:8080
   ```

## Testing

See `manual_test.md` for comprehensive testing instructions using curl commands to simulate GitHub webhook events.

## Key Learning Outcomes

This solution demonstrates all MCP primitives working together for real-world team automation.
