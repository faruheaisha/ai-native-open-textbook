---
title: "Public export boundary"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/researcher/exports/README.md"
sourceRel: "researcher/exports/README.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/researcher/exports/README.md"
sourceSha256: "904d0c88291c0f88fef1549769498b27a8342df72e4e9b7bf49ad16cd2e30693"
pageSha256: "904d0c88291c0f88fef1549769498b27a8342df72e4e9b7bf49ad16cd2e30693"
contentMode: "local-full"
zh: ""
---

# Public export boundary

The exporter turns explicitly classified private or restricted JSON records into new public projection artifacts. It is an allowlist projector, not a claim that arbitrary files can be made safe by scanning.

The record sequence is immutable:

1. `ExportRequest` selects source-relative paths and registered transforms.
2. `ExportPlan` privately binds the exact source bytes and policy version.
3. `ExportManifest` publicly binds only projection IDs, transform digests, output paths, and output digests.
4. `ExportValidation` proves the staged tree matches its manifest and supported detectors.
5. Human approval, merge receipt, correction, and tombstone records are separate later lifecycle records. Earlier records are never edited in place.

Private input digests, storage locators, source paths, capability material, and notification destinations never appear in the public manifest. A public projection receives a new `proj_` identity. Possessing that identity does not grant access to the private source.

## Commands

```bash
python researcher/scripts/validate_export.py plan \
  --request researcher/fixtures/export/restricted-request.json \
  --private-root researcher/fixtures/export/private-root \
  --plan-out researcher/exports/private/example-plan.json

python researcher/scripts/validate_export.py render \
  --plan researcher/exports/private/example-plan.json \
  --private-root researcher/fixtures/export/private-root \
  --staging-dir researcher/exports/staging/example \
  --receipt-out researcher/exports/private/example-receipt.json

python researcher/scripts/validate_export.py check \
  --staging-dir researcher/exports/staging/example
```

`researcher/exports/examples/restricted-citation-v1/` is a committed deterministic example. Local `private/` and `staging/` directories are ignored.

## Supported guarantee

Supported rendering paths reject unknown request and manifest fields, unknown artifact kinds, unregistered transforms, secret-reference sources, path traversal, symlinks, path collisions, source mutation, extra staged files, digest drift, private metadata fields, supplied canaries in plain/hex/base64 forms, and a small set of high-confidence secret structures. The structural field allowlist is the primary boundary. Supplementary scanning cannot prove absence of every possible semantic disclosure.
