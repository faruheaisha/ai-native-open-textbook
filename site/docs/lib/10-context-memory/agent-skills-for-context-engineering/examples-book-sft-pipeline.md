---
title: "Book SFT Pipeline"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/README.md"
zh: ""
---

# Book SFT Pipeline

A standalone example skill for training language models to write in any author's style. It is not published as a separate Claude Code marketplace plugin from this repository.

## Installation

### Claude Code / Cursor / Codex

Agent Skills hosts expect a directory containing `SKILL.md`, not a flat copied markdown file. From the repository root, copy the whole example directory into the target skill root:

```bash
# Claude Code project-scoped install
mkdir -p .claude/skills
cp -R examples/book-sft-pipeline .claude/skills/book-sft-pipeline

# Cursor project-scoped install
mkdir -p .cursor/skills
cp -R examples/book-sft-pipeline .cursor/skills/book-sft-pipeline

# Codex / OpenAI Agent Skills install
mkdir -p .agents/skills
cp -R examples/book-sft-pipeline .agents/skills/book-sft-pipeline
```

### Manual

Reference the `examples/book-sft-pipeline/SKILL.md` file directly only if your agent does not support the Agent Skills directory layout.

## What's Included

```
book-sft-pipeline/
├── README.md                 # This file
├── SKILL.md                  # Complete skill documentation (standalone)
├── examples/
│   └── gertrude-stein/       # Complete case study with real outputs
│       ├── README.md         # Results and analysis
│       ├── sample_outputs.md # Raw model outputs
│       ├── training_config.json
│       ├── dataset_sample.jsonl
│       └── pangram/          # AI detector screenshots
├── scripts/
│   └── pipeline_example.py   # Conceptual implementation
└── references/
    ├── segmentation-strategies.md
    ├── tinker-format.md
    └── tinker.txt
```

## Key Results

Trained Qwen3-8B-Base on Gertrude Stein's "Three Lives" (1909):

| Metric | Value |
|--------|-------|
| Training examples | 592 |
| Loss reduction | 97% |
| Pangram AI detector | 70% Human |
| Training time | 15 minutes |
| Total cost | $2 |

## Related Context Engineering Skills

This skill applies patterns from the [Agent Skills for Context Engineering](/lib/10-context-memory/agent-skills-for-context-engineering/overview) collection:

| Skill | Application |
|-------|-------------|
| [project-development](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/skills/project-development/README.md) | Staged pipeline architecture |
| [context-compression](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/skills/context-compression/README.md) | Segmentation strategy |
| [multi-agent-patterns](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/skills/multi-agent-patterns/README.md) | Orchestrator pattern |
| [evaluation](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/skills/evaluation/README.md) | Modern scenario testing |
| [context-fundamentals](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/skills/context-fundamentals/README.md) | Prompt diversity |

## Resources

- [Dataset on Hugging Face](https://huggingface.co/datasets/MuratcanKoylan/gertrude-stein-style-sft)
- [Research Paper](https://arxiv.org/pdf/2510.13939) (Chakrabarty et al. 2025)
