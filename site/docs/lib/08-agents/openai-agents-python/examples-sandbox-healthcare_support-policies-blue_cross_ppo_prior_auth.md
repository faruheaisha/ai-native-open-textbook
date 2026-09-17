---
title: "Blue Cross PPO Prior Authorization"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/healthcare_support/policies/blue_cross_ppo_prior_auth.md"
sourceRel: "examples/sandbox/healthcare_support/policies/blue_cross_ppo_prior_auth.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/sandbox/healthcare_support/policies/blue_cross_ppo_prior_auth.md"
sourceSha256: "1980313ab81d461a2346d3d00317e9903449e7344956782b1185c6e7757f2ebc"
pageSha256: "1980313ab81d461a2346d3d00317e9903449e7344956782b1185c6e7757f2ebc"
contentMode: "local-full"
zh: ""
---

# Blue Cross PPO Prior Authorization

- PPO members require prior authorization for inpatient surgery, outpatient surgery over $1,500, and advanced imaging tied to surgical planning.
- Knee surgery consults do not require prior authorization by themselves.
- MRI or CT imaging ordered after the consult may require prior authorization if performed at a hospital outpatient department.
- If referral status is pending, route to auth review before scheduling imaging.
- Required fields: member ID, date of birth, ordering provider, CPT code, diagnosis code.
