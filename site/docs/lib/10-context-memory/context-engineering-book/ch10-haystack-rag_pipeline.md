---
title: "RAG pipeline"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/haystack/rag_pipeline/README.md"
sourceRel: "ch10/haystack/rag_pipeline/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/haystack/rag_pipeline/README.md"
sourceSha256: "b011827251f236b62d7856ecab17456cb6168fdd154d41888b1c3d45611cfedd"
pageSha256: "b011827251f236b62d7856ecab17456cb6168fdd154d41888b1c3d45611cfedd"
contentMode: "local-full"
zh: ""
---

# RAG pipeline

This example uses a local Haystack pipeline with an in-memory document store and BM25 retrieval.

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
python haystack_rag_pipeline.py
```

## Output

```
Question: How do I keep notes organized?
Retrieved context:
- Organizing with tags: Use tags to group related notes and keep the workspace tidy.
- Archiving old notes: Archive finished notes instead of deleting them so they stay searchable.
```
