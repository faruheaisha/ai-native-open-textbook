---
title: "Public Claims Contract"
sourceId: "09-harness/claude-code-harness-chachamaru"
sourceTitle: "Claude Code Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/Chachamaru127/claude-code-harness"
entryUrl: "https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/docs/public-claims-contract.md"
sourceRel: "docs/public-claims-contract.md"
rawUrl: "/raw/09-harness/claude-code-harness-chachamaru/docs/public-claims-contract.md"
sourceSha256: "e99cc18701dc5d7d8b99458541cd1003e92496e3d138b6c56a9f06834a869e55"
pageSha256: "e99cc18701dc5d7d8b99458541cd1003e92496e3d138b6c56a9f06834a869e55"
contentMode: "local-full"
zh: ""
---

# Public Claims Contract

Status: active

This contract applies to the public README, landing pages, release copy, social
copy, screenshots, testimonials, and independent coverage lists. Public text
may describe only behavior verified against the current implementation. Missing
or stale evidence is `unavailable`, not proof that a claim is true.

## Publication Rules

1. Implementation claims require a verification date and current evidence.
   Missing evidence must fail closed.
2. Host tier rows derive at build time from `hosts/registry.json`; manifests
   cannot copy or override them.
3. Private archives may retain `verified`, `rejected`, and `unavailable`
   testimonial records. Public builds accept only `verified` records whose
   `access_status` is `direct_public`.
4. `source_capture_ref` is a required retained full-source `.png`, `.jpg`, or
   `.webp` under the evidence root. `public_crop_ref` is optional and is the only
   image intended for public display.
5. Publication basis is controlled: `direct_public_source` or
   `minimal_attributed_quote`. Quotes must be a single trimmed excerpt of at
   most 280 Unicode characters.
6. Independent coverage is stored and rendered separately from testimonials;
   an article about the project is not a user endorsement.
7. Login-required or unavailable sources, invalid or indirect URLs, missing or
   invalid captures, oversized quotes, and quantified or absolute speed/safety
   claims in English or Japanese fail closed.
8. Full-source captures stay in the private evidence archive. A public crop,
   when present, contains only the minimum source area needed for attribution
   and the quotation; unrelated replies, people, engagement counts, customer
   data, and authentication material are excluded.

The current executable gate is
`scripts/validate-publication-records.py --evidence-root <dir> <records.json>`.
It accepts testimonial or implementation-claim manifests; any ineligible
record makes the whole build input exit nonzero. Independent coverage never
enters either collection.

## Machine-Readable Policy

## Record Shape

Public testimonial input is actual JSON:

```json
{
  "schema_version": "publication-records.v1",
  "collection": "testimonials",
  "records": []
}
```

Every record must contain only the required testimonial fields plus optional
`public_crop_ref`. The validator resolves capture paths under the explicit
`--evidence-root`, rejects traversal and missing files, and checks image magic
instead of trusting a filename extension.

Retrieval proves only that the cited source was directly observable on that
date. It does not validate unrelated technical claims inside the source.
Rejected and unavailable records remain private audit data. Independent
articles link to their original source under an independent coverage heading,
never inside testimonial build input.
