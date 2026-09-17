---
title: "Agent Systems Handbook（智能体系统手册）"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/case-studies/examples/customer-support-email-agent-starter/index.mdx"
sourceRel: "case-studies/examples/customer-support-email-agent-starter/index.mdx"
rawUrl: "/raw/08-agents/agent-systems-handbook/case-studies/examples/customer-support-email-agent-starter/index.mdx"
sourceSha256: "92bc0bfbaed6cf42e314dce3059d3cc4f70efa9b52679fafc0000399730e9d4f"
pageSha256: "92bc0bfbaed6cf42e314dce3059d3cc4f70efa9b52679fafc0000399730e9d4f"
contentMode: "local-full"
zh: ""
---

# Agent Systems Handbook（智能体系统手册）

import SupportCTA from "/snippets/support-cta.mdx";

## Summary

This starter turns the customer-support case study into a small local workflow:
read an inbound customer email, read a local support policy document, classify
the case, and draft a safe reply for human review.

## Status

`starter`

Source code: [case-studies/examples/customer-support-email-agent-starter](https://github.com/Prompthon-IO/agent-systems-handbook/tree/main/case-studies/examples/customer-support-email-agent-starter)

## Why It Exists

Customer support is a practical local-agent shape because the useful context is
often already nearby: an email export, a policy document, a refund rule, or an
FAQ file. This starter keeps that boundary visible by requiring explicit local
paths instead of pretending the agent knows the policy from memory.

## Related Lab Pages

- [Customer Support Agents](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/case-studies/customer-support-agents/README.md)
- [Case Studies Overview](/lib/08-agents/agent-systems-handbook/case-studies-2)
- [Protocols And Interoperability](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/systems/protocols-and-interoperability/README.md)

## Folder Structure

```text
customer-support-email-agent-starter/
├── index.mdx
├── skill/
│   └── SKILL.md
└── src/
    ├── email_triage.py
    ├── policy_loader.py
    └── reply_guardrails.py
```

## Quick Start

This is a starter, not a finished helpdesk integration. The code sketch uses
only the Python standard library and focuses on the local-path boundary.

Example:

```python
from reply_guardrails import draft_policy_grounded_reply

result = draft_policy_grounded_reply(
    email_text="Subject: Refund request\nI received the wrong item.",
    policy_path="/Users/example/support/refund-policy.md",
)

print(result.reply_subject)
print(result.reply_body)
print(result.needs_human_review)
```

For a repo-level smoke check, run `python3 scripts/verify_example_projects.py`
from the repository root.

## Included Sample Files

- `skill/SKILL.md`: skill instructions for checking customer email and drafting
  policy-grounded replies from a local document path
- `src/email_triage.py`: lightweight classification and summary helpers
- `src/policy_loader.py`: local policy loading and evidence extraction helpers
- `src/reply_guardrails.py`: draft generation and human-review guardrails

## Constraints

- No mailbox, Gmail, CRM, or helpdesk adapter is implemented.
- The starter reads local text-like policy files only.
- Drafts are intended for human review, not automatic sending.
- Classification is keyword-based and intentionally small.

## Next Steps

- Add a mailbox adapter that writes inbound messages to explicit local paths.
- Add structured policy sections with stronger retrieval.
- Add evaluation fixtures for refunds, billing, complaints, and escalation.
- Add an audit artifact that records policy evidence and reviewer decision.
