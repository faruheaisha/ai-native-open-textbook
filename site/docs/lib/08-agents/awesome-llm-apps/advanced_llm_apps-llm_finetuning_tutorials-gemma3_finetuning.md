---
title: "Awesome LLM Apps"
sourceId: "08-agents/awesome-llm-apps"
sourceTitle: "Awesome LLM Apps"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps"
entryUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps/blob/9848ec842c5f559ad42654288cc6a38db6b175fb/advanced_llm_apps/llm_finetuning_tutorials/gemma3_finetuning/README.md"
sourceRel: "advanced_llm_apps/llm_finetuning_tutorials/gemma3_finetuning/README.md"
rawUrl: "/raw/08-agents/awesome-llm-apps/advanced_llm_apps/llm_finetuning_tutorials/gemma3_finetuning/README.md"
sourceSha256: "4d3d60849703abe5cc5b3190636087e66fd6f51df99e3466294c60457570123b"
pageSha256: "4d3d60849703abe5cc5b3190636087e66fd6f51df99e3466294c60457570123b"
contentMode: "local-full"
zh: ""
---

# Awesome LLM Apps

## 🦥 Finetune Gemma 3 with Unsloth (simple 4-bit LoRA)

Minimal example to finetune Google's Gemma 3 Instruct models with Unsloth using 4-bit loading + LoRA. Small, readable, and runnable on a CUDA GPU.

- **Models**: 270M, 1B, 4B, 12B, 27B
- **Dataset**: FineTome-100k (ShareGPT-style multi-turn chats)
- **Method**: Parameter-efficient LoRA (not full FT)

Reference: Unsloth’s Gemma 3 notes: [unsloth.ai/blog/gemma3](https://unsloth.ai/blog/gemma3)

### Install

```bash
pip install -r requirements.txt
# or latest Unsloth per their guidance
pip install --upgrade --force-reinstall --no-cache-dir unsloth unsloth_zoo
```

### Run

```bash
python finetune_gemma3.py
```

Outputs are saved to `finetuned_model/`.

### What the script does

1. Loads Gemma 3 with 4-bit quantization via Unsloth’s `FastModel`.
2. Attaches LoRA adapters to attention/MLP projections.
3. Prepares FineTome-100k by applying the Gemma 3 chat template.
4. Trains with TRL’s `SFTTrainer` for a few demo steps.
5. Saves the finetuned weights.

### Change model or settings

Edit the top of `finetune_gemma3.py`:

- `MODEL_NAME` (e.g., `unsloth/gemma-3-270m-it`, `unsloth/gemma-3-1b-it`)
- `MAX_SEQ_LEN`, `LOAD_IN_4BIT`, `FULL_FINETUNING`

Note: 4-bit/8-bit loading requires a CUDA GPU. On Mac (M1/M2), run on CPU/MPS without quantization or use a GPU machine.
