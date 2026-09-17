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
pageSha256: "802697122a846cc98a73e99d01ac7ce75c2e4ddf08728074c3493b03e495f0a1"
contentMode: "local-full"
zh: ""
---

## Install with Postgres Kubernetes operators

You can also use Postgres Kubernetes operators to simplify installation, configuration, and life cycle. The operators which our community members have
told us work well are:

- [StackGres][stackgres] (includes TimescaleDB images)
- [Postgres Operator (Patroni)][patroni]
- [PGO][pgo]
- [CloudNativePG][cnpg]

===== PAGE: https://docs.tigerdata.com/self-hosted/install/installation-source/ =====

**Examples:**

Example 1 (shell):
```shell
kubectl create namespace timescale
```

Example 2 (shell):
```shell
kubectl config set-context --current --namespace=timescale
```

Example 3 (yaml):
```yaml
kubectl apply -f - <<EOF
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: timescale-pvc
   spec:
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: 10Gi
   EOF
```

Example 4 (yaml):
```yaml
kubectl apply -f - <<EOF
    apiVersion: apps/v1
    kind: StatefulSet
    metadata:
      name: timescaledb
    spec:
      serviceName: timescaledb
      replicas: 1
      selector:
        matchLabels:
          app: timescaledb
      template:
        metadata:
          labels:
            app: timescaledb
        spec:
          containers:
            - name: timescaledb
              image: 'timescale/timescaledb:latest-pg17'
              env:
                - name: POSTGRES_USER
                  value: postgres
                - name: POSTGRES_PASSWORD
                  value: postgres
                - name: POSTGRES_DB
                  value: postgres
                - name: PGDATA
                  value: /var/lib/postgresql/data/pgdata
              ports:
                - containerPort: 5432
              volumeMounts:
                - mountPath: /var/lib/postgresql/data
                  name: timescale-storage
          volumes:
            - name: timescale-storage
              persistentVolumeClaim:
                claimName: timescale-pvc
    EOF
```
