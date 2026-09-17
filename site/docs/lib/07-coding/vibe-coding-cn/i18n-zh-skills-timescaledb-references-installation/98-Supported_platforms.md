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
pageSha256: "55fc0c66193d9cdc2834fcf41eb7e56a5224aa1f2ea694f64e434119726a138a"
contentMode: "local-full"
zh: ""
---

## Supported platforms

You can deploy TimescaleDB on the following systems:

| Operation system                | Version                                                               |
|---------------------------------|-----------------------------------------------------------------------|
| Debian                          | 13 Trixe, 12 Bookworm, 11 Bullseye                                   |
| Ubuntu                          | 24.04 Noble Numbat, 22.04 LTS Jammy Jellyfish |
| Red Hat Enterprise              | Linux 9, Linux 8                                             |
| Fedora                          | Fedora 35, Fedora 34, Fedora 33                                       |
| Rocky Linux                     | Rocky Linux 9 (x86_64), Rocky Linux 8                                 |
| ArchLinux (community-supported) | Check the [available packages][archlinux-packages]                    |

What next? [Try the key features offered by Tiger Data][try-timescale-features], see the [tutorials][tutorials],
interact with the data in your Tiger Cloud service using [your favorite programming language][connect-with-code], integrate
your Tiger Cloud service with a range of [third-party tools][integrations], plain old [Use Tiger Data products][use-timescale], or dive
into the [API reference][use-the-api].

===== PAGE: https://docs.tigerdata.com/self-hosted/install/self-hosted/ =====

**Examples:**

Example 1 (bash):
```bash
sudo apt install gnupg postgresql-common apt-transport-https lsb-release wget
```

Example 2 (bash):
```bash
sudo /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh
```

Example 3 (bash):
```bash
echo "deb https://packagecloud.io/timescale/timescaledb/debian/ $(lsb_release -c -s) main" | sudo tee /etc/apt/sources.list.d/timescaledb.list
```

Example 4 (bash):
```bash
wget --quiet -O - https://packagecloud.io/timescale/timescaledb/gpgkey | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/timescaledb.gpg
```
