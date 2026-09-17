---
title: "Initialize Git Repository"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.specify/extensions/git/commands/speckit.git.initialize.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.specify/extensions/git/commands/speckit.git.initialize.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.specify/extensions/git/commands/speckit.git.initialize.md"
sourceSha256: "07bf0e1a9fc251482774141be5a903cbeb018f90cb66b2d29a5fff7f0bd3ecb7"
pageSha256: "07bf0e1a9fc251482774141be5a903cbeb018f90cb66b2d29a5fff7f0bd3ecb7"
contentMode: "local-full"
zh: ""
---

# Initialize Git Repository

Initialize a Git repository in the current project directory if one does not already exist.

## Execution

Run the appropriate script from the project root:

- **Bash**: `.specify/extensions/git/scripts/bash/initialize-repo.sh`
- **PowerShell**: `.specify/extensions/git/scripts/powershell/initialize-repo.ps1`

If the extension scripts are not found, fall back to:
- **Bash**: `git init && git add . && git commit -m "Initial commit from Specify template"`
- **PowerShell**: `git init; git add .; git commit -m "Initial commit from Specify template"`

The script handles all checks internally:
- Skips if Git is not available
- Skips if already inside a Git repository
- Runs `git init`, `git add .`, and `git commit` with an initial commit message

## Customization

Replace the script to add project-specific Git initialization steps:
- Custom `.gitignore` templates
- Default branch naming (`git config init.defaultBranch`)
- Git LFS setup
- Git hooks installation
- Commit signing configuration
- Git Flow initialization

## Output

On success:
- `✓ Git repository initialized`

## Graceful Degradation

If Git is not installed:
- Warn the user
- Skip repository initialization
- The project continues to function without Git (specs can still be created under `specs/`)

If Git is installed but `git init`, `git add .`, or `git commit` fails:
- Surface the error to the user
- Stop this command rather than continuing with a partially initialized repository
