---
title: "Troubleshooting TRL Training Jobs"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/hugging-face-skills/skills/hugging-face-model-trainer/references/troubleshooting.md"
sourceRel: "hugging-face-skills/skills/hugging-face-model-trainer/references/troubleshooting.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/hugging-face-skills/skills/hugging-face-model-trainer/references/troubleshooting.md"
sourceSha256: "d49f61aec601ff34ddb99edb590d79aef9c3d9f3a82936855b82f8b62a9e5373"
pageSha256: "d49f61aec601ff34ddb99edb590d79aef9c3d9f3a82936855b82f8b62a9e5373"
contentMode: "local-full"
zh: ""
---

# Troubleshooting TRL Training Jobs

Common issues and solutions when training with TRL on Hugging Face Jobs.

## Training Hangs at "Starting training..." Step

**Problem:** Job starts but hangs at the training step - never progresses, never times out, just sits there.

**Root Cause:** Using `eval_strategy="steps"` or `eval_strategy="epoch"` without providing an `eval_dataset` to the trainer.

**Solution:**

**Option A: Provide eval_dataset (recommended)**
```python
# Create train/eval split
dataset_split = dataset.train_test_split(test_size=0.1, seed=42)

trainer = SFTTrainer(
    model="Qwen/Qwen2.5-0.5B",
    train_dataset=dataset_split["train"],
    eval_dataset=dataset_split["test"],  # ← MUST provide when eval_strategy is enabled
    args=SFTConfig(
        eval_strategy="steps",
        eval_steps=50,
        ...
    ),
)
```

**Option B: Disable evaluation**
```python
trainer = SFTTrainer(
    model="Qwen/Qwen2.5-0.5B",
    train_dataset=dataset,
    # No eval_dataset
    args=SFTConfig(
        eval_strategy="no",  # ← Explicitly disable
        ...
    ),
)
```

**Prevention:**
- Always create train/eval split for better monitoring
- Use `dataset.train_test_split(test_size=0.1, seed=42)`
- Check example scripts: `scripts/train_sft_example.py` includes proper eval setup

## Job Times Out

**Problem:** Job terminates before training completes, all progress lost.

**Solutions:**
- Increase timeout parameter (e.g., `"timeout": "4h"`)
- Reduce `num_train_epochs` or use smaller dataset slice
- Use smaller model or enable LoRA/PEFT to speed up training
- Add 20-30% buffer to estimated time for loading/saving overhead

**Prevention:**
- Always start with a quick demo run to estimate timing
- Use `scripts/estimate_cost.py` to get time estimates
- Monitor first runs closely via Trackio or logs

## Model Not Saved to Hub

**Problem:** Training completes but model doesn't appear on Hub - all work lost.

**Check:**
- [ ] `push_to_hub=True` in training config
- [ ] `hub_model_id` specified with username (e.g., `"username/model-name"`)
- [ ] `secrets=\{"HF_TOKEN": "$HF_TOKEN"\}` in job submission
- [ ] User has write access to target repo
- [ ] Token has write permissions (check at https://huggingface.co/settings/tokens)
- [ ] Training script calls `trainer.push_to_hub()` at the end

**See:** `references/hub_saving.md` for detailed Hub authentication troubleshooting

## Out of Memory (OOM)

**Problem:** Job fails with CUDA out of memory error.

**Solutions (in order of preference):**
1. **Reduce batch size:** Lower `per_device_train_batch_size` (try 4 → 2 → 1)
2. **Increase gradient accumulation:** Raise `gradient_accumulation_steps` to maintain effective batch size
3. **Disable evaluation:** Remove `eval_dataset` and `eval_strategy` (saves ~40% memory, good for demos)
4. **Enable LoRA/PEFT:** Use `peft_config=LoraConfig(r=8, lora_alpha=16)` to train adapters only (smaller rank = less memory)
5. **Use larger GPU:** Switch from `t4-small` → `l4x1` → `a10g-large` → `a100-large`
6. **Enable gradient checkpointing:** Set `gradient_checkpointing=True` in config (slower but saves memory)
7. **Use smaller model:** Try a smaller variant (e.g., 0.5B instead of 3B)

**Memory guidelines:**
- T4 (16GB): <1B models with LoRA
- A10G (24GB): 1-3B models with LoRA, <1B full fine-tune
- A100 (40GB/80GB): 7B+ models with LoRA, 3B full fine-tune

## Parameter Naming Issues

**Problem:** `TypeError: SFTConfig.__init__() got an unexpected keyword argument 'max_seq_length'`

**Cause:** TRL config classes use `max_length`, not `max_seq_length`.

**Solution:**
```python
# ✅ CORRECT - TRL uses max_length
SFTConfig(max_length=512)
DPOConfig(max_length=512)

# ❌ WRONG - This will fail
SFTConfig(max_seq_length=512)
```

**Note:** Most TRL configs don't require explicit max_length - the default (1024) works well. Only set if you need a specific value.

## Dataset Format Error

**Problem:** Training fails with dataset format errors or missing fields.

**Solutions:**
1. **Check format documentation:**
   ```python
   hf_doc_fetch("https://huggingface.co/docs/trl/dataset_formats")
   ```

2. **Validate dataset before training:**
   ```bash
   uv run https://huggingface.co/datasets/mcp-tools/skills/raw/main/dataset_inspector.py \
