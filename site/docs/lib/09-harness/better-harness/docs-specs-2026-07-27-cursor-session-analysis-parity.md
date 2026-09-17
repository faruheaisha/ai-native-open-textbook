---
title: "Complete Cursor session-analysis parity"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-07-27-cursor-session-analysis-parity.md"
sourceRel: "docs/specs/2026-07-27-cursor-session-analysis-parity.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-07-27-cursor-session-analysis-parity.md"
sourceSha256: "cc4e14a367b0d53d45f7a3304a24e9ed5427f69b44b9ea6312c5e0d2ab718cef"
pageSha256: "cc4e14a367b0d53d45f7a3304a24e9ed5427f69b44b9ea6312c5e0d2ab718cef"
contentMode: "local-full"
zh: ""
---

# Complete Cursor session-analysis parity

## Traceability

- Spec ID: `cursor-session-analysis-parity`
- Status: Implemented

## Intent

Make the existing Cursor session provider discoverable and evidence-safe through
the same Better Harness workflow used by the other supported hosts. Align host
metadata with the package version, route Cursor through the canonical Session
Diagnostics and portable HTML contracts, and preserve transcript, metadata,
and audit coverage in the production facts envelope.

The workflow must distinguish a successfully scanned empty workspace from a
workspace whose Cursor transcripts exist but cannot support bounded Session
facts. Missing timestamps, message content, metadata joins, or audit joins stay
explicit evidence boundaries and never become zero activity or a clean result.

## Acceptance Scenarios

- **CSP-AC-1 (version alignment):** `package.json`, `package-lock.json`, and the
  Qoder, Codex, Claude Code, and Cursor plugin manifests expose the same package
  version, and the existing manifest contract test passes.
- **CSP-AC-2 (canonical routing):** Session Diagnostics documents Qoder, Codex,
  Claude Code, and Cursor as supported `session-analysis` providers and includes
  Cursor-specific transcript, metadata, audit, workspace, and privacy
  boundaries. It does not route agents to the opaque Cursor database.
- **CSP-AC-3 (host and output routing):** The host adapter matrix points Cursor
  at `scripts/session-analysis/platforms/cursor.mjs`, and portable HTML routing
  explicitly includes Cursor while keeping Qoder as the only Canvas host.
- **CSP-AC-4 (facts coverage contract):** Cursor `session-core-facts` contains a
  privacy-safe `sourceCoverage` envelope that distinguishes `absent`,
  `out-of-window`, `unobserved`, `partial`, and `observed` coverage. It reports
  only bounded aggregate counts for workspace transcripts, in-window sessions,
  timestamp coverage, request/conversation content, terminal-only or unreadable
  transcripts, chat metadata joins, and audit joins.
- **CSP-AC-5 (bundle propagation):** The Session Evidence collector keeps
  `absent`, `out-of-window`, and `observed` facts available, but maps
  `unobserved` and `partial` Cursor coverage to a `partial` lane. Normal bundles
  therefore fail closed on incomplete Cursor Session evidence while quick
  bundles retain the explicit partial boundary.
- **CSP-AC-6 (provider behavior):** Deterministic fixtures cover no transcript,
  dated transcripts outside the requested window, terminal-only or invalid
  transcripts, missing metadata/audit joins, and fully joined transcripts. Raw
  session ids, paths, prompts, commands, output, and secrets do not enter
  production facts.
- **CSP-AC-7 (real-home boundary):** A bounded read-only probe against the
  current Cursor home reports the selected workspace's actual coverage state
  and never persists raw session content.
- **CSP-AC-8 (documentation integrity):** Markdown links and the generated
  Better Harness documentation routing graph remain current.

## Non-goals

- Modify `~/.cursor`, install or publish a Cursor plugin, or replace a user-level
  `sessions-diagnostics` Skill.
- Add a second Cursor analyzer or move provider logic into `.cursor-plugin/`.
- Decode Cursor `store.db` or infer transcript content from opaque application
  state.
- Add Cursor metadata to the Qoder npm package or runtime bundle.
- Treat missing Session evidence, zero candidates, or configured plugin assets
  as proof of runtime quality or Skill invocation.

## Plan and Tasks

1. Align `package-lock.json` and the four host manifests with the package
   version while preserving the existing Qoder-only packaging boundary.
   (CSP-AC-1)
2. Update the canonical Session Diagnostics, host adapter matrix, report
   routing, and focused Skill assertions for Cursor. (CSP-AC-2, CSP-AC-3)
3. Add bounded Cursor transcript-shape and join accounting in the provider,
   project it through the versioned Session facts contract, and map incomplete
   coverage to the evidence-bundle lane status. (CSP-AC-4, CSP-AC-5)
4. Add deterministic provider and bundle fixtures for every coverage state and
   privacy boundary. (CSP-AC-5, CSP-AC-6)
5. Run focused tests, the real-home aggregate probe, documentation graph
   regeneration/checks, the full suite, and package verification. Update this
   spec to `Implemented` only when the visible evidence passes. (CSP-AC-1 through
   CSP-AC-8)

## Test and Review Evidence

- CSP-AC-1: `node --test test/plugin-manifests.test.mjs`.
- CSP-AC-2 and CSP-AC-3: `node --test test/better-harness-skill.test.mjs
  test/coding-agent-platform-notes.test.mjs`.
- CSP-AC-4 through CSP-AC-6: `node --test
  test/session-analysis-providers.test.mjs
  test/session-analysis-core-facts.test.mjs
  test/better-harness-evidence-bundle.test.mjs`.
- CSP-AC-7: run `node scripts/session-analysis.mjs facts --platform cursor
