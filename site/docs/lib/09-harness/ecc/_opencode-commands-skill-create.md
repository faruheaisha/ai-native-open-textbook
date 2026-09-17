---
title: "Skill Create Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.opencode/commands/skill-create.md"
sourceRel: ".opencode/commands/skill-create.md"
rawUrl: "/raw/09-harness/ecc/.opencode/commands/skill-create.md"
sourceSha256: "61fa979c303644436dcb3ebe6186b4dee7e346f517447139e08275ea2864d100"
pageSha256: "61fa979c303644436dcb3ebe6186b4dee7e346f517447139e08275ea2864d100"
contentMode: "local-full"
zh: ""
---

# Skill Create Command

Analyze git history to generate Claude Code skills: $ARGUMENTS

## Your Task

1. **Analyze commits** - Pattern recognition from history
2. **Extract patterns** - Common practices and conventions
3. **Generate SKILL.md** - Structured skill documentation
4. **Create instincts** - For continuous-learning-v2

## Analysis Process

### Step 1: Gather Commit Data
```bash
# Recent commits
git log --oneline -100

# Commits by file type
git log --name-only --pretty=format: | sort | uniq -c | sort -rn

# Most changed files
git log --pretty=format: --name-only | sort | uniq -c | sort -rn | head -20
```

### Step 2: Identify Patterns

**Commit Message Patterns**:
- Common prefixes (feat, fix, refactor)
- Naming conventions
- Co-author patterns

**Code Patterns**:
- File structure conventions
- Import organization
- Error handling approaches

**Review Patterns**:
- Common review feedback
- Recurring fix types
- Quality gates

### Step 3: Generate SKILL.md

```markdown
# [Skill Name]

## Overview
[What this skill teaches]

## Patterns

### Pattern 1: [Name]
- When to use
- Implementation
- Example

### Pattern 2: [Name]
- When to use
- Implementation
- Example

## Best Practices

1. [Practice 1]
2. [Practice 2]
3. [Practice 3]

## Common Mistakes

1. [Mistake 1] - How to avoid
2. [Mistake 2] - How to avoid

## Examples

### Good Example
```[language]
// Code example
```

### Anti-pattern
```[language]
// What not to do
```
```

### Step 4: Generate Instincts

For continuous-learning-v2:

```json
{
  "instincts": [
    {
      "trigger": "[situation]",
      "action": "[response]",
      "confidence": 0.8,
      "source": "git-history-analysis"
    }
  ]
}
```

## Output

Creates:
- `skills/[name]/SKILL.md` - Skill documentation
- `skills/[name]/instincts.json` - Instinct collection

---

**TIP**: Run `/skill-create --instincts` to also generate instincts for continuous learning.
