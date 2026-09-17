---
title: "Repo-local Agent Skills"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/.agents/skills/README.md"
sourceRel: ".agents/skills/README.md"
rawUrl: "/raw/09-harness/better-harness/.agents/skills/README.md"
sourceSha256: "18c391460deb1b54657fd56fdddf7fab4f1a444b112d97c7cde1f51dd35ec420"
pageSha256: "18c391460deb1b54657fd56fdddf7fab4f1a444b112d97c7cde1f51dd35ec420"
contentMode: "local-full"
zh: ""
---

# Repo-local Agent Skills

`.agents/skills/` is for repo-local host skills, host wrappers, and generated
mirrors. It is not the canonical home for shared workflows; put those in root
`skills/`.

Each direct skill directory uses `SKILL.md` as its entrypoint. Keep host-only
logic local, make wrappers point to their canonical root `skills/` owner in
their instructions, and document generated-file ownership beside the generator.
A separate `mirror.json` sidecar is not part of this repository's contract.
