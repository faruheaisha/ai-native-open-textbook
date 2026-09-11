---
title: "Long-Term Memory"
sourceId: "09-harness/agentic-harness-engineering"
sourceTitle: "Agentic Harness Engineering（论文与实现）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/china-qijizhifeng/agentic-harness-engineering"
entryUrl: "https://github.com/china-qijizhifeng/agentic-harness-engineering/blob/8b2a55d97590363fe50c3cc6b5e833b020a4bb4c/README.md"
zh: ""
---

# Long-Term Memory

Persistent knowledge that should be retained across sessions. Store important facts about the user, project conventions, architectural decisions, and recurring patterns here.

## Agent Added Memories

- Exact contract surfaces matter more than equivalent substitutes: if the evaluator names a literal public path, socket, artifact filename, or API signature, final validation must hit that exact surface.
- Once an evaluator-style end-to-end check passes, freeze the published state. Cleanup should be narrowly bounded; do not rerun live generators, reset webroots/repos, or rewrite git history after success unless new failing evidence demands it.
- Final validation must close the loop from the submitted artifact itself: reread the on-disk deliverable, recompute boundary-sensitive checks from that file/path, and treat copied helpers, hidden build dirs, loader env hacks, or scratch-only launchers as debug signals rather than publish proof.
- Custom diff/cmp-based validation scripts must fail fast; a later `passed` printout or exit 0 never overrides an earlier expected-vs-actual mismatch.
- Performance tasks need safety margin, not a single near-threshold pass. Prefer repeated alternating comparisons against the canonical baseline and publish only when headroom is clearly comfortable.
