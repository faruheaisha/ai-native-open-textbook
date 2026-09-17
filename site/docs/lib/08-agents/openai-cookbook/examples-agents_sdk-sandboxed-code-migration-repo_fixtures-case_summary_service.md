---
title: "Case summary service"
sourceId: "08-agents/openai-cookbook"
sourceTitle: "OpenAI Cookbook"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-cookbook"
entryUrl: "https://github.com/openai/openai-cookbook/blob/a0709e05a54d8dd1c4d9be3fc0a41526c3496c39/examples/agents_sdk/sandboxed-code-migration/repo_fixtures/case_summary_service/README.md"
sourceRel: "examples/agents_sdk/sandboxed-code-migration/repo_fixtures/case_summary_service/README.md"
rawUrl: "/raw/08-agents/openai-cookbook/examples/agents_sdk/sandboxed-code-migration/repo_fixtures/case_summary_service/README.md"
sourceSha256: "c976f0e78e41057383fb03841363f23a31a258853148c30d114bddc4317acb32"
pageSha256: "c976f0e78e41057383fb03841363f23a31a258853148c30d114bddc4317acb32"
contentMode: "local-full"
zh: ""
---

# Case summary service

Small offline fixture for the sandboxed migration cookbook.

The pre-migration service wraps a Chat Completions call and uses it to summarize
internal case notes. Tests use fakes; they should never call the network.
