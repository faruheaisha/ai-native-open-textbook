---
title: "LangChain DeepAgents"
sourceId: "09-harness/langchain-deepagents"
sourceTitle: "LangChain DeepAgents"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/langchain-ai/deepagents"
entryUrl: "https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/libs/code/THREAT_MODEL.md"
sourceRel: "libs/code/THREAT_MODEL.md"
rawUrl: "/raw/09-harness/langchain-deepagents/libs/code/THREAT_MODEL.md"
sourceSha256: "3c2cc0e59404e891c3f675fd7a4f39e610cbad666bd5ec5ae6b0f1b09774c3dc"
pageSha256: "be5d8a499dd29dcd109271955d182e891b49b5da3ae1e836e1322ba0a7358bec"
contentMode: "local-full"
zh: ""
---

## Investigated and Dismissed

| ID | Original Threat | Investigation | Evidence | Conclusion |
|----|----------------|---------------|----------|------------|
| D1 | Unsafe msgpack deserialization in langgraph checkpoint loading | Verified fix status — confirmed fixed and closed upstream. | Users on current `langgraph` versions are not exposed. | Upstream langgraph has patched the unsafe msgpack deserialization. No longer an active risk. |
| D2 | Unicode URL homoglyph as project vulnerability | Traced `check_url_safety` + `strip_dangerous_unicode` + `format_warning_detail` → approval dialog display | `unicode_security.check_url_safety`, `agent._format_fetch_url_description` | Warning system is the intended control — the project correctly surfaces the risk to the user in the approval dialog. Not a project vulnerability; classified as mitigated by design (UI warning). |
| D3 | SSRF via `http_request` / `fetch_url` to internal services | Traced `tools.http_request` and `tools.fetch_url` — no URL scheme or host blocklist. However, both tools require HITL approval in interactive mode. In non-interactive mode, only shell commands are auto-approved via the allow-list; HTTP tools still go through the HITL interrupt gate. | `tools.http_request`, `tools.fetch_url`, `agent._add_interrupt_on` | Not a project vulnerability in isolation — the HITL gate is the intended control for all HTTP tool calls. The user sees the full URL before approving. SSRF is only reachable if the user approves the request (interactive) or enables auto-approve (explicit opt-in). Classified as out-of-scope for the same reason as prompt injection in interactive mode. |
| D4 | Offload path injection via archive filename | Checked `SummarizationMiddleware._get_session_id`/`_get_history_path` — the leaf is `session_` plus a `uuid4().hex`. | `SummarizationMiddleware._get_session_id`, `SummarizationMiddleware._get_history_path` | The archive filename is minted by the framework from a UUID4 hex, so no user-controlled path component reaches the file path. Not exploitable. |
