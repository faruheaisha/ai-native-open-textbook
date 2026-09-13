---
title: "CLAUDE.md"
sourceId: "08-agents/baby-agent"
sourceTitle: "BabyAgent - 后端工程师的 AI Agent 教学项目 (Go 语言版)"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/baby-llm/baby-agent"
entryUrl: "https://github.com/baby-llm/baby-agent/blob/55712911ad0c3d1554c94198370b08d9076fac1c/README.md"
zh: ""
---

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BabyAgent is a Go-based AI Agent development tutorial that builds a Claude Code-like assistant from scratch. Each chapter (ch01-ch12) is a standalone module that progressively adds capabilities:

- **ch01-03**: Basic LLM interaction, tool calling, TUI visualization
- **ch04-06**: MCP protocol integration, context engineering, memory system
- **ch07**: Agentic RAG with vector search (pgvector)
- **ch08**: Sandbox/security with Docker isolation and tool confirmation
- **ch09**: Skills system for task-specific guidance
- **ch10+**: Web services, evaluation, observability (planned)

Chapters ch01-ch09 are complete. The current implementation combines all features into a full-featured agent.

## Common Commands

### Running Chapters
```bash
# Run individual chapters (each has a TUI interface)
go run ./ch03/main    # Chapter 3: TUI visualization
go run ./ch04/main    # Chapter 4: MCP integration
go run ./ch05/main    # Chapter 5: Context management
go run ./ch06/main    # Chapter 6: Memory system
go run ./ch08/main    # Chapter 8: Full agent with guardrails
go run ./ch09/main    # Chapter 9: Full agent with skills system (latest)
```

### Testing
```bash
# Run all tests
go test ./...

# Run tests for specific chapter
go test ./ch08/context/...
go test ./ch08/... -v
go test ./ch09/skill/... -v

# Run a single test
go test -v ./ch08/context/... -run TestTruncatePolicyApply
```

### Building
```bash
# Build a chapter's main executable
go build -o bin/ch09 ./ch09/main
```

## Configuration Requirements

Before running any chapter, set up the environment:

1. **Copy example configs:**
   ```bash
   cp .env.example .env
   cp config.example.json config.json
   ```

2. **Configure LLM providers** in `config.json`:
   - `front_model`: Main chat model (e.g., gpt-4o, deepseek-chat)
   - `back_model`: Cheaper model for summarization/memory updates
   - Both require: `base_url`, `api_key`, `model`, `context_window`

3. **Optional: Configure MCP servers** in `mcp-server.json` for extending agent capabilities

## Architecture Overview

### Core Components (ch08)

```
ch08/ or ch09/
├── agent.go          # Main Agent: orchestrates LLM calls, tool execution, streaming
├── context/
│   ├── engine.go     # ContextEngine: manages conversation history, applies policies
│   ├── policy.go     # Policy interface: truncate, offload, summarize strategies
│   ├── policy_*.go   # Policy implementations
│   └── share.go      # Token counting with tiktoken-go
├── memory/
│   ├── memory.go     # Memory interface: global + workspace memory
│   └── update.go     # LLM-driven memory extraction/update
├── storage/
│   ├── storage.go    # Storage interface for persistence
│   └── filesystem.go # File system storage implementation
├── tool/
│   ├── tool.go       # Tool interface
│   ├── bash.go       # Shell command execution
│   ├── docker_bash.go # Docker-isolated shell execution (ch08+)
│   ├── load_storage.go # Load offloaded content
│   └── load_skill.go  # Load skill content (ch09)
├── mcp.go            # MCP client integration (Model Context Protocol)
├── skill/            # Skills system (ch09 only)
│   ├── skill.go      # Skill manager
│   └── markdown.go   # Skill file parser
├── main/             # Main entry point
│   └── main.go       # TUI application entry
├── tui/              # Bubble Tea terminal UI
│   ├── tui.go        # TUI model and update logic
│   └── entry.go      # Log entry types and rendering
├── vo.go             # View objects for streaming messages to TUI
└── prompt.go         # System prompt template with {runtime}, {workspace_path}, {memory}, {skills}
```

### Agent Loop Flow

1. **User Input** → `Agent.RunStreaming(query, viewCh, confirmCh)`
2. **Context Build** → ContextEngine builds messages with system prompt (includes memory + skills for ch09)
3. **LLM Call** → Streaming response via openai-go SDK
4. **Tool Calls** → Check if confirmation needed → Show confirm UI or execute directly
5. **Confirmation** → User selects Allow/Reject/Always Allow (via `confirmCh`)
6. **Execute Tools** → Run native tools (bash, read, write, load_skill) or MCP tools
7. **ESC Handling** → User can cancel anytime; messages preserved, policies/memory skipped
8. **Normal End** → Apply truncate/offload/summarize policies
9. **Memory Update** → LLM extracts new facts from conversation
10. **TUI Display** → Show reasoning, content, tool calls, confirm dialog via MessageVO channel

### Skill Loading Flow (ch09)

1. **Agent Startup** → Skill manager scans `.babyagent/skills/` directory
2. **Metadata Extraction** → Parse YAML front matter (name, description) from each `SKILL.md`
3. **System Prompt** → Inject skill list into `{skills}` placeholder
4. **User Request** → LLM analyzes task and identifies relevant skill
