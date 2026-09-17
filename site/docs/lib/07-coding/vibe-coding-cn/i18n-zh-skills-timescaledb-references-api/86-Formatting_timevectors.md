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
pageSha256: "529642375b6f17e8c32cf9b840ac2cef7f002da9c7a290e47c17356e76fe9829"
contentMode: "local-full"
zh: ""
---

## Formatting timevectors

You can turn a timevector into a formatted text representation. There are two
functions for turning a timevector to text:

*   [`to_text`](#to-text), which allows you to specify the template
*   [`to_plotly`](#to-plotly), which outputs a format suitable for use with the
    [Plotly JSON chart schema][plotly]

This function produces a text representation, formatted according to the
`format_string`. The format string can use any valid Tera template
syntax, and it can include any of the built-in variables:

*   `TIMES`: All the times in the timevector, as an array
*   `VALUES`: All the values in the timevector, as an array
*   `TIMEVALS`: All the time-value pairs in the timevector, formatted as
    `\{"time": $TIME, "val": $VAL\}`, as an array

For example, given this table of data:

You can use a format string with `TIMEVALS` to produce the following text:

Or you can use a format string with `TIMES` and `VALUES` to produce the
following text:

This function produces a text representation, formatted for use with Plotly.

For example, given this table of data:

You can produce the following Plotly-compatible text:
