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
pageSha256: "fec2324e109793986ba89771467c0da23ad8e46ed19b835fe3e7c71cefcd2c72"
contentMode: "local-full"
zh: ""
---

### Delta-of-delta encoding

Delta-of-delta encoding takes delta encoding one step further and applies
delta-encoding over data that has previously been delta-encoded. With
time-series datasets where data collection happens at regular intervals, you can
apply delta-of-delta encoding to the time column, which results in only needing to
store a series of zeroes.

In other words, delta encoding stores the first derivative of the dataset, while
delta-of-delta encoding stores the second derivative of the dataset.

Applied to the example dataset from earlier, delta-of-delta encoding results in this:

|time|cpu|mem_free_bytes|temperature|humidity|
|-|-|-|-|-|
|2020-04-01 10:00:00|82|1,073,741,824|80|25|
|5 seconds|16|-214,748,365|1|0|
|0 seconds|0|-88,876|0|0|

In this example, delta-of-delta further compresses 5 seconds in the time column
down to 0 for every entry in the time column after the second row, because the
five second gap remains constant for each entry. Note that you see two entries
in the table before the delta-delta 0 values, because you need two deltas to
compare.

This compresses a full timestamp of 8 bytes, or 64 bits, down to just a single
bit, resulting in 64x compression.

With delta and delta-of-delta encoding, you can significantly reduce the number
of digits you need to store. But you still need an efficient way to store the
smaller integers. The previous examples used a standard integer datatype for the
time column, which needs 64 bits to represent the value of 0 when delta-delta
encoded. This means that even though you are only storing the integer 0, you are
still consuming 64 bits to store it, so you haven't actually saved anything.

Simple-8b is one of the simplest and smallest methods of storing variable-length
integers. In this method, integers are stored as a series of fixed-size blocks.
For each block, every integer within the block is represented by the minimal
bit-length needed to represent the largest integer in that block. The first bits
of each block denotes the minimum bit-length for the block.

This technique has the advantage of only needing to store the length once for a
given block, instead of once for each integer. Because the blocks are of a fixed
size, you can infer the number of integers in each block from the size of the
integers being stored.

For example, if you wanted to store a temperature that changed over time, and
you applied delta encoding, you might end up needing to store this set of
integers:

|temperature (deltas)|
|-|
|1|
|10|
|11|
|13|
|9|
|100|
|22|
|11|

With a block size of 10 digits, you could store this set of integers as two
blocks: one block storing 5 2-digit numbers, and a second block storing 3
3-digit numbers, like this:

&lt;CodeBlock canCopy=\{false\} showLineNumbers=\{false\} children=\{`
\{2: [01, 10, 11, 13, 09]\} \{3: [100, 022, 011]\}
`\} />

In this example, both blocks store about 10 digits worth of data, even though
some of the numbers have to be padded with a leading 0. You might also notice
that the second block only stores 9 digits, because 10 is not evenly divisible
by 3.

Simple-8b works in this way, except it uses binary numbers instead of decimal,
and it usually uses 64-bit blocks. In general, the longer the integer, the fewer
number of integers that can be stored in each block.
