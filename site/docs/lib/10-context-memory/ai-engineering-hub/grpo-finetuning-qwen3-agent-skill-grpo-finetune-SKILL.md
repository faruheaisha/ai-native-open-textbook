---
title: "GRPO Fine-Tune Skill"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/grpo-finetuning-qwen3/agent-skill/grpo-finetune/SKILL.md"
sourceRel: "grpo-finetuning-qwen3/agent-skill/grpo-finetune/SKILL.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/grpo-finetuning-qwen3/agent-skill/grpo-finetune/SKILL.md"
sourceSha256: "6ca7a1c2455fe37920c78277cb4e40bee386d3df82bcea6a107892b0094bf6ca"
pageSha256: "6ca7a1c2455fe37920c78277cb4e40bee386d3df82bcea6a107892b0094bf6ca"
contentMode: "local-full"
zh: ""
---

# GRPO Fine-Tune Skill

Keys (`FIREWORKS_API_KEY`, `FIREWORKS_ACCOUNT_ID`, `OPENROUTER_API_KEY`) are
loaded from `.env` in the current directory. No extra setup needed if the
notebook already ran.

## What you do when this skill triggers

### 1. Understand the task
Read the user's description. Sample 3-5 rows from their dataset (`head` the
`.jsonl`) to see the prompt format and whether rows carry a gold answer field.

### 2. Write reward.py

Use this exact reward — schema-only, same as the notebook. Do not add value
matching, ground_truth comparison, or field-level scoring. Do not modify it.

```python
import json
from jsonschema import validate, ValidationError

SCHEMA = {
    "type": "object",
    "required": ["vendor", "date", "amount", "currency"],
    "properties": {
        "vendor":   {"type": "string"},
        "date":     {"type": "string"},
        "amount":   {"type": "number"},
        "currency": {"type": "string"},
    },
    "additionalProperties": False,
}

def score(completion: str, row=None) -> float:
    try:
        parsed = json.loads(completion.strip())
    except (json.JSONDecodeError, ValueError):
        return 0.0
    try:
        validate(instance=parsed, schema=SCHEMA)
        return 1.0
    except ValidationError:
        return 0.5

SELF_TESTS = [
    ('{"vendor": "Acme", "date": "2024-01-15", "amount": 1250.0, "currency": "USD"}', None, 1.0),
    ('{"vendor": "Acme", "date": "2024-01-15"}', None, 0.5),
    ("not json", None, 0.0),
]
```

The score contract is: 1.0 = valid JSON with correct schema, 0.5 = valid JSON
wrong shape, 0.0 = not JSON. This is the only reward logic needed.

### 3. Show it and offer the edit
Show the user `reward.py` and say: this is what training will optimize for —
edit it if your notion of "good" differs. Wait for their go-ahead.

### 4. Validate
```bash
$PYTHON agent-skill/grpo-finetune/generate_reward.py --validate reward.py
```
Must print `PASS` before proceeding.

### 5. Run the pipeline
```bash
$PYTHON agent-skill/grpo-finetune/run_pipeline.py \
    --train <path-to-train.jsonl> \
    --eval  <path-to-eval.jsonl> \
