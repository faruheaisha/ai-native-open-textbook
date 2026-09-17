---
title: "GRPO Fine-tuning on Fireworks Training API"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/grpo-finetuning-qwen3/README.md"
sourceRel: "grpo-finetuning-qwen3/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/grpo-finetuning-qwen3/README.md"
sourceSha256: "7e9f8c9f4c86b682318a45fb7ff4ff651eed2e6a691502fb34cc6974c7753ece"
pageSha256: "7e9f8c9f4c86b682318a45fb7ff4ff651eed2e6a691502fb34cc6974c7753ece"
contentMode: "local-full"
zh: ""
---

# GRPO Fine-tuning on Fireworks Training API

This project demonstrates how to fine-tune **Qwen3-8B** for structured JSON invoice extraction using GRPO (Group Relative Policy Optimization) via the Fireworks Training API. The training loop runs from a local notebook. The model trains on remote GPUs managed by Fireworks.

The fine-tuned model scores **82% schema-valid accuracy** on a held-out eval set, beating both the base Qwen3-8B (62%) and GPT-4.1 (58%) on the same task.

![Eval Chart](/mirror/2c/2c5b48410fbdfd27179e961b773956df5743732e.png)

---

## Setup and installations

**Get API Keys**:
- [Fireworks AI](https://fireworks.ai) — needed for training and inference. Requires RLOR (training) access. Store it as `FIREWORKS_API_KEY` in a `.env` file.
- [OpenRouter](https://openrouter.ai) — needed for base model and GPT-4.1 eval. Store it as `OPENROUTER_API_KEY` in a `.env` file.

Refer to `.env.example` for the structure of the file. You will also need your Fireworks account ID stored as `FIREWORKS_ACCOUNT_ID`.

**Clone the Fireworks cookbook**:
```bash
git clone https://github.com/fw-ai/cookbook.git
```

**Install Dependencies**:

Ensure you have Python 3.10 or later installed.

```bash
uv venv
source .venv/bin/activate
uv pip install python-dotenv jsonschema openai fireworks-ai matplotlib
uv pip install -e "cookbook/training[training]"
uv pip install eval-protocol nest_asyncio
```

Select the virtual environment as the kernel in the notebook.

**Run the notebook**:

Open and run `grpo_json_extraction.ipynb` end-to-end. The notebook covers:

1. Reward function that scores JSON completions against a schema
2. Dataset upload to Fireworks
3. GRPO training loop against remote GPUs
4. Baseline eval on base Qwen3-8B
5. Post-training eval on the fine-tuned model
6. GPT-4.1 comparison eval
7. Inference on the deployed model

---

## Agent Skill

The `agent-skill/grpo-finetune/` folder contains a reusable agent skill that wraps the full GRPO fine-tuning pipeline — from reward validation to dataset upload to training to inference — into a single runnable script.

**What's included**:

- `run_pipeline.py` — end-to-end pipeline: validates reward, uploads dataset, runs GRPO training, evals the fine-tuned model, and runs sample inference
- `generate_reward.py` — validates that your `reward.py` satisfies the scoring contract before any GPU spend
- `agent_demo.py` — runs the deployed fine-tuned model on sample invoices and prints structured extraction results
- `SKILL.md` — skill definition for Claude Code; describes when and how to trigger the skill

**Run the pipeline**:

```bash
python agent-skill/grpo-finetune/run_pipeline.py \
    --train ./train_prompts.jsonl \
    --eval  ./eval_prompts.jsonl \
    --task  invoice-extraction \
