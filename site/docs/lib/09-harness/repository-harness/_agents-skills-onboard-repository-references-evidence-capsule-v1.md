---
title: "Evidence Capsule v1"
sourceId: "09-harness/repository-harness"
sourceTitle: "Repository Harness（仓库级 Agent 工作区）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/hoangnb24/repository-harness"
entryUrl: "https://github.com/hoangnb24/repository-harness/blob/e765792b635b4d5e3e5fc0578f82f9ca5dea2681/.agents/skills/onboard-repository/references/evidence-capsule-v1.md"
sourceRel: ".agents/skills/onboard-repository/references/evidence-capsule-v1.md"
rawUrl: "/raw/09-harness/repository-harness/.agents/skills/onboard-repository/references/evidence-capsule-v1.md"
sourceSha256: "b9e1f9208842e725289469d0976b3e65670a30ee7f69be6d799cf4ba2a19fadb"
pageSha256: "b9e1f9208842e725289469d0976b3e65670a30ee7f69be6d799cf4ba2a19fadb"
contentMode: "local-full"
zh: ""
---

# Evidence Capsule v1

Read this reference before emitting an onboarding evidence capsule. Use the
field names and value spellings exactly. JSON object key order is irrelevant;
array order should follow the displayed hunks and claims.

## Patch markers

Wrap each hunk separately. Hash the exact bytes represented by `<diff bytes>`,
including one final LF:

````text

```diff
<diff bytes>
```

````

## Capsule shape

````json
{
  "schema": "onboarding-evidence-capsule/v1",
  "tested_repository": {
    "root": "/absolute/repository/path",
    "revision": "40 lowercase hexadecimal characters",
    "branch": "branch-name"
  },
  "producer_skill": {
    "path": ".agents/skills/onboard-repository/SKILL.md",
    "sha256": "64 lowercase hexadecimal characters"
  },
  "boundary": [
    {
      "id": "B1",
      "kind": "git",
      "initial_evidence_sha256": "64 lowercase hexadecimal characters",
      "final_evidence_sha256": "the same digest for Pass",
      "result": "Pass",
      "notes": []
    },
    {
      "id": "B2",
      "kind": "ignored_or_managed",
      "initial_evidence_sha256": "64 lowercase hexadecimal characters or null",
      "final_evidence_sha256": "64 lowercase hexadecimal characters or null",
      "result": "Pass, Fail, or Unknown",
      "notes": ["One concrete limitation per string."]
    },
    {
      "id": "B3",
      "kind": "runtime",
      "initial_evidence_sha256": null,
      "final_evidence_sha256": null,
      "result": "Unknown",
      "notes": ["Runtime manager state was not observable."]
    },
    {
      "id": "B4",
      "kind": "temporary_paths",
      "initial_evidence_sha256": "64 lowercase hexadecimal characters",
      "final_evidence_sha256": "the same digest for Pass",
      "result": "Pass",
      "notes": []
    }
  ],
  "claims": [
    {
      "id": "C1",
      "hunk_id": "H1",
      "text": "One trimmed atomic proposed clause on one line.",
      "classification": "Authoritative",
      "sources": [
        {
          "revision": "40 lowercase hexadecimal characters",
          "path": "repository/relative/path.md",
          "start_line": 10,
          "end_line": 12,
          "content_sha256": "64 lowercase hexadecimal characters",
          "role": "authority"
        }
      ]
    }
  ],
  "hunks": [
    {
      "id": "H1",
      "destination": "AGENTS.md",
      "boundary": "One exact, trimmed description of the replaced boundary.",
      "before_sha256": "SHA-256 of the complete old boundary bytes",
      "after_sha256": "SHA-256 of the complete proposed boundary bytes",
      "patch_sha256": "SHA-256 of the marked diff bytes plus final LF",
      "claim_ids": ["C1"],
      "unknowns": []
    }
  ],
  "limitations": [
    "Facts that remain unproven or require full-transcript audit."
  ]
}
````

## Closed vocabularies

- Claim `classification`: `Authoritative`, `Observed`, or `Derived`.
- Source `role`: `authority`, `implementation`, `configuration`, `test`, or
  `boundary`.
- Boundary `kind`: `git`, `ignored_or_managed`, `runtime`, or
  `temporary_paths`. At least one row for every kind is required.
- Boundary `result`: `Pass`, `Fail`, or `Unknown`.
- IDs: uppercase ASCII letter followed by uppercase letters, digits,
  underscores, or hyphens.

Patch claims must not be `Decision required` or `Unknown`; keep those outside
the displayed patch and list relevant gaps in `unknowns` or `limitations`.

## Hash definitions

- Source digest: exact LF-terminated bytes printed by
  `git show <revision>:<path> | sed -n '<start>,<end>p'`.
- Boundary digest: exact complete old or proposed boundary bytes, including
  markers/headings and final LF.
- Patch digest: bytes inside its `diff` fence, plus one final LF.
- Boundary observation digest: stable normalized output for that component.
  Exclude timestamps, spinners, color sequences, or presentation labels.

For `Pass`, initial and final boundary digests must both exist and be equal.
For `Fail`, both must exist and differ. Use `Unknown` whenever the observation
was missed, incomplete, or could not establish equivalence; hashes may be null.

## Referential rules

- Every hunk has at least one claim.
- Every claim belongs to and is referenced by exactly one hunk.
- Every claim has at least one pinned source.
- Hunk IDs exactly match their patch-marker IDs.
- Every repository path is relative and contains no `..` component.
- The capsule has no fields beyond those shown above.

The validator proves format, links, boundary hash invariants, and displayed
patch digests. It does not prove that a cited source supports a claim or that
the source-line digest is truthful; the independent auditor must retrieve and
verify those sources.
