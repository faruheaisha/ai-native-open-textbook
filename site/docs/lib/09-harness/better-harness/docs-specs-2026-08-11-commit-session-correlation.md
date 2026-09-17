---
title: "Commit and session correlation with Session Viewer"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-08-11-commit-session-correlation.md"
sourceRel: "docs/specs/2026-08-11-commit-session-correlation.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-08-11-commit-session-correlation.md"
sourceSha256: "82c207aadc10277dc8e21b33014a0d5cd508374e7d010a5672f3b92e4c02da3a"
pageSha256: "82c207aadc10277dc8e21b33014a0d5cd508374e7d010a5672f3b92e4c02da3a"
contentMode: "local-full"
zh: ""
---

# Commit and session correlation with Session Viewer

## Traceability

- Spec ID: commit-session-correlation
- Status: Implemented
- Source evidence: entire.io commit/session pages and the upstream
  `https://github.com/entireio/cli` domain model (`Entire-Checkpoint` commit
  trailer linking checkpoints and sessions to commits)
- Reference session:
  `https://entire.io/gh/entireio/git-sync/session/0708a5fa-06bd-4274-b1fe-513c7202217e`
  (session UUID differs from its three `Entire-Checkpoint` ULIDs)

## Intent

Let a maintainer answer "which agent sessions produced this commit" from
local evidence only. Better Harness already normalizes multi-host session
events (`scripts/session-analysis/`) but has no link between sessions and git
commits. This change adds a bounded, deterministic correlation between local
git commits and discovered sessions, plus a self-contained commit-view HTML
report in the spirit of the entire.io commit page (commit header, linked
session timeline, change breakdown, token totals) without adopting
entire-cli's shadow-branch, refs storage, or checkpoint-first product model.
The session viewer presents local session activity: a compact activity rail
and a tool-call bubble trace derived from the selected local transcript.

## Acceptance Scenarios

- AC-1: `commit-session-link correlate` emits one JSON document that, for each
  selected commit, lists candidate sessions ordered by confidence with
  explicit evidence (time overlap, overlapping repo-relative files, cwd
  match); sessions with no time overlap and no explicit trailer are excluded.
- AC-2: Confidence is deterministic and ranked: `explicit` (a
  `Harness-Session:` trailer names a discovered session id, or an
  `Entire-Checkpoint:` trailer resolves through read-only checkpoint metadata
  to that session id) > `high` (time overlap plus at least one overlapping file) >
  `medium` (time overlap plus session cwd inside the repository) > `low` (time
  overlap only).
- AC-3: `commit-session-link render --commit <ref>` writes a single
  self-contained HTML file (inline CSS/SVG, no remote assets, no runtime
  reads) showing the commit header, linked sessions with confidence badges and
  privacy-safe prompt summaries, a code/tests/docs change breakdown, and
  observed token totals when present.
- AC-4: Correlation JSON and the commit-view HTML are privacy-safe: file
  paths are repo-relative, prompt text passes `sanitizePrivateReviewText`, and
  no absolute home paths appear. The Session Viewer HTML is a local
  full-transcript reader: it keeps transcript structure and paths but redacts
  credential-shaped content (tokens, keys, embedded URL credentials) and
  bounds every text block.
- AC-5: `--help`/`-h` on every registered `commit-session-link` path prints
  canonical help on stdout with empty stderr and exit 0 before reading the
  workspace, spawning git, or writing files.
- AC-6: Focused tests cover git fact parsing, correlation scoring (including
  trailer, grace-window, and no-overlap boundaries), HTML rendering, and the
  CLI help contract; `node --test` on the new test file plus
  `better-harness-cli` and `doc-link-graph` tests pass.
- AC-7: `commit-session-link render-session --session-id <id>` writes a
  self-contained Session Viewer HTML file, named `session-viewer-<id>.html` by
  default, with a visible `Session Viewer` product label and a browser title
  prefixed by `Session Viewer`. It presents a header meta row (platform,
  models, duration, commit and
  file-change counts, token total), then one turn block per user prompt with
  the prompt card, a collapsed "N messages, N tool calls" expander holding
  tool chips and intermediate assistant notes, and the final assistant
  response rendered from a bounded inline Markdown subset (headings, lists,
  code fences, inline code, bold).
- AC-8: Commits whose committer time falls inside the session window (plus
  grace) and that correlate with the session appear as inline commit chips
  after the turn that produced them, expandable to the full commit subject and
  trailers; turn anchors allow deep links within the file.
- AC-9: `Entire-Checkpoint` facts remain distinct from session facts. The
  reader accepts both upstream stores without modifying Git: sharded content
  on `entire/checkpoints/v1` and per-checkpoint
