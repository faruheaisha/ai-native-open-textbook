---
title: "Prior Auth Packet Builder"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/healthcare_support/skills/prior-auth-packet-builder/SKILL.md"
sourceRel: "examples/sandbox/healthcare_support/skills/prior-auth-packet-builder/SKILL.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/sandbox/healthcare_support/skills/prior-auth-packet-builder/SKILL.md"
sourceSha256: "a4c0f07d18d18ec056b025ef47a7c72a8bac36e7714962e7860efa645ad020b0"
pageSha256: "a4c0f07d18d18ec056b025ef47a7c72a8bac36e7714962e7860efa645ad020b0"
contentMode: "local-full"
zh: ""
---

# Prior Auth Packet Builder

Use this skill when a case requires prior authorization review, referral validation, imaging review, or payer-specific policy checks.

## Workflow

1. Inspect `case/scenario.json` and `case/transcript.txt`.
2. Search `policies/` for payer, prior auth, referral, imaging, and PPO guidance:
   - Run the preferred search and fallback as one shell command:
     `rg -n -i 'prior authorization|prior-auth|imaging|referral|billing|PPO|Blue Cross' policies ||
     grep -RniE 'prior authorization|prior-auth|imaging|referral|billing|PPO|Blue Cross' policies`.
   - An `rg` launcher or bootstrap failure is not evidence that there are no policy matches.
3. Read only the most relevant policy files.
4. Create `output/policy_findings.md` with these exact headings:
   - `## Case summary`
   - `## Matched policy files`
   - `## Prior authorization`
   - `## Referral`
   - `## Missing information`
   Cite each matched policy by its filename.
5. Create `output/human_review_checklist.md` with:
   - what a human reviewer should verify
   - what to tell the patient
   - what queue should own the case
6. Call `finalize_policy_packet` only after both artifacts exist.

## Rules

- Use targeted searches over broad file reads.
- Use the targeted `grep -RniE` fallback only when `rg` cannot complete the search.
- Only cite policy files you actually inspected.
- Keep outputs concise and operational.
- The workflow is complete only when `finalize_policy_packet` succeeds.
- If referral status is pending and prior auth is unclear, recommend human review.
