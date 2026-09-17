---
title: "Scheduling Hold Policy"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/healthcare_support/policies/scheduling_hold_policy.md"
sourceRel: "examples/sandbox/healthcare_support/policies/scheduling_hold_policy.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/sandbox/healthcare_support/policies/scheduling_hold_policy.md"
sourceSha256: "6d3f60ff3cd3c739fd8455c5d3c3793aa1525882ff238e45e98a72d44c6b8db7"
pageSha256: "6d3f60ff3cd3c739fd8455c5d3c3793aa1525882ff238e45e98a72d44c6b8db7"
contentMode: "local-full"
zh: ""
---

# Scheduling Hold Policy

- Do not schedule surgery until required payer authorization is approved.
- Imaging may be tentatively scheduled only when policy allows no-auth outpatient imaging.
- If referral or authorization is pending, place a scheduling hold and notify the patient of the review owner.
