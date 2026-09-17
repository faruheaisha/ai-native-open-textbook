---
title: "Conventional Commit"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/commit/SKILL.md"
sourceRel: "examples/skills/commit/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/commit/SKILL.md"
sourceSha256: "6e7ae57e7992b456ab35189a7919c74ebba3d69094473570086690f932584dcc"
pageSha256: "6e7ae57e7992b456ab35189a7919c74ebba3d69094473570086690f932584dcc"
contentMode: "local-full"
zh: ""
---

# Conventional Commit

Generate a conventional commit message for staged changes.

## Instructions

1. Run `git diff --cached` to see staged changes
2. Analyze the nature of changes
3. Generate a commit message following the format below

## Commit Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code change that neither fixes nor adds feature
- `perf`: Performance improvement
- `test`: Adding missing tests
- `chore`: Maintenance tasks

### Rules
- Subject: imperative mood, no period, max 50 chars
- Body: explain WHAT and WHY, not HOW
- Footer: breaking changes, issue references

## Examples

```
feat(auth): add password reset functionality

Implement password reset flow with email verification.
Users can now request a reset link and set new password.

Closes #123
```

```
fix(api): prevent race condition in order processing

Add mutex lock to ensure orders are processed sequentially.
This fixes duplicate charge issues reported by users.

Fixes #456
```

```
refactor(cart): extract pricing logic to separate module

No functional changes. Improves testability and
separates concerns for future discount feature.
```

## Execution

After analyzing staged changes, suggest a commit message.
Ask for confirmation before executing `git commit -m "..."`.

$ARGUMENTS
