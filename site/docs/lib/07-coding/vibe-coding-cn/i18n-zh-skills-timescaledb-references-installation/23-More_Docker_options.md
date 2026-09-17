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
pageSha256: "afb3ccf11c2e29e9ddddf74c011a3f9b9ae6f9c26b3d5ea70f36c8411822b62c"
contentMode: "local-full"
zh: ""
---

## More Docker options

If you want to access the container from the host but avoid exposing it to the
outside world, you can bind to `127.0.0.1` instead of the public interface, using this command:

If you don't want to install `psql` and other Postgres client tools locally,
or if you are using a Microsoft Windows host system, you can connect using the
version of `psql` that is bundled within the container with this command:

Existing containers can be stopped using `docker stop` and started again with
`docker start` while retaining their volumes and data. When you create a new
container using the `docker run` command, by default you also create a new data
volume. When you remove a Docker container with `docker rm`, the data volume
persists on disk until you explicitly delete it. You can use the `docker volume
ls` command to list existing docker volumes. If you want to store the data from
your Docker container in a host directory, or you want to run the Docker image
on top of an existing data directory, you can specify the directory to mount a
data volume using the `-v` flag:

When you install TimescaleDB using a Docker container, the Postgres settings
are inherited from the container. In most cases, you do not need to adjust them.
However, if you need to change a setting, you can add `-c setting=value` to your
Docker `run` command. For more information, see the
[Docker documentation][docker-postgres].

The link provided in these instructions is for the latest version of TimescaleDB
on Postgres 16. To find other Docker tags you can use, see the [Dockerhub repository][dockerhub].
