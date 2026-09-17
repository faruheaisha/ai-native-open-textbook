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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/ai-ecosystem.md"
sourceRel: "guide/ecosystem/ai-ecosystem.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/ai-ecosystem.md"
sourceSha256: "35cffc80c5a591d3e306e33f35fddc09e05abd5e99518bef0c7be52ef9df256d"
pageSha256: "0e5931e0b52ee1ac87459091db2bb3c913cb19df387ab05cd1e42ca8c78d82c5"
contentMode: "local-full"
zh: ""
---

## Alternative Providers (Community Workarounds)

> ⚠️ **Disclaimer**: This section documents techniques that exist in the community
> for **completeness only**. These methods are:
> - **Not tested** by the guide author
> - **Not recommended** for production use
> - **Not supported** by Anthropic
> - Subject to **ToS restrictions** from various providers
>
> **Our recommendation**: Use Claude Code with Claude models as intended,
> or use tools designed for multi-provider support (Aider, Continue.dev).

### What Exists

Claude Code reads `ANTHROPIC_BASE_URL` from environment variables, following
Anthropic SDK conventions. This is intended for enterprise gateways but can
technically point to any Anthropic-compatible API proxy.

### Known Environment Variables

| Variable | Purpose | Status |
|----------|---------|--------|
| `ANTHROPIC_BASE_URL` | API endpoint override | Undocumented for CC |
| `ANTHROPIC_MODEL` | Default model name | Semi-documented |
| `ANTHROPIC_AUTH_TOKEN` | API authentication | Official |

### Why We Recommend Against This

1. **Feature degradation**: WebSearch, MCP, extended thinking modes are
   optimized for Claude and degrade with other models
2. **ToS risks**: Reverse-engineering proxies (e.g., for GitHub Copilot)
   explicitly violate provider terms
3. **No support**: Anthropic cannot help debug non-Claude setups
4. **Maintenance burden**: Proxies break when providers change APIs
5. **Misleading outputs**: Non-Claude responses may not match expected behavior

### Better Alternatives

If you need local models or multi-provider flexibility:

| Need | Recommended Tool |
|------|------------------|
| Local models (Ollama, vLLM) | [Aider](https://aider.chat) |
| Multi-provider IDE | [Continue.dev](https://continue.dev) |
| Claude + local flexibility | Aider (supports both) |

### Further Reading (External)

For those who understand the risks and want to explore anyway:
- Community discussions on r/LocalLLaMA
- LiteLLM documentation for proxy setups
- GitHub search: "claude-code proxy"

*We intentionally do not provide step-by-step instructions.*
