---
title: "/project-init"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/project-init.md"
sourceRel: "commands/project-init.md"
rawUrl: "/raw/09-harness/ecc/commands/project-init.md"
sourceSha256: "efd4a7859eab26f9017b9e7be0c13fb85419817720384719e6380735043e1164"
pageSha256: "efd4a7859eab26f9017b9e7be0c13fb85419817720384719e6380735043e1164"
contentMode: "local-full"
zh: ""
---

# /project-init

Create a safe, reviewable ECC onboarding plan for the current project. This command should start in dry-run mode and only write files after explicit user approval.

## Usage

```text
/project-init
/project-init --dry-run
/project-init --target claude
/project-init --target cursor
/project-init --skills continuous-learning-v2,security-review
/project-init --config ecc-install.json
```

## Safety Rules

1. Default to dry-run. Do not modify `CLAUDE.md`, settings files, rules, skills, or install state until the user approves the concrete plan.
2. Preserve existing project guidance. If `CLAUDE.md`, `.claude/settings.local.json`, `.cursor/`, `.codex/`, `.gemini/`, `.opencode/`, `.codebuddy/`, `.joycode/`, or `.qwen/` already exists, inspect it and propose a merge/append plan instead of overwriting.
3. Use ECC's installer and manifest tooling. Do not hand-copy files or clone arbitrary remotes as an install shortcut.
4. Keep permissions narrow. Any generated settings should match detected build/test/lint tools and avoid broad shell access.
5. Report exactly what would change before applying anything.

## Detection Inputs

Read the current project root and detect stack signals from:

- package manager files: `package.json`, `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `bun.lockb`
- language manifests: `pyproject.toml`, `requirements.txt`, `go.mod`, `Cargo.toml`, `pom.xml`, `build.gradle`, `build.gradle.kts`
- framework files: `next.config.*`, `vite.config.*`, `tailwind.config.*`, `Dockerfile`, `docker-compose.yml`
- ECC config: `ecc-install.json`
- optional stack map: `config/project-stack-mappings.json` in the ECC repo

When the ECC checkout is available, use `config/project-stack-mappings.json` as the stack-to-rules/skills reference. If the file is unavailable, fall back to the installed ECC manifests and explicit user choices.

## Planning Flow

1. Identify the target harness. Default to `claude` unless the user asks for `cursor`, `codex`, `gemini`, `opencode`, `codebuddy`, `joycode`, or `qwen`.
2. Detect stacks from project files and show the evidence for each match.
3. Resolve the smallest useful ECC plan:
   - project has an `ecc-install.json`: `node scripts/install-plan.js --config ecc-install.json --json`
   - user named a profile: `node scripts/install-plan.js --profile <profile> --target <target> --json`
