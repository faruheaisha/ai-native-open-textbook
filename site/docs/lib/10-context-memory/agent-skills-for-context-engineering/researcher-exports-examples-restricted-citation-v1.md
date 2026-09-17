---
title: "Restricted citation projection example"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/researcher/exports/examples/restricted-citation-v1.md"
sourceRel: "researcher/exports/examples/restricted-citation-v1.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/researcher/exports/examples/restricted-citation-v1.md"
sourceSha256: "e9dbf9e8883bc7174b3fd69c40af82dba15652fc584f65de3aabdb64368ac344"
pageSha256: "e9dbf9e8883bc7174b3fd69c40af82dba15652fc584f65de3aabdb64368ac344"
contentMode: "local-full"
zh: ""
---

# Restricted citation projection example

The adjacent generated staging tree proves that a synthetic `restricted_source` record can export allowlisted citation metadata while excluding its raw `body`. `export-manifest.json` contains output and transformation digests but no source path or private input digest.

Validate with:

```bash
python researcher/scripts/validate_export.py check \
  --staging-dir researcher/exports/examples/restricted-citation-v1
```

The example source is intentionally synthetic and committed under `researcher/fixtures/export/`; real restricted bodies do not belong in this repository.
