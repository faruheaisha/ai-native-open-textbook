---
title: "Auth Review Queue Routing"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/healthcare_support/policies/auth_review_queue_routing.md"
sourceRel: "examples/sandbox/healthcare_support/policies/auth_review_queue_routing.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/sandbox/healthcare_support/policies/auth_review_queue_routing.md"
sourceSha256: "3ebb983c8a6ed794201323e99c64b03973ffee45b1b5ded48f0af814c492a8b0"
pageSha256: "3ebb983c8a6ed794201323e99c64b03973ffee45b1b5ded48f0af814c492a8b0"
contentMode: "local-full"
zh: ""
---

# Auth Review Queue Routing

- Route to auth-review-queue when prior authorization is required, likely required, or blocked by missing CPT/diagnosis details.
- Route to care-team-intake-queue when referral or scheduling data is incomplete but payer auth is not yet indicated.
- Route to billing-review-queue only for claim denial, refund, or balance disputes.
- High-priority auth review applies when surgery or advanced imaging is expected within 14 days.
