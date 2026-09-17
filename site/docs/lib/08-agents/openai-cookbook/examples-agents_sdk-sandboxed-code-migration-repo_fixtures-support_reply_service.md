---
title: "Customer Support Reply Bot"
sourceId: "08-agents/openai-cookbook"
sourceTitle: "OpenAI Cookbook"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-cookbook"
entryUrl: "https://github.com/openai/openai-cookbook/blob/a0709e05a54d8dd1c4d9be3fc0a41526c3496c39/examples/agents_sdk/sandboxed-code-migration/repo_fixtures/support_reply_service/README.md"
sourceRel: "examples/agents_sdk/sandboxed-code-migration/repo_fixtures/support_reply_service/README.md"
rawUrl: "/raw/08-agents/openai-cookbook/examples/agents_sdk/sandboxed-code-migration/repo_fixtures/support_reply_service/README.md"
sourceSha256: "990163ad0c453354fd8b3e7f444a8aa053d0990686ea78a58eca69aaef82c067"
pageSha256: "990163ad0c453354fd8b3e7f444a8aa053d0990686ea78a58eca69aaef82c067"
contentMode: "local-full"
zh: ""
---

# Customer Support Reply Bot

This tiny package drafts a support-agent reply with the OpenAI Python client.

The current implementation still uses Chat Completions through a small wrapper
in `customer_support_bot/client.py`. The migration target is in `MIGRATION.md`.
