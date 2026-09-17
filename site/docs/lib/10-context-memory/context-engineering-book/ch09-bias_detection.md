---
title: "Bias detection: assessing fairness in AI recommendations"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch09/bias_detection/README.md"
sourceRel: "ch09/bias_detection/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch09/bias_detection/README.md"
sourceSha256: "5e2cbfc81f8dc490f9b1718b35fba88f40ff093bb7c044522dff0cb1093f2936"
pageSha256: "5e2cbfc81f8dc490f9b1718b35fba88f40ff093bb7c044522dff0cb1093f2936"
contentMode: "local-full"
zh: ""
---

# Bias detection: assessing fairness in AI recommendations

This example demonstrates how to use the [Fairlearn](https://fairlearn.org/) library to detect demographic parity issues in a model's recommendations.

## Requirements

This project requires [Python](https://www.python.org/) 3.12 or 3.13 and the libraries listed in `requirements.txt`.

## Steps for running this example
 
1. Create a virtual environment with Python 3.13 or 3.12, then install dependencies:
```bash
# macOS/Linux:
python3.13 -m venv .venv
source .venv/bin/activate

# Windows Command Prompt / PowerShell:
py -3.13 -m venv .venv
.venv\Scripts\activate.bat
# or
.venv\Scripts\Activate.ps1

pip install -r requirements.txt
```

2. Run the script:
```bash
python bias_detection.py
```

## Output

The script analyzes a mock dataset of credit approval recommendations, prints the selection rate for each age group, and calculates a demographic parity ratio to identify potential bias.

```text
[INFO] Analyzing bias in credit approval recommendations...
[INFO] Demographic Parity Metrics:
Selection rate for Young: 0.20
Selection rate for Senior: 0.60
[INFO] Demographic Parity Ratio: 0.33
[WARNING] Significant disparity detected against the Young group.
[INFO] This result suggests the context or model logic may be biased.
```
