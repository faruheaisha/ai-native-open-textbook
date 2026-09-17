---
title: "/skill-create - Local Skill Generation"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/skill-create.md"
sourceRel: "commands/skill-create.md"
rawUrl: "/raw/09-harness/ecc/commands/skill-create.md"
sourceSha256: "0f13edf02faa01e91ef893574c379434b86a3973e6ba1db61ec016c2442a39bd"
pageSha256: "0f13edf02faa01e91ef893574c379434b86a3973e6ba1db61ec016c2442a39bd"
contentMode: "local-full"
zh: ""
---

# /skill-create - Local Skill Generation

Analyze your repository's git history to extract coding patterns and generate SKILL.md files that teach Claude your team's practices.

## Usage

```bash
/skill-create                    # Analyze current repo
/skill-create --commits 100      # Analyze last 100 commits
/skill-create --output ./skills  # Custom output; export-only unless configured
/skill-create --instincts        # Also generate instincts for continuous-learning-v2
```

## What It Does

1. **Parses Git History** - Analyzes commits, file changes, and patterns
2. **Detects Patterns** - Identifies recurring workflows and conventions
3. **Generates SKILL.md** - Creates valid Claude Code skill files
4. **Optionally Creates Instincts** - For the continuous-learning-v2 system

## Analysis Steps

### Step 1: Gather Git Data

```bash
# Get recent commits with file changes
git log --oneline -n ${COMMITS:-200} --name-only --pretty=format:"%H|%s|%ad" --date=short

# Get commit frequency by file
git log --oneline -n 200 --name-only | grep -v "^$" | grep -v "^[a-f0-9]" | sort | uniq -c | sort -rn | head -20

# Get commit message patterns
git log --oneline -n 200 | cut -d' ' -f2- | head -50
```

### Step 2: Detect Patterns

Look for these pattern types:

| Pattern | Detection Method |
|---------|-----------------|
| **Commit conventions** | Regex on commit messages (feat:, fix:, chore:) |
| **File co-changes** | Files that always change together |
| **Workflow sequences** | Repeated file change patterns |
| **Architecture** | Folder structure and naming conventions |
| **Testing patterns** | Test file locations, naming, coverage |

### Step 3: Generate SKILL.md

Derive the default `skill-name` safely: lowercase the repository name, replace
runs of spaces, underscores, path separators, or other non-alphanumeric
characters with one hyphen, trim leading/trailing hyphens, then append
`-patterns`. For example, `My Repo_API/Client` becomes
`my-repo-api-client-patterns`. If normalization produces an empty slug, stop
and request an explicit safe name.

Set `skill-name` once; it defaults to the normalized `\{repo-name\}-patterns`, and
the same value must be used for the directory and frontmatter. Validate the
final `skill-name`, then write the generated skill to
