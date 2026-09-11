---
title: "Metrics with DeepEval"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/README.md"
zh: ""
---

# Metrics with DeepEval

This example shows how to score a support reply with [DeepEval](https://github.com/confident-ai/deepeval). It combines deterministic setup with three metrics: `AnswerRelevancyMetric`, `FaithfulnessMetric`, and a custom `GEval` rubric.

## Requirements

* [Python](https://www.python.org/) 3.9+
* An [OpenAI API key](https://platform.openai.com/api-keys)

## Steps for running this example

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

2. Export your OpenAI API key as an environment variable:
```bash
export OPENAI_API_KEY="sk-..." # Windows cmd: set OPENAI_API_KEY="sk-..." # Windows PowerShell: $env:OPENAI_API_KEY="sk-..."
```

3. Run the script:
```bash
python deepeval_metrics.py
```

## Output

The script prints the score and reason for each metric. This makes it easy to see whether the answer is relevant, grounded in the retrieved context, and aligned with the expected behavior.
