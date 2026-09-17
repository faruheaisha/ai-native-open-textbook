---
title: "Smart-Suggest Routing: Regex + BM25 Skill Hints"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/smart-suggest-routing.md"
sourceRel: "guide/workflows/smart-suggest-routing.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/workflows/smart-suggest-routing.md"
sourceSha256: "ba904efe9a0fd5f547657b99bf69c38f000fe5388ef804527ba7f9b639148c1e"
pageSha256: "ba904efe9a0fd5f547657b99bf69c38f000fe5388ef804527ba7f9b639148c1e"
contentMode: "local-full"
zh: ""
---

# Smart-Suggest Routing: Regex + BM25 Skill Hints

`UserPromptSubmit` hooks can add advisory context before a model handles a prompt. Regex works for fixed enforcement rules. Okapi BM25 works for natural-language variations backed by a reviewed skill corpus.

The runnable implementation in `examples/hooks/bm25-routing/` supports Claude Code and Codex. Its recommended Codex deployment is one global hook that resolves both project and user skills from each prompt's working directory.

## Pick the right engine

| Situation | Regex | BM25 |
|---|---:|---:|
| Fixed command or policy phrase | Strong | Weak |
| Enforcement before an action | Strong | Not appropriate |
| Bilingual natural-language variations | Brittle | Strong with a corpus |
| New skill with fewer than eight positives | Manual rule possible | Native matching only |
| Broad intent with contrastive examples | Large rule set | Strong after evaluation |

Regex and BM25 can both attach to `UserPromptSubmit`, but they solve different problems. A regex reminder can require a changelog check. A BM25 hint can identify a likely review or repository-discovery skill. Neither should auto-approve or auto-run a destructive action.

## Codex architecture

Codex combines matching hooks from global and project configuration. Installing the same BM25 handler at both levels can therefore inject duplicate context. Use one global handler on a configured workstation:

```text
prompt + cwd
    |
    v
~/.codex/hooks/skill-router/bm25-suggest.js
    |
