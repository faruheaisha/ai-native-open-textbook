---
title: "openai-cookbook-docs"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/examples/agents_sdk/computer_use_with_daytona/computer_use_with_daytona.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/agents_sdk/computer_use_with_daytona/computer_use_with_daytona.md"
sourceSha256: "a94c68575973ef4c95f8c051e8a957e937b7c2d59e117cba4310a5cb7d7b5595"
pageSha256: "fe9fc499aaaf387a9c1a75bb47e29eb735dfb2d689aadc70eb30f4a7db878eab"
contentMode: "local-full"
zh: ""
---

## Create the sandbox

`AsyncDaytona()` reads the API key from `DAYTONA_API_KEY`. `daytona.create(...)` spins up a sandbox from the desktop snapshot; the call returns once the sandbox is ready for filesystem and process operations. The sandbox handle is what we pass to everything downstream: the form uploader, the HTTP server launcher, the recording API, and the `DaytonaAsyncComputer` adapter.

We hold onto `daytona` and `sandbox` as notebook-level variables so later cells can operate on them, and we tear them down explicitly in the last cell.

```python
daytona = AsyncDaytona()
sandbox = await daytona.create(
    CreateSandboxFromSnapshotParams(snapshot=_DESKTOP_SNAPSHOT),
)
print(f"Sandbox ready: {sandbox.id}")
```

```text
Sandbox ready: 6a6ca6a5-f49a-4562-a3f2-4d1717c0131d
```
