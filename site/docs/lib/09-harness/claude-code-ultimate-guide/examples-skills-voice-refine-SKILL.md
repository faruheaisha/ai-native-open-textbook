---
title: "Voice Refine Skill"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/voice-refine/SKILL.md"
sourceRel: "examples/skills/voice-refine/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/voice-refine/SKILL.md"
sourceSha256: "c4a1e1c696750be24e2312b7210a5ea7918688e4d6f7bcfe667a1135c0a6e70f"
pageSha256: "c4a1e1c696750be24e2312b7210a5ea7918688e4d6f7bcfe667a1135c0a6e70f"
contentMode: "local-full"
zh: ""
---

# Voice Refine Skill

Transform verbose, stream-of-consciousness voice dictation into structured,
token-efficient prompts for Claude Code.

## When to Use

- Input from voice dictation (Wispr Flow, Superwhisper, macOS Dictation)
- Verbose text >150 words
- Contains filler words, repetitions, or tangents
- Natural speech patterns that need structure

## Transformation Pipeline

```
1. DEDUPE    → Remove repetitions and filler words
2. EXTRACT   → Identify core requirements and constraints
3. STRUCTURE → Organize into standard sections
4. COMPRESS  → Reduce to ~30% of original while preserving intent
```

## Output Format

```markdown
## Contexte
[Project context, existing stack, relevant files]

## Objectif
[Single sentence: what needs to be built/changed]

## Contraintes
- [Constraint 1]
- [Constraint 2]
- [etc.]

## Output attendu
[Expected deliverables: files, format, tests]
```

## Flags

| Flag | Effect |
|------|--------|
| `--confirm` | Show refined prompt before sending to Claude (default) |
| `--direct` | Send refined prompt directly without confirmation |
| `--verbose` | Keep more detail, less compression |
| `--en` | Output in English (default: matches input language) |

## Usage Examples

### Basic Usage

```
/voice-refine

Alors euh j'aimerais que tu m'aides à faire un truc, en fait j'ai une API
qui renvoie des données utilisateurs et je voudrais les afficher dans un
tableau React, mais attention il faut que ça soit paginé parce que y'a
beaucoup de données, genre des milliers d'utilisateurs, et aussi faudrait
pouvoir trier par nom ou par date d'inscription, ah et on utilise Tailwind
dans le projet donc faut que ça matche avec ça...
```

### With Flags

```
/voice-refine --direct --en

[voice input in any language → sends English prompt directly]
```

## Compression Metrics

| Metric | Target |
|--------|--------|
| Token reduction | 60-70% |
| Information retention | >95% |
| Structure clarity | High |

## Filtering Rules

**Remove**: filler words ("euh", "um", "like", "basically"), repetitions, tangents, hedging ("maybe", "probably" unless relevant), politeness padding ("please", "could you").

**Preserve**: technical requirements, constraints, existing code context, expected output format, edge cases, business logic rules.

## See Also

- `guide/ecosystem/ai-ecosystem.md` - Voice-to-Text Tools section
- `examples/before-after.md` - Full transformation examples
