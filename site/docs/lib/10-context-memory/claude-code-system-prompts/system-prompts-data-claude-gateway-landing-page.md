---
title: "Claude Code System Prompts"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-claude-gateway-landing-page.md"
sourceRel: "system-prompts/data-claude-gateway-landing-page.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-claude-gateway-landing-page.md"
sourceSha256: "18e712eedc9a142bcf078bd5f81054709f86450dfc512d417d88e90bec644b69"
pageSha256: "18e712eedc9a142bcf078bd5f81054709f86450dfc512d417d88e90bec644b69"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

<!doctype html>
```
<html>
<head>
<meta charset="utf-8">
```
<title>Claude gateway for Amazon Bedrock, Google Cloud, and Microsoft Foundry</title>
&lt;/head>
&lt;body style="font-family: monospace; margin: 1em;">
<pre style="line-height: 1; margin: 0 0 1em 0;">${GATEWAY_ASCII_LOGO}</pre>
&lt;pre style="margin: 0;">
<b>Claude gateway for Amazon Bedrock, Google Cloud, and Microsoft Foundry</b>

Running at ${GATEWAY_URL\}

To connect from Claude Code:
  Your admin provisions this gateway URL via managed settings
  (forceLoginGatewayUrl) — then /login connects here directly.

Identity provider   ${IDENTITY_PROVIDER_HOST}
Discovery           <a href="https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/.well-known/oauth-authorization-server/README.md">/.well-known/oauth-authorization-server</a>
Version             ${HTML_ESCAPE_FN(GATEWAY_VERSION)\}
&lt;/pre>
&lt;/body>
&lt;/html>
