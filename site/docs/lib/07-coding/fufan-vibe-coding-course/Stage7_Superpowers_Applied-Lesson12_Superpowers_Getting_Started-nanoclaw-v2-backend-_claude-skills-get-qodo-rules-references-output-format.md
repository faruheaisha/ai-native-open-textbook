---
title: "Formatting and Outputting Rules"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/get-qodo-rules/references/output-format.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/get-qodo-rules/references/output-format.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/get-qodo-rules/references/output-format.md"
sourceSha256: "8cc1a2056ad74fa4dfc434c8f47fa84a303f8dfd90623d1a7abc919dd421a61b"
pageSha256: "8cc1a2056ad74fa4dfc434c8f47fa84a303f8dfd90623d1a7abc919dd421a61b"
contentMode: "local-full"
zh: ""
---

# Formatting and Outputting Rules

## Output Structure

Print the following header:

```
# 📋 Qodo Rules Loaded

Scope: `{QUERY_SCOPE}`
Rules loaded: **{TOTAL_RULES}** (universal, org level, repo level, and path level rules)

These rules must be applied during code generation based on severity:
```

## Grouping by Severity

Group rules into three sections and print each non-empty section:

**ERROR** (`severity == "error"`):
```
## ❌ ERROR Rules (Must Comply) - {count}

- **{name}** ({category}): {description}
```

**WARNING** (`severity == "warning"`):
```
## ⚠️  WARNING Rules (Should Comply) - {count}

- **{name}** ({category}): {description}
```

**RECOMMENDATION** (`severity == "recommendation"`):
```
## 💡 RECOMMENDATION Rules (Consider) - {count}

- **{name}** ({category}): {description}
```

End output with `---`.
