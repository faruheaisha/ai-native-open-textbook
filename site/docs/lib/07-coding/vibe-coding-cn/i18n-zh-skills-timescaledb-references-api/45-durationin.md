---
title: "Vibe Coding CN"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/api.md"
sourceRel: "i18n/zh/skills/timescaledb/references/api.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/api.md"
sourceSha256: "3e08a12386bc1c2c2965dda885ab8b9b9b30d35e89d8c00a2f2d70066d208a6e"
pageSha256: "fc005d20b1acda5867f4ad1ada156a42e25a789c447a277a9f77b8f983739a86"
contentMode: "local-full"
zh: ""
---

## duration_in()

**URL:** llms-txt#duration_in()

===== PAGE: https://docs.tigerdata.com/api/_hyperfunctions/compact_state_agg/intro/ =====

Given a system or value that switches between discrete states, aggregate the
amount of time spent in each state. For example, you can use the `compact_state_agg`
functions to track how much time a system spends in `error`, `running`, or
`starting` states.

`compact_state_agg` is designed to work with a relatively small number of states. It
might not perform well on datasets where states are mostly distinct between
rows.

If you need to track when each state is entered and exited, use the
[`state_agg`][state_agg] functions. If you need to track the liveness of a
system based on a heartbeat signal, consider using the
[`heartbeat_agg`][heartbeat_agg] functions.

===== PAGE: https://docs.tigerdata.com/api/_hyperfunctions/compact_state_agg/compact_state_agg/ =====
