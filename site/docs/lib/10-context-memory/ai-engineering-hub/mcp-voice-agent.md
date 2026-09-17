---
title: "MCP-powered voice agent"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/mcp-voice-agent/README.md"
sourceRel: "mcp-voice-agent/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/mcp-voice-agent/README.md"
sourceSha256: "b678035f74977f8286bd13ebc95e80fa62c835a0882af05262a15961f1ce557d"
pageSha256: "b678035f74977f8286bd13ebc95e80fa62c835a0882af05262a15961f1ce557d"
contentMode: "local-full"
zh: ""
---

# MCP-powered voice agent

This project implements a voice agent that combines web search capabilities via Firecrawl with Supabase database operations through MCP (Model Context Protocol).

## Installation

Ensure you have Python 3.x installed and run:

```bash
pip install -r requirements.txt
```

## Implementation: agent.py

This implementation uses AssemblyAI's services for speech-to-text, along with Firecrawl for web search and Supabase for database operations.

### Requirements

- Firecrawl API key
- Supabase access token
- OpenAI API key
- AssemblyAI API key
- LiveKit credentials

### Setup

Copy `.env.example` to `.env` and configure the following environment variables:

```
FIRECRAWL_API_KEY=your_firecrawl_api_key
SUPABASE_ACCESS_TOKEN=your_supabase_token
OPENAI_API_KEY=your_openai_api_key
ASSEMBLYAI_API_KEY=your_assemblyai_api_key
LIVEKIT_URL=your_livekit_url
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
```

### Running

Start the agent using:

```bash
python agent.py
```

The agent will:
1. Connect to LiveKit
2. Initialize the MCP server for Supabase integration
3. Set up voice interaction capabilities
4. Start listening for user input

## Features

- Real-time web search using Firecrawl
- Supabase database integration via MCP
- Voice interaction capabilities:
  - Silero VAD (Voice Activity Detection)
  - AssemblyAI Speech-to-Text
  - OpenAI GPT-4 for language processing
  - OpenAI TTS for text-to-speech

## 📬 Stay Updated with Our Newsletter!

**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

## Contribution
