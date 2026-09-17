---
title: "Hugging Face Skills (with Brightdata support)"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/hugging-face-skills/README.md"
sourceRel: "hugging-face-skills/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/hugging-face-skills/README.md"
sourceSha256: "05056b23b513dab4b84ced46b3833ca2bbdcca6da663eb60f8ca8c9113a93618"
pageSha256: "05056b23b513dab4b84ced46b3833ca2bbdcca6da663eb60f8ca8c9113a93618"
contentMode: "local-full"
zh: ""
---

# Hugging Face Skills (with Brightdata support)

This project is an extension of the [Hugging Face Skills](https://github.com/huggingface/skills) project. Hugging Face Skills are definitions for AI/ML tasks like dataset creation, model training, and evaluation. They are interoperable with all major coding agent tools like Claude Code. This repository includes a new skill for Bright Data to interact with the web and perform various tasks.

The Skills in this repository follow the standardized format [Agent Skill](https://agentskills.io/home) format.

## How do Skills work?

In practice, skills are self-contained folders that package instructions, scripts, and resources together for an AI agent to use on a specific use case. Each folder includes a `SKILL.md` file with YAML frontmatter (name and description) followed by the guidance your coding agent follows while the skill is active.

## Installation

Run the following commands to test it out yourself:


2. Install skills:
```bash
bash scripts/link-skills.sh
```

3. Run Claude Code:

```bash
claude
```

4. Verify skills:

```bash
/skills
```

Follow the following blog post for more information:

- [We Got Claude to Fine-Tune an Open Source LLM](https://huggingface.co/blog/hf-skills-training)

## Skills

This repository has the following skills:

### Available skills



| Name | Description | Documentation |
|------|-------------|---------------|
| `brightdata-web-mcp` | Use Bright Data Web MCP to interact with the web and perform various tasks. | [SKILL.md](/lib/10-context-memory/ai-engineering-hub/hugging-face-skills-skills-brightdata-web-mcp-SKILL) |
| `hugging-face-cli` | Execute Hugging Face Hub operations using the hf CLI. Download models/datasets, upload files, manage repos, and run cloud compute jobs. | [SKILL.md](/lib/10-context-memory/ai-engineering-hub/hugging-face-skills-skills-hugging-face-cli-SKILL) |
| `hugging-face-datasets` | Create and manage datasets on Hugging Face Hub. Supports initializing repos, defining configs/system prompts, streaming row updates, and SQL-based dataset querying/transformation. | [SKILL.md](/lib/10-context-memory/ai-engineering-hub/hugging-face-skills-skills-hugging-face-datasets-SKILL) |
| `hugging-face-evaluation` | Add and manage evaluation results in Hugging Face model cards. Supports extracting eval tables from README content, importing scores from Artificial Analysis API, and running custom evaluations with vLLM/lighteval. | [SKILL.md](/lib/10-context-memory/ai-engineering-hub/hugging-face-skills-skills-hugging-face-evaluation-SKILL) |
| `hugging-face-jobs` | Run compute jobs on Hugging Face infrastructure. Execute Python scripts, manage scheduled jobs, and monitor job status. | [SKILL.md](/lib/10-context-memory/ai-engineering-hub/hugging-face-skills-skills-hugging-face-jobs-SKILL) |
| `hugging-face-model-trainer` | Train or fine-tune language models using TRL on Hugging Face Jobs infrastructure. Covers SFT, DPO, GRPO and reward modeling training methods, plus GGUF conversion for local deployment. Includes hardware selection, cost estimation, Trackio monitoring, and Hub persistence. | [SKILL.md](/lib/10-context-memory/ai-engineering-hub/hugging-face-skills-skills-hugging-face-model-trainer-SKILL) |
| `hugging-face-paper-publisher` | Publish and manage research papers on Hugging Face Hub. Supports creating paper pages, linking papers to models/datasets, claiming authorship, and generating professional markdown-based research articles. | [SKILL.md](/lib/10-context-memory/ai-engineering-hub/hugging-face-skills-skills-hugging-face-paper-publisher-SKILL) |
| `hugging-face-tool-builder` | Build reusable scripts for Hugging Face API operations. Useful for chaining API calls or automating repeated tasks. | [SKILL.md](/lib/10-context-memory/ai-engineering-hub/hugging-face-skills-skills-hugging-face-tool-builder-SKILL) |
| `hugging-face-trackio` | Track and visualize ML training experiments with Trackio. Log metrics via Python API and retrieve them via CLI. Supports real-time dashboards synced to HF Spaces. | [SKILL.md](/lib/10-context-memory/ai-engineering-hub/hugging-face-skills-skills-hugging-face-trackio-SKILL) |


### Using skills in your coding agent

Once a skill is installed, mention it directly while giving your coding agent instructions:

- "Use the Bright Data web skill to scrape this website 'https://example.com/'."
- "Use the HF LLM trainer skill to estimate the GPU memory needed for a 70B model run."
- "Use the HF model evaluation skill to launch `run_eval_job.py` on the latest checkpoint."
- "Use the HF dataset creator skill to draft new few-shot classification templates."
- "Use the HF paper publisher skill to index my arXiv paper and link it to my model."

Your coding agent automatically loads the corresponding `SKILL.md` instructions and helper scripts while it completes the task.

### Customize a skill

1. Copy one of the existing skill folders (for example, `hf-datasets/`) and rename it.
2. Update the new folder's `SKILL.md` frontmatter:

   ```markdown
   ---
   name: my-skill-name
   description: Describe what the skill does and when to use it
   ---

   # Skill Title

   Guidance + examples + guardrails
   ```

3. Add or edit supporting scripts, templates, and documents referenced by your instructions.
4. Add an entry to `.claude-plugin/marketplace.json` with a concise, human-readable description.
5. Run `python scripts/generate_agents.py` to validate the structure.
6. Reinstall or reload the skill bundle in your coding agent so the updated folder is available.

### Marketplace

The `.claude-plugin/marketplace.json` file lists skills with human-readable descriptions for the plugin marketplace. The CI validates that skill names and paths match between `SKILL.md` files and `marketplace.json`, but descriptions are maintained separately: `SKILL.md` descriptions guide when Claude activates the skill, while marketplace descriptions are written for humans browsing available skills.

### Additional references

- Browse the latest instructions, scripts, and templates directly at [huggingface/skills](https://github.com/huggingface/skills).
- Review Hugging Face documentation for the specific libraries or workflows you reference inside each skill.
- Review [Bright Data documentation](https://docs.brightdata.com/) for anything related to Bright Data.

## 📬 Stay Updated with Our Newsletter!

**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

## Contribution
