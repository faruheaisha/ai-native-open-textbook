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
sourceRel: "cookbook/examples/audio/speaker_aware_meeting_intelligence/speaker_aware_meeting_intelligence.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/audio/speaker_aware_meeting_intelligence/speaker_aware_meeting_intelligence.md"
sourceSha256: "69a817e38abb5d8c4a2e4aa9b343ab8f4b306e5d0eb313b163f0c27b6071f535"
pageSha256: "eee23b8b5617e95f1aa07fe7fc939e7b1da4743ec9ea6ae73d3fbea922e3505b"
contentMode: "local-full"
zh: ""
---

## Production hardening checklist

Use this checklist before turning the sample into a customer workflow:

| Concern | Recommendation |
| --- | --- |
| Consent | Make sure call recording, diarization, and known-speaker references are permitted in your product, policy, and region. |
| Raw audio retention | Store raw audio only as long as needed. Persist normalized transcript segments when possible. |
| Large recordings | Reject files over 25 MB before upload. Compress or split longer meetings, then preserve timestamp offsets when combining results. |
| PII and DLP | Treat the included email and phone regexes as illustrative only. Use a policy-approved PII/DLP detector and human review for sensitive or regulated workflows. |
| Speaker references | Treat reference clips as sensitive data. Store minimally, encrypt at rest, and rotate/delete when no longer needed. |
| Evidence | Require structured evidence references on decisions, risks, and action items. Validate that each reference points to a real segment ID and quote. |
| Human review | Route high-risk summaries, compliance promises, pricing claims, or contractual terms for review. |
| Moderation | Use the Moderation API for harmful-content classification when notes may contain unsafe content. Keep privacy and compliance checks separate. |
| Retry behavior | Retry transient API errors with backoff. Avoid duplicating downstream CRM writes by using idempotency keys. |
| Observability | Log model names, prompt versions, schema versions, audio duration, latency, redaction status, and reviewer decisions. |
| Evaluation | Sample calls weekly. Track speaker attribution accuracy, action-item precision, and unsupported-claim rate. |
