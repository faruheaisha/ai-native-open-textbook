---
title: "Claude Code System Prompts"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-code-review-angle-e-wrapper-proxy-correctness.md"
sourceRel: "system-prompts/skill-code-review-angle-e-wrapper-proxy-correctness.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-code-review-angle-e-wrapper-proxy-correctness.md"
sourceSha256: "263be1870cdebe7ad64d26a6ace6b3f0a47df3ecd878d8bef1912d07006f278f"
pageSha256: "263be1870cdebe7ad64d26a6ace6b3f0a47df3ecd878d8bef1912d07006f278f"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

### Angle E — wrapper/proxy correctness

When the PR adds or modifies a type that wraps another (cache, proxy, decorator,
adapter): check that every method routes to the wrapped instance and not back
through a registry/session/global — e.g. a caching provider holding a
`delegate` field that resolves IDs via `session.get(...)` instead of
`delegate.get(...)` will re-enter the cache or recurse. Also check that the
wrapper forwards all the methods the callers actually use.
