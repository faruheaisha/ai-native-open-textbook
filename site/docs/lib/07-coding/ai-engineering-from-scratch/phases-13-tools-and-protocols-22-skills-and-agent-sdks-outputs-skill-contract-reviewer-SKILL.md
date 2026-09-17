---
title: "Skill contract reviewer"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/13-tools-and-protocols/22-skills-and-agent-sdks/outputs/skill-contract-reviewer/SKILL.md"
sourceRel: "phases/13-tools-and-protocols/22-skills-and-agent-sdks/outputs/skill-contract-reviewer/SKILL.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/13-tools-and-protocols/22-skills-and-agent-sdks/outputs/skill-contract-reviewer/SKILL.md"
sourceSha256: "84345705cb4959f2234d49b35fffbcf15066109e8e90925877f1283129dbbe73"
pageSha256: "84345705cb4959f2234d49b35fffbcf15066109e8e90925877f1283129dbbe73"
contentMode: "local-full"
zh: ""
---

# Skill contract reviewer

Use this skill when a workflow is about to become a reusable agent artifact.

1. Set `SKILL_ROOT` to the absolute directory containing this installed
   `SKILL.md`. Do not assume the process working directory is the bundle.
2. Set `TARGET_ROOT` to the absolute original workspace working directory and
   resolve the proposed skill directory under that root.
3. Read `$SKILL_ROOT/references/contract.md` and validate the portable
   `SKILL.md` identity fields.
4. Read `$SKILL_ROOT/references/decision-model.md` and separate repository
   context, reusable method, external capability, lifecycle timing,
   deterministic logic, and isolated delegation.
5. Before execution, show the exact resolved argument vector. Run
   `python3 "$SKILL_ROOT/scripts/check_skill.py" "$TARGET_SKILL"`, where
   `TARGET_SKILL` is the absolute proposed skill directory under
   `TARGET_ROOT`.
6. Inspect the JSON report. Fix every error before discussing host-specific
   extensions.
7. Compare the proposed artifact with
   `$SKILL_ROOT/assets/task-shapes.json` and return the smallest composable set
   of primitives.

Do not claim that a runtime extension is part of the portable contract. Do not treat a valid skill as permission to run scripts or access tools.

Return the validation report, the selected primitives, and one sentence
explaining each selection. Include execution evidence with the resolved script
path, resolved target path, cwd, exact argv, and exit code. If the host cannot
expose one of those observations, mark it unverified instead of inventing it.
