---
title: "Source tools"
sourceId: "09-harness/harness-engineering-anthology"
sourceTitle: "Harness Engineering 文集"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/lopopolo/harness-engineering"
entryUrl: "https://github.com/lopopolo/harness-engineering/blob/226c8d35fb6ea3ed55467753dba6dea2b5fd5778/sources/scripts/README.md"
sourceRel: "sources/scripts/README.md"
rawUrl: "/raw/09-harness/harness-engineering-anthology/sources/scripts/README.md"
sourceSha256: "fd8ce8cfdd9840459b1782d5c91353bb4e0f1ab702b2f9ca834cb26596a9668e"
pageSha256: "fd8ce8cfdd9840459b1782d5c91353bb4e0f1ab702b2f9ca834cb26596a9668e"
contentMode: "local-full"
zh: ""
---

# Source tools

Run these commands from the repository root:

- `uv run --script sources/scripts/validate_manifest.py` validates source
  relationships, snapshot custody, hashes, and Twitter-corpus reconciliation.
- `uv run --script sources/scripts/test_manifest.py` runs the source-model and
  repository-contract tests.
- `uv run --locked --script sources/scripts/fetch_openai.py` retrieves readable
  text for the canonical OpenAI harness-engineering essay, falling back to the
  archived URL recorded in the manifest.

`source_manifest.py` and `twitter_corpus.py` own the typed domain models and
JSON boundaries used by the commands. They are library modules, not root-invoked
workflows.
