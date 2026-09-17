---
title: "Talk Pipeline Skills"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/talk-pipeline/README.md"
sourceRel: "examples/skills/talk-pipeline/README.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/talk-pipeline/README.md"
sourceSha256: "50b43348a24ecab17faf742e0bc4fadbba1aaea1625c7c4f09e6aff879668143"
pageSha256: "50b43348a24ecab17faf742e0bc4fadbba1aaea1625c7c4f09e6aff879668143"
contentMode: "local-full"
zh: ""
---

# Talk Pipeline Skills

6-stage skill pipeline that transforms raw material (article, transcript, notes) into a complete conference talk with AI-generated slides.

## Install

Copy the `talk-pipeline/` directory to your project's `.claude/skills/` folder:

```bash
cp -r examples/skills/talk-pipeline ~/.claude/skills/
```

Or install only the stages you need (each stage is independent).

## Stages

| Stage | Skill file | Mode | Description |
|-------|-----------|------|-------------|
| 1 | `stage-1-extract/SKILL.md` | REX + Concept | Extract source material into structured summary |
| 2 | `stage-2-research/SKILL.md` | REX only | Git archaeology + timeline |
| 3 | `stage-3-concepts/SKILL.md` | REX + Concept | Scored concept catalogue |
| 4 | `stage-4-position/SKILL.md` | REX + Concept | Angles, titles, descriptions + CHECKPOINT |
| 5 | `stage-5-script/SKILL.md` | REX + Concept | 5-act pitch + slides spec + Kimi prompt |
| 6 | `stage-6-revision/SKILL.md` | REX + Concept | Revision sheets + Q&A cheat-sheet |
| — | `orchestrator/SKILL.md` | REX + Concept | Run the full pipeline from one invocation |

## Quick Start

**Full pipeline (recommended)**:
```
/talk-pipeline
```
The orchestrator asks for metadata and runs all applicable stages.

**Single stage**:
```
/talk-stage1-extract
/talk-stage4-position
```

**With flags**:
```
/talk-pipeline --rex --slug=my-talk --event="Conf 2026" --duration=30
/talk-pipeline --concept --slug=my-idea
```

## Output convention

All files land in `talks/` at your project root:
```
talks/{YYYY}-{slug}-summary.md
talks/{YYYY}-{slug}-git-archaeology.md
talks/{YYYY}-{slug}-concepts.md
talks/{YYYY}-{slug}-angles.md
talks/{YYYY}-{slug}-pitch.md
talks/{YYYY}-{slug}-kimi-prompt.md
...
```

## Using the Kimi prompt

Stage 5 generates `\{slug\}-kimi-prompt.md`. To generate slides:
1. Open the file and verify no `\{PLACEHOLDER\}` remains
2. Go to [kimi.com](https://kimi.com) (free, no API needed)
3. Copy-paste the entire prompt
4. Kimi generates a dark-theme presentation with your slide content

## Documentation

Full workflow guide: [guide/workflows/talk-pipeline.md](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-talk-pipeline)
