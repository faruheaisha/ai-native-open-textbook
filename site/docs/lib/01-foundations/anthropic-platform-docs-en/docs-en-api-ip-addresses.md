---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/ip-addresses.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/ip-addresses.md"
sourceSha256: "c3c62f43f063a10547c0102fc74a5398b7e396c65a3669cce2973a2a8c73f472"
pageSha256: "c3c62f43f063a10547c0102fc74a5398b7e396c65a3669cce2973a2a8c73f472"
contentMode: "local-full"
zh: ""
---

# Anthropic 平台文档（英文全量）

**[Claude Platform on AWS](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws):** The inbound endpoint (`aws-external-anthropic.\{region\}.api.aws`) resolves to AWS IP ranges. Outbound tool calls (MCP connector, web search, and web fetch) originate from the Anthropic ranges listed on this page. See the [AWS IP address ranges](https://docs.aws.amazon.com/vpc/latest/userguide/aws-ip-ranges.html) for inbound allowlisting.

## Inbound IP addresses

These are the IP addresses where Anthropic services receive incoming connections.

### IPv4

`160.79.104.0/23`

### IPv6

`2607:6bc0::/48`

## Outbound IP addresses

These are the stable IP addresses that Anthropic uses for outbound requests (for example, when making MCP tool calls to external servers).

### IPv4

`160.79.104.0/21`

### Phased out IP addresses

The following IP addresses are no longer in use by Anthropic. If you have previously allowlisted these addresses, you should remove them from your firewall rules.

```text wrap
34.162.46.92/32
34.162.102.82/32
34.162.136.91/32
34.162.142.92/32
34.162.183.95/32
```
