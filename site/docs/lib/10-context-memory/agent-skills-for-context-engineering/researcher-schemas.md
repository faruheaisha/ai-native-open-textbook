---
title: "Schema registry and canonical artifacts"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/researcher/schemas/README.md"
sourceRel: "researcher/schemas/README.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/researcher/schemas/README.md"
sourceSha256: "08f6885d0cb8ece581ad74cea95966fbb0facb9a6df066d6e37f42b1a9f5176b"
pageSha256: "08f6885d0cb8ece581ad74cea95966fbb0facb9a6df066d6e37f42b1a9f5176b"
contentMode: "local-full"
zh: ""
---

# Schema registry and canonical artifacts

This directory is the runtime-neutral interchange boundary for durable organization records. It does not replace readable skills, research ledgers, or Git history.

## Layout

- `registry.json`: active registry with exact schema-file digests.
- `registry.schema.json`: registry meta-schema.
- `v1/`: SPEC-003-owned Draft 2020-12 schemas.
- `fixtures/`: shared Python and TypeScript conformance records.
- `generated/`: checked compatibility, current-corpus, migration, and conformance evidence.
- `public-legacy-sources.json`: the exact public fixture set allowed into generated migration evidence.
- `typescript/`: independent Ajv and canonicalization consumer with a reusable compiled runtime registry.

SPEC-002 export schemas remain in `researcher/exports/schemas/` and are imported by exact digest. A schema owner keeps its file; the registry provides the common lookup surface.

## Canonical bytes

`jcs-rfc8785-integer-v1` is an RFC 8785-compatible subset:

- strings are UTF-8, are not Unicode-normalized, and reject lone surrogates;
- object properties sort by UTF-16 code units;
- arrays retain order;
- numbers are integers from `-9007199254740991` through `9007199254740991`;
- floats, negative zero, NaN, Infinity, duplicate keys, and hidden parser coercions fail.

JSON record digests hash those canonical bytes. Blob digests hash exact bytes. LF and CRLF therefore differ. `ArtifactEnvelope.integrity.digest` is excluded from its own digest calculation and no other field is excluded.

## Identity and compatibility
