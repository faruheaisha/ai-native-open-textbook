---
title: "Outbound Fax Packet Requirements"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/healthcare_support/policies/outbound_fax_packet_requirements.md"
sourceRel: "examples/sandbox/healthcare_support/policies/outbound_fax_packet_requirements.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/sandbox/healthcare_support/policies/outbound_fax_packet_requirements.md"
sourceSha256: "0ea09faeb42a100b84a6e5d17809de72600a4ddf53aad6be8325b460a70f5723"
pageSha256: "0ea09faeb42a100b84a6e5d17809de72600a4ddf53aad6be8325b460a70f5723"
contentMode: "local-full"
zh: ""
---

# Outbound Fax Packet Requirements

- Prior auth packets should include cover sheet, demographics, insurance card data, consult notes, imaging reports, and requested CPT/ICD-10 codes.
- If any required artifact is missing, create a missing-items checklist before faxing.
- Human review is required before outbound fax when packet data is incomplete or referral status is pending.
