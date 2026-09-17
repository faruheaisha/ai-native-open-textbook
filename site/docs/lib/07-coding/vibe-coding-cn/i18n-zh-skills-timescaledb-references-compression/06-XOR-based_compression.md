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
pageSha256: "1de09027648a5c2a3de225844bde38028c185a98f6ddcd8dbe88f86730a771ad"
contentMode: "local-full"
zh: ""
---

### XOR-based compression

Floating point numbers are usually more difficult to compress than integers.
Fixed-length integers often have leading zeroes, but floating point numbers usually
use all of their available bits, especially if they are converted from decimal
numbers, which can't be represented precisely in binary.

Techniques like delta-encoding don't work well for floats, because they do not
reduce the number of bits sufficiently. This means that most floating-point
compression algorithms tend to be either complex and slow, or truncate
significant digits. One of the few simple and fast lossless floating-point
compression algorithms is XOR-based compression, built on top of Facebook's
Gorilla compression.

XOR is the binary function `exclusive or`. In this algorithm, successive
floating point numbers are compared with XOR, and a difference results in a bit
being stored. The first data point is stored without compression, and subsequent
data points are represented using their XOR'd values.

## Data-agnostic compression

For values that are not integers or floating point, TimescaleDB uses dictionary
compression.
