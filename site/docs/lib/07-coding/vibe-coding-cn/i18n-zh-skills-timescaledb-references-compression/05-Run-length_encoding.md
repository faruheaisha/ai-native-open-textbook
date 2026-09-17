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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/compression.md"
sourceRel: "i18n/zh/skills/timescaledb/references/compression.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/compression.md"
sourceSha256: "488dd1571052c58332a963deed8b1dbd3633dc2724e884eef2085c4098409ec7"
pageSha256: "751c48496552a7fe7281df048f03835a0d0398a58effb2fd6e80baf976892bae"
contentMode: "local-full"
zh: ""
---

### Run-length encoding

Simple-8b compresses integers very well, however, if you have a large number of
repeats of the same value, you can get even better compression with run-length
encoding. This method works well for values that don't change very often, or if
an earlier transformation removes the changes.

Run-length encoding is one of the classic compression algorithms. For
time-series data with billions of contiguous zeroes, or even a document with a
million identically repeated strings, run-length encoding works incredibly well.

For example, if you wanted to store a temperature that changed minimally over
time, and you applied delta encoding, you might end up needing to store this set
of integers:

|temperature (deltas)|
|-|
|11|
|12|
|12|
|12|
|12|
|12|
|12|
|1|
|12|
|12|
|12|
|12|

For values like these, you do not need to store each instance of the value, but
rather how long the run, or number of repeats, is. You can store this set of
numbers as `\{run; value\}` pairs like this:

&lt;CodeBlock canCopy=\{false\} showLineNumbers=\{false\} children=\{`
\{1; 11\}, \{6; 12\}, \{1; 1\}, \{4; 12\}
`\} />

This technique uses 11 digits of storage (1, 1, 1, 6, 1, 2, 1, 1, 4, 1, 2),
rather than 23 digits that an optimal series of variable-length integers
requires (11, 12, 12, 12, 12, 12, 12, 1, 12, 12, 12, 12).

Run-length encoding is also used as a building block for many more advanced
algorithms, such as Simple-8b RLE, which is an algorithm that combines
run-length and Simple-8b techniques. TimescaleDB implements a variant of
Simple-8b RLE. This variant uses different sizes to standard Simple-8b, in order
to handle 64-bit values, and RLE.

## Floating point compression

For columns that do not have a high amount of repeated values, TimescaleDB uses
XOR-based compression.

The standard XOR-based compression method has been extended so that data can be
decompressed in reverse order. Backward scanning queries are common in
time-series workloads. This means that queries that use backwards scans run much
faster.
