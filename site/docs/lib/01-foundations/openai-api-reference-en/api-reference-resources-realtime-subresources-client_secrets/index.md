---
title: "Client Secrets"
sourceId: "01-foundations/openai-api-reference-en"
sourceTitle: "OpenAI API 参考（字段级）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/reference"
entryUrl: "https://developers.openai.com/api/reference"
sourceRel: "api/reference/resources/realtime/subresources/client_secrets.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/realtime/subresources/client_secrets.md"
sourceSha256: "9df478c449e730bbde708293eec6a2952575e43bc8442ca0fea25b9a1e7a7967"
pageSha256: "f4b172acd2ecd7f3e32fa6b7b6ae6a69a670a1cfc004cfc97e3ff78c2aeee8c3"
contentMode: "local-full"
zh: ""
---

# Client Secrets

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
- [Client Secret Create Response](https://developers.openai.com/api/reference)
- [Realtime Session Create Response](https://developers.openai.com/api/reference)
- [Realtime Transcription Session Create Response](https://developers.openai.com/api/reference)
- [Realtime Transcription Session Turn Detection](https://developers.openai.com/api/reference)
