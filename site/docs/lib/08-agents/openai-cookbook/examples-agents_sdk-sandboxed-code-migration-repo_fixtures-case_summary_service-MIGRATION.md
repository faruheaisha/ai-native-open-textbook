---
title: "Migration request: Chat Completions to Responses"
sourceId: "08-agents/openai-cookbook"
sourceTitle: "OpenAI Cookbook"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-cookbook"
entryUrl: "https://github.com/openai/openai-cookbook/blob/a0709e05a54d8dd1c4d9be3fc0a41526c3496c39/examples/agents_sdk/sandboxed-code-migration/repo_fixtures/case_summary_service/MIGRATION.md"
sourceRel: "examples/agents_sdk/sandboxed-code-migration/repo_fixtures/case_summary_service/MIGRATION.md"
rawUrl: "/raw/08-agents/openai-cookbook/examples/agents_sdk/sandboxed-code-migration/repo_fixtures/case_summary_service/MIGRATION.md"
sourceSha256: "592d495f09b3a3000ed99344be610261981b8732436834e76274004987d08dad"
pageSha256: "592d495f09b3a3000ed99344be610261981b8732436834e76274004987d08dad"
contentMode: "local-full"
zh: ""
---

# Migration request: Chat Completions to Responses

Migrate this case summary service from the legacy Chat Completions call shape to
the Responses API call shape.

## Current structure

- `case_summary_service/client.py` contains the OpenAI client wrapper.
- `case_summary_service/summaries.py` builds the summary prompt and calls the wrapper.
- `tests/` contains offline fakes for the legacy Chat Completions shape.

## Target shape

- In `case_summary_service/client.py`, call `client.responses.create(...)`
  instead of `client.chat.completions.create(...)`.
- Keep the same `model` argument.
- Replace the wrapper's `messages` argument with an `input_items` argument.
- In `case_summary_service/summaries.py`, pass the two-message system/user
  conversation as `input_items`.
- Forward `input_items` as the Responses API `input` argument.
- Keep `temperature=0`.
- Return `response.output_text` instead of `completion.choices[0].message.content`.
- Preserve the `summarize_case(client, *, model, case_notes)` function signature.
- Update client-wrapper and summary tests to fake the Responses API instead of
  Chat Completions.
- Tests must remain offline; do not import or instantiate the real OpenAI client.

## Required validation pipeline

- Before editing, run baseline tests: `python -m unittest discover -s tests -t .`.
- After editing, run the compile/check command: `python -m compileall -q case_summary_service tests`.
- After the compile/check command passes, run final tests: `python -m unittest discover -s tests -t .`.
- Validate with `python -m unittest discover -s tests -t .`.
