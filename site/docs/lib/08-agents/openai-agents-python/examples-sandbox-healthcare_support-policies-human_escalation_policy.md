---
title: "Human Escalation Policy"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/healthcare_support/policies/human_escalation_policy.md"
sourceRel: "examples/sandbox/healthcare_support/policies/human_escalation_policy.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/sandbox/healthcare_support/policies/human_escalation_policy.md"
sourceSha256: "63aaa4504725f98261a0439cd6a071c6819af5ebeecd2f1e23efe53e8301ab88"
pageSha256: "63aaa4504725f98261a0439cd6a071c6819af5ebeecd2f1e23efe53e8301ab88"
contentMode: "local-full"
zh: ""
---

# Human Escalation Policy

- Escalate to a human when payer is ambiguous, prior authorization is likely, referral is pending, or procedure coding is incomplete.
- Escalate when patient asks for next steps and multiple operational dependencies are unresolved.
- Human queue payloads should include patient summary, payer, member ID, referral ID, requested service, and missing information.
