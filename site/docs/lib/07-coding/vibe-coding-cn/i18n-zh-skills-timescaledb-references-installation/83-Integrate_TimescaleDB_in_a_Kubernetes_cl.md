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
pageSha256: "4b0a36e60977518616e08863b20b41f7b4580b9a64763404aad9ec819fe36851"
contentMode: "local-full"
zh: ""
---

## Integrate TimescaleDB in a Kubernetes cluster

To connect your Kubernetes cluster to your Tiger Cloud service:

1. **Create a default namespace for your Tiger Cloud components**

1. Create a namespace:

1. Set this namespace as the default for your session:

For more information, see [Kubernetes Namespaces][kubernetes-namespace].

1. **Create a Kubernetes secret that stores your Tiger Cloud service credentials**

Update the following command with your [connection details][connection-info], then run it:

1. **Configure network access to Tiger Cloud**

- **Managed Kubernetes**: outbound connections to external databases like Tiger Cloud work by default.
       Make sure your cluster’s security group or firewall rules allow outbound traffic to Tiger Cloud IP.

- **Self-hosted Kubernetes**: If your cluster is behind a firewall or running on-premise, you may need to allow
      egress traffic to Tiger Cloud. Test connectivity using your [connection details][connection-info]:

If the connection fails, check your firewall rules.

1. **Create a Kubernetes deployment that can access your Tiger Cloud**

Run the following command to apply the deployment:

1. **Test the connection**

1. Create and run a pod that uses the [connection details][connection-info] you added to `timescale-secret` in
      the `timescale` namespace:

2. Launch a psql shell in the `test-pod` you just created:

You start a `psql` session connected to your Tiger Cloud service.

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

You have successfully integrated Kubernetes with Tiger Cloud.

===== PAGE: https://docs.tigerdata.com/integrations/prometheus/ =====

**Examples:**

Example 1 (shell):
```shell
kubectl create namespace timescale
```

Example 2 (shell):
```shell
kubectl config set-context --current --namespace=timescale
```

Example 3 (shell):
```shell
kubectl create secret generic timescale-secret \
       --from-literal=PGHOST=<host> \
       --from-literal=PGPORT=<port> \
       --from-literal=PGDATABASE=<dbname> \
       --from-literal=PGUSER=<user> \
       --from-literal=PGPASSWORD=<password>
```

Example 4 (shell):
```shell
nc -zv <host> <port>
```
