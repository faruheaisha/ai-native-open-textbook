---
title: "Fine-tuning: customizing model behavior"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch09/fine_tuning/README.md"
sourceRel: "ch09/fine_tuning/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch09/fine_tuning/README.md"
sourceSha256: "1ae66c81f892979bd2c0ecf1c42163a022e5e4f0d1a4d910d90f88d3c7bc0a31"
pageSha256: "1ae66c81f892979bd2c0ecf1c42163a022e5e4f0d1a4d910d90f88d3c7bc0a31"
contentMode: "local-full"
zh: ""
---

# Fine-tuning: customizing model behavior

This example demonstrates how to fine-tune a small language model ([DistilGPT2](https://huggingface.co/distilbert/distilgpt2)) on a tiny instruction-response dataset so it adopts a simple clinic-assistant persona.

## Requirements

This project requires [Python](https://www.python.org/) 3.x and the libraries listed in `requirements.txt`.

## Steps for running this example

1. Install dependencies:
```bash
python -m venv .venv
source .venv/bin/activate  # Windows cmd: .venv\Scripts\activate # Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Run the script:
```bash
python fine_tuning.py
```

## Output

The script loads the dataset, tokenizes the examples, configures a Hugging Face `Trainer`, runs a short training loop, saves the updated model, and prints a sample generation.

```text
[INFO] Loading tokenizer and model: distilgpt2
[INFO] Preparing dataset...
[INFO] Configuring trainer...
...
[INFO] Saving model to ./clinic-assistant-distilgpt2
[INFO] Testing fine-tuned model...
Generated Output:
Instruction: Help me book an appointment.
Response: Please arrive 15 minutes early to complete any necessary forms.
```
