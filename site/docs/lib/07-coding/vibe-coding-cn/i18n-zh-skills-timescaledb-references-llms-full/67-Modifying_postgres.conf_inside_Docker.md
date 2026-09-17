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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceRel: "i18n/zh/skills/timescaledb/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceSha256: "5b223f41e9b421d89aa3ada311e079bfcf943fd79ec6f83793d0e93a29f910da"
pageSha256: "542d198a4a4d91cdf66cb77803606e8407d90396ff4b2befebec13bb607fc5cb"
contentMode: "local-full"
zh: ""
---

#### Modifying postgres.conf inside Docker

1.  Open a shell in Docker to change the configuration on a running
    container.

```bash
docker start timescaledb
docker exec -i -t timescaledb /bin/bash
```

1.  Edit and then save the config file, modifying the setting for the desired
    configuration parameter (for example, `max_wal_size`).

```bash
vi /var/lib/postgresql/data/postgresql.conf
```

1.  Restart the container so the config gets reloaded.

```bash
docker restart timescaledb
```

1.  Test to see if the change worked.

```bash
    docker exec -it timescaledb psql -U postgres

    postgres=# show max_wal_size;
     max_wal_size
    --------------
    2GB
```
