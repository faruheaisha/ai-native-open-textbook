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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/installation.md"
sourceRel: "i18n/zh/skills/timescaledb/references/installation.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/installation.md"
sourceSha256: "4a7b57ccaa9a9f7e4c22cc7a4a1dcd5ddf03b101b4f1914bcb18219176632044"
pageSha256: "2920a153aaffd390790e7790b55cece943889ead7476d0acecebdfa56e6e7d4b"
contentMode: "local-full"
zh: ""
---

## Determine the mount point type

When you start your upgraded Docker container, you need to be able to point the
new Docker image to the location that contains the data from your previous
version. To do this, you need to work out where the current mount point is. The
current mount point varies depending on whether your container is using volume
mounts, or bind mounts.

1.  Find the mount type used by your Docker container:

This returns either `volume` or `bind`.

1.  Note the volume or bind used by your container:

Docker returns the `<volume ID>`. You see something like this:

Docker returns the `<bind path>`. You see something like this:

You use this value when you perform the upgrade.
