---
title: "🤖 Autonomous Self-Healing Debugger"
sourceId: "08-agents/ed-donner-agents"
sourceTitle: "Ed Donner：AI Agents 实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/agents"
entryUrl: "https://github.com/ed-donner/agents/blob/8ceaf66c24643627c1e4806851736bdd444bdd4b/1_foundations/community_contributions/Hareesh_Debugger%20agent/README.md"
sourceRel: "1_foundations/community_contributions/Hareesh_Debugger agent/README.md"
rawUrl: "/raw/08-agents/ed-donner-agents/1_foundations/community_contributions/Hareesh_Debugger agent/README.md"
sourceSha256: "1e67cc66d9d72faaf0be32ff86088c74e1581e05b5550e0adbb41b50c1c8bc12"
pageSha256: "1e67cc66d9d72faaf0be32ff86088c74e1581e05b5550e0adbb41b50c1c8bc12"
contentMode: "local-full"
zh: ""
---

# 🤖 Autonomous Self-Healing Debugger

*One day, software was debugged by humans staring at stack traces until their eyes bled. They would manually apply fixes, re-run scripts, and pray to the compiler. That era is fading. Engineering is becoming the domain of autonomous agents that monitor their own execution, observe their own failures, and self-correct in a recursive loop. This repo is a prototype of how that loop begins.*

![Teaser](/mirror/5b/5b23e31c79a67af89f46a12f4722f8e5a4428700.png)

## The Idea
Give an AI agent access to a local execution environment and a "buggy" script. The agent executes the code, captures the raw `stderr` (the Traceback), reasons about the failure, applies a fix, and verifies the result. It repeats this until the mission is accomplished. You don't "fix" the code; you set the goal and let the agent navigate the errors.

## How it Works
The repo is deliberately kept lean with only three core components:

- **`agent.py`** — The "Brain." Implements the ReAct (Reasoning + Acting) loop using OpenAI's function calling.
- **`tools.py`** — The "Hands." Provides the agent with `subprocess` execution, file I/O, and external notification capabilities.
- **`sandbox.py`** — The "Environment." The volatile workspace where the agent experiments. **This file is edited and iterated on by the agent.**

## The loop in action
The agent doesn't just suggest code; it verifies its own "Thought Process" by observing the terminal output. Below is a snapshot of the agent successfully navigating through multiple logical and syntax errors to reach a verified state.

![Teaser](/mirror/cc/ccb4628df42f59891162488e43e81bd3bae8518a.png)

## Design Choices
- **Recursive Autonomy.** Unlike a standard chatbot, this agent runs in a `while not done` loop. It doesn't just guess a fix; it verifies it.
- **Physical Feedback.** Integration with the **Pushover API** ensures that the agent can "break out" of the digital terminal to notify the human's physical device once the mission is complete.
- **Environment Agnostic.** While designed for Python, the tool-calling architecture allows the agent to handle environment-specific issues (dependency checks, pathing, etc.).

## Quick Start
**Requirements:** Python 3.10+, [uv](https://docs.astral.sh/uv/), pushover message service(register and create api key), pushover app on mobile and an OpenAI API Key.

```bash
# 1. Install dependencies
uv sync

# 2. Setup environment
# Create a .env file with OPENAI_API_KEY, PUSHOVER_TOKEN, and PUSHOVER_USER

# 3. Launch the UI
uv run main.py
```

## Physical Notification
Once the agent verifies that the script runs successfully without errors, it bridges the gap to the physical world, alerting you that the mission is complete

![Teaser](/mirror/88/880586b0a1d983dfc93052bf78d2d779212b9ac8.jpg)
