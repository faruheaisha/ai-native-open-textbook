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
pageSha256: "dd81e3235148f489566521906164a2f9483f9137ab048172fcb19f981e288c85"
contentMode: "local-full"
zh: ""
---

## Integrate TimescaleDB in a Kubernetes cluster

Running TimescaleDB on Kubernetes is similar to running Postgres. This procedure outlines the steps for a non-distributed system.

To connect your Kubernetes cluster to self-hosted TimescaleDB running in the cluster:

1. **Create a default namespace for Tiger Data components**

1. Create the Tiger Data namespace:

1. Set this namespace as the default for your session:

For more information, see [Kubernetes Namespaces][kubernetes-namespace].

1. **Set up a persistent volume claim (PVC) storage**

To manually set up a persistent volume and claim for self-hosted Kubernetes, run the following command:

1. **Deploy TimescaleDB as a StatefulSet**

By default, the [TimescaleDB Docker image][timescale-docker-image] you are installing on Kubernetes uses the
   default Postgres database, user and password. To deploy TimescaleDB on Kubernetes, run the following command:

1. **Allow applications to connect by exposing TimescaleDB within Kubernetes**

1. **Create a Kubernetes secret to store the database credentials**

1. **Deploy an application that connects to TimescaleDB**

1. **Test the database connection**

1. Create and run a pod to verify database connectivity using your [connection details][connection-info] saved in `timescale-secret`:

1. Launch the Postgres interactive shell within the created `test-pod`:

You see the Postgres interactive terminal.
