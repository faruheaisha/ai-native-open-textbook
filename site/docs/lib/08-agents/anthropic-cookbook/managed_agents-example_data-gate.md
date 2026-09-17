---
title: "Gate, expense approver"
sourceId: "08-agents/anthropic-cookbook"
sourceTitle: "Claude Cookbooks"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/anthropics/anthropic-cookbook"
entryUrl: "https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/managed_agents/example_data/gate/README.md"
sourceRel: "managed_agents/example_data/gate/README.md"
rawUrl: "/raw/08-agents/anthropic-cookbook/managed_agents/example_data/gate/README.md"
sourceSha256: "fc5692be0ed0f90f9b26c0c70e2f4b6af812529e059b06205f84f6c5773f0f6a"
pageSha256: "fc5692be0ed0f90f9b26c0c70e2f4b6af812529e059b06205f84f6c5773f0f6a"
contentMode: "local-full"
zh: ""
---

# Gate, expense approver

A `policy.yaml` and twelve receipts (`inbox/receipts.jsonl`) used by `CMA_gate_human_in_the_loop.py`. The agent classifies each receipt against the policy with two custom tools: `decide()` for clear approves and rejects, `escalate()` for anything ambiguous.

The twelve receipts are designed to hit every branch of the policy: a handful that should auto-approve cleanly, one with no receipt image where the policy demands one, a couple in the manager-approval band, two over the threshold, one travel charge that always escalates regardless of amount, and one with a deliberately ambiguous category. A healthy run produces a mix of `approve`, `reject`, and `escalated` decisions, never all of one lane.
