---
title: "TRL Training on Hugging Face Jobs"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/hugging-face-skills/skills/hugging-face-model-trainer/SKILL.md"
sourceRel: "hugging-face-skills/skills/hugging-face-model-trainer/SKILL.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/hugging-face-skills/skills/hugging-face-model-trainer/SKILL.md"
sourceSha256: "27f0fc8238d3a1d1cf46912b7012384cbb1efaa9632d3da7a3e7ab53b8189ff2"
pageSha256: "27f0fc8238d3a1d1cf46912b7012384cbb1efaa9632d3da7a3e7ab53b8189ff2"
contentMode: "local-full"
zh: ""
---

# TRL Training on Hugging Face Jobs

## Overview

Train language models using TRL (Transformer Reinforcement Learning) on fully managed Hugging Face infrastructure. No local GPU setup required—models train on cloud GPUs and results are automatically saved to the Hugging Face Hub.

**TRL provides multiple training methods:**
- **SFT** (Supervised Fine-Tuning) - Standard instruction tuning
- **DPO** (Direct Preference Optimization) - Alignment from preference data
- **GRPO** (Group Relative Policy Optimization) - Online RL training
- **Reward Modeling** - Train reward models for RLHF

**For detailed TRL method documentation:**
```python
hf_doc_search("your query", product="trl")
hf_doc_fetch("https://huggingface.co/docs/trl/sft_trainer")  # SFT
hf_doc_fetch("https://huggingface.co/docs/trl/dpo_trainer")  # DPO
# etc.
```

**See also:** `references/training_methods.md` for method overviews and selection guidance

## When to Use This Skill

Use this skill when users want to:
- Fine-tune language models on cloud GPUs without local infrastructure
- Train with TRL methods (SFT, DPO, GRPO, etc.)
- Run training jobs on Hugging Face Jobs infrastructure
- Convert trained models to GGUF for local deployment (Ollama, LM Studio, llama.cpp)
- Ensure trained models are permanently saved to the Hub
- Use modern workflows with optimized defaults

## Key Directives

When assisting with training jobs:

1. **ALWAYS use `hf_jobs()` MCP tool** - Submit jobs using `hf_jobs("uv", \{...\})`, NOT bash `trl-jobs` commands. The `script` parameter accepts Python code directly. Do NOT save to local files unless the user explicitly requests it. Pass the script content as a string to `hf_jobs()`. If user asks to "train a model", "fine-tune", or similar requests, you MUST create the training script AND submit the job immediately using `hf_jobs()`.

2. **Always include Trackio** - Every training script should include Trackio for real-time monitoring. Use example scripts in `scripts/` as templates.

3. **Provide job details after submission** - After submitting, provide job ID, monitoring URL, estimated time, and note that the user can request status checks later.

4. **Use example scripts as templates** - Reference `scripts/train_sft_example.py`, `scripts/train_dpo_example.py`, etc. as starting points.

## Local Script Dependencies

To run scripts locally (like `estimate_cost.py`), install dependencies:
```bash
pip install -r requirements.txt
```

## Prerequisites Checklist

Before starting any training job, verify:

### ✅ **Account & Authentication**
- Hugging Face Account with [Pro](https://hf.co/pro), [Team](https://hf.co/enterprise), or [Enterprise](https://hf.co/enterprise) plan (Jobs require paid plan)
- Authenticated login: Check with `hf_whoami()`
- **HF_TOKEN for Hub Push** ⚠️ CRITICAL - Training environment is ephemeral, must push to Hub or ALL training results are lost
- Token must have write permissions  
- **MUST pass `secrets=\{"HF_TOKEN": "$HF_TOKEN"}` in job config** to make token available (the `$HF_TOKEN` syntax
  references your actual token value)

### ✅ **Dataset Requirements**
- Dataset must exist on Hub or be loadable via `datasets.load_dataset()`
- Format must match training method (SFT: "messages"/text/prompt-completion; DPO: chosen/rejected; GRPO: prompt-only)
- **ALWAYS validate unknown datasets** before GPU training to prevent format failures (see Dataset Validation section below)
- Size appropriate for hardware (Demo: 50-100 examples on t4-small; Production: 1K-10K+ on a10g-large/a100-large)

### ⚠️ **Critical Settings**
- **Timeout must exceed expected training time** - Default 30min is TOO SHORT for most training. Minimum recommended: 1-2 hours. Job fails and loses all progress if timeout is exceeded.
- **Hub push must be enabled** - Config: `push_to_hub=True`, `hub_model_id="username/model-name"`; Job: `secrets=\{"HF_TOKEN": "$HF_TOKEN"\}`

## Asynchronous Job Guidelines

**⚠️ IMPORTANT: Training jobs run asynchronously and can take hours**

### Action Required

**When user requests training:**
1. **Create the training script** with Trackio included (use `scripts/train_sft_example.py` as template)
2. **Submit immediately** using `hf_jobs()` MCP tool with script content inline - don't save to file unless user requests
3. **Report submission** with job ID, monitoring URL, and estimated time
4. **Wait for user** to request status checks - don't poll automatically

### Ground Rules
- **Jobs run in background** - Submission returns immediately; training continues independently
- **Initial logs delayed** - Can take 30-60 seconds for logs to appear
- **User checks status** - Wait for user to request status updates
- **Avoid polling** - Check logs only on user request; provide monitoring links instead

### After Submission

**Provide to user:**
- ✅ Job ID and monitoring URL
- ✅ Expected completion time
- ✅ Trackio dashboard URL
- ✅ Note that user can request status checks later

**Example Response:**
```
✅ Job submitted successfully!

Job ID: abc123xyz
Monitor: https://huggingface.co/jobs/username/abc123xyz

Expected time: ~2 hours
Estimated cost: ~$10

The job is running in the background. Ask me to check status/logs when ready!
```

## Quick Start: Three Approaches

**💡 Tip for Demos:** For quick demos on smaller GPUs (t4-small), omit `eval_dataset` and `eval_strategy` to save ~40% memory. You'll still see training loss and learning progress.

### Sequence Length Configuration

**TRL config classes use `max_length` (not `max_seq_length`)** to control tokenized sequence length:

```python
# ✅ CORRECT - If you need to set sequence length
SFTConfig(max_length=512)   # Truncate sequences to 512 tokens
DPOConfig(max_length=2048)  # Longer context (2048 tokens)

# ❌ WRONG - This parameter doesn't exist
SFTConfig(max_seq_length=512)  # TypeError!
```

**Default behavior:** `max_length=1024` (truncates from right). This works well for most training.

**When to override:**
- **Longer context**: Set higher (e.g., `max_length=2048`)
- **Memory constraints**: Set lower (e.g., `max_length=512`)
- **Vision models**: Set `max_length=None` (prevents cutting image tokens)

**Usually you don't need to set this parameter at all** - the examples below use the sensible default.

### Approach 1: UV Scripts (Recommended—Default Choice)

UV scripts use PEP 723 inline dependencies for clean, self-contained training. **This is the primary approach for Claude Code.**

```python
hf_jobs("uv", {
    "script": """
# /// script
# dependencies = ["trl>=0.12.0", "peft>=0.7.0", "trackio"]
# ///

from datasets import load_dataset
from peft import LoraConfig
from trl import SFTTrainer, SFTConfig
import trackio

dataset = load_dataset("trl-lib/Capybara", split="train")

# Create train/eval split for monitoring
dataset_split = dataset.train_test_split(test_size=0.1, seed=42)

trainer = SFTTrainer(
    model="Qwen/Qwen2.5-0.5B",
    train_dataset=dataset_split["train"],
    eval_dataset=dataset_split["test"],
    peft_config=LoraConfig(r=16, lora_alpha=32),
    args=SFTConfig(
        output_dir="my-model",
        push_to_hub=True,
        hub_model_id="username/my-model",
        num_train_epochs=3,
        eval_strategy="steps",
        eval_steps=50,
        report_to="trackio",
        project="meaningful_prject_name", # project name for the training name (trackio)
        run_name="meaningful_run_name",   # descriptive name for the specific training run (trackio)
    )
)

trainer.train()
trainer.push_to_hub()
""",
    "flavor": "a10g-large",
    "timeout": "2h",
    "secrets": {"HF_TOKEN": "$HF_TOKEN"}
})
```

**Benefits:** Direct MCP tool usage, clean code, dependencies declared inline (PEP 723), no file saving required, full control
**When to use:** Default choice for all training tasks in Claude Code, custom training logic, any scenario requiring `hf_jobs()`

#### Working with Scripts

⚠️ **Important:** The `script` parameter accepts either inline code (as shown above) OR a URL. **Local file paths do NOT work.**

**Why local paths don't work:**
Jobs run in isolated Docker containers without access to your local filesystem. Scripts must be:
- Inline code (recommended for custom training)
- Publicly accessible URLs
- Private repo URLs (with HF_TOKEN)

**Common mistakes:**
```python
# ❌ These will all fail
hf_jobs("uv", {"script": "train.py"})
hf_jobs("uv", {"script": "./scripts/train.py"})
hf_jobs("uv", {"script": "/path/to/train.py"})
```

**Correct approaches:**
```python
# ✅ Inline code (recommended)
hf_jobs("uv", {"script": "# /// script\n# dependencies = [...]\n# ///\n\n<your code>"})

# ✅ From Hugging Face Hub
hf_jobs("uv", {"script": "https://huggingface.co/user/repo/resolve/main/train.py"})

# ✅ From GitHub
hf_jobs("uv", {"script": "https://raw.githubusercontent.com/user/repo/main/train.py"})

# ✅ From Gist
hf_jobs("uv", {"script": "https://gist.githubusercontent.com/user/id/raw/train.py"})
```

**To use local scripts:** Upload to HF Hub first:
```bash
huggingface-cli repo create my-training-scripts --type model
huggingface-cli upload my-training-scripts ./train.py train.py
# Use: https://huggingface.co/USERNAME/my-training-scripts/resolve/main/train.py
```

### Approach 2: TRL Maintained Scripts (Official Examples)

TRL provides battle-tested scripts for all methods. Can be run from URLs:

```python
hf_jobs("uv", {
    "script": "https://raw.githubusercontent.com/huggingface/trl/main/trl/scripts/sft.py",
    "script_args": [
        "--model_name_or_path", "Qwen/Qwen2.5-0.5B",
        "--dataset_name", "trl-lib/Capybara",
        "--output_dir", "my-model",
        "--push_to_hub",
        "--hub_model_id", "username/my-model"
    ],
    "flavor": "a10g-large",
    "timeout": "2h",
    "secrets": {"HF_TOKEN": "$HF_TOKEN"}
})
```

**Benefits:** No code to write, maintained by TRL team, production-tested
**When to use:** Standard TRL training, quick experiments, don't need custom code
**Available:** Scripts are available from https://github.com/huggingface/trl/tree/main/examples/scripts

### Finding More UV Scripts on Hub

The `uv-scripts` organization provides ready-to-use UV scripts stored as datasets on Hugging Face Hub:

```python
# Discover available UV script collections
dataset_search({"author": "uv-scripts", "sort": "downloads", "limit": 20})

# Explore a specific collection
hub_repo_details(["uv-scripts/classification"], repo_type="dataset", include_readme=True)
```

**Popular collections:** ocr, classification, synthetic-data, vllm, dataset-creation

### Approach 3: HF Jobs CLI (Direct Terminal Commands)

When the `hf_jobs()` MCP tool is unavailable, use the `hf jobs` CLI directly.

**⚠️ CRITICAL: CLI Syntax Rules**

```bash
# ✅ CORRECT syntax - flags BEFORE script URL
hf jobs uv run --flavor a10g-large --timeout 2h --secrets HF_TOKEN "https://example.com/train.py"

# ❌ WRONG - "run uv" instead of "uv run"
hf jobs run uv "https://example.com/train.py" --flavor a10g-large

# ❌ WRONG - flags AFTER script URL (will be ignored!)
hf jobs uv run "https://example.com/train.py" --flavor a10g-large

# ❌ WRONG - "--secret" instead of "--secrets" (plural)
hf jobs uv run --secret HF_TOKEN "https://example.com/train.py"
```

**Key syntax rules:**
1. Command order is `hf jobs uv run` (NOT `hf jobs run uv`)
2. All flags (`--flavor`, `--timeout`, `--secrets`) must come BEFORE the script URL
3. Use `--secrets` (plural), not `--secret`
4. Script URL must be the last positional argument

**Complete CLI example:**
```bash
hf jobs uv run \
  --flavor a10g-large \
  --timeout 2h \
  --secrets HF_TOKEN \
  "https://huggingface.co/user/repo/resolve/main/train.py"
```

**Check job status via CLI:**
```bash
hf jobs ps                        # List all jobs
