---
title: "Public export correction and removal"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/researcher/runbooks/public-export-correction.md"
sourceRel: "researcher/runbooks/public-export-correction.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/researcher/runbooks/public-export-correction.md"
sourceSha256: "cf84b2ffb8dffdcf5d40afa5a16845a0fee1490df44fcde7bffa3e3476be30d4"
pageSha256: "cf84b2ffb8dffdcf5d40afa5a16845a0fee1490df44fcde7bffa3e3476be30d4"
contentMode: "local-full"
zh: ""
---

# Public export correction and removal

Publication is not reversible. A later deletion cannot make already distributed data private again.

When a public projection is incorrect or should no longer be used:

1. Disable further renders of the affected request or transform.
2. Preserve the private plan, render receipt, and failed validation evidence.
3. Open a corrective pull request with a new public correction or tombstone record that names the public projection and safe reason code.
4. Remove or replace the projected body in that pull request when appropriate. Do not rewrite Git history as the normal response.
5. A human maintainer reviews and merges the correction.
6. Downstream indexes mark the prior projection superseded or unavailable while retaining non-sensitive decision lineage.

If the event exposed an actual credential, revoke and rotate it outside this repository. Do not add the value or matched scanner excerpt to the public incident record.
