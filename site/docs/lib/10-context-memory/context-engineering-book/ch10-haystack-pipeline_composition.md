---
title: "Pipeline composition"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/haystack/pipeline_composition/README.md"
sourceRel: "ch10/haystack/pipeline_composition/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/haystack/pipeline_composition/README.md"
sourceSha256: "8a5fc13de05f4e03550ac858effeea70d216e6579e8e7d6c10fdc8ba16de5f79"
pageSha256: "8a5fc13de05f4e03550ac858effeea70d216e6579e8e7d6c10fdc8ba16de5f79"
contentMode: "local-full"
zh: ""
---

# Pipeline composition

This example composes a small Haystack pipeline out of separate retrieval, context assembly, and response formatting stages.

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
python haystack_pipeline_composition.py
```

## Output

```
Question: organize notes
Pipeline composition answer:
- retrieval gathers the local notes
- assembly turns them into a readable context
- final context:
Pipeline composition: Haystack pipelines keep retrieval, assembly, and formatting separate when you organize notes.
Single-purpose stages: A small pipeline is easier to test when each component does one job.
```
