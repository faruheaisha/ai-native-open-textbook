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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/third-party-tools.md"
sourceRel: "guide/ecosystem/third-party-tools.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/third-party-tools.md"
sourceSha256: "b3e2f559e8457efd6710fab561c9ec7cd746c62b9885fa5535509f700f4a2677"
pageSha256: "cc581caa93b56e56bc37e752ffb878b986464bfb7fd489f408a394bdb0f6a71a"
contentMode: "local-full"
zh: ""
---

## Known Gaps

As of February 2026, the community tooling ecosystem has notable gaps:

| Gap | Description |
|-----|-------------|
| **Skills usage analytics** | ✅ **FILLED**: [Skillsight](https://github.com/PackmindHub/skillsight) (Packmind, launched May 2026): self-hosted OTEL dashboard showing which skills are actually invoked per user/session. Deploy with caveats (see [Skills Observability](#skills-observability)). |
| **Visual skills editor** | No GUI for creating/editing `.claude/skills/`: must edit YAML/Markdown manually |
| **Visual hooks editor** | No GUI for managing hooks in `settings.json`: requires JSON editing |
| **Unified admin panel** | No single dashboard combining config, sessions, cost, and MCP management |
| **Session replay** | ✅ **FILLED**: Entire CLI (launched Feb 2026) provides rewindable checkpoints with full context replay |
| **Automated `.claude/` security scanning** | ✅ **FILLED**: [AgentShield](https://github.com/affaan-m/agentshield) (launched Feb 2026): 102-rule scanner with A–F grading, `--fix`, and GitHub Action integration |
| **Agent-native issue tracking** | No established tool for markdown-based, git-committable issue tracking with Claude Code. [fp.dev](https://fp.dev/) is an early-stage solution (local-first, `/fp-plan` + `/fp-implement` skills, diff viewer) but lacks adoption signals and requires Apple Silicon for the desktop app. The Tasks API covers state persistence but issues aren't git-committable. |
| **Per-MCP-server profiler** | No way to measure token cost attributable to each MCP server individually |
| **Cross-platform config sync** | No tool syncs Claude Code config across machines (must manual copy `~/.claude/`) |
| **Programmatic sandboxed orchestration** | Watch: [Sandcastle](https://github.com/mattpocock/sandcastle) (`@ai-hero/sandcastle`, Matt Pocock): TypeScript API for running agents in Docker/Podman/Vercel containers with branch strategy management and prompt templating. Unique niche but not guide-ready at v0.5.x (active bugs, TypeScript-only, requires separate `ANTHROPIC_API_KEY`, Docker/Podman hard dependency). Revisit at v1.0. |
| **Cross-platform agent-human chat bridge with governance** | Watch: [Switch](https://github.com/sandbox-quantum/switch) (Flint AI / SandboxAQ): Matrix-based bus connecting heterogeneous agents (Claude Code, Codex, OpenCode, anything speaking its protocol) and humans in the same room, relayed bidirectionally into Slack, Microsoft Teams, Discord, Telegram, and Mattermost, with a centralized owner-inheritance authorization model. No comparable multi-platform, multi-framework bridge exists elsewhere in this list; agent-chat above is the closest name match but is a read-only local dashboard, not a live external bridge. Pre-1.0 (`0.21.0`), 252 stars at 6 weeks, bus factor close to 1. Evaluation: [switch-agent-human-chat-bridge.md](/lib/09-harness/claude-code-ultimate-guide/docs-resource-evaluations-switch-agent-human-chat-bridge). |
