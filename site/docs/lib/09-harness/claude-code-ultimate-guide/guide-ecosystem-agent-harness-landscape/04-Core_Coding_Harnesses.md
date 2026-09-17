---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/agent-harness-landscape.md"
sourceRel: "guide/ecosystem/agent-harness-landscape.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/agent-harness-landscape.md"
sourceSha256: "ac957939ce9efa9622de77b893de044c67ec7891fba95a63115acdad64fa6d55"
pageSha256: "6edef19dbbd709881f2c6d1e1f82d0d124d8269d6c2074a5826355d5a1f44aa3"
contentMode: "local-full"
zh: ""
---

## Core Coding Harnesses

The strict map contains 42 runtimes. Every name links to its official product page or canonical repository. Open-source rows include GitHub stars when a canonical repository was available. Stars are a dated popularity signal, not a quality score. Entries with detailed coverage in this guide keep that internal profile in the role cell.

**Snapshot:** 2026-09-09. GitHub stars are captured on the date shown in each project cell.

**Legend:** <abbr title="Not established from the pinned sources">?</abbr> = not established from the pinned sources; N/A = does not apply.

| Harness | Interface | Loop evidence | Licence | Role |
|---|---|---|---|---|
| [AgentForge](https://github.com/MohitGoyal09/AgentForge)<br><small>★ 60 · 2026-08-28</small> | CLI, TUI | Confirmed | <abbr title="Not established from the pinned sources">?</abbr> | The README documents a ReAct-style loop that repeats model requests, typed tool calls, and observations until completion. |
| [agentic-harness](https://github.com/codejunkie99/agentic-harness)<br><small>★ 84 · 2026-08-28</small> | CLI | Confirmed | <abbr title="Not established from the pinned sources">?</abbr> | The README documents a coding-agent loop that iterates through model tool calls against a workspace. |
| [aider](https://github.com/Aider-AI/aider)<br><small>★ 48,420 · 2026-08-23</small> | CLI | Claimed | Open source | Git-aware CLI pair programmer; edits in-repo, supports multiple models and MCP so agents see version control and tools. [Guide profile](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index#13-aider) |
| [Amp](https://ampcode.com/docs) | CLI, Desktop, Web | Claimed | Proprietary | Amp presents its product as an agentic coding tool. |
| [Augment Code](https://www.augmentcode.com/) | CLI, IDE | Claimed | Proprietary | Augment presents its product as an AI coding platform with agent capabilities. |
| [Autonomous Coding Harness](https://github.com/GantisStorm/autonomous-coding-harness)<br><small>★ 7 · 2026-08-28</small> | CLI, TUI | Claimed | <abbr title="Not established from the pinned sources">?</abbr> | The README claims a milestone-based autonomous coding loop with implementation, verification, and human checkpoints. |
| [Claude Code](https://code.claude.com/docs/en/overview) | CLI, Desktop, IDE, Web | Claimed | Proprietary | Anthropic documents Claude Code as an agentic coding tool that reads codebases, edits files, and runs commands. |
| [claw-code-agent](https://github.com/HarnessLab/claw-code-agent)<br><small>★ 543 · 2026-08-23</small> | CLI, Web | Claimed | <abbr title="Not established from the pinned sources">?</abbr> | Python reimplementation of the Claude Code agent architecture with zero external dependencies; interactive chat, streaming, plugin runtime, nested agent delegation, cost... |
| [Cline](https://github.com/cline/cline)<br><small>★ 66,707 · 2026-08-23</small> | IDE | Claimed | Open source | VS Code extension whose harness is a plan-then-act loop with per-step human approval and cost transparency; the VS Code integration is the UI shell. |
| [Codex](https://github.com/openai/codex)<br><small>★ 114,837 · 2026-08-23</small> | CLI | Claimed | Open source | OpenAI's terminal coding agent. [Guide profile](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index#11-codex-cli-openai) |
| [crush](https://github.com/charmbracelet/crush)<br><small>★ 27,601 · 2026-08-23</small> | CLI, TUI | Claimed | Restricted (fsl-1.1-mit) | Charm's terminal coding agent (Charm's fork of the original OpenCode). [Guide profile](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index#17-crush-charm) |
| [Cursor Agent](https://cursor.com/agents) | Chat, CLI, Desktop, IDE, Web | Claimed | Proprietary | Cursor presents Agent as its coding-agent product across editor and remote surfaces. |
| [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)<br><small>★ 201,064 · 2026-08-28</small> | CLI, Web | Claimed | Mit | The official repository describes a developer-preview agent harness built on the Cordis plugin framework. [Guide profile](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index#18-deepseek-harness-dsh) |
| [DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)<br><small>★ 35,065 · 2026-08-23</small> | CLI, TUI | Claimed | <abbr title="Not established from the pinned sources">?</abbr> | DeepSeek-native terminal coding agent. |
| [Devin](https://devin.ai/) | Chat, Web | Claimed | Proprietary | Cognition presents Devin as an AI software engineer. |
| [Devin Desktop](https://devin.ai/desktop) | Desktop, IDE | Claimed | Proprietary | Devin Desktop, formerly Windsurf, combines an IDE with local and cloud coding agents. |
| [Factory Droid](https://docs.factory.ai/) | CLI, Desktop, IDE, Web | Claimed | Proprietary | Factory presents Droids as software-development agents. |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli)<br><small>★ 106,626 · 2026-08-23</small> | CLI | Claimed | Open source | Google's first-party terminal agent for Gemini. [Guide profile](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index#16-gemini-cli-google) |
| [GitHub Copilot CLI](https://github.com/features/copilot/cli) | CLI | Claimed | Proprietary | GitHub presents Copilot CLI as a coding agent for the terminal. |
| [goose](https://github.com/aaif-goose/goose)<br><small>★ 53,295 · 2026-08-23</small> | CLI, Desktop | Claimed | Open source | Block-originated Rust agent, now stewarded by the Linux Foundation's Agentic AI Foundation (aaif-goose/goose). [Guide profile](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index#14-goose-aaifblock) |
| [Hermes](https://github.com/NousResearch/hermes-agent)<br><small>★ 234,688 · 2026-08-23</small> | Chat, CLI, TUI | Confirmed | Open source | Nous Research's self-improving agent: a learning loop turns experience into reusable skills, builds a persistent user model across sessions, and checkpoints state to disk with... |
| [jcode](https://github.com/1jehuang/jcode)<br><small>★ 18,308 · 2026-08-23</small> | CLI | Confirmed | <abbr title="Not established from the pinned sources">?</abbr> | Rust terminal coding agent pitched as the most RAM-efficient harness in its class; MCP support, multi-provider (Claude/OpenAI). |
| [Jules](https://jules.google/) | Web | Claimed | Proprietary | Google presents Jules as an asynchronous coding agent. |
| [Junie](https://junie.jetbrains.com/docs/) | CLI, IDE, TUI | Claimed | Proprietary | JetBrains presents Junie as its coding agent. |
| [Kilo Code](https://github.com/Kilo-Org/kilocode)<br><small>★ 26,978 · 2026-08-23</small> | CLI, IDE | Claimed | <abbr title="Not established from the pinned sources">?</abbr> | VS Code extension and CLI in the Cline/Roo-Code lineage : a natural pick now that Roo-Code is archived upstream. |
| [Kimi Code CLI](https://github.com/MoonshotAI/kimi-code)<br><small>★ 7,126 · 2026-08-28</small> | CLI, IDE, TUI | Claimed | Mit | The official repository describes Kimi Code CLI as an agentic coding tool for terminals and IDEs. |
| [Kiro](https://kiro.dev/) | CLI, Desktop, IDE, Web | Claimed | Proprietary | Kiro presents its product as an agentic development environment. |
| [oh-my-pi](https://github.com/can1357/oh-my-pi)<br><small>★ 26,658 · 2026-08-23</small> | CLI, IDE, Web | Claimed | Open source | Terminal coding agent (fork of Pi) that wires the IDE into the harness: hash-anchored edits, a 32-tool loop tuned per-model, LSP rename/references/diagnostics on every write, a... |
| [OpenHarness (HKUDS)](https://github.com/HKUDS/OpenHarness)<br><small>★ 15,492 · 2026-08-23</small> | Chat, CLI, TUI | Confirmed | Open source | Open agent harness with a built-in personal agent ("Ohmo") that runs across Feishu, Slack, Telegram, and Discord; core tool-use, skills, memory, multi-agent coordination with... |
| [Open Interpreter](https://github.com/openinterpreter/openinterpreter)<br><small>★ 68,121 · 2026-08-23</small> | CLI | Claimed | Open source | Lightweight terminal coding agent oriented to open models (DeepSeek, Kimi, Qwen). |
| [Open SWE](https://github.com/langchain-ai/open-swe)<br><small>★ 10,624 · 2026-08-28</small> | Chat, Web | Claimed | Mit | The official repository describes Open SWE as an asynchronous coding agent for repository tasks. |
| [opencode](https://github.com/anomalyco/opencode)<br><small>★ 200,557 · 2026-08-23</small> | CLI, TUI | Claimed | Open source | Open-source terminal coding agent (formerly sst/opencode; transferred to anomalyco). [Guide profile](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index#15-opencode-anomaly-formerly-sst) |
| [OpenCode Harness](https://github.com/samarailly51-pixel/opencode-harness)<br><small>★ 148 · 2026-08-28</small> | CLI, TUI, Web | Confirmed | <abbr title="Not established from the pinned sources">?</abbr> | The README documents a coding-agent loop with tools, permissions, traces, evaluation, and repair feedback. |
| [OpenHands](https://github.com/OpenHands/OpenHands)<br><small>★ 84,844 · 2026-08-23</small> | Web | Claimed | Restricted ((multi-license)) | Dockerized software-engineering agent. [Guide profile](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index#24-openhands-all-hands-ai) |
| [OpenHarness](https://github.com/AgentBoardTT/openharness)<br><small>★ 12 · 2026-08-28</small> | CLI, TUI | Confirmed | <abbr title="Not established from the pinned sources">?</abbr> | The README documents a provider-to-tools agent loop and runtime injection points. |
| [pi](https://github.com/earendil-works/pi)<br><small>★ 95,747 · 2026-08-23</small> | TUI | Claimed | <abbr title="Not established from the pinned sources">?</abbr> | The upstream AI agent toolkit behind this list's oh-my-pi fork: a unified multi-provider LLM API, agent loop, and TUI shell providing the harness that oh-my-pi's Rust rewrite... |
| [qwen-code](https://github.com/QwenLM/qwen-code)<br><small>★ 27,310 · 2026-08-23</small> | CLI | Claimed | <abbr title="Not established from the pinned sources">?</abbr> | Alibaba's official terminal coding agent, forked from Gemini CLI's agent loop and retuned for Qwen models. |
| [Replit Agent](https://replit.com/products/agent) | Web | Claimed | Proprietary | Replit presents Agent as a product that builds applications from user goals. |
| [Roo Code](https://github.com/RooCodeInc/Roo-Code)<br><small>★ 24,326 · 2026-08-23</small> | IDE | Claimed | Open source | VS Code/Cursor extension in the Cline lineage. |
| [Spettro](https://github.com/Aploide/spettro)<br><small>★ 33 · 2026-08-28</small> | CLI, TUI | Confirmed | <abbr title="Not established from the pinned sources">?</abbr> | The README documents autonomous goal runs, native tool calls, subagent workflows, and verification loops. |
| [SWE-agent](https://github.com/SWE-agent/SWE-agent)<br><small>★ 20,112 · 2026-08-23</small> | CLI | Claimed | Open source | LM-driven harness built for SWE-bench: edit state, command execution, and issue-focused loop: the reference agent stack next to the benchmark itself. [Guide profile](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index#22-swe-agent-princeton) |
| [Warp Agent](https://www.warp.dev/blog/introducing-the-warp-agent-cli-coding-agent) | CLI, TUI, Web | Claimed | Proprietary | Warp Agent is a standalone terminal coding agent with interactive PTY support and optional cloud handoff. [Guide profile](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index#19-warp-agent-cli) |

DeepSeek Harness needs a maturity caveat. The official repository describes `dsh` as a developer preview and warns that compatibility may change. Its plugin architecture, permissions, sandbox choices, and local-first processing do not make untrusted repositories safe by default. See the [DeepSeek Harness profile](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index#18-deepseek-harness-dsh) for setup, architecture, and security boundaries.

### Creator interviews as supplementary evidence

Official documentation and canonical repositories remain the source of truth for current product behavior. Creator interviews add dated design rationale that a feature table cannot capture:

- Boris Cherny's [Building Claude Code interview](https://www.youtube.com/watch?v=julbw1JuAz0&t=1520s) traces the product's move from a chatbot to a tool-using agent, while the [permission discussion](https://www.youtube.com/watch?v=julbw1JuAz0&t=3176s) explains the layered controls behind command execution.
- Dax Raad's [Building OpenCode interview](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=1104s) documents the open-source, provider-neutral runtime positioning. The later [control-plane discussion](https://www.youtube.com/watch?v=1VqKUrxR2C8&t=2045s) separates organization-wide provider, permission, budget, and rate-limit controls from the runtime itself.

These interviews do not upgrade a generated evidence state on their own. They are dated testimony, so current availability, licence, and feature behavior still require a direct official source. The [practitioner video evidence ledger](/lib/09-harness/claude-code-ultimate-guide/guide-core-agent-harness/index#10-practitioner-video-evidence) records the short verbatim, timestamp, and boundary for each source.
