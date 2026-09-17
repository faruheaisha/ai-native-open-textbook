---
title: "OpenAI API 参考（字段级）"
sourceId: "01-foundations/openai-api-reference-en"
sourceTitle: "OpenAI API 参考（字段级）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/reference"
entryUrl: "https://developers.openai.com/api/reference"
sourceRel: "api/reference/resources/realtime/subresources/client_secrets/methods/create.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/realtime/subresources/client_secrets/methods/create.md"
sourceSha256: "cb28adcdf0ff18c18018061e5a49c56bb58c50e0cce2327f45cd377d08016d11"
pageSha256: "f0e4027003df20376272f54a660d79c1500ed4c89e509602ca7161224f464fec"
contentMode: "local-full"
zh: ""
---

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Create client secret

**post** `/realtime/client_secrets`

Create a Realtime client secret with an associated session configuration.

Client secrets are short-lived tokens that can be passed to a client app,
such as a web frontend or mobile client, which grants access to the Realtime API without
leaking your main API key. You can configure a custom TTL for each client secret.

You can also attach session configuration options to the client secret, which will be
applied to any sessions created using that client secret, but these can also be overridden
by the client connection.

[Learn more about authentication with client secrets over WebRTC](https://developers.openai.com/api/docs/guides/realtime-webrtc).

Returns the created client secret and the effective session object. The client secret is a string that looks like `ek_1234`.

## 本篇目录

- [Body Parameters](https://developers.openai.com/api/reference)
- [Returns](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
