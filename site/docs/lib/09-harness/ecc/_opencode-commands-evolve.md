---
title: "Evolve Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.opencode/commands/evolve.md"
sourceRel: ".opencode/commands/evolve.md"
rawUrl: "/raw/09-harness/ecc/.opencode/commands/evolve.md"
sourceSha256: "cf1112f9344bbfacb18f273d234575409ed53f3b8b47643905268b788698e944"
pageSha256: "cf1112f9344bbfacb18f273d234575409ed53f3b8b47643905268b788698e944"
contentMode: "local-full"
zh: ""
---

# Evolve Command

Analyze and evolve instincts in continuous-learning-v2: $ARGUMENTS

## Your Task

Run:

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/skills/continuous-learning-v2/scripts/instinct-cli.py" evolve $ARGUMENTS
```

If `CLAUDE_PLUGIN_ROOT` is unavailable, use:

```bash
python3 ~/.claude/skills/continuous-learning-v2/scripts/instinct-cli.py evolve $ARGUMENTS
```

## Supported Args (v2.1)

- no args: analysis only
- `--generate`: also generate files under `evolved/\{skills,commands,agents\}`

## Behavior Notes

- Uses project + global instincts for analysis.
- Shows skill/command/agent candidates from trigger and domain clustering.
- Shows project -> global promotion candidates.
- With `--generate`, output path is:
