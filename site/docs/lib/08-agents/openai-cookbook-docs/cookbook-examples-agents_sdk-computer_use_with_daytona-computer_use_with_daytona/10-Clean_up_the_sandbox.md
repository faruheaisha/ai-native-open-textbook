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
pageSha256: "06699933b6387677824ea6eb79a9ab6f5e6b129f7cec5f5086f2df3e6cd1864a"
contentMode: "local-full"
zh: ""
---

## Clean up the sandbox

Delete the sandbox when you're done. Daytona will also tear it down automatically on its own schedule, but explicit deletion keeps the account tidy and guarantees you aren't billed for idle time.

```python
await daytona.delete(sandbox)
print(f"Sandbox {sandbox.id} deleted.")
```

```text
Sandbox 6a6ca6a5-f49a-4562-a3f2-4d1717c0131d deleted.
```
