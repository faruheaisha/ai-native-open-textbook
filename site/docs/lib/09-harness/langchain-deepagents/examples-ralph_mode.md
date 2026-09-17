---
title: "Ralph Mode for Deep Agents"
sourceId: "09-harness/langchain-deepagents"
sourceTitle: "LangChain DeepAgents"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/langchain-ai/deepagents"
entryUrl: "https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/ralph_mode/README.md"
sourceRel: "examples/ralph_mode/README.md"
rawUrl: "/raw/09-harness/langchain-deepagents/examples/ralph_mode/README.md"
sourceSha256: "3c2dff9fc8d7146ed296fc4bc46630bb0b09f1ffb3b9a7af52d8752591f1aa66"
pageSha256: "3c2dff9fc8d7146ed296fc4bc46630bb0b09f1ffb3b9a7af52d8752591f1aa66"
contentMode: "local-full"
zh: ""
---

# Ralph Mode for Deep Agents

![Ralph Mode Diagram](/mirror/28/28c759bc5269e8123a3c7ceda1516a42fdac0a87.png)

## What is Ralph?

Ralph is an autonomous looping pattern created by [Geoff Huntley](https://ghuntley.com) that went viral in late 2025. The original implementation is literally one line:

```bash
while :; do cat PROMPT.md | agent ; done
```

Each loop starts with **fresh context**—the simplest pattern for context management. No conversation history to manage, no token limits to worry about. Just start fresh every iteration.

The filesystem and git allow the agent to track progress over time. This serves as its memory and worklog.

## Quick Start

```bash
# Install uv (if you don't have it)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Create a virtual environment
uv venv
source .venv/bin/activate

# Install the CLI
uv pip install deepagents-cli

# Download the script (or copy from examples/ralph_mode/ if you have the repo)
curl -O https://raw.githubusercontent.com/langchain-ai/deepagents/main/examples/ralph_mode/ralph_mode.py

# Run Ralph
python ralph_mode.py "Build a Python programming course for beginners. Use git."
```

## Usage

```bash
# Unlimited iterations (Ctrl+C to stop)
python ralph_mode.py "Build a Python course"

# With iteration limit
python ralph_mode.py "Build a REST API" --iterations 5

# With specific model
python ralph_mode.py "Create a CLI tool" --model claude-sonnet-4-6

# With a specific working directory
python ralph_mode.py "Build a web app" --work-dir ./my-project

# Run in a remote sandbox (AgentCore, Modal, Daytona, or Runloop)
python ralph_mode.py "Build an app" --sandbox modal
python ralph_mode.py "Build an app" --sandbox daytona --sandbox-setup ./setup.sh

# Reuse an existing sandbox instance
python ralph_mode.py "Build an app" --sandbox modal --sandbox-id my-sandbox

# Auto-approve specific shell commands (or "recommended" for safe defaults)
python ralph_mode.py "Build an app" --shell-allow-list recommended
python ralph_mode.py "Build an app" --shell-allow-list "ls,cat,grep,pwd"

# Pass model parameters
python ralph_mode.py "Build an app" --model-params '{"temperature": 0.5}'

# Disable streaming output
python ralph_mode.py "Build an app" --no-stream
```

### Remote sandboxes

Ralph supports running agent code in isolated remote environments via the
`--sandbox` flag. The agent runs locally but executes all code operations in the
remote sandbox. See the
[sandbox documentation](https://docs.langchain.com/oss/python/deepagents/cli/overview)
for provider setup (API keys, etc.) and the
[sandboxes concept guide](https://docs.langchain.com/oss/python/deepagents/sandboxes)
for architecture details.

Supported providers: **AgentCore**, **Modal**, **Daytona**, **Runloop**.

## How It Works

1. **You provide a task** — declarative, what you want (not how)
2. **Agent runs** — creates files, makes progress
3. **Loop repeats** — same prompt, but files persist
4. **You stop it** — Ctrl+C when satisfied

## Credits

- Original Ralph concept by [Geoff Huntley](https://ghuntley.com)
- [Brief History of Ralph](https://www.humanlayer.dev/blog/brief-history-of-ralph) by HumanLayer

## Resources

- [LangChain Academy](https://academy.langchain.com/) — Comprehensive, free courses on LangChain libraries and products, made by the LangChain team.
- [Code of Conduct](https://github.com/langchain-ai/langchain/?tab=coc-ov-file) — community guidelines and standards
