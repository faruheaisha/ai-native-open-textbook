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
pageSha256: "fc17a9f286ae22ea2de82d56957ad2c72e4f8c8207863b7bbc4850a04bc4250e"
contentMode: "local-full"
zh: ""
---

## Security and guardrails

Meeting intelligence should be treated as a sensitive-data workflow, not just a transcription or summarization task. Raw recordings can contain customer names, commercial terms, support details, health or financial information, and internal strategy. Speaker reference clips can also be sensitive because they are tied to a person's voice. Once the pipeline turns that audio into structured outputs, those outputs may flow into CRM records, support tickets, account plans, dashboards, or review queues.

Security and guardrails matter most when the output can influence a business process. A sales call summary may capture pricing or contractual commitments. A support escalation may include production-impacting incidents or customer credentials. A recruiting debrief may include candidate feedback. A regulated-industry meeting may contain data that needs retention, access-control, or redaction policies. For these workflows, the safest pattern is to minimize raw audio retention, redact sensitive content where appropriate, require evidence-backed outputs, and route risky or low-confidence outputs through human review before downstream writes.

The included regex redaction is intentionally illustrative: it masks basic email and phone patterns only. It is not a complete PII or DLP system. For names, addresses, account identifiers, credentials, health data, financial data, or regulated workflows, use a policy-approved PII/DLP detector and keep a human review gate before downstream writes.

For the structured extraction step, this notebook sets `store=False` on the Responses API call so the generated meeting intelligence response is not stored as application state. `store=False` is a useful request-level control, but it is not the same as enabling Zero Data Retention for an organization or project. If your workflow requires stricter retention guarantees, review OpenAI's [data controls documentation](https://platform.openai.com/docs/models/default-usage-policies-by-endpoint) and confirm the right retention configuration for your use case.

| Risk | Guardrail |
| --- | --- |
| Recording or speaker-reference misuse | Require consent and policy approval before recording, diarization, or reference-clip use. Treat speaker references as sensitive biometric-adjacent data. |
| Over-retention of raw audio | Do not save the raw transcription response by default. Keep raw audio and reference clips only as long as needed. Encrypt and restrict access if retained. |
| Prompt injection inside transcripts | Treat transcript text as untrusted evidence. Keep instructions in the system message and require the model to use only transcript-backed facts. |
| Unsupported action items or decisions | Use strict structured outputs and require evidence references that point to real segment IDs and quotes. |
| Sensitive content in generated notes | Run redaction before summarization where possible, then run post-generation checks on the transcript and brief. |
| Harmful or policy-sensitive content | Optionally call the Moderation API with `omni-moderation-latest` on transcript text and generated brief text. Moderation detects harmful content; it is not a replacement for privacy review. |
| Unsafe downstream writes | Do not write directly to CRM, ticketing, or analytics systems from the model output. Put a human review gate in front of medium/high risks, missing evidence, moderation flags, or raw-response retention. |
| Silent quality drift | Log model versions, prompt versions, schema versions, audio duration, redaction state, moderation state, and reviewer decisions. Sample calls for evals. |
