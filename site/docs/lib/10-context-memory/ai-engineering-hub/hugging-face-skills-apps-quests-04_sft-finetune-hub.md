---
title: "Week 3: Supervised Fine-Tuning on the Hub"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/hugging-face-skills/apps/quests/04_sft-finetune-hub.md"
sourceRel: "hugging-face-skills/apps/quests/04_sft-finetune-hub.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/hugging-face-skills/apps/quests/04_sft-finetune-hub.md"
sourceSha256: "b2206115aaa8d1fb41be52d0561890c2d293c9f30bde163c21ae7fd5d10221a1"
pageSha256: "b2206115aaa8d1fb41be52d0561890c2d293c9f30bde163c21ae7fd5d10221a1"
contentMode: "local-full"
zh: ""
---

# Week 3: Supervised Fine-Tuning on the Hub

Fine-tune and share models on the Hub. Take a base model, train it on your data, and publish the result for the community to use.

## Why This Matters

Fine-tuning is how we adapt foundation models to specific tasks. By sharing fine-tuned models—along with your training methodology—you're giving the community ready-to-use solutions and reproducible recipes they can learn from.

## The Skill

Use `hf-llm-trainer/` for this quest. Key capabilities:

- **SFT** (Supervised Fine-Tuning) — Standard instruction tuning
- **DPO** (Direct Preference Optimization) — Alignment from preference data
- **GRPO** (Group Relative Policy Optimization) — Online RL training
- Cloud GPU training on HF Jobs—no local setup required
- Trackio integration for real-time monitoring
- GGUF conversion for local deployment

Your coding agent uses `hf_jobs()` to submit training scripts directly to HF infrastructure.

## XP Tiers

We'll announce the XP tiers for this quest soon.

## Resources

- [SKILL.md](https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/hugging-face-skills/hf-llm-trainer/SKILL.md) — Full skill documentation
- [SFT Example](https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/hugging-face-skills/hf-llm-trainer/scripts/train_sft_example.py) — Production SFT template
- [DPO Example](https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/hugging-face-skills/hf-llm-trainer/scripts/train_dpo_example.py) — Production DPO template
- [GRPO Example](https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/hugging-face-skills/hf-llm-trainer/scripts/train_grpo_example.py) — Production GRPO template
- [Training Methods](https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/hugging-face-skills/hf-llm-trainer/references/training_methods.md) — Method selection guide
- [Hardware Guide](https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/hugging-face-skills/hf-llm-trainer/references/hardware_guide.md) — GPU selection
