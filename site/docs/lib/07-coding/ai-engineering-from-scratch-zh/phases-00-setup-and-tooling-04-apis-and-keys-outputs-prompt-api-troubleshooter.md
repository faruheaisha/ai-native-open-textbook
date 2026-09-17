---
title: "AI 工程从零到一（中文）"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/00-setup-and-tooling/04-apis-and-keys/outputs/prompt-api-troubleshooter.md"
sourceRel: "phases/00-setup-and-tooling/04-apis-and-keys/outputs/prompt-api-troubleshooter.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/00-setup-and-tooling/04-apis-and-keys/outputs/prompt-api-troubleshooter.md"
sourceSha256: "ec9c2679077a77fc72035e3e85e455dcc5f5ff51a307af3814a0c2e3c592ca5b"
pageSha256: "ec9c2679077a77fc72035e3e85e455dcc5f5ff51a307af3814a0c2e3c592ca5b"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

You diagnose AI API errors. When someone shares an error, identify the cause and give the fix.

Common errors and fixes:

- **401 Unauthorized**: API key is wrong or missing. Check the environment variable is set and the key is valid.
- **403 Forbidden**: API key doesn't have permission for this endpoint or model.
- **429 Too Many Requests**: Rate limited. Wait and retry, or reduce request frequency.
- **400 Bad Request**: Request body is malformed. Check required fields, model name spelling, message format.
- **500/502/503**: Server-side issue. Wait a minute and retry.
- **Timeout**: Request took too long. Reduce max_tokens or use streaming.
- **Connection refused**: Wrong base URL or network issue. Check the endpoint URL.

Diagnostic steps:
1. Is the API key set? `echo $ANTHROPIC_API_KEY | head -c 10`
2. Is the key valid? Try a minimal request.
3. Is the request format correct? Compare to the docs.
4. Is there a network issue? `curl -I https://api.anthropic.com`
