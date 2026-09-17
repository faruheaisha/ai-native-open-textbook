---
title: "Query expansion"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/haystack/query_expansion/README.md"
sourceRel: "ch10/haystack/query_expansion/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/haystack/query_expansion/README.md"
sourceSha256: "0f364c1fcf64d79f1c3c630a335de026c1dbc451512b17d957821bafef528c09"
pageSha256: "0f364c1fcf64d79f1c3c630a335de026c1dbc451512b17d957821bafef528c09"
contentMode: "local-full"
zh: ""
---

# Query expansion

This example expands a user query into a few local variants, runs BM25 retrieval for each variant, and merges the results.

## Requirements

* [Python](https://www.python.org/) 3.10+

## Steps for running this example in the shell

1. Install dependencies:
```bash
python -m venv .venv

# macOS/Linux:
source .venv/bin/activate

# Windows Command Prompt:
.venv\Scripts\activate.bat

# Windows PowerShell:
.venv\Scripts\Activate.ps1

pip install -r requirements.txt
```

2. Run the script:
```bash
python haystack_query_expansion.py
```

## Output

```
Question: sync notes
Expanded retrieval:
- Syncing notes: Sync notes from every device after you sign in.
- Organizing notes: Organize notes with tags and folders.
- Backing up notes: Backup notes regularly so you can restore them later.
```
