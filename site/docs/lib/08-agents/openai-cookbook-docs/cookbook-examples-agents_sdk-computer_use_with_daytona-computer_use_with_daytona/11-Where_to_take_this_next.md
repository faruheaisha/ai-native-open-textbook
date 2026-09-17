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
pageSha256: "9b773118995d8314a3e902f4563e578a346dc43330d109e87d7a2a5ce77ecd58"
contentMode: "local-full"
zh: ""
---

## Where to take this next

- **Other kinds of forms.** This pattern works for any web form the agent can reach from a browser. Swap `form.html` for a different page, or drop the HTTP server and point the agent at an external URL.
- **Other backends.** `AsyncComputer` is the portable interface here. If you swap the adapter and the sandbox for a different CUA-capable desktop, the rest of the notebook stays the same.
- **Evals.** Verification can run inside the sandbox: compare the submitted payload against `APPLICANT_DATA` and you have a deterministic form-filling eval.
